/**
 * Created by Xiaofan Zhang on 2015/11/4.
 */
$(function(){
  //nav hover
  $('.nav').find('.item').mouseenter(function(){
    var $dropDown = $(this).find('.drop-down');
    if ($dropDown.length > 0) {
      $dropDown.fadeIn(100);
    }
  }).mouseleave(function(){
    var $dropDown = $(this).find('.drop-down');
    if ($dropDown.length > 0) {
      $dropDown.fadeOut(100);
    }
  });
});