import { describe, expect, test } from "@jest/globals";
import { StringSplitFactory } from "./string-split";
import { Tokens } from "./tokens";
import { tokenList } from "./token-list";
import { buiTokens } from "../options/index";
import { data } from "../../test-content/data";

let str = data.replace(/\n/g, " ");

let tokens = new Tokens(tokenList);

const stringSplitInit = StringSplitFactory(tokens.tokensSet, buiTokens);

const stringSplit = stringSplitInit(str);

const result = stringSplit.split();

describe("Testing Base Parser", () => {
  const typeOfResult = typeof result;

  test("Should return an object", () => {
    expect(typeOfResult).toBe("object");
  });
});
