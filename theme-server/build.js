const themeBuilder = require('theme-builder');
const fs = require('fs');
const cssvars = (function() {
  function recursionCompile(obj, path) {
    const keys = Object.keys(obj);
    let result = [];

    keys.forEach((key) => {
      if (typeof obj[key] === 'string') {
        result.push(`\t--${path}-${key}: ${obj[key]};`);
        return;
      }

      const children = recursionCompile(obj[key], path ? `${path}-${key}` : key);
      result = result.concat(children);
    });

    return result.join('\n');
  }

  return {
    compile(obj, path) {
      return `:root {\n${recursionCompile(obj, path)}\n}`
    }
  };
}());

const jsvars = (function() {
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

  return {
    compile(obj, path) {
      return `${prepend}${recursionCompile(obj, path)}${append}`
    }
  };
}());

const cssbuilder = themeBuilder({
  format: 'cssvars',
  prefix: 'tx',
  processors: { cssvars }
});

const jsbuilder = themeBuilder({
  format: 'jsvars',
  prefix: 'tx',
  processors: { jsvars }
});

cssbuilder.build(`./${process.env.THEME}.yaml`)
  .then(result => fs.writeFileSync('public/theme.css', result));

jsbuilder.build(`./${process.env.THEME}.yaml`)
  .then(result => fs.writeFileSync('public/theme.js', result));
