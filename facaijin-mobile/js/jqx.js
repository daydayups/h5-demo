/**
 * Created by Administrator on 2015/5/6 0006.
 */
$.extend($,{
  formatMoney : function(num, n) {
    num = String(num.toFixed(n?n:2));
    var re = /(-?\d+)(\d{3})/;
    while(re.test(num)) num = num.replace(re,"$1,$2")
    return n? num:num.replace(/^([0-9,]+\.[1-9])0$/,"$1").replace(/^([0-9,]+)\.00$/,"$1");
  },
  setfocus : function(){
    return this.each(function(){
      var dom = this;
      setTimeout(function() {
        try { dom.focus(); } catch (e) { }
      }, 0);
    });
  },
  switchTabs: function (tabs, boxs, current) {
    //标签切换
    /*
     * tabs: 标签的类如 ".switch-title .switch-tab"
     * boxs: 标签要切换的内容区域样式 如".trading-list-table"
     * current: 标签选中的样式名 "current"
     */
    var $tabs = $(tabs);
    var $boxs = $(boxs);
    var currStr = current;
    $boxs.hide();
    $boxs.eq(0).show();
    $tabs.click(function () {
      $tabs.removeClass(currStr);
      $(this).addClass(currStr);
      $boxs.hide();
      $boxs.eq($tabs.index(this)).show();
    });
  },
  popup: function (popWindow) {

    /*
     * button: string example: ".btn-simple" 按钮
     * popWindow: string example: ".pop-window" 弹窗
     * modal: string example: "#modal" 透明层
     * closeBtn: string example: ".btn-close" 关闭按钮
     */
    var $popWindow = $(popWindow)

    var _width = $(popWindow).outerWidth(),
        _height = $(popWindow).outerHeight(),
        _windowHeight = $(window).height();

    // 给弹出层添加默认定位位置
    var cssPosition = "absolute";
    var cssTop = (_windowHeight - _height) / 2 + "px";

    //样式初始化
    $popWindow.css({
      "position": cssPosition,
      "display": "none",
      "z-index": 1100,
      "margin-left": -(_width / 2) + "px",
      "left": 50 + "%",
      "top": cssTop
    });

    $popWindow.show().fadeTo(200, 1);
  },
  modalInit: function (modalId) {
    // 给弹出层添加默认定位位置
    $(modalId).css({
      "position": "fixed",
      "z-index": 100,
      "top": 0,
      "left": 0,
      "display": "none",
      "width": "100%",
      "height": "100%",
      "background-color": "#000",
      "opacity": 0.2,
      "filter": "alpha(opacity=0.2)"
    });
  },
  countdown: function (targetElement, num, intervalTime, endFunction) {//数字倒计时
    /*
     * targetElement: 倒计时的目标标签,原生DOM
     * num: 倒计时的数字
     * intervalTime: 时间间隔 毫秒单位
     * callback: 回调函数，结束后执行的函数
     */
    var t = num;
    var $el = $(targetElement);
//        console.info($el);
    $el.html(num);
    var remaintime = setInterval(function(){
      $el.html(--t);
      if(t == 0){
        clearInterval(remaintime);
        endFunction();
      }
    }, intervalTime);

  }
});
$(function () {
  /* 组件 */

});

