#! /usr/bin/env node

/**
 * TODO:
 *  bring astro-cli design in (loader, round-box, ...)
 *  test external requirements (env, tools, ...)
 *  install command
 *  update command
 */
//import figlet from 'figlet'
// import gradient from 'gradient-string'

import { Command } from "commander"
import path from 'path'
// import { exit, stdin as input, stdout as output } from 'node:process';
import getRandomName from './modules/RandomNames'
import { getCliData, getHasCli, makeDir, copyDir } from './modules/CommanderUtils'
import { CompanyInquirer } from './modules/CompanyInquirer'
import { interpolateOnTheFly, interpoleTemplateFile  } from './modules/Mustache'

/*
console.log("__dir",__dirname)
const cardView = {
  _PRENOM_: 'boris',
  _NOM_: 'therin'
}
const card = interpoleTemplateFile(__dirname.replace('dist','src/modules/Mustache/templates/')+'card.template', cardView)
console.log("card: \n", card)
*/

const yellowCli = new Command()
yellowCli
  .version("1.0.0")
  .description("Une CLI pour générer un template Astro inédit (https://github.com/bioboosterbob/matrix-land-astro-template)")
  .option("--dir, -d", "config the directory for template")
  .option("--company, -c", "le nom de l'entreprise ou de l'association pour laquelle vous développez le site web.")
  .option("help, h", "Affiche l'aide pour matrix-land-astro-template")
  .parse(process.argv)
  
const yellowOpts = yellowCli.opts()

const wasDirOptionUsed = getHasCli("--dir")
const wasCompanyOtpionUsed = getHasCli("--company")
const wasHelpOptionUsed = getHasCli("help","h")

if (wasHelpOptionUsed || process.argv.length < 3) yellowCli.help()

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