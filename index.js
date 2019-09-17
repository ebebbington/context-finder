// Access the main script as a module
const contextReadAndPrint = require('./context-read-and-print.js')

//
// Initialise data to be passed into function call
//
const fileToRead = process.argv[2]
const fileToWrite = process.argv[3]
const contextTitles = []
for (let i = 4; i < process.argv.length; i++) {
	contextTitles.push(process.argv[i])
}

// Check all parameters are set
if (!fileToRead || !fileToWrite || !contextTitles) {
	console.error('Not all parameters are set, use the following syntax: \n   node index.js <file to read> <file to write> <context title 1> <context title 2> ...')
	return false
}

// Check fileToRead exists
const fs = require('fs')
const fileToReadExists = fs.existsSync(fileToRead)
if (!fileToReadExists) {
	console.error('Please check the file to read exists then run this again')
	return false
}

// Call the function
contextReadAndPrint(contextTitles, fileToRead, fileToWrite)

// Inform the user when done to clarify contents
console.info(`Wrote a total of ${contextTitles.length} from ${fileToRead} to ${fileToWrite}`)
