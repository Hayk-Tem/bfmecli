#!/usr/bin/env node

const { Command, Argument, Option } = require("commander");
const {
  processCsf,
  processStr,
  processJson
} = require("./lib/csf");
const program = new Command();

program
  .command("csf")
  .addArgument(new Argument("<csfFilePath>", "Path to .csf file"))
  .addOption(new Option("--str [output]", "Flag for convert file to .str file format"))
  .addOption(new Option("--json [output]", "Flag for convert file to .json file format"))
  .addOption(new Option("--sort <type>").choices(["up", "down"]))
  .action(processCsf);

program
  .command("str")
  .addArgument(new Argument("<strFilePath>", "Path to .str file"))
  .addArgument(new Argument("[csfFilePath]", "Path to .csf file"))
  .action(processStr);

program
  .command("json")
  .addArgument(new Argument("<jsonFilePath>", "Path to .json file"))
  .addArgument(new Argument("[csfFilePath]", "Path to .csf file"))
  .action(processJson);

program.parse(process.argv);





