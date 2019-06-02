// Access the script as a module
const searchFile = require('./search-file.js').searchContextFile
// Initialise data to be passed into function call
const data = [
  'Input data to search for',
  'such as',
  'hello.world.',
]
const fileToRead = 'e.g. listOfSomething.txt'
const fileToWrite = 'e.g. ../temp/temp.txt'
// Call the function
searchFile(data, fileToRead, fileToWrite)
