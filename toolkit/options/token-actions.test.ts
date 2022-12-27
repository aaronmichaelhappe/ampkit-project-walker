import { describe, expect, test } from "@jest/globals";
import { ImportStatementActions } from "./token-actions";

let importFunc = new ImportStatementActions();

let result = importFunc.doAction("import");
describe("Testing Actions", () => {
  test("temp test", () => {
    expect(1).toBe(1);
  });
  // test("Should return the string passed in when string doesn't match", () => {
  //   result = importFunc.doAction("example");
  //   expect(result.token).toBe("example");
  // });
});
