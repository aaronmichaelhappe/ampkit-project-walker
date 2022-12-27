import { describe, expect, test } from "@jest/globals";
import { go } from "./first-grouping";
import { tokenActions } from "./options/token-actions";
import { tokens, words } from "./index";

describe("Testing Base Parser", () => {
  const result = go(words, tokens.tokensSet, tokenActions);
  // test("test placeholder", () => {
  //   expect(1).toBe(1);
  // });

  test("test temp", () => {
    expect(words[0]).toBe("import");
  });

  //
  test("result should be an array", () => {
    console.log(result);
    expect(Array.isArray(result)).toBe(true);
  });
  test("first array index.token should be a string.", () => {
    expect(typeof result[0].result).toBe("string");
  });
});
