import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { baseDirs } from "directories";

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

export function addMod(location: string) {
  const entry = `data="${location}"`;
  appendFile(CONFIG_FILE, "\n" + entry);
  console.log(`Entry "${location}" added successfully`);
}

export function removeMod(location: string) {
  const entry = `data="${location}"`;
  const content = readFileSync(CONFIG_FILE).toString();
  const lines = content.split("\n");
  const filtered = lines.filter((str) => str !== entry);
  const result = filtered.join("\n");
  if (filtered.length < lines.length) {
    writeFileSync(CONFIG_FILE, result);
    console.log(`Entry "${location}" removed successfully`);
  } else {
    console.log(`Entry "${location}" not found`);
  }
}
