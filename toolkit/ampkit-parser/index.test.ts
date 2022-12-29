import { describe, expect, test } from "@jest/globals";
import { ParseByGroupAndParts } from "./index";
import {
  groupMatchRulesMap,
  partMatchRulesMap,
} from "./individual-match-rules";

const words = ["import"];

const parseByGroupAndParts = ParseByGroupAndParts(
  words,
  groupMatchRulesMap,
  partMatchRulesMap,
  "module"
);

let baseCounter = 0;

parseByGroupAndParts.go(baseCounter);

const matchSqeunce = parseByGroupAndParts.getMatchSequence();

let groupCounter = 0;

const matcher = parseByGroupAndParts.match_IterateMatchSequence(
  groupCounter,
  matchSqeunce
);

describe("Testing ParseByGroupAndParts index", () => {
  test("match sequence to be typeof array", () => {
    expect(Array.isArray(matchSqeunce)).toBe(true);
  });
});
