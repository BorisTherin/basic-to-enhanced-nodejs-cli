#! /usr/bin/env node
"use strict";
/**
 * TODO:
 *  bring astro-cli design in (loader, round-box, ...)
 *  test external requirements (env, tools, ...)
 *  install command
 *  update command
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const readline = __importStar(require("node:readline/promises"));
const node_process_1 = require("node:process");
const yellowCli = new Command();
const questions = [
    {
        question: "Enter install directory : ",
        default: "yellow",
        answer: "",
        callBack: (reponse) => {
            console.log("reponse 1 : ", reponse);
        }
    },
    {
        question: "Enter your twitch channel name: ",
        default: "",
        answer: "",
        callBack: (reponse) => {
            console.log("reponse 2 : ", reponse);
        }
    },
    {
        question: "more ...",
        default: "",
        answer: "",
        callBack: (reponse) => {
            console.log("reponse 3 : ", reponse);
        }
    }
];
yellowCli
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("-l, --ls  [value]", "List directory contents")
    .option("-m, --mkdir <value>", "Create a directory")
    .option("-t, --touch <value>", "Create a file")
    .option("-i, --install", "install yellow radio")
    .parse(process.argv);
console.log(figlet.textSync("Yellow Manager"));
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
console.log('\nYELLOW VCLI Options: ', JSON.stringify(yellowOpts));
console.log('Remaining arguments: ', yellowCli.args);
console.log('\n');
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
let rl;
function listQuestions(deploy) {
    return __awaiter(this, void 0, void 0, function* () {
        let answer = yield rl.question(deploy.question +
            ((deploy.default != "") ? " (default: " + deploy.default + " )" : ""));
        if (answer == '' && deploy.default != '')
            deploy.answer = ((deploy.default != '') ? deploy.default : '');
        else
            deploy.answer = answer;
        deploy.callBack(deploy.answer);
    });
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
    console.log('option install');
    install();
}
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
        for (let i = 0; i < questions.length; i++) {
            yield listQuestions(questions[i]);
        }
        rl.close();
    });
}
//# sourceMappingURL=index.js.map