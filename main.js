const fs = require("fs");

// Import all required functions
const getWebContent = require("./functions/getWebContent.js");
const utils = require("./functions/utils.js");

// Import all required variables
const vars = require("./variables.js");

// Script to get route list and write into file.
getWebContent.getRouteList().then((list) => {
    list = JSON.parse(list);

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

}).catch((err) => {
    utils.logger("ERROR: " + err);
});


