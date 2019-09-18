// todo :: Ask if a prompt would be problamatic, if not then give a prompt to the user displaying what they will be writing
// to ensure they re-read their input

// todo :: dispay info to the log about how much and what was written to where from where

// Access the main script as a module
const contextReadAndPrint = require('./context-read-and-print.js')

// Check parameters are set
if (process.argv.length < 5) {
	console.error('\x1b[31m\nNot all parameters are set, use the following syntax: \n  $ node index.js <file to read> <file to write> <context title 1> <context title 2> ...\x1b[0m')
	return false
}

//
// Initialise data to be passed into function call
//
const contextTitles = (process.argv).splice(4, process.argv.length - 1) // get array of values where context titles should be
const fileToRead = process.argv[2]
const fileToWrite = process.argv[3]

// Check fileToRead exists
const fs = require('fs')
const fileToReadExists = fs.existsSync(fileToRead)
if (!fileToReadExists) {
	console.error('Please check the file to read exists then run this again')
	return false
}

// Call the function
contextReadAndPrint(contextTitles, fileToRead, fileToWrite)