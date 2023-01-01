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

type Results = {
  [key: string]: string;
};

export const ParseByGroupAndParts = function (
  words: string[],
  matchRules: RulesArray
) {
  let testing = false;
  let counters: Counters = {
    word: 0,
    diffMatchGroup: 0,
    sameMatchGroup: 0,
    rules: 0,
  };

  let results: Results | {} = {};

  let resultsCounters: Results | {} = {};

  const resultsCountersProxyHandler = {
    get(target, prop, receiver) {
      console.log(target[prop]);
      return target[prop];
    },
  };

  const resultsCounterProxy = new Proxy(
    resultsCounters,
    resultsCountersProxyHandler
  );

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

    init: () => {
      if (testing) {
        resultsCounters = resultsCounterProxy;
      }

      let resultsCounter = 0;

      let tempGroups = ["module", "css", "html"];

      self.createResultsGroupsAndCounters(tempGroups, resultsCounter);
    },
    go: () => {
      let wordsIndex = counters.word === 0 ? 0 : counters.rules;

      titleToBeMatched = matchRules[wordsIndex].matcherTitle;

      return matchRules[wordsIndex];
    },
    createResultsGroupsAndCounters: (
      groups: string[],
      counter,
      returnResults?
    ) => {
      results[groups[counter]] = [];
      resultsCounters[groups[counter]] = 0;
      if (counter < groups.length - 1) {
        counter = counter + 1;
        self.createResultsGroupsAndCounters(groups, counter, returnResults);
      }
      if (returnResults) return { results, resultsCounters };
    },
    iterateMatchSequence: (matchRules: RuleObj): any => {
      const matchSequence = matchRules.matchSequence;

      if (words[counters.word] === undefined)
        return { currentMatch, results, counters, resultsCounters };

      const matchHandlers =
        matchSequence[counters.diffMatchGroup][counters.sameMatchGroup];

      // ran out of things to match. that is a fail.
      if (
        counters.sameMatchGroup > matchSequence[counters.diffMatchGroup].length
      )
        return self.handleState("red", matchHandlers);

      if (typeof matchHandlers.matcher === "string") {
        return words[counters.word] === matchHandlers.matcher
          ? self.handleState(matchHandlers.stateTrigger, matchHandlers)
          : self.handleState("orange");
        // if (words[counters.word] === matchHandlers.matcher) {
        //   return self.handleState(matchHandlers.stateTrigger, matchHandlers);
        // } else {
        //   return self.handleState("orange");
        // }
      } else {
        const re = matchHandlers.matcher();
        const match = words[counters.word].match(re);
        return match.length
          ? self.handleState(matchHandlers.stateTrigger, matchHandlers)
          : self.handleState("orange");
      }

      // return { currentMatch, results, counters, resultsCounters };
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
          return { currentMatch, results, counters, resultsCounters };
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
    spreadResultsGroupTotalMatchs: (groupName, returnResults?) => {
      results[groupName][resultsCounters[groupName]] = currentMatch.parts;
      self.incrementResultsGroupTotalMatches(groupName);
      if (returnResults) return results[groupName];
    },
    incrementDiffMatchesCount: () => {
      counters.diffMatchGroup = counters.diffMatchGroup + 1;
    },
    incrementSameMatchGroupCount: () => {
      counters.sameMatchGroup = counters.sameMatchGroup + 1;
    },
    incrementRulesCount: () => {},
    incrementRulesTotalMatchesCount: () => {},
    incrementWordCount: () => {
      counters.word = counters.word + 1;
    },

    // fail. increase word counter to go to the next. But don't add the word to anything. Results all counters
    handleRedState: (matchHandlers) => {
      self.incrementWordCount();
      self.resetRulesCounters();

      return { currentMatch, results, counters, resultsCounters };
    },
    // match group has failed. go to a different match group (increase its counter). and start over (0 out sameMatchGroup)
    handleOrangeState: () => {
      self.incrementDiffMatchesCount();
      counters.sameMatchGroup = 0;

      return { currentMatch, results, counters, resultsCounters };
    },
    // completely matched. go to the next word (increase its counter). reset all rules counters.
    handleGreenState: (matchHandlers) => {
      const groupName = (currentMatch.groupName = titleToBeMatched);

      if (matchHandlers?.collectPart === true) {
        currentMatch.partsName = matchHandlers.partTitle;

        currentMatch.parts = [...currentMatch.parts, words[counters.word]];

        self.spreadResultsGroupTotalMatchs(groupName);
      }

      self.incrementWordCount();
      self.resetRulesCounters();

      return { currentMatch, results, counters, resultsCounters };
    },
    // matched but keep going in the same match group (increase its counter) to match more.
    handleBlueState: (matchHandlers) => {
      currentMatch.groupName = titleToBeMatched;

      currentMatch.parts = [...currentMatch.parts, words[counters.word]];

      self.incrementSameMatchGroupCount();
      counters.diffMatchGroup = 0;

      self.incrementWordCount();

      return { currentMatch, results, counters, resultsCounters };
    },
  };

  return self;
};
