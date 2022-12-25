import { readFile } from "bun";
import { stringSplitInit } from "./ampkit-parser/string-split";

import { ampkitDirContentsInit } from "./DirContents";
import { ampkitProjectWalkerInit } from "./ProjectWalker";

// test with my Vue demo project
// const dirPath = './test-content/src/';
// test with bui
const dirPath = "./test-content/bui-demo/demo/";
// can be something like "wwww.famousfootwear.com instead of a file."
const initBase = "index.js";
const testBase = "main.js";
// const defaultBase = 'index.js';

let myFileNl = readFile(dirPath + initBase);
export const myFile = myFileNl.replace(/\n/g, " ");

const stringSplitting = stringSplitInit(myFile);

const result = stringSplitting.split();

console.log(result, "result");

// loop through array.

// tokens[i]

const tokenActions = () => {};
const tokenCodexCustom = {};

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
