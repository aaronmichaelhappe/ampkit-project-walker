// group -- individual match Rules
type RuleMatcherObj = {
  matcher: string | RegExp[];
  stateTrigger: string;
};

type RuleObj = {
  name: string;
  matchSequence: RuleMatcherObj[][];
};
type RulesArray = RuleObj[];
const groupMatchRules: RulesArray = [
  {
    name: "module",
    matchSequence: [
      [
        { matcher: "import", stateTrigger: "blue" },
        { matcher: [/let|const|var/], stateTrigger: "yellow" },
      ],
    ],
  },
];

export const groupMatchRulesMap = new Map(
  groupMatchRules.map((obj) => [obj.name, obj])
);

const partMatchRules = [
  {
    name: "import",
    matchSequence: [[{ matcher: ["import"], stateTrigger: "blue" }], [{}]],
  },
];

export const partMatchRulesMap = new Map(
  partMatchRules.map((obj) => [obj.name, obj])
);

// part -- individual match Rules

// either -- individual match Rules
// export const allMatchRules = [{}];
