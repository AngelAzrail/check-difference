import path from "path";
import { readFileSync } from "fs";
import diff from "./utils.js";
import parsers from "./parsers/parsers.js";

export default (first, second, format = parsers.json) => {
  const firstFile = readFileSync(path.resolve(first), "utf-8");
  const secondFile = readFileSync(path.resolve(second), "utf-8");
  const firstParsed = format(firstFile);
  const secondParsed = format(secondFile);
  diff(firstParsed, secondParsed);
};
