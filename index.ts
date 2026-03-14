#!/usr/bin/env bun

const [, , command = "help", ...forwardedArgs] = Bun.argv;

type CliCommand = {
  description: string;
  run: (args: string[]) => Promise<number>;
};

const commands: Record<string, CliCommand> = {
  dev: {
    description: "Astro dev server を起動します",
    run: (args) => runBin("astro", ["dev", ...args]),
  },
  debug: {
    description: "Astro dev server を起動し、/debug ページの確認を案内します",
    run: async (args) => {
      console.log("Debug page: http://localhost:4321/debug");
      return runBin("astro", ["dev", ...args]);
    },
  },
  build: {
    description: "Astro site を build します",
    run: (args) => runBin("astro", ["build", "--silent", ...args]),
  },
  preview: {
    description: "Astro preview server を起動します",
    run: (args) => runBin("astro", ["preview", ...args]),
  },
  "format:check": {
    description: "Astro component の Prettier check を実行します",
    run: (args) =>
      runBin("prettier", [
        "./src/components/Mermaid.astro",
        "./src/components/MermaidLoader.astro",
        "./src/pages/debug.mdx",
        "--plugin",
        "prettier-plugin-astro",
        "--check",
        ...args,
      ]),
  },
  check: {
    description: "format check と build を順番に実行します",
    run: async (args) => {
      const formatExitCode = await commands["format:check"].run([]);
      if (formatExitCode !== 0) return formatExitCode;
      return commands.build.run(args);
    },
  },
  help: {
    description: "利用可能なコマンドを表示します",
    run: async () => {
      printHelp();
      return 0;
    },
  },
};

async function runBin(binName: string, args: string[]) {
  try {
    const localBin = Bun.which(binName);

    if (!localBin) {
      console.error(`[cli] '${binName}' is not installed in this project.`);
      console.error("[cli] Run `bun install` first.");
      return 1;
    }

    const child = Bun.spawn({
      cmd: [localBin, ...args],
      stdout: "inherit",
      stderr: "inherit",
      stdin: "inherit",
    });

    return await child.exited;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[cli] Failed to run ${binName}: ${error.message}`);
    } else {
      console.error(`[cli] Failed to run ${binName}.`);
    }
    console.error(
      "[cli] Bun が利用できる環境で `bun install` を実行し、依存が入っていることを確認してください。",
    );
    return 1;
  }
}

function printHelp() {
  console.log("astro-mermaid-renderer CLI");
  console.log("");
  console.log("Usage:");
  console.log("  bun run <command> [-- <args...>]");
  console.log("  bun run index.ts <command> [args...]");
  console.log("");
  console.log("Commands:");

  for (const [name, config] of Object.entries(commands)) {
    console.log(`  ${name.padEnd(12)} ${config.description}`);
  }
}

const selectedCommand = commands[command];

if (!selectedCommand) {
  console.error(`[cli] Unknown command: ${command}`);
  printHelp();
  process.exit(1);
}

const exitCode = await selectedCommand.run(forwardedArgs);
process.exit(exitCode);
