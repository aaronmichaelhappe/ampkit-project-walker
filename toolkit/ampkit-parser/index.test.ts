import { describe, expect, test } from "@jest/globals";
import { generateKey } from "node:crypto";
import { ParseList, type MatchState } from "./index";
import {
  matchRules as matchRulesCodex,
  type MatchRule,
} from "./individual-match-rules";

// TODO: ';' is often at the end of words. check for this.
const words = ["import", "'thing'", ";"];

describe("Testing ParseList.assignCurrentMatchData", () => {
  const words = [
    "import",
    "'example'",
    "import",
    "yall",
    "import",
    "*",
    "from",
    "./cats.js",
  ];
  const parseList = ParseList(words, matchRulesCodex);
  parseList.assignCurrentWord("lalala;");
  const currentMatch = parseList.assignCurrentMatchData(true);

  test("currentMatch.str is equal to the argument passed to assignCurrentWord", () => {
    expect(currentMatch.str).toBe("lalala;");
  });
});

describe("Testing ParseList.catchSemiColons", () => {
  const parseList = ParseList(words, matchRulesCodex);
  parseList.assignCurrentWord("wordForMatch;");
  const str = parseList.catchSemiColons(true);
  parseList.assignCurrentWord("wordForMatch");
  const str2 = parseList.catchSemiColons(true);

  test("Word's last char is removed if the char is a semi-colon. Nothing is removed otherwise", () => {
    expect(str).toBe("wordForMatch");
    expect(str2).toBe("wordForMatch");
  });
});

describe("Testing ParseList.checkMatch", () => {
  const words = ["import", "'example'", ";"];
  const parseList = ParseList(words, matchRulesCodex);

  let str = `${words[0]} ${words[1]} ;`;

  const matched = parseList.match(str);

  test("should return true to indicate the string as been matched", () => {
    expect(matched).toBe(true);
  });
});

describe("Testing ParseList.matchTerminator", () => {
  const parseList = ParseList(words, matchRulesCodex);
  const matched = parseList.matchTerminator(";");
  let str = `${words[0]}${words[1]}`;

  test("should return true to indicate ';' has been matched by a matchTerminator", () => {
    expect(matched).toBe(true);
  });
});

describe("Testing ParseList.performMatch", () => {
  let word1 = words[0];
  const parseList = ParseList(words, matchRulesCodex);
  let str = words[0];
  const matched = parseList.performMatch("import", word1, str);
  const matched2 = parseList.performMatch("importZ", word1, str);
  const matched3 = parseList.performMatch("/import/", word1, str);
  const matched4 = parseList.performMatch("/importZ/", word1, str);
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

// describe("Testing ParseList.go and using a while loop for multi matches", () => {
//   const words = ["import", "'thing'", "import", "cat", "from", "dog", ";"];
//   const parseList = ParseList(words, matchRulesCodex);

//   // ADD loop next
//   let complete;
//   let counter = 0;
//   let results;
//   while (complete !== true) {
//     counter = counter + 1;
//     results = parseList.go();
//     complete = results.complete;
//     if (results) {
//       console.log("results");
//       console.log(results);
//     }
//     counter++;
//     if (counter > 20) break;
//   }

//   test("should return correct types on the results", () => {
//     expect(Array.isArray(results.allResults.module)).toBe(true);
//     expect(typeof results.currentMatch.groupName).toBe("string");
//     expect(typeof results.currentMatch.partsName).toBe("string");
//     expect(Array.isArray(results.currentMatch.parts)).toBe(true);
//   });
// });

// describe("Testing ParseList.go...", () => {
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
//   const parseList = ParseList(words, matchRulesCodex);

//   // ADD loop next
//   let complete;
//   // let counter = 0;
//   let results;
//   while (complete !== true) {
//     // counter = counter + 1;
//     results = parseList.go();
//     complete = results.complete;
//   }

//   test("should return true to indicate the string as been matched", () => {
//     expect(results).toBe(true);
//   });
// });
