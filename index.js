"use strict";
const contextFinder = require("./src/node/context-finder.js");
function runFromCommandLine() {
    // Check if --help argument is used
    if (process.argv[2] === "--help") {
        console.log("\x1b[32mUsage: node index.js <file to read> <file to write to> <context> <context> ...\x1b[0m");
    }
    // Check command line arguments are set (minimum is 5: node index.js <file> <file> <context>)
    if (process.argv.length < 5) {
        return false;
    }
    // Initialise data to be passed into function call
    const contextTitles = (process.argv).splice(4, (process.argv.length - 1)); // get array of values where context titles should be
    const fileToRead = process.argv[2];
    const fileToWrite = process.argv[3];
    // Check fileToRead exists
    const fileToReadExists = (require("fs")).existsSync(fileToRead);
    if (!fileToReadExists) {
        return false;
    }
    // Call the function
    contextFinder(contextTitles, fileToRead, fileToWrite);
}
/* If ran from the command line */
if (require.main === module) {
    runFromCommandLine();
}
else {
    // If required as an npm module
    module.exports = contextFinder;
}
