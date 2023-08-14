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
// import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';
//import inquirer from 'inquirer';
const inquirer = require('inquirer')

const yellowCli = new Command()
/*
interface deploy {
  question: string,
  default: string, 
  answer: string,
  callBack: Function,
}
*/
/*
const questions: deploy[] = [
  { 
    question: "Enter install directory : ", 
    default: "yellow", 
    answer: "", 
    callBack: (reponse: string)=>{
      console.log("reponse 1 : ", reponse)
    }
  },
  { 
    question: "Enter your twitch channel name: ", 
    default: "", 
    answer: "", 
    callBack: (reponse: string)=>{
      console.log("reponse 2 : ", reponse)
    }
  },
  { 
    question: "more ...", 
    default: "", 
    answer: "", 
    callBack: (reponse: string)=>{
      console.log("reponse 3 : ", reponse)
    }
  }
];
*/

const questions = [
  {
    type: 'confirm',
    name: 'toBeDelivered',
    message: 'Is this for delivery?',
    default: false,
    transformer: (answer: string) => (answer ? '👍' : '👎'),
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number?",
    validate(value: string) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i,
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid phone number';
    },
  },
  {
    type: 'list',
    name: 'size',
    message: 'What size do you need?',
    choices: ['Large', 'Medium', 'Small'],
    filter(val: string) {
      return val.toLowerCase();
    },
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many do you need?',
    validate(value: string) {
      const valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  },
  {
    type: 'expand',
    name: 'toppings',
    message: 'What about the toppings?',
    choices: [
      {
        key: 'p',
        name: 'Pepperoni and cheese',
        value: 'PepperoniCheese',
      },
      {
        key: 'a',
        name: 'All dressed',
        value: 'alldressed',
      },
      {
        key: 'w',
        name: 'Hawaiian',
        value: 'hawaiian',
      },
    ],
  },
  {
    type: 'rawlist',
    name: 'beverage',
    message: 'You also get a free 2L beverage',
    choices: ['Pepsi', '7up', 'Coke'],
  },
  {
    type: 'input',
    name: 'comments',
    message: 'Any comments on your purchase experience?',
    default: 'Nope, all good!',
  },
  {
    type: 'list',
    name: 'prize',
    message: 'For leaving a comment, you get a freebie',
    choices: ['cake', 'fries'],
    when(answers: any) {
      return answers.comments !== 'Nope, all good!';
    },
  },
];

yellowCli
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .option("-i, --install", "install yellow radio")
  .parse(process.argv)

console.log(figlet.textSync("Yellow Manager"))

const yellowOpts = yellowCli.opts()
const mandatoryOptions: string[] = []
let failed: boolean = false
for (const option of mandatoryOptions) {
  if ( JSON.stringify(yellowOpts).replace(option, '') == JSON.stringify(yellowOpts)) {
    console.log(`mandatory option ${option}: failed`)
    failed = true
  }
}
if (failed == true)
  try { throw new Error(` command line options failed `); } 
  catch(e){ console.log(`command line options failed `); exit(1); }

console.log('\nYELLOW VCLI Options: ', JSON.stringify(yellowOpts));
console.log('Remaining arguments: ', yellowCli.args);
console.log('\n')

export async function listDirContents(filepath: string) {
  try {
    const files = await fs.promises.readdir(filepath)
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(filepath, file))
      const { size, birthtime } = fileDetails
      return { filename: file, "size(KB)": size, created_at: ""+birthtime }
    })
    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
    return(true)
  } catch (error) {
      console.error("Error occurred while reading the directory!", error)
      return(false)
  }
}

export function createDir(filepath: string) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
    console.log("The directory has been created successfully");
    return(true)
  }else return(false)
}

export function removeDir(filepath: string) {
  if (fs.existsSync(filepath)) {
    fs.rmdirSync(filepath, { recursive: true });
    console.log("The directory has been removed");
    return(true)
  }else return(false)
}

export function createFile(filepath: string) {
  fs.openSync(filepath, "w");
  console.log("An empty file has been created");
  return(true);
}

export function removeFile(filepath: string) {
  fs.rmSync(filepath);
  console.log(`File ${filepath} removed`);
  return(true);
}
// **************************************************************

const getHasCli = (prefix: string, alias = undefined) => {
  const prefixIndex = process.argv.findIndex(
    (arg) => arg === prefix || (alias && arg === alias)
  );
  return prefixIndex > 0;
};

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

//let rl: readline.Interface
async function listQuestions(deploy: any) {

  inquirer
  .prompt([
    deploy.question
  ])
  .then((answers: string) => {
    deploy.callBack(answers)
  })
  .catch((error: any) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log("Something else went wrong")
    }
  });

  /*
  let answer: string = await rl.question(
    deploy.question+
    ((deploy.default != "")?" (default: "+deploy.default+" )":"")
  );
  if (answer == '' && deploy.default != '')
    deploy.answer = ((deploy.default != '')?deploy.default:'');
  else deploy.answer = answer;
  deploy.callBack(deploy.answer)
  */
}

if (yellowOpts.ls) {
  const filepath = typeof yellowOpts.ls === "string" ? yellowOpts.ls : __dirname;
  listDirContents(filepath);
}

if (yellowOpts.mkdir) {
  createDir(path.resolve(__dirname, yellowOpts.mkdir));
}

if (yellowOpts.touch) {
  createFile(path.resolve(__dirname, yellowOpts.touch));
}

if (!process.argv.slice(2).length) {
  yellowCli.outputHelp();
}

if (yellowOpts.install) {
  console.log('option install')
  install()
}

async function install() {
  //rl =  readline.createInterface({ input, output });
  //for (let i: number = 0; i < questions.length; i++) {
    //await listQuestions(questions)
  //}
  //rl.close();
  inquirer.prompt(questions).then((answers: any) => {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers, null, '  '));
  });
}
