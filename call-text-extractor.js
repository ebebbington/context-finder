// Access the script as a module - DO NOT TOUCH
const textExtractor = require('./text-extractor.js').searchContextFile

// Initialise data to be passed into function call
// Replace the values in this array to the context files you want to find
const data = [
  'example context titles',
	'user-version-',
	'page.1-'
]
const fileToRead = '/path/to/file/to/read.txt'
const fileToWrite = '/path/of/file/to/write/to.txt'
// Call the function
textExtractor(data, fileToRead, fileToWrite)

console.info('Wrote contexts ' + data + ' from ' + fileToRead + ' to ' + fileToWrite)
