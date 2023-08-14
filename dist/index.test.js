"use strict";
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
const index_1 = require("./index");
//const listDirContents = require('./index')
test('list current dir', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(yield (0, index_1.listDirContents)('./src')).toBe(true);
}));
test('create Dir', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(yield (0, index_1.createDir)('test')).toBe(true);
}));
test('remove Dir', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(yield (0, index_1.removeDir)('test')).toBe(true);
}));
test('create File', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(yield (0, index_1.createFile)('test.txt')).toBe(true);
}));
test('remove File', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(yield (0, index_1.removeFile)('test.txt')).toBe(true);
}));
//# sourceMappingURL=index.test.js.map