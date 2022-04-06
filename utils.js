import _ from "lodash";
import path from "path";
import { formatOutput } from "./format-output.js";

export const diff = (initial, performed, format, depth = 0) => {
  const allKeys = _.union(_.keys(initial), _.keys(performed)).sort();
  let result = "{\n";
  allKeys.forEach((key) => {
    if (
      (initial[key] && typeof initial[key] === "object") ||
      (performed[key] && typeof performed[key] === "object")
    ) {
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
        result += formatOutput("removed", format, key, initial[key], depth);
      }
      if (performed[key] !== undefined) {
        result += formatOutput("added", format, key, performed[key], depth);
      }
    } else {
      result += formatOutput("initial", format, key, initial[key], depth);
    }
  });
  result += `${" ".repeat(depth)}}`;
  return result;
};

export const getType = (filePath) => {
  const type = path.extname(filePath);
  return type ? type.slice(1) : type;
};
