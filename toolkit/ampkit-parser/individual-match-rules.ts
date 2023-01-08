// functionality

// if hasMatched and hasNotTerminated... starta  que
export const commonTerminatorsGlobal = [
  ";",
  "class",
  "const",
  "do",
  "export",
  "for",
  "function",
  "import",
  "if",
  "let",
  "module",
  "var",
  "return",
  "while",
];
export const customTerminatorsGlobal = ["customElements.define"];
export const commonTerminatorsClass = ["await", "static", "private", "public"];

export type MatchRule = {
  name: string;
  terminatorMatchers: string[];
  mainMatcher: string;
  groupMatcher: boolean;
  groupName: string;
  fullMatch: boolean;
};

export const importMatchRule: MatchRule = {
  name: "import",
  terminatorMatchers: [
    ";",
    ...commonTerminatorsGlobal,
    ...customTerminatorsGlobal,
  ],
  mainMatcher:
    "/^import(\\s)(.+?)(\\s?)(;|import|let|const|var|customElements.define|.+\\..+(\\s)?\\(.*//)/",
  groupMatcher: true,
  groupName: "module",
  fullMatch: true,
};
export const methodCallMatchRule: MatchRule = {
  name: "method call",
  terminatorMatchers: [
    ";",
    ...commonTerminatorsGlobal,
    ...customTerminatorsGlobal,
    ...commonTerminatorsClass,
    "/^.+\\..+(\\s)?\\(.*/",
  ],
  mainMatcher: "/(^.+\\.)(.+)(\\(.*\\)(;)?)/",
  groupName: "",
  groupMatcher: false,
  fullMatch: false,
};

export const matchRules: MatchRule[] = [importMatchRule];

export const regexes = {
  importMatchRule:
    /^import(\s)(.+?)(\s?)(;|class|const|do|export|for|function|import|if|let|module|var|return|while|customElements.define|(^.+\.)(.+)(\(.*\)))/,
  methodCallMatchRule:
    /(^.+\.)(.+)(\(.*\))(\s?)(;|class|const|do|export|for|function|import|if|let|module|var|return|while|customElements.define|(^.+\.)(.+)(\(.*\)))/,
};

// (\s?)(;|class|const|do|export|for|function|import|if|let|module|var|return|while|customElements.define|(^.+\.)(.+)(\(.*\)))
