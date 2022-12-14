import * as nodePath from "path";

type GConstructor<T = {}> = new (...args: any[]) => T;


export const AmpkitProjectWalkerFactory = (nodePath: any) => (dirPath: string, file: Map<string, any>, files: Map<string, any>[], dir: Map<string, any>, dirs: Map<string, any>[]) => {
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
  dirsUniqueColletion: Set<string>;
  filesUniqueColletion: Set<string>;
  dirLevel = 0;
  filesStack: string[][];
  dirsStack: string[][];
  constructor(nodeFs: any, dirPath: string, file: Map<string, any>, files: Map<string, any>[], dir: Map<string, any>, dirs: Map<string, any>[]) {
    this.nodeFs = nodeFs;
    this.dirPath = dirPath;
    this.file = file;
    this.files = files;
    this.dir = dir;
    this.dirs = dirs;
    this.dirsUniqueColletion = new Set();
    this.filesUniqueColletion = new Set();
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

      const dirKey = this.dirPath + this.dir.get('base');
      const filesKey = this.dirPath + this.file.get('base');

      let dirSize = this.dirsUniqueColletion.size;

      // needing the check not for the set -- sets dont allow duplicates.
      // but for the stack
      if (!this.dirsUniqueColletion.has(dirKey)) {
        this.dirsUniqueColletion.add(dirKey);
        this.dirsStack[this.dirLevel].push(dirKey);
      }

      if (!this.filesUniqueColletion.has(filesKey)) {
        this.filesUniqueColletion.add(filesKey);
        this.filesStack[this.dirLevel].push(filesKey);
      }

    }

    // ******************** //
    // --- MAIN HERE --- //


  };
}
