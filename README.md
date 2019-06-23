# Background
This script is used to extract specific contexts from a text file denoed by '[some title]'. The file is usually structured like so:

    [context title.version-1]
    context text
    [context title.version-2]
    context text
    
    [context-title.version-3]

There are two scripts:
- `text-extractor.js`
- `call-text-extractor.js`

`call-text-extractor.js` is used for you to edit the variables in the script and then to execute the main script using these values.

The values in the data array in `call-file-extractor` are used to look for any context titles contains those values e.g. there are 5 contexts related to 'version', adding 'version-' into the array will search for 'version-xxx'.

# Requirements
Have the following:
- NodeJS installed

  `yum install nodejs`

- NPM installed

	`npm init`

- line-reader NPM module installed
    
  `npm install line-reader`
        

# Example of Running the Text Extactor
Edit the variables in `call-text-extractor.js` to specify the contexts you want to find, the file to read and the file to write

		const textExtractor = require('./text-extractor').searchContextFile
		const data = ['version-', 'another context title']
		const fileToRead = 'path to file to read.txt'
		const fileToWrite = 'path of file to write to eg /tmp/test.txt'

Thats the configuration setup, now you are ready.

Call the initiator file with `node call-file-extractor` and check the file it wrote to.

# Detailed Script Explanation
This script will go through every line in a given file looking for the given value sections.
  Upon reaching a context/section that matches then it will save the data on the file line it is on until the line-reader is on a blank line or new context.
  The script will loop through this process until it reaches the end of the file, which it will then write this
  gathered data into a new file.

##
text-extractor Version 2.0 23/06/2019

email: EdwardSBebbington@hotmail.com
