import {
  matchRules as matchRulesCodex,
  type MatchRule,
} from "./individual-match-rules";

// import { tokenList } from "./token-list";
// import { Tokens } from "./tokens";
export type MatchState = {
  groupName: string;
  partsName: string;
  str: string;
  parts: string[];
  tokens: string[];
  terminator: string;
  isFullMatch: boolean;
};

export type CompletedState = {
  ["key"]?: [];
};

export type ReturnData = {
  allResults: CompletedState;
  complete: boolean;
  wordCounter: number;
  currentMatch: MatchState;
};

export const ParseList = function (
  words: string[],
  matchRulesCodex: MatchRule[]
) {
  // for tracking
  let caughtSemiColon = false;
  let complete: boolean = false;
  let lastMatchedGroupName = "";
  let currentWord = "";
  let hasMatched = false;
  let ruleCounter = 0;
  let wordCounter = 0;

  let allResults: CompletedState = {};
  let currentMatch: MatchState = {
    groupName: "",
    partsName: "",
    str: "",
    parts: [],
    tokens: [],
    terminator: "",
    isFullMatch: false,
  };
  let currentTerminatorMatchers = [];
  let previousMatch: MatchState = currentMatch;
  let returnData: ReturnData = {
    allResults,
    complete,
    wordCounter,
    currentMatch,
  };

  // const tokens = new Tokens(tokenList);
  // tokens.createTokens;

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
  //       // tracker.lastMatchedGroupName = [
  //       //   ...tracker.lastMatchedGroupName,
  //       //   lastMatchedGroupName,
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
    lastMatchedGroupName,
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
    // TEST returns.
    // any method which takes a "return...?" argument. I have never seen this in the wild so I am unsure about it. Research this. But for now they are helping me test.

    // remove semi colons bc they dont needed to be appended to following match. other terminators like let, import, etc do.
    // Main application
    go: (): ReturnData => {
      self.assignCurrentWord(words[wordCounter]);

      if (currentWord === "") {
        self.incCounter("wordCounter");
        return returnData;
      }

      if (currentWord === undefined) {
        returnData.complete = true;
        return returnData;
      }

      let lastMatchedGroupName = self.currentMatch.groupName;

      if (hasMatched) self.resetMatchTracker("current");

      hasMatched = false;
      caughtSemiColon = false;

      // if we are out of words

      self.catchSemiColons();

      // append terminator from previous match
      if (previousMatch.terminator !== ";")
        self.assignPreviousTerminatorToCurrent();

      currentTerminatorMatchers =
        matchRulesCodex[ruleCounter]?.terminatorMatchers;

      self.assignCurrentMatchData();

      if (self.match(currentMatch.str)) {
        // if there is a group being matched and it differs from the current group -> match it
        if (
          matchRulesCodex[ruleCounter].groupName !== lastMatchedGroupName &&
          matchRulesCodex[ruleCounter].groupName !== "" &&
          matchRulesCodex[ruleCounter].matchGroupName
        )
          currentMatch.groupName = matchRulesCodex[ruleCounter].groupName;

        currentMatch.partsName = matchRulesCodex[ruleCounter].name;
        // if we have terminators, keep them so we can remove them from next match, or add them to next match
        if (currentMatch.terminator)
          self.removeTerminatorFromCurrentMatchData(),
            (previousMatch = currentMatch);

        if (allResults[currentMatch.groupName] === undefined)
          allResults[currentMatch.groupName] = [];

        allResults[currentMatch.groupName] = [
          ...allResults[currentMatch.groupName],
          {
            partsName: currentMatch.partsName,
            str: currentMatch.str,
            parts: currentMatch.parts,
            isFullMatch: currentMatch.isFullMatch,
          },
        ];
      }

      self.incCounter("wordCounter");
      self.resetCounter("ruleCounter");
      self.assignCurrentWord("");

      returnData = {
        allResults,
        complete,
        wordCounter,
        currentMatch,
      };

      return returnData;
    },
    assignCurrentMatchData(returnCurrentMatch?: boolean) {
      currentMatch.parts = [...currentMatch.parts, currentWord];

      let str =
        currentMatch.str !== ""
          ? `${currentMatch.str} ${currentWord}`
          : currentWord;

      currentMatch.str = str;
      if (returnCurrentMatch) return currentMatch;
    },
    assignCurrentWord: (word: string) => {
      currentWord = word;
    },
    assignPreviousTerminatorToCurrent() {
      const previousTerminator = previousMatch.terminator;
      self.resetMatchTracker("previous");
      if (previousTerminator !== ";")
        (currentMatch.parts = [...currentMatch.parts, previousTerminator]),
          (currentMatch.str += previousTerminator);
    },
    catchSemiColons: (returnCurrentWord?) => {
      if (
        currentWord[currentWord.length - 1] === ";" &&
        currentWord.length > 1
      ) {
        caughtSemiColon = true;
        self.assignCurrentWord(currentWord.slice(0, currentWord.length - 1));
      } else {
        caughtSemiColon = false;
      }
      if (returnCurrentWord) return currentWord;
    },
    incCounter: (counterName: string) => {
      switch (counterName) {
        case "wordCounter":
          wordCounter = wordCounter + 1;
          break;
        case "ruleCounter":
          ruleCounter = ruleCounter + 1;
          break;

        default:
          break;
      }
    },
    match: (str): boolean => {
      let localMatch = self.performMatch(
        matchRulesCodex[ruleCounter]?.matcher,
        str,
        currentWord
      );

      if (localMatch) return true;

      self.incCounter("ruleCounter");

      if (matchRulesCodex[ruleCounter] === undefined) return false;

      return self.match(str);
    },
    matchTerminator: (part: string): boolean => {
      // override to test a particular rule
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
    performMatch: (
      matcher: string,
      wholeString: string,
      part: string
    ): boolean => {
      if (matcher && matcher[0] === "/")
        return self.regExMatch(matcher, wholeString, part);

      return self.simpleMatch(matcher, wholeString, part);
    },
    removeTerminatorFromCurrentMatchData(returnCurrentMatch?: boolean) {
      const slicedOffTerminator = [
        ...currentMatch.parts.splice(
          currentMatch.parts.length - 1,
          currentMatch.parts.length
        ),
      ];
      const re = new RegExp(slicedOffTerminator + "$");
      const replacedStr = currentMatch.str.replace(re, "");

      currentMatch.str = replacedStr.trim();
      if (returnCurrentMatch) return currentMatch;
    },
    resetCounter: (counterName: string) => {
      switch (counterName) {
        case "wordCounter":
          wordCounter = 0;
          break;
        case "ruleCounter":
          ruleCounter = 0;
          break;

        default:
          break;
      }
    },
    regExMatch: (
      matcher: string,
      wholeString: string,
      part: string
    ): boolean => {
      const re = new RegExp(matcher.slice(1, matcher.length - 1));

      const strMatched = re.test(wholeString);

      if (strMatched) {
        return currentTerminatorMatchers.length
          ? self.matchTerminator(part)
          : true;
      }
      return false;
    },
    resetMatchTracker: (matchType: string) => {
      matchType === "current"
        ? (currentMatch = {
            groupName: "",
            partsName: "",
            str: "",
            parts: [],
            tokens: [],
            terminator: "",
            isFullMatch: false,
          })
        : (previousMatch = {
            groupName: "",
            partsName: "",
            str: "",
            parts: [],
            tokens: [],
            terminator: "",
            isFullMatch: false,
          });
    },
    replaceMatchRules: (newRules: MatchRule[]) => {
      matchRulesCodex = newRules;
    },
    simpleMatch: (matcher: string, wholeString: string, part): boolean => {
      let strMatched: string = "";
      if (matcher === wholeString) strMatched = wholeString;

      if (strMatched) {
        return currentTerminatorMatchers.length
          ? self.matchTerminator(part)
          : true;
      }
      return false;
    },
  };

  return self;
};
