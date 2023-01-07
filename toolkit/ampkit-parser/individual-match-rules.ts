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
];
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
  terminatorMatchers: [";", ...commonTerminatorsGlobal],
  mainMatcher: "/^import(\\s)(['\\\"].+['\\\"]|\\*|\\{[.+]\\})(\\s?)(;?)/",
  groupMatcher: true,
  groupName: "module",
};
export const importExampleRule: MatchRule = {
  name: "example",
  terminatorMatchers: [";", ...commonTerminatorsGlobal],
  mainMatcher: "/import(\\s)'thing'(\\s);/",
  groupMatcher: true,
  groupName: "module",
};

export const matchRules: MatchRule[] = [importMatchRule, importExampleRule];
