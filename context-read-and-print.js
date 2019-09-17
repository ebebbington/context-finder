
/**
 * Initialise libraries to use
 */
const fs = require('fs') // used to write data to a file
const lineReader = require('line-reader') // used to read a text file line by line
let isContextWeNeed = false // used to tell the line reader when we are in a context block we want to copy
let dataToWrite = [] // to hold the data found

/**
 * Check a Line For Brackets
 * 
 * Checks the text in the line of the file for any brackets ([, ]) to
 * determine if the line-reader has reached a context title, thus reaching a NEW
 * context
 * 
 * @param {String} lineText The text in the line being read by the line-reader
 * @return {Bool} True or false based on if the line has brackets
 */
function hasBrackets (lineText = '') {
	return lineText.indexOf('[') === 0 && lineText.indexOf(']') === (lineText.length - 1)
}

/**
 * Does the Line Match a Title
 * 
 * Checks a line against any context title we are looking for to determine
 * if the line-reader has reached a context to grab
 * 
 * @param {String} lineText The text in the line being read by the line-reader
 * @param {Array} contextTitles The array of titles given on CL execution
 * @return {Bool} True or false, based on success of function
 */
function matchesContextTitle (lineText = '', contextTitles = []) {
	let matchesTitle = false
	// Make sure we are looking at a title
	if (hasBrackets(lineText)) {
		contextTitles.forEach((title) => {
			// check for a match
			if (lineText.indexOf(title) !== -1) {
				matchesTitle = true
				return
			}
		})
	}
	return matchesTitle
} 

function writeToFile (dataToWrite, fileToWrite) {
	const fileWriter = fs.createWriteStream(fileToWrite, {flags: 'w'}) // 'w' for writing, 'a' for appending
	dataToWrite.forEach(function (value) {
		fileWriter.write(value + '\n')
	})
}

module.exports = function (contextTitles = [], fileToRead = '', fileToWrite = '') {
	lineReader.eachLine(fileToRead, function (lineText, isLastLine) {

		// Check the current line
		const lineHasBrackets = hasBrackets(lineText)
		const LineMatchesTitle = matchesContextTitle(lineText, contextTitles)

		const obj = {lineText, lineHasBrackets, LineMatchesTitle}
		console.log(obj)

		// Tell the script we are in a context we want if we've reached a context we want
		if (lineHasBrackets && LineMatchesTitle) {
			isContextWeNeed = true
		}

		// Tell the script to stop extracting if reached a context we dont need
		if (lineHasBrackets && !LineMatchesTitle) {
			isContextWeNeed = false
		}

		// Pull data if we are reading a context we need
		if (isContextWeNeed) {
			dataToWrite.push(lineText)
		}

		if (isLastLine) {
			writeToFile(dataToWrite, fileToWrite)
		}
	})
}