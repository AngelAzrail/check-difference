import path from "path";
import { readFileSync } from "fs";
import { diff, getType } from "./utils.js";
import parsers from "./parsers/parsers.js";

export default (first, second) => {
  const firstFile = readFileSync(path.resolve(first), "utf-8");
  const secondFile = readFileSync(path.resolve(second), "utf-8");
  const firstFileType = getType(first);
  const secondFileType = getType(second);
  const firstParsed = parsers[firstFileType](firstFile);
  const secondParsed = parsers[secondFileType](secondFile);
  console.log(diff(firstParsed, secondParsed));
};
