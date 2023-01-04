import {
  matchRules as matchRulesCodex,
  type MatchRule,
} from "./individual-match-rules";

export type CurrentMatch = {
  groupName: string;
  partsName: string;
  str: "";
  parts: string[];
};

type Results = {
  [key: string]: any;
};

export const ParseByGroupAndParts = function (
  words: string[],
  matchRulesCodex: MatchRule[],
  groups: string[],
  testing?: boolean
) {
  let currentGroupName = "";
  let currentWord = "";
  let hasInitMatched = false;
  let hasTerminated = false;

  let wordCount = 0;
  let ruleCount = 0;

  let results: Results = {};

  let resultsCounters: Results = {};

  let currentMatch: CurrentMatch = {
    groupName: "",
    partsName: "",
    str: "",
    parts: [],
  };
  let matchQueue: CurrentMatch[];
  // let tracking = [];
  let tracker = {
    currentGroupName: [],
    currentWord: [],
    wordCount: [],
    ruleCount: [],
    hasInitMatched: [],
    hasTerminated: [],
  };
  const handleCurrentMatch = {
    get(target, key) {
      if (typeof target[key] === "object" && target[key] !== null) {
        // @ts-ignore
        return new Proxy(target[key], handleCurrentMatch);
      }

      return target[key];
    },
    set(target, prop, value) {
      // console.log(`changed ${prop} from ${target[prop]} to ${value}`);
      // target[prop] = value;
      if (testing) {
        tracker.currentGroupName = [
          ...tracker.currentGroupName,
          currentGroupName,
        ];
        tracker.currentWord = [...tracker.currentWord, currentWord];
        tracker.wordCount = [...tracker.wordCount, wordCount];
        tracker.ruleCount = [...tracker.ruleCount, ruleCount];
        tracker.hasInitMatched = [...tracker.hasInitMatched, hasInitMatched];
        tracker.hasTerminated = [...tracker.hasTerminated, hasTerminated];
      }

      if (prop === "parts") {
        const initMatcher = matchRulesCodex[ruleCount].initMatcher;
        if (initMatcher[0] === "/") {
          const re = new RegExp(
            initMatcher.slice(1, initMatcher.length - 1),
            "i"
          );
        } else {
          // initMatcher === target[prop]
          //hasInitMatched = true;
        }
        target[prop] = value;
        if (value) return true;
      }
      // if (prop === "str") {
      //   matchRulesCodex.forEach((rule) => {
      //     if (
      //       rule.groupName !== currentGroupName &&
      //       matchRulesCodex[counters.rule].groupMatcher
      //     ) {
      //       // match the current rule
      //       currentGroupName = matchRulesCodex[counters.rule].groupName;
      //     }
      //     target[prop] += value;
      //     // if() {
      //     // look for terminator
      //     // }
      //   });
      // }
    },
  };
  // @ts-ignore
  const currentMatchProxy = new Proxy(currentMatch, handleCurrentMatch);

  const self = {
    words: words,
    resultsTest: results,
    resultsCountersTest: resultsCounters,
    currentMatchParts: currentMatch,
    init: () => {
      let resultsCounter = 0;

      self.createResultsGroupsAndCounters(groups, resultsCounter);
    },
    createResultsGroupsAndCounters: (groups: string[], counter) => {
      results[groups[counter]] = {};
      resultsCounters[groups[counter]] = 0;
      if (counter < groups.length - 1) {
        counter = counter + 1;
        self.createResultsGroupsAndCounters(groups, counter);
      }
    },
    go: () => {
      currentMatchProxy.parts = [...currentMatchProxy.parts, words[wordCount]];
    },
  };

  return self;
};
