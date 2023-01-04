// functionality

// if hasMatched and hasNotTerminated... starta  que

export type MatchRule = {
  name: string;
  initMatcher: string;
  terminators: string[];
  mainMatcher: string;
  groupMatcher: boolean;
  groupName: string;
};

export const importMatchRule = {
  name: "import",
  initMatcher: "import",
  terminators: [";", "import"],
  mainMatcher: "/import(*|{.*})/",
  groupMatcher: true,
  groupName: "module",
};

export const matchRules: MatchRule[] = [importMatchRule];
