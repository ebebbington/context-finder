import { contextFinder } from "../../../src/deno/context_finder.ts";
import { assertEquals } from "../../../deps.ts"

const fileToRead = "tests/deno/read.conf"
const fileToWrite = "tests/deno/import/write.conf"
const contexts = ['version']

contextFinder(contexts, fileToRead, fileToWrite);

Deno.test("Works when inside a script", async function () {
  const content = new TextDecoder().decode(await Deno.readFile("tests/deno/import/write.conf"))
  assertEquals(content,
      "[version-1.1]\n" +
      "name = Version 1.1\n" +
      "[version-1.2]\n" +
      "name = Version 1.2\n" +
      "[version-2]\n" +
      "name = Version 2\n" +
      "[version-3.1]\n" +
      "name = Version 3.1"
  )
  await Deno.remove('tests/deno/import/write.conf')
})