import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import { getType } from './utils.js';
import parsers from './parsers/parsers.js';
import formatters from './formatters/index.js';

export const node = (status, key, value, nextValue = null) => ({
  status,
  key,
  value,
  nextValue,
});

export const tree = (initial, performed) => {
  const allKeys = _.union(_.keys(initial), _.keys(performed));
  return _.sort(allKeys).map((key) => {
    const initialHasKey = _.has(initial, key);
    const performedHasKey = _.has(performed, key);
    if (initialHasKey && performedHasKey) {
      if (_.isObject(initial[key]) && _.isObject(performed[key])) {
        return node('hasChildren', key, tree(initial[key], performed[key]));
      }
      if (initial[key] === performed[key]) {
        return node('initial', key, initial[key]);
      }
      return node('updated', key, initial[key], performed[key]);
    }
    return !initialHasKey
      ? node('added', key, performed[key])
      : node('deleted', key, initial[key]);
  });
};

const gendiff = (initial, performed, format = 'stylish') => {
  const firstFileType = getType(initial);
  const secondFileType = getType(performed);
  if (!firstFileType || !secondFileType) return 'Невозможно прочитать файлы(ы)';
  const firstFile = readFileSync(path.resolve(initial), 'utf-8');
  const secondFile = readFileSync(path.resolve(performed), 'utf-8');
  const firstParsed = parsers[firstFileType](firstFile);
  const secondParsed = parsers[secondFileType](secondFile);
  const statusTree = tree(firstParsed, secondParsed);
  return formatters(statusTree, format);
};

export default gendiff;
