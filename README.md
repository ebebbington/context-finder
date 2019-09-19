# Context Read and Print
*context-read-and-print* will grab as many contexts as you want froma file. All you have to do is specify the context titles you wish to get. The matching process will check if a context title *contains* one given on the command line, meaning one argument can match multiple blocks

## Getting Started
These instructions will get you a copy of the project up and running on your machine.

### Installing
Navigate to a directory of your choice

	cd /tmp

Clone the repo
	
	git clone https://www.github.com/ebebbington/context-read-and-print.git
	
Install dependencies

	npm i

Check if you have NPM and Node installed
	
	npm -v && node -v
	
If neither are installed, install them

	yum install npm; yum install nodejs

### How to Run

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
	
And I wanted to extract all version 1 contexts as well as any contexts that match 'support', you would type:

	node index.js my-contexts.txt some-contexts.txt version-1 support
	
This will extract all context blocks when the title matches the given arguments. As you can see, arguments will match if they are *contained* in a context title

## Built With
* [NodeJS](https://www.nodejs.org) - Runtime Environment

##
text-extractor Version 1.0.0 23/06/2019

email: EdwardSBebbington@hotmail.com
