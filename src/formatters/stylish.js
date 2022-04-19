import _ from 'lodash';
import { statusesMap } from '../utils.js';

export const stylishFormat = (status, key, value, depth) => {
  if (_.isObject(value)) {
    const node = Object.entries(value)
      .map(([name, val]) => stylishFormat('initial', name, val, depth + 4))
      .join('');
    return stylishFormat(
      status,
      key,
      `{\n${node}${' '.repeat(depth + 2)}}`,
      depth,
    );
  }
  return `${' '.repeat(depth)}${statusesMap[status].stylish}${key}: ${value}\n`;
};

const stylish = (tree, depth = 0) => {
  const spaces = depth + 2;
  const newTree = tree
    .map((node) => {
      if (node.status === 'updated') {
        return (
          stylishFormat('deleted', node.key, node.value, spaces)
          + stylishFormat('added', node.key, node.nextValue, spaces)
        );
      }
      if (node.status === 'hasChildren') {
          return stylishFormat(
              node.status,
              node.key,
              stylish(node.value, spaces + 2),
              spaces,
          );
      }
      return stylishFormat(node.status, node.key, node.value, spaces);
    })
    .join('');
  return `{\n${newTree}${' '.repeat(depth)}}`;
};

export default stylish;
