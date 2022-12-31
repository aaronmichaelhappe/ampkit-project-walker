import {
  matchRules,
  type RuleObj,
  type RulesArray,
  type RuleMatcherObj,
} from "./individual-match-rules";

// Colors because it is easy to understand to me what they dop. red stop, green go etc. However I could see how this could be confusing for others. So not sure yet...
export type MatchStates =
  | ""
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "green-yellow";

// keep track of what is matched
export type CurrentMatch = {
  groupName: string;
  partsName: string;
  parts: string[];
};

type Counters = {
  word: number;
  diffMatchGroup: number;
  sameMatchGroup: number;
  rules: number;
};

type ResultsCounters = {
  module: number;
  html: number;
  css: number;
};

type Results = {
  counters: ResultsCounters;
  module: {
    index: number;
    matches: string[][];
  };
  html: {
    index: number;
    matches: string[][];
  };
  css: {
    index: number;
    matches: string[][];
  };
  ordered: {
    index: number;
    matches: string[][];
  };
};

export const ParseByGroupAndParts = function (
  words: string[],
  matchRules: RulesArray
) {
  let counters: Counters = {
    word: 0,
    diffMatchGroup: 0,
    sameMatchGroup: 0,
    rules: 0,
  };

  let results: Results = {
    counters: {
      module: 0,
      html: 0,
      css: 0,
    },
    module: {
      index: 0,
      matches: [[]],
    },
    html: {
      index: 0,
      matches: [[]],
    },
    css: {
      index: 0,
      matches: [[]],
    },
    ordered: {
      index: 0,
      matches: [[]],
    },
  };

  let currentMatch: CurrentMatch = {
    groupName: "",
    partsName: "",
    parts: [],
  };
  // if there is a partial match
  let nextMatch: CurrentMatch = {
    groupName: "",
    partsName: "",
    parts: [],
  };

  type ReturnOpts = {
    result: Results;
    currentMatch: CurrentMatch;
  };

  let titleToBeMatched = "";

  const self = {
    words: words,
    getMatchRules: () => {
      let index = counters.word === 0 ? 0 : counters.rules;
      titleToBeMatched = matchRules[index].matcherTitle;
      return matchRules[index];
    },
    iterateMatchSequence: (matchRules: RuleObj): any => {
      const matchSequence = matchRules.matchSequence;

      if (words[counters.word] === undefined) return "";

      const matchHandlers =
        matchSequence[counters.diffMatchGroup][counters.sameMatchGroup];

      // ran out of things to match. that is a fail.
      if (
        counters.sameMatchGroup > matchSequence[counters.diffMatchGroup].length
      )
        return self.handleState("red", matchHandlers);

      if (typeof matchHandlers.matcher === "string") {
        if (words[counters.word] === matchHandlers.matcher) {
          self.handleState(matchHandlers.stateTrigger, matchHandlers);

          return matchHandlers.stateTrigger;
        } else {
          self.handleState("orange");

          return matchHandlers.stateTrigger;
        }
      }

      return "";
    },
    handleState: (color, matchHandlers?: RuleMatcherObj) => {
      switch (color) {
        case "red":
          return self.handleRedState(matchHandlers);
        case "green":
          return self.handleGreenState(matchHandlers);
        case "blue":
          return self.handleBlueState(matchHandlers);
        case "orange":
          return self.handleOrangeState();
        case "yellow":
        default:
          return { currentMatch: currentMatch, results: results, counters };
      }
    },
    setCounters: (newCounters) => {
      counters = newCounters;
    },
    resetRulesCounters: () => {
      counters.diffMatchGroup = 0;
      counters.sameMatchGroup = 0;
      counters.rules = 0;
    },
    incrementResultsGroupTotalMatches: (groupName) => {
      results.counters[groupName] = results.counters[groupName] + 1;
    },
    pushResultsGroupTotalMatchs: (groupName) => {
      console.log(groupName);
      // results[groupName].matches[results.counters[groupName]].push(
      //   words[counters.word]
      // );
    },
    incrementReultsCurrentMatches: (groupName) => {
      counters.sameMatchGroup === 0
        ? results[groupName].index + 1
        : results[groupName].index;
    },
    pushReultsCurrentMatches: (groupName, matcherIndex) => {
      results[groupName].matches[results.counters[groupName]][
        matcherIndex
      ].push(counters.word);
    },
    incrementDiffMatchs: () => {},
    incrementSameMatchGroup: () => {},
    // fail. increase word counter to go to the next. But don't add the word to anything. Results all counters
    handleRedState: (matchHandlers) => {
      counters.word = counters.word + 1;
      self.resetRulesCounters();

      return { currentMatch: currentMatch, results: results, counters };
    },
    // match group has failed. go to a different match group (increase its counter). and start over (0 out sameMatchGroup)
    handleOrangeState: () => {
      counters.diffMatchGroup = counters.diffMatchGroup + 1;
      counters.sameMatchGroup = 0;

      return { currentMatch: currentMatch, results: results, counters };
    },
    // completely matched. go to the next word (increase its counter). reset all rules counters.
    handleGreenState: (matchHandlers) => {
      const groupName = (currentMatch.groupName = titleToBeMatched);

      if (matchHandlers?.collectPart === true) {
        currentMatch.partsName = matchHandlers.partTitle;

        currentMatch.parts.push(words[counters.word]);

        self.pushResultsGroupTotalMatchs(groupName);

        self.incrementResultsGroupTotalMatches(groupName);
      }

      counters.word = counters.word + 1;
      self.resetRulesCounters();

      return { currentMatch: currentMatch, results: results, counters };
    },
    // matched but keep going in the same match group (increase its counter) to match more.
    handleBlueState: (matchHandlers) => {
      counters.sameMatchGroup = counters.sameMatchGroup + 1;

      const groupName = currentMatch.groupName;

      let matcherIndex = self.incrementReultsCurrentMatches(groupName);

      self.pushReultsCurrentMatches(groupName, matcherIndex);

      return { currentMatch: currentMatch, results: results, counters };
    },
  };

  return self;
};
