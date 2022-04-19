import _ from "lodash";

const plain = (initial, performed, path = "") => {
  const allKeys = _.union(_.keys(initial), _.keys(performed)).sort();
  let result = "";
  allKeys.forEach((key) => {
    if (_.isObject(initial[key]) && _.isObject(performed[key]))
      result += plain(initial[key], performed[key], path ? `${path}.${key}` : key);
  else result += `Property '${path ? `${path}.${key}` : key}' changed from ${initial[key]} to ${performed[key]}\n`;
  });
  return result;
};

export default plain;
