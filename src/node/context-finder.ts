/**
 * Initialise libraries to use
 */
const fs = require("fs"); // used to write data to a file
const lineReader = require("line-reader"); // used to read a text file line by line

/**
 * Check a Line For Brackets
 * 
 * Checks the text in the line of the file for any brackets ([, ]) to
 * determine if the line-reader has reached a context title, thus reaching a NEW
 * context
 * 
 * @param {string} lineText The text in the line being read by the line-reader
 * @return {boolean} True or false based on if the line has brackets
 */
function hasBrackets(lineText = ""): boolean {
  return lineText.indexOf("[") === 0 &&
    lineText.indexOf("]") === (lineText.length - 1);
}

/**
 * Does the Line Match a Title
 * 
 * Checks a line against any context title we are looking for to determine
 * if the line-reader has reached a context to grab
 * 
 * @param {string} lineText The text in the line being read by the line-reader
 * @param {string[]} contextTitles The array of titles given on CL execution
 * @return {boolean} True or false, based on success of function
 */
function matchesContextTitle(lineText = "", contextTitles = []): boolean {
  // Make sure we are looking at a title
  let isAMatchingTitle = false;
  if (hasBrackets(lineText)) {
    contextTitles.forEach((title) => {
      // check for a match
      if (lineText.indexOf(title) !== -1) {
        isAMatchingTitle = true;
      }
    });
  }
  return isAMatchingTitle;
}

/**
 * Write The Collected Data to a File
 * 
 * Called once the line-reader has reached the end of the file, to
 * then write the contexts collected to a file
 * @param {string[]} dataToWrite Array holding every line found for all contexts asked for
 * @param {string} fileToWrite The file to write to
 */
function writeToFile(dataToWrite = [], fileToWrite = ""): void {
  const fileWriter = fs.createWriteStream(fileToWrite, { flags: "w" }); // 'w' for writing, 'a' for appending
  dataToWrite.forEach(function (value) {
    fileWriter.write(value + "\n");
  });
}

/**
 * Read the File and Write to a New One
 * 
 * The main function. Read a file line by line, checking if a context exists that matches
 * the list given. If it matches then the line-reader will save the whole
 * context block and repeat the process for reaching a new block.
 * Every other function is abstracted.
 * 
 * @param {string[]} contextTitles The contexts to grab matching any of these values given from the CL
 * @param {string} fileToRead The file to read with the contexts
 * @param {string} fileToWrite The file to write to
 */
function readAndPrint(
  contextTitles = [],
  fileToRead = "",
  fileToWrite = "",
): void {
  // Variables that we don't want redeclared
  let isContextWeNeed = false; // used to tell the line reader when we are in a context block we want to copy
  let dataToWrite: string[] = []; // to hold the data found

  // Start the loop of reading each line of the file
  lineReader.eachLine(
    fileToRead,
    function (lineText: string, isLastLine: boolean) {
      // Check the current line for brackets and matching titles
      const lineHasBrackets = hasBrackets(lineText);
      const LineMatchesTitle = matchesContextTitle(lineText, contextTitles);

      // Tell the script we are in a context we want if we've reached a context we want
      if (lineHasBrackets && LineMatchesTitle) {
        isContextWeNeed = true;
      }

      // Tell the script to stop extracting if reached a context we dont need
      if (lineHasBrackets && !LineMatchesTitle) {
        isContextWeNeed = false;
      }

      // Pull data if we are reading a context we need
      if (isContextWeNeed) {
        dataToWrite.push(lineText);
      }

      // Write to the file if we've reached the end of the file and there is data to write
      if (isLastLine && dataToWrite.length > 0) {
        // @ts-ignore
        writeToFile(dataToWrite, fileToWrite);
      }
    },
  );
}

module.exports = readAndPrint;
