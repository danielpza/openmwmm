import { baseDirs } from "directories";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const CONFIG_FILE = resolve(baseDirs.config()!, "openmw/openmw.cfg");

function appendFile(file: string, content: string) {
  const prev = readFileSync(file).toString();
  writeFileSync(file, prev + content);
}

export function getDataEntries() {
  const content = readFileSync(CONFIG_FILE).toString();
  return content
    .split("\n")
    .filter((str) => str.slice(0, 5) === "data=")
    .map((str) => str.slice(6, str.length - 1))
    .filter((str) => !str.match(/Morrowind\/Data Files$/)); // remove main file from entries
}

export function addMods(mods: string[]) {
  const result = mods.map((location) => `data="${location}"`).join("\n");
  appendFile(CONFIG_FILE, "\n" + result);
  console.log("Entries added correctly");
}

export function removeMods(mods: string[]) {
  const content = readFileSync(CONFIG_FILE).toString();
  const entries = mods.map((location) => `data="${location}"`);
  const entriesSet = new Set(entries);
  const result = content
    .split("\n")
    .filter((line) => {
      if (entriesSet.has(line)) {
        entriesSet.delete(line);
        return false;
      }
      return true;
    })
    .join("\n");
  writeFileSync(CONFIG_FILE, result);
  entries.forEach((mod) => {
    if (entriesSet.has(mod)) {
      console.log(`Entry ${mod} not found`);
    } else {
      console.log(`Entry ${mod} removed`);
    }
  });
}

export function removeAll() {
  const all = getDataEntries();
  removeMods(all);
}
