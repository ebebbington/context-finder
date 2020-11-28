<p align="center">
  <img height="200" src="dcf-logo.png" alt="Context Finder">
  <h1 align="center">Context Finder</h1>
</p>
<p align="center">
  <a href="https://github.com/ebebbington/context-finder/actions">
    <img src="https://img.shields.io/github/workflow/status/ebebbington/context-finder/master?label=build">
  </a>
  <a href="https://github.com/drashland/context-finder/releases">
    <img src="https://img.shields.io/github/release/ebebbington/context-finder.svg?color=bright_green&label=latest">
  </a>
  <a href="http://hits.dwyl.com/ebebbington/context-finder">
    <img src="http://hits.dwyl.com/ebebbington/context-finder.svg">
  </a>
  <a>
    <img src="https://img.shields.io/npm/dm/context-finder?label=npm Downloads">
  </a>
  <a>
    <img src="https://snyk.io/test/github/ebebbington/context-finder/badge.svg">
  </a>
</p>

---

Context Finder is simple and easy to use. It extracts contexts from (usually) configuration files. The main use case is extracting contexts from Asterisk configuration files.

Refer to the example [here](./example)

Context Finder is available for NPM/Node and Deno.

# Contents

* [Use Case](#use-case)
* [Requirements](#requirements)
* [NPM: As a Script](#npm-as-a-script)
* [Node: CLI](#node-cli)
* [Deno: A a Script](#deno-as-a-script)
* [Deno: CLI](#deno-cli)
* [Built With](#built-with)
* [License](#license) 

# Use Case

You have a file that holds *context blocks*. That file might look like this:

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

You want to extract all `admin-1` contexts. In a single command you can pull that into a resulting file:

```
[admin-1-1]
name = Admin Edward

[admin-1-2]
name = Admin John
```

This is where ***Content Finder*** comes in.

# Requirements

* If using NPM
    * NodeJS
        * `apt install nodejs`
    * NPM
        * `apt install npm`
 
* If using Deno
    * Deno

# NPM: As a Script

* Install the package from the NPM library

	`npm i --save context-finder` in your project root, or where your configuration files reside.

	You will need to add `node_modules` and `package-lock.json` to your `gitignore` file, then track `package.json`

* Require the package

```typescript
// my-node-script.js
const contextFinder = require('context-finder')
```

* Gather your Variables and Run

```typescript
const contextsToFind = ['version-1.', 'version-4.']
const fileToRead = 'all-contexts.txt' // this file must exist
const fileToWrite = 'some-contexts.txt'

contextFinder(contextsToFind, fileToRead, fileToWrite)
```

# Node: CLI

* Navigate to a directory of your choice

`cd ~/projects`

* Pull down the repository
	
`git clone https://www.github.com/ebebbington/context-finder.git`
	
* Install dependencies

`cd conteext-finder && npm i`

* Run

`node index.js <file to read> <file to write to> <context title 1> <context-title 2> ...`

# Deno: As a Script

* Import the module

```typescript
import { contextFinder } from "https://deno.land/x/context_finder@v1.1.1/mod.ts";
```

* Gather your data and run

```typescript
const contextsToFind = ['version-1.', 'version-4.']
const fileToRead = 'all-contexts.txt' // this file must exist
const fileToWrite = 'some-contexts.txt'

contextFinder(contextsToFind, fileToRead, fileToWrite)
```

# Deno: CLI

`deno run --allow-read --allow-write https://deno.land/x/context_finder@v1.1.1/mod.ts <file to read> <file to write to> <context title 1> <context-title 2> ...`

# Built With

* [NodeJS](https://www.nodejs.org) - Runtime Environment
* [Deno](https://deno.land) - Runtime Environment

# License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details
