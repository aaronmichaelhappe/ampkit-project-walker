// functionality

// if hasMatched and hasNotTerminated... starta  que
export const commonTerminatorsGlobal = [
  "import",
  "let",
  "const",
  "var",
  "function",
  "if",
  "do",
  "while",
  "class",
  "export",
  "module",
];
export const customTerminatorsGlobal = ["customElements.define"];
export const commonTerminatorsClass = ["public", "private", "static"];

export type MatchRule = {
  name: string;
  terminatorMatchers: string[];
  mainMatcher: string;
  groupMatcher: boolean;
  groupName: string;
};

export const importMatchRule: MatchRule = {
  name: "import",
  terminatorMatchers: [
    ";",
    ...commonTerminatorsGlobal,
    ...customTerminatorsGlobal,
  ],
  mainMatcher:
    "/^import(\\s)(.+?)(\\s?)(;|import|let|const|var|customElements.define)/",
  groupMatcher: true,
  groupName: "module",
};

export const importExampleRule: MatchRule = {
  name: "example",
  terminatorMatchers: [";", ...commonTerminatorsGlobal],
  mainMatcher: '/example(\\s\\");/',
  groupMatcher: true,
  groupName: "module",
};

export const matchRules: MatchRule[] = [importMatchRule, importExampleRule];

export const regexes = {
  importMatchRule:
    /^import(\s)(.+?)(\s?)(;|import|let|const|var|customElements.define)/,
};
