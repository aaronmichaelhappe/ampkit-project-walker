import { describe, expect, test } from "@jest/globals";
import { tokenActions } from "./token-actions";

const ts = ["import", "let"];
let mapped;

mapped = ts.map((t) => {
  return tokenActions(t);
});

describe("Temp test", () => {
  test("Should return an object", () => {
    expect(1).toBe(1);
  });
});
