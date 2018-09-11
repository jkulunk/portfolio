var scrollTab = {
    tabControls: '<div class="tab-controls"><i class="left fa fa-chevron-left fa-2x btn btn-link disabled"></i><i class="right fa fa-chevron-right fa-2x btn btn-link"></i></div>',
    step: 200,
    speed: 500,
    diff: 0,
    position: 0,
    initialPosition: 0,
    setup: function () {
        if ($('.tab-scroll').length) {
            $('.tab-scroll').before('<div class="tab-outer"></div>');
            $('.tab-scroll.nav-tabs').addClass('tab-inner');
            $('.tab-inner').appendTo('.tab-outer');
            $('.tab-outer').before(scrollTab.tabControls);

            if ($('.tab-inner').width() > $('.tab-outer').width()) {
                $('.tab-outer').width($('.tab-outer').parent().width() - 100);
                $('.tab-controls').show();
                scrollTab.diff = $('.tab-inner').width() - $('.tab-outer').width();
                scrollTab.position = $('.tab-inner').position().left;
                scrollTab.initialPosition = scrollTab.position;
            }
        }
    },
    handleClick: function(direction){
        if(direction == 'left'){
            if (Math.abs(scrollTab.position) < scrollTab.step) {
                $('.tab-inner').animate({ left: scrollTab.initialPosition }, scrollTab.speed, function () {
                    scrollTab.position = $('.tab-inner').position().left;
                    $('.tab-controls .left').addClass('disabled');
                });
            }
            else {
                $('.tab-inner').animate({ left: '+=' + scrollTab.step }, scrollTab.speed, function () {
                    scrollTab.position = $('.tab-inner').position().left;
                    $('.tab-controls .right').removeClass('disabled');
                });
            }
        } else {
            if ((Math.abs(scrollTab.position) + scrollTab.step) < scrollTab.diff) {

                $('.tab-inner').animate({ left: '-=' + scrollTab.step }, scrollTab.speed, function () {
                    scrollTab.position = $('.tab-inner').position().left;
                    $('.tab-controls .left').removeClass('disabled');
                });
            }
            else {
                $('.tab-inner').animate({ left: '-=' + (scrollTab.diff - Math.abs(scrollTab.position)) }, scrollTab.speed, function () {
                    scrollTab.position = $('.tab-inner').position().left;
                    $('.tab-controls .right').addClass('disabled');
                });
            }
        }
    },
    handleResize: function () {
        $('.tab-outer').width($('.tab-outer').parent().innerWidth());

        if ($('.tab-inner').width() > $('.tab-outer').width()) {
            $('.tab-outer').width($('.tab-outer').parent().innerWidth() - 100);
            $('.tab-controls').show();
            scrollTab.diff = $('.tab-inner').width() - $('.tab-outer').width();
            $('.tab-inner').animate({ left: scrollTab.initialPosition }, scrollTab.speed, function () {
                scrollTab.position = $('.tab-inner').position().left;
                $('.tab-controls .left').addClass('disabled');
                $('.tab-controls .right').removeClass('disabled');
            });
        }
        else {
            $('.tab-controls').hide();
            $('.tab-inner').animate({ left: scrollTab.initialPosition }, scrollTab.speed);
        }
    }
};


$(function () {
    // bootstrap tabs
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    scrollTab.setup();

    $('.tab-controls .right').on('click', function () {
        scrollTab.handleClick('right');
    });

    $('.tab-controls .left').on('click', function () {
        scrollTab.handleClick('left');

    });

    $(window).resize(function () {
        scrollTab.handleResize();

    });

});
