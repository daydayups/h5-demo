!function (a) {
  var b = {ver: 2, hotlink_server: "hotlink.hujiang.com", hotlink_source: "", hotlink_uid: "", hotlink_click: function (c, d, e, f) {
    var g = document.createElement("img");
    return g.style.display = "none", g.style.width = "0px", g.style.height = "0px", g.src = "http://" + b.hotlink_server + "/click.ashx?url=" + encodeURIComponent(d) + "&source=" + encodeURIComponent(b.hotlink_source) + "&title=" + encodeURIComponent(e) + "&random=" + Math.random() + "&uid=" + b.hotlink_uid + "&ver=" + b.ver, document.body.appendChild(g), "" != a(c).attr("target") || d == a(c).attr("ID") || b.contains(d, "#") || 2 == f.which || 1 == f.ctrlKey ? !0 : (window.setTimeout(function () {
      var a, c;
      b.contains(d, "ed2k") ? (a = "/\\|\\d+", c = new RegExp(a, "i"), d = d.replace(c, "")) : b.contains(d, "|") && (d = d.split("|")[0]), b.navWithRefer(d)
    }, 200), !1)
  }, navWithRefer: function (a) {
    try {
      var b = document.createElement("a");
      b.href = a, document.body.appendChild(b), b.click()
    } catch (c) {
      location.href = a
    }
  }, contains: function (a, b) {
    return a = a.toLowerCase(), b = b.toLowerCase(), -1 != a.indexOf(b)
  }, getTagPath: function (b) {
    var e, f, h, c = "", d = a(b).parent(), g = "";
    if (void 0 == d.attr("tagName"))for (; "body" != d.prop("tagName").toLowerCase();)e = d.prop("tagName"), f = d.attr("id"), g = d.attr("class"), h = e.toLowerCase() + (void 0 == f || "" == f ? "" : "#" + f.toLowerCase()) + (void 0 == g || "" == g ? "" : "." + g.toLowerCase()), c += h + "/", d = d.parent(); else for (; "body" != d.attr("tagName").toLowerCase();)e = d.attr("tagName"), f = d.attr("id"), g = d.attr("class"), h = e.toLowerCase() + (void 0 == f || "" == f ? "" : "#" + f.toLowerCase()) + (void 0 == g || "" == g ? "" : "." + g.toLowerCase()), c += h + "/", d = d.parent();
    return c
  }, isTagDuplicate: function (b) {
    return a("a[href='" + a(b).attr("href") + "']").length > 1
  }, getHashCode: function (a) {
    for (var b = 0, c = 0, a = "" + a, d = a.length - 1; d >= 0; d--)c = parseInt(a.charCodeAt(d), 0), b = (268435455 & b << 6) + c + (c << 14), 0 != (c = 266338304 & b) && (b ^= c >> 21);
    return b
  }, setCookie: function (a, b, c) {
    var d = new Date;
    d.setDate(d.getDate() + c), document.cookie = a + "=" + escape(b) + (null == c ? "" : ";expires=" + d.toGMTString()) + ";path=/"
  }, getCookie: function (a) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(a + "="), -1 != c_start) ? (c_start = c_start + a.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
  }, delCookie: function (a) {
    var b = new Date;
    b.setTime(b.getTime() - 1e4), document.cookie = a + "=a; expires=" + b.toGMTString() + ";path=/"
  }, checkCookie: function (a, b) {
    var c = this.getCookie(a);
    return null != c && c == b ? !0 : !1
  }, existCookie: function (a) {
    var b = this.getCookie(a);
    return null != b && "" != b ? !0 : !1
  }, getReferURL: function () {
    var a = document.referrer;
    return a
  }, getReferHost: function (a) {
    var c, d, b = null;
    return"undefined" == typeof a || null == a ? null : (c = /.*\:\/\/([^\/]*).*/, d = a.match(c), "undefined" != typeof d && null != d && (b = d[1]), b)
  }, sourceTrack: function () {
    if (this.existCookie("_hotlink_source_track"))this.hotlink_source = this.getCookie("_hotlink_source_track"); else {
      var a = this.getReferURL();
      location.host != this.getReferHost(a) && (this.hotlink_source = a, this.setCookie("_hotlink_source_track", this.hotlink_source, null))
    }
    this.existCookie("_hotlink_uid") ? this.hotlink_uid = this.getCookie("_hotlink_uid") : (this.hotlink_uid = this.calcUID(), this.setCookie("_hotlink_uid", this.hotlink_uid, 360))
  }, getTagIdentity: function (a) {
    var c = b.getTagPath(a);
    return"|" + b.getHashCode(c)
  }, calcUID: function () {
    return(new Date).getTime().toString() + this.randNum(2).toString()
  }, randNum: function (a) {
    var c, b = "";
    for (c = 0; a > c; c++)b += Math.floor(10 * Math.random());
    return b
  }, load: function () {
    return window.hotlink_click = this.hotlink_click, "dev." == location.hostname.substr(0, 4) && (this.hotlink_server = "dev.hotlink.hujiang.com"), this.sourceTrack(), this.contains(location.hash, "hotlink") || this.checkCookie("_hotlink_ishotlink", "true") ? (a.getScript("http://" + this.hotlink_server + "/js/client/query.js"), void 0) : (a("a").click(function (c) {
      var d, e;
      if (!a(this).attr("no_hotlink") && !a(this).parent().attr("no_hotlink")) {
        if (d = a(this).attr("href"), !d || /^#+$/.test(d) || b.contains(d, "javascript") || "" == d) {
          if (d = a(this).attr("ID"), !d)return
        } else b.isTagDuplicate(this) && (d += b.getTagIdentity(this));
        return e = a(this).text(), ("" == e || null == e) && (e = a(this).attr("title") || ""), b.hotlink_click(this, d, e, c)
      }
    }), void 0)
  }};
  a && a(document).ready(function () {
    window.console || (window.console = {}, window.console.log = function () {
    }), b.load()
  }), window._hotlink = b
}(jQuery);