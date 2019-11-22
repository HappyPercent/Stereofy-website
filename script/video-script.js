/*jshint esversion: 6*/ 
$(document).ready(function() {

    $('.videos__tabs-nav-item').on('click', function(ev) {
        ev.preventDefault();
        if($(ev.target).is('.videos__tabs-nav-item--prev') && !$('.videos__tabs-nav-item--prev').hasClass('videos__tabs-nav-item--hidden')){
            let targetListNumber = $('.videos__container--visible').attr('data-list-number') - 1;
            $('.videos__container--visible').removeClass('videos__container--visible');
            $(`.videos__container[data-list-number=${targetListNumber}]`).addClass(`videos__container--visible`);
        } else if($(ev.target).is('.videos__tabs-nav-item--next') && !$('.videos__tabs-nav-item--next').hasClass('videos__tabs-nav-item--hidden')) {
            let targetListNumber = +$('.videos__container--visible').attr('data-list-number') + 1;
            $('.videos__container--visible').removeClass('videos__container--visible');
            $(`.videos__container[data-list-number=${targetListNumber}]`).addClass(`videos__container--visible`);
        } else {
            let listNumber = $(this).attr('data-tab-number');
            console.log('listNumber: ', listNumber);
            $(`.videos__container--visible`).removeClass('videos__container--visible');
            $(`.videos__container[data-list-number=${listNumber}]`).addClass('videos__container--visible');
        }
        checkTabStatus();

    });

    function checkTabStatus(){
        let currentListNumber = $('.videos__container--visible').attr('data-list-number');
        if(currentListNumber == 1) {
            $('.videos__tabs-nav-item--prev').addClass('videos__tabs-nav-item--hidden');
            $('.videos__tabs-nav-item--next').removeClass('videos__tabs-nav-item--hidden');
        } else if (currentListNumber == $('.videos__tabs-nav').children().length - 2) {
            $('.videos__tabs-nav-item--prev').removeClass('videos__tabs-nav-item--hidden');
            $('.videos__tabs-nav-item--next').addClass('videos__tabs-nav-item--hidden');
        } else {
            $('.videos__tabs-nav-item--prev').removeClass('videos__tabs-nav-item--hidden');
            $('.videos__tabs-nav-item--next').removeClass('videos__tabs-nav-item--hidden');
        }
        $(`.videos__tabs-nav-item--active`).removeClass(`videos__tabs-nav-item--active`);
        $(`.videos__tabs-nav-item[data-tab-number=${currentListNumber}]`).addClass('videos__tabs-nav-item--active');
    }
});