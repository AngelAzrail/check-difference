export const statusesMap = {
  added: {
    json: "+",
  },
  removed: {
    json: "-",
  },
  initial: {
    json: " ",
  },
};

export const jsonFormat = (status, key, value) =>
  ` ${statusesMap[status].json} ${key}: ${value}\n`;

export const formatsMap = {
  json: jsonFormat,
};

export const formatOutput = (status, format, key, value) => {
  return formatsMap[format](status, key, value);
};
