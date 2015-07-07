/**
 * hujiang index 2015
 */
(function (global, $, undefined) {
  'use strict';


  $.fn.hoverDelay = function (options) {
    var defaults = {
      hoverDuring: 200,
      outDuring: 200,
      hoverEvent: function () {
        $.noop();
      },
      outEvent: function () {
        $.noop();
      }
    };
    var sets = $.extend(defaults, options || {}),
        hoverTimer, outTimer;
    return $(this).each(function () {
      $(this).hover(function () {
        clearTimeout(outTimer);
        hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
      }, function () {
        clearTimeout(hoverTimer);
        outTimer = setTimeout(sets.outEvent, sets.outDuring);
      });
    });
  };


  var $doc = $(document),
      $win = $(window),

      $searchText = $('#textSearch'),
      $search = $('#searchDiv'),
      $topSlide = $('#topSlide'),
      $topBlock = $('#topBlock'),
      $backTop = $('.backTop'),
      $topbar = $('#topBar'),

      UA = navigator.userAgent.toLowerCase(),

      slider = null;

  var core = {
    init: function () {
      this._bindEvent();
      this._initSendEvent();
      this._handleCookie();

    },
    _handleCookie: function () {
      var abValue = Cookies.get('HJC_AB'),
          slideClose = Cookies.get('HJ_slide_A'),
          checkSlideClose = $('#sildeNewestUrl').val();
      if (!abValue) {
        Cookies.set("HJC_AB", "B", { expires: 7 });
      }


      //detemine if the cookie exist and equal true
      //and shit begins
      if (slideClose !== checkSlideClose) {
        $topBlock.show();
        slider = $topSlide.bxSlider({
          mode: 'fade',
          pager: false,
          controls: false,
          speed: 800,
          randomStart: true,
          pause: 6000
        });

        slider.startAuto();
        this._bindAfterSlider();
      } else {
        $topbar.addClass('fixTop top-shadow');
      }
    },
    _bindAfterSlider: function () {
      $win.on('scroll.afterSlider', function () {
        var h = $win.scrollTop();
        if (h >= 600) {
          $topbar.addClass('fixTop top-shadow');
          $backTop.show();
          slider.stopAuto();
        } else {
          $topbar.removeClass('fixTop top-shadow');
          $backTop.hide();
          slider.startAuto();
        }
      });

      $doc.on('click', '#closeSlide', function () {
        Cookies.set('HJ_slide_A', $('#sildeNewestUrl').val(), { expires: 90 });
        $topBlock.hide();
        $win.off('scroll.afterSlider');
        $topbar.addClass('fixTop top-shadow');

      });
    },
    _bindEvent: function () {

      $doc.on('click', '#btnSearch', function () {
        core.searchWord();
      });

      $doc.on('keydown', '#textSearch', function (event) {
        if (event.keyCode == 13) {
          core.searchWord();
        }
      });

      $doc.on('click', '.main .b-block', function (event) {
        var $this = $(this),
            url = $this.attr('data-url');

        window.open(url);
        event.stopPropagation();
      });

      $("#login_out").live('click', function () {
        var passname = "pass";
        var hostname = location.hostname;
        var prefix = '';
        var match = hostname.match(/^(dev|yz|local|beta|(\w+2))\./);
        if (match != null) {
          prefix = match[0];
        }

        if (prefix == "beta." || prefix.indexOf('2') > -1) {
          passname = "pass2";
        }

        window.location.href = "http://" + passname + ".hujiang.com/uc/handler/logout.ashx?returnurl=" + window.location.href;
      });

      $("#2013version").live('click', function () {
        Cookies.set("HJC_AB", "A", {expires: 7});
        location.reload();

      });

      $doc.on('click', function (event) {
        var $this = $(event.target),
            $parent = $this.closest('.search'),
            isSearch = $parent.length > 0 || $this.hasClass('search');
        if (isSearch) {
          $search.addClass('search-on');
          $searchText.focus();
        } else {
          $search.removeClass('search-on');
        }
      });

      var $secNav = $('.sec-nav'),
          $zxli = $('#nav_zx'),
          $secBg = $('.wrapmask');

      //determine PC event and ipad event, sorry for so naive before
      //
      if (/ipad/.test(UA)) {
        $('#nav_zx, .wrapmask').on('click', function () {
          $zxli.toggleClass('arrow_on');
          $secNav.toggle();
          $secBg.toggle();
        });
        $('.user').on('click', function () {
          $(this).toggleClass('user_on');
        });

      } else {
        $('#nav_zx, .sec-nav').hoverDelay({
          hoverEvent: function () {
            $zxli.addClass('arrow_on');
            $secNav.stop().show();
            $secBg.stop().show();
          },
          outEvent: function () {
            $zxli.removeClass('arrow_on');
            $secNav.stop().hide();
            $secBg.stop().hide();
          }
        });
        $('.user').on('mouseenter mouseleave', function (event) {
          if (event.type === 'mouseenter') {
            $(this).addClass('user_on');
          } else {
            $(this).removeClass('user_on');
          }
        });
      }

      // $doc.on('mouseenter mouseleave', '.sec-nav', function(event){

      //     if(event.type === 'mouseenter'){
      //         $zxli.addClass('arrow_on');
      //         $secNav.stop().show();
      //         $secBg.stop().show();
      //     }else{
      //         $zxli.removeClass('arrow_on');
      //         $secNav.stop().hide();
      //         $secBg.stop().hide();
      //     }
      // });
    },
    encodeURI: function (e) {
      return escape(e).replace(/\*/g, "%2A").replace(/\+/g, "%2B").replace(/-/g, "%2D").replace(/\./g, "%2E").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/_/g, "%5F").replace(/%/g, "_");
    },
    htmlEncode: function (str) {
      var div = document.createElement("div"),
          text = document.createTextNode(str);
      div.appendChild(text);
      return div.innerHTML;
    },
    searchWord: function () {
      var text = core.htmlEncode($.trim($searchText.val()));
      if (text === '') {
        return false;
      }
      var url = 'http://www.hjenglish.com/new/search/' + text + '/';
      SendEvent(38, 877, "{'keyword':'" + text + "'}");
      window.open(url, "_blank");
    },

    _initSendEvent: function () {
      $('.htLinks a').on('click', function () {
        var $this = $(this),
            $parent = $this.parent(),
            planID = parseInt($parent.attr('data-planID')),
            eventID = parseInt($parent.attr('data-eventID')),
            text = $this.text(),
            href = $this.attr('href');
        SendEvent(planID, eventID, "{'label':'" + text + "','url':'" + href + "'}");
      });
    }
  };

  core.init();

})(this, jQuery);