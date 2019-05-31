/*
Documentation
Flow:
Go through every line in the file
Upon reach a context we need, loop through the file again until we reach a new context
End 2nd loop when new context is found
 */

// Set Data
const fs = require('fs')
const lineReader = require('line-reader')
const contexts = [
  'tt.subPublicHoliday.',
  'recording_platform_',
  'tt.queue.routing.',
  'recording_library_',
  'ivr-menu-',
  'voicemenu-custom-'
]
let inContext = false

//
// Method 2 - Possibly better
//
let [data, i, j] = [[], -1, 0,]
let [hasBrackets, isContext] = [false, false]

// Idea: if in context, copy all data

lineReader.eachLine('extensions.txt', function (line, last) {
  console.log(line)
  // Check if has brackets
  if (line.indexOf('[') !== -1 && line.indexOf(']') !== -1) {
    hasBrackets = true
  } else {
    hasBrackets = false
  }
  // Check if is context
  for (let k = contexts.length - 1; k > -1; k--) {
    if (line.indexOf(contexts[k]) !== -1) {
      isContext = true
      break
    }
    if (line.indexOf(contexts[k]) === -1 && isContext === true ) {
      isContext = false
      break
    }
  }
  if (hasBrackets && isContext) {
    i = i + 1
    j = 0
    inContext = true
    data.push(line)
  }
  if (!hasBrackets && !isContext && inContext === true) {
    if (!line && !hasBrackets) {
      // means its a blank line
      inContext = false
    }
    if ((line) && hasBrackets) {
      // means there is a link but its start of a new context
      inContext = false
    }
    data.push(line)
  } else {

  }
  if (last) {
    // write to file
    console.log('read last line')
    console.log(data)
    const logger = fs.createWriteStream('test.txt', { flags: 'a' })
    data.forEach(function (element) {
      logger.write(element + '\n')
    })
  }
})

//
// Method 1
//
/*
const data = [[]]
const [i, j] = [0, 0] // i = data[i] = context 0; j = data[i][j] = context content
let inContext = false

// Start reading file
lineReader.eachLine('extensions.txt', function (line, last) {
  // Get the string of current line and length
  const currentLine = line
  const length = line.length
  // Check if current line has brackets and the context
  if (isContext() && hasBrackets()) {
    inContext = true
    data[i].push(line)
    // Keep pushing until current line is blank or a new context title
    data[i].push(line) //push context title
    lineReader.eachLine()

    // Plan: find the end of context, add this context to array then earch for another
    // Get
    // Add current line to array then check all below
    data.push(line)
    lineReader.eachLine('dummy-file')
    // Start of a new context and start looping through this until we reach a new context

  }
  if (inContext === true) {

  }
  console.log('1',line)
  if (last) {
    console.log('2 last achieved')
    return false // stop reading
  }
})
// Or read line by line
lineReader.open('dummy-file.txt', function (err, reader) {
  if (err) throw err
  if (reader.hasNextLine()) {
    reader.nextLine(function (err, line) {
      try {
        if (err) throw err
        console.log('3',line)
      } finally {
        reader.close(function (err) {
          if (err) throw err
        })
      }
    })
  } else {
    reader.close(function (err) {
      if (err) throw err
    })
  }
})
*/

function compare () {

}