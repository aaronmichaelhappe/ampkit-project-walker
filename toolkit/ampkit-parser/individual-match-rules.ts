// group -- individual match Rules
export type RuleMatcherObj = {
  matcher: string | (() => RegExp);
  stateTrigger: string;
  collectPart?: boolean;
  partTitle?: string;
};

export type RuleObj = {
  matcherTitle: string;
  matchSequence: RuleMatcherObj[][];
};

export type RulesArray = RuleObj[];

export const matchRules: RulesArray = [
  {
    matcherTitle: "module",
    matchSequence: [
      [
        {
          matcher: "import",
          stateTrigger: "green",
          collectPart: true,
          partTitle: "import",
        },
        {
          matcher: "*",
          stateTrigger: "green",
          collectPart: true,
          partTitle: "*",
        },
      ],
      [{ matcher: () => /let|const|var/, stateTrigger: "" }],
    ],
  },
];

// export const groupMatchRulesMap = new Map(
//   groupMatchRules.map((obj) => [obj.matcherTitle, obj])
// );

export const partMatchRules: RulesArray = [
  {
    matcherTitle: "import",
    matchSequence: [
      [
        { matcher: "import", stateTrigger: "blue" },
        { matcher: "*", stateTrigger: "blue" },
      ],
    ],
  },
];

// export const partMatchRulesMap = new Map(
//   partMatchRules.map((obj) => [obj.name, obj])
// );

// part -- individual match Rules

// either -- individual match Rules
// export const allMatchRules = [{}];
