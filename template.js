// Access the script as a module
const searchFile = require('./search-file.js').searchContextFile
// Initialise data to be passed into function call
const data = [
  'hello.world.'
]
const fileToRead = 'template.txt'
const fileToWrite = 'template-new.txt'
// Call the function
searchFile(data, fileToRead, fileToWrite)
