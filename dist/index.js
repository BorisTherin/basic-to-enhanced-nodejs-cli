#! /usr/bin/env node
"use strict";
/**
 * TODO:
 *  bring astro-cli design in (loader, round-box, ...)
 *  test external requirements (env, tools, ...)
 *  install command
 *  update command
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.createFile = exports.removeDir = exports.createDir = exports.listDirContents = void 0;
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
const node_process_1 = require("node:process");
const inquirer = require('inquirer');
const gradient = require('gradient-string');
/**
 * CONSTANTS
 */
const yellowCli = new Command();
const questions = [
    {
        type: 'confirm',
        name: 'toBeDelivered',
        message: 'Is this for delivery?',
        default: false,
        transformer: (answer) => (answer ? '👍' : '👎'),
    },
    {
        type: 'input',
        name: 'phone',
        message: "What's your phone number?",
        validate(value) {
            const pass = value.match(/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
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
        filter(val) {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate(value) {
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
        when(answers) {
            return answers.comments !== 'Nope, all good!';
        },
    },
];
yellowCli
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    //.option("-l, --ls  [value]", "List directory contents")
    //.option("-m, --mkdir <value>", "Create a directory")
    //.option("-t, --touch <value>", "Create a file")
    .option("-c, --config", "Config your template")
    .option("-i, --install", "install yellow radio")
    .parse(process.argv);
/**
 * FUNCTIONS
 */
function roundedLine(l, mode, content) {
    const top = ["\u256D", "\u256E"];
    const middle = ["\u2502", "\u2502"];
    const bottom = ["\u2570", "\u256F"];
    const corner = ((mode == "top") ? top : ((mode == "middle") ? middle : bottom));
    let line = corner[0];
    if (mode != "middle")
        for (let i = 0; i < l; i++)
            line += ((mode == "top") ? "\u23BC" : "\u23BC");
    else if (content.length < l) {
        line += content;
        for (let i = content.length; i < l; i++)
            line += " ";
    }
    else
        line += content;
    line += corner[1];
    return (" " + line + "\n");
}
function frame(text, pad) {
    let render = "";
    let maxlength = 0;
    let content = text.split('\n');
    content.map((line) => {
        if (maxlength < line.length)
            maxlength = line.length;
    });
    content.map((line) => {
        render += roundedLine(maxlength, "middle", line);
    });
    render = roundedLine(maxlength, "top", "") + render;
    render += roundedLine(maxlength, "bottom", "");
    return (render);
}
function listDirContents(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs.promises.readdir(filepath);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                let fileDetails = yield fs.promises.lstat(path.resolve(filepath, file));
                const { size, birthtime } = fileDetails;
                return { filename: file, "size(KB)": size, created_at: "" + birthtime };
            }));
            const detailedFiles = yield Promise.all(detailedFilesPromises);
            console.table(detailedFiles);
            return (true);
        }
        catch (error) {
            console.error("Error occurred while reading the directory!", error);
            return (false);
        }
    });
}
exports.listDirContents = listDirContents;
function createDir(filepath) {
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
        console.log("The directory has been created successfully");
        return (true);
    }
    else
        return (false);
}
exports.createDir = createDir;
function removeDir(filepath) {
    if (fs.existsSync(filepath)) {
        fs.rmdirSync(filepath, { recursive: true });
        console.log("The directory has been removed");
        return (true);
    }
    else
        return (false);
}
exports.removeDir = removeDir;
function createFile(filepath) {
    fs.openSync(filepath, "w");
    console.log("An empty file has been created");
    return (true);
}
exports.createFile = createFile;
function removeFile(filepath) {
    fs.rmSync(filepath);
    console.log(`File ${filepath} removed`);
    return (true);
}
exports.removeFile = removeFile;
// **************************************************************
const getHasCli = (prefix, alias = undefined) => {
    const prefixIndex = process.argv.findIndex((arg) => arg === prefix || (alias && arg === alias));
    return prefixIndex > 0;
};
const getCliData = (prefix, alias = undefined) => {
    var _a;
    let data = undefined;
    const prefixIndex = process.argv.findIndex((arg) => arg === prefix || (alias && arg === alias));
    if (prefixIndex > 0) {
        const cliData = (_a = process.argv[prefixIndex + 1]) !== null && _a !== void 0 ? _a : undefined;
        if (cliData) {
            data = cliData.includes("-") ? undefined : cliData;
        }
    }
    return data;
};
function listQuestions(deploy) {
    return __awaiter(this, void 0, void 0, function* () {
        inquirer
            .prompt([
            deploy.question
        ])
            .then((answers) => {
            deploy.callBack(answers);
        })
            .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            }
            else {
                console.log("Something else went wrong");
            }
        });
    });
}
/**
 * START
 */
const yellowBanner = gradient('orange', 'yellow').multiline([
    frame(figlet.textSync("Yellow Manager"), 0).split('\\n')
]);
console.log("\n" + yellowBanner);
const yellowOpts = yellowCli.opts();
const mandatoryOptions = [];
let failed = false;
for (const option of mandatoryOptions) {
    if (JSON.stringify(yellowOpts).replace(option, '') == JSON.stringify(yellowOpts)) {
        console.log(`mandatory option ${option}: failed`);
        failed = true;
    }
}
if (failed == true)
    try {
        throw new Error(` command line options failed `);
    }
    catch (e) {
        console.log(`command line options failed `);
        (0, node_process_1.exit)(1);
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
    const usage = [
        "Usage: index [options]",
        "",
        "Options:",
        "   -c, --config, Config your template",
        "   -i, --install, install yellow radio",
    ];
    console.log(gradient('orange', 'yellow').multiline([
        frame(usage.join('\n'), 0).split('\\n')
    ]));
}
if (yellowOpts.install) {
    console.log('option install');
    install();
}
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        inquirer.prompt(questions).then((answers) => {
            console.log('\nOrder receipt:');
            console.log(JSON.stringify(answers, null, '  '));
        });
    });
}
//# sourceMappingURL=index.js.map