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

export const stylishFormat = (status, key, value, hasParent) =>
  ` ${' '.repeat(hasParent)}${statusesMap[status].stylish} ${key}: ${value}\n`;

export const formatsMap = {
  stylish: stylishFormat,
};

export const formatOutput = (status, format, key, value, hasParent) => {
  return formatsMap[format](status, key, value, hasParent);
};
