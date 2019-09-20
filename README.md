# Context Finder
**context-finder** will grab an infinite amount of contexts from a file (usually configuration files), only limited by how many you specify. Contexts are matched based on if the title **contains** the given parameters. This means that a single argument *can* match multiple context blocks

**Example**

Passing in `version-1.` as an argument will match `version-1.`, `version-1.1`, `version-1.two` and so on.

## Requirements

* NodeJS

`apt install nodejs`

* NPM

`apt install nodejs`

## Require as an NPM Module

### Installing

* Install the package from the NPM library

`npm i context-finder`

### How To Run

*Note: Make sure you are in the directory where the library held by `node_modules` resides*

* Require the package

```
// my-node-script.js
const contextFinder = require('context-finder')
```

* Gather your Variables

```
const contextsToFind = ['version-1.', 'version-4.']
const fileToRead = 'all-contexts.txt' // this file must exist
const fileToWrite = 'some-contexts.txt' // this file doesn't have to exist
```

* Execute

*Note: Parameters must be the array of context titles, the file to read, and the file to write, respectively*
`contextFinder.readAndPrint(contextsToFind, fileToRead, fileToWrite)`

## Command Line Usage (From the Source)

### Install

* Navigate to a directory of your choice

`cd ~/projects`

* Pull down the repository
	
`git clone https://www.github.com/ebebbington/context-read-and-print.git`
	
* Install dependencies

`npm i`

### How To Run

`node index.js <file to read> <file to write to> <context title 1> <context-title 2> ...`

## Built With
* [NodeJS](https://www.nodejs.org) - Runtime Environment

##
context-finder Version 1.0.0 23/06/2019

email: EdwardSBebbington@hotmail.com
