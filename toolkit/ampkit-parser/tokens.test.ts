import { describe, expect, test } from "@jest/globals";
import { Tokens } from "./tokens";
import { tokenList } from "./token-list";

let tokens = new Tokens(tokenList);

describe("Testing tokens class", () => {
  test("Should have an instanceof a Set on instantiated Tokens (tokens instantiated with a tokensList)", () => {
    expect(tokens.tokensSet instanceof Set).toBe(true);
  });
});
