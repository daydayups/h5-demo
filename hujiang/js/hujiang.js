!function (a) {
  var b = Math.round(new Date / 864e5), c = function (a) {
    var b = document.createElement("script");
    b.type = "text/javascript", b.async = !0, b.src = a;
    var c = document.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(b, c)
  };
  window._siteid = a, c(location.protocol + "//trackcommon.hujiang.com/analytics/ht/ht.min.js?v=" + b), c(location.protocol + "//track.hujiang.com/log?siteid=" + a + "&urlref=" + encodeURIComponent(document.referrer) + "&hj_t=" + +new Date)
}(23);