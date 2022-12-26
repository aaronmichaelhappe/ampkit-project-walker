import { describe, expect, test } from "@jest/globals";
import { go } from "./firstGrouping";
import { tokenActions } from "./options/token-actions";
import { tokens, words } from "./index";

describe("Testing Base Parser", () => {
  const result = go(words, tokens, tokenActions);

  test("Should return an object", () => {
    expect(result).toBe(false);
  });
});
