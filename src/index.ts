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
import getRandomName from './modules/randomNames/'


console.log(`Random Name = [${getRandomName()}]`)

