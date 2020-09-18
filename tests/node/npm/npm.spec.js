const assert = require('assert');
const { exec } = require("child_process");
const fs = require('fs')
const contextFinder = require('../../../src/node/context-finder')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('NPM', function() {

  it('Should do nothing if the file to read does not exist', () => {
    const contextsToFind = ['admin']
    const fileToRead = 'test/dontexist.txt' // this file must exist
    const fileToWrite = 'test/write.txt'
    contextFinder(contextsToFind, fileToRead, fileToWrite)
    const writtenFileExists = fs.existsSync('../../write.txt') || fs.existsSync('./write.txt') || fs.existsSync('test/write.txt')
    assert.equal(writtenFileExists, false)
  })

  it('Should overwrite the file to write if already exists', () => {
    const contextsToFind = ['admin']
    const fileToRead = 'test/read.txt' // this file must exist
    const fileToWrite = 'test/exists_write.txt'
    contextFinder(contextsToFind, fileToRead, fileToWrite)
    const fileContents = fs.readFileSync('test/exists_write.txt', 'utf8')
    assert.equal(fileContents, '[admin]\nhello\n\n[admin-pro]\nhello\n')
  })

  it('Should do nothing if no context titles are defined', () => {
    const contextsToFind = ['dontexist']
    const fileToRead = 'test/read.txt' // this file must exist
    const fileToWrite = 'test/write.txt'
    contextFinder(contextsToFind, fileToRead, fileToWrite)
    const writtenFileExists = fs.existsSync('test/write.txt')
    assert.equal(writtenFileExists, false)
  })

  it('Should do nothing if args are OK but no data was found in read file', () => {
    const contextsToFind = []
    const fileToRead = 'test/read.txt' // this file must exist
    const fileToWrite = 'test/write.txt'
    contextFinder(contextsToFind, fileToRead, fileToWrite)
    const writtenFileExists = fs.existsSync('test/write.txt')
    assert.equal(writtenFileExists, false)
  })

  it('Should create the file with correct data when all is OK', async function () {
    this.timeout(2000)
    const contextsToFind = ['admin']
    const fileToRead = 'test/read.txt' // this file must exist
    const fileToWrite = 'test/write.txt'
    contextFinder(contextsToFind, fileToRead, fileToWrite)
    await sleep(1000)
    const fileContents = fs.readFileSync('test/write.txt', 'utf8')
    assert.equal(fileContents, '[admin]\nhello\n\n[admin-pro]\nhello\n')
    // remove write file
    fs.unlinkSync('test/write.txt')
  })

});