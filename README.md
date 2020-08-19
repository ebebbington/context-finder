<p align="center">
  <img height="200" src="dcf-logo.png" alt="Context Finder">
  <h1 align="center">Context Finder</h1>
</p>
<p align="center">
  <a href="https://travis-ci.com/ebebbington/context-finder">
    <img src="https://travis-ci.com/ebebbington/context-finder.svg?branch=master">
  </a>
  <a href="http://hits.dwyl.com/ebebbington/context-finder">
    <img src="http://hits.dwyl.com/ebebbington/context-finder.svg">
  </a>
  <a>
    <img src="https://img.shields.io/npm/dm/context-finder">
  </a>
  <a>
    <img src="https://img.shields.io/npm/v/context-finder">
  </a>
  <a>
    <img src="https://snyk.io/test/github/ebebbington/context-finder/badge.svg">
  </a>
</p>

---

Context Finder is based on what you want to achieve. It will pull configuration blocks that you specify (can be generic to match various blocks) from a file.

# Contents

* [Use Case](#use-case)
* [How It Works](#how-it-works)
    * [Example](#example)
* [Requirements](#requirements)
* [Require As An NPM Module](#require-as-an-npm-module)
    * [Installing](#installing)
    * [How To Run](#how-to-run)
* [Command Line Usage (From the Source)](#command-line-usage-from-the-source)
    * [Install](#install)
    * [How To Run](#how-to-run)  
* [Built With](#built-with)
* [License](#license) 

# Use Case

You have `.conf` file that holds *context blocks* for certain configurations. That file might look like this:

```
[user-1]
name = Edward
language = en

[user-2]
name = John
language = us

[admin-1-1]
name = Admin Edward

[admin-1-2]
name = Admin John

[admin-2]
name = Admin
```

You want to create a new configuration file using **some** from the above file. You might want to pull only `admin` blocks, and if you are trying to be very specific, you might want to only pull `admin-1` blocks.

This is where ***Content Finder*** comes in.

# How it Works

Contexts are matched based on if the title **contains** the given parameters. This means that a single argument *can* match multiple context blocks, and will then write those collected to a file

## Example

Passing in `version-1.` as an argument will match `version-1.`, `version-1.1`, `version-1.two` and so on.

# Requirements

* NodeJS

`apt install nodejs`

* NPM

`apt install npm`

# Require as an NPM Module

## Installing

* Install the package from the NPM library

	`npm i --save context-finder` in your project root, or where your configuration files reside.

	You will need to add `node_modules` and `package-lock.json` to your `gitignore` file, then track `package.json`

## How To Run

* Require the package

```
// my-node-script.js
const contextFinder = require('context-finder')
```

* Gather your Variables and Run

```
const contextsToFind = ['version-1.', 'version-4.']
const fileToRead = 'all-contexts.txt' // this file must exist
const fileToWrite = 'some-contexts.txt'

contextFinder(contextsToFind, fileToRead, fileToWrite)
```

# Command Line Usage (From the Source)

## Install

* Navigate to a directory of your choice

`cd ~/projects`

* Pull down the repository
	
`git clone https://www.github.com/ebebbington/context-finder.git`
	
* Install dependencies

`npm i`

## How To Run

`node index.js <file to read> <file to write to> <context title 1> <context-title 2> ...`

# Built With

* [NodeJS](https://www.nodejs.org) - Runtime Environment

# License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details
