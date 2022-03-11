import path from "path";
import _ from "lodash";
import { readFileSync } from "fs";

const diff = (initial, performed) => {
  const allKeys = _.union(_.keys(initial), _.keys(performed)).sort();
  console.log("{");
  allKeys.forEach((key) => {
    if (!_.isEqual(initial[key], performed[key])) {
      if (initial[key] !== undefined) {
        console.log(` - ${key}:`, initial[key]);
      }
      if (performed[key] !== undefined) {
        console.log(` + ${key}:`, performed[key]);
      }
    } else {
      console.log(`   ${key}: ${performed[key]}`);
    }
  });
  console.log("}");
};

export default (first, second) => {
  const firstFile = readFileSync(path.resolve(first), "utf-8");
  const secondFile = readFileSync(path.resolve(second), "utf-8");
  const firstParsed = JSON.parse(firstFile);
  const secondParsed = JSON.parse(secondFile);
  diff(firstParsed, secondParsed);
};
