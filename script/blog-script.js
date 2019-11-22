/*jshint esversion: 6*/ 
$(document).ready(function() {

    $(window).on('scroll', function() {
        if($(window).width() <= 1050) {
            const currentOffset = window.pageYOffset;
            const blogFirstScreenHeight = $('.blog-screen').outerHeight();
            const blogSecondScreenHeight = $('.blog').outerHeight();
            if((currentOffset >= blogFirstScreenHeight + blogSecondScreenHeight) || (currentOffset <= blogFirstScreenHeight)) {
                $('.blog__aside aside')
                    .css('position', '')
                    .css('top', '')
                    .css('margin', '')
                    .css('width', '');
            } else {
                $('.blog__aside aside')
                    .css('position', 'fixed')
                    .css('top', '60px')
                    .css('margin', '0 auto')
                    .css('width', 'calc(100% - 20px)');
            }
        }
    });

    $('.blog__item').on('click', function(ev) {
        ev.preventDefault();
        const blogID = $(this).attr('data-blogID');
        console.log(blogID);
        $('.blog').addClass('single-blog');
        $('.blog__tabs').addClass('useless');
        $('.blog__tabs').load(`./blog-single.html #blog${blogID}`, '', function() {
            $('.blog .container').prepend($(`#blog${blogID}`));
            $('.useless').remove();
        });
    });

    $('.blog__tabs-nav-item').on('click', function(ev) {
        ev.preventDefault();
        if($(ev.target).is('.blog__tabs-nav-item--prev') && !$('.blog__tabs-nav-item--prev').hasClass('blog__tabs-nav-item--hidden')){
            let targetListNumber = $('.blog__pane--visible').attr('data-list-number') - 1;
            $('.blog__pane--visible').removeClass('blog__pane--visible');
            $(`.blog__pane[data-list-number=${targetListNumber}]`).addClass(`blog__pane--visible`);
        } else if($(ev.target).is('.blog__tabs-nav-item--next') && !$('.blog__tabs-nav-item--next').hasClass('blog__tabs-nav-item--hidden')) {
            let targetListNumber = +$('.blog__pane--visible').attr('data-list-number') + 1;
            $('.blog__pane--visible').removeClass('blog__pane--visible');
            $(`.blog__pane[data-list-number=${targetListNumber}]`).addClass(`blog__pane--visible`);
        } else {
            let listNumber = $(this).attr('data-tab-number');
            console.log('listNumber: ', listNumber);
            $(`.blog__pane--visible`).removeClass('blog__pane--visible');
            $(`.blog__pane[data-list-number=${listNumber}]`).addClass('blog__pane--visible');
        }
        checkTabStatus();

    });


    $('.blog__categories-title').on('click', function(ev) {
        ev.preventDefault();
        if($(window).width() <= 1050) {
            $('.blog__categories-list, .blog__news-list, .blog__tags-list').removeClass('visible');
            if(!$(this).hasClass('active')) {
                $('.blog__categories-title').removeClass('active');
                $(this).addClass('active');
                $(this).next().addClass('visible');
            } else {
                $(this).removeClass('active');
            }
        }
    });

    function checkTabStatus(){
        let currentListNumber = $('.blog__pane--visible').attr('data-list-number');
        if(currentListNumber == 1) {
            $('.blog__tabs-nav-item--prev').addClass('blog__tabs-nav-item--hidden');
            $('.blog__tabs-nav-item--next').removeClass('blog__tabs-nav-item--hidden');
        } else if (currentListNumber == $('.blog__tabs-nav').children().length - 2) {
            $('.blog__tabs-nav-item--prev').removeClass('blog__tabs-nav-item--hidden');
            $('.blog__tabs-nav-item--next').addClass('blog__tabs-nav-item--hidden');
        } else {
            $('.blog__tabs-nav-item--prev').removeClass('blog__tabs-nav-item--hidden');
            $('.blog__tabs-nav-item--next').removeClass('blog__tabs-nav-item--hidden');
        }
        $(`.blog__tabs-nav-item--active`).removeClass(`blog__tabs-nav-item--active`);
        $(`.blog__tabs-nav-item[data-tab-number=${currentListNumber}]`).addClass('blog__tabs-nav-item--active');
    }

});