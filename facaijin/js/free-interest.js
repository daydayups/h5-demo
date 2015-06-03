$(function(){

  $("#month-inp").setfocus();

  /* 鼠标上移 提示 */
  $(".hint-icon").hover(function(){
    $(this).siblings(".hint-content").show();
  },function(){
    $(this).siblings(".hint-content").hide();
  });

  var p,t2,t1,t,jj,pc,interest,discount,i1,i2,i3,i4,a,b,money,lever,cycle,tt,m;
  //interest  月利率   lever 杠杆  cycle 月数  
  var formatMoney = function(num,n) {
    num = String(num.toFixed(n?n:2));
    var re = /(-?\d+)(\d{3})/;
    while(re.test(num)) num = num.replace(re,"$1,$2")
    return n? num:num.replace(/^([0-9,]+\.[1-9])0$/,"$1").replace(/^([0-9,]+)\.00$/,"$1");
  };

  //转换为X万X千
  var formatMoney2 = function(num) {
    if (num > 1) {
      if (num % 1 > 0) {
        return num.toString().replace(/(\d)[.](\d)/,'$1万$2千'+"元");
      } else {
        return num.toString().replace(/(\d)[.](\d)/,'$1万'+"元");
      }
    } else if (num != 0) {
      return num.toString().replace(/(\d)[.](\d)/,'$2千'+"元")
    } else {
      return "0";
    }
  }

  var fwf = function(t1){
    a = $(".month-cho .selected .special span.bond").text();

    // debug：值是否为 not a number
    // console.info("a:"+a+"  "+isNaN(a));
    // result: a is a number

    interest = (t1 == 0 ? 0 : a);
    $("#month-apply .new_fwf").html(interest);
    $("#interest").val(interest);
    $("#fwf").html((money*a/100).toFixed(0));
    // console.info("a:"+a);
  }

  var myfunc = function(t1,cycle,lever){
    var money = tt;
    if(money&&cycle&&lever){
    	$("#bond1_rate").html(0);
    }
    if(money==0||!money){
      if(lever<5){
        $("#bond"+lever+"_rate").html(0);
      }else{
        $("#bond"+lever+"_rate").html(0);
      }
    }
  }

  // 当输入金额所生成的选项 超过500万时 超过500万的部分不可选。
  var hidden = function(){
    if(t1*2>5000000) {
      // 将第二选项变为不可选
      // console.info("2: selected removed");
      $("#l2").removeClass("cho-item").addClass("disable");
      //第一选项 选中状态
      $("#l1").addClass("selected");
      $("#l1").find("input").attr("checked","checked");
    } else {
      $("#l2").removeClass("disable").addClass("cho-item");
    }

    if (t1*3>5000000) {
      // console.info("3: selected removed");
      $("#l3").removeClass("cho-item").addClass("disable");
      //第一选项 选中状态
      $("#l1").addClass("selected");
      $("#l1").find("input").attr("checked","checked");
    } else {
      $("#l3").removeClass("disable").addClass("cho-item");
    }

    if (t1*4>5000000) {
      //将第四选项变为不可选，此时第五选项已经变为不可选了
      // console.info("4: selected removed");
      $("#l4").removeClass("cho-item").addClass("disable");
      //第一选项 选中状态
      $("#l1").addClass("selected");
      $("#l1").find("input").attr("checked","checked");
    } else {
      $("#l4").removeClass("disable").addClass("cho-item");
    }

    if (t1*5>5000000) {
      //将第五选项变为不可选
      $(".month-cho .cho-item").removeClass("selected");
      // console.info("5: selected removed");
      $("#l5").removeClass("cho-item").addClass("disable");
      //第一选项 选中状态
      $("#l1").addClass("selected");
      $("#l1").find("input").attr("checked","checked");
    } else {
      $("#l5").removeClass("disable").addClass("cho-item");
    }

    $(".month-cho .disable").removeClass("selected");
    
  }  

  var xianzhi = function(){
    if(money<=500000){
      $("#month-apply .trading-position").html("投资沪深A股，仓位无限制，盈利全归您");
    }else {
      $("#month-apply .trading-position").html("<b style='position:absolute;right:0;top:8px;font-size:14px;font-weight:normal;line-height:18px;'>投资沪深A股，盈利全归您<br><span class='cl-red f-14'>单股不超总操盘资金的50%，创业板33%仓位限制</span></b>");            
    }
  }
  //选择杠杆        
  $(".month-cho .cho-item").click(function(){
    if($(this).attr("class") != 'disable') {
      $(".month-cho .cho-item").removeClass("selected");
      $(".month-cho .cho-item").find("input").attr("checked", false);
      $(this).addClass("selected");
      $(this).find("input").attr("checked","checked");
      // $(".month-cho .cho-item").not(this).removeClass("li_5");
      t1 = $("#month-inp").val().replace(/,/g,"");  //投入本金 
      t2 = $(".month-cho .selected").data("lever");  //选中的杠杆倍数

      if (isNaN(t2)) {
        t2 = 0;
      };
      $('#lever').val(t2);

      t3 = t2+1;                 
      jj = (t1*t2)*1.5;   //警戒
      pc = (t1*t2)*1.4;  //平仓
      t = ((t1*t3)/10000).toFixed(1);
      money = t1*t3;  //获得的配资金额
      cycle = $("#cycle").val();
      $("#orange1").html(formatMoney(parseInt(t1*t3), 0));
      $("#total_f63").html(formatMoney2(t));
      $("#jj").html(formatMoney(parseInt(jj), 0));
      $("#pc").html(formatMoney(parseInt(pc), 0));
      xianzhi(money);
      m = t1*t2;
      if($("#month-apply label.date1")){
        if (m>=1000000) {
          $("#month-apply label.date1").hide();
          $("#month-apply input[type='radio'][value=1]").attr("checked","checked" );
        } else {
          $("#month-apply label.date1").show();
        }
      } 
      fwf(t1);                
    }   
  });    
  $("#month-inp").focus(function(){
      $(".month-cho table").show();
      $(".month-cho .gray-box").hide();
      // $("#month-inp").removeClass("month-inp_null");
      // $("#bb").css("opacity","1");
  });
  /*document.body.onmouseout="func()"*/
  $("#month-inp").keyup(function(){
      this.value = this.value.replace(/[^\d]/g,"");
      $(".month-cho table").show();
      $(".month-cho .gray-box").hide();
      // $("#month-inp").removeClass("month-inp_null");
      t1 = $("#month-inp").val().replace(/,/g,"");

      // debug：值是否为 not a number
      // console.info("t1:"+t1+"  "+isNaN(t1));
      // result: t1 is a number
      
      if(t1>5000000) {
        t1 = 5000000;
        $("#month-inp").val(formatMoney(parseInt(t1), 0));
        /*clickchange();*/
      }
      if (!t1) {
        return;
      }
      $("#month-inp").val(formatMoney(parseInt(t1), 0));
      hidden();
      t2 = $(".month-cho .selected").data("lever");

      // debug：值是否为 not a number
      // console.info("t2:"+t2+"  "+isNaN(t2));
      // result: t2 is a number
      if (isNaN(t2)) {
        t2 = 0;
      };

      t3 = t2+1;
      cycle = $("#cycle").val();
      if(t1<3000) {
        t1 = parseInt(t1);
        t1 = 0;
      }
      t=((t1*t3)/10000).toFixed(1);   //总金额 （万）
      jj = (t1*t2)*1.5;
      pc = (t1*t2)*1.4;
      money = t1*t3;  
      p = (t1/10000).toFixed(1);
      //申请金额
      for (var i = 1; i < 6 ;i++) {
        if(p*i>=1){
          if(t1*i%10000!=0){
            $("#lever"+i).html((p*i).toFixed(1)+"万");
          } else{
            $("#lever"+i).html((p*i).toFixed(0)+"万");
          }
        }   else{
          $("#lever"+i).html(formatMoney(parseInt(t1*i), 0));
        }
      }
      $("#orange1").html(formatMoney(parseInt(t1*t3), 0));
      $("#total_f63").html(formatMoney2(t));
      $("#jj").html(t1>500?formatMoney(parseInt(jj), 0):'0');
      $("#pc").html(t1>500?formatMoney(parseInt(pc), 0):'0');
      for (var lever = 1; lever < 6; lever++) {
        tt = t1*lever;
        myfunc(tt,cycle,lever);
        tt = t1; 
      };
      m = t1*t2;
      if($("#month-apply label.date1")){
        if (m>=1000000) {
          $("#month-apply label.date1").hide();
          $("#month-apply input[type='radio'][value=1]").attr("checked","checked" );
        } else {
          $("#month-apply label.date1").show();
        }
      }
      // $("#bb").css("opacity","1"); 
      xianzhi(money);
      fwf(t1);
  });

  $("#month-inp").blur(function(){
    t1 = $("#month-inp").val().replace(/,/g,"");
    if (t1 > 0&&t1 <= 5000000) {
      t1 = Math.round(t1 / 1000) * 1000;
      $("#month-inp").val(formatMoney(parseInt(t1), 0));
    }
    if(t1<3000){
      t1 = 0; 
    } 
    if(!t1||t1==0){
      $(".month-cho table").hide();
      $(".month-cho .gray-box").show();
      $("#month-inp").val('');
    }
    hidden();
    t2 = $(".month-cho .selected").data("lever");
    if (isNaN(t2)) {
      t2 = 0;
    };

    t3 = t2+1;
    t=((t1*t3)/10000).toFixed(1);
    jj = (t1*t2)*1.5;
    pc = (t1*t2)*1.4;
    money = t1*t3;
    cycle = $("#cycle").val();
    p = (t1/10000).toFixed(1);
    for (var i = 1; i < 6 ;i++) {
      if(p*i>=1){
        if(t1*i%10000!=0){
          $("#lever"+i).html((p*i).toFixed(1)+"万");
        }   else{
          $("#lever"+i).html((p*i).toFixed(0)+"万");
        }
      } else{
        $("#lever"+i).html(formatMoney(parseInt(t1*i), 0));
      }
    };
    $("#orange1").html(formatMoney(parseInt(t1*t3), 0));
    $("#total_f63").html(formatMoney2(t));
    // formatMoney3(); 
    $("#jj").html(formatMoney(parseInt(jj), 0));
    $("#pc").html(formatMoney(parseInt(pc), 0));
    xianzhi(money);
    for (var lever = 1; lever < 6; lever++) {
      tt = t1*lever;
      myfunc(tt,cycle,lever);
      tt = t1;  
    };
    m = t1*t2;
    if($("#month-apply label.date1")){
      if (m>=1000000) {
        $("#month-apply label.date1").hide();
        $("#month-apply input[type='radio'][value='1']").attr("checked","checked" );
      } else {
        $("#month-apply label.date1").show();
      }
    }
    // $("#bb").css("opacity","0");
    fwf(t1);
  })
  $("#cycle").click(function(){
    t1 = parseInt($("#month-inp").val().replace(/,/g, ""));
    //投入本金  
    t2 = $(".month-cho .selected").data("lever");  
    //选中的杠杆倍数
    if(!t1){
      t1 = 0;
    }
    money = t1*t3;  //获得的配资金额
    cycle = $("#cycle").val();

    // debug：值是否为 not a number
    // console.info("cycle:"+cycle+"  "+isNaN(cycle));
    // result: cycle is a number

    for (var lever = 1; lever < 6; lever++) {
      tt = t1*lever;
      myfunc(tt,cycle,lever);
      tt = t1;  
    };
    fwf(t1);
  })
})