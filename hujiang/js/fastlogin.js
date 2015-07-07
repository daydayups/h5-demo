///*
// * fastlogin.js
// * 网校快速登录JS
// * 需要引用 http://pass.hujiang.com/ulogin/Scripts/unionlogin.js
// * 需要引用 http://pass.hujiang.com/ulogin/biz/hj_quicklogin.min.js
// */


window.hjquicklogin = {
  init: function () {
    var me = this;
    me.control = me.control || hui.Control.create('HJ_QuickLogin', {
      formName: 'hj_quicklogin',
      top: 0.33,
      className: 'hj001_login_box'
    });
    // config
    me.control.getPassName = function () {
      var subName = 'http://pass';
      var host = window.location.host;
      if (host.indexOf('beta') > -1
          || host.indexOf('www2') > -1
          || host.indexOf('jp2') > -1
          || host.indexOf('kr2') > -1
          || host.indexOf('fr2') > -1
          || host.indexOf('es2') > -1
          || host.indexOf('de2') > -1
          || host.indexOf('th2') > -1
          || host.indexOf('ru2') > -1
          || host.indexOf('xyz2') > -1
          ) {
        subName = 'http://pass2';
      }
      return subName;
    };
    me.control.source = qlSource;

    me.control.onLoginSuccess = function (result) {
      setTimeout(function () {
        window.location.reload();
      }, 800);
    };
    me.control.onRegisteSuccessMobile = function (result) {
      setTimeout(function () {
        window.location.reload();
      }, 800);
    };

    me.control.monitorList['hj_reg'] = function () {/* 注册沪江页展示            */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 4)
      }
    };
    me.control.monitorList['hj_reg_login'] = function () {/* 登录沪江页展示            */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 2)
      }
    };
    me.control.monitorList['hj_reg_mobile_success'] = function () {/* 手机注册成功页            */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 10)
      }
    };
    me.control.monitorList['hj_reg_email_success'] = function () {/* 邮箱注册成功页            */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 11)
      }
    };


    me.control.monitorList['hj_reg_login_submit'] = function () {/* 登录按钮事件              */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 5)
      }
    };
    me.control.monitorList['hj_reg_mobile_submit'] = function () {/* 手机号注册按钮事件        */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 6)
      }
    };
    me.control.monitorList['hj_reg_email_submit'] = function () {/* 邮箱注册按钮事件          */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 7)
      }
    };
    me.control.monitorList['hj_reg_email_success_active'] = function () {/* 邮箱激活按钮事件          */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 8)
      }
    };
    me.control.monitorList['hj_reg_email_continue'] = function () {/* 继续浏览按钮事件          */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 9)
      }
    };
    me.control.monitorList['hj_reg_close'] = function () {/* 关闭按钮事件              */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 12)
      }
    };
    me.control.monitorList['hj_reg_mobile_sendsms'] = function () {/* 获取手机验证码按钮事件    */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 13)
      }
    };

    me.control.monitorList['hj_reg_mobile_email'] = function () {/* 在手机注册页的邮箱注册点击*/
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 16)
      }
    };
    me.control.monitorList['hj_reg_email_mobile'] = function () {/* 在邮箱注册页的手机注册点击*/
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 15)
      }
    };
    me.control.monitorList['hj_reg_login_qq'] = function () {/* QQ_连接登录               */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 17)
      }
    };
    me.control.monitorList['hj_reg_login_weibo'] = function () {/* 新浪微博_连接登录         */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 18)
      }
    };
    me.control.monitorList['hj_reg_login_renren'] = function () {/* 人人_连接登录             */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 19)
      }
    };
    me.control.monitorList['hj_reg_login_baidu'] = function () {/* 百度_连接登录             */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 20)
      }
    };
    me.control.monitorList['hj_reg_login_douban'] = function () {/* 豆瓣_连接登录             */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 21)
      }
    };
    me.control.monitorList['hj_reg_login_zhifu'] = function () {/* 支付宝_连接登录           */
      if (typeof SendEvent !== 'undefined') {
        SendEvent(2, 22)
      }
    };
  },
  doLogin: function () {
    var me = this;
    !me.control && me.init();

    me.control.showDialog('hj_reg_login');
  },
  doRegiste: function () {
    var me = this;
    !me.control && me.init();

    me.control.showDialog('hj_reg_mobile');
  },
  setSource: function (source) {
    qlSource = source;
  }
};

var qlSource = "en_top_passport";


$(function () {

  $(".fastLogin").live('click', function () {
    $(this).attr("target", "");
    var source = $(this).attr("data-source");
    if (!!source) {
      qlSource = source;
    }
    window.hjquicklogin.doLogin();
  });
  $(".fastRegister").live('click', function () {
    $(this).attr("target", "");
    var source = $(this).attr("data-source");
    if (!!source) {
      qlSource = source;
    }
    window.hjquicklogin.doRegiste();

  });

});