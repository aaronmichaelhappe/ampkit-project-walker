import { describe, expect, test } from "@jest/globals";
import { ImportStatementActions } from "./token-actions";

let importFunc = new ImportStatementActions();

let result = importFunc.doAction("import");

describe("Temp test", () => {
  test("Should return an object", () => {
    expect(typeof result.token).toBe("string");
  });
  test("Should return the string passed in when string doesn't match", () => {
    result = importFunc.doAction("example");
    expect(result.token).toBe("example");
  });
});
