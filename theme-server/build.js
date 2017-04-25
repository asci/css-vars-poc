const themeBuilder = require('theme-builder');
const fs = require('fs');
const cssvars = require('./cssvars');
const jsvars = require('./jsvars');

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

cssbuilder.build(`./${process.env.THEME || 'theme-1'}.yaml`)
  .then(result => fs.writeFileSync('public/theme.css', result));

jsbuilder.build(`./${process.env.THEME || 'theme-1'}.yaml`)
  .then(result => fs.writeFileSync('public/theme.js', result));
