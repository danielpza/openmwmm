#!/usr/bin/env node
import { resolve } from "path";
import yargs from "yargs";
import { addMods, getDataEntries, removeAll, removeMods } from "./openmwcfg";

try {
  (yargs as any)
    .command(["list", "$0"], "list enabled/disabled mods", {}, () => {
      const entries = getDataEntries();
      console.log(entries.join("\n"));
    })
    .command(
      "add <folders..>",
      "add mods",
      {},
      (args: { folders: string[] }) => {
        addMods(args.folders.map((p) => resolve(p)));
      }
    )
    .command(
      "remove <folders..>",
      "remove mods",
      {},
      (args: { folders: string[] }) => {
        removeMods(args.folders.map((p) => resolve(p)));
      }
    )
    .command("remove-all", "remove all mods", {}, () => {
      removeAll();
    })
    .help().argv;
} catch (err) {
  console.error(err);
}
