$(function(){
  //用户中心 充值
  $.fcj.switchTabs(".switch-title .switch-block", ".charge-box", "curr");

  /* 隐藏/显示 bank-list */
  var flag = false;
  $(".bank-trigger").click(function(){
    $(this).find(".trigger-arrow").toggleClass("down");
    $(".bank-list").parents("tr").toggle();
    if (flag) {
      $(".bank-trigger").find(".trigger-text").html("收 起");
      flag = false;
    } else {
      $(".bank-trigger").find(".trigger-text").html("更换银行卡");
      flag = true;
    }
  });

  /* 隐藏/显示 limits-table */
  $(".limits-trigger").click(function(){
    $(".limits-table").parents("tr").toggle();
  });

  /* 银行选择 */
  $(".bank-list .bank-img").click(function(){
    var bankClass = $(this).attr("class");
    var bankName = $(this).data("bank");
//        var bankName = $(this).attr("class").split(" ")[1];
//        console.info("bankName[1]: " + bankName[1]);
    $(".bank-inp").html("<div class='" + bankClass + "' data-bank='"+ bankName +"'></div>")
  });

  /* 金额验证 */
  $(".charge-money").keyup(function(){
    var value = $(this).val();
    $(this).val(value.replace(/[^\d.]/g,""));
  });

  /* 柜台/ATM汇款 发送短信 */
  $(".msg-send-btn").click(function(){
    $(this).hide();
    $(this).siblings(".msg-sended").show();
  });

  /* 该json应该从服务器中获取 */
  var banks = {
    "CCB" : {
      "account-number" : "3300 1619 8810 5955 8888",
      "origin-bank" : "建设银行杭州钱塘支行",
      "account-name": "杭州袋狮信息技术有限公司"
    },
    "ABC":{
      "account-number" : "1902 6101 0400 0004 0",
      "origin-bank" : "农业银行杭州市民街支行",
      "account-name": "杭州袋狮信息技术有限公司"
    },
    "ICBC":{
      "account-number" : "1202 2035 1990 0004 142",
      "origin-bank" : "工商银行杭州新城支行",
      "account-name": "杭州袋狮信息技术有限公司"
    }
  };

  /* 柜台/ATM 流程 */
  $("#step01 .to-next").click(function () {
    var money = $("#step01 .charge-money").val();
    var $bankEl = $("#step01 .bank-inp .bank-img");
    var bankClass = $bankEl.attr("class");
    var bankName = $bankEl.data("bank");

    if(!bankClass) {
      alert("请选择汇款帐号！");
      //TODO: pop a warning window
      return;
    }
    if(!money) {
      alert("请输入充值金额！");
      //TODO: pop a warning window
      return;
    }

    $("#step02 .charge-money").html(money);
    //TODO: get json 'banks' by ajax from the server
    $("#step02 .bank-img-wrap").html("<div class='" + bankClass + "' data-bank='"+ bankName +"'></div>");
    var $bankInfoTable = $("#step02 .bank-info-table");
    $bankInfoTable.find(".account-number").html(banks[bankName]["account-number"]);
    $bankInfoTable.find(".origin-bank").html(banks[bankName]["origin-bank"]);
    $bankInfoTable.find(".account-name").html(banks[bankName]["account-name"]);
    $(".charge-steps li").removeClass("curr").eq(2).addClass("curr");
    $("#step01").hide();
    $("#step02").show();
  });

  //订单支付
  $.fcj.switchTabs(".switch-title .switch-blocky", ".pay-box", "curr");

});