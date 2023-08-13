//import exp from "constants"

import {listDirContents, createFile, createDir, removeFile, removeDir } from './index'
//const listDirContents = require('./index')

test(
    'list current dir',
    async () => {
        expect(await listDirContents('./src')).toBe(true)
    }
)

test(
    'create Dir',
    async () => {
        expect(await createDir('test')).toBe(true)
    }
)

test(
    'remove Dir',
    async () => {
        expect(await removeDir('test')).toBe(true)
    }
)

test(
    'create File',
    async () => {
        expect(await createFile('test.txt')).toBe(true)
    }
)

test(
    'remove File',
    async () => {
        expect(await removeFile('test.txt')).toBe(true)
    }
)


