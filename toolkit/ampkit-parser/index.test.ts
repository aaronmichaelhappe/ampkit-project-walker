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
  const words = ["import", "'example'", ";"];
  const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);

  let str = `${words[0]} ${words[1]} ;`;

  const matched = parseByGroupAndParts.match(str);

  test("should return true to indicate the string as been matched", () => {
    expect(matched).toBe(true);
  });
});
// TODO: This test
describe("Testing ParseByGroupAndParts TESTING WRITING THIS TEST", () => {
  const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);

  test("test test", () => {
    expect(1).toBe(1);
  });
});

describe("Testing ParseByGroupAndParts.go and using a while loop for multi matches", () => {
  const words = ["import", "'thing'", "import", "cat", "from", "dog", ";"];
  const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);

  // ADD loop next
  let complete;
  // let counter = 0;
  let results;
  while (complete !== true) {
    // counter = counter + 1;
    results = parseByGroupAndParts.go();
    complete = results.complete;
  }

  test("should return correct types on the results", () => {
    expect(Array.isArray(results.allResults.module)).toBe(true);
    expect(typeof results.currentMatch.groupName).toBe("string");
    expect(typeof results.currentMatch.partsName).toBe("string");
    expect(Array.isArray(results.currentMatch.parts)).toBe(true);
  });
});

// describe("Testing ParseByGroupAndParts.go...", () => {
//   const words = [
//     "",
//     "import",
//     "router",
//     "from",
//     "'bui/router'",
//     "router.config({",
//     "root:",
//     "location.hostname.match(/github|gitlab/)",
//     "?",
//     "'/bui/'",
//     ":",
//     "'/',",
//     "prefix:",
//     "'#/'",
//     "})",
//     "import",
//     "'bui/app/error-handler'",
//     "import",
//     "'../elements/icon/legacy/_all'",
//     "import",
//     "'./markdown-docs'",
//   ];
//   const parseByGroupAndParts = ParseByGroupAndParts(words, matchRulesCodex);

//   // ADD loop next
//   let complete;
//   // let counter = 0;
//   let results;
//   while (complete !== true) {
//     // counter = counter + 1;
//     results = parseByGroupAndParts.go();
//     complete = results.complete;
//   }

//   test("should return true to indicate the string as been matched", () => {
//     expect(results).toBe(true);
//   });
// });
