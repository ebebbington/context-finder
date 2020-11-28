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
</p>

---

Context Finder is simple and easy to use. It extracts contexts from (usually) configuration files. The main use case is extracting contexts from Asterisk configuration files.

Refer to the example [here](./example)

# Contents

* [Use Case](#use-case)
* [Requirements](#requirements)
* [A a Script](#as-a-script)
* [CLI](#cli)
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

# As a Script

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

# CLI

`deno run --allow-read --allow-write https://deno.land/x/context_finder@v1.1.1/mod.ts <file to read> <file to write to> <context title 1> <context-title 2> ...`

# Built With

* [Deno](https://deno.land) - Runtime Environment

# License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details
