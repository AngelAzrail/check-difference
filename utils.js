import _ from "lodash";
import path from "path";
import {formatOutput, nestedBeginning} from "./format-output.js";

export const output = (status, str, key, format, depth) => {
  let result = "";
  if (!_.isObject(str)) result = formatOutput(status, format, key, str, depth);
  else {
    result += nestedBeginning(status, key, depth);
    Object.entries(str).forEach(([name, value]) => {
      result += output("initial", value, name, format, depth + 2);
    });
    result += `${' '.repeat(depth + 2)}}\n`;
  }
  return result;
};

export const diff = (initial, performed, format, depth = 0) => {
  const allKeys = _.union(_.keys(initial), _.keys(performed)).sort();
  let result = "{\n";
  allKeys.forEach((key) => {
    if (_.isObject(initial[key]) && _.isObject(performed[key])) {
      result += formatOutput(
        "initial",
        format,
        key,
        diff(
          initial[key] ? initial[key] : {},
          performed[key] ? performed[key] : {},
          format,
          depth + 2
        ),
        depth
      );
    } else if (!_.isEqual(initial[key], performed[key])) {
      if (initial[key] !== undefined) {
        result += output("removed", initial[key], key, format, depth);
      }
      if (performed[key] !== undefined) {
        result += output("added", performed[key], key, format, depth);
      }
    } else {
      result += output("initial", initial[key], key, format, depth);
    }
  });
  result += `${" ".repeat(depth)}}`;
  return result;
};

export const getType = (filePath) => {
  const type = path.extname(filePath);
  return type ? type.slice(1) : type;
};
