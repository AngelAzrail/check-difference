import _ from "lodash";

export default (initial, performed) => {
    const allKeys = _.union(_.keys(initial), _.keys(performed)).sort();
    let result = '{\n';
    allKeys.forEach((key) => {
        if (!_.isEqual(initial[key], performed[key])) {
            if (initial[key] !== undefined) {
                result += ` - ${key}: ${initial[key]}\n`;
            }
            if (performed[key] !== undefined) {
                result += ` + ${key}: ${performed[key]}\n`;
            }
        } else {
            result += `   ${key}: ${initial[key]}\n`;
        }
    });
    result += '}';
    console.log(result);
    return result;
};