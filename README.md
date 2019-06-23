# text-extractor
*text-extractor* is used to grab any number of contexts from a file that you specify using values in an array that will match multiple context titles e.g. you want to grab contexts with the titles 'version-xxxx', so one value in the array will be 'version-' - this will grab all contexts with that value in the title. It will read a file and write the output into a new file with the exact same format. This project holds 2 files: `call-text-extractor.js` and `text-extactor.js`, the latter is where the magic happens and the former is where you changes the values to wat you want and calls the main script.

## Getting Started
These instructions will get you a copy of the project up and running on your machine.

### Installing
cd into the directory of your choice where text-extractor will lie

	cd /tmp

Clone the repo
	
	git clone https://www.github.com/ebebbington/text-extractor.git

Check if you have NPM installed
	
	npm -v

If NPM is not installed, install it
	
	yum install npm

Install NodeJS
	
	yum install nodejs

Install line-reader module
	
	npm install line-reader

Finally, check that NPM, line-reader and NodeJS are all installed correctly
	
	npm -v && nodejs -v && npm list

Output should look like so
	
	$ npm -v && nodejs -v && npm list
	6.9.0
	v10.16.0
	/tmp/text-extractor
	   -- line-reader@0.4.0

Note: from here, you can test the application itself by doing `node call-text-extractor.js`

Once everything checks out, edit the variables in `call-text-extractor.js`. This script will hold the file to read, and context titles to grab.
	
	const data = ['version-', page-1.']
	const fileToRead = '/path/to/file/to/read.txt'
	const fileToWrite = '/path/of/file/to/write/to.txt'

Finally, run the script
	
	node call-text-extractor.js

## Built With
* [NodeJS](https://www.nodejs.org) - Runtime Environment

## Contributing
Under construction

##
text-extractor Version 2.1 23/06/2019

email: EdwardSBebbington@hotmail.com
