import { describe, expect, test } from "@jest/globals";
import { ParseByGroupAndParts } from "./index";
import {
  matchRules,
  type RuleObj,
  type RulesArray,
} from "./individual-match-rules";

const words = ["import", "*", "example"];

const parseByGroupAndParts = ParseByGroupAndParts(words, matchRules);

let rules: RuleObj;

let state: any = "init";

let results;

parseByGroupAndParts.init();

let custCount = 0;

while (state !== false) {
  rules = parseByGroupAndParts.go();
  results = parseByGroupAndParts.iterateMatchSequence(rules);

  custCount++;
  if (custCount > 2) break;
}

describe("Testing ParseByGroupAndParts Index", () => {
  test("returns within while: getMatchRules is object, iterateMatchSequence is object ", () => {
    expect(typeof rules).toBe("object");
    expect(typeof results).toBe("object");
  });
  // let resultsCounter = 0;

  // let tempGroups = ["module", "css", "html"];
  // const resultsObjs = parseByGroupAndParts.createResultsGroupsAndCounters(
  //   tempGroups,
  //   resultsCounter,
  //   true
  // );
  // test("results objects are returned with provided rules groups as properties of 'results' and 'resultsCounters'", () => {
  //   expect(typeof resultsObjs).toBe("object");
  //   expect(typeof resultsObjs.results).toBe("object");
  //   expect(typeof resultsObjs.resultsCounters).toBe("object");
  // });
  // const test2 = ParseByGroupAndParts(words, matchRules);

  // let tempGroups2 = ["module", "css", "html"];
  // const resultsObjs2 = test2.createResultsGroupsAndCounters(
  //   tempGroups2,
  //   resultsCounter,
  //   true
  // );

  // let group = test2.spreadResultsGroupTotalMatchs("module", true);
});
