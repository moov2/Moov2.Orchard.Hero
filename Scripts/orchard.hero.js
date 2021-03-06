/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yY2hhcmQuaGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im9yY2hhcmQuaGVyby5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgQ09OVEVOVF9UWVBFX0lNQUdFID0gJ0ltYWdlJyxcclxuICAgICAgICBTSVpFU19VUkwgPSAnL0FkbWluL0hlcm8vU2l6ZXMnO1xyXG5cclxuICAgIHZhciAkb3Blbk1lZGlhQnRuID0gJCgnLmpzLW9wZW4tbWVkaWEtbGlicmFyeScpLFxyXG4gICAgICAgICRicmVha3BvaW50cyA9ICQoJy5qcy1oZXJvLWJyZWFrcG9pbnRzJyksXHJcbiAgICAgICAgJGlucHV0ID0gJCgnI0hlcm9fVGV4dCcpO1xyXG5cclxuICAgIHZhciBhZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJG9wZW5NZWRpYUJ0bi5vbignY2xpY2snLCBvcGVuTWVkaWFQaWNrZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIG1lZGlhIHBpY2tlciwgY29udGVudCBlZGl0b3IgY2FuIHNlbGVjdCBhIG1lZGlhIGZyb20gbGlicmFyeSwgd2hpY2hcclxuICAgICAqIGlzIHRoZW4gdXNlZCB0byBnZW5lcmF0ZSBIVE1MLlxyXG4gICAgICovXHJcbiAgICB2YXIgb3Blbk1lZGlhUGlja2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhZG1pbkluZGV4ID0gbG9jYXRpb24uaHJlZi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJy9hZG1pbi8nKSxcclxuICAgICAgICAgICAgY2FjaGVkU2Nyb2xsUG9zaXRpb24gPSAwO1xyXG5cclxuICAgICAgICBpZiAoYWRtaW5JbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5jb2xvcmJveCh7XHJcbiAgICAgICAgICAgIGhyZWY6IGxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsIGFkbWluSW5kZXgpICsgJy9BZG1pbi9PcmNoYXJkLk1lZGlhTGlicmFyeT9kaWFsb2c9dHJ1ZScsXHJcbiAgICAgICAgICAgIGlmcmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgcmVwb3NpdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgd2lkdGg6ICc5MCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICc5MCUnLFxyXG4gICAgICAgICAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlZFNjcm9sbFBvc2l0aW9uID0gJCgnaHRtbCcpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgc2Nyb2xsYmFycyBmcm9tIHRoZSBtYWluIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQ2xvc2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdycsICcnKTtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5zY3JvbGxUb3AoY2FjaGVkU2Nyb2xsUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgc2V0SHRtbCgkLmNvbG9yYm94LnNlbGVjdGVkRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgSFRNTCBmb3IgYSBzaW5nbGUgaW1hZ2UuXHJcbiAgICAgKi9cclxuICAgIHZhciByZW5kZXJTaW5nbGVJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSwgb25SZW5kZXJIdG1sKSB7XHJcbiAgICAgICAgdmFyIGh0bWwgPSAnPHNlY3Rpb24gY2xhc3M9XCJoZXJvXCI+XFxuJyxcclxuICAgICAgICAgICAgdXJsID0gU0laRVNfVVJMICsgJz9pZD0nICsgaW1hZ2UuaWQgKyAnJmJyZWFrcG9pbnRzPScgKyAkYnJlYWtwb2ludHMudmFsKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXJnZXN0SW1hZ2UgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHZhciBpbWFnZUVsZW1lbnQgPSAnPGltZyBzaXplcz1cIihtYXgtd2lkdGg6ICcgKyBsYXJnZXN0SW1hZ2UuU2l6ZSArICdweCkgMTAwdncsICcgKyBsYXJnZXN0SW1hZ2UuU2l6ZSArICdweFwiJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGltYWdlRWxlbWVudCArPSAnXFxuXFx0XFx0c3Jjc2V0PVwiJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VFbGVtZW50ICs9ICdcXG5cXHRcXHRcXHQnICsgZGF0YVtpXS5VcmwgKyAnICcgKyBkYXRhW2ldLlNpemUgKyAndyc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCAoZGF0YS5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlRWxlbWVudCArPSAnLCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGltYWdlRWxlbWVudCArPSAnXCInO1xyXG4gICAgICAgICAgICBpbWFnZUVsZW1lbnQgKz0gJ1xcblxcdFxcdHNyYz1cIicgKyBsYXJnZXN0SW1hZ2UuVXJsICsgJ1wiIGFsdD1cIicgKyBpbWFnZS5hbHRlcm5hdGVUZXh0ICsgJ1wiIC8+JztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGh0bWwgKz0gJ1xcdCcgKyBpbWFnZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJ1xcbjwvc2VjdGlvbj4nO1xyXG4gICAgICAgICAgICBvblJlbmRlckh0bWwoaHRtbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlcyBzZWxlY3RlZCBtZWRpYSB0byBzZXQgSFRNTC5cclxuICAgICAqL1xyXG4gICAgdmFyIHNldEh0bWwgPSBmdW5jdGlvbiAobWVkaWEpIHtcclxuICAgICAgICBpZiAoIW1lZGlhIHx8IG1lZGlhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb25SZW5kZXJIdG1sID0gZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgJGlucHV0LnZhbChodG1sKTtcclxuICAgICAgICAgICAgJGlucHV0WzBdLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG1lZGlhLmxlbmd0aCA9PT0gMSAmJiBtZWRpYVswXS5jb250ZW50VHlwZSA9PT0gQ09OVEVOVF9UWVBFX0lNQUdFKSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNpbmdsZUltYWdlKG1lZGlhWzBdLCBvblJlbmRlckh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgYWRkTGlzdGVuZXJzKCk7XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
