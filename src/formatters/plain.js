import _ from 'lodash';
import { statusesMap } from '../utils.js';

export const plainFormat = (status, value, path) => `Property '${path}' was ${statusesMap[status].plain}`;

export const isNested = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `${typeof value === 'string' ? `'${value}'` : value}`;
};

const plain = (tree, path = null) => tree
  .map((node) => {
    const newPath = path ? [path, node.key].join('.') : node.key;
    if (node.status === 'hasChildren') {
      return plain(node.value, newPath);
    }
    switch (node.status) {
    case 'added':
      return `${plainFormat(
        node.status,
        node.value,
        newPath,
      )} with value: ${isNested(node.value)}`;
    case 'deleted':
      return `${plainFormat(node.status, node.value, newPath)}`;
    case 'updated':
      return `${plainFormat(
        node.status,
        node.value,
        newPath,
      )}. From ${isNested(node.value)} to ${isNested(node.nextValue)}`;
    default:
      return '';
    }
  })
  .filter((item) => item)
  .join('\n');

export default plain;
