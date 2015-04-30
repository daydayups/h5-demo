$(function () {

    $('div.display').hide();

    var $container = $('#container').isotope({
        itemSelector: '.block',
        masonry: {
            columnWidth: 5
        },
        getSortData: {
            time: function (itemElem) {
                return $(itemElem).find('time').attr('data-time');
            }
        }
    });

    $container.on({
        'mouseenter': function () {
            $(this).find('.on-info').show().shuffleLetters();
        },
        'mouseleave': function () {
            $(this).find('.on-info').hide();
        },
        'click': function () {

            $container.find('.block').removeClass('active').find('.display').hide();

            //open the content area.
            $(this).addClass('active');
            $(this).find('.display').show();
            $('#click-area').addClass('available');

            $container.isotope('layout');
            return false;
        }
    }, '.block');

    $container.on('click', '.close', function () {
        //close the content area.
        var $parent = $(this).closest('.block');
        $parent.removeClass('active').find('.display').hide();

        $container.isotope('layout');
        //it's necessary. Without return, the function will not work.
        return false;
    });

    $('#click-area').on('click', function () {

        $container.find('.block').removeClass('active').find('.display').hide();

        $container.isotope('layout');
        return false;
    });

    /*
     next step we have to sort these article.
     {category:{
     programming:HTML5, JS, Java, C++, Ruby...,
     Draw: people, anime, object...,
     UID:web, mobile...
     }
     }
     */
    //Filter Event
    $('#filter').find('.filtering').on('click', function() {
        var selector = $(this).attr('href');
        $('a.filtering').removeClass('current');
        $(this).addClass('current');

        if (selector === '.all') {
            $container.isotope({
                filter: '*',
                sortBy: 'original-order',
                sortAscending: true
            });
        } else if (selector === '.programming') {
            $container.isotope({
                filter: selector,
                sortBy: 'original-order',
                sortAscending: true
            });
        } else if (selector === '.drawing') {
            $container.isotope({
                filter: selector,
                sortBy: 'time',
                sortAscending: false
            });
        } else if (selector === '.uid') {
            $container.isotope({
                filter: selector,
                sortBy: 'time',
                sortAscending: true
            });
        } else if (selector === '.about') {
            $container.isotope({
                filter: selector,
                sortBy: 'original-order',
                sortAscending: false
            });
        }


        return false;//to stop the default event.
    });

});