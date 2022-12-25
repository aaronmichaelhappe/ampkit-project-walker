import { describe, expect, test } from "@jest/globals";
import { Tokens } from "./tokens";
import { tokenList } from "./token-list";

let tokens = new Tokens(tokenList);
let customTokens = ["asdf", "yo"];

tokens.addTokens(customTokens);

describe("Testing tokens class", () => {
  test("Should have an instanceof a Set on instantiated Tokens (tokens instantiated with a tokensList)", () => {
    expect(tokens.tokensSet instanceof Set).toBe(true);
  });
  test("Should have an instanceof a Map on instantiated Tokens (tokens instantiated with a tokensList)", () => {
    expect(tokens.tokens instanceof Map).toBe(true);
  });
  test("tokens should have 'import', '{', and 'let' in the Set", () => {
    let result;
    if (
      tokens.tokensSet.has("import") &&
      tokens.tokensSet.has("{") &&
      tokens.tokensSet.has("let")
    ) {
      result = true;
    }
    expect(result).toBe(true);
  });
  test("customTokens Array of strings should be added to the Set", () => {
    expect(tokens.tokensSet.has("asdf")).toBe(true);
  });
  // TODO: Tests -> adding with a map
});
