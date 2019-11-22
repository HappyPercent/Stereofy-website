/*jshint esversion: 6*/ 


$(document).ready(function() {

    var mySwiper = new Swiper ('.screen2__swiper-container', {
        loop: true,
        slidesPerView: 1,    
        spaceBetween: 15,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            350: {
                slidesPerView: 2,
            },
            500: {
                slidesPerView: 3,
            },
            950: {
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 5,
            }
        }
    });

    var mySwiper_1 = new Swiper ('.schedule-tabs__swiper-container', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 15,
        dynamicBullets: true,
        dynamicMainBullets: 4,
        navigation: {
            nextEl: '.schedule-tabs__swiper-button-next',
            prevEl: '.schedule-tabs__swiper-button-prev',
        },
        pagination: {
            el: '.screen2__swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    var videoSwiper = new Swiper('.video-story__swiper-container',{
        loop: true,
        slidesPerView: 1,
        spaceBetween: 5,
        navigation: {
            nextEl: '.video-story__swiper-button-next',
            prevEl: '.video-story__swiper-button-prev',
        },
        breakpoints: {
            450: {
                slidesPerView: 2,
            },
            600: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1000: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        },
        pagination: {
            el: '.schedule-tabs__pagination',
            type: 'bullets',
            clickable: true,
        }
    });

    $('.screen2_img').on('click', function(ev) {
        ev.preventDefault();
        const targetSrc = $(this).children('.play_button').attr('data-audio-src');
        playOrStopAudio(targetSrc);

        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.screen2_img').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.podcast__item').on('click', function(ev) {
        ev.preventDefault();
        const targetSrc = $(this).children('.play_button').attr('data-audio-src');
        playOrStopAudio(targetSrc);
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.podcast__item').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.schedule-tabs__item').on('click', function(ev) {
        if(!$(ev.target).is('a')) {
            const targetSrc = $(this).children('.play_button').attr('data-audio-src');
            playOrStopAudio(targetSrc);
            if($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $('.schedule-tabs__item').removeClass('active');
                $(this).addClass('active');
            }
        }
    });

    $('.schedule-tabs__nav').on('scroll', function(ev) {
        const nav = document.querySelector('.schedule-tabs__nav');
        const overlay = $('.schedule-tabs__overlay');
        const scrollLeft = nav.scrollLeft;
        const scrollRight = nav.scrollWidth - nav.clientWidth - scrollLeft;

        overlay.css('left', scrollLeft);

        if(scrollLeft <= 5){
            overlay.css('background', 'linear-gradient(to right, transparent, transparent 20%, transparent 80%, rgba(255, 255, 255, 0.3))');
        } else if(scrollRight <= 5) {
            overlay.css('background', 'linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent 20%, transparent 80%, transparent)');
        } else {
            overlay.css('background', 'linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent 20%, transparent 80%, rgba(255, 255, 255, 0.3)');
        }
    });

    $('.video-story__play-button').on('click', function(ev) {
        ev.preventDefault();
        const targetSrc = $(this).attr('data-audio-src');
        playOrStopAudio(targetSrc);
        if($('.home__audio').attr('data-now-playing')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    $('.schedule-tabs__ref').on('click', function(ev) {
        ev.preventDefault();
        let day = $(this).children().attr('href');
        $('.schedule-tabs__ref.active').removeClass('active');
        $(this).addClass('active');

        $('.schedule-tabs__pane.visible').removeClass('visible');
        $(day).addClass('visible');
    });

    $('.music-chart__item').on('click', function(ev) {
        ev.preventDefault();
        if (!$(ev.target).is('button')) {
            let paneNumber = $(this).attr('data-music-chart__item-number');
            $('.music-chart__pane.active').removeClass('active');
            $(`.music-chart__pane[data-music-chart__pane-number=${paneNumber}]`).addClass('active');
        }
    });

    $('.video-story__swiper-slide').on('click', function(ev) {
        ev.preventDefault();
        const src = $(this).attr('data-audio-src');
        if(src !== $('.video-story__play-button').attr('data-audio-src')) {
            const artist = $(this).attr('data-video-story-artist');
            const song = $(this).attr('data-video-story-song');
            const descr = $(this).attr('data-video-story-descr');
            $('.video-story__play-button').attr('data-audio-src', src);
            $('.video-story').css('background-image', `url(./img/${artist}_bg.png)`);
            $('.video-story__artist-name').text(artist.split('-').map(word => word[0].toUpperCase() + word.substring(1)).join(' '));
            $('.video-story__song-name').text(song);
            $('.video-story__song-descr').text(descr);
        }


    });

    function playOrStopAudio(targetSrc='') {
        const audioElement = $('.home__audio');
        const currentSrc = audioElement.attr('src');
        const nowPlaying = audioElement.attr('data-now-playing');
        if(nowPlaying) {
            if(targetSrc !== currentSrc){
                audioElement.attr('src', targetSrc);
                audioElement.get(0).play();
            } else {
                audioElement.get(0).pause();
                audioElement.attr('data-now-playing', '');
            }
        } else {
            audioElement.attr('src', targetSrc);
            audioElement.get(0).play();
            audioElement.attr('data-now-playing', 'true');
        }
    }
});