var galleryGrid = (function () {
    'use strict';

    var loadImages = function (data, options) {
        var images = [];
        var image;
        var gridHtml;
        var thumbnail;
        var fullscreen;

        for (var i = 0; i < data.photos.photo.length; i++) {

            if (isMobile()) {
                thumbnail = data.photos.photo[i].url_s;
                fullscreen = data.photos.photo[i].url_m;
            } else {
                thumbnail = data.photos.photo[i].url_m;
                // Fix - some large images are missing
                fullscreen = (data.photos.photo[i].url_l !== undefined) ? data.photos.photo[i].url_l : data.photos.photo[i].url_m;
            }

            image = '<div class="item clickable" style="background-image:url(' + thumbnail + ')" data-src="' + fullscreen + '" title="' + data.photos.photo[i].title + '"></div>';
            images.push(image);
        }

        gridHtml = images.join('');
        document.getElementById(options.containerId).getElementsByClassName('images')[0].innerHTML = gridHtml;
        setCard(options);
    };

    var setCard = function (options) {
        var item = document.getElementById(options.containerId).getElementsByClassName('item');
        var itemWidth;
        var itemHeight;
        var containerWidth;

        containerWidth = document.getElementById(options.containerId).offsetWidth; // container width
        itemWidth = Math.floor(containerWidth / options.columns);   // card width
        itemHeight = Math.floor(itemWidth + (itemWidth * 0.33));    // 3:4 aspect

        for (var i = 0; i < item.length; i++) {
            item[i].style.width = itemWidth + 'px';
            item[i].style.height = itemHeight + 'px';
        }

        document.getElementById(options.containerId).getElementsByClassName('loading')[0].style.display = 'none';

    };

    var getPhotos = function (options) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                loadImages(data, options);
            }
        };

        request.open("GET", options.dataUrl, true);
        request.send();
    };

    var addElements = function (options) {
        var images = document.createElement('div');
        var title = document.createElement('div');
        var modal = document.createElement('div');
        var modalBody = document.createElement('div');
        var close = document.createElement('span');
        var loading = document.createElement('div');

        images.setAttribute('class', 'images');
        title.setAttribute('class', 'title');
        modal.setAttribute('id', options.modalId);
        modal.setAttribute('class', 'modal');
        modalBody.setAttribute('class', 'modal-body');
        close.setAttribute('class', 'close');
        close.innerHTML = '&times;';
        loading.setAttribute('class', 'loading');
        loading.innerHTML = '<span>Hang on a sec...</span>';

        document.body.appendChild(modal);
        document.getElementById(options.modalId).appendChild(close);
        document.getElementById(options.modalId).appendChild(modalBody);
        document.getElementById(options.modalId).appendChild(title);
        document.getElementById(options.containerId).appendChild(images);
        document.getElementById(options.containerId).appendChild(loading);
        document.getElementById(options.containerId).getElementsByClassName('loading')[0].style.display = 'block';
    };

    var handleClose = function (options) {
        document.getElementById(options.modalId).addEventListener('click', function (e) {
            if (e.target && e.target.matches('span.close')) {
                document.getElementById(options.modalId).style.display = 'none';
            }
        });
    };

    var handleClick = function (options) {
        var image;

        document.getElementById(options.containerId).addEventListener('click', function (e) {
            if (e.target && e.target.matches('div.clickable')) {

                image = document.createElement('img');
                image.setAttribute('src', e.target.getAttribute('data-src'));
                image.setAttribute('title', e.target.getAttribute('title'));

                document.getElementById(options.modalId).style.display = 'block';
                document.getElementById(options.modalId).getElementsByClassName('modal-body')[0].innerHTML = image.outerHTML;
                document.getElementById(options.modalId).getElementsByClassName('modal-body')[0].style.height = document.documentElement.clientHeight - 100;

                if (options.showTitles) {
                    document.getElementById(options.modalId).getElementsByClassName('title')[0].innerHTML = e.target.getAttribute('title');
                }

            }
        });
    };

    var isMobile = function () {
        // Super simple mobile test
        var screenSize = 480;

        if ((document.body.clientWidth < screenSize) || (document.body.clientHeight < screenSize)) {
            return true;
        }
        else {
            return false;
        }

    };

    var init = function (options) {
        options = options || {};
        options.columns = options.columns || 4;
        options.modalId = options.containerId + '-modal';

        addElements(options);
        getPhotos(options);
        handleClick(options);
        handleClose(options);

        window.onresize = function () {
            setCard(options);
        };

    };
    return {
        init: init
    };

}());

// Let's do this!
galleryGrid.init({
    dataUrl: 'photos.json',
    containerId: 'gallery-grid',
    columns: 4,
    showTitles: true
});
