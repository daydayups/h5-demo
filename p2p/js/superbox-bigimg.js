;(function($) {
  $.fn.SuperBox = function(options) {   
    var superbox      = $('<div class="superbox-show"></div>');
    var superboximg   = $('<img src="" class="superbox-current-img">');
    var superboxclose = $('<div class="superbox-close"></div>');
    console.log("\u767e\u5ea6\u641c\u7d22\u3010\u7d20\u6750\u5bb6\u56ed\u3011\u4e0b\u8f7d\u66f4\u591aJS\u7279\u6548\u4ee3\u7801");
    superbox.append(superboximg).append(superboxclose);   
    return this.each(function() {     
      $('.superbox-list').click(function() {
        var currentimg = $(this).find('.superbox-img');
        var imgData = currentimg.data('img');
        superboximg.attr('src', imgData);
        
        if($('.superbox-current-img').css('opacity') == 0) {
          $('.superbox-current-img').animate({opacity: 1});
        }
        
        if ($(this).next().hasClass('superbox-show')) {
          superbox.toggle();
        } else {
          superbox.insertAfter(this).css('display', 'block');
        }
        $('html, body').animate({
          scrollTop:superbox.position().top - currentimg.width()
        }, 'medium');     
      }); 
     superboxclose.click(function(){
      superbox.hide();
     })
      // $('.superbox-close').hover(function() {
      //   alert();
      //   $('.superbox-current-img').animate({opacity: 0}, 200, function() {
      //     $('.superbox-show').slideUp();
      //   });
      // });     
    });
  };
})(jQuery);
$(function() {
    $('.superbox').SuperBox();
});
