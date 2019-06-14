# Background
These scripts are used to extract specific sections/blocks of text (also known as contexts) from a text file. The file is usually structured like so:

    [context title.version-1]
    context text
    [context title.version-2]
    context text
    
    [context-title.version-3]
There are two scripts:
- search-file.js
- template.js

`template.js` is used as a template file for you to use, to execute the main script (`search-file`).

# Requirements
Have the following:
- NodeJS installed

    `yum install nodejs`
- line-reader NPM module installed
    
     `npm install line-reader`
        

# Running the Script
Use `template.js` as the starting point to run the main script. Modify the variables (`data`, `fileToRead` and `fileToWrite`) within this script to what you need.

#Example Use
I want to look for all text containing 'hello.world' but there are multiple versions of this like `hello.world.version-1.2` in the file `/home/list.txt` and transfer the gathered data into `/home/<user>/temp.txt`. The code structure would look like so:

    const data = ['hello.world.']
    const fileToRead = '/home/list.txt'
    cconst fileToWrite = '/home/edward/temp.txt'
    
You would then run this script:

    node template.js
    
And it will search the specific file for blocks of text in the `data` array and write the collected data to the new file.

# Detailed Script Explanation
This script will go through every line in a given file looking for the given value sections.
  Upon reaching a context/section that matches then it will save the data on the file line it is on until the line-reader is on a blank line or new context.
  The script will loop through this process until it reaches the end of the file, which it will then write this
  gathered data into a new file.

##
search-context-file Version 1.0 02/06/2019

email: EdwardSBebbington@hotmail.com