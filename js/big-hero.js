function moveBigHero() {
    var h = $(window).height();

    var top = $(this).scrollTop();
    //var offSet = $(".ba_homepage .prestigio").offset();

    //hero
    $("#section1").css("background-position-y", (top / .2) * -1);
    $("#section1").css("margin-top", (top * 1.5) * -1);



}

$(function () {

    var h = $(window).height();
    $("section").height(h);

    $(window).scroll(function () {
        moveBigHero();
    });

});
