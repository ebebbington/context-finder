function searchContextFile (dataToFind, fileToRead, fileToWrite) {
  // First check if passed in parameters are not set
	if (!dataToFind || !fileToRead || !fileToWrite) {
		throw new Error('Error: a passed in parameter is not set, please check "dataToFind", "fileTRead" and "fileToWrite" variables in the initiator script')
	}
	
	//
  // Initialise variables
 	//
  const fs = require('fs') // used to write data to a file
  const lineReader = require('line-reader') // used to read a text file line by line
	let isContextWeNeed = false // used to tell the script if we reach a context block we want
	let dataToWrite = [] // prepare array to hold the data we find and want

	// Checks if line is a context title
	function checkForBrackets (line) {
		return line.indexOf('[') === 0 && line.indexOf(']') === (line.length - 1)
	}

	// Checks if line contains the context titles we look for
	function checkForTitleWeNeed (line) {
		const len = (dataToFind.length - 1)
		for (let i = 0; i < dataToFind.length; i++) {
			if (line.indexOf(dataToFind[i]) !== -1) {
				// Found a matching title
				return true
			}
			if (dataToFind[i] === dataToFind[len]) {
				// Reached end of loop so no matching titles found
				return false
			}
		}
	}

	// Function for writing to file
	function writeData (data) {
		const fileWriter = fs.createWriteStream(fileToWrite, {flags: 'w'}) // 'w' for writing, 'a' for appending
		data.forEach(function (value) {
			fileWriter.write(value + '\n')
		})
	}

	// Above 2 functions are used together to check if current line contains both brackets AND conext title we need

  // Start reading the file line by line
  lineReader.eachLine(fileToRead, function (lineText, isLastLine) {
		// Below variables are true or false based on if current line has brackets and is a title we need 
		const hasBrackets = checkForBrackets(lineText)
		const titleWeNeed = checkForTitleWeNeed(lineText)

		// If current line is a context title we are looking for
		if (hasBrackets && titleWeNeed) {
			// Tell the script we are in a context we want
			isContextWeNeed = true
		}

		// If current line is a context title we ARENT looking for
		if (hasBrackets && !titleWeNeed) {
			// tell the script we arent in a context we need
			isContextWeNeed = false
		}

		// Based on above conditions, if we are in a context we need then grab the current line
		if (isContextWeNeed) {
			dataToWrite.push(lineText)
		}

		// If we reach the end of the file, write all of the collected data
		if (isLastLine) {
			// Quick check if the script found anything
			if (!dataToWrite) {
				console.info('No data to write')
				return
			}
			writeData(dataToWrite)
			//const fileWriter = fs.createWriteStream(fileToWrite, {flags: 'w' }) // 'w' for writing, 'a' for appending
			//dataToWrite.forEach(function (value) {
				//fileWriter.write(value + '\n')
			//})
		}
	})
}
/*
		//console.log(test1)
		//if (test1[0] && test1[1]) { console.log(test1) }
		//
		// First we check if we have reached a context we need
		//
		
		
		// Check if line has brackets
		hasBrackets = lineText.indexOf('[') === 0 && lineText.indexOf(']') === (lineText.length - 1)
		// Check if line is a context tile e need thats in the dataToFind array
		for(let i = 0; i < dataToFind.length; i++) {
			// If line matches value in given array
			if (lineText.indexOf(dataToFind[i]) !== -1) {
				isDataWeNeed = true
				inDataWeNeed= true
				break
			}
			// if we reached the end of loop - i.e. line is not what we want, set bools to false
			if (dataToFind[(dataToFind.length - 1)] === dataToFind[i]) {
				isDataWeNeed = false
				inDataWeNeed = false
				break
			}
		}

		//
		// If we are in a context we need, copy the lines until we reach a new context
		//



		//
		// Test
		//
		/*if (!inDataWeNeed) {
			// check if has brackets etc

		}
		if (inDataWeNeed) {
			// first check if line contains brackets to stop the loop of copying
			if (

		// Eliminate other contexts
		if (!inDataWeNeed) {
			inDataWeNeed = false
			return
		}
		if (!hasBrackets && !isDataWeNeed) {
			inDataWeNeed = false
		}
		// For context titles
		if (hasBrackets && isDataWeNeed) {
			dataToWrite.push(lineText + '\n')
			//console.log(lineText)
			inDataWeNeed = true
		}
		// For standrad text
		if (inDataWeNeed) {
			//console.log(lineText)
			dataToWrite.push(lineText + '\n')
		}
	})
}
	/*

    // Check if has brackets
    const lineContainsBracket = lineText.indexOf('[') !== -1 && lineText.indexOf(']') !== -1 // Check start and end
    lineContainsBracket === true ? hasBrackets = true : hasBrackets = false
    // Check if lineText equals a value in given array
    for (let k = dataToFind.length - 1; k > -1; k--) {
      const lineHasDataToFind = lineText.indexOf(dataToFind[ k ]) !== -1
      if (lineHasDataToFind) {
				console.log([lineText])
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
      // Check if any data was found
      if (!dataToWrite) {
        console.log('No data was found - nothing has been written.')
        return
      }
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
