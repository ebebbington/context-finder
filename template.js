// Access the script as a module
const searchFile = require('./search-file.js').searchContextFile
// Initialise data to be passed into function call
const data = [
  'hello.world.'
]
const fileToRead = ''
const fileToWrite = 'test2.txt'
// Call the function
searchFile(data, fileToRead, fileToWrite)
