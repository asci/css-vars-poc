;'use strict';
[].forEach.call(document.querySelectorAll('[data-cssvars]'), function (elem) {
  var path = elem.href;
  var rawFile = new XMLHttpRequest();
  rawFile.open('GET', path, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
      var styleEl = document.createElement('style');
      document.head.appendChild(styleEl);

      styleEl.innerText = rawFile.responseText
        .split('\n').join('')
        .replace(/var\(--([\w-]+)\)/g, function (match, group) {
          return (window.TravixTheme || {})[group];
        });
    }
  };
  rawFile.send(null);
});
