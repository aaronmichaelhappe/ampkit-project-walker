import { match } from "assert";
import {
  matchRules as matchRulesCodex,
  type MatchRule,
} from "./individual-match-rules";

export type CurrentMatch = {
  groupName: string;
  partsName: string;
  str: string;
  parts: string[];
  terminator: string;
};

export type AllResults = {
  ["key"]?: [];
};

export type ReturnData = {
  allResults;
  complete;
  wordCounter;
  currentMatch;
};

// type Results = {
//   [key: string]: any;
// };

export const ParseByGroupAndParts = function (
  words: string[],
  matchRulesCodex: MatchRule[]
) {
  // for tracking
  let currentGroupName = "";
  let currentWord = "";
  let hasMatched = false;
  let ruleCounter = 0;
  let caughtSemiColon = false;
  let wordCounter = 0;

  // determine end success or fail
  // TODO, I didnt do this right. just using success current to determine when to end loop
  // look into how to determine a fail, if at all.
  let complete: boolean;

  let currentMatch: CurrentMatch = {
    groupName: "",
    partsName: "",
    str: "",
    parts: [],
    terminator: "",
  };

  let currentTerminatorMatchers = [];

  let previousMatch: CurrentMatch | {} = {};

  let allResults: AllResults = {};

  let returnData: ReturnData = {
    allResults,
    complete,
    wordCounter,
    currentMatch,
  };

  // TODO: might need for testing. remove if not. document if I remove
  // const handleCurrentMatchForProxy = {
  //   get(target, key) {
  //     if (typeof target[key] === "object" && target[key] !== null) {
  //       // @ts-ignore
  //       return new Proxy(target[key], handleCurrentMatchForProxy);
  //     }

  //     return target[key];
  //   },
  //   set(target, prop, value) {
  //     if (testing) {
  //       // tracker.currentGroupName = [
  //       //   ...tracker.currentGroupName,
  //       //   currentGroupName,
  //       // ];
  //       // tracker.currentWord = [...tracker.currentWord, currentWord];
  //       // tracker.wordCounter = [...tracker.wordCounter, wordCounter];
  //       // tracker.ruleCounter = [...tracker.ruleCounter, ruleCounter];
  //     }
  //   },
  // };

  // // @ts-ignore
  // const currentMatchProxy = new Proxy(currentMatch, handleCurrentMatchForProxy);

  const self = {
    words: words,
    currentMatch,
    previousMatch,
    allResults,
    // for tracking
    currentGroupName,
    currentWord,
    hasMatched,
    ruleCounter,
    caughtSemiColon,
    wordCounter,
    complete,
    // determine end success or fail

    // init: () => {
    //   // self.createResultsGroupsAndCounters(groups, resultsCounter);
    // },
    // createResultsGroupsAndCounters: (groups: string[], counter) => {
    //   results[groups[counter]] = {};
    //   resultsCounters[groups[counter]] = 0;
    //   if (counter < groups.length - 1) {
    //     counter = counter + 1;
    //     self.createResultsGroupsAndCounters(groups, counter);
    //   }
    // },
    go: () => {
      if (hasMatched) {
        currentMatch = {
          groupName: "",
          partsName: "",
          str: "",
          parts: [],
          terminator: "",
        };
      }

      hasMatched = false;
      caughtSemiColon = false;

      currentWord = words[wordCounter];

      // if we are out of words
      if (currentWord === undefined) {
        returnData.complete = true;
        return returnData;
      }
      // remove semi colons
      if (
        currentWord[currentWord.length - 1] === ";" &&
        currentWord.length > 1
      ) {
        caughtSemiColon = true;
        currentWord = currentWord.slice(0, currentWord.length - 1);
      } else {
        caughtSemiColon = false;
      }

      if ("terminator" in previousMatch) {
        const previousTerminator = previousMatch.terminator;
        previousMatch = {};
        if (previousTerminator !== ";") {
          currentMatch.parts = [...currentMatch.parts, previousTerminator];
          currentMatch.str += previousTerminator;
        }
      }

      currentTerminatorMatchers =
        matchRulesCodex[ruleCounter]?.terminatorMatchers;

      currentMatch.parts = [...currentMatch.parts, currentWord];

      let str =
        currentMatch.str !== ""
          ? `${currentMatch.str} ${currentWord}`
          : currentWord;

      currentMatch.str = str;

      hasMatched = hasMatched ? true : self.match(str);

      if (hasMatched) {
        // if there is a group being matched and it differs from the current group -> match it
        if (
          matchRulesCodex[ruleCounter].groupName !== currentGroupName &&
          matchRulesCodex[ruleCounter].groupMatcher
        ) {
          currentMatch.groupName = currentGroupName =
            matchRulesCodex[ruleCounter].groupName;
        }
        currentMatch.partsName = matchRulesCodex[ruleCounter].name;
        // if we have terminators, keep them so we can remove them from next match, or add them to next match
        if (currentMatch.terminator) {
          currentMatch.parts;
          const slicedOffTerminator = [
            ...currentMatch.parts.splice(
              currentMatch.parts.length - 1,
              currentMatch.parts.length
            ),
          ];
          const replacedStr = currentMatch.str.replace(
            slicedOffTerminator[0],
            ""
          );
          currentMatch.str = replacedStr.trim();
          previousMatch = currentMatch;
        }

        if (allResults[currentMatch.groupName] === undefined) {
          allResults[currentMatch.groupName] = [];
        }

        allResults[currentMatch.groupName] = [
          ...allResults[currentMatch.groupName],
          {
            partsName: currentMatch.partsName,
            str: currentMatch.str,
            parts: currentMatch.parts,
          },
        ];

        wordCounter = wordCounter + 1;
        ruleCounter = 0;
        currentWord = "";
      }
      wordCounter = wordCounter + 1;
      ruleCounter = 0;
      currentWord = "";
      caughtSemiColon = false;

      returnData = {
        allResults,
        complete,
        wordCounter,
        currentMatch,
      };

      return returnData;
    },
    match: (str): boolean => {
      let localMatch = self.performMatch(
        matchRulesCodex[ruleCounter]?.mainMatcher,
        str,
        currentWord
      );

      if (localMatch) return true;

      ruleCounter = ruleCounter + 1;

      if (matchRulesCodex[ruleCounter] === undefined) {
        if (words[wordCounter + 1]) return false;
      } else {
        return self.match(str);
      }
    },
    performMatch: (matcher, val, part): boolean => {
      if (matcher && matcher[0] === "/") {
        return self.regExMatch(matcher, val, part);
      }
      return self.simpleMatch(matcher, val, part);
    },
    simpleMatch: (matcher, val, part): boolean => {
      const strMatched = matcher === val;
      if (strMatched) {
        if (currentTerminatorMatchers.length) {
          return self.matchTerminator(part);
        }
        return true;
      } else {
        return false;
      }
    },
    regExMatch: (matcher, val, part): boolean => {
      const re = new RegExp(matcher.slice(1, matcher.length - 1));

      const strMatched = re.test(val);

      if (strMatched) {
        return currentTerminatorMatchers.length
          ? self.matchTerminator(part)
          : true;
      } else {
        return false;
      }
    },
    matchTerminator: (part, testRuleCounter?): boolean => {
      // override to test a particular rule
      if (testRuleCounter) {
        ruleCounter = testRuleCounter;
      }
      const terminatorMatchers =
        matchRulesCodex[ruleCounter].terminatorMatchers;

      let partMatch = false;
      for (let index = 0; index < terminatorMatchers.length; index++) {
        const terminator = terminatorMatchers[index];
        if (terminator[0] === "^") {
          const re = /terminator/;
          if (re.test(part)) {
            currentMatch.terminator = terminator.slice(1, terminator.length);
            partMatch = true;
            break;
          }
        }
        if (terminator === part) {
          currentMatch.terminator = terminator;
          partMatch = true;
          break;
        }
      }
      currentMatch.terminator = part;
      return partMatch;
    },
  };

  return self;
};
