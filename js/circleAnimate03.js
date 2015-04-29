/**
 * Created by Administrator on 2015/4/28 0028.
 */
(function(window){
//initiate particle
  particlesJS('particles-js', {
    particles: {
      color: "#fff",
      shape: "circle",
      opacity: 1,
      size: 1,
      size_random: !0,
      nb: 200,
      line_linked: {
        enable_auto: !0,
        distance: 100,
        color: "#fff",
        opacity: .5,
        width: 1,
        condensed_mode: {
          enable: !1,
          rotateX: 600,
          rotateY: 600
        }
      },
      anim: {
        enable: !0,
        speed:.3
      }
    },
    interactivity: {
      enable: !0,
      mouse: {
        distance: 250
      },
      detect_on: "canvas",
      mode: "grab",
      line_linked: {
        opacity: .35
      },
      events: {
        onclick: {
          enable: !0,
          mode: "push",
          nb: 3
        }
      }
    },
    retina_detect: !0
  });

  /* initiate circles */
  spin({
//  speed:.5 //动画速度
    base:"#circle-base",//圆圈们的相对移动参照物
    region: "fullscreen",
    center:"center",//默认旋转中心为center
    item:".circle",//需要操作的圆圈们
    itemSize:"200",//圆圈的大小
    itemColor:"#fff",//圆圈的大小
    trigger:".preview"//圆圈移动的触发器
  });

})(window);



