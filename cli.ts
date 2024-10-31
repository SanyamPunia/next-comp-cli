#!/usr/bin/env node

import { program } from "commander";
import { generateComponent } from "./generate-component";

async function run() {
  program
    .version("1.2.0")
    .description("A CLI to generate Next.js components with TypeScript support")
    .action(generateComponent);

  await program.parseAsync(process.argv);
}

run().catch(console.error);
