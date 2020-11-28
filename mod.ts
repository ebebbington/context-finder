import { contextFinder, helpMessage } from "./src/deno/context_finder.ts";

export const fileExists = async (filename: string): Promise<boolean> => {
  try {
    await Deno.stat(filename);
    // successful, file or directory must exist
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
};

async function runFromCommandLine() {
  if (import.meta.main !== true) {
    return false;
  }
  // Check if --help argument is used
  const args = Deno.args;
  if (args[0] === "--help") {
    console.info(helpMessage);
    Deno.exit(1);
  }

  // Check command line arguments are set (minimum is 5: node index.js <file> <file> <context>)
  if (args.length < 3) {
    console.error("Invalid arguments. See --help");
    Deno.exit(1);
  }

  // Initialise data to be passed into function call
  const fileToRead = args[0];
  const fileToWriteTo = args[1];
  const contexts = (args.slice(2)).filter((arg) => arg.indexOf("--") == -1);

  // Check fileToRead exists
  const fileToReadExists = await fileExists(fileToRead);
  if (!fileToReadExists) {
    console.error("File to read does not exist.");
    Deno.exit(1);
  }

  // Call the function
  contextFinder(contexts, fileToRead, fileToWriteTo);
}

/* If ran from the command line */
await runFromCommandLine();

export { contextFinder };
