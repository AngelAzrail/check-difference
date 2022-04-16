export const statusesMap = {
  added: {
    stylish: "+",
  },
  removed: {
    stylish: "-",
  },
  initial: {
    stylish: " ",
  },
};

export const stylishFormat = (status, key, value, depth) =>
  `${" ".repeat(depth)} ${statusesMap[status].stylish} ${key}: ${value}\n`;

export const formatsMap = {
  stylish: stylishFormat,
};

export const formatOutput = (status, format, key, value, depth) =>
  formatsMap[format](status, key, value, depth);

export const nestedBeginning = (status, key, depth) => `${' '.repeat(depth)} ${statusesMap[status].stylish} ${key}: {\n`
