import { getType } from "../utils.js";

describe("getType func tests", () => {
  const paths = [
    "dir/dir2/file.json",
    "dir/dir2/file.test.js",
    "dir/dir2/file",
  ];
  test("right", () => {
    const types = ["json", "js", ""];
    paths.forEach((path, idx) => {
      const pathType = getType(path);
      expect(pathType).toBe(types[idx]);
    });
  });

  test("wrong", () => {
    const types = ["dir/dir2/file", "test", "dir/dir2/file"];
    paths.forEach((path, idx) => {
      const pathType = getType(path);
      expect(pathType).not.toBe(types[idx]);
    });
  });
});
