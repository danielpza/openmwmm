# openmwmm

OpenMW Mod Manager CLI. It just reads/writes mod entries to your openmw.cfg file

## Prerequisites

- nodejs
- npm

## Installation

```sh
git clone https://github.com/danielpza/openmwmm-js
cd openmwmm-js
npm link
```

## Usage

```
$ openmwmm --help
openmwmm

list enabled/disabled mods

Commands:
  openmwmm list             list enabled/disabled mods                 [default]
  openmwmm add <folder>     add mod
  openmwmm remove <folder>  remove mod

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```
