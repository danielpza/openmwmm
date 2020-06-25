#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import yargs from "yargs";
import { xdg } from "./xdg";

const CONFIG_FILE = resolve(xdg.config, "openmw/openmw.cfg");

function appendFile(file: string, content: string) {
  const prev = readFileSync(file).toString();
  writeFileSync(file, prev + content);
}

try {
  (yargs as any)
    .command(
      ["list", "$0"],
      "list enabled/disabled mods",
      {},
      function listMods() {
        const content = readFileSync(CONFIG_FILE).toString();
        const entires = content
          .split("\n")
          .filter((str) => str.slice(0, 5) === "data=")
          .map((str) => str.slice(6, str.length - 1));
        console.log(entires.join("\n"));
      }
    )
    .command("add <folder>", "add mod", {}, function addMod(args: {
      folder: string;
    }) {
      const folder = resolve(args.folder);
      const entry = `data="${folder}"`;
      appendFile(CONFIG_FILE, "\n" + entry);
      console.log(`Entry "${folder}" added successfully`);
    })
    .command("remove <folder>", "remove mod", {}, function removeMod(args: {
      folder: string;
    }) {
      const folder = resolve(args.folder);
      const entry = `data="${folder}"`;
      const content = readFileSync(CONFIG_FILE).toString();
      const result = content
        .split("\n")
        .filter((str) => str !== entry)
        .join("\n");
      writeFileSync(CONFIG_FILE, result);
      console.log(`Entry "${folder}" removed successfully`);
    })
    .help().argv;
} catch (err) {
  console.error(err);
}
