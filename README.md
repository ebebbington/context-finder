# Requirements
Run the following commands:

    npm init
    npm install
    npm ls
    
Making sure that there are no unmet dependencies.

# Using the Script
Use 'run-script.js' to execute 'search-file.js'.
Edit the parameters inside the function call in run-script.js to what you need.

Such as if you want to look for blocks containing: '[tt-pbx]' and '[world]', from the file 'extensions.txt' and write into 'extensions-new.txt' then the function call would be:

	script(['tt-pbx', 'world'], 'extensions.txt', 'extensions-new.txt')

# What this Script Does
This script will go through every line in a given file looking for the given value sections.
  Upon reaching a context/section that matches then it will append every line until a blank line or new context, to a
  variable.
  The script will loop through the above process until it reaches the end of the file, which it will then write this
  gathered data into a new file.

# Example File to Read
Using extensions.txt file:

    [a context title]
    some context text

    [something-hello.tt-pbx.12]
    some context text
    [my-large-world]
    some context text

  Using the examples above this script will copy the sections [something-hello.tt-pbx.12] and [my-large-world].

# Simple 'How-to' Run
- Open 'run-script.js'.
- Edit the parameters inside the function call to what you need.
