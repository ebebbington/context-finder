const assert = require('assert');
const { exec } = require("child_process");
const fs = require('fs')

describe('CLI', function() {

  it('Should do nothing if the file to read doesn\'t exist', function() {
    exec('node index.js idontexist write.txt admin', (error, stdout, stderr) => {
      const writtenFileExists = fs.existsSync('../../write.txt') || fs.existsSync('./write.txt')
      assert.equal(error, null)
      assert.equal(stderr, '')
      assert.equal(writtenFileExists, false)
    //   if (error) {
    //     console.log(`error: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    });
  });

  it('Should do nothing if no context titles are defined', () => {
    exec('node index.js test/read.txt test/write.txt', (error, stdout, stderr) => {
      const writtenFileExists = fs.existsSync('test/write.txt')
      assert.equal(error, null)
      assert.equal(stderr, '')
      assert.equal(writtenFileExists, false)
    })
  })

  it('Should extract the contexts when all arguments are correct', () => {
    exec('node index.js test/read.txt test/write.txt admin', (error, stdout, stderr) => {
      // assert write file
      const fileContents = fs.readFileSync('test/write.txt', 'utf8')
      assert.equal(fileContents, '[admin]\nhello\n\n[admin-pro]\nhello\n')
      // remove write file
      fs.unlinkSync('test/write.txt')
    })
  })

});