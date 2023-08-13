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
const program = new Command();
console.log(figlet.textSync("Yellow Manager"));
program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("-l, --ls  [value]", "List directory contents")
    .option("-m, --mkdir <value>", "Create a directory")
    .option("-t, --touch <value>", "Create a file")
    .parse(process.argv);
const options = program.opts();
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
if (options.ls) {
    const filepath = typeof options.ls === "string" ? options.ls : __dirname;
    listDirContents(filepath);
}
if (options.mkdir) {
    createDir(path.resolve(__dirname, options.mkdir));
}
if (options.touch) {
    createFile(path.resolve(__dirname, options.touch));
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map