import _ from "lodash";
import { statusesMap } from "../utils.js";

export const plainFormat = (status, value, path) =>
  `Property '${path}' was ${statusesMap[status].plain}`;

export const isNested = (value) =>
  _.isObject(value) ? "[complex_value]" : `'${value}'`;

const plain = (tree, path = null) =>
  tree
    .map((node) => {
      const newPath = path ? [path, node.key].join(".") : node.key;
      if (node.status === "hasChildren") {
        return plain(node.value, newPath);
      }
      switch (node.status) {
        case "added":
          return `${plainFormat(
            node.status,
            node.value,
            newPath
          )} with value: ${isNested(node.value)}\n`;
        case "removed":
          return `${plainFormat(node.status, node.value, newPath)}.\n`;
        case "updated":
          return `${plainFormat(
            node.status,
            node.value,
            newPath
          )}. From ${isNested(node.value)} to ${isNested(node.nextValue)}\n`;
        default:
          return "";
      }
    })
    .join("");

export default plain;
