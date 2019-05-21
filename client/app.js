const colorService = require('./services/color-service');

$(document).ready(() => {
    $('#searchBtn').on('click', () => {
        let searchText = $('#search').val();

        colorService
            .searchColors(searchText)
            .then((results) => {
                const paletteTemplate = $('#paletteTemplate');
                const output = $('#output');

                results.forEach((palette) => {
                    let paletteHtml = paletteTemplate.html().trim();
                    let $palette = $(paletteHtml);

                    //TODO: Update palette name, and author
                    let $image = $palette.find('.palette-image');
                    $image.attr('src', palette.imageUrl);

                    let $name = $palette.find('.palette-name');
                    $name.text(palette.title);

                    let $author = $palette.find('.palette-author');
                    $author.text(palette.userName);

                    output.append($palette);
                })
                    .catch((err) => {
                        console.error(err);
                    });
            });
    });
});