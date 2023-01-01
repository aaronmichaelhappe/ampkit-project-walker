// group -- individual match Rules
export type RuleMatcherObj = {
  matcher: string | (() => RegExp);
  partTitle?: string;
  stateTrigger: string;
  collectPart: boolean;
  completeMatch: boolean;
  testStrings?: string[];
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
          partTitle: "import keyword",
          stateTrigger: "blue",
          collectPart: true,
          completeMatch: true,
        },
        {
          matcher: () => /\*|\{.+\}/g,
          partTitle: "imported",
          stateTrigger: "blue",
          collectPart: true,
          completeMatch: true,
          testStrings: ["*"],
        },
        {
          matcher: "example",
          partTitle: "example",
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
