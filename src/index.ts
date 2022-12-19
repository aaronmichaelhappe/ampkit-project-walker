import { ampkitDirContentsInit } from './DirContents';
import { ampkitProjectWalkerInit } from './ProjectWalker'
import * as n from "nearley";
import * as nodeFs from "node:fs/promises";
import * as path from "node:path";
import { grammar } from "./grammar";

// weirdness with nearley types and es6 modules. see README.md #/index.ts
const nAny: any = n;
const nearley: typeof n = nAny.default;

const go = async () => {
  const dirPath = './src/test-content/src';
  const initBase = 'main.js';
  const defaultBase = 'index.js';

  console.log(grammar);


  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  const dirHelper = ampkitDirContentsInit(dirPath, initBase);
  const dirContents = await dirHelper.getContents();

  const projectWalker = ampkitProjectWalkerInit(dirPath, dirContents.file, dirContents.files, dirContents.dir, dirContents.dirs);

  const rootFilePath = dirContents.dir.base = dirPath + '/' + dirContents.file.base;

  const fileAsString = await (await nodeFs.readFile(rootFilePath)).toString();

  // this is temp solution until I have time to learn parsing more in depth. This should do for now.
  let parsed: any;
  const fileAsArray = fileAsString.split(/\r?\n/)
  fileAsArray.forEach(line => {
    parsed = parser.feed(line);
  })

}
(() => {
  go();
})();

