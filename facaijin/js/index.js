$(function(){
    /* 图片轮播 */
    $(function(){
    /* 图片轮播 */
    var targetId = 0;
    var $lis = $(".banner-slide").find("li").hide();
    var $lis_focus = $(".banner-focus").find("li");
    var length = $lis.length;
    var time = 5000;
    $lis.eq(targetId).show();
    //轮播主方法
    var fun = function() {
      $lis.eq(targetId).fadeOut("slow");

      if(targetId < length - 1) {
        targetId++;
      } else {
        targetId = 0;
      }
      $lis.eq(targetId).fadeIn("slow");
      $lis_focus.find("a").removeClass("curr");
      $lis_focus.eq(targetId).find("a").addClass("curr");
    }
    var scroll = setInterval(fun, time);

    $lis_focus.mouseenter(function(){
      clearInterval(scroll);
      targetId = $(this).index();
//        console.info("targetid:"+targetId);
      $lis.fadeOut("fast");
      $lis.eq(targetId).fadeIn("fast");
      $lis_focus.find("a").removeClass("curr");
      $lis_focus.eq(targetId).find("a").addClass("curr");
    }).mouseleave(function(){
      scroll = setInterval(fun, time);
    });

    /* 申请操盘 标签切换 */
    /*var $tabs = $("#apply-box .tab-wrap .tab");
      var $forms = $("#apply-box .apply-form");
      $forms.hide();
      $forms.eq(0).show();
      $tabs.click(function(){
        $tabs.removeClass("current");
        $(this).addClass("current");
        $forms.hide();
        $forms.eq($(this).index()).show();
      });*/
      $.fcj.switchTabs("#apply-box .tab-wrap .tab", "#apply-box .apply-form","current");

    //格式化金额
    function toThousands(num) {
      var num = (num || 0).toString(), result = '';
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) { result = num + result; }
      return result;
    }

    /* 天天发 */
    $("#day-inp").keyup(function(){
      var val = $(this).val();
      reg = /\./g;
      if( val =='' || val>=1 && val<=100 && !reg.test(val) ){
        $(this).val(val);
      }else if( val > 100 ){
        $(this).val(100);
      }else if( val < 1 ){
        $(this).val(1);
      }else{
        this.value = this.value.replace(/[^\d.]/g,"");
        this.value = this.value.replace("$#$").replace(/\./g,"").replace("$#$",".");
      }
    });

    /* 周周发 */
    $("#week-inp").keyup(function(){
      var val = $(this).val();
      reg = /\./g;
      if( val =='' || val>=1 && val<=100 && !reg.test(val) ){
        $(this).val(val);
      }else if( val > 100 ){
        $(this).val(100);
      }else if( val < 1 ){
        $(this).val(1);
      }else{
        this.value = this.value.replace(/[^\d.]/g,"");
        this.value = this.value.replace("$#$").replace(/\./g,"").replace("$#$",".");
      }
    });

    /* 月月发 初始样式 隐藏选择框 显示提示灰框 */
    $(".mouth-cho table").hide();
    $(".mouth-cho .gray-box").show();
    /* 月月发
    //当输入框值为零时，table隐藏
    $(".mouth-cho table").hide();
    var X={};
    X.keypress={
      numKeyPress:function(e){
        var k = e.keyCode || e.which;
        if(k>=48&&k<=57||k==8){
          return true;
        }
        return false;
      }
    }
    setTimeout(function () {
      $("#mouth-inp").focus(function(){
        var val = $(this).val();
        val = val.replace(/\,/g,"");
        if(isNaN(val)){
          $("#mouth-inp").val("");
        }else{
          $("#mouth-inp").val(val);
        }
      });
    }, 100);

    $("#mouth-inp").keypress(X.keypress.numKeyPress).keyup(function(){
      var val = $(this).val(); //风险保证金
      var tmp = val.replace(/\,/g,"");
      if (tmp != "") {
        $(".mouth-cho .gray-box").hide();
        $(".mouth-cho table").show();
      } else {
        $(".mouth-cho table").hide();
        $(".mouth-cho .gray-box").show();
      }
      if(tmp.length > 3) {
        this.value = toThousands(tmp);
      }
    });
    $("#mouth-inp").blur(function(){
        var money = $(this).val();
        money = money.replace(/\,/g,"");
        if(money < 3000){
            $(this).val(3000);
        }else if(money > 5000000){
            $(this).val(5000000);
        }
    })*/

    //资金选择的hover
    $(".apply .cho-item").hover(function(){
      $(this).addClass("cho-item-hover");
    }, function(){
      $(this).removeClass("cho-item-hover");
    });
    $(".apply .other-cho-btn").hover(function(){
      $(this).addClass("other-cho-hover");
    }, function(){
      $(this).removeClass("other-cho-hover");
    });

    //资金选择的click
    $(".apply .cho-item").click(function(){
      $(".apply .cho-item").find("input").attr("checked",false);
      $(this).find("input").attr("checked","checked");
      $(this).closest("table").find(".cho-item").removeClass("selected");
      $(this).addClass("selected");
      $(this).parents('form').find('input[name=apply-money]').val($(this).find("input").val())
//        console.info($(".apply .cho-item").find("input[type=radio]:checked").val());
    });

    $(".other-cho-btn").click(function(){
      $(".cho").animate({marginTop:"-385px"},"slow");
    });
    $(".other-cho-back").click(function(){
      $(".cho").animate({marginTop:"0px"},"slow");
    });

    /* 锚点动态跳转 */
    $(".anchor-btn").click(function(){
      $("html, body").animate({scrollTop: $("#apply-box").offset().top}, "slow");
    });
  });

  //按天
  $("#day-apply .cho-item").click(function() {
      var v = $(this).find('input[name="money"]').val() / 10000;
      var type = $("#day-apply input[name=lever]:checked").val();
      /* 点击选项后 50万以上 仓位限制*/
      if(v>50) {
        //trading-position 仓位 该class仅用来该变文字提示，不具任何样式效果
        $("#day-apply .trading-position").html("<b style='position:absolute;right:0;top:8px;font-size:14px;font-weight:normal;line-height:18px;'>投资沪深A股，<span class='cl-red f-14'>仓位有限制</span>，盈利全归您<br><span class='cl-red f-14'>单股不超总操盘资金的50%</span></b>");
      } else {
        $("#day-apply .trading-position").html("投资沪深A股，仓位不限制，盈利全归您");
      }
      charge(v, type, 1);
  });
  $("#day-apply .other-cho-inp").blur(function() {
      var v = $(this).val();
      var type = $("#day-apply input[name=lever]:checked").val();
      $('#apply-money').val(v);
      /* 点击选项后 50万以上 仓位限制*/
      if(v>50) {
        //trading-position 仓位 该class仅用来该变文字提示，不具任何样式效果
        $("#day-apply .trading-position").html("<b style='position:absolute;right:0;top:8px;font-size:14px;font-weight:normal;line-height:18px;'>投资沪深A股，<span class='cl-red f-14'>仓位有限制</span>，盈利全归您<br><span class='cl-red f-14'>单股不超总操盘资金的50%</span></b>");
      } else {
        $("#day-apply .trading-position").html("投资沪深A股，仓位不限制，盈利全归您");
      }
      charge(v, type, 1);
  });
  $("#day-apply input[name=lever]").change(function(){
      var margin = $("#day-apply .choosen-area table").css('margin-top');
      if(margin == '0px'){
          var v = $("#day-apply .cho-item.selected input[name=money]").val() / 10000;
      }else{
          var v = $("#day-apply input[name=other-money]").val();
      }
      var type = $(this).val();
      charge(v, type, 1);
  })

  //周周发
  $("#week-apply .cho-item").click(function() {
      var v = $(this).find('input[name="money"]').val() / 10000;
      var type = $("#week-apply input[name=lever]:checked").val();

      /* 点击选项后 50万以上 仓位限制*/
      if(v>=50) {
        //trading-position 仓位 该class仅用来该变文字提示，不具任何样式效果
        $("#week-apply .trading-position").html("<b style='position:absolute;right:0;top:8px;font-size:14px;font-weight:normal;line-height:18px;'>投资沪深A股，<span class='cl-red f-14'>仓位有限制</span>，盈利全归您<br><span class='cl-red f-14'>单股不超总操盘资金的50%</span></b>");
      } else {
        $("#week-apply .trading-position").html("投资沪深A股，仓位不限制，盈利全归您");
      }

      charge(v, type, 3);
  });
  $("#week-apply .other-cho-inp").blur(function() {
      var v = $(this).val();
      var type = $("#week-apply input[name=lever]:checked").val();
      $('#apply-money-week').val(v);
      /* 点击选项后 50万以上 仓位限制*/
      if(v>=50) {
        // console.info("v:"+v);
        //trading-position 仓位 该class仅用来该变文字提示，不具任何样式效果
        $("#week-apply .trading-position").html("<b style='position:absolute;right:0;top:8px;font-size:14px;font-weight:normal;line-height:18px;'>投资沪深A股，<span class='cl-red f-14'>仓位有限制</span>，盈利全归您<br><span class='cl-red f-14'>单股不超总操盘资金的50%</span></b>");
      } else {
        $("#week-apply .trading-position").html("投资沪深A股，仓位不限制，盈利全归您");
      }
      charge(v, type, 3);
  });
  $("#week-apply input[name=lever]").change(function(){
      var margin = $("#week-apply .choosen-area table").css('margin-top');
      if(margin == '0px'){
          var v = $("#week-apply .cho-item.selected input[name=money]").val() / 10000;
      }else{
          var v = $("#week-apply input[name=other-money]").val();
      }
      var type = $(this).val();
      charge(v, type, 3);
  })

  function charge(v, type, otype){
      /*if(otype == 3){
          ajax_url = "{:U('Applyfc/charge')}"
      }else{
             ajax_url = "{:U('Index/charge')}"
      }
      $.ajax({
          type: 'POST',
          url: ajax_url,
          data: {v:v, type:type},
          dataType: 'json',
          success: function(data){
              if($.trim(data) != ''){
                  if(otype == 1){
                      bzj_text = '';
                      for(var o in data['bzj']){
                          if($('.bzj-'+o).length > 0){
                              $('.bzj-'+o).html(data['bzj'][o]);
                          }
                      }
                  }else if(otype == 3){
                      $('.bzj').html(data['bzj']);
                      $('.cpje').html(data['zcpje']);
                  }

                  $('.jjje').html(data.jjje);
                  $('.zsje').html(data.zsje);
                  if(data.fwf <= 0){
                      $('.fwf').html('<span class="red">免服务费</span>');
                  }else{
                      $('.fwf').html(data.fwf + '元/每天');
                  }
              }
          }
      })*/
  }
  $(".other-cho-inp").keyup(function(){
      var s= $(this).val();
      reg = /\./g;
      if( s=='' || s>=1 && s<=100 && !reg.test(s) ){
          $(this).val(s);
      }else if( s>100 ){
          $(this).val(100);
      }else if( s<1 ){
          $(this).val(1);
      }else{
          this.value = this.value.replace(/[^\d.]/g,"");
      }
  })

  /* 鼠标上移 提示 */
  $(".hint-icon").hover(function(){
    $(this).siblings(".hint-content").show();
  },function(){
    $(this).siblings(".hint-content").hide();
  });

  /* 牛人排行榜 switch-tab切换 */
  $(".rankings .switch-tab").click(function(){
    $(".rankings .switch-tab").removeClass("curr");
    $(this).addClass("curr");
  });

  /* 牛人排行榜 排序箭头 */
  $(".sort").hover(function(){
      $(this).find(".sort-icon").addClass("sort-icon-hover");
  }, function(){
      $(this).find(".sort-icon").removeClass("sort-icon-hover");
  }).click(function(){
      $(".sort-icon").removeClass("red");
      $(this).find(".sort-icon").addClass("red");
  });

  /* 选中协议 按钮可点 未选中协议 按钮不可点 */
  $(".agree").data("selected", 1);
  $(".agree").click(function () {
    /*
    * 如果原来状态为 1
    * 则将其变为 0
    * 按钮变为不可点状态
    * 红色提示：同意后才能继续
    */
    var flag = $(this).data("selected"),
        $btnArea = $(this).parents(".btn-area"),
        $btn = $btnArea.find(".apply-btn"),
        $btnDisable = $btnArea.find(".apply-btn-disable"),
        $hint = $btnArea.find(".check-hint");

//    console.info("original-flag: " + flag);
    if (flag) {
      $(this).data("selected", 0);
      $btn.hide();
      $btnDisable.show();
      $hint.show();
    } else {
      $(this).data("selected", 1);
      $btn.show();
      $btnDisable.hide();
      $hint.hide();
    }
//    console.info("current-flag: " + flag)
  });

})