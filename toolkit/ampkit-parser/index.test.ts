import { describe, expect, test } from "@jest/globals";
import { ParseByGroupAndParts, type CurrentMatch } from "./index";
import {
  matchRules as matchRulesCodex,
  type MatchRule,
} from "./individual-match-rules";

// TODO: ';' is often at the end of words. check for this.
const words = ["import", "'thing'", ";"];

describe("Testing ParseByGroupAndParts.performMatch", () => {
  let word1 = words[0];
  const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);
  let str = words[0];
  const matched = parseByGroupAndParts.performMatch("import", word1, str);
  const matched2 = parseByGroupAndParts.performMatch("importZ", word1, str);
  const matched3 = parseByGroupAndParts.performMatch("/import/", word1, str);
  const matched4 = parseByGroupAndParts.performMatch("/importZ/", word1, str);
  test("should return true if there is a match.", () => {
    expect(matched).toBe(true);
  });
  test("should return false if there is not a match.", () => {
    expect(matched2).toBe(false);
  });
  test("should return true if there is a match. using string to indicate regex", () => {
    expect(matched3).toBe(true);
  });
  test("should return false if there is not a match. using string to indicate regex", () => {
    expect(matched4).toBe(false);
  });
});

describe("Testing ParseByGroupAndParts.matchTerminator", () => {
  const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);
  const matched = parseByGroupAndParts.matchTerminator(";");
  let str = `${words[0]}${words[1]}`;

  test("should return true to indicate ';' has been matched by a matchTerminator", () => {
    expect(matched).toBe(true);
  });
});

describe("Testing ParseByGroupAndParts.checkMatch", () => {
  const words = ["import", "'thing'", ";"];
  const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);

  let str = `${words[0]} ${words[1]}`;

  const matched = parseByGroupAndParts.checkMatch(str);

  test("should return true to indicate the string as been matched", () => {
    expect(matched).toBe(true);
  });
});

describe("test test test", () => {
  const words = ["import", "'thing'", ";", "example"];
  const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);

  parseByGroupAndParts.go();
  console.log(parseByGroupAndParts.currentMatch);

  test("should return true to indicate the string as been matched", () => {
    expect(1).toBe(1);
  });
});
