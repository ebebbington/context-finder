// Access the main script as a module - DO NOT TOUCH
const textExtractor = require('./text-extractor.js').searchContextFile

//
// Initialise data to be passed into function call
//
const fileToRead = process.argv[2]
const fileToWrite = process.argv[3]
const data = []
for (let i = 4; i < process.argv.length; i++) {
	data.push(process.argv[i])
}
// Call the function
textExtractor(data, fileToRead, fileToWrite)

// Inform the user when done to clarify contents
data.forEach(function (value) {
	console.info(`Wrote contents ${value} from ${fileToRead} to ${fileToWrite}`)
})
