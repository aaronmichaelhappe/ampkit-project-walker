import { describe, expect, test } from "@jest/globals";
import * as fs from "node:fs/promises";

import { ampkitDirContentsInit } from "./DirContents";

const dirPath = './src/test-content/src';

const dirHelper = ampkitDirContentsInit(dirPath, 'main.js');
describe("v6 server app index", () => {
  // getFiles
  test("paths to contain an array of strings", async () => {
    const dirContentBases = await dirHelper.getRootFiles(dirPath);
    await expect(Array.isArray(await dirContentBases)).toBe(true);
  });
  // getPaths
  let paths: string[];
  // test("paths to contain an array of strings", async () => {
  //   paths = await projectFiles.getRelativePaths(files);
  //   // console.log(paths);
  //   await expect(Array.isArray(await paths)).toBe(true);
  // });
  // handleStats is next
});
