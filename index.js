const contextFinder = require('./context-finder.js')

function runAsNPMRequire () {
	return contextFinder
}

function runFromCommandLine () {
	// Check command line arguments are set (minimum is 5: node index.js <file> <file> <context>)
	if (process.argv.length < 5) {
		console.error('\x1b[31m\nNot all parameters are set, use the following syntax: \n  $ node index.js <file to read> <file to write> <context title 1> <context title 2> ...\x1b[0m')
		return false
	}

	// Initialise data to be passed into function call
	const contextTitles = (process.argv).splice(4, (process.argv.length - 1)) // get array of values where context titles should be
	const fileToRead = process.argv[2]
	const fileToWrite = process.argv[3]

	// Check fileToRead exists
	const fileToReadExists = (require('fs')).existsSync(fileToRead)
	if (!fileToReadExists) {
		console.error(`\x1b[31m\nCannot find file '${fileToRead}' to read\x1b[0m`)
		return false
	}

	// Call the function
	contextFinder.readAndPrint(contextTitles, fileToRead, fileToWrite)
}

/* If ran as a required NPM module in a script */
if (require.main !== module) {
	runAsNPMRequire()
} else {
	/* If ran from the command line */
	runFromCommandLine()
}