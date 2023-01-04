import { describe, expect, test } from "@jest/globals";
import { ParseByGroupAndParts } from "./index";
import {
  matchRules as matchRulesCodex,
  type MatchRule,
} from "./individual-match-rules";

const words = ["import"];

const groups = ["module", "css", "html"];

const parseByGroupAndParts = ParseByGroupAndParts(
  words,
  matchRulesCodex,
  groups
);

parseByGroupAndParts.init();
parseByGroupAndParts.go();

describe("Testing ParseByGroupAndParts Index", () => {
  test("types should be objects", () => {
    expect(typeof parseByGroupAndParts).toBe("object");
    expect(typeof parseByGroupAndParts.resultsTest).toBe("object");
    expect(typeof parseByGroupAndParts.resultsCountersTest).toBe("object");
    console.log(parseByGroupAndParts.currentMatchParts);
    expect(typeof parseByGroupAndParts.currentMatchParts).toBe("object");
  });
  test("resultsCountersTest should be a number", () => {
    expect(typeof parseByGroupAndParts.resultsCountersTest.module).toBe(
      "number"
    );
  });
});
