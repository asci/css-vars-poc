'use strict';
(function () {
  var colors = window.TravixTheme || {};
  var toArr = function toArr(list) {
    return [].slice.call(list);
  };

  var regex = /var\(--([\w-]+)\)/g;

  var path = './style.css';
  toArr(document.querySelectorAll('[data-cssvars]')).forEach(applyCssVars);

  function applyCssVars(elem) {
    var path = elem.href;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", path, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status === 0) {
              var styleEl = document.createElement('style');
              var addCss = '';
              document.head.appendChild(styleEl);

              var fileContent = rawFile.responseText;
              var lines = fileContent.split('\n');
              addCss += lines.join('').replace(regex, function (match, group) {
                return colors[group];
              });

              styleEl.innerText = addCss;//.split(';').join(';\n').split('}').join('}\n\n').split('{').join('{\n');
          }
      }
    };
    rawFile.send(null);
  }
})();
