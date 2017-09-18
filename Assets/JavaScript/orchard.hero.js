(function () {
    var CONTENT_TYPE_IMAGE = 'Image';

    var $openMediaBtn = $('.js-open-media-library'),
        $textArea = $('#Hero_Text');

    var addListeners = function () {
        $openMediaBtn.on('click', openMediaPicker);
    };

    /**
     * Opens media picker, content editor can select a media from library, which
     * is then used to generate HTML.
     */
    var openMediaPicker = function () {
        var adminIndex = location.href.toLowerCase().indexOf('/admin/'),
            cachedScrollPosition = 0;

        if (adminIndex === -1) {
            return false;
        }

        $.colorbox({
            href: location.href.substr(0, adminIndex) + '/Admin/Orchard.MediaLibrary?dialog=true',
            iframe: true,
            reposition: true,
            width: '90%',
            height: '90%',
            onLoad: function () {
                cachedScrollPosition = $('body').scrollTop();
                // hide the scrollbars from the main window
                $('html, body').css('overflow', 'hidden');
            },
            onClosed: function () {
                $('html, body').css('overflow', '');
                $('body').scrollTop(cachedScrollPosition);

                setHtml($.colorbox.selectedData);
            }
        });

        return false;
    };

    /**
     * Returns HTML for a single image.
     */
    var renderSingleImage = function (image) {
        return '<section class="hero">\n\t<picture>\n\t\t<img src="' + image.resource + '" class="display--block" alt="' + image.alternateText + '" />\n\t</picture>\n</section>';
    };

    /**
     * Uses selected media to set HTML.
     */
    var setHtml = function (media) {
        if (!media || media.length === 0) {
            return;
        }

        var html = '';

        if (media.length === 1 && media[0].contentType === CONTENT_TYPE_IMAGE) {
            html = renderSingleImage(media[0]);
        }

        $textArea.val(html).trigger('change');
    };

    addListeners();
})();