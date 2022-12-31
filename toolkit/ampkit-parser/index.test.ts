import { describe, expect, test } from "@jest/globals";
import { ParseByGroupAndParts } from "./index";
import {
  matchRules,
  type RuleObj,
  type RulesArray,
} from "./individual-match-rules";

type RuleMatcherObj = {
  matcher: string | (() => RegExp);
  stateTrigger: string;
  collectPart?: boolean;
  partTitle?: string;
};

type StateHandler = {
  func: (matchRules: RuleMatcherObj) => {};
  rules: RulesArray;
};

type ReturnOpts = {
  func: (matchRules: RuleObj) => {};
  state: string;
  rules: RuleObj;
};

const words = ["import"];

const parseByGroupAndParts = ParseByGroupAndParts(words, matchRules);

let counters = {
  word: 0,
  matchers: 0,
  matcher: 0,
  rules: 0,
};

let stateTracker = {
  type: "",
  name: "",
  state: "",
};

let rules: RuleObj;

let state: string = "init";

let results;

// while (state !== "red" && state !== "") {
rules = parseByGroupAndParts.getMatchRules();
state = parseByGroupAndParts.iterateMatchSequence(rules);
results = parseByGroupAndParts.handleState(state);
// }

describe("Testing ParseByGroupAndParts Index", () => {
  test("returns within while: getMatchRules is object, iterateMatchSequence is state, handleState is results ", () => {
    expect(typeof rules).toBe("object");
    expect(typeof state).toBe("string");
    expect(typeof results).toBe("object");
  });
});
