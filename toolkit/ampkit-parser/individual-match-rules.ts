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
  matcher: string;
  groupName: string;
  terminatorMatchers: string[];
  matchGroupName: boolean;
  isFullMatch: boolean;
};

export const importMatchRule: MatchRule = {
  name: "import",
  groupName: "module",
  matcher:
    "/^import(\\s)(.+?)(\\s?)(;|import|let|const|var|customElements.define|.+\\..+(\\s)?\\(.*//)/",
  terminatorMatchers: [
    ";",
    ...commonTerminatorsGlobal,
    ...customTerminatorsGlobal,
  ],
  matchGroupName: true,
  isFullMatch: true,
};
export const methodCallMatchRule: MatchRule = {
  name: "method call",
  groupName: "",
  matcher: "/(^.+\\.)(.+)(\\(.*\\)(;)?)/",
  terminatorMatchers: [
    ";",
    ...commonTerminatorsGlobal,
    ...customTerminatorsGlobal,
    ...commonTerminatorsClass,
    "/^.+\\..+(\\s)?\\(.*/",
  ],
  matchGroupName: false,
  isFullMatch: false,
};

export const matchRules: MatchRule[] = [importMatchRule];

export const regexes = {
  importMatchRule:
    /^import(\s)(.+?)(\s?)(;|class|const|do|export|for|function|import|if|let|module|var|return|while|customElements.define|(^.+\.)(.+)(\(.*\)))/,
  methodCallMatchRule:
    /(^.+\.)(.+)(\(.*\))(\s?)(;|class|const|do|export|for|function|import|if|let|module|var|return|while|customElements.define|(^.+\.)(.+)(\(.*\)))/,
};

// (\s?)(;|class|const|do|export|for|function|import|if|let|module|var|return|while|customElements.define|(^.+\.)(.+)(\(.*\)))
