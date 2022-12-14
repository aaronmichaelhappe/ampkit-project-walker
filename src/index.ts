import { ampkitDirContentsInit } from './DirContents';
import { ampkitProjectWalkerInit } from './ProjectWalker'

// ? add dirPath + contents.dirs.base to dirsUniqueColletion -> Map.set(dirPath+contents.dirs.get('base'))
// ? add dirPath + contents.files to filesUniqueColletion -> Map.set(dirPath+contents.files.get('base'))
// dirLevel = 0
// filesStack[dirLevel].push(contents.get(files))
// dirsStack[dirLevel].push(contents.get(dirs))

// parse file -> dirsPath + contents.file.base
// add returns as children in data.
// children -> if in filesUniqueColletion, grab previous data and add file as children
// else 
// filesStack.push(contents.get(returnedFiles))
// dirsStack.push(contents.get(returnedDirs))


// while filesStack.length
// newFile  = filesStack[dirLevel].pop()  
// // dirHelper(dirPath, newFile)
// while dirsStack.length
// dirPath = dirPath + dirStack[dirLevel].pop()
// dirLevel = dirLevel + 1;
// dirHelper(dirtPath, defaultBase)
// };
const go = async () => {
  let dirPath = './src/test-content/src';
  let initBase = 'main.js'
  let defaultBase = 'index.js'


  const dirHelper = ampkitDirContentsInit(dirPath, initBase);
  const contents = await dirHelper.getContents();

  const e = ampkitProjectWalkerInit(dirPath, contents.file, contents.files, contents.dir, contents.dirs);

}
(() => {
  go();
})();

