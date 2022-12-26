import { describe, expect, test } from "@jest/globals";
import { go } from "./firstGrouping";
import { tokenActions } from "./options/token-actions";
import { tokens, words } from "./index";

describe("Testing Base Parser", () => {
  const result = go(words, tokens.tokensSet, tokenActions);

  test("result should be an array", () => {
    expect(Array.isArray(result)).toBe(true);
  });
  test("first array index.token should be a string.", () => {
    expect(typeof result[0].token).toBe("string");
  });
});
