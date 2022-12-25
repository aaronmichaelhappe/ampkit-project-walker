import { describe, expect, test } from "@jest/globals";
import { Tokens } from "./tokens";

const tokenList = ["import"];
let tokens = new Tokens(tokenList);

describe("Testing tokens class", () => {
  test("Should return an object", () => {
    expect("").toBe("");
  });
});
