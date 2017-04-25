const prepend = `(function() {
  window.TravixTheme = {\n`;
const append = `\n};\n
}());`;

function recursionCompile(obj, path) {
  const keys = Object.keys(obj);
  let result = [];

  keys.forEach((key) => {
    if (typeof obj[key] === 'string') {
      result.push(`\t"${path}-${key}": "${obj[key]}"`);
      return;
    }

    const children = recursionCompile(obj[key], path ? `${path}-${key}` : key);
    result = result.concat(children);
  });

  return result.join(',\n');
}

module.exports = {
  compile(obj, path) {
    return `${prepend}${recursionCompile(obj, path)}${append}`
  }
};
