const vars = require("../variables.js");

/**
 * Converts logging stuff into strings that include current time.
 */
module.exports.logger = (message) => {
    message = "[" + new Date().toISOString() + "] " + message;
    console.log(message);

    // Check if output path is set, and if set, write to file.
    if (vars.logFile) {
        fs.appendFile(vars.logFilePath, message + "\n", (err) => { });
    }

}