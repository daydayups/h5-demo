/**
 * Created by Administrator on 2015/4/28 0028.
 */
window.spin = function (config) {
  var base = document.querySelector(config.base),
      region = config.region,
      item = Array.prototype.slice.call(document.querySelectorAll(config.item), 0),//convert NodeList to Array
      itemSize = config.itemSize,
      itemColor = config.itemColor,
      center = config.center;

  if (region === "fullscreen") {
//    base.style.position = "relative";
    base.style.width = "100%";
    base.style.height = "100%";
  }

  /** get Points */
//  var points = [{x:"", y:""}];
  var //points = [],//store item position
      deg = 360 / item.length,//this degree will be used in position computing
      radius = base.clientHeight > base.clientWidth ? (base.clientWidth - itemSize) / 2 : (base.clientHeight - itemSize) / 2,
      centerX = base.clientWidth / 2,
      centerY = base.clientHeight / 2;

  console.info("centerX:" + centerX + " centerY:" + centerY);

//push the position in points.
//  for(var i = 0; i < item.length; i++) {
//    points.push({x: centerX + radius*Math.sin((i+1)*deg*Math.PI/180) - itemSize/2 ,y: centerY - radius*Math.cos((i+1)*deg*Math.PI/180) - itemSize/2});
//    points.push({x: centerX + radius*Math.sin((i+1)*deg*Math.PI/180) ,y: centerY - radius*Math.cos((i+1)*deg*Math.PI/180)});
//  }
  /** Compatibility */
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun /*, thisp*/) {
      var len = this.length;
      if (typeof fun != "function")
        throw new TypeError();

      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this)
          fun.call(thisp, this[i], i, this);
      }
    };
  }

//  console.info("item:" +item instanceof  Array);
  /** init items */
  item.forEach(function (element, index, array) {
//    console.info("element:" + element + " index:" + index + " array:" + array);
    element.style.width = itemSize + "px";
    element.style.height = itemSize + "px";
    element.style.borderRadius = "50%";
    element.style.position = "absolute";
    element.style.left = (centerX - itemSize / 2) + "px";
    element.style.top = (centerY - itemSize / 2) + "px";
//    element.style.left = points[index].x + "px";
//    element.style.top = points[index].y + "px";
    element.style.backgroundColor = itemColor;
  });

  //animate
  var d = deg;
  var speed = 1;

  function animate() {
    item.forEach(function (element, index, array) {
      element.style.setProperty("transform", "translate(" + (radius * Math.sin(index * d * Math.PI / 180 + speed / 1000)) + "px" + "," +
          ( 0 - radius * Math.cos(index * d * Math.PI / 180 + speed / 1000)) + "px" + ")");
    });
    speed++;
    if (speed === 1000) {
      speed = 0;
    }
    requestAnimFrame(animate);
  }

  animate();

}

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
    window.setTimeout(e, 1e3 / 60)
  }
}(), window.cancelRequestAnimFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
}()