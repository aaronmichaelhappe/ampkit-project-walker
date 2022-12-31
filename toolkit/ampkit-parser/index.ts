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

type ResultsGroup = {
  index: number;
  matches: string[][];
};

type Results = {
  module: ResultsGroup;
  html: ResultsGroup;
  css: ResultsGroup;
  ordered?: ResultsGroup;
};

var validator = {
  get(target, key) {
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], validator);
    } else {
      return target[key];
    }
  },
  set(target, key, value) {
    console.log(target);
    console.log(key);
    console.log(value);
    return true;
  },
};

var person = {
  firstName: "alfred",
  lastName: "john",
  inner: {
    salary: 8250,
    Proffesion: ".NET Developer",
  },
};
var proxy = new Proxy(person, validator);
proxy.inner.salary = "foo";

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

  let results: Results | {} = {
    // module: {
    //   index: 0,
    //   matches: [[]],
    // },
    // html: {
    //   index: 0,
    //   matches: [[]],
    // },
    // css: {
    //   index: 0,
    //   matches: [[]],
    // },
    // ordered: {
    //   index: 0,
    //   matches: [[]],
    // },
  };

  const resultsCounters = {
    module: 0,
    html: 0,
    css: 0,
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

    go: () => {
      let resultsCounter = 0;

      let tempGroups = ["module", "css", "html"];

      self.createResultsGroupsAndCounters(tempGroups, resultsCounter);

      let wordsIndex = counters.word === 0 ? 0 : counters.rules;
      titleToBeMatched = matchRules[wordsIndex].matcherTitle;
      return matchRules[wordsIndex];
    },
    createResultsGroupsAndCounters: (groups: string[], counter) => {
      groups[counter];
      if (counter < groups.length) counter = counter + 1;
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
      resultsCounters[groupName] = resultsCounters[groupName] + 1;
    },
    spreadResultsGroupTotalMatchs: (groupName) => {
      results[groupName].matches[resultsCounters[groupName]] = [
        ...results[groupName].matches[resultsCounters[groupName]],
        words[counters.word],
      ];
    },
    incrementResultsCurrentMatches: (groupName) => {
      counters.sameMatchGroup === 0
        ? results[groupName].index + 1
        : results[groupName].index;
    },
    spreadResultsCurrentMatches: (groupName, matcherIndex) => {
      results[groupName].matches[resultsCounters[groupName]][matcherIndex] = [
        ...results[groupName].matches[resultsCounters[groupName]][matcherIndex],
        words[counters.word],
      ];
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

        currentMatch.parts = [...currentMatch.parts, words[counters.word]];

        self.spreadResultsGroupTotalMatchs(groupName);

        self.incrementResultsGroupTotalMatches(groupName);
      }

      counters.word = counters.word + 1;
      self.resetRulesCounters();

      return { currentMatch: currentMatch, results: results, counters };
    },
    // matched but keep going in the same match group (increase its counter) to match more.
    handleBlueState: (matchHandlers) => {
      counters.sameMatchGroup = counters.sameMatchGroup + 1;

      const groupName = (currentMatch.groupName = titleToBeMatched);

      let matcherIndex = self.incrementResultsCurrentMatches(groupName);

      self.spreadResultsCurrentMatches(groupName, matcherIndex);

      return { currentMatch: currentMatch, results: results, counters };
    },
  };

  return self;
};
