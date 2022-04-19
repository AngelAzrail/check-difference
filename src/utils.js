import path from "path";

export const getType = (filePath) => {
  const type = path.extname(filePath);
  return type ? type.slice(1) : type;
};

export const statusesMap = {
  added: {
    stylish: "+ ",
    plain: "added",
  },
  deleted: {
    stylish: "- ",
    plain: "removed",
  },
  initial: {
    stylish: "  ",
    plain: "",
  },
  updated: {
    stylish: "  ",
    plain: "updated",
  },
  hasChildren: {
    stylish: "  ",
    plain: "",
  },
};
