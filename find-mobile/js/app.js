/**
 * Created by Administrator on 2015/10/19.
 */
$.extend($ , {
  modalInit: function (target) {
    // initialize modal
    $(target).css({
      "position": "fixed",
      "z-index": 300,
      "top": 0,
      "left": 0,
      "display": "none",
      "width": "100%",
      "height": "100%",
      "background-color": "#000"
    });
  },
  modalPop: function (target) {
    $(target).show().fadeTo(200, 0.3);
  }
});