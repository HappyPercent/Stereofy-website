/*jshint esversion: 6*/ 

$(document).ready(function() {
    $('html, body').on('mousedown',function(ev) {
    if(!$(ev.target).is('.search-button') && $('.search-button').hasClass('active')) {
        $('.search-button').removeClass('active');
    }
    if(!(ev.target.closest('.nav')) && $('.nav').hasClass('active') && !$(ev.target).is('.header__burger')) {
        $('.nav').removeClass('active');
        $('html, body').css('overflow', 'visible');
    }
    });

    $('.header__logo').on('click', function(ev) {
        ev.preventDefault();
        $('html, body').animate({scrollTop:0}, 500);
    });

    $('.header__burger').on('click', function(ev) {
        ev.preventDefault();
        if ($('.nav').hasClass('active')) {
            $('.nav').removeClass('active');
            $('.header__burger').removeClass('active');
        } else if($(window).width() <= '850') {
            $('.nav').addClass('active');
            $('.header__burger').addClass('active');
            $('html, body').css('overflow', 'hidden');
        }
    });

    $('.search-button').on('click', function(ev) {
        ev.preventDefault();
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
        }
    });

    $('select').styler();
});