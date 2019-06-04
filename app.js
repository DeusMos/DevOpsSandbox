(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ColorService = require('./services/color-service');

$(document).ready(() => {
  $('#searchBtn').on('click', () => {
    const searchText = $('#searchText').val();

    ColorService
      .searchColors(searchText)
      .then((results) => {
        const paletteTemplate = $('#paletteTemplate');
        const paletteHTML = paletteTemplate.html().trim();
        const output = $('#output');

        results.forEach((palette) => {
          const $palette = $(paletteHTML);

          const $paletteImage = $palette.find('.palette-image');
          const $paletteName = $palette.find('.palette-name');
          const $paletteAuthor = $palette.find('.palette-author');

          $paletteImage.attr('src', palette.imageUrl);
          $paletteName.text(palette.title);
          $paletteAuthor.text(palette.userName);

          output.append($palette);
        });
      })
      .catch((err) => {
        /* eslint-disable */
        alert('shit hit the fan');
        console.error('failed: ', err);
        /* eslint-enable */
      });
  });
});

},{"./services/color-service":2}],2:[function(require,module,exports){
const colourLoversAPI = '//www.colourlovers.com/api/colors';

function searchColors(query, filters = {}) {
  const queryParams = [];

  /* eslint-disable-next-line */
  for (const key in Object.keys(filters)) {
    queryParams.push(`${key}=${filters[key]}`);
  }
  queryParams.push(`keywords=${query}`);
  queryParams.push('jsonCallback=?');

  const searchUrl = `${colourLoversAPI}?${queryParams.join('&')}`;

  return new Promise((resolve, reject) => {
    $.getJSON(searchUrl, resolve)
      .fail((jqxhr, textStatus, error) => {
        reject(error);
      });
  });
}

function getNewColors() {
  // TODO: Write this
}

module.exports = {
  searchColors,
  getNewColors
};

},{}]},{},[1]);
