#! /usr/bin/env node

/**
 * TODO:
 *  bring astro-cli design in (loader, round-box, ...)
 *  test external requirements (env, tools, ...)
 *  install command
 *  update command
 */

const { Command } = require("commander")
const fs = require("fs")
const path = require("path")
const figlet = require("figlet")
import { exit, stdin as input, stdout as output } from 'node:process';
const inquirer = require('inquirer')
const gradient = require('gradient-string');
import getRandomName from './modules/RandomNames'
import {  getCliData, getHasCli } from './modules/CommanderUtils'


console.log(`Random Name = [${getRandomName()}]`)

const yellowCli = new Command()
yellowCli
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("--dir", "config the directory for template")
  .parse(process.argv)
  
const yellowOpts = yellowCli.opts()

function isDirOptionUsed() {
    if (yellowOpts.dir) return true
    else return false
}

function makeDir(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        return(true)
    } else {
        console.log(`le repertoire ${path} existe deja`)
        return(false)
    }
}

const getCliData = (prefix: string, alias = undefined) => {
    let data = undefined;
    const prefixIndex = process.argv.findIndex(
      (arg) => arg === prefix || (alias && arg === alias)
    );
    if (prefixIndex > 0) {
      const cliData = process.argv[prefixIndex + 1] ?? undefined;
      if (cliData) {
        data = cliData.includes("-") ? undefined : cliData;
      }
    }
    return data;
  };
  

const wasDirOptionUsed = isDirOptionUsed()

console.log("is --dir ", wasDirOptionUsed)  


if (wasDirOptionUsed) {
    makeDir
}