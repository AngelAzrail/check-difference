import diff from "../utils.js";
import { file1, file2 } from "./__fixtures__/json-parsed.js";
import jsonCompleted from "./__fixtures__/json-completed.js";

describe("json tests", () => {
  test("right test", () => {
    const difference = diff(file1, file2);
    expect(difference).toEqual(jsonCompleted);
  });
});
