(function () {
    var CONTENT_TYPE_IMAGE = 'Image',
        SIZES_URL = '/Admin/Hero/Sizes';

    var $openMediaBtn = $('.js-open-media-library'),
        $breakpoints = $('.js-hero-breakpoints'),
        $input = $('#Hero_Text');

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
                cachedScrollPosition = $('html').scrollTop();
                // hide the scrollbars from the main window
                $('html, body').css('overflow', 'hidden');
            },
            onClosed: function () {
                $('html, body').css('overflow', '');
                $('html').scrollTop(cachedScrollPosition);
                setHtml($.colorbox.selectedData);
            }
        });

        return false;
    };

    /**
     * Returns HTML for a single image.
     */
    var renderSingleImage = function (image, onRenderHtml) {
        var html = '<section class="hero">\n',
            url = SIZES_URL + '?id=' + image.id + '&breakpoints=' + $breakpoints.val();

        $.ajax({
            url: url
        })
        .done(function(data) {
            var largestImage = data[data.length - 1];
            var imageElement = '<img sizes="(max-width: ' + largestImage.Size + 'px) 100vw, ' + largestImage.Size + 'px"';
            
            imageElement += '\n\t\tsrcset="';
            
            for (var i = 0; i < data.length; i++) {
                imageElement += '\n\t\t\t' + data[i].Url + ' ' + data[i].Size + 'w';

                if (i < (data.length - 1)) {
                    imageElement += ',';
                }
            }
            
            imageElement += '"';
            imageElement += '\n\t\tsrc="' + largestImage.Url + '" alt="' + image.alternateText + '" />';
            
            html += '\t' + imageElement;
            html += '\n</section>';
            onRenderHtml(html);
        });
    };

    /**
     * Uses selected media to set HTML.
     */
    var setHtml = function (media) {
        if (!media || media.length === 0) {
            return;
        }

        var onRenderHtml = function (html) {
            $input.val(html);
            $input[0].dispatchEvent(new Event('change'));
        };

        if (media.length === 1 && media[0].contentType === CONTENT_TYPE_IMAGE) {
            renderSingleImage(media[0], onRenderHtml);
        }
    };

    addListeners();
})();