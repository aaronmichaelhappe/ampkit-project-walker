import * as nodeFs from "node:fs/promises";
import * as nodePath from "node:path";

type GConstructor<T = {}> = new (...args: any[]) => T;

// Factory helps as a way to instantiate classes outside of superclass
// still unsure if this is absoultely necessary
export const AmpkitDirContentsFactory = (nodeFs: any, nodePath: any) => (dirPath: string, fileBase?: string, mixinDependenciesCb?: () => Contents, extKeys?: string[]) => {

  return new AmpkitDirContents(nodeFs, nodePath, dirPath, fileBase)
};

export let ampkitDirContentsInit = AmpkitDirContentsFactory(nodeFs, nodePath);

interface Contents {
  base: string,
  ext: string,
  name: string,
}

class AmpkitDirContents {
  dirPath: string;
  fileBase = "";
  extKeys: string[];

  file = { base: '', ext: '', name: '' };
  files: Contents[] = [];
  dir = { base: '', ext: '', name: '' };
  dirs: Contents[] = [];

  // dependencies node
  nodeFs;
  nodePath;
  // dependencies other
  mixinDependenciesCb;

  constructor(nodeFs: any, nodePath: any, dirPath: string, fileBase = 'index.js', extKeys = ['.js'], mixinDependenciesCb?: () => Contents) {
    this.dirPath = dirPath;
    this.fileBase = fileBase;
    this.nodeFs = nodeFs;
    this.nodePath = nodePath;
    this.extKeys = extKeys;
    this.mixinDependenciesCb = mixinDependenciesCb;
  }

  get readdir() {
    return this.nodeFs.readdir;
  }
  // get readFile() {
  //   return this.nodeFs.readFile;
  // }
  get parseDirContent() {
    return this.nodePath.parse;
  }
  async getContents(dirPath?: string, readdir?: any) {
    dirPath = dirPath ? dirPath : this.dirPath;
    let dirInfo = this.parseDirContent(dirPath);

    this.dir.base = dirInfo.base;
    this.dir.ext = dirInfo.ext;
    this.dir.name = dirInfo.name;

    readdir = readdir ? readdir : this.readdir;

    let contentsBases: string[] = await readdir(dirPath);

    let content;

    contentsBases.forEach((base) => {
      content = this.parseDirContent(base);

      if (base === this.fileBase) {
        this.file.base = content.base;
        this.file.ext = content.ext;
        this.file.name = content.name;
      } else if (this.extKeys.includes(content.ext)) {
        let fileMap = { base: '', ext: '', name: '' };
        fileMap.base = content.base;
        fileMap.ext = content.ext;
        fileMap.name = content.name;
        this.files.push(fileMap);
      } else {
        let dirsMap = { base: '', ext: '', name: '' };
        dirsMap.base = content.base;
        dirsMap.ext = content.ext;
        dirsMap.name = content.name;
        this.dirs.push(dirsMap);
      }

    });
    return {
      file: this.file,
      files: this.files,
      dir: this.dir,
      dirs: this.dirs,
    }
  }
  // init() { }
}

