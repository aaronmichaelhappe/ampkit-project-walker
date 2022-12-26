import { describe, expect, test } from "@jest/globals";
import { MatchTokenFactory } from "./match-token";
import { Tokens } from "./tokens";
import { tokenList } from "./token-list";
// import { data } from "../../test-content/data";

let str = "let";

let tokens = new Tokens(tokenList);

const matchTokenInit = MatchTokenFactory(tokens.tokensSet);

const matchToken = matchTokenInit(str);

const result = matchToken.match();

console.log(result);

describe("Testing Base Parser", () => {
  const typeOfResult = typeof result;

  test("Should return an object", () => {
    expect(typeOfResult).toBe(4);
  });
});
