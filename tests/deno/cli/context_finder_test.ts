import { assertEquals } from "../../../deps.ts";
import { fileExists } from "../../../mod.ts";

Deno.test({
  name: "Should do nothing if the file to read doesn't exist",
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-read",
        "--allow-run",
        "../../../mod.ts",
        "idontexist",
        "write.txt",
        "admin",
      ],
      cwd: "./tests/deno/cli",
    });
    const status = await p.status();
    assertEquals(status.code, 1);
    assertEquals(status.success, false);
    p.close();
    const exists = await fileExists("tests/deno/cli/write.txt");
    assertEquals(exists, false);
  },
});

Deno.test({
  name: "Should do nothing if no context titles are defined",
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-read",
        "--allow-run",
        "../../../mod.ts",
        "../read.conf",
        "write.txt",
      ],
      cwd: "./tests/deno/cli",
    });
    const status = await p.status();
    p.close();
    assertEquals(status.code, 1);
    assertEquals(status.success, false);
  },
});

Deno.test({
  name: "Should do nothing if args are OK but no data was found in read file",
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-read",
        "--allow-run",
        "../../../mod.ts",
        "../read.conf",
        "write.txt",
        "idontexist",
      ],
      cwd: "./tests/deno/cli",
    });
    const status = await p.status();
    p.close();
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
    assertEquals(await fileExists("tests/deno/cli/write.txt"), false);
  },
});

Deno.test({
  name: "Should extract the contexts when all arguments are correct",
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-read",
        "--allow-run",
        "--allow-write",
        "../../../mod.ts",
        "../read.conf",
        "write.conf",
        "version-1",
      ],
      cwd: "./tests/deno/cli",
    });
    const status = await p.status();
    p.close();
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
    assertEquals(await fileExists("tests/deno/cli/write.conf"), true);
    const decoder = new TextDecoder();
    const writeFileContent = decoder.decode(
      Deno.readFileSync("tests/deno/cli/write.conf"),
    );
    assertEquals(
      writeFileContent,
      "[version-1.1]\nname = Version 1.1\n[version-1.2]\nname = Version 1.2",
    );
    Deno.removeSync("tests/deno/cli/write.conf");
  },
});
