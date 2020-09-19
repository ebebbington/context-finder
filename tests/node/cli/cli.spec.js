const assert = require("assert");
const { exec, execSync } = require("child_process");
const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe("CLI", function () {
  it("Should do nothing if the file to read doesn't exist", function () {
    execSync("node index.js idontexist write.txt admin");
    const writtenFileExists = fs.existsSync("../../write.txt") ||
      fs.existsSync("./write.txt");
    assert.equal(writtenFileExists, false);
  });

  it("Should overwrite file to write if already exists", () => {
    execSync(
      "node index.js tests/node/read.txt tests/node/exists_write.txt admin",
    );
    const fileContents = fs.readFileSync("tests/node/exists_write.txt", "utf8");
    assert.equal(fileContents, "[admin]\nhello\n\n[admin-pro]\nhello\n");
  });

  it("Should do nothing if no context titles are defined", () => {
    execSync("node index.js tests/node/read.txt tests/node/cli/write.txt");
    const writtenFileExists = fs.existsSync("tests/node/cli/write.txt");
    assert.equal(writtenFileExists, false);
  });

  it("Should do nothing if args are OK but no data was found in read file", async function () {
    this.timeout(2000);
    execSync(
      "node index.js tests/node/read.txt tests/node/cli/write.txt dontexist",
    );
    await sleep(1000);
    const writtenFileExists = fs.existsSync("test/write.txt");
    assert.equal(writtenFileExists, false);
  });

  it("Should extract the contexts when all arguments are correct", () => {
    execSync(
      "node index.js tests/node/read.txt tests/node/cli/write.txt admin",
    );
    // assert write file
    const fileContents = fs.readFileSync("tests/node/cli/write.txt", "utf8");
    assert.equal(fileContents, "[admin]\nhello\n\n[admin-pro]\nhello\n");
    // remove write file
    fs.unlinkSync("tests/node/cli/write.txt");
  });
});
