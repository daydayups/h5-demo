/**
 * Created by Xiaofan Zhang on 2015/11/4.
 */
jQuery.browser = {};
jQuery.browser.msie = false;
jQuery.browser.version = 0;
if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
  jQuery.browser.msie = true;
  jQuery.browser.version = RegExp.$1;
}

$.extend($,{
  _:function(s){if($.no(s))s=$.t();document.title=s;},
  //获取对象(不带缓存)
  $:function(o){return $.isS(o)?$('#'+o):$(o);},
  //获取对象(带缓存)
  o:function(o){if(!$.isS(o))return $(o);var obj=$.os[o];if(obj)return obj;obj=$('#'+o);if(obj.length>0)$.os[o]=obj;return obj;},os:{},
  //获取对象值
  v:function(o,v){if(v)$.$(o).val(v);else{return $.trim($.$(o).val());}},
  //返回当前时间
  t:function(){return $.d().getTime();},
  //返回当前时间对象
  d:function(t){if(t)return new Date(t);return new Date()},
  //转换成整数
  n:function(s){return parseInt(s);},
  //转换成浮点数
  f:function(s){return parseFloat(s);},
  //判断对象是否存在
  no:function(){var as=arguments;for(var i=0;i<as.length;i++)if(as[i]==null || as[i]==undefined)return true;return false;},
  //判断对象类型
  isS:function(o){return typeof o=="string"},
  isN:function(o){return typeof o=="number"},
  isB:function(o){return typeof o=="boolean"},
  isO:function(o){return typeof o=="object"},
  isInt:function(o){return $.isN(o)&&Math.round(o)==o},
  //是否包含指定内容
  cc:function(cs,c,n){var e=!$.no(n);for(var i=0;i<cs.length;i++)if((e && cs[i][n]==c) || (!e && cs[i]==c))return i;return -1;},
  //返回RegExp
  re:function(s,c){var r=new RegExp(s);if(c)return r.test(c);return r;},
  //是否IE浏览器
  ie:function(v){if(!$.browser.msie)return false;if(v)return $.browser.version==v || $.browser.version.indexOf(v+'.')==0;return true;},
  //创建DOC对象
  ceok:false,
  ce:function(n){return $(document.createElement(n));},
  winPos:function(timestamp){return window.location.href+(timestamp?+"?t="+new Date().valueOf():"")},
  //从字符串中获取第一个数值
  nv:function(s,sv){var si=-1,ei=-1,i=0;if(sv){i=s.indexOf(sv);if(i<0)i=0;}for(;i<s.length;i++)if(si==-1){if(s.charAt(i)>='0' && s.charAt(i)<='9')si=i;}else{if(s.charAt(i)<'0' || s.charAt(i)>'9'){ei=i;break;}}return $.n(si==-1 && ei==-1 ? -1 : (ei==-1 ? s.substr(si) : s.substring(si,ei)));},
  //数值四舍五入
  round:function(n,mantissa){if(!mantissa)mantissa=0;if(mantissa<=0)return Math.round(n);var v=1;for(var i=0;i<mantissa;i++)v*=10;return Math.round(n*v)/v;},
  //金额格式化
  formatMoney : function(num,n) {
    num = String(num.toFixed(n?n:2));
    var re = /(-?\d+)(\d{3})/;
    while(re.test(num)) num = num.replace(re,"$1,$2")
    return n?num:num.replace(/^([0-9,]+\.[1-9])0$/,"$1").replace(/^([0-9,]+)\.00$/,"$1");;
  },
  //字符串替换
  replace:function(s,s1,s2){return s.replace(new RegExp(s1,'g'),s2);},
  //字符串长度(中文算2个)
  strlen:function(s){return s.replace(/[^\x00-\xff]/g,"**").length},
  //字符串是否包含中文
  strch:function(s){return /[^\x00-\xff]+/.test(s)},
  //清除字符串中的'"字符和头尾空格
  clear:function(){var as=arguments,s;if(as.length<1)return '';s=as[0];if(as.length<2)as=[s,"'",'"'];for(var i=1;i<as.length;i++)s=$.replace(s,as[i],'');return $.trim(s);},
  //cookie操作
  getCookie:function(name,dv){var d=document.cookie;var il1=d.indexOf(name+'=');if(il1==-1)return $.no(dv) ? null : dv;il1+=name.length+1;var il2=d.indexOf(';',il1);if(il2==-1)il2=d.length;return decodeURI(d.substring(il1,il2));},
  setCookie:function(name,value,expires,path,domain,secure){var s=new Text()._(name)._('=')._(encodeURI(value));if(!expires || (expires && expires!='temp')){var day=60*60*24*1000;if(expires=='day')expires=$.d($.t()+day);else if(expires=='week')expires=$.d($.t()+day*7);else if(expires=='month')expires=$.d($.t()+day*30);else if(expires=='year')expires=$.d($.t()+day*365);else{expires=$.d($.t()+day*365*100);}s._(';expires=')._(expires.toGMTString());}if(path)s._(';path=')._(path);if(domain)s._(';domain=')._(domain);if(secure)s._(';secure=')._(secure);document.cookie=s;},
  delCookie:function(name,path,domain){var s=new Text()._(name)._('=null;expires=')._($.d($.t()-100000000).toGMTString());if(path)s._(';path=')._(path);if(domain!=null)s._(';domain=')._(domain);document.cookie=s;},
  clrCookie:function(path,domain){var ds=document.cookie.split(';');for(var i=0;i<ds.length;i++)$.delCookie($.trim(ds[i].split('=')[0]),path,domain);},
  //获取Flash对象
  getFlash:function(name){if($.ie())return window[name];else if($.browser.mozilla)return document[name+'-1'];else{var fl=window[name+'-1'];if(!fl)fl=window[name];if(!fl)fl=document[name+'-1'];return fl;}},
  //初始化对象
  init:function(o,dv){if(!o)return dv;for(i in dv)if($.no(o[i]))o[i]=dv[i];return o;},
  stringify  : function stringify(obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
      // simple data type
      if (t == "string") obj = '"' + obj + '"';
      return String(obj);
    } else {
      // recurse array or object
      var n, v, json = [], arr = (obj && obj.constructor == Array);

      for (n in obj) {
        v = obj[n];
        t = typeof(v);
        if (obj.hasOwnProperty(n)) {
          if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
          json.push((arr ? "" : '"' + n + '":') + String(v));
        }
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  },
  isEmptyValue : function(value) {
    //是否为空
    var type;
    if(value == null) { // 等同于 value === undefined || value === null
      return true;
    }
    type = Object.prototype.toString.call(value).slice(8, -1);
    switch(type) {
      case 'String':
        return !$.trim(value);
      case 'Array':
        return !value.length;
      case 'Object':
        return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
      default:
        return false; // 其他对象均视作非空
    }
  },
  uppercaseNum : function (num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0)
      num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i=0; i < num.length; i++)
      strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
//      return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
    return strOutput.replace(/零角零分$/, '').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
  }
});

