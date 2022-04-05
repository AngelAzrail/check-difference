import _ from "lodash";
import path from "path";
import { formatOutput } from "./format-output.js";

export const diff = (initial, performed, format, hasParent = 0) => {
  const allKeys = _.union(_.keys(initial), _.keys(performed)).sort();
  let result = "{\n";
  allKeys.forEach((key) => {
    if (
      typeof initial[key] === "object" ||
      typeof performed[key] === "object"
    ) {
      result += ` ${' '.repeat(hasParent)}${key}: ${ 
        diff(
          initial[key] ? initial[key] : {},
          performed[key] ? performed[key] : {},
          format,
          hasParent + 2
        )}`;
    } else if (!_.isEqual(initial[key], performed[key])) {
      if (initial[key] !== undefined) {
        result += formatOutput("removed", format, key, initial[key], hasParent);
      }
      if (performed[key] !== undefined) {
        result += formatOutput("added", format, key, performed[key], hasParent);
      }
    } else {
      result += formatOutput("initial", format, key, initial[key], hasParent);
    }
  });
  result += `${' '.repeat(hasParent)}}\n`;
  return result;
};

export const getType = (filePath) => {
  const type = path.extname(filePath);
  return type ? type.slice(1) : type;
};
