// Access the main script as a module - DO NOT TOUCH
const textExtractor = require('./text-extractor.js').searchContextFile

//
// Initialise data to be passed into function call
//
const data = [
  'hello-world.',
	'page-version-'
]
const fileToRead = 'example.txt'
const fileToWrite = 'example-new.txt'
// Call the function
textExtractor(data, fileToRead, fileToWrite)

// Inform the user when done to clarify contents
data.forEach(function (value) {
	console.info(`Wrote contents ${value} from ${fileToRead} to ${fileToWrite}`)
})
