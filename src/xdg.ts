import { homedir } from "os";
import { resolve } from "path";

export const xdg = {
  config: process.env.XDG_CONFIG_HOME ?? resolve(homedir(), ".config"),
};
