// bun is very new and in beta. but with a lot of promise. perfect for a side project not meant for production.
// @ts-ignore
// import { readFile } from "bun";
// import { StringSplitFactory } from "./ampkit-parser/string-split";
import { Tokens } from "./ampkit-parser/tokens";
import { tokenList } from "./ampkit-parser/token-list";
import { tokenActions } from "./options/token-actions";
import { go as firstGroupingGo } from "./first-grouping";
import { data } from "../test-content/data";
import { ampkitDirContentsInit } from "./dir-contents";
import { ampkitProjectWalkerInit } from "./project-walker";

// test with my Vue demo project
// const dirPath = './test-content/src/';

// test with bui

const dirPath = "./test-content/bui-demo/demo/overview/";

const initBase = "index.js";

// let myFilePre = readFile(dirPath + initBase);
let myFilePre = data;
// use test content instead, because of unknown error with bun readFile as import
myFilePre = data;

myFilePre = `dog cat`;

const myFile = myFilePre.replace(/([\n\s]+)/g, " ");

export const words = myFile.split(" ");

export let tokens = new Tokens(tokenList);

firstGroupingGo(words, tokens.tokensSet, tokenActions);

// console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

// var startTime = performance.now();

// const stringSplitInit = StringSplitFactory(tokens.tokensSet, tokenActions);

// const stringSplitting = stringSplitInit(myFile);

// const result = stringSplitting.split();

// var endTime = performance.now();

// console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

// const dirHelper = ampkitDirContentsInit(dirPath, initBase);

// const dirContents = await dirHelper.getContents();

// const projectWalker = ampkitProjectWalkerInit(dirPath, dirContents.file, dirContents.files, dirContents.dir, dirContents.dirs);

// const rootFilePath = dirContents.dir.base = dirPath + '/' + dirContents.file.base;
// const fileAsString = await (await nodeFs.readFile(rootFilePath)).toString();
// import { resolve } from "path";
// // import { write, stdout, serve, file, argv } from "bun";
// import { argv } from "bun";
// let dirPath: any;
// let initBase: any;
// let defaultBase: any;

// (() => {
// dirPath = resolve(argv.at(-1));
// initBase = resolve(argv.at(-2));
// defaultBase = resolve(argv.at(-3));
// go();
// })();