$.extend($,{
  /**
   * tabs: 标签的类如 ".switch-title .switch-tab"
   * boxs: 标签要切换的内容区域样式 如".trading-list-table"
   * current: 标签选中的样式名 "current"
   */
  switchTabs: function (tabs, boxs, current) {
    //标签切换
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
    var isIE6 = $.browser.msie && ($.browser.version == "6") && !$.support.style;
    var cssPosition = isIE6 ? "absolute" : "fixed";
    var cssTop = isIE6 ? "150px" : (_windowHeight - _height) / 3 + "px";

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
  modalInit: function (target) {
    // 给弹出层添加默认定位位置
    var isIE6 = $.browser.msie && ($.browser.version == "6") && !$.support.style
      , $o = $(target);

    if(isIE6) {
      return false;
    } else {
      $o.css({
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
    }
    return $o;
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
  },
  callout: function (target, text, callback) {
    var $target = $(target);

    var _width = $target.outerWidth(),
      _height = $target.outerHeight(),
      _windowHeight = $(window).height();

    // 给弹出层添加默认定位位置
    var isIE6 = $.browser.msie && ($.browser.version == "6") && !$.support.style;
    var cssPosition = isIE6 ? "absolute" : "fixed";
    var cssTop = isIE6 ? "150px" : (_windowHeight - _height) / 3 + "px";

    //样式初始化
    $target.css({
      "position": cssPosition,
      "display": "none",
      "z-index": 1100,
      "margin-left": -(_width / 2) + "px",
      "left": 50 + "%",
      "top": cssTop
    });

    $target.find('.msg').text(text);
    $target.fadeIn('slow', function(){
      setTimeout(function(){
        $('.callout').fadeOut();
        callback();
      }, 1000);
    });
  }
});

$(function(){
  //top hover
  $('.top').find('.ic').hover(function(){
    $(this).addClass('hover').siblings('.sub-item').show();
  }, function(){
    $(this).removeClass('hover').siblings('.sub-item').hide();
  });

  //bar-fixed
  var $bar = $('.bar-fixed')
    , $windowHeight = $(window).height()
    , $elementHeight = $bar.height();
  //reset the bar position
  $bar.css({
    bottom: ($windowHeight - $elementHeight) / 2 + 'px'
  });

  $bar.find('.item').hover(function(){
    $(this).find('.ic').hide();
    $(this).find('.txt').show();
    $(this).find('.desc').show();
  }, function(){
    $(this).find('.txt').hide();
    $(this).find('.ic').show();
    $(this).find('.desc').hide();
  });

  $bar.find('.advisor-trigger').click(function(){
    $('.advisor-box').toggle();
  });
});