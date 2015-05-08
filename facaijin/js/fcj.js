/**
 * Created by Administrator on 2015/5/6 0006.
 */
//需要 Jquery依赖

  var fcj = {
    fn:{
      switchTabs : function (tabs, boxs, current) {
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
        $tabs.click(function(){
          $tabs.removeClass(currStr);
          $(this).addClass(currStr);
          $boxs.hide();
          $boxs.eq($tabs.index(this)).show();
        });
      },
      fun2 : function () {

      }
    }
  }
