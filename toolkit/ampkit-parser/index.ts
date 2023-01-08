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
  fullMatch: boolean;
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

export const ParseByGroupAndParts = function (
  words: string[],
  matchRulesCodex: MatchRule[]
) {
  // for tracking
  let caughtSemiColon = false;
  let complete: boolean;
  let currentGroupName = "";
  let currentWord = "";
  let hasMatched = false;
  let ruleCounter = 0;
  let wordCounter = 0;

  let allResults: AllResults = {};
  let currentMatch: CurrentMatch = {
    groupName: "",
    partsName: "",
    str: "",
    parts: [],
    terminator: "",
    fullMatch: false,
  };
  let currentTerminatorMatchers = [];
  let previousMatch: CurrentMatch = currentMatch;
  let returnData: ReturnData = {
    allResults,
    complete,
    wordCounter,
    currentMatch,
  };

  // TODO: speed tests. How does breaking out code into so many functions affect performance?
  // TODO: think about the "test" paramaters. I have never seen this done in the wild. Which gives me pause. Research.

  // TODO: remove and document if not used.
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
    // TEST METHODS.
    // these methods I am unsure if they should stay, but leaving them here for testing and may break out into go again.
    // remove semi colons bc they dont needed to be appended to following match. other terminators like let, import, etc do.
    catchSemiColons: (testCurrentWord?) => {
      if (
        currentWord[currentWord.length - 1] === ";" &&
        currentWord.length > 1
      ) {
        caughtSemiColon = true;
        currentWord = currentWord.slice(0, currentWord.length - 1);
      } else {
        caughtSemiColon = false;
      }
      if (testCurrentWord) return currentWord;
    },
    assignPreviousMatchTerminator(testCurrentMatch?, testPreviousMatch?) {
      const previousTerminator = previousMatch.terminator;
      self.resetMatchTracker("previous");
      if (previousTerminator !== ";") {
        currentMatch.parts = [...currentMatch.parts, previousTerminator];
        currentMatch.str += previousTerminator;
      }

      if (testCurrentMatch) return currentMatch;
      if (testPreviousMatch) return previousMatch;
    },
    assignCurrentPartsAndString(testCurrentMatch?) {
      currentMatch.parts = [...currentMatch.parts, currentWord];

      let str =
        currentMatch.str !== ""
          ? `${currentMatch.str} ${currentWord}`
          : currentWord;

      currentMatch.str = str;
      if (testCurrentMatch) return currentMatch;
    },
    removeTerminatorFromCurrentPartsAndString(testCurrentMatch?) {
      const slicedOffTerminator = [
        ...currentMatch.parts.splice(
          currentMatch.parts.length - 1,
          currentMatch.parts.length
        ),
      ];
      const re = new RegExp(slicedOffTerminator + "$");
      const replacedStr = currentMatch.str.replace(re, "");

      currentMatch.str = replacedStr.trim();
      if (testCurrentMatch) return currentMatch;
    },
    // Main application
    go: () => {
      currentWord = words[wordCounter];

      if (currentWord === "") {
        wordCounter = wordCounter + 1;
        return returnData;
      }

      if (hasMatched && self.currentMatch.groupName === "") {
        this.resetMatchTracker("current");
      }

      hasMatched = false;
      caughtSemiColon = false;

      // if we are out of words
      if (currentWord === undefined) {
        returnData.complete = true;
        return returnData;
      }

      self.catchSemiColons();

      // append terminator from previous match
      if (previousMatch.terminator !== "") {
        self.assignPreviousMatchTerminator();
      }

      currentTerminatorMatchers =
        matchRulesCodex[ruleCounter]?.terminatorMatchers;

      self.assignCurrentPartsAndString();

      if (self.match(currentMatch.str)) {
        // if there is a group being matched and it differs from the current group -> match it
        if (
          matchRulesCodex[ruleCounter].groupName !== currentGroupName &&
          matchRulesCodex[ruleCounter].groupName !== "" &&
          matchRulesCodex[ruleCounter].groupMatcher
        ) {
          currentMatch.groupName = currentGroupName =
            matchRulesCodex[ruleCounter].groupName;
        }
        currentMatch.partsName = matchRulesCodex[ruleCounter].name;
        // if we have terminators, keep them so we can remove them from next match, or add them to next match
        if (currentMatch.terminator) {
          self.removeTerminatorFromCurrentPartsAndString();

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
            fullMatch: currentMatch.fullMatch,
          },
        ];
      }

      wordCounter = wordCounter + 1;
      ruleCounter = 0;
      currentWord = "";

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

        return self.match(str);
      }
    },
    performMatch: (matcher, wholeString, part): boolean => {
      if (matcher && matcher[0] === "/")
        return self.regExMatch(matcher, wholeString, part);

      return self.simpleMatch(matcher, wholeString, part);
    },
    simpleMatch: (matcher, wholeString, part): boolean => {
      const strMatched = matcher === wholeString;
      if (strMatched) {
        if (currentTerminatorMatchers.length) {
          return self.matchTerminator(part, wholeString);
        }
        return true;
      }
      return false;
    },
    regExMatch: (matcher, wholeString, part): boolean => {
      const re = new RegExp(matcher.slice(1, matcher.length - 1));

      const strMatched = re.test(wholeString);

      if (strMatched) {
        return currentTerminatorMatchers.length
          ? self.matchTerminator(part)
          : true;
      }
      return false;
    },
    matchTerminator: (part, testRuleCounter?): boolean => {
      // override to test a particular rule
      if (testRuleCounter) {
        ruleCounter = testRuleCounter;
      }
      const terminatorMatchers =
        matchRulesCodex[ruleCounter].terminatorMatchers;

      let partMatch = false;
      let re;
      for (let index = 0; index < terminatorMatchers.length; index++) {
        const terminatorMatcher = terminatorMatchers[index];

        if (terminatorMatcher[0] === "/") {
          re = new RegExp(
            terminatorMatcher.slice(1, terminatorMatcher.length - 1)
          );

          if (re.test(part)) {
            currentMatch.terminator = terminatorMatcher;
            partMatch = true;
            break;
          }
        }

        if (terminatorMatcher === part) {
          currentMatch.terminator = terminatorMatcher;
          partMatch = true;
          break;
        }
      }
      currentMatch.terminator = part;
      return partMatch;
    },
    replaceMatchRules: (newRules) => {
      matchRulesCodex = newRules;
    },
    resetMatchTracker: (matchType) => {
      if (matchType === "current") {
        currentMatch = {
          groupName: "",
          partsName: "",
          str: "",
          parts: [],
          terminator: "",
          fullMatch: false,
        };
      } else {
        previousMatch = {
          groupName: "",
          partsName: "",
          str: "",
          parts: [],
          terminator: "",
          fullMatch: false,
        };
      }
    },
  };

  return self;
};
