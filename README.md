# Context Read and Print
*context-read-and-print* is used to grab contexts from a file chosen by you using contexts titles to search for given on the command line. The main script will then read the file checking if a context matches against the list given on he CL and saves these into a file. 

## Getting Started
These instructions will get you a copy of the project up and running on your machine.

### Installing
cd into the directory of your choice where text-extractor will lie

	cd /tmp

Clone the repo
	
	git clone https://www.github.com/ebebbington/context-read-and-print.git

Check if you have NPM and Node installed
	
	npm -v && node -v
	
If neither are installed, install them

	yum install npm; yum install nodejs

## How to Run

You will be reading contexts from one file, against a list and saving them if there are matches

	node index.js <file to read> <file to write> <context title 1> <context-title 2> ...
	
*Example*

Say we have a file with the following:

	# file name: my-contexts.txt

	[version-1.1]
	context body
	
	[version-2.3]
	context body
	
	[version-1.9]
	context body

	[support-4]
	context body
	
And I wanted to extract any contexts with "version 1" and "support-4", you would type:

	node index.js my-contexts.txt some-of-my-contexts version-1 support-4
	
This will extract all context blocks when the title matches the given arguments. As you can see, arguments will match if they are *contained* in a context title

## Built With
* [NodeJS](https://www.nodejs.org) - Runtime Environment

## Contributing
Under construction

##
text-extractor Version 2.1 23/06/2019

email: EdwardSBebbington@hotmail.com
