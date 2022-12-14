import * as nodeFs from "node:fs/promises";
import * as nodePath from "node:path";

type GConstructor<T = {}> = new (...args: any[]) => T;

// Factory helps as a way to instantiate classes outside of superclass
// still unsure if this is absoultely necessary
export const AmpkitDirContentsFactory = <T>(nodeFs: any, nodePath: any) => (dirPath: string, fileBase?: string, mixinDependenciesCb?: <T>() => Map<string, T>, extKeys?: string[]) => {

  return new AmpkitDirContents(nodeFs, nodePath, dirPath, fileBase)
};

export let ampkitDirContentsInit = AmpkitDirContentsFactory(nodeFs, nodePath);

class AmpkitDirContents {
  dirPath: string;
  fileBase = "";
  extKeys: string[];

  file = new Map<string, any>();
  files: Map<string, any>[] = [];
  dir = new Map<string, any>();
  dirs: Map<string, any>[] = [];

  // dependencies node
  nodeFs;
  nodePath;
  // dependencies other
  mixinDependenciesCb;

  constructor(nodeFs: any, nodePath: any, dirPath: string, fileBase = 'index.js', extKeys = ['.js'], mixinDependenciesCb?: <T>() => Map<string, T>) {
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
  get readFile() {
    return this.nodeFs.readFile;
  }
  get parseDirContent() {
    return this.nodePath.parse;
  }
  async getContents(dirPath?: string, readdir?: any) {
    dirPath = dirPath ? dirPath : this.dirPath;
    let dirInfo = this.parseDirContent(dirPath);

    this.dir.set('base', dirInfo.base);
    this.dir.set('ext', dirInfo.ext);
    this.dir.set('name', dirInfo.name);

    readdir = readdir ? readdir : this.readdir;

    let contentsBases: string[] = await readdir(dirPath);

    let content;

    contentsBases.forEach((base) => {
      content = this.parseDirContent(base);

      if (base === this.fileBase) {
        this.file.set('base', content.base);
        this.file.set('ext', content.ext);
        this.file.set('name', content.name);
      } else if (this.extKeys.includes(content.ext)) {
        let fileMap = new Map();
        fileMap.set('base', content.base);
        fileMap.set('ext', content.ext);
        fileMap.set('name', content.name);
        this.files.push(fileMap);
      } else {
        let dirsMap = new Map();
        dirsMap.set('base', content.base);
        dirsMap.set('ext', content.ext);
        dirsMap.set('name', content.name);
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

