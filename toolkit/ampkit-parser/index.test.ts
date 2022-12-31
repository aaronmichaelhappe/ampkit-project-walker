import { describe, expect, test } from "@jest/globals";
import { ParseByGroupAndParts } from "./index";
import {
  matchRules,
  type RuleObj,
  type RulesArray,
} from "./individual-match-rules";

const words = ["import"];

const parseByGroupAndParts = ParseByGroupAndParts(words, matchRules);

let rules: RuleObj;

let state: string = "init";

let results;

// while (state !== "red" && state !== "") {
//   // rules = parseByGroupAndParts.go();
//   // state = parseByGroupAndParts.iterateMatchSequence(rules);
//   // results = parseByGroupAndParts.handleState(state);
// }

describe("Testing ParseByGroupAndParts Index", () => {
  // test("returns within while: getMatchRules is object, iterateMatchSequence is state, handleState is results ", () => {
  //   expect(typeof rules).toBe("object");
  //   expect(typeof state).toBe("string");
  //   expect(typeof results).toBe("object");
  // });
  const parseByGroupAndParts2 = ParseByGroupAndParts(words, matchRules);
  let resultsCounter = 0;

  let tempGroups = ["module", "css", "html"];
  const resultsObjs = parseByGroupAndParts2.createResultsGroupsAndCounters(
    tempGroups,
    resultsCounter,
    true
  );
  test("results objects are returned with provided rules groups as properties of 'results' and 'resultsCounters'", () => {
    expect(typeof resultsObjs).toBe("object");
    expect(typeof resultsObjs.results).toBe("object");
    expect(typeof resultsObjs.resultsCounters).toBe("object");
  });
});
