# openwmmm

OpenMW Mod Manager CLI. It just reads/writes mod entries to your openmw.cfg file

## Prerequisites

- nodejs
- npm

## Installation

```sh
git clone https://github.com/danielpza/openwmmm-js
cd openwmmm-js
npm link
```

## Usage

```
$ openwmmm --help
openwmmm

list enabled/disabled mods

Commands:
  openwmmm list             list enabled/disabled mods                 [default]
  openwmmm add <folder>     add mod
  openwmmm remove <folder>  remove mod

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```
