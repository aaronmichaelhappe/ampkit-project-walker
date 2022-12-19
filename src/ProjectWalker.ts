import * as nodePath from "path";

type GConstructor<T = {}> = new (...args: any[]) => T;


interface Contents {
  base: string,
  ext: string,
  name: string,
}

export const AmpkitProjectWalkerFactory = (nodePath: any) => (dirPath: string, file: Contents, files: Contents[], dir: Contents, dirs: Contents[]) => {
  const AmpkitProjectWalkerExtended = AmpkitProjectWalkerExtender(AmpkitProjectWalker);

  return new AmpkitProjectWalkerExtended(nodePath, dirPath, file, files, dir, dirs);
};

export let ampkitProjectWalkerInit = AmpkitProjectWalkerFactory(nodePath);

class AmpkitProjectWalker {
  nodeFs: any;
  dirPath;
  file;
  files;
  dir;
  dirs;
  dirsUniqueColletion: Map<string, any>;
  filesUniqueColletion: Map<string, any>;
  dirLevel = 0;
  filesStack: string[][];
  dirsStack: string[][];
  constructor(nodeFs: any, dirPath: string, file: Contents, files: Contents[], dir: Contents, dirs: Contents[]) {
    this.nodeFs = nodeFs;
    this.dirPath = dirPath;
    this.file = file;
    this.files = files;
    this.dir = dir;
    this.dirs = dirs;
    this.dirsUniqueColletion = new Map();
    this.filesUniqueColletion = new Map();
    this.filesStack = [[]];
    this.dirsStack = [[]];
    this.go();
  }
  get readdir() {
    return this.nodeFs.readdir;
  }
  go() { }

}

type AmpkitProjectWalkerConstructor = GConstructor<AmpkitProjectWalker>;

function AmpkitProjectWalkerExtender<TBase extends AmpkitProjectWalkerConstructor>(Base: TBase) {
  return class AmpkitProjectWalkerDataMixin extends Base {
    constructor(...args: any[]) {
      super(...args);
    }
    go(): void {

      // --- MAIN HERE --- //
      // ******************** //

      const dirKey = this.dirPath + this.dir.base;
      const filesKey = this.dirPath + this.file.base;

      // let dirSize = this.dirsUniqueColletion.size;

      // needing the check not for the set -- sets dont allow duplicates.
      // but for the stack

      // if (!this.dirsUniqueColletion.has(dirKey)) {
      //   this.dirsUniqueColletion.set(dirKey, this.dir);
      //   this.dirsStack[this.dirLevel].push(dirKey);
      // }

      // if (!this.filesUniqueColletion.has(filesKey)) {
      //   this.filesUniqueColletion.set(filesKey, this.file);
      //   this.filesStack[this.dirLevel].push(filesKey);
      // }

    }

    // ******************** //
    // --- MAIN HERE --- //


  };
}
