// group -- individual match Rules
export type RuleMatcherObj = {
  matcher: string | (() => RegExp);
  partTitle?: string;
  stateTrigger: string;
  collectPart: boolean;
  completeMatch: boolean;
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
          partTitle: "import",
          stateTrigger: "green",
          collectPart: true,
          completeMatch: true,
        },
        {
          matcher: "*",
          partTitle: "*",
          stateTrigger: "green",
          collectPart: true,
          completeMatch: true,
        },
      ],
      // [{ matcher: () => /let|const|var/, stateTrigger: "" }],
    ],
  },
];

export const matchRulesMap = new Map(
  matchRules.map((obj) => [obj.matcherTitle, obj])
);

// part -- individual match Rules

// either -- individual match Rules
// export const allMatchRules = [{}];
