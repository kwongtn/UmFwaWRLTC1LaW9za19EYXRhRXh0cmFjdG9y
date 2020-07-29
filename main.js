const fs = require("fs");

// Import all required functions
const getWebContent = require("./functions/getWebContent.js");
const utils = require("./functions/utils.js");
const paramsProcessor = require("./functions/paramsProcessor.js");

// Import all required variables
const vars = require("./variables.js");

const params = paramsProcessor.parse(process.argv);
console.log(params);

// Script to get route list and write into file.
getWebContent.getRouteList().then(async (list) => {
    list = await JSON.parse(list);

    // Outputs the results if debug mode is enabled.
    vars.debugMode ? console.log(list) : null;

    utils.logger("Retrieved " + list.length + " routes.");

    // Writes the results
    if (vars.routeListOutput) {
        utils.logger("Writing results into " + vars.routeListOutputPath);

        try {
            fs.writeFileSync(vars.routeListOutputPath, JSON.stringify(list, null, 2), "utf-8");
            utils.logger("File write complete.");
        } catch (err) {
            utils.logger("Error writing to " + vars.routeListOutputPath);
            utils.logger(err);
        }


    } else {
        utils.logger("Output disabled for getRouteList.");
    }

    return list;

}).catch((err) => {
    utils.logger("ERROR: " + err);
}).then((routeList) => {
    utils.logger("===Start KML File Processes===");

    if (params.getKML) {

        var multiplier = -1;

        routeList.forEach((route, index) => {
            // Counter for timeout
            var timer = index % vars.KML_LimitPerLoad;
            if (!timer) {
                multiplier++;
            }
            setTimeout(() => {
                var myPath = vars.KMLOutputPath.concat(route.val.replace(/\s/, "_")).concat(".kml");
                getWebContent.getKML(route.val.replace(/\s/, "%20")).then((data) => {

                    if (vars.KMLOutput) {
                        utils.logger("KML File download for route " + route.val + " suceeded. Saving it to \'" + myPath);

                        try {
                            fs.writeFileSync(myPath, data, "utf-8");
                            utils.logger("File write complete for " + myPath);


                        } catch (err) {
                            utils.logger("Error writing to " + myPath);
                            utils.logger(err);
                        }


                    } else {
                        utils.logger("KML File download for route " + route.val + " suceeded. Not saving it down.");

                    }

                    // Sleeping prompt
                    if (!timer) {
                        utils.logger("SLEEP: Start sleeping for " + (vars.KML_TimeoutMultiplier / 1000) + " seconds while waiting for jobs to complete.");
                    }

                }).catch((err) => {
                    utils.logger("ERROR: " + err);
                });


            }, multiplier * vars.KML_TimeoutMultiplier);


        });
    }

    return routeList;

}).then((routeList) => {
    if(params.getStopLocations){
        utils.logger("===Start Stop List Processes===");
        
        var multiplier = -1;

        routeList.forEach((route, index) => {
            // Counter for timeout
            var timer = index % vars.Stop_LimitPerLoad;
            if (!timer) {
                multiplier++;
            }
            setTimeout(() => {
                var myPath = vars.StopOutputPath.concat(route.val.replace(/\s/, "_")).concat(".json");
                getWebContent.getStopList(route.key).then((data) => {

                    if (vars.StopOutput) {
                        utils.logger("Stops download for route " + route.val + " suceeded. Saving it to \'" + myPath);

                        try {
                            fs.writeFileSync(myPath, JSON.stringify(data, null, 2), "utf-8");
                            utils.logger("File write complete for " + myPath);


                        } catch (err) {
                            utils.logger("Error writing to " + myPath);
                            utils.logger(err);
                        }


                    } else {
                        utils.logger("Stop list download for route " + route.val + " suceeded. Not saving it down.");

                    }

                    // Sleeping prompt
                    if (!timer) {
                        utils.logger("SLEEP: Start sleeping for " + (vars.Stop_TimeoutMultiplier / 1000) + " seconds while waiting for jobs to complete.");
                    }

                }).catch((err) => {
                    utils.logger("ERROR: " + err);
                });


            }, multiplier * vars.Stop_TimeoutMultiplier);


        });
    }

    return routeList;
    }
);

