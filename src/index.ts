#! /usr/bin/env node

/**
 * TODO:
 *  bring astro-cli design in (loader, round-box, ...)
 *  test external requirements (env, tools, ...)
 *  install command
 *  update command
 */

import { Command } from "commander"

// const path = require("path")
import path from 'path'
//const figlet = require("figlet")
import figlet from 'figlet'
import { exit, stdin as input, stdout as output } from 'node:process';
// const inquirer = require('inquirer')
// const gradient = require('gradient-string');
import gradient from 'gradient-string'
import getRandomName from './modules/RandomNames'
import { getCliData, getHasCli, makeDir, copyDir } from './modules/CommanderUtils'
import { CompanyInquirer } from './modules/CompanyInquirer'

const yellowCli = new Command()
yellowCli
  .version("1.0.0")
  .description("Une CLI pour générer un template Astro inédit (https://github.com/bioboosterbob/matrix-land-astro-template)")
  .option("--dir, -d", "config the directory for template")
  .option("--company, -c", "le nom de l'entreprise ou de l'association pour laquelle vous développez le site web.")
  .option("--help, -h, help, h", "Affiche l'aide pour matrix-land-astro-template")
  .parse(process.argv)
  
const yellowOpts = yellowCli.opts()

const wasDirOptionUsed = getHasCli("--dir")
const wasCompanyOtpionUsed = getHasCli("--company")
const wasHelpOptionUsed = getHasCli("help","h")

if (wasHelpOptionUsed) yellowCli.help()

if (wasDirOptionUsed) {
    let dirPath = getCliData("--dir")
    if (dirPath) {
      try {
        makeDir(dirPath)
      } catch (error) {
        console.error(error)
        yellowCli.help()
      }
      copyDir("./template", "./"+dirPath)
    } else {
        let generatedFolderName = getRandomName()
        console.log(`Your project will be generated in the [${generatedFolderName}]`)
        try {
          makeDir(generatedFolderName)
        } catch (error) {
          yellowCli.help()
          console.error(error)
        }      
        copyDir("./template", "./"+generatedFolderName)  
    }
}

if (wasCompanyOtpionUsed) {
  console.log("company option handle")
  CompanyInquirer()
}