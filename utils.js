import path from "path";

export const getType = (filePath) => {
  const type = path.extname(filePath);
  return type ? type.slice(1) : type;
};

export const statusesMap = {
  added: {
    stylish: "+ ",
  },
  deleted: {
    stylish: "- ",
  },
  initial: {
    stylish: "  ",
  },
  updated: {
    stylish: "  ",
  },
  hasChildren: {
    stylish: "  ",
  },
};
