
module.exports.routeListOutput = true;
module.exports.routeListOutputPath = "./results/routeList.json";

module.exports.debugMode = false;

module.exports.logFilePath = "./log.log";
module.exports.logFile = false;

/**
 * @param {bool} KMLOutput
 * @param {string} KMLOutputPath
 */
module.exports.KMLOutput = true;
module.exports.KMLOutputPath = "./results/KML/";

/**
 * @param {int} KML_LimitPerLoad The number of loads to run before pausing.
 * @param {int} KML_TimeoutMultiplier In milliseconds, the time to wait for timeout.
 */
module.exports.KML_LimitPerLoad = 5;
module.exports.KML_TimeoutMultiplier = 10000;