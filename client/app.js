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
