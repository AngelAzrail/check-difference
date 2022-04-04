import { diff } from "../utils.js";
import { right, wrong1, wrong2 } from "./__fixtures__/json-completed.js";
import { file1, file2 } from "./__fixtures__/parsed.js";

describe("json tests", () => {
  let difference;
  beforeAll(() => {
    difference = diff(file1, file2);
  });

  test("right test", () => {
    expect(difference).toEqual(right);
  });

  test("wrong without removed", () => {
    expect(difference).not.toEqual(wrong1);
  });

  test("wrong without added", () => {
    expect(difference).not.toEqual(wrong2);
  });
});
