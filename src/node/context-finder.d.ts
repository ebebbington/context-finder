/**
 * @param {string[]} contextTitles An array of strings that hold the context titles to grab
 * @param {string} fileToRead The file to read e.g. './myconfs.conf'
 * @param {stirng} fileToWrite The file to write to e.g. './newConfs.conf'
 */
declare function readAndPrint(
  contextTitles: string[],
  fileToRead: string,
  fileToWrite: string,
): void;

export = readAndPrint;
