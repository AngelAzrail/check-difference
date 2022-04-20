import path from 'path';
import {readFileSync} from 'fs';
import gendiff from '../index.js';

describe('gendiff tests', () => {
  const commonPath = path.join(__dirname, '/__fixtures__/');
  test.each`
    extname   | format
    ${'json'} | ${'plain'}
    ${'json'} | ${'stylish'}
    ${'json'} | ${'json'}
    ${'yaml'} | ${'json'}
    ${'yaml'} | ${'plain'}
    ${'yaml'} | ${'stylish'}
  `(
    'gendiff initial.$extname performed.$extname --format $format',

    ({ extname, format }) => {
      const pathToBefore = path.join(commonPath, `initial.${extname}`);
      const pathToAfter = path.join(commonPath, `performed.${extname}`);
      const pathToResult = path.join(commonPath, 'results', `${format}.txt`);
      const result = readFileSync(pathToResult, 'utf-8');
      expect(gendiff(pathToBefore, pathToAfter, format)).toBe(result);
    },
  );
});
