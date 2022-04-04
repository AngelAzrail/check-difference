import path from "path";
import { readFileSync } from "fs";
import { diff, getType } from "./utils.js";
import parsers from "./parsers/parsers.js";
import { formatsMap } from "./format-output.js";

export const prepare = (first, second, format) => {
  if (!formatsMap[format])
    return "Данный формат вывода не поддерживается";
  const firstFileType = getType(first);
  const secondFileType = getType(second);
  if (!firstFileType || !secondFileType) return "Невозможно прочитать файлы(ы)";
  const firstFile = readFileSync(path.resolve(first), "utf-8");
  const secondFile = readFileSync(path.resolve(second), "utf-8");
  const firstParsed = parsers[firstFileType](firstFile);
  const secondParsed = parsers[secondFileType](secondFile);
  return diff(firstParsed, secondParsed, format);
};

export default (first, second, format) => {
  console.log(prepare(first, second, format));
};
