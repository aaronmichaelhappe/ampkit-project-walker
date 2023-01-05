import {
  matchRules as matchRulesCodex,
  type RuleObj,
  type RulesArray,
  type RuleMatcherObj,
} from "./individual-match-rules";

// Colors because it is easy to understand to me what they dop. red stop, green go etc. However I could see how this could be confusing for others. So not sure yet...
export type GroupMatchStates = "fail" | "done" | "has-matched" | "";
// red. game over. something went wrong. // blue -> matched, and continue with tokens. purple -> didnt match but on to next group for matching. green. done!
export type TokenMatchStates =
  | "fail"
  | "in-look-ahead"
  | "partly-matched"
  | "has-matched"
  | ""; // red: failed. game over. // blue, matched and continue to next token. // yellow -> matched but need more info for full match // purple, use a look ahead to terminate, and start matching next group. green. done. start tokens over. move to next token group

// keep track of what is matched
export type CurrentMatch = {
  groupName: string;
  partsName: string;
  parts: string[];
};

type Counters = {
  word: number;
  matchRuleGroup: number;
  matchTokenSequence: number;
  matchTokenOfSequence: number;
};

type Results = {
  [key: string]: string;
};

export const ParseByGroupAndParts = function (
  words: string[],
  matchRulesCodex: RulesArray
) {
  let testing = false;

  let groupState = "not-matched-yet";
  let tokenState = "not-matched-yet";

  let counters: Counters = {
    word: 0,
    matchRuleGroup: 0,
    matchTokenSequence: 0,
    matchTokenOfSequence: 0,
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
      return matchRulesCodex[counters.matchRuleGroup];
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
    iterateMatchSequence: (): any => {
      // no words left. green because we haven't failed
      if (words[counters.word] === undefined) {
        groupState = "done";
        return { currentMatch, results, groupState, tokenState };
      }

      // no rules left. means we haven't matched anything.
      // token state already set on match/fail
      if (counters.matchRuleGroup >= matchRulesCodex.length) {
        groupState = "fail";
        return { currentMatch, results, groupState, tokenState };
      }

      titleToBeMatched =
        matchRulesCodex[counters.matchRuleGroup].matcherGroupTitle;

      const matchSequence =
        matchRulesCodex[counters.matchRuleGroup].matchSequence;

      // we are still rules but we didn't match one in the current matchTokenSequence
      // if (counters.matchTokenSequence >= matchSequence.length) {
      //   groupState = "";
      // }

      const matchTokenSequence = matchSequence[counters.matchTokenSequence];
      console.log(matchTokenSequence);
      const matchTokenOfSequencesOpts =
        matchTokenSequence.tokenMatches[counters.matchTokenOfSequence];

      const tokenStateTriggered = matchTokenOfSequencesOpts.stateTrigger;
      const matcherType = matchTokenOfSequencesOpts.matcher;
      const partTitle = matchTokenOfSequencesOpts.partTitle;

      // matching on string equality
      if (typeof matcherType === "string") {
        // matched true

        if (words[counters.word] === matcherType) {
          if (
            matchRulesCodex[counters.matchRuleGroup].groupMatchedOn <=
            counters.matchTokenSequence
          ) {
            if (
              tokenState === "" ||
              tokenState === "has-matched" ||
              tokenState === "partly-matched"
            ) {
              // save match group
              groupState = "hasMatched";
              currentMatch.groupName = titleToBeMatched;
            }
          }

          // not sure if we need this yet
          // if (counters.matchTokenOfSequence >= matchTokenOfSequencesOpts.length) {
          //   if (!matchTokenSequence.lookAhead.onFail) self.setupLookahead();
          // }

          if (tokenStateTriggered === "has-matched") {
            currentMatch.partsName = partTitle;
            currentMatch.parts = [...currentMatch.parts, words[counters.word]];
            self.spreadResultsGroup(titleToBeMatched);
            self.incrementWordCount();
            self.resetCodexCounters();
            tokenState = "has-matched";
          } else if (tokenStateTriggered === "partly-matched") {
            currentMatch.partsName = partTitle;
            currentMatch.parts = [...currentMatch.parts, words[counters.word]];
            self.spreadResultsGroup(titleToBeMatched);
            self.incrementWordCount();
            counters.matchRuleGroup = 0;
            counters.matchTokenSequence = 0;
            tokenState = "partly-matched";
          }
        }

        self.handleMatchFail(
          "string",
          matchTokenOfSequencesOpts,
          matchTokenSequence
        );

        // if (words[counters.word] === matchTokenOfSequence.matcher) {
        //   return self.handleTokenState(matchTokenOfSequence.stateTrigger, matchTokenOfSequence);
        // } else {
        //   return self.handleTokenState("orange");
        // }
      } else {
        //  if groupMatchedOn === counters.matchTokenOfSequence
        //
        const re = matcherType();
        const match = words[counters.word].match(re);
      }

      // return { currentMatch, results, counters, resultsCounters };
    },

    handleMatchFail: (
      matcherType,
      matchTokenOfSequencesOpts,
      matchTokenSequence
    ) => {
      self.incrementWordCount;
      counters.matchTokenSequence = 0;
      counters.matchTokenOfSequence = 0;

      if (counters.matchTokenOfSequence === 0) {
        if (matchTokenSequence.groupMatchedOn >= counters.matchTokenSequence) {
          self.incrementRuleGroupCount();
        }
      } else {
        tokenState = "fail";
      }

      return {
        currentMatch,
        results,
        groupState,
        tokenState,
      };

      // we have failed and we are at the end
      // if (
      //   matchTokenOfSequencesOpts.length - 1 ===
      //     counters.matchTokenOfSequence &&
      //   matchTokenSequence.lookAhead.onFail
      // )
      //   self.setupLookahead();
    },
    setupLookahead: () => {},
    setCounters: (newCounters) => {
      counters = newCounters;
    },
    resetCodexCounters: () => {
      counters.matchRuleGroup = 0;
      counters.matchTokenSequence = 0;
      counters.matchTokenOfSequence = 0;
    },
    incrementResultsGroup: (groupName) => {
      resultsCounters[groupName] = resultsCounters[groupName] + 1;
    },
    spreadResultsGroup: (groupName, returnResults?) => {
      results[groupName][resultsCounters[groupName]] = currentMatch.parts;
      self.incrementResultsGroup(groupName);
      if (returnResults) return results[groupName];
    },
    incrementTokenSequenceCount: () => {
      counters.matchTokenSequence = counters.matchTokenSequence + 1;
    },
    incrementTokenOfSequenceCount: () => {
      counters.matchTokenOfSequence = counters.matchTokenOfSequence + 1;
    },
    incrementRuleGroupCount: () => {
      counters.matchRuleGroup = counters.matchRuleGroup + 1;
    },

    incrementWordCount: () => {
      counters.word = counters.word + 1;
    },
  };

  return self;
};
