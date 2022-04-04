export const right =
  "{\n" +
  " - follow: false\n" +
  "   host: hexlet.io\n" +
  " - proxy: 123.234.53.22\n" +
  " - timeout: 50\n" +
  " + timeout: 20\n" +
  " + verbose: true\n" +
  "}";

export const wrong1 =
  "{\n" +
  "   host: hexlet.io\n" +
  " + timeout: 20\n" +
  " + verbose: true\n" +
  "}";

export const wrong2 =
    "{\n" +
    " - follow: false\n" +
    "   host: hexlet.io\n" +
    " - proxy: 123.234.53.22\n" +
    " - timeout: 50\n" +
    "}";