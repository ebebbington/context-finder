function searchContextFile (dataToFind, fileToRead, fileToWrite) {
  //
  // Initialise data
  //
  const fs = require('fs') // for reading files (mainly used for JSON files)
  const lineReader = require('line-reader') // for reading lines in files
  let inDataToFind = false // Used to check if lineReader is in a block we need
  let dataToWrite = [] // Prepare array fro holding the text we need
  let [ hasBrackets, isInDataToFind ] = [ false, false ] // Bools for checking if lineText contains brackets and contains a value in the given array

  //
  // Start reading the file
  //
  lineReader.eachLine(fileToRead, function (lineText, isLastLine) {
    // Check if has brackets
    const lineContainsBracket = lineText.indexOf('[') !== -1 && lineText.indexOf(']') !== -1 // Check start and end
    lineContainsBracket === true ? hasBrackets = true : hasBrackets = false
    // Check if lineText equals a value in given array
    for (let k = dataToFind.length - 1; k > -1; k--) {
      const lineHasDataToFind = lineText.indexOf(dataToFind[ k ]) !== -1
      if (lineHasDataToFind) {
        isInDataToFind = true // In a block of text we need
        break // To exit this loop
      }
      // A check for if lineText does not contain dataToFind and we arent already on a block we need
      if (lineText.indexOf(dataToFind[ k ]) === -1 && isInDataToFind === true) {
        isInDataToFind = false
        break
      }
    }
    // A check for if we reach a block we need
    if (hasBrackets && isInDataToFind) {
      inDataToFind = true
      dataToWrite.push(lineText) // To copy block title
    }
    // Checks for lines we dont need, end with copying lineText
    if (!hasBrackets && !isInDataToFind && inDataToFind === true) {
      if (!lineText && !hasBrackets) {
        // means its a blank line
        inDataToFind = false
      }
      if ((lineText) && hasBrackets) {
        // means there is a link between data but its start of a new context
        inDataToFind = false
      }
      dataToWrite.push(lineText)
    }
    // If we once reach the end of the file
    if (isLastLine) {
      // write to file
      const logger = fs.createWriteStream(fileToWrite, { flags: 'w' }) // 'w' for writing, 'a' for appending
      // Loop through whole array writing each line to the file on new lines
      dataToWrite.forEach(function (element) {
        logger.write(element + '\n')
      })
    }
  })
}

/*
  Export each function in this file to use be used like so:
  const searchFile = require('./app.js').searchContextFile
 */
module.exports = { searchContextFile }