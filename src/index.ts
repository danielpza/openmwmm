#!/usr/bin/env node
import { resolve } from "path";
import yargs from "yargs";
import { addMod, getDataEntries, removeMod } from "./openmwcfg";

try {
  (yargs as any)
    .command(["list", "$0"], "list enabled/disabled mods", {}, () => {
      const entries = getDataEntries();
      console.log(entries.join("\n"));
    })
    .command("add <folder>", "add mod", {}, (args: { folder: string }) => {
      addMod(resolve(args.folder));
    })
    .command(
      "remove <folder>",
      "remove mod",
      {},
      (args: { folder: string }) => {
        removeMod(resolve(args.folder));
      }
    )
    .help().argv;
} catch (err) {
  console.error(err);
}
