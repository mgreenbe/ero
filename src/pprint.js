const maxLength = arr => Math.max(...arr.map(x => x.length));

const padEntries = (arr, options) => {
  const { length, methodName, padding } = Object.assign(
    {},
    {
      methodName: "padStart",
      padding: " "
    },
    options
  );
  return arr.map(x => x[methodName](length || maxLength(arr), padding));
};

const array1dToString = (arr, options) => {
  const {
    length,
    methodName,
    padding,
    gutter,
    lDelim,
    lGutter,
    rDelim,
    rGutter,
    stringify
  } = Object.assign(
    {},
    {
      methodName: "padStart",
      padding: " ",
      gutter: "  ",
      lDelim: "[",
      lGutter: " ",
      rDelim: "]",
      rGutter: " ",
      stringify: x => x.toString()
    },
    options
  );
  return `${lDelim}${lGutter}${padEntries(arr.map(x => stringify(x)), {
    length,
    methodName,
    padding
  }).join(gutter)}${rGutter}${rDelim}`;
};

const array2dToString = (arr, options) => {
  const length = Math.max(...arr.map(a => maxLength(a)));
  const _options = Object.assign({}, options, { length });
  return arr.map(a => array1dToString(a, _options)).join("\n");
};

module.exports = { array1dToString, array2dToString };
