/**
 * Created by Administrator on 2015/10/23.
 */
(function () {
  null == window.GitHub && (window.GitHub = {})
}).call(this), function () {
  top !== window && (alert("For security reasons, framing is not allowed."), top.location.replace(document.location))
}.call(this), function (t) {
  t.fn.caret = function (t) {
    return"undefined" == typeof t ? this[0].selectionStart : (this[0].focus(), this[0].setSelectionRange(t, t))
  }, t.fn.caretSelection = function (t, e) {
    return"undefined" == typeof t && "undefined" == typeof e ? [this[0].selectionStart, this[0].selectionEnd] : (this[0].focus(), this[0].setSelectionRange(t, e))
  }
}(jQuery), function () {
  $.fn.ajax = function (t) {
    var e, n, i, r, s;
    return null == t && (t = {}), s = $.Deferred(), 1 !== this.length ? (s.reject(), s.promise()) : (e = this[0], (r = this.attr("data-url")) ? (s = this.data("xhr")) ? s : (n = {type: "GET", url: r, context: e}, i = $.extend(n, t), s = $.ajax(i), this.data("xhr", s), s.always(function (t) {
      return function () {
        return t.removeData("xhr")
      }
    }(this)), s) : (s.rejectWith(e), s.promise()))
  }
}.call(this), function () {
  var t, e;
  t = function (t) {
    return Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.name = "DataRemoteError", this.message = t
  }, t.prototype = new Error, t.prototype.constructor = t, e = function () {
    return $("#ajax-error-message").show(function () {
      return $(this).addClass("visible")
    })
  }, $(document).on("ajaxError", "[data-remote]", function (n, i, r, s) {
    var o, a, c, u, l, d;
    if (this === n.target && "abort" !== s && "canceled" !== s) {
      if (a = "." + this.className.split(" ").sort().join("."), o = new t(s + " (" + i.status + ") from " + a), o.failbotContext = {dataRemote: {target: $(this).inspect(), method: null != (c = this.getAttribute("method")) ? c : "GET", url: null != (u = null != (l = this.href) ? l : this.action) ? u : window.location.href, dataType: null != (d = this.getAttribute("data-type")) ? d : "intelligent guess"}}, /<html/.test(i.responseText))throw e(), n.stopImmediatePropagation(), o;
      return setTimeout(function () {
        if (!n.isDefaultPrevented())throw e(), o
      }, 0)
    }
  }), $(document).on("ajaxBeforeSend", "[data-remote]", function (t, e, n) {
    return $("#ajax-error-message").hide().removeClass("visible")
  }), $(document).on("click", ".js-ajax-error-dismiss", function () {
    return $("#ajax-error-message").hide().removeClass("visible"), !1
  })
}.call(this), function () {
  $(document).on("ajaxSend", "[data-remote]", function (t) {
    return this !== t.target || t.isDefaultPrevented() ? void 0 : $(this).addClass("loading")
  }), $(document).on("ajaxComplete", "[data-remote]", function (t) {
    return this === t.target ? $(this).removeClass("loading") : void 0
  })
}.call(this), function () {
  $.hidden = function () {
    return this.offsetWidth <= 0 && this.offsetHeight <= 0
  }, $.visible = function () {
    return!$.hidden.call(this)
  }, $.fn.hidden = function () {
    return this.filter($.hidden)
  }, $.fn.visible = function () {
    return this.filter($.visible)
  }
}.call(this), function () {
  var t, e, n, i, r, s, o;
  s = new WeakMap, r = new WeakMap, i = function (t, e) {
    var n, i;
    return(n = s.get(t)) || (n = new SlidingPromiseQueue, s.set(t, n)), e.value.trim() ? (e.authenticity_token = null != (i = t.form.elements.authenticity_token) ? i.value : void 0, n.push($.fetchText(t.getAttribute("data-autocheck-url"), {method: "post", body: $.param(e), headers: {"Content-Type": "application/x-www-form-urlencoded"}}))) : Promise.reject(new Error("empty"))
  }, n = function (t, e, n) {
    return t.dispatchEvent(new CustomEvent(e, {bubbles: !0, detail: n}))
  }, e = function (t, e) {
    return o(t), t.classList.add("errored"), $(t).find("p.note").hide()
  }, o = function (t) {
    return t.classList.remove("errored"), t.classList.remove("warn"), $(t).find("p.note").show(), $(t).find("dd.error").remove(), $(t).find("dd.warning").remove()
  }, t = function (t) {
    var s, a, c, u, l, d, h;
    return s = $(t), c = {value: t.value}, n(t, "autocheck:send", c), u = $.param(c).split("&").sort().join("&"), u !== r.get(t) ? (r.set(t, u), s.closest("dl.form").removeClass("errored successed"), t.classList.remove("is-autocheck-successful", "is-autocheck-errored"), h = function (e) {
      return t.classList.toggle("is-autocheck-loading", e), s.closest("dl.form").toggleClass("is-loading", e)
    }, a = function () {
      return h(!1), n(t, "autocheck:complete")
    }, l = function (e) {
      var i;
      return t.classList.add("is-autocheck-successful"), i = t.closest("dl.form"), o(i), i.classList.add("successed"), n(t, "autocheck:success", e), a()
    }, d = function (i) {
      var r, c, u;
      return r = t.closest("dl.form"), "empty" === i.message ? o(r) : s.is($.visible) && (t.classList.add("is-autocheck-errored"), c = (null != (u = i.response) ? u.text() : void 0) || Promise.resolve("Something went wrong"), c.then(function (s) {
        var o, a;
        return/<html/.test(s) && (s = "Something went wrong."), e(r), o = document.createElement("dd"), o.classList.add("error"), (null != (a = i.response) ? a.headers.get("Content-Type").match("text/html") : void 0) ? o.innerHTML = s : o.textContent = s, r.append(o), n(t, "autocheck:error")
      })), a()
    }, h(!0), i(t, c).then(l, d)) : void 0
  }, $(document).on("change", "input[data-autocheck-url]", function () {
    t(this)
  }), $(document).onFocusedInput("input[data-autocheck-url]", function (e) {
    return $(this).on("throttled:input." + e, function () {
      t(this)
    }), !1
  })
}.call(this), function () {
  $.fn.fire = function (t) {
    var e, n, i, r, s;
    return(e = arguments[1]) && ($.isPlainObject(e) ? r = e : $.isFunction(e) && (n = e)), (e = arguments[2]) && $.isFunction(e) && (n = e), i = this[0], null == r && (r = {}), null == r.cancelable && (r.cancelable = !!n), null == r.bubbles && (r.bubbles = !0), s = function () {
      var e;
      return e = $.Event(t, r), $.event.trigger(e, [], i, !e.bubbles), n && !e.isDefaultPrevented() && n.call(i, e), e
    }, r.async ? (delete r.async, void setImmediate(s)) : s()
  }
}.call(this), function () {
  var t, e, n, i, r;
  i = {8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause", 20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 91: "meta", 93: "meta", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"}, r = {48: ")", 49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*", 57: "(", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 186: ":", 187: "+", 188: "<", 189: "_", 190: ">", 191: "?", 192: "~", 219: "{", 220: "|", 221: "}", 222: '"'}, t = function (t) {
    var e, n, s;
    return e = i[t.which], n = "", t.ctrlKey && "ctrl" !== e && (n += "ctrl+"), t.altKey && "alt" !== e && (n += "alt+"), t.metaKey && !t.ctrlKey && "meta" !== e && (n += "meta+"), t.shiftKey ? (s = r[t.which]) ? "" + n + s : "shift" === e ? n + "shift" : e ? n + "shift+" + e : null : e ? "" + n + e : null
  }, n = function (t) {
    var e, n;
    return t.nodeType !== Node.ELEMENT_NODE ? !1 : (e = t.nodeName.toLowerCase(), n = (t.getAttribute("type") || "").toLowerCase(), "select" === e || "textarea" === e || "input" === e && "submit" !== n && "reset" !== n)
  }, e = function (e) {
    var i;
    return null == e.hotkey && (e.hotkey = t(e)), i = null, null == e.isFormInteraction && (e.isFormInteraction = function () {
      return null != i ? i : i = n(this.target)
    }), e.handleObj.handler.apply(this, arguments)
  }, $.event.special.keydown = {handle: e}, $.event.special.keyup = {handle: e}
}.call(this), function () {
  var t, e, n, i, r, s, o;
  i = t = {}, s = null, o = function () {
    return s = null, t = i
  }, $(document).on("keydown", function (e) {
    var n;
    if (!e.isFormInteraction())if (s && clearTimeout(s), n = t[e.hotkey]) {
      if (!("nodeType"in n))return t = n, void(s = setTimeout(o, 1500));
      o(), $(n).fire("hotkey:activate", {originalEvent: e}, function () {
        return $(n).is("input, textarea") ? void $(n).focus() : void $(n).click()
      }), e.preventDefault()
    } else o()
  }), e = function (t) {
    var e, n, i, r, s;
    for (r = t.getAttribute("data-hotkey").split(/\s*,\s*/), s = [], n = 0, i = r.length; i > n; n++)e = r[n], s.push(e.split(/\s+/));
    return s
  }, n = function (t) {
    var n, r, s, o, a, c, u, l, d;
    for (l = e(t), d = [], s = 0, c = l.length; c > s; s++)a = l[s], u = i, d.push(function () {
      var e, i, s;
      for (s = [], r = e = 0, i = a.length; i > e; r = ++e)o = a[r], r < a.length - 1 ? (n = u[o], (!n || "nodeType"in n) && (u[o] = {}), s.push(u = u[o])) : s.push(u[o] = t);
      return s
    }());
    return d
  }, r = function (e) {
    var r, s, o, a;
    for (i = t = {}, o = $("[data-hotkey]"), a = [], r = 0, s = o.length; s > r; r++)e = o[r], a.push(n(e));
    return a
  }, $.observe("[data-hotkey]", {add: n, remove: r})
}.call(this), function () {
  var t, e, n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, b, y, j, w, x, k, C, S, L, T;
  r = navigator.userAgent.match(/Macintosh/), g = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", c = !1, v = {x: 0, y: 0}, e = function (t) {
    t.addEventListener("mousemove", b, !1), t.addEventListener("mouseover", y, !1)
  }, T = function (t) {
    t.removeEventListener("mousemove", b, !1), t.removeEventListener("mouseover", y, !1)
  }, $.observe(".js-navigation-container", {add: e, remove: T}), b = function (t) {
    (v.x !== t.clientX || v.y !== t.clientY) && (c = !1), v = {x: t.clientX, y: t.clientY}
  }, y = function (t) {
    c || $(t.target).trigger("navigation:mouseover")
  }, $(document).on("keydown", function (t) {
    var e, n, i;
    (t.target === document.body || t.target.classList.contains("js-navigation-enable")) && (e = h()) && (c = !0, i = $(e).find(".js-navigation-item.navigation-focus")[0] || e, n = $(i).fire("navigation:keydown", {originalEvent: t, hotkey: t.hotkey, relatedTarget: e}), n.isDefaultPrevented() && t.preventDefault())
  }), $(document).on("navigation:keydown", ".js-active-navigation-container", function (t) {
    var e, n, i;
    if (e = this, n = $(t.originalEvent.target).is("input, textarea"), $(t.target).is(".js-navigation-item"))if (i = t.target, n) {
      if (r)switch (t.hotkey) {
        case"ctrl+n":
          s(i, e);
          break;
        case"ctrl+p":
          o(i, e)
      }
      switch (t.hotkey) {
        case"up":
          o(i, e);
          break;
        case"down":
          s(i, e);
          break;
        case"enter":
          p(i);
          break;
        case g + "+enter":
          p(i, !0)
      }
    } else {
      if (r)switch (t.hotkey) {
        case"ctrl+n":
          s(i, e);
          break;
        case"ctrl+p":
          o(i, e);
          break;
        case"alt+v":
          w(i, e);
          break;
        case"ctrl+v":
          j(i, e)
      }
      switch (t.hotkey) {
        case"j":
          s(i, e);
          break;
        case"k":
          o(i, e);
          break;
        case"o":
        case"enter":
          p(i);
          break;
        case g + "+enter":
          p(i, !0)
      }
    } else if (i = f(e)[0])if (n) {
      if (r)switch (t.hotkey) {
        case"ctrl+n":
          d(i, e)
      }
      switch (t.hotkey) {
        case"down":
          d(i, e)
      }
    } else {
      if (r)switch (t.hotkey) {
        case"ctrl+n":
        case"ctrl+v":
          d(i, e)
      }
      switch (t.hotkey) {
        case"j":
          d(i, e)
      }
    }
    if (n) {
      if (r)switch (t.hotkey) {
        case"ctrl+n":
        case"ctrl+p":
          t.preventDefault()
      }
      switch (t.hotkey) {
        case"up":
        case"down":
          t.preventDefault();
          break;
        case"enter":
        case g + "+enter":
          t.preventDefault()
      }
    } else {
      if (r)switch (t.hotkey) {
        case"ctrl+n":
        case"ctrl+p":
        case"alt+v":
        case"ctrl+v":
          t.preventDefault()
      }
      switch (t.hotkey) {
        case"j":
        case"k":
          t.preventDefault();
          break;
        case"o":
        case"enter":
        case g + "+enter":
          t.preventDefault()
      }
    }
  }), $(document).on("navigation:mouseover", ".js-active-navigation-container .js-navigation-item", function (t) {
    var e;
    e = $(t.currentTarget).closest(".js-navigation-container")[0], d(t.currentTarget, e)
  }), u = function (t) {
    var e, n, i;
    i = t.currentTarget, n = t.modifierKey || t.altKey || t.ctrlKey || t.metaKey, e = $(i).fire("navigation:open", {modifierKey: n}), e.isDefaultPrevented() && t.preventDefault()
  }, $(document).on("click", ".js-active-navigation-container .js-navigation-item", function (t) {
    u(t)
  }), $(document).on("navigation:keyopen", ".js-active-navigation-container .js-navigation-item", function (t) {
    var e;
    (e = $(this).filter(".js-navigation-open")[0] || $(this).find(".js-navigation-open")[0]) ? (t.modifierKey ? (window.open(e.href, "_blank"), window.focus()) : $(e).click(), t.preventDefault()) : u(t)
  }), t = function (t) {
    var e;
    return e = h(), t !== e ? $(t).fire("navigation:activate", function () {
      return e && e.classList.remove("js-active-navigation-container"), t.classList.add("js-active-navigation-container"), $(t).fire("navigation:activated", {async: !0})
    }) : void 0
  }, a = function (t) {
    return $(t).fire("navigation:deactivate", function () {
      return t.classList.remove("js-active-navigation-container"), $(t).fire("navigation:deactivated", {async: !0})
    })
  }, i = [], k = function (e) {
    var n;
    (n = h()) && i.push(n), t(e)
  }, x = function (e) {
    var r;
    a(e), n(e), (r = i.pop()) && t(r)
  }, l = function (e, n) {
    var i, r, s;
    if (i = f(n)[0], s = $(e).closest(".js-navigation-item")[0] || i, t(n), s) {
      if (r = d(s, n))return;
      L($(s).overflowParent()[0], s)
    }
  }, n = function (t) {
    $(t).find(".navigation-focus.js-navigation-item").removeClass("navigation-focus")
  }, C = function (t, e) {
    n(e), l(t, e)
  }, o = function (t, e) {
    var n, i, r, s, o;
    if (r = f(e), i = $.inArray(t, r), o = r[i - 1]) {
      if (n = d(o, e))return;
      s = $(o).overflowParent()[0], "page" === m(e) ? L(s, o) : S(s, o)
    }
  }, s = function (t, e) {
    var n, i, r, s, o;
    if (r = f(e), i = $.inArray(t, r), s = r[i + 1]) {
      if (n = d(s, e))return;
      o = $(s).overflowParent()[0], "page" === m(e) ? L(o, s) : S(o, s)
    }
  }, w = function (t, e) {
    var n, i, r, s, o;
    for (r = f(e), i = $.inArray(t, r), s = $(t).overflowParent()[0]; (o = r[i - 1]) && $(o).overflowOffset(s).top >= 0;)i--;
    if (o) {
      if (n = d(o, e))return;
      L(s, o)
    }
  }, j = function (t, e) {
    var n, i, r, s, o;
    for (r = f(e), i = $.inArray(t, r), o = $(t).overflowParent()[0]; (s = r[i + 1]) && $(s).overflowOffset(o).bottom >= 0;)i++;
    if (s) {
      if (n = d(s, e))return;
      L(o, s)
    }
  }, p = function (t, e) {
    null == e && (e = !1), $(t).fire("navigation:keyopen", {modifierKey: e})
  }, d = function (t, e) {
    var i;
    return i = $(t).fire("navigation:focus", function () {
      return n(e), t.classList.add("navigation-focus"), $(t).fire("navigation:focused", {async: !0})
    }), i.isDefaultPrevented()
  }, h = function () {
    return $(".js-active-navigation-container")[0]
  }, f = function (t) {
    return $(t).find(".js-navigation-item").visible()
  }, m = function (t) {
    var e;
    return null != (e = $(t).attr("data-navigation-scroll")) ? e : "item"
  }, L = function (t, e) {
    var n, i, r, s;
    return i = $(e).positionedOffset(t), n = $(e).overflowOffset(t), n.bottom <= 0 ? $(t).scrollTo({top: i.top - 30, duration: 200}) : n.top <= 0 ? (r = null != t.offsetParent ? t.scrollHeight : $(document).height(), s = r - (i.bottom + n.height), $(t).scrollTo({top: s + 30, duration: 200})) : void 0
  }, S = function (t, e) {
    var n, i, r, s;
    return i = $(e).positionedOffset(t), n = $(e).overflowOffset(t), n.bottom <= 0 ? (r = null != t.offsetParent ? t.scrollHeight : $(document).height(), s = r - (i.bottom + n.height), $(t).scrollTo({top: s})) : n.top <= 0 ? $(t).scrollTo({top: i.top}) : void 0
  }, $.fn.navigation = function (e) {
    var i, r;
    if ("active" === e)return h();
    if (i = $(this).closest(".js-navigation-container")[0])return r = {activate: function () {
      return t(i)
    }, deactivate: function () {
      return a(i)
    }, push: function () {
      return k(i)
    }, pop: function () {
      return x(i)
    }, focus: function () {
      return l(this, i)
    }, clear: function () {
      return n(i)
    }, refocus: function () {
      return C(this, i)
    }}, "function" == typeof r[e] ? r[e]() : void 0
  }
}.call(this), function () {
  var t, e;
  t = function () {
    var t, e, n, i, r;
    return n = !1, e = !1, r = null, t = 100, i = function (n) {
      return function (i) {
        r && clearTimeout(r), r = setTimeout(function () {
          var t;
          r = null, e = !1, t = new $.Event("throttled:input", {target: i}), $.event.trigger(t, null, n, !0)
        }, t)
      }
    }(this), $(this).on("keydown.throttledInput", function () {
      n = !0, r && clearTimeout(r)
    }), $(this).on("keyup.throttledInput", function (t) {
      n = !1, e && i(t.target)
    }), $(this).on("input.throttledInput", function (t) {
      e = !0, n || i(t.target)
    })
  }, e = function () {
    return $(this).off("keydown.throttledInput"), $(this).off("keyup.throttledInput"), $(this).off("input.throttledInput")
  }, $.event.special["throttled:input"] = {setup: t, teardown: e}
}.call(this), function () {
  var t, e, n = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  };
  t = function () {
    function t() {
      this.onNavigationOpen = n(this.onNavigationOpen, this), this.onNavigationKeyDown = n(this.onNavigationKeyDown, this), this.onInputChange = n(this.onInputChange, this), this.onResultsMouseDown = n(this.onResultsMouseDown, this), this.onInputBlur = n(this.onInputBlur, this), this.onInputFocus = n(this.onInputFocus, this), this.focusedInput = this.focusedResults = null, this.mouseDown = !1, this.fetchQueue = new SlidingPromiseQueue
    }

    return t.prototype.bindEvents = function (t, e) {
      return $(t).on("blur", this.onInputBlur), $(t).on("throttled:input", this.onInputChange), $(e).on("mousedown", this.onResultsMouseDown), $(e).on("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), $(e).on("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
    }, t.prototype.unbindEvents = function (t, e) {
      return $(t).off("blur", this.onInputBlur), $(t).off("throttled:input", this.onInputChange), $(e).off("mousedown", this.onResultsMouseDown), $(e).off("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), $(e).off("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
    }, t.prototype.onInputFocus = function (t) {
      var e, n;
      e = $(t).closest(".js-autocomplete-container"), n = e.find(".js-autocomplete")[0], this.focusedInput = t, this.focusedResults = n, this.bindEvents(t, n), $(t).attr("autocomplete", "off"), $(t).trigger("autocomplete:focus"), this.fetchResults(t.value)
    }, t.prototype.onInputBlur = function () {
      var t, e;
      t = this.focusedInput, e = this.focusedResults, this.mouseDown || (this.hideResults(), this.inputValue = null, this.focusedInput = this.focusedResults = null, this.unbindEvents(t, e), $(t).trigger("autocomplete:blur"))
    }, t.prototype.onResultsMouseDown = function (t) {
      var e;
      this.mouseDown = !0, e = function (t) {
        return function () {
          return t.mouseDown = !1, $(document).off("mouseup", e)
        }
      }(this), $(document).on("mouseup", e)
    }, t.prototype.onInputChange = function (t) {
      var e;
      e = t.currentTarget, this.inputValue !== e.value && ($(e).removeData("autocompleted"), $(e).trigger("autocomplete:autocompleted:changed")), this.fetchResults(e.value)
    }, t.prototype.fetchResults = function (t) {
      var e, n, i, r;
      return(r = this.focusedResults.getAttribute("data-search-url")) ? (e = $(this.focusedInput).closest(".js-autocomplete-container"), i = t.trim() ? (r += ~r.indexOf("?") ? "&" : "?", r += "q=" + encodeURIComponent(t), e.addClass("is-sending"), $.fetchText(r)) : Promise.resolve(""), n = function () {
        return e.removeClass("is-sending")
      }, this.fetchQueue.push(i).then(function (e) {
        return function (n) {
          return $(e.focusedResults).find(".js-autocomplete-results").html(n), e.onResultsChange(t)
        }
      }(this)).then(n, n)) : void 0
    }, t.prototype.onResultsChange = function (t) {
      var e;
      e = $(this.focusedResults).find("[data-autocomplete-value]"), 0 === e.length ? this.hideResults() : this.inputValue !== t && (this.inputValue = t, this.showResults(), $(this.focusedInput).is("[data-autocomplete-autofocus]") && $(this.focusedResults).find(".js-navigation-container").navigation("focus"))
    }, t.prototype.onNavigationKeyDown = function (t) {
      switch (t.hotkey) {
        case"tab":
          return this.onNavigationOpen(t), !1;
        case"esc":
          return this.hideResults(), !1
      }
    }, t.prototype.onNavigationOpen = function (t) {
      var e, n;
      e = t.currentTarget, e.classList.contains("disabled") || (n = $(e).attr("data-autocomplete-value"), this.inputValue = n, $(this.focusedInput).val(n), $(this.focusedInput).data("autocompleted", n), $(this.focusedInput).trigger("autocomplete:autocompleted:changed", [n]), $(this.focusedInput).trigger("autocomplete:result", [n]), $(e).removeClass("active"), this.focusedInput === document.activeElement ? this.hideResults() : this.onInputBlur())
    }, t.prototype.showResults = function (t, e) {
      var n, i, r, s, o;
      return null == t && (t = this.focusedInput), null == e && (e = this.focusedResults), $(e).is($.visible) ? void 0 : (r = $(t).offset(), s = r.top, i = r.left, n = s + $(t).innerHeight(), o = $(t).innerWidth(), $(e).css({display: "block", position: "absolute", width: o + 2}), $(e).offset({top: n + 5}), $(t).addClass("js-navigation-enable"), $(e).find(".js-navigation-container").navigation("push"), $(e).show())
    }, t.prototype.hideResults = function (t, e) {
      return null == t && (t = this.focusedInput), null == e && (e = this.focusedResults), $(e).is($.visible) ? ($(t).removeClass("js-navigation-enable"), $(e).find(".js-navigation-container").navigation("pop"), $(e).hide()) : void 0
    }, t
  }(), e = new t, $(document.activeElement).is(".js-autocomplete-field") && e.onInputFocus(document.activeElement), $.observe(".js-autocomplete-field", function () {
    $(this).on("focus", function () {
      return e.onInputFocus(this)
    })
  })
}.call(this), function () {
  var t;
  t = new SlidingPromiseQueue, $(document).onFocusedInput(".js-autosearch-field", function (e) {
    $(this).on("throttled:input." + e, function () {
      var e, n, i, r;
      return n = this.form, n.classList.add("is-sending"), e = function () {
        return n.classList.remove("is-sending")
      }, i = $(n).serialize(), r = (n.action + "&" + i).replace(/[?&]/, "?"), t.push($.fetchText(r)).then(function (t) {
        var e, r;
        return r = document.getElementById(n.getAttribute("data-results-container")), r.innerHTML = t, "function" == typeof(e = window.history).replaceState ? e.replaceState(null, "", "?" + i) : void 0
      }).then(e, e)
    })
  })
}.call(this), function () {
  $(document).on("change", "form[data-autosubmit]", function () {
    return $(this).submit()
  })
}.call(this), function () {
  var t, e;
  e = null, t = function () {
    var t, n, i, r, s, o, a;
    return e && e.abort(), o = $(this).attr("data-item-name") || "items", a = parseInt($(this).attr("data-item-minimum")) || 0, r = parseInt($(this).attr("data-item-count")) || 0, s = Math.max(a, parseInt(this.value) || 0), t = s > 300, $(".js-purchase-button").prop("disabled", 0 === s || t), $(".js-downgrade-button").prop("disabled", s === r), n = {}, n[o] = s, e = $.ajax({url: $(this).attr("data-url"), data: n}), i = function (e) {
      var n, i, r;
      $(".js-contact-us").toggleClass("hidden", !t), $(".js-payment-summary").toggleClass("hidden", t), $(".js-upgrade-info").toggleClass("hidden", 0 >= s), $(".js-downgrade-info").toggleClass("hidden", s >= 0), $(".js-extra-seats-line-item").toggleClass("hidden", e.no_additional_seats), n = e.selectors;
      for (i in n)r = n[i], $(i).text(r);
      return window.history.replaceState($.pjax.state, null, e.url)
    }, e.then(i)
  }, $.observe(".js-addon-purchase-field", function () {
    $(this).on("throttled:input", t), t.call($(".js-addon-purchase-field")[0])
  }), $.observe(".js-addon-downgrade-field", function () {
    $(this).on("change", t), t.call($(".js-addon-downgrade-field")[0])
  })
}.call(this), function () {
  var t, e, n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, $, b = [].slice, y = [].indexOf || function (t) {
    for (var e = 0, n = this.length; n > e; e++)if (e in this && this[e] === t)return e;
    return-1
  };
  t = jQuery, t.payment = {}, t.payment.fn = {}, t.fn.payment = function () {
    var e, n;
    return n = arguments[0], e = 2 <= arguments.length ? b.call(arguments, 1) : [], t.payment.fn[n].apply(this, e)
  }, r = /(\d{1,4})/g, i = [
    {type: "maestro", pattern: /^(5018|5020|5038|6304|6759|676[1-3])/, format: r, length: [12, 13, 14, 15, 16, 17, 18, 19], cvcLength: [3], luhn: !0},
    {type: "dinersclub", pattern: /^(36|38|30[0-5])/, format: r, length: [14], cvcLength: [3], luhn: !0},
    {type: "laser", pattern: /^(6706|6771|6709)/, format: r, length: [16, 17, 18, 19], cvcLength: [3], luhn: !0},
    {type: "jcb", pattern: /^35/, format: r, length: [16], cvcLength: [3], luhn: !0},
    {type: "unionpay", pattern: /^62/, format: r, length: [16, 17, 18, 19], cvcLength: [3], luhn: !1},
    {type: "discover", pattern: /^(6011|65|64[4-9]|622)/, format: r, length: [16], cvcLength: [3], luhn: !0},
    {type: "mastercard", pattern: /^5[1-5]/, format: r, length: [16], cvcLength: [3], luhn: !0},
    {type: "amex", pattern: /^3[47]/, format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/, length: [15], cvcLength: [3, 4], luhn: !0},
    {type: "visa", pattern: /^4/, format: r, length: [13, 14, 15, 16], cvcLength: [3], luhn: !0}
  ], e = function (t) {
    var e, n, r;
    for (t = (t + "").replace(/\D/g, ""), n = 0, r = i.length; r > n; n++)if (e = i[n], e.pattern.test(t))return e
  }, n = function (t) {
    var e, n, r;
    for (n = 0, r = i.length; r > n; n++)if (e = i[n], e.type === t)return e
  }, h = function (t) {
    var e, n, i, r, s, o;
    for (i = !0, r = 0, n = (t + "").split("").reverse(), s = 0, o = n.length; o > s; s++)e = n[s], e = parseInt(e, 10), (i = !i) && (e *= 2), e > 9 && (e -= 9), r += e;
    return r % 10 === 0
  }, d = function (t) {
    var e;
    return null != t.prop("selectionStart") && t.prop("selectionStart") !== t.prop("selectionEnd") ? !0 : ("undefined" != typeof document && null !== document && null != (e = document.selection) && "function" == typeof e.createRange ? e.createRange().text : void 0) ? !0 : !1
  }, f = function (e) {
    return setTimeout(function () {
      var n, i;
      return n = t(e.currentTarget), i = n.val(), i = t.payment.formatCardNumber(i), n.val(i)
    })
  }, a = function (n) {
    var i, r, s, o, a, c, u;
    return s = String.fromCharCode(n.which), !/^\d+$/.test(s) || (i = t(n.currentTarget), u = i.val(), r = e(u + s), o = (u.replace(/\D/g, "") + s).length, c = 16, r && (c = r.length[r.length.length - 1]), o >= c || null != i.prop("selectionStart") && i.prop("selectionStart") !== u.length) ? void 0 : (a = r && "amex" === r.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/, a.test(u) ? (n.preventDefault(), i.val(u + " " + s)) : a.test(u + s) ? (n.preventDefault(), i.val(u + s + " ")) : void 0)
  }, s = function (e) {
    var n, i;
    return n = t(e.currentTarget), i = n.val(), e.meta || 8 !== e.which || null != n.prop("selectionStart") && n.prop("selectionStart") !== i.length ? void 0 : /\d\s$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\d\s$/, ""))) : /\s\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\d?$/, ""))) : void 0
  }, c = function (e) {
    var n, i, r;
    return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), r = n.val() + i, /^\d$/.test(r) && "0" !== r && "1" !== r ? (e.preventDefault(), n.val("0" + r + " / ")) : /^\d\d$/.test(r) ? (e.preventDefault(), n.val("" + r + " / ")) : void 0) : void 0
  }, u = function (e) {
    var n, i, r;
    return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), r = n.val(), /^\d\d$/.test(r) ? n.val("" + r + " / ") : void 0) : void 0
  }, l = function (e) {
    var n, i, r;
    return i = String.fromCharCode(e.which), "/" === i ? (n = t(e.currentTarget), r = n.val(), /^\d$/.test(r) && "0" !== r ? n.val("0" + r + " / ") : void 0) : void 0
  }, o = function (e) {
    var n, i;
    if (!e.meta && (n = t(e.currentTarget), i = n.val(), 8 === e.which && (null == n.prop("selectionStart") || n.prop("selectionStart") === i.length)))return/\d(\s|\/)+$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\d(\s|\/)*$/, ""))) : /\s\/\s?\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\/\s?\d?$/, ""))) : void 0
  }, v = function (t) {
    var e;
    return t.metaKey || t.ctrlKey ? !0 : 32 === t.which ? !1 : 0 === t.which ? !0 : t.which < 33 ? !0 : (e = String.fromCharCode(t.which), !!/[\d\s]/.test(e))
  }, p = function (n) {
    var i, r, s, o;
    return i = t(n.currentTarget), s = String.fromCharCode(n.which), /^\d+$/.test(s) && !d(i) ? (o = (i.val() + s).replace(/\D/g, ""), r = e(o), r ? o.length <= r.length[r.length.length - 1] : o.length <= 16) : void 0
  }, g = function (e) {
    var n, i, r;
    return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) && !d(n) ? (r = n.val() + i, r = r.replace(/\D/g, ""), r.length > 6 ? !1 : void 0) : void 0
  }, m = function (e) {
    var n, i, r;
    return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (r = n.val() + i, r.length <= 4) : void 0
  }, $ = function (e) {
    var n, r, s, o, a;
    return n = t(e.currentTarget), a = n.val(), o = t.payment.cardType(a) || "unknown", n.hasClass(o) ? void 0 : (r = function () {
      var t, e, n;
      for (n = [], t = 0, e = i.length; e > t; t++)s = i[t], n.push(s.type);
      return n
    }(), n.removeClass("unknown"), n.removeClass(r.join(" ")), n.addClass(o), n.toggleClass("identified", "unknown" !== o), n.trigger("payment.cardType", o))
  }, t.payment.fn.formatCardCVC = function () {
    return this.payment("restrictNumeric"), this.on("keypress", m), this
  }, t.payment.fn.formatCardExpiry = function () {
    return this.payment("restrictNumeric"), this.on("keypress", g), this.on("keypress", c), this.on("keypress", l), this.on("keypress", u), this.on("keydown", o), this
  }, t.payment.fn.formatCardNumber = function () {
    return this.payment("restrictNumeric"), this.on("keypress", p), this.on("keypress", a), this.on("keydown", s), this.on("keyup", $), this.on("paste", f), this
  }, t.payment.fn.restrictNumeric = function () {
    return this.on("keypress", v), this
  }, t.payment.fn.cardExpiryVal = function () {
    return t.payment.cardExpiryVal(t(this).val())
  }, t.payment.cardExpiryVal = function (t) {
    var e, n, i, r;
    return t = t.replace(/\s/g, ""), r = t.split("/", 2), e = r[0], i = r[1], 2 === (null != i ? i.length : void 0) && /^\d+$/.test(i) && (n = (new Date).getFullYear(), n = n.toString().slice(0, 2), i = n + i), e = parseInt(e, 10), i = parseInt(i, 10), {month: e, year: i}
  }, t.payment.validateCardNumber = function (t) {
    var n, i;
    return t = (t + "").replace(/\s+|-/g, ""), /^\d+$/.test(t) ? (n = e(t), n ? (i = t.length, y.call(n.length, i) >= 0 && (n.luhn === !1 || h(t))) : !1) : !1
  }, t.payment.validateCardExpiry = function (e, n) {
    var i, r, s, o;
    return"object" == typeof e && "month"in e && (o = e, e = o.month, n = o.year), e && n ? (e = t.trim(e), n = t.trim(n), /^\d+$/.test(e) && /^\d+$/.test(n) && parseInt(e, 10) <= 12 ? (2 === n.length && (s = (new Date).getFullYear(), s = s.toString().slice(0, 2), n = s + n), r = new Date(n, e), i = new Date, r.setMonth(r.getMonth() - 1), r.setMonth(r.getMonth() + 1, 1), r > i) : !1) : !1
  }, t.payment.validateCardCVC = function (e, i) {
    var r, s;
    return e = t.trim(e), /^\d+$/.test(e) ? i ? (r = e.length, y.call(null != (s = n(i)) ? s.cvcLength : void 0, r) >= 0) : e.length >= 3 && e.length <= 4 : !1
  }, t.payment.cardType = function (t) {
    var n;
    return t ? (null != (n = e(t)) ? n.type : void 0) || null : null
  }, t.payment.formatCardNumber = function (t) {
    var n, i, r, s;
    return(n = e(t)) ? (r = n.length[n.length.length - 1], t = t.replace(/\D/g, ""), t = t.slice(0, +r + 1 || 9e9), n.format.global ? null != (s = t.match(n.format)) ? s.join(" ") : void 0 : (i = n.format.exec(t), null != i && i.shift(), null != i ? i.join(" ") : void 0)) : t
  }
}.call(this), function () {
  var t, e = [].indexOf || function (t) {
    for (var e = 0, n = this.length; n > e; e++)if (e in this && this[e] === t)return e;
    return-1
  };
  $.observe(".js-card-select-number-field", {add: function () {
    return $(this).payment("formatCardNumber")
  }}), $.observe(".js-card-cvv", {add: function () {
    return $(this).payment("formatCardCVC")
  }}), $.observe(".js-card-select-number-field", function () {
    var t, e, n;
    e = $(this).closest("form"), t = e.find(".js-card"), n = e.find(".js-card-select-type-field"), $(this).on("input", function () {
      var e, i, r, s, o;
      if (o = $(this).val(), s = $.payment.cardType(o))for (i = 0, r = t.length; r > i; i++)e = t[i], $(e).toggleClass("enabled", $(e).attr("data-name") === s), $(e).toggleClass("disabled", $(e).attr("data-name") !== s); else t.removeClass("enabled disabled");
      n.val(s)
    })
  }), $(document).on("blur", ".js-card-select-number-field", function () {
    return $(this).val($.payment.formatCardNumber($(this).val()))
  }), $(document).on("click", ".js-card", function () {
    var t, e;
    return t = $(this).closest("form"), e = t.find(".js-card-select-number-field"), e.focus()
  }), $(document).on("click", ".js-enter-new-card", function (t) {
    var e, n;
    return e = $(this).closest(".js-setup-creditcard"), n = e.find(".js-card-select-number-field"), e.removeClass("has-credit-card"), n.attr("required", "required"), n.attr("data-encrypted-name", "billing[credit_card][number]"), t.preventDefault()
  }), $(document).on("click", ".js-cancel-enter-new-card", function (t) {
    var e, n;
    return e = $(this).closest(".js-setup-creditcard"), n = e.find(".js-card-select-number-field"), e.addClass("has-credit-card"), n.removeAttr("required"), n.removeAttr("data-encrypted-name"), t.preventDefault()
  }), t = function (t) {
    var n, i, r, s, o, a;
    return i = t.find("option:selected").text(), s = {Austria: "ATU000000000", Belgium: "BE0000000000", Bulgaria: "BG000000000...", Croatia: "", Cyprus: "CY000000000X", "Czech Republic": "CZ00000000...", Denmark: "DK00 00 00 00", Estonia: "EE000000000", Finland: "FI00000000", France: "FRXX 000000000", Germany: "DE000000000", Greece: "EL000000000", Hungary: "HU00000000", Iceland: "", Ireland: "IE...", Italy: "IT00000000000", Latvia: "LV00000000000", Lithuania: "LT000000000...", Luxembourg: "LU00000000", Malta: "MT00000000", Netherlands: "NL000000000B00", Norway: "", Poland: "PL0000000000", Portugal: "PT000000000", Romania: "RO...", Slovakia: "SK0000000000", Slovenia: "", Spain: "ES...", Sweden: "SE000000000000", Switzerland: "", "United Kingdom": "GB..."}, r = ["Angola", "Antigua and Barbuda", "Aruba", "Bahamas", "Belize", "Benin", "Botswana", "Cameroon", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "C\xf4te d'Ivoire", "Djibouti", "Dominica", "Fiji", "French Southern Lands", "Ghana", "Guyana", "Hong Kong", "Ireland", "Kiribati", "Korea, North", "Malawi", "Maritania", "Mauritius", "Montserrat", "Nauru", "Niue", "Qatar", "Saint Kitts and Nevis", "Saint Lucia", "Sao Tome and Principe", "Seychelles", "Sierra Leone", "Sint Maarten (Dutch part)", "Solomon Islands", "Somalia", "Suriname", "Syria", "Togo", "Tokelau", "Tonga", "United Arab Emirates", "Vanuatu", "Yemen", "Zimbabwe"], o = s[i], $(".js-setup-creditcard").toggleClass("is-vat-country", null != o), a = null != o ? "(" + o + ")" : "", n = t.parents(".js-setup-creditcard").find(".js-vat-help-text"), n.html(a), "United States of America" !== i ? ($(".js-setup-creditcard").addClass("is-international"), $(".js-select-state").removeAttr("required").val("")) : ($(".js-setup-creditcard").removeClass("is-international"), $(".js-select-state").attr("required", "required")), e.call(r, i) >= 0 ? ($(".js-postal-code-form").hide(), $(".js-postal-code-field").removeAttr("required").val("")) : ($(".js-postal-code-form").show(), $(".js-postal-code-field").attr("required", "required"))
  }, $(document).on("change", ".js-select-country", function () {
    return t($(this))
  }), $.observe(".js-select-country", function () {
    t($(this))
  })
}.call(this), function () {
  $(document).on("change", ".js-payment-methods .js-payment-method", function () {
    var t, e;
    return t = $(this).closest(".js-payment-methods"), e = $(this).attr("data-selected-tab"), t.find(".js-selected-payment-method").removeClass("active"), t.find("." + e).addClass("active")
  }), $.observe(".js-selected-payment-method:not(.active)", {add: function () {
    return $(this).addClass("has-removed-contents")
  }, remove: function () {
    return $(this).removeClass("has-removed-contents")
  }}), $.observe(".js-billing-payment-methods", function () {
    $(this).removeClass("disabled")
  })
}.call(this), function () {
  var t, e, n, i, r, s;
  t = 500, s = null, r = null, i = [], e = new Promise(function (t, e) {
    return $(window).on("load", function () {
      return t()
    })
  }), GitHub.stats = function (s) {
    return i.push(s), e.then(function () {
      return null != r ? r : r = setTimeout(n, t)
    })
  }, n = function () {
    var t;
    return null == s && (s = null != (t = document.querySelector("meta[name=browser-stats-url]")) ? t.getAttribute("content") : void 0), s && !window.isProxySite() ? (r = null,
      fetch(s, {method: "post", body: JSON.stringify(i), headers: {"Content-Type": "application/json"}}), i = []) : void 0
  }
}.call(this), function () {
  GitHub.stats({browserfeatures: {classlist_multi_arg: GitHub.support.classListMultiArg, classlist: GitHub.support.classList, closest: GitHub.support.closest, custom_elements: GitHub.support.registerElement, custom_event: GitHub.support.CustomEvent, emoji: GitHub.support.emoji, fetch: GitHub.support.fetch, matches: GitHub.support.matches, performance_getentries: GitHub.support.performanceGetEntries, performance_mark: GitHub.support.performanceMark, performance_now: GitHub.support.performanceNow, placeholder_input: GitHub.support.placeholder_input, placeholder_textarea: GitHub.support.placeholder_textarea, promise: GitHub.support.Promise, request_animation_frame: GitHub.support.requestAnimationFrame, setimmediate: GitHub.support.setImmediate, string_ends_with: GitHub.support.stringEndsWith, string_starts_with: GitHub.support.stringStartsWith, url: GitHub.support.URL, weakmap: GitHub.support.WeakMap}})
}.call(this), function () {
  var t, e;
  e = function () {
    var e, n, i, r, s, o;
    (i = function () {
      try {
        return localStorage.getItem("bundle-urls")
      } catch (t) {
      }
    }()) && (r = function () {
      try {
        return JSON.parse(i)
      } catch (t) {
      }
    }()), null == r && (r = {}), o = t();
    try {
      localStorage.setItem("bundle-urls", JSON.stringify(o))
    } catch (a) {
    }
    return n = function () {
      var t;
      t = [];
      for (e in o)s = o[e], r[e] !== s && t.push(e);
      return t
    }(), n.length ? GitHub.stats({downloadedbundles: n}) : void 0
  }, t = function () {
    var t, e, n, i, r, s, o, a, c, u, l;
    for (l = {}, a = $("script"), e = 0, i = a.length; i > e; e++)u = a[e], o = u.src.match(/\/([\w-]+)-[0-9a-f]{64}\.js$/), null != o && (t = o[1], l[t + ".js"] = u.src);
    for (c = $("link[rel=stylesheet]"), n = 0, r = c.length; r > n; n++)s = c[n], o = s.href.match(/\/([\w-]+)-[0-9a-f]{64}\.css$/), null != o && (t = o[1], l[t + ".css"] = s.href);
    return l
  }, $(window).on("load", e)
}.call(this), function () {
  $(document).on("click:prepare", ".btn.disabled", function (t) {
    t.preventDefault(), t.stopPropagation()
  })
}.call(this), function () {
  $.capitalize = function (t) {
    return t.replace(/\w+/g, function (t) {
      return"" + t[0].toUpperCase() + t.slice(1).toLowerCase()
    })
  }
}.call(this), function () {
  var t, e, n;
  t = function (t) {
    return $(t).closest(".js-check-all-container")[0] || document.body
  }, e = function (t, e, n, i) {
    null == i && (i = !1), e.indeterminate = i, e.checked !== n && (e.checked = n, $(e).fire("change", {relatedTarget: t, async: !0}))
  }, $(document).on("change", "input.js-check-all", function (n) {
    var i, r, s, o, a;
    if (!$(n.relatedTarget).is("input.js-check-all-item")) {
      for (i = $(t(this)), r = i.find("input.js-check-all-item"), s = 0, a = r.length; a > s; s++)o = r[s], e(this, o, this.checked);
      r.removeClass("is-last-changed")
    }
  }), n = null, $(document).on("mousedown", "input.js-check-all-item", function (t) {
    n = t.shiftKey
  }), $(document).on("change", "input.js-check-all-item", function (i) {
    var r, s, o, a, c, u, l, d, h, f, m, p, g, v, b, y;
    if (!$(i.relatedTarget).is("input.js-check-all, input.js-check-all-item")) {
      if (r = $(t(this)), o = r.find("input.js-check-all")[0], s = r.find("input.js-check-all-item"), n && (m = s.filter(".is-last-changed")[0]))for (a = s.toArray(), g = [a.indexOf(m), a.indexOf(this)].sort(), b = g[0], l = g[1], v = a.slice(b, +l + 1 || 9e9), d = 0, p = v.length; p > d; d++)f = v[d], e(this, f, this.checked);
      n = null, s.removeClass("is-last-changed"), $(this).addClass("is-last-changed"), y = s.length, u = function () {
        var t, e, n;
        for (n = [], t = 0, e = s.length; e > t; t++)f = s[t], f.checked && n.push(f);
        return n
      }().length, c = u === y, h = y > u && u > 0, e(this, o, c, h)
    }
  }), $(document).on("change", "input.js-check-all-item", function (e) {
    var n, i, r;
    n = $(t(this)), i = n.find(".js-check-all-count"), i.length && (r = n.find("input.js-check-all-item:checked").length, i.text(r))
  })
}.call(this), function () {
  var t;
  null == window.GitHub && (window.GitHub = {}), window.GitHub.assetHostUrl = null != (t = $("link[rel=assets]").prop("href")) ? t : "/"
}.call(this), function () {
  var t, e, n, i, r, s, o, a;
  i = function (t) {
    var e;
    return e = document.createElement("pre"), e.style.width = "1px", e.style.height = "1px", e.style.position = "fixed", e.style.top = "5px", e.textContent = t, e
  }, e = function (t) {
    var e, n;
    return n = getSelection(), n.removeAllRanges(), e = document.createRange(), e.selectNodeContents(t), n.addRange(e), document.execCommand("copy"), n.removeAllRanges()
  }, n = function (t) {
    var n;
    return n = i(t), document.body.appendChild(n), e(n), document.body.removeChild(n)
  }, t = function (t) {
    return t.select(), document.execCommand("copy"), getSelection().removeAllRanges()
  }, r = function (t, e, n) {
    var i;
    return t.addEventListener(e, i = function () {
      return t.removeEventListener(e, i), n.apply(this, arguments)
    })
  }, $(document).on("click", ".is-copy-enabled .js-zeroclipboard", function (i) {
    var s, a, c, u, l;
    (l = this.getAttribute("data-clipboard-text")) ? n(l) : (s = this.closest(".js-zeroclipboard-container"), a = s.querySelector(".js-zeroclipboard-target"), o(a) ? "hidden" === a.type ? n(a.value) : t(a) : e(a)), c = this.getAttribute("data-copied-hint"), u = this.getAttribute("aria-label"), c && c !== u && (this.setAttribute("aria-label", c), r(this, "mouseleave", function () {
      return null != u ? this.setAttribute("aria-label", u) : this.removeAttribute("aria-label")
    })), this.blur()
  }), o = function (t) {
    return"INPUT" === t.nodeName || "TEXTAREA" === t.nodeName
  }, document.documentElement.classList.contains("is-copy-enabled") || (ZeroClipboard.config({swfPath: GitHub.assetHostUrl + "static/flash/ZeroClipboard.v" + ZeroClipboard.version + ".swf", trustedOrigins: [location.hostname], flashLoadTimeout: 1e4, cacheBust: null != (a = /MSIE/.test(navigator.userAgent) || /Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/.test(navigator.userAgent)) ? a : {"true": !1}}), $(document).on("click", "#global-zeroclipboard-html-bridge", function (t) {
    t.stopImmediatePropagation()
  }), $.observe("button.js-zeroclipboard", s = function (t) {
    var e, n, i;
    i = new ZeroClipboard(t), i.on("copy", function (t) {
      var e, n, i, r, s;
      return e = t.target, null == e.getAttribute("data-clipboard-text") ? (r = $(e).closest(".js-zeroclipboard-container").find(".js-zeroclipboard-target")[0], r ? (s = o(r) ? r.value : r.textContent, n = t.clipboardData, n.setData("text/plain", s.trim())) : (i = new Error("source of clipboard text not found"), i.failbotContext = {eventType: "copy", eventTarget: e}, setImmediate(function () {
        throw i
      }))) : void 0
    }), i.on("aftercopy", function (e) {
      var n;
      return n = $(this).attr("data-copied-hint"), $("#global-zeroclipboard-html-bridge").attr("aria-label", n || "Copied!"), t.blur()
    }), i.on("error", function (t) {
      return $("#global-zeroclipboard-html-bridge, .js-zeroclipboard").remove(), $(".js-zeroclipboard-container").addClass("has-zeroclipboard-disabled")
    }), n = function () {
      var t;
      return this.classList.remove("tooltipped", "tooltipped-s"), t = $(this).attr("aria-label"), $("#global-zeroclipboard-html-bridge").addClass("tooltipped tooltipped-s").attr("aria-label", t || "Copy to clipboard.")
    }, e = function () {
      return $("#global-zeroclipboard-html-bridge").removeClass("tooltipped tooltipped-s")
    }, $(t).hover(n, e)
  }))
}.call(this), function () {
  $.commafy = function (t) {
    return("" + t).replace(/(^|[^\w.])(\d{4,})/g, function (t, e, n) {
      return e + n.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,")
    })
  }
}.call(this), function () {
  $(document).on("ajaxBeforeSend", ".js-new-comment-form", function (t) {
    return this === t.target && $(this).data("remote-xhr") ? !1 : void 0
  }), $(document).on("ajaxSend", ".js-new-comment-form", function (t) {
    return this === t.target ? $(this).find(".js-comment-form-error").hide() : void 0
  }), $(document).on("ajaxSuccess", ".js-new-comment-form", function (t, e, n, i) {
    var r, s, o, a;
    if (this === t.target) {
      this.reset(), $(this).find(".js-comment-field").trigger("validation:field:change"), $(this).find(".js-write-tab").click(), o = i.updateContent;
      for (a in o)s = o[a], r = $(a), r[0] || console.warn("couldn't find " + a + " for immediate update"), r.updateContent(s)
    }
  }), $(document).on("ajaxError", ".js-new-comment-form", function (t, e) {
    var n, i;
    if (this === t.target)return i = "Sorry! We couldn't save your comment", 422 === e.status && (n = JSON.parse(e.responseText), n.errors && (i += " \u2014 your comment ", i += " " + n.errors.join(", "))), i += ". ", i += "Please try again.", $(this).find(".js-comment-form-error").show().text(i), !1
  })
}.call(this), function () {
  $.observe(".js-comment-and-button", function () {
    var t, e, n, i, r;
    return t = this, e = t.form.querySelector(".js-comment-field"), n = t.textContent, r = !1, i = function () {
      var e;
      return e = this.value.trim(), e !== r ? (r = e, t.textContent = e ? t.getAttribute("data-comment-text") : n) : void 0
    }, {add: function () {
      return $(e).on("input change", i)
    }, remove: function () {
      return $(e).off("input change", i)
    }}
  })
}.call(this), function () {
  $(document).on("click", ".js-comment-edit-button", function () {
    var t;
    return t = $(this).closest(".js-comment"), t.addClass("is-comment-editing"), t.find(".js-write-tab").click(), t.find(".js-comment-field").focus().trigger("change"), !1
  }), $(document).on("click", ".js-comment-cancel-button", function () {
    var t;
    return t = $(this).closest("form"), t.hasDirtyFields() && !confirm($(this).attr("data-confirm-text")) ? !1 : (t[0].reset(), $(this).closest(".js-comment").removeClass("is-comment-editing"), !1)
  }), $(document).on("ajaxSend", ".js-comment-delete, .js-comment-update, .js-issue-update", function (t, e) {
    var n, i;
    if (t.target === t.currentTarget)return i = $(this).closest(".js-comment"), i.addClass("is-comment-loading"), i.find(".btn-sm").addClass("disabled"), (n = i.attr("data-body-version")) ? e.setRequestHeader("X-Body-Version", n) : void 0
  }), $(document).on("ajaxError", ".js-comment-update", function (t, e, n, i) {
    var r, s, o, a, c;
    if (t.target === t.currentTarget && (console.error("ajaxError for js-comment-update", i), 422 === e.status))try {
      if (o = JSON.parse(e.responseText), s = $(this).closest(".js-comment"), o.stale)return e.stale = !0, s.addClass("is-comment-stale"), s.find(".btn-sm").addClass("disabled"), t.preventDefault();
      if (o.errors)return c = "There was an error posting your comment: " + o.errors.join(", "), s.find(".js-comment-update-error").text(c).show(), t.preventDefault()
    } catch (a) {
      return r = a, console.error("Error trying to handle ajaxError for js-comment-update: " + r)
    }
  }), $(document).on("ajaxComplete", ".js-comment-delete, .js-comment-update", function (t, e, n) {
    var i;
    if (t.target === t.currentTarget)return i = $(this).closest(".js-comment"), i.removeClass("is-comment-loading"), i.find(".btn-sm").removeClass("disabled"), e.stale ? i.find(".form-actions button[type=submit].btn-sm").addClass("disabled") : void 0
  }), $(document).on("ajaxSuccess", ".js-comment-delete", function () {
    var t, e;
    return t = $(this).closest(".js-comment"), e = $(this).closest(".js-comment-container"), 1 !== e.find(".js-comment").length && (e = t), e.fadeOut(function () {
      return t.remove()
    })
  }), $(document).on("ajaxSuccess", ".js-comment-update", function (t, e, n, i) {
    var r, s, o, a, c, u;
    if (t.target === t.currentTarget) {
      for (r = $(this).closest(".js-comment"), s = $(this).closest(".js-comment-container"), s.length || (s = r), r.find(".js-comment-body").html(i.body), r.find(".js-comment-update-error").hide(), r.attr("data-body-version", i.newBodyVersion), u = r.find("input, textarea"), a = 0, c = u.length; c > a; a++)o = u[a], o.defaultValue = o.value;
      return r.removeClass("is-comment-editing")
    }
  }), $(document).on("ajaxSuccess", ".js-issue-update", function (t, e, n, i) {
    var r, s, o, a, c, u, l, d;
    for (o = this, r = o.closest(".js-details-container"), r.classList.remove("open"), null != i.issue_title && (r.querySelector(".js-issue-title").textContent = i.issue_title, c = r.closest(".js-issues-results"), l = c.querySelector(".js-merge-pull-request textarea"), l && l.value === l.defaultValue && (l.value = l.defaultValue = i.issue_title)), document.title = i.page_title, d = o.elements, a = 0, u = d.length; u > a; a++)s = d[a], s.defaultValue = s.value
  })
}.call(this), function () {
  $(document).on("focusin", ".js-write-bucket", function () {
    return $(this).addClass("focused")
  }), $(document).on("focusout", ".js-write-bucket", function () {
    return $(this).removeClass("focused")
  })
}.call(this), function () {
  var t, e, n, i, r, s, o, a, c, u, l, d;
  a = function (t, e) {
    return 0 === t.indexOf(e)
  }, e = function (t, e) {
    return t.lastIndexOf(e) === t.length - e.length
  }, r = function (t) {
    return t.trim().split("\n").length > 1
  }, d = function (t, e) {
    for (; t[e] && !t[e - 1].match(/\s/);)e--;
    return e
  }, l = function (t, e) {
    for (; t[e] && !t[e].match(/\s/);)e++;
    return e
  }, i = function (t, e) {
    var n, i, r, s;
    return s = e.text, r = e.selectionStart, i = e.selectionEnd, n = t.selectionStart, document.execCommand("insertText", !1, s), r && i ? t.setSelectionRange(r, i) : t.setSelectionRange(n, t.selectionEnd)
  }, c = function (e, n) {
    var s, a;
    return a = e.value.slice(e.selectionStart, e.selectionEnd), s = n.multiline && r(a) ? o(e, n) : t(e, n), i(e, s)
  }, t = function (t, e) {
    var n, i, s, o, a, c, u, h, f, m, p, g;
    return c = e.prefix, m = e.suffix, n = e.blockPrefix, i = e.blockSuffix, a = e.multiline, g = t.value.slice(t.selectionStart, t.selectionEnd), f = t.selectionStart, h = t.selectionEnd, u = r(g) && n.length > 0 ? n + "\n" : c, p = r(g) && i.length > 0 ? "\n" + i : m, o = t.selectionStart - u.length, t.value.slice(o, t.selectionStart) === u && (t.selectionStart = f = o), s = t.selectionEnd + p.length, t.value.slice(t.selectionEnd, s) === p && (t.selectionEnd = h = s), g = t.value.slice(t.selectionStart, t.selectionEnd), f === h && (t.selectionStart = d(t.value, f), t.selectionEnd = l(t.value, h), g = t.value.slice(t.selectionStart, t.selectionEnd)), g.startsWith(u) && g.endsWith(p) ? {text: g.slice(u.length, g.length - p.length), selectionStart: f, selectionEnd: h - u.length - p.length} : {text: u + g + p, selectionStart: f + u.length, selectionEnd: h + u.length}
  }, o = function (t, n) {
    var i, r, s, o, c, u, l, d, h, f;
    return u = n.prefix, l = n.suffix, i = n.blockPrefix, r = n.blockSuffix, c = n.multiline, d = t.value.slice(t.selectionStart, t.selectionEnd), o = d.split("\n"), h = function () {
      var t, n, i;
      for (i = [], t = 0, n = o.length; n > t; t++)s = o[t], i.push(a(s, u) && e(s, l));
      return i
    }(), f = h.every(function (t) {
      return t
    }), f ? (o = d.split("\n"), d = function () {
      var t, e, n;
      for (n = [], t = 0, e = o.length; e > t; t++)s = o[t], n.push(s.slice(u.length, s.length - l.length));
      return n
    }().join("\n")) : (o = d.split("\n"), d = function () {
      var t, e, n;
      for (n = [], t = 0, e = o.length; e > t; t++)s = o[t], n.push(u + s + l);
      return n
    }().join("\n")), {text: d}
  }, $(document).on("click", ".js-toolbar-item", function (t) {
    var e, n, i;
    return t.preventDefault(), $(this).menu("deactivate"), e = t.currentTarget.closest(".js-previewable-comment-form"), i = e.querySelector(".js-improved-comment-field"), n = {prefix: this.getAttribute("data-prefix") || "", suffix: this.getAttribute("data-suffix") || "", blockPrefix: this.getAttribute("data-block-prefix") || "", blockSuffix: this.getAttribute("data-block-suffix") || "", multiline: this.getAttribute("data-multiline") || !1}, i.focus(), c(i, n)
  }), s = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", u = new WeakMap, n = function (t) {
    var e, n, i, r, o, a;
    if (r = u.get(t))return r;
    for (r = {}, o = t.querySelectorAll(".js-toolbar-item[data-toolbar-hotkey]"), e = 0, i = o.length; i > e; e++)a = o[e], n = a.getAttribute("data-toolbar-hotkey"), r[s + "+" + n] = a;
    return u.set(t, r), r
  }, $(document).on("focus", ".js-improved-comment-field", function () {
    var t, e;
    if (!u.get(this))return u.set(this, !0), e = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"), t = n(e), $(this).on("keydown", function (e) {
      var n;
      (n = t[e.hotkey]) && ($(n).click(), e.preventDefault())
    })
  })
}.call(this), function () {
  var t, e, n, i, r, s, o, a;
  a = function (t) {
    var e;
    return null != (e = t.closest("form").elements.authenticity_token) ? e.value : void 0
  }, t = function (t) {
    var e, n, i, r, s, o;
    return e = t.closest(".js-previewable-comment-form"), i = t.classList.contains("js-preview-tab"), i && (s = e.querySelector(".js-write-bucket"), r = e.querySelector(".js-preview-body"), r.style.minHeight = $(s).height() + "px"), e.classList.toggle("preview-selected", i), e.classList.toggle("write-selected", !i), n = e.querySelector(".tabnav-tab.selected"), n.setAttribute("aria-selected", !1), n.classList.remove("selected"), t.classList.add("selected"), t.setAttribute("aria-selected", !0), o = e.querySelector(".js-write-tab"), i ? o.setAttribute("data-hotkey", "ctrl+P,meta+P") : o.removeAttribute("data-hotkey"), Promise.resolve(e)
  }, $(document).on("click", ".js-write-tab", function () {
    var e;
    return t(this).then(function (t) {
      return t.querySelector(".js-comment-field").focus()
    }), e = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"), null != e && e.classList.remove("hidden"), !1
  }), $(document).on("click", ".js-preview-tab", function (e) {
    var n;
    return t(this).then(function (t) {
      return o(t, e.timeStamp)
    }), n = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"), null != n && n.classList.add("hidden"), !1
  }), $(document).on("preview:render", ".js-previewable-comment-form", function (e) {
    var n;
    return n = this.querySelector(".js-preview-tab"), t(n).then(function (t) {
      var n;
      return n = e.originalEvent.detail.requestedAt || e.timeStamp, o(t, n)
    })
  }), s = new SlidingPromiseQueue, r = new WeakMap, i = !1, e = function (t, e) {
    var o, c, u, l, d;
    return d = {url: t.getAttribute("data-preview-url"), data: {text: e, authenticity_token: a(t)}, headers: {"content-type": "application/x-www-form-urlencoded; charset=UTF-8"}}, (c = !t.dispatchEvent(new CustomEvent("preview:setup", {bubbles: !0, cancelable: !0, detail: d}))) ? Promise.reject(new Error("preview canceled")) : (e = JSON.stringify(d), (o = r.get(t)) && (u = o[0], l = o[1]), u !== e && (i = !1, l = s.push(n(d)), l.then(function () {
      return i = !0
    }), r.set(t, [e, l])), l)
  }, n = function (t) {
    return $.fetchText(t.url, {method: "POST", body: $.param(t.data), headers: t.headers})
  }, o = function (t, n) {
    var r, s;
    return s = t.querySelector(".js-comment-field"), r = t.querySelector(".comment-body"), e(t, s.value).then(function (t) {
      var e;
      return r.innerHTML = t || "<p>Nothing to preview</p>", e = new Date - n, GitHub.stats({preview_delay: {ms: e, background: !1}})
    }), i ? void 0 : r.innerHTML = "<p>Loading preview&hellip;</p>"
  }, $.observe(".js-preview-tab", function () {
    var t, n;
    n = this.closest(".js-previewable-comment-form"), t = n.querySelector(".js-comment-field"), $(this).on("mouseenter", function () {
      return e(n, t.value)
    })
  }), $(document).onFocusedKeydown(".js-comment-field", function (t) {
    var e;
    return e = this.closest(".js-previewable-comment-form"), function (t) {
      return"ctrl+P" !== t.hotkey && "meta+P" !== t.hotkey || !e.classList.contains("write-selected") ? void 0 : (this.blur(), e.dispatchEvent(new CustomEvent("preview:render", {bubbles: !0, cancelable: !1, detail: {requestedAt: t.timeStamp}})), t.stopImmediatePropagation(), !1)
    }
  })
}.call(this), function () {
  $(document).on("pjax:send", ".context-loader-container", function () {
    var t;
    return t = $(this).find(".context-loader").first(), $(this).is(".js-repo-nav-next") && (t = $()), t.length ? t.addClass("is-context-loading") : $(".page-context-loader").addClass("is-context-loading")
  }), $(document).on("pjax:complete", ".context-loader-container", function (t) {
    return $(t.target).find(".context-loader").first().removeClass("is-context-loading"), $(".page-context-loader").removeClass("is-context-loading"), $(document.body).removeClass("disables-context-loader")
  }), $(document).on("pjax:timeout", ".context-loader-container", function () {
    return!1
  })
}.call(this), function () {
  $.hashChange(function (t) {
    var e;
    return e = window.location.hash.slice(1), e && /\/(issues|pulls?)\/\d+/.test(t.newURL) ? GitHub.stats({conversation_anchor: {anchor: e, matches_element: t.target !== window}}) : void 0
  })
}.call(this), function (t) {
  t.Jcrop = function (e, n) {
    function i(t) {
      return Math.round(t) + "px"
    }

    function r(t) {
      return H.baseClass + "-" + t
    }

    function s() {
      return t.fx.step.hasOwnProperty("backgroundColor")
    }

    function o(e) {
      var n = t(e).offset();
      return[n.left, n.top]
    }

    function a(t) {
      return[t.pageX - P[0], t.pageY - P[1]]
    }

    function c(e) {
      "object" != typeof e && (e = {}), H = t.extend(H, e), t.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (t, e) {
        "function" != typeof H[e] && (H[e] = function () {
        })
      })
    }

    function u(t, e, n) {
      if (P = o(B), mt.setCursor("move" === t ? t : t + "-resize"), "move" === t)return mt.activateHandlers(d(e), g, n);
      var i = dt.getFixed(), r = h(t), s = dt.getCorner(h(r));
      dt.setPressed(dt.getCorner(r)), dt.setCurrent(s), mt.activateHandlers(l(t, i), g, n)
    }

    function l(t, e) {
      return function (n) {
        if (H.aspectRatio)switch (t) {
          case"e":
            n[1] = e.y + 1;
            break;
          case"w":
            n[1] = e.y + 1;
            break;
          case"n":
            n[0] = e.x + 1;
            break;
          case"s":
            n[0] = e.x + 1
        } else switch (t) {
          case"e":
            n[1] = e.y2;
            break;
          case"w":
            n[1] = e.y2;
            break;
          case"n":
            n[0] = e.x2;
            break;
          case"s":
            n[0] = e.x2
        }
        dt.setCurrent(n), ft.update()
      }
    }

    function d(t) {
      var e = t;
      return pt.watchKeys(), function (t) {
        dt.moveOffset([t[0] - e[0], t[1] - e[1]]), e = t, ft.update()
      }
    }

    function h(t) {
      switch (t) {
        case"n":
          return"sw";
        case"s":
          return"nw";
        case"e":
          return"nw";
        case"w":
          return"ne";
        case"ne":
          return"sw";
        case"nw":
          return"se";
        case"se":
          return"nw";
        case"sw":
          return"ne"
      }
    }

    function f(t) {
      return function (e) {
        return H.disabled ? !1 : "move" !== t || H.allowMove ? (P = o(B), it = !0, u(t, a(e)), e.stopPropagation(), e.preventDefault(), !1) : !1
      }
    }

    function m(t, e, n) {
      var i = t.width(), r = t.height();
      i > e && e > 0 && (i = e, r = e / t.width() * t.height()), r > n && n > 0 && (r = n, i = n / t.height() * t.width()), et = t.width() / i, nt = t.height() / r, t.width(i).height(r)
    }

    function p(t) {
      return{x: t.x * et, y: t.y * nt, x2: t.x2 * et, y2: t.y2 * nt, w: t.w * et, h: t.h * nt}
    }

    function g(t) {
      var e = dt.getFixed();
      e.w > H.minSelect[0] && e.h > H.minSelect[1] ? (ft.enableHandles(), ft.done()) : ft.release(), mt.setCursor(H.allowSelect ? "crosshair" : "default")
    }

    function v(t) {
      if (H.disabled)return!1;
      if (!H.allowSelect)return!1;
      it = !0, P = o(B), ft.disableHandles(), mt.setCursor("crosshair");
      var e = a(t);
      return dt.setPressed(e), ft.update(), mt.activateHandlers($, g, "touch" === t.type.substring(0, 5)), pt.watchKeys(), t.stopPropagation(), t.preventDefault(), !1
    }

    function $(t) {
      dt.setCurrent(t), ft.update()
    }

    function b() {
      var e = t("<div></div>").addClass(r("tracker"));
      return M && e.css({opacity: 0, backgroundColor: "white"}), e
    }

    function y(t) {
      G.removeClass().addClass(r("holder")).addClass(t)
    }

    function j(t, e) {
      function n() {
        window.setTimeout($, d)
      }

      var i = t[0] / et, r = t[1] / nt, s = t[2] / et, o = t[3] / nt;
      if (!rt) {
        var a = dt.flipCoords(i, r, s, o), c = dt.getFixed(), u = [c.x, c.y, c.x2, c.y2], l = u, d = H.animationDelay, h = a[0] - u[0], f = a[1] - u[1], m = a[2] - u[2], p = a[3] - u[3], g = 0, v = H.swingSpeed;
        i = l[0], r = l[1], s = l[2], o = l[3], ft.animMode(!0);
        var $ = function () {
          return function () {
            g += (100 - g) / v, l[0] = Math.round(i + g / 100 * h), l[1] = Math.round(r + g / 100 * f), l[2] = Math.round(s + g / 100 * m), l[3] = Math.round(o + g / 100 * p), g >= 99.8 && (g = 100), 100 > g ? (x(l), n()) : (ft.done(), ft.animMode(!1), "function" == typeof e && e.call(gt))
          }
        }();
        n()
      }
    }

    function w(t) {
      x([t[0] / et, t[1] / nt, t[2] / et, t[3] / nt]), H.onSelect.call(gt, p(dt.getFixed())), ft.enableHandles()
    }

    function x(t) {
      dt.setPressed([t[0], t[1]]), dt.setCurrent([t[2], t[3]]), ft.update()
    }

    function k() {
      return p(dt.getFixed())
    }

    function C() {
      return dt.getFixed()
    }

    function S(t) {
      c(t), D()
    }

    function L() {
      H.disabled = !0, ft.disableHandles(), ft.setCursor("default"), mt.setCursor("default")
    }

    function T() {
      H.disabled = !1, D()
    }

    function A() {
      ft.done(), mt.activateHandlers(null, null)
    }

    function E() {
      G.remove(), N.show(), N.css("visibility", "visible"), t(e).removeData("Jcrop")
    }

    function _(t, e) {
      ft.release(), L();
      var n = new Image;
      n.onload = function () {
        var i = n.width, r = n.height, s = H.boxWidth, o = H.boxHeight;
        B.width(i).height(r), B.attr("src", t), Y.attr("src", t), m(B, s, o), U = B.width(), W = B.height(), Y.width(U).height(W), at.width(U + 2 * ot).height(W + 2 * ot), G.width(U).height(W), ht.resize(U, W), T(), "function" == typeof e && e.call(gt)
      }, n.src = t
    }

    function q(t, e, n) {
      var i = e || H.bgColor;
      H.bgFade && s() && H.fadeTime && !n ? t.animate({backgroundColor: i}, {queue: !1, duration: H.fadeTime}) : t.css("backgroundColor", i)
    }

    function D(t) {
      H.allowResize ? t ? ft.enableOnly() : ft.enableHandles() : ft.disableHandles(), mt.setCursor(H.allowSelect ? "crosshair" : "default"), ft.setCursor(H.allowMove ? "move" : "default"), H.hasOwnProperty("trueSize") && (et = H.trueSize[0] / U, nt = H.trueSize[1] / W), H.hasOwnProperty("setSelect") && (w(H.setSelect), ft.done(), delete H.setSelect), ht.refresh(), H.bgColor != ct && (q(H.shade ? ht.getShades() : G, H.shade ? H.shadeColor || H.bgColor : H.bgColor), ct = H.bgColor), ut != H.bgOpacity && (ut = H.bgOpacity, H.shade ? ht.refresh() : ft.setBgOpacity(ut)), X = H.maxSize[0] || 0, Q = H.maxSize[1] || 0, Z = H.minSize[0] || 0, tt = H.minSize[1] || 0, H.hasOwnProperty("outerImage") && (B.attr("src", H.outerImage), delete H.outerImage), ft.refresh()
    }

    var P, H = t.extend({}, t.Jcrop.defaults), I = navigator.userAgent.toLowerCase(), M = /msie/.test(I), R = /msie [1-6]\./.test(I);
    "object" != typeof e && (e = t(e)[0]), "object" != typeof n && (n = {}), c(n);
    var O = {border: "none", visibility: "visible", margin: 0, padding: 0, position: "absolute", top: 0, left: 0}, N = t(e), F = !0;
    if ("IMG" == e.tagName) {
      if (0 != N[0].width && 0 != N[0].height)N.width(N[0].width), N.height(N[0].height); else {
        var z = new Image;
        z.src = N[0].src, N.width(z.width), N.height(z.height)
      }
      var B = N.clone().removeAttr("id").css(O).show();
      B.width(N.width()), B.height(N.height()), N.after(B).hide()
    } else B = N.css(O).show(), F = !1, null === H.shade && (H.shade = !0);
    m(B, H.boxWidth, H.boxHeight);
    var U = B.width(), W = B.height(), G = t("<div />").width(U).height(W).addClass(r("holder")).css({position: "relative", backgroundColor: H.bgColor}).insertAfter(N).append(B);
    H.addClass && G.addClass(H.addClass);
    var Y = t("<div />"), J = t("<div />").width("100%").height("100%").css({zIndex: 310, position: "absolute", overflow: "hidden"}), V = t("<div />").width("100%").height("100%").css("zIndex", 320), K = t("<div />").css({position: "absolute", zIndex: 600}).dblclick(function () {
      var t = dt.getFixed();
      H.onDblClick.call(gt, t)
    }).insertBefore(B).append(J, V);
    F && (Y = t("<img />").attr("src", B.attr("src")).css(O).width(U).height(W), J.append(Y)), R && K.css({overflowY: "hidden"});
    var X, Q, Z, tt, et, nt, it, rt, st, ot = H.boundary, at = b().width(U + 2 * ot).height(W + 2 * ot).css({position: "absolute", top: i(-ot), left: i(-ot), zIndex: 290}).mousedown(v), ct = H.bgColor, ut = H.bgOpacity;
    P = o(B);
    var lt = function () {
      function t() {
        var t, e = {}, n = ["touchstart", "touchmove", "touchend"], i = document.createElement("div");
        try {
          for (t = 0; t < n.length; t++) {
            var r = n[t];
            r = "on" + r;
            var s = r in i;
            s || (i.setAttribute(r, "return;"), s = "function" == typeof i[r]), e[n[t]] = s
          }
          return e.touchstart && e.touchend && e.touchmove
        } catch (o) {
          return!1
        }
      }

      function e() {
        return H.touchSupport === !0 || H.touchSupport === !1 ? H.touchSupport : t()
      }

      return{createDragger: function (t) {
        return function (e) {
          return H.disabled ? !1 : "move" !== t || H.allowMove ? (P = o(B), it = !0, u(t, a(lt.cfilter(e)), !0), e.stopPropagation(), e.preventDefault(), !1) : !1
        }
      }, newSelection: function (t) {
        return v(lt.cfilter(t))
      }, cfilter: function (t) {
        return t.pageX = t.originalEvent.changedTouches[0].pageX, t.pageY = t.originalEvent.changedTouches[0].pageY, t
      }, isSupported: t, support: e()}
    }(), dt = function () {
      function t(t) {
        t = o(t), m = h = t[0], p = f = t[1]
      }

      function e(t) {
        t = o(t), l = t[0] - m, d = t[1] - p, m = t[0], p = t[1]
      }

      function n() {
        return[l, d]
      }

      function i(t) {
        var e = t[0], n = t[1];
        0 > h + e && (e -= e + h), 0 > f + n && (n -= n + f), p + n > W && (n += W - (p + n)), m + e > U && (e += U - (m + e)), h += e, m += e, f += n, p += n
      }

      function r(t) {
        var e = s();
        switch (t) {
          case"ne":
            return[e.x2, e.y];
          case"nw":
            return[e.x, e.y];
          case"se":
            return[e.x2, e.y2];
          case"sw":
            return[e.x, e.y2]
        }
      }

      function s() {
        if (!H.aspectRatio)return c();
        var t, e, n, i, r = H.aspectRatio, s = H.minSize[0] / et, o = H.maxSize[0] / et, l = H.maxSize[1] / nt, d = m - h, g = p - f, v = Math.abs(d), $ = Math.abs(g), b = v / $;
        return 0 === o && (o = 10 * U), 0 === l && (l = 10 * W), r > b ? (e = p, n = $ * r, t = 0 > d ? h - n : n + h, 0 > t ? (t = 0, i = Math.abs((t - h) / r), e = 0 > g ? f - i : i + f) : t > U && (t = U, i = Math.abs((t - h) / r), e = 0 > g ? f - i : i + f)) : (t = m, i = v / r, e = 0 > g ? f - i : f + i, 0 > e ? (e = 0, n = Math.abs((e - f) * r), t = 0 > d ? h - n : n + h) : e > W && (e = W, n = Math.abs(e - f) * r, t = 0 > d ? h - n : n + h)), t > h ? (s > t - h ? t = h + s : t - h > o && (t = h + o), e = e > f ? f + (t - h) / r : f - (t - h) / r) : h > t && (s > h - t ? t = h - s : h - t > o && (t = h - o), e = e > f ? f + (h - t) / r : f - (h - t) / r), 0 > t ? (h -= t, t = 0) : t > U && (h -= t - U, t = U), 0 > e ? (f -= e, e = 0) : e > W && (f -= e - W, e = W), u(a(h, f, t, e))
      }

      function o(t) {
        return t[0] < 0 && (t[0] = 0), t[1] < 0 && (t[1] = 0), t[0] > U && (t[0] = U), t[1] > W && (t[1] = W), [Math.round(t[0]), Math.round(t[1])]
      }

      function a(t, e, n, i) {
        var r = t, s = n, o = e, a = i;
        return t > n && (r = n, s = t), e > i && (o = i, a = e), [r, o, s, a]
      }

      function c() {
        var t, e = m - h, n = p - f;
        return X && Math.abs(e) > X && (m = e > 0 ? h + X : h - X), Q && Math.abs(n) > Q && (p = n > 0 ? f + Q : f - Q), tt / nt && Math.abs(n) < tt / nt && (p = n > 0 ? f + tt / nt : f - tt / nt), Z / et && Math.abs(e) < Z / et && (m = e > 0 ? h + Z / et : h - Z / et), 0 > h && (m -= h, h -= h), 0 > f && (p -= f, f -= f), 0 > m && (h -= m, m -= m), 0 > p && (f -= p, p -= p), m > U && (t = m - U, h -= t, m -= t), p > W && (t = p - W, f -= t, p -= t), h > U && (t = h - W, p -= t, f -= t), f > W && (t = f - W, p -= t, f -= t), u(a(h, f, m, p))
      }

      function u(t) {
        return{x: t[0], y: t[1], x2: t[2], y2: t[3], w: t[2] - t[0], h: t[3] - t[1]}
      }

      var l, d, h = 0, f = 0, m = 0, p = 0;
      return{flipCoords: a, setPressed: t, setCurrent: e, getOffset: n, moveOffset: i, getCorner: r, getFixed: s}
    }(), ht = function () {
      function e(t, e) {
        m.left.css({height: i(e)}), m.right.css({height: i(e)})
      }

      function n() {
        return r(dt.getFixed())
      }

      function r(t) {
        m.top.css({left: i(t.x), width: i(t.w), height: i(t.y)}), m.bottom.css({top: i(t.y2), left: i(t.x), width: i(t.w), height: i(W - t.y2)}), m.right.css({left: i(t.x2), width: i(U - t.x2)}), m.left.css({width: i(t.x)})
      }

      function s() {
        return t("<div />").css({position: "absolute", backgroundColor: H.shadeColor || H.bgColor}).appendTo(f)
      }

      function o() {
        h || (h = !0, f.insertBefore(B), n(), ft.setBgOpacity(1, 0, 1), Y.hide(), a(H.shadeColor || H.bgColor, 1), ft.isAwake() ? u(H.bgOpacity, 1) : u(1, 1))
      }

      function a(t, e) {
        q(d(), t, e)
      }

      function c() {
        h && (f.remove(), Y.show(), h = !1, ft.isAwake() ? ft.setBgOpacity(H.bgOpacity, 1, 1) : (ft.setBgOpacity(1, 1, 1), ft.disableHandles()), q(G, 0, 1))
      }

      function u(t, e) {
        h && (H.bgFade && !e ? f.animate({opacity: 1 - t}, {queue: !1, duration: H.fadeTime}) : f.css({opacity: 1 - t}))
      }

      function l() {
        H.shade ? o() : c(), ft.isAwake() && u(H.bgOpacity)
      }

      function d() {
        return f.children()
      }

      var h = !1, f = t("<div />").css({position: "absolute", zIndex: 240, opacity: 0}), m = {top: s(), left: s().height(W), right: s().height(W), bottom: s()};
      return{update: n, updateRaw: r, getShades: d, setBgColor: a, enable: o, disable: c, resize: e, refresh: l, opacity: u}
    }(), ft = function () {
      function e(e) {
        var n = t("<div />").css({position: "absolute", opacity: H.borderOpacity}).addClass(r(e));
        return J.append(n), n
      }

      function n(e, n) {
        var i = t("<div />").mousedown(f(e)).css({cursor: e + "-resize", position: "absolute", zIndex: n}).addClass("ord-" + e);
        return lt.support && i.bind("touchstart.jcrop", lt.createDragger(e)), V.append(i), i
      }

      function s(t) {
        var e = H.handleSize, i = n(t, L++).css({opacity: H.handleOpacity}).addClass(r("handle"));
        return e && i.width(e).height(e), i
      }

      function o(t) {
        return n(t, L++).addClass("jcrop-dragbar")
      }

      function a(t) {
        var e;
        for (e = 0; e < t.length; e++)E[t[e]] = o(t[e])
      }

      function c(t) {
        var n, i;
        for (i = 0; i < t.length; i++) {
          switch (t[i]) {
            case"n":
              n = "hline";
              break;
            case"s":
              n = "hline bottom";
              break;
            case"e":
              n = "vline right";
              break;
            case"w":
              n = "vline"
          }
          T[t[i]] = e(n)
        }
      }

      function u(t) {
        var e;
        for (e = 0; e < t.length; e++)A[t[e]] = s(t[e])
      }

      function l(t, e) {
        H.shade || Y.css({top: i(-e), left: i(-t)}), K.css({top: i(e), left: i(t)})
      }

      function d(t, e) {
        K.width(Math.round(t)).height(Math.round(e))
      }

      function h() {
        var t = dt.getFixed();
        dt.setPressed([t.x, t.y]), dt.setCurrent([t.x2, t.y2]), m()
      }

      function m(t) {
        return S ? g(t) : void 0
      }

      function g(t) {
        var e = dt.getFixed();
        d(e.w, e.h), l(e.x, e.y), H.shade && ht.updateRaw(e), S || $(), t ? H.onSelect.call(gt, p(e)) : H.onChange.call(gt, p(e))
      }

      function v(t, e, n) {
        (S || e) && (H.bgFade && !n ? B.animate({opacity: t}, {queue: !1, duration: H.fadeTime}) : B.css("opacity", t))
      }

      function $() {
        K.show(), H.shade ? ht.opacity(ut) : v(ut, !0), S = !0
      }

      function y() {
        x(), K.hide(), H.shade ? ht.opacity(1) : v(1), S = !1, H.onRelease.call(gt)
      }

      function j() {
        _ && V.show()
      }

      function w() {
        return _ = !0, H.allowResize ? (V.show(), !0) : void 0
      }

      function x() {
        _ = !1, V.hide()
      }

      function k(t) {
        t ? (rt = !0, x()) : (rt = !1, w())
      }

      function C() {
        k(!1), h()
      }

      var S, L = 370, T = {}, A = {}, E = {}, _ = !1;
      H.dragEdges && t.isArray(H.createDragbars) && a(H.createDragbars), t.isArray(H.createHandles) && u(H.createHandles), H.drawBorders && t.isArray(H.createBorders) && c(H.createBorders), t(document).bind("touchstart.jcrop-ios", function (e) {
        t(e.currentTarget).hasClass("jcrop-tracker") && e.stopPropagation()
      });
      var q = b().mousedown(f("move")).css({cursor: "move", position: "absolute", zIndex: 360});
      return lt.support && q.bind("touchstart.jcrop", lt.createDragger("move")), J.append(q), x(), {updateVisible: m, update: g, release: y, refresh: h, isAwake: function () {
        return S
      }, setCursor: function (t) {
        q.css("cursor", t)
      }, enableHandles: w, enableOnly: function () {
        _ = !0
      }, showHandles: j, disableHandles: x, animMode: k, setBgOpacity: v, done: C}
    }(), mt = function () {
      function e(e) {
        at.css({zIndex: 450}), e ? t(document).bind("touchmove.jcrop", o).bind("touchend.jcrop", c) : h && t(document).bind("mousemove.jcrop", i).bind("mouseup.jcrop", r)
      }

      function n() {
        at.css({zIndex: 290}), t(document).unbind(".jcrop")
      }

      function i(t) {
        return l(a(t)), !1
      }

      function r(t) {
        return t.preventDefault(), t.stopPropagation(), it && (it = !1, d(a(t)), ft.isAwake() && H.onSelect.call(gt, p(dt.getFixed())), n(), l = function () {
        }, d = function () {
        }), !1
      }

      function s(t, n, i) {
        return it = !0, l = t, d = n, e(i), !1
      }

      function o(t) {
        return l(a(lt.cfilter(t))), !1
      }

      function c(t) {
        return r(lt.cfilter(t))
      }

      function u(t) {
        at.css("cursor", t)
      }

      var l = function () {
      }, d = function () {
      }, h = H.trackDocument;
      return h || at.mousemove(i).mouseup(r).mouseout(r), B.before(at), {activateHandlers: s, setCursor: u}
    }(), pt = function () {
      function e() {
        H.keySupport && (s.show(), s.focus())
      }

      function n(t) {
        s.hide()
      }

      function i(t, e, n) {
        H.allowMove && (dt.moveOffset([e, n]), ft.updateVisible(!0)), t.preventDefault(), t.stopPropagation()
      }

      function r(t) {
        if (t.ctrlKey || t.metaKey)return!0;
        st = t.shiftKey ? !0 : !1;
        var e = st ? 10 : 1;
        switch (t.keyCode) {
          case 37:
            i(t, -e, 0);
            break;
          case 39:
            i(t, e, 0);
            break;
          case 38:
            i(t, 0, -e);
            break;
          case 40:
            i(t, 0, e);
            break;
          case 27:
            H.allowSelect && ft.release();
            break;
          case 9:
            return!0
        }
        return!1
      }

      var s = t('<input type="radio" />').css({position: "fixed", left: "-120px", width: "12px"}).addClass("jcrop-keymgr"), o = t("<div />").css({position: "absolute", overflow: "hidden"}).append(s);
      return H.keySupport && (s.keydown(r).blur(n), R || !H.fixedSupport ? (s.css({
        position: "absolute", left: "-20px"}), o.append(s).insertBefore(B)) : s.insertBefore(B)), {watchKeys: e}
    }();
    lt.support && at.bind("touchstart.jcrop", lt.newSelection), V.hide(), D(!0);
    var gt = {setImage: _, animateTo: j, setSelect: w, setOptions: S, tellSelect: k, tellScaled: C, setClass: y, disable: L, enable: T, cancel: A, release: ft.release, destroy: E, focus: pt.watchKeys, getBounds: function () {
      return[U * et, W * nt]
    }, getWidgetSize: function () {
      return[U, W]
    }, getScaleFactor: function () {
      return[et, nt]
    }, getOptions: function () {
      return H
    }, ui: {holder: G, selection: K}};
    return M && G.bind("selectstart", function () {
      return!1
    }), N.data("Jcrop", gt), gt
  }, t.fn.Jcrop = function (e, n) {
    var i;
    return this.each(function () {
      if (t(this).data("Jcrop")) {
        if ("api" === e)return t(this).data("Jcrop");
        t(this).data("Jcrop").setOptions(e)
      } else"IMG" == this.tagName ? t.Jcrop.Loader(this, function () {
        t(this).css({display: "block", visibility: "hidden"}), i = t.Jcrop(this, e), t.isFunction(n) && n.call(i)
      }) : (t(this).css({display: "block", visibility: "hidden"}), i = t.Jcrop(this, e), t.isFunction(n) && n.call(i))
    }), this
  }, t.Jcrop.Loader = function (e, n, i) {
    function r() {
      o.complete ? (s.unbind(".jcloader"), t.isFunction(n) && n.call(o)) : window.setTimeout(r, 50)
    }

    var s = t(e), o = s[0];
    s.bind("load.jcloader", r).bind("error.jcloader", function (e) {
      s.unbind(".jcloader"), t.isFunction(i) && i.call(o)
    }), o.complete && t.isFunction(n) && (s.unbind(".jcloader"), n.call(o))
  }, t.Jcrop.defaults = {allowSelect: !0, allowMove: !0, allowResize: !0, trackDocument: !0, baseClass: "jcrop", addClass: null, bgColor: "black", bgOpacity: .6, bgFade: !1, borderOpacity: .4, handleOpacity: .5, handleSize: null, aspectRatio: 0, keySupport: !0, createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"], createDragbars: ["n", "s", "e", "w"], createBorders: ["n", "s", "e", "w"], drawBorders: !0, dragEdges: !0, fixedSupport: !0, touchSupport: null, shade: null, boxWidth: 0, boxHeight: 0, boundary: 2, fadeTime: 400, animationDelay: 20, swingSpeed: 3, minSelect: [0, 0], maxSize: [0, 0], minSize: [0, 0], onChange: function () {
  }, onSelect: function () {
  }, onDblClick: function () {
  }, onRelease: function () {
  }}
}(jQuery), function () {
  var t, e = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  };
  t = function () {
    function t(t) {
      this.clearCropFormValues = e(this.clearCropFormValues, this), this.setCropFormValues = e(this.setCropFormValues, this), this.setCurrentSelection = e(this.setCurrentSelection, this), this.setTrueSize = e(this.setTrueSize, this);
      var n, i, r;
      this.container = $(t), this.spinner = this.container.find(".profile-picture-spinner"), this.img = this.container.find(".js-croppable-avatar"), this.croppedX = this.container.find(".js-crop-cropped-x"), this.croppedY = this.container.find(".js-crop-cropped-y"), this.croppedW = this.container.find(".js-crop-cropped-width"), this.croppedH = this.container.find(".js-crop-cropped-height"), n = this.img.parent("div").width(), r = {aspectRatio: 1, onSelect: this.setCropFormValues, onRelease: this.clearCropFormValues, bgColor: "", maxSize: [3e3, 3e3], boxWidth: n, boxHeight: n}, this.setTrueSize(r), this.setCurrentSelection(r), i = this, this.img.Jcrop(r, function () {
        return i.spinner.addClass("hidden"), i.jcrop = this
      })
    }

    return t.prototype.setTrueSize = function (t) {
      var e, n;
      return n = parseInt(this.img.attr("data-true-width")), e = parseInt(this.img.attr("data-true-height")), 0 !== n && 0 !== e ? t.trueSize = [n, e] : void 0
    }, t.prototype.setCurrentSelection = function (t) {
      var e, n, i, r;
      return n = parseInt(this.croppedW.val()), e = parseInt(this.croppedH.val()), 0 !== n && 0 !== e ? (i = parseInt(this.croppedX.val()), r = parseInt(this.croppedY.val()), t.setSelect = [i, r, i + n, r + e]) : void 0
    }, t.prototype.setCropFormValues = function (t) {
      return this.croppedX.val(t.x), this.croppedY.val(t.y), this.croppedW.val(t.w), this.croppedH.val(t.h)
    }, t.prototype.clearCropFormValues = function () {
      return this.croppedX.val("0"), this.croppedY.val("0"), this.croppedW.val("0"), this.croppedH.val("0")
    }, t
  }(), $.observe(".js-croppable-container", {add: function (e) {
    return new t(e)
  }}), $(document).on("afterClose.facebox", function () {
    return $(".js-avatar-field").val("")
  })
}.call(this), function () {
  var t;
  $.fn.scrollBy = function (e, n) {
    var i, r;
    return 0 === e && 0 === n ? [0, 0] : (r = t(this[0]), this.scrollTo({top: r.top + n, left: r.left + e}), i = t(this[0]), [i.left - r.left, i.top - r.top])
  }, t = function (t) {
    return t.offsetParent ? {top: $(t).scrollTop(), left: $(t).scrollLeft()} : {top: $(document).scrollTop(), left: $(document).scrollLeft()}
  }
}.call(this), function () {
  $.fn.cumulativeScrollBy = function (t, e) {
    var n, i, r, s, o, a;
    for (i = r = 0, n = this.overflowParent(); n[0] && (s = n.scrollBy(t - i, e - r), o = s[0], a = s[1], i += o, r += a, i !== t || r !== e);)n = n.overflowParent()
  }
}.call(this), function () {
  window.d3Ready = function () {
    return"undefined" != typeof d3 && null !== d3 ? Promise.resolve() : new Promise(function (t, e) {
      return document.addEventListener("graph-lib:loaded", function () {
        return t()
      })
    })
  }
}.call(this), function () {
  var t, e, n;
  e = "ontransitionend"in window, $.fn.performTransition = function (i) {
    var r, s, o, a, c, u, l, d;
    if (!e)return void i.apply(this);
    for (o = this.find(".js-transitionable"), o = o.add(this.filter(".js-transitionable")), a = 0, u = o.length; u > a; a++)s = o[a], r = $(s), d = t(s), r.one("transitionend", function () {
      return s.style.display = null, s.style.visibility = null, d ? n(s, function () {
        return s.style.height = null
      }) : void 0
    }), s.style.display = "block", s.style.visibility = "visible", d && n(s, function () {
      return s.style.height = r.height() + "px"
    }), s.offsetHeight;
    for (i.apply(this), c = 0, l = o.length; l > c; c++)s = o[c], t(s) && (0 === $(s).height() ? s.style.height = s.scrollHeight + "px" : s.style.height = "0px");
    return this
  }, t = function (t) {
    return"height" === $(t).css("transitionProperty")
  }, n = function (t, e) {
    t.style.transition = "none", e(t), t.offsetHeight, t.style.transition = null
  }
}.call(this), function () {
  $(document).on("click", ".js-details-container .js-details-target", function (t) {
    var e, n;
    n = $(this), e = n.closest(".js-details-container"), n.fire("details:toggle", {relatedTarget: t.target}, function () {
      e.performTransition(function () {
        this.toggleClass("open"), this.fire("details:toggled", {relatedTarget: t.target, async: !0})
      }), t.preventDefault()
    })
  }), $(document).on("details:toggled", function (t) {
    var e, n, i;
    n = t.target, i = t.relatedTarget, e = $(n).find("input[autofocus], textarea[autofocus]").last()[0], e && document.activeElement !== e && e.focus(), i.classList.contains("tooltipped") && (i.classList.remove("tooltipped"), $(i).one("mouseleave", function () {
      return i.classList.add("tooltipped")
    })), i.blur()
  }), $.hashChange(function (t) {
    return $(t.target).parents(".js-details-container").addClass("open")
  })
}.call(this), function () {
  $(document).on("menu:activate", ".js-select-menu", function () {
    return $(this).addClass("is-dirty")
  }), $(document).on("menu:deactivate", ".js-select-menu", function () {
    return $(this).removeClass("is-dirty")
  })
}.call(this), function () {
  var t, e;
  $(document).on("reveal.facebox", function () {
    var t, n;
    t = $("#facebox"), n = t.find("input[autofocus], textarea[autofocus]").last()[0], n && document.activeElement !== n && n.focus(), $(document).on("keydown", e)
  }), $(document).on("afterClose.facebox", function () {
    return $(document).off("keydown", e), $("#facebox :focus").blur()
  }), e = function (t) {
    var e, n, i, r, s, o;
    ("tab" === (s = t.hotkey) || "shift+tab" === s) && (t.preventDefault(), n = $("#facebox"), e = n.find("input, button, .btn, textarea").visible().filter(function () {
      return!this.disabled
    }), r = "shift+tab" === t.hotkey ? -1 : 1, i = e.index(e.filter(":focus")), o = i + r, o === e.length || -1 === i && "tab" === t.hotkey ? e.first().focus() : -1 === i ? e.last().focus() : e.get(o).focus())
  }, $.observe("a[rel*=facebox]", t = function () {
    $(this).facebox()
  })
}.call(this), function () {
  $.fetchPoll = function (t, e) {
    return new Promise(function (n, i) {
      var r;
      return(r = function (s) {
        var o;
        return o = function (t) {
          switch (t.status) {
            case 200:
              return n(t);
            case 202:
              return setTimeout(function () {
                return r(1.5 * s)
              }, s);
            default:
              return i()
          }
        }, $.fetch(t, e).then(o, i)
      })(1e3)
    })
  }
}.call(this), function () {
  var t, e;
  $.fuzzyScore = function (t, n) {
    var i, r;
    return r = e(t, n), r && -1 === n.indexOf("/") && (i = t.substring(t.lastIndexOf("/") + 1), r += e(i, n)), r
  }, $.fuzzySort = function (e, n) {
    var i, r, s, o, a, c;
    for (e = function () {
      var t, i, r;
      for (r = [], t = 0, i = e.length; i > t; t++)c = e[t], (a = $.fuzzyScore(c, n)) && r.push([c, a]);
      return r
    }(), e.sort(t), o = [], r = 0, s = e.length; s > r; r++)i = e[r], o.push(i[0]);
    return o
  }, t = function (t, e) {
    var n, i, r, s;
    return i = t[0], s = e[0], n = t[1], r = e[1], n > r ? -1 : r > n ? 1 : s > i ? -1 : i > s ? 1 : 0
  }, $.fuzzyRegexp = function (t) {
    var e, n, i;
    return i = t.toLowerCase(), e = "+.*?[]{}()^$|\\".replace(/(.)/g, "\\$1"), n = new RegExp("\\(([" + e + "])\\)", "g"), t = i.replace(/(.)/g, "($1)(.*?)").replace(n, "(\\$1)"), new RegExp("(.*)" + t + "$", "i")
  }, $.fuzzyHighlight = function (t, e, n) {
    var i, r, s, o, a, c, u, l;
    if (null == n && (n = null), r = t.innerHTML.trim(), e) {
      if (null == n && (n = $.fuzzyRegexp(e)), !(c = r.match(n)))return;
      for (u = !1, r = [], s = o = 1, l = c.length; l >= 1 ? l > o : o > l; s = l >= 1 ? ++o : --o)a = c[s], a && (s % 2 === 0 ? u || (r.push("<mark>"), u = !0) : u && (r.push("</mark>"), u = !1), r.push(a));
      t.innerHTML = r.join("")
    } else i = r.replace(/<\/?mark>/g, ""), r !== i && (t.innerHTML = i)
  }, e = function (t, e) {
    var n, i, r, s, o, a, c, u, l, d, h, f, m, p;
    if (t === e)return 1;
    for (m = t.length, p = 0, f = 0, o = l = 0, d = e.length; d > l; o = ++l) {
      if (r = e[o], a = t.indexOf(r.toLowerCase()), c = t.indexOf(r.toUpperCase()), h = Math.min(a, c), u = h > -1 ? h : Math.max(a, c), -1 === u)return 0;
      p += .1, t[u] === r && (p += .1), 0 === u && (p += .8, 0 === o && (f = 1)), " " === t.charAt(u - 1) && (p += .8), t = t.substring(u + 1, m)
    }
    return n = e.length, i = p / n, s = (i * (n / m) + i) / 2, f && 1 > s + .1 && (s += .1), s
  }
}.call(this), function () {
  var t, e, n, i, r;
  i = new WeakMap, $.fn.fuzzyFilterSortList = function (s, o) {
    var a, c, u, l, d, h, f, m, p, g, v, b, y, j, w, x, k, C, S, L, T, A, E, _, q, D, P;
    if (null == o && (o = {}), x = this[0]) {
      for (s = s.toLowerCase(), l = null != (S = o.content) ? S : t, q = null != (L = o.text) ? L : n, _ = null != (T = o.score) ? T : $.fuzzyScore, w = o.limit, o.mark === !0 ? k = e : null != (null != (A = o.mark) ? A.call : void 0) && (k = o.mark), (a = i.get(x)) ? u = $(x).children() : (u = a = $(x).children(), x.webkitWeakMapWorkaround = 1, i.set(x, a.slice(0))), d = 0, v = u.length; v > d; d++)h = u[d], x.removeChild(h), h.style.display = "";
      if (E = document.createDocumentFragment(), D = 0, P = 0, s) {
        for (f = a.slice(0), p = 0, y = f.length; y > p; p++)h = f[p], null == h.fuzzyFilterTextCache && (h.fuzzyFilterTextCache = q(l(h))), h.fuzzyFilterScoreCache = _(h.fuzzyFilterTextCache, s);
        for (f.sort(r), C = $.fuzzyRegexp(s), g = 0, j = f.length; j > g; g++)h = f[g], (!w || w > D) && h.fuzzyFilterScoreCache > 0 && (P++, k && (c = l(h), k(c), k(c, s, C)), E.appendChild(h)), D++
      } else for (m = 0, b = a.length; b > m; m++)h = a[m], (!w || w > D) && (P++, k && k(l(h)), E.appendChild(h)), D++;
      return x.appendChild(E), P
    }
  }, r = function (t, e) {
    var n, i, r, s;
    return n = t.fuzzyFilterScoreCache, r = e.fuzzyFilterScoreCache, i = t.fuzzyFilterTextCache, s = e.fuzzyFilterTextCache, n > r ? -1 : r > n ? 1 : s > i ? -1 : i > s ? 1 : 0
  }, t = function (t) {
    return t
  }, n = function (t) {
    return $.trim(t.textContent.toLowerCase())
  }, e = $.fuzzyHighlight
}.call(this), function () {
  var t, e;
  $.fn.prefixFilterList = function (n, i) {
    var r, s, o, a, c, u, l, d, h, f, m;
    if (null == i && (i = {}), u = this[0]) {
      for (n = n.toLowerCase(), f = null != (d = i.text) ? d : e, o = $(u).children(), c = i.limit, i.mark === !0 ? l = t : null != (null != (h = i.mark) ? h.call : void 0) && (l = i.mark), m = 0, r = 0, a = o.length; a > r; r++)s = o[r], 0 === f(s).indexOf(n) ? c && m >= c ? s.style.display = "none" : (m++, s.style.display = "", l && (l(s), l(s, n))) : s.style.display = "none";
      return m
    }
  }, e = function (t) {
    return $.trim(t.textContent.toLowerCase())
  }, t = function (t, e) {
    var n, i, r;
    i = t.innerHTML, e ? (r = new RegExp(e, "i"), t.innerHTML = i.replace(r, "<mark>$&</mark>")) : (n = i.replace(/<\/?mark>/g, ""), i !== n && (t.innerHTML = n))
  }
}.call(this), function () {
  var t, e;
  $.fn.substringFilterList = function (n, i) {
    var r, s, o, a, c, u, l, d, h, f, m;
    if (null == i && (i = {}), u = this[0]) {
      for (n = n.toLowerCase(), f = null != (d = i.text) ? d : e, c = i.limit, o = $(u).children(), i.mark === !0 ? l = t : null != (null != (h = i.mark) ? h.call : void 0) && (l = i.mark), m = 0, r = 0, a = o.length; a > r; r++)s = o[r], -1 !== f(s).indexOf(n) ? c && m >= c ? s.style.display = "none" : (m++, s.style.display = "", l && (l(s), l(s, n))) : s.style.display = "none";
      return m
    }
  }, e = function (t) {
    return $.trim(t.textContent.toLowerCase())
  }, t = function (t, e) {
    var n, i, r;
    i = t.innerHTML, e ? (r = new RegExp(e, "i"), t.innerHTML = i.replace(r, "<mark>$&</mark>")) : (n = i.replace(/<\/?mark>/g, ""), i !== n && (t.innerHTML = n))
  }
}.call(this), function () {
  var t;
  $.observe(".js-filterable-field", function () {
    var t;
    return t = $(this).val(), {add: function () {
      return $(this).on("throttled:input.filterable", function () {
        return t !== $(this).val() ? (t = $(this).val(), $(this).fire("filterable:change", {async: !0})) : void 0
      }), $(this).on("focus.filterable", function () {
        return $(this).fire("filterable:change", {async: !0})
      })
    }, remove: function () {
      return $(this).off("filterable")
    }}
  }), $(document).on("filterable:change", ".js-filterable-field", function () {
    var e, n, i, r, s, o;
    for (s = $.trim($(this).val().toLowerCase()), o = $("[data-filterable-for=" + this.id + "]"), n = 0, i = o.length; i > n; n++)r = o[n], e = $(r), t(e, s), e.fire("filterable:change", {relatedTarget: this})
  }), t = function (t, e) {
    var n, i, r;
    i = void 0 !== t.attr("data-filterable-highlight"), n = t.attr("data-filterable-limit"), r = function () {
      switch (t.attr("data-filterable-type")) {
        case"fuzzy":
          return t.fuzzyFilterSortList(e, {mark: i, limit: n});
        case"substring":
          return t.substringFilterList(e, {mark: i, limit: n});
        default:
          return t.prefixFilterList(e, {mark: i, limit: n})
      }
    }(), t.toggleClass("filterable-active", e.length > 0), t.toggleClass("filterable-empty", 0 === r)
  }
}.call(this), function () {
  $(document).on("click", ".js-flash-close", function () {
    var t;
    return t = $(this).closest(".flash-messages"), $(this).closest(".flash").fadeOut(300, function () {
      return $(this).remove(), 0 === t.find(".flash").length ? t.remove() : void 0
    })
  })
}.call(this), function () {
  var t;
  t = new WeakMap, $(document).on("focusin.delay", function (e) {
    var n;
    n = e.target, t.get(n) || $(n).fire("focusin:delay", function () {
      t.set(n, !0), $(n).trigger("focusin:delayed")
    })
  }), $(document).on("focusout.delay", function (e) {
    return setTimeout(function () {
      var n;
      n = e.target, n !== document.activeElement && $(n).fire("focusout:delay", function () {
        t["delete"](e.target), $(n).trigger("focusout:delayed")
      })
    }, 200)
  })
}.call(this), function () {
  $(document).on("click", ".js-force-push-default-branch-notice-close", function () {
    this.closest(".js-force-push-default-branch-notice").classList.add("hidden");
    try {
      localStorage.setItem("hide-force-push-default-branch-notice", "true")
    } catch (t) {
    }
  }), $.observe(".js-force-push-default-branch-notice", function () {
    var t;
    t = function () {
      try {
        return localStorage.getItem("hide-force-push-default-branch-notice")
      } catch (t) {
      }
    }(), this.classList.toggle("hidden", "true" === t)
  })
}.call(this), function () {
  var t, e;
  GitHub.support.emoji || (t = Object.create(HTMLElement.prototype), t.createdCallback = function () {
    return this.textContent = "", this.appendChild(e(this))
  }, e = function (t) {
    var e;
    return e = document.createElement("img"), e.src = t.getAttribute("fallback-src"), e.className = "emoji", e.alt = e.title = ":" + t.getAttribute("alias") + ":", e.height = 20, e.width = 20, e.align = "absmiddle", e
  }, window.GEmojiElement = document.registerElement("g-emoji", {prototype: t}))
}.call(this), function () {
  $.fn.hasDirtyFields = function () {
    var t, e, n, i;
    for (i = this.find("input, textarea"), e = 0, n = i.length; n > e; e++)if (t = i[e], t.value !== t.defaultValue)return!0;
    return!1
  }
}.call(this), function () {
  var t;
  t = function (t) {
    var e, n;
    return t.nodeType !== Node.ELEMENT_NODE ? !1 : (e = t.nodeName.toLowerCase(), n = (t.getAttribute("type") || "").toLowerCase(), "select" === e || "textarea" === e || "input" === e && "submit" !== n && "reset" !== n)
  }, $.fn.hasFocus = function () {
    var e, n;
    return(e = this[0]) ? (n = document.activeElement, t(n) && e === n || $.contains(e, n)) : !1
  }
}.call(this), function () {
  $.fn.hasMousedown = function () {
    var t;
    return(t = this[0]) ? $(t).is(":active") : !1
  }
}.call(this), function () {
  $.fn.markedAsDirty = function () {
    return this.closest(".is-dirty").length > 0 || this.find(".is-dirty").length > 0
  }
}.call(this), function () {
  $.fn.hasInteractions = function () {
    return this.hasDirtyFields() || this.hasFocus() || this.hasMousedown() || this.markedAsDirty()
  }
}.call(this), function () {
  $.fn.hasMouseover = function () {
    var t;
    return(t = this[0]) ? $(t).is(":hover") : !1
  }
}.call(this), function () {
  $.pageFocused = function () {
    return new Promise(function (t) {
      var e;
      return e = function () {
        document.hasFocus() && (t(), document.removeEventListener("visibilitychange", e), window.removeEventListener("focus", e), window.removeEventListener("blur", e))
      }, document.addEventListener("visibilitychange", e), window.addEventListener("focus", e), window.addEventListener("blur", e), e()
    })
  }
}.call(this), function () {
  var t, e, n, i, r, s, o;
  r = 0, n = -1, e = function (t) {
    var e, n, i, r;
    return e = t.getBoundingClientRect(), i = $(window).height(), r = $(window).width(), 0 === e.height ? !1 : e.height < i ? e.top >= 0 && e.left >= 0 && e.bottom <= i && e.right <= r : (n = Math.ceil(i / 2), e.top >= 0 && e.top + n < i)
  }, t = function (t) {
    var n, i, r, s, o, a, c;
    for (s = t.elements, c = [], i = 0, r = s.length; r > i; i++)n = s[i], e(n) ? c.push(null != (o = t["in"]) ? o.call(n, n, t) : void 0) : c.push(null != (a = t.out) ? a.call(n, n, t) : void 0);
    return c
  }, o = function (e) {
    return document.hasFocus() && window.scrollY !== n && (n = window.scrollY, !e.checkPending) ? (e.checkPending = !0, window.requestAnimationFrame(function () {
      return e.checkPending = !1, t(e)
    })) : void 0
  }, i = function (e, n) {
    return 0 === n.elements.length && (window.addEventListener("scroll", n.scrollHandler), $.pageFocused().then(function () {
      return t(n)
    })), n.elements.push(e)
  }, s = function (t, e) {
    var n;
    return n = e.elements.indexOf(t), -1 !== n && e.elements.splice(n, 1), 0 === e.elements.length ? window.removeEventListener("scroll", e.scrollHandler) : void 0
  }, $.inViewport = function (t, e) {
    var n;
    return null != e.call && (e = {"in": e}), n = {id: r++, selector: t, "in": e["in"], out: e.out, elements: [], checkPending: !1}, n.scrollHandler = function () {
      return o(n)
    }, $.observe(t, {add: function (t) {
      return i(t, n)
    }, remove: function (t) {
      return s(t, n)
    }}), n
  }
}.call(this), function () {
  $.interactiveElement = function () {
    var t, e, n;
    return document.activeElement !== document.body ? t = document.activeElement : (e = document.querySelectorAll(":hover"), (n = e.length) && (t = e[n - 1])), $(t)
  }
}.call(this), function () {
  $(document).on("ajaxSuccess", ".js-immediate-updates", function (t, e, n, i) {
    var r, s, o;
    if (this === t.target) {
      s = i.updateContent;
      for (o in s)r = s[o], $(o).updateContent(r)
    }
  })
}.call(this), function () {
  $.observe(".labeled-button:checked", {add: function () {
    return $(this).parent("label").addClass("selected")
  }, remove: function () {
    return $(this).parent("label").removeClass("selected")
  }})
}.call(this), function () {
  var t;
  t = "is-last-changed", $(document).on("change", "form.js-form-last-changed", function (e) {
    var n, i;
    n = e.target, null != (i = this.querySelector("." + t)) && i.classList.remove(t), n.classList.add(t)
  })
}.call(this), function () {
  var t, e, n, i, r, s = [].indexOf || function (t) {
    for (var e = 0, n = this.length; n > e; e++)if (e in this && this[e] === t)return e;
    return-1
  };
  e = null, t = function (t) {
    e && n(e), $(t).fire("menu:activate", function () {
      return $(document).on("keydown.menu", r), $(document).on("click.menu", i), e = t, $(t).performTransition(function () {
        return document.body.classList.add("menu-active"), t.classList.add("active"), $(t).find(".js-menu-content[aria-hidden]").attr("aria-hidden", "false")
      }), $(t).fire("menu:activated", {async: !0})
    })
  }, n = function (t) {
    $(t).fire("menu:deactivate", function () {
      return $(document).off(".menu"), e = null, $(t).performTransition(function () {
        return document.body.classList.remove("menu-active"), t.classList.remove("active"), $(t).find(".js-menu-content[aria-hidden]").attr("aria-hidden", "true")
      }), $(t).fire("menu:deactivated", {async: !0})
    })
  }, i = function (t) {
    e && ($(t.target).closest(e)[0] || (t.preventDefault(), n(e)))
  }, r = function (t) {
    e && "esc" === t.hotkey && (s.call($(document.activeElement).parents(), e) >= 0 && document.activeElement.blur(), t.preventDefault(), n(e))
  }, $(document).on("click", ".js-menu-container", function (i) {
    var r, s, o;
    r = this, (o = $(i.target).closest(".js-menu-target")[0]) ? (i.preventDefault(), r === e ? n(r) : t(r)) : (s = $(i.target).closest(".js-menu-content")[0]) || r === e && (i.preventDefault(), n(r))
  }), $(document).on("click", ".js-menu-container .js-menu-close", function (t) {
    n($(this).closest(".js-menu-container")[0]), t.preventDefault()
  }), $.fn.menu = function (e) {
    var i, r;
    return(i = $(this).closest(".js-menu-container")[0]) ? (r = {activate: function () {
      return t(i)
    }, deactivate: function () {
      return n(i)
    }}, "function" == typeof r[e] ? r[e]() : void 0) : void 0
  }
}.call(this), function () {
  var t;
  $(document).on("focus", "div.btn-sm, span.btn-sm", function () {
    $(this).on("keydown", t)
  }), $(document).on("blur", "div.btn-sm, span.btn-sm", function () {
    $(this).off("keydown", t)
  }), t = function (t) {
    "enter" === t.hotkey && ($(this).click(), t.preventDefault())
  }
}.call(this), function () {
  var t, e;
  $.fn.notScrolling = function () {
    return new Promise(function (t) {
      return function (n, i) {
        return 1 === t.length ? e(t[0], n) : n()
      }
    }(this))
  }, t = 0, window.addEventListener("scroll", function (e) {
    t = e.timeStamp || (new Date).getTime()
  }, !0), e = function (e, n) {
    var i;
    return e === window && t < (new Date).getTime() - 500 ? void setImmediate(n) : (i = $.debounce(function () {
      return e.removeEventListener("scroll", i, !1), n()
    }, 500), e.addEventListener("scroll", i, !1), void i())
  }
}.call(this), function () {
  $(document).on("ajaxSuccess", ".js-notice-dismiss", function () {
    return $(this).closest(".js-notice").fadeOut()
  })
}.call(this), function () {
  $.observeLast = function (t, e) {
    var n, i;
    null == e && (e = "last"), n = i = function () {
      $(t).removeClass(e).last().addClass(e)
    }, $.observe(t, {add: n, remove: i})
  }
}.call(this), function () {
  $(document).on("click", ".js-permalink-shortcut", function () {
    return window.location = this.href + window.location.hash, !1
  })
}.call(this), function () {
  $(document).on("pjax:start", function (t) {
    var e;
    (e = t.relatedTarget) && ($(e).addClass("pjax-active"), $(e).parents(".js-pjax-active").addClass("pjax-active"))
  }), $(document).on("pjax:end", function (t) {
    $(".pjax-active").removeClass("pjax-active")
  })
}.call(this), function () {
  var t;
  t = document.referrer, $(document).on("pjax:start", function () {
    return t = $.pjax.state.url
  }), $(document).on("click", ".js-pjax-back", function (e) {
    1 !== e.which || e.metaKey || e.ctrlKey || history.length > 1 && this.href === t && (history.back(), e.preventDefault())
  })
}.call(this), function () {
  $(document).on("pjax:click", function () {
    return window.onbeforeunload ? !1 : void 0
  })
}.call(this), function () {
  var t;
  t = function () {
    var t, e;
    return e = function () {
      var e, n, i;
      for (i = [], e = 0, n = arguments.length; n > e; e++)t = arguments[e], i.push(t.split("/", 3).join("/"));
      return i
    }.apply(this, arguments), e[0] === e[1]
  }, $(document).on("pjax:click", "#js-repo-pjax-container a[href]", function () {
    var e;
    return e = $(this).prop("pathname"), t(e, location.pathname) ? void 0 : !1
  }), $(document).on("pjax:click", ".js-comment-body", function (t) {
    return"files" !== t.target.pathname.split("/")[3]
  })
}.call(this), function () {
  var t;
  $.support.pjax && ($.pjaxHeadCache = {}, $(t = function () {
    return $.pjaxHeadCache[document.location.pathname] = $("head [data-pjax-transient]")
  }), $(document).on("pjax:beforeReplace", function (t, e) {
    var n, i, r, s;
    for (i = r = 0, s = e.length; s > r; i = ++r)n = e[i], n && ("pjax-head" === n.id ? ($.pjaxHeadCache[document.location.pathname] = $(n).children(), e[i] = null) : "js-flash-container" === n.id && ($("#js-flash-container").replaceWith(n), e[i] = null))
  }), $(document).on("pjax:end", function () {
    var t, e, n;
    return t = $.pjaxHeadCache[document.location.pathname], t ? ($("head [data-pjax-transient]").remove(), n = $(t).not("title, script, link[rel='stylesheet']"), e = $(t).filter("link[rel='stylesheet']"), $(document.head).append(n.attr("data-pjax-transient", !0)), $(document.head).append(e)) : void 0
  }))
}.call(this), function () {
  var t, e;
  $.support.pjax && (e = function (t) {
    return null != t.getAttribute("data-pjax-preserve-scroll") ? !1 : 0
  }, t = function (t) {
    var e, n, i;
    return e = $(t), n = e.add(e.parents("[data-pjax]")).map(function () {
      var t;
      return t = this.getAttribute("data-pjax"), null != t && "true" !== t ? t : void 0
    }), (i = n[0]) ? document.querySelector(i) : $(t).closest("[data-pjax-container]")[0]
  }, $(document).on("click", "[data-pjax] a, a[data-pjax]", function (n) {
    var i, r;
    return r = this, null == r.getAttribute("data-skip-pjax") && null == r.getAttribute("data-remote") && (i = t(r)) ? $.pjax.click(n, {container: i, scrollTo: e(r)}) : void 0
  }), $(document).on("submit", "form[data-pjax]", function (n) {
    var i, r;
    return r = this, (i = t(r)) ? $.pjax.submit(n, {container: i, scrollTo: e(r)}) : void 0
  }))
}.call(this), function () {
  var t;
  $.support.pjax && (t = document.querySelector("meta[name=pjax-timeout]")) && ($.pjax.defaults.timeout = parseInt(t.content))
}.call(this), function () {
  $.pluralize = function (t, e) {
    return e + (t > 1 || 0 === t ? "s" : "")
  }
}.call(this), function () {
  var t, e;
  $.fn.preservingScrollPosition = function (t) {
    return $.preservingScrollPosition(this[0], t), this
  }, $.preservingScrollPosition = function (n, i) {
    var r, s, o, a, c, u, l, d;
    return n ? (o = t(n), l = i.call(n), (s = e(o)) ? (n = s.element, c = s.top, a = s.left, u = n.getBoundingClientRect(), d = u.top, r = u.left, $(n).cumulativeScrollBy(r - a, d - c), l) : void 0) : i()
  }, t = function (t) {
    var e, n, i, r;
    for (n = []; t;)i = t.getBoundingClientRect(), r = i.top, e = i.left, n.push({element: t, top: r, left: e}), t = t.parentElement;
    return n
  }, e = function (t) {
    var e, n, i;
    for (e = 0, n = t.length; n > e; e++)if (i = t[e], $.contains(document, i.element))return i
  }
}.call(this), function () {
  $.preserveInteractivePosition = function (t) {
    return $(window).notScrolling().then(function () {
      var e;
      return e = $.interactiveElement()[0], $.preservingScrollPosition(e, t)
    })
  }
}.call(this), function () {
  $(function () {
    return document.body.classList.contains("js-print-popup") ? (window.print(), setTimeout(window.close, 1e3)) : void 0
  })
}.call(this), function () {
  $(function () {
    var t, e;
    return document.documentElement.classList.contains("is-employee") ? (t = function () {
      return"qi:" + document.location
    }, e = [], $(document).on("submit", ".js-quick-issue-form", function () {
      var e;
      $(".facebox-content > *").hide(), $(".facebox-content .js-quick-issue-thanks").show(), e = t();
      try {
        localStorage.removeItem(e)
      } catch (n) {
      }
      return!0
    }), $(document).onFocusedInput(".js-quick-issue-body", function () {
      return function () {
        var e, n;
        e = t(), n = $(this).val();
        try {
          return localStorage.setItem(e, n)
        } catch (i) {
        }
      }
    }), $(document).on("reveal.facebox", function () {
      var e, n, i;
      return $(".facebox-content .quick-issue-link").remove(), i = $(".facebox-content .js-quick-issue-body"), i.length ? (n = t(), e = function () {
        try {
          return localStorage.getItem(n)
        } catch (t) {
        }
      }(), e && i.val(e), i.focus()) : void 0
    }), $(document).on("captured:error", function (t, n) {
      return e.push(n), $(".js-captured-errors").val(JSON.stringify(e))
    }), $(document).on("ajaxSuccess", ".js-quick-issue-form", function (t, e, n) {
      return $(".js-quick-issue-thanks").append(e.responseText)
    })) : void 0
  })
}.call(this), function () {
  $(document).onFocusedKeydown(".js-quick-submit", function () {
    return function (t) {
      var e, n;
      return"ctrl+enter" === t.hotkey || "meta+enter" === t.hotkey ? (n = $(this).closest("form"), e = n.find("input[type=submit], button[type=submit]").first(), e.prop("disabled") || n.submit(), !1) : void 0
    }
  })
}.call(this), function () {
  var t, e = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  };
  t = function () {
    function t(t) {
      this.resultsChanged = e(this.resultsChanged, this), this.fetchResults = e(this.fetchResults, this), this.onFieldInput = e(this.onFieldInput, this), this.onNavigationKeyDown = e(this.onNavigationKeyDown, this), this.teardown = e(this.teardown, this), this.$field = $(t), this.$form = $(t.form), this.fetchQueue = new SlidingPromiseQueue, this.$field.on("input.results", this.onFieldInput), this.$field.on("focusout:delayed.results", this.teardown), this.$form.on("submit.results", this.teardown), this.$results = $(".js-quicksearch-results"), this.$results.navigation("push"), this.$results.on("navigation:keydown.results", this.onNavigationKeyDown)
    }

    return t.prototype.teardown = function () {
      return this.$field.off(".results"), this.$form.off(".results"), this.$results.off(".results"), this.$results.removeClass("active"), this.$results.navigation("pop")
    }, t.prototype.onNavigationKeyDown = function (t) {
      return"esc" === t.hotkey ? this.$results.removeClass("active").navigation("clear") : "enter" !== t.hotkey || t.target.classList.contains("js-navigation-item") ? void 0 : (this.$form.submit(), !1)
    }, t.prototype.onFieldInput = function () {
      return this.fetchResults(this.$field.val())
    }, t.prototype.fetchResults = function (t) {
      var e, n, i;
      return(i = this.$results.attr("data-quicksearch-url")) ? (n = t.trim() ? (i += ~i.indexOf("?") ? "&" : "?", i += this.$form.serialize(), this.$form.addClass("is-sending"), $.fetchText(i)) : Promise.resolve(""), e = function (t) {
        return function () {
          return t.$form.removeClass("is-sending")
        }
      }(this), this.fetchQueue.push(n).then(function (t) {
        return function (e) {
          return t.$results.html(e), t.resultsChanged()
        }
      }(this)).then(e, e)) : void 0
    }, t.prototype.resultsChanged = function () {
      var t;
      return t = "" !== this.$field.val(), this.$results.toggleClass("active", t)
    }, t
  }(), $(document).on("focusin:delayed", ".js-quicksearch-field", function () {
    new t(this)
  })
}.call(this), function () {
  var t, e, n, i, r, s, o, a = [].slice;
  r = function () {
    var t, e, n, i, r;
    for (t = arguments[0], r = 2 <= arguments.length ? a.call(arguments, 1) : [], e = 0, i = r.length; i > e; e++)if (n = r[e], t.classList.contains(n))return!0;
    return!1
  }, n = function (t) {
    var e, n, i, r, s;
    for (s = t.parentNode.children, e = i = 0, r = s.length; r > i; e = ++i)if (n = s[e], n === t)return e
  }, i = 0, e = {CODE: function (t) {
    var e;
    return e = t.textContent, "PRE" === t.parentNode.nodeName ? t.textContent = e.replace(/^/gm, "    ") : e.indexOf("`") >= 0 ? "`` " + e + " ``" : "`" + e + "`"
  }, STRONG: function (t) {
    return"**" + t.textContent + "**"
  }, EM: function (t) {
    return"_" + t.textContent + "_"
  }, BLOCKQUOTE: function (t) {
    var e, n;
    return n = t.textContent.trim().replace(/^/gm, "> "), e = document.createElement("pre"), e.textContent = n + "\n\n", e
  }, A: function (t) {
    var e;
    return e = t.textContent, r(t, "issue-link", "user-mention", "team-mention") ? e : "[" + e + "](" + t.getAttribute("href") + ")"
  }, IMG: function (t) {
    var e;
    return e = t.getAttribute("alt"), r(t, "emoji") ? e : "![" + e + "](" + t.getAttribute("src") + ")"
  }, LI: function (t) {
    var e, r;
    return e = t.parentNode, "UL" === e.nodeName ? t.prepend("* ") : i > 0 && !e.previousSibling ? (r = n(t) + i + 1, t.prepend(r + "\\. ")) : t.prepend(n(t) + 1 + ". "), t
  }, OL: function (t) {
    var e;
    return e = document.createElement("li"), e.append(document.createElement("br")), t.append(e), t
  }}, e.UL = e.OL, t = function (t, n) {
    var i, r, s, o, a, c;
    o = document.createNodeIterator(t, NodeFilter.SHOW_ELEMENT, {acceptNode: function (t) {
      return t.nodeName in e ? NodeFilter.FILTER_ACCEPT : void 0
    }}), a = [];
    for (; s = o.nextNode();)a.push(s);
    for (a.reverse(), c = [], i = 0, r = a.length; r > i; i++)s = a[i], c.push(n(s));
    return c
  }, s = function (t, e) {
    var n, i, r;
    n = document.createElement("div"), n.appendChild(e), n.style.cssText = "position:absolute;left:-9999px;", document.body.appendChild(n);
    try {
      i = document.createRange(), i.selectNodeContents(n), t.removeAllRanges(), t.addRange(i), r = t.toString(), t.removeAllRanges()
    } finally {
      document.body.removeChild(n)
    }
    return r
  }, o = function (r) {
    var o, a, c, u;
    return o = r.getRangeAt(0).cloneContents(), i = 0, (c = r.anchorNode.parentNode.closest("li")) && ("OL" === c.parentNode.nodeName && (i = n(c)), o.querySelector("li") || (u = document.createElement(c.parentNode.nodeName), a = document.createElement("li"), a.append(o), u.append(a), o = document.createDocumentFragment(), o.appendChild(u))), t(o, function (t) {
      var n;
      return n = e[t.nodeName](t), t.replaceWith(n)
    }), s(r, o)
  }, $(document).on("quote:selection", ".js-quote-markdown", function (t) {
    var e, n, i, r;
    i = t.detail.selection;
    try {
      return r = o(i), t.detail.selectionText = r.trim()
    } catch (n) {
      return e = n, setImmediate(function () {
        throw e
      })
    }
  })
}.call(this), function () {
  $(document).on("keydown", function (t) {
    var e, n, i, r, s, o, a, c, u;
    if ("r" === t.hotkey && !t.isDefaultPrevented() && !t.isFormInteraction() && (c = window.getSelection(), i = $(c.focusNode), (u = $.trim(c.toString())) && (e = i.closest(".js-quote-selection-container"), e.length))) {
      if (s = $.Event("quote:selection", {detail: {selection: c, selectionText: u}}), e.trigger(s), s.isDefaultPrevented())return!1;
      if (u = s.detail.selectionText, n = e.find(".js-quote-selection-target").visible().first(), o = n[0])return a = "> " + u.replace(/\n/g, "\n> ") + "\n\n", (r = o.value) && (a = r + "\n\n" + a), o.value = a, n.trigger("change"), n.scrollTo({duration: 300}, function () {
        return o.focus(), o.selectionStart = o.value.length, n.scrollTop(o.scrollHeight)
      }), t.preventDefault()
    }
  })
}.call(this), function () {
  $.observe(".has-removed-contents", function () {
    var t, e, n;
    return t = $(this).contents(), e = function () {
      return t.detach()
    }, n = function () {
      return $(this).html(t)
    }, {add: e, remove: n}
  })
}.call(this), function () {
  var t;
  $(document).on("focusin", ".js-repo-filter .js-filterable-field", function () {
    var e;
    (e = this.closest(".js-repo-filter").querySelector(".js-more-repos-link")) && t(e)
  }), $(document).on("click", ".js-repo-filter .js-repo-filter-tab", function (e) {
    var n, i, r, s, o, a;
    for (n = this.closest(".js-repo-filter"), (o = n.querySelector(".js-more-repos-link")) && t(o), a = n.querySelectorAll(".js-repo-filter-tab"), r = 0, s = a.length; s > r; r++)i = a[r], i.classList.toggle("filter-selected", i === this);
    $(n.querySelector(".js-filterable-field")).fire("filterable:change"), e.preventDefault()
  }), $(document).on("filterable:change", ".js-repo-filter .js-repo-list", function () {
    var t, e, n;
    t = this.closest(".js-repo-filter"), (n = null != (e = t.querySelector(".js-repo-filter-tab.filter-selected")) ? e.getAttribute("data-filter") : void 0) && $(this).children().not(n).hide()
  }), t = function (t) {
    var e, n;
    if (!t.classList.contains("is-loading"))return t.classList.add("is-loading"), n = function (e) {
      var n;
      return n = t.closest(".js-repo-filter"), n.querySelector(".js-repo-list").innerHTML = e, $(n.querySelector(".js-filterable-field")).fire("filterable:change"),
        t.remove()
    }, e = function () {
      return t.classList.remove("is-loading")
    }, $.fetchText(t.href).then(n).then(e, e)
  }, $(document).on("click", ".js-more-repos-link", function (e) {
    e.preventDefault(), t(this)
  })
}.call(this), function () {
  $(document).on("ajaxSuccess", ".js-select-menu:not([data-multiple])", function () {
    return $(this).menu("deactivate")
  }), $(document).on("ajaxSend", ".js-select-menu:not([data-multiple])", function () {
    return $(this).addClass("is-loading")
  }), $(document).on("ajaxComplete", ".js-select-menu", function () {
    return $(this).removeClass("is-loading")
  }), $(document).on("ajaxError", ".js-select-menu", function () {
    return $(this).addClass("has-error")
  }), $(document).on("menu:deactivate", ".js-select-menu", function () {
    return $(this).removeClass("is-loading has-error")
  })
}.call(this), function () {
  $(document).on("navigation:open", ".js-select-menu:not([data-multiple]) .js-navigation-item", function () {
    var t, e;
    return e = $(this), t = e.closest(".js-select-menu"), t.find(".js-navigation-item.selected").removeClass("selected"), e.addClass("selected"), e.removeClass("indeterminate"), e.find("input[type=radio], input[type=checkbox]").prop("checked", !0).change(), e.fire("selectmenu:selected"), t.hasClass("is-loading") ? void 0 : t.menu("deactivate")
  }), $(document).on("navigation:open", ".js-select-menu[data-multiple] .js-navigation-item", function () {
    var t, e;
    return t = $(this), e = t.hasClass("selected"), t.toggleClass("selected", !e), t.removeClass("indeterminate"), t.find("input[type=radio], input[type=checkbox]").prop("checked", !e).change(), t.fire("selectmenu:selected")
  })
}.call(this), function () {
  $(document).on("selectmenu:selected", ".js-select-menu .js-navigation-item", function () {
    var t, e, n;
    return t = $(this).closest(".js-select-menu"), n = $(this).find(".js-select-button-text"), n[0] && t.find(".js-select-button").html(n.html()), e = $(this).find(".js-select-menu-item-gravatar"), n[0] ? t.find(".js-select-button-gravatar").html(e.html()) : void 0
  })
}.call(this), function () {
  $(document).on("selectmenu:change", ".js-select-menu .select-menu-list", function (t) {
    var e, n;
    n = $(this).find(".js-navigation-item"), n.removeClass("last-visible"), n.visible().last().addClass("last-visible"), $(this).is("[data-filterable-for]") || (e = $(t.target).hasClass("filterable-empty"), $(this).toggleClass("filterable-empty", e))
  })
}.call(this), function () {
  $(document).on("menu:activated selectmenu:load", ".js-select-menu", function () {
    return $(this).find(".js-filterable-field").focus()
  }), $(document).on("menu:deactivate", ".js-select-menu", function () {
    var t, e, n, i, r, s;
    for ($(this).find(".js-filterable-field").val("").trigger("filterable:change"), r = this.querySelectorAll(".js-navigation-item.selected"), s = [], t = 0, i = r.length; i > t; t++)n = r[t], (e = n.querySelector("input[type=radio], input[type=checkbox]")) ? s.push(n.classList.toggle("selected", e.checked)) : s.push(void 0);
    return s
  })
}.call(this), function () {
  var t;
  t = function (t) {
    var e, n, i, r, s;
    return i = t.currentTarget, e = $(i), e.removeClass("js-load-contents"), e.addClass("is-loading"), e.removeClass("has-error"), r = e.attr("data-contents-url"), n = e.data("contents-data"), s = $.ajax({url: r, data: n}), s.then(function (t) {
      e.removeClass("is-loading"), e.find(".js-select-menu-deferred-content").html(t), e.hasClass("active") && e.fire("selectmenu:load")
    }, function () {
      e.removeClass("is-loading"), e.addClass("has-error")
    })
  }, $.observe(".js-select-menu.js-load-contents", {add: function () {
    $(this).on("mouseenter", t), $(this).on("menu:activate", t)
  }, remove: function () {
    $(this).off("mouseenter", t), $(this).off("menu:activate", t)
  }})
}.call(this), function () {
  $(document).on("menu:activate", ".js-select-menu", function () {
    return $(this).find(":focus").blur(), $(this).find(".js-menu-target").addClass("selected"), $(this).find(".js-navigation-container").navigation("push")
  }), $(document).on("menu:deactivate", ".js-select-menu", function () {
    return $(this).find(".js-menu-target").removeClass("selected"), $(this).find(".js-navigation-container").navigation("pop")
  }), $(document).on("filterable:change selectmenu:tabchange", ".js-select-menu .select-menu-list", function () {
    return $(this).navigation("refocus")
  })
}.call(this), function () {
  var t;
  $(document).on("filterable:change", ".js-select-menu .select-menu-list", function (e) {
    var n, i, r, s;
    (i = this.querySelector(".js-new-item-form")) && (n = e.relatedTarget.value, "" === n || t(this, n) ? $(this).removeClass("is-showing-new-item-form") : ($(this).addClass("is-showing-new-item-form"), s = i.querySelector(".js-new-item-name"), "innerText"in s ? s.innerText = n : s.textContent = n, null != (r = i.querySelector(".js-new-item-value")) && (r.value = n))), $(e.target).trigger("selectmenu:change")
  }), t = function (t, e) {
    var n, i, r, s, o;
    for (s = t.querySelectorAll(".js-select-button-text"), n = 0, r = s.length; r > n; n++)if (i = s[n], o = i.textContent.toLowerCase().trim(), o === e.toLowerCase())return!0;
    return!1
  }
}.call(this), function () {
  var t;
  $(document).on("menu:activate selectmenu:load", ".js-select-menu", function () {
    var t;
    return t = $(this).find(".js-select-menu-tab"), t.attr("aria-selected", "false").removeClass("selected"), t.first().attr("aria-selected", "true").addClass("selected")
  }), $(document).on("click", ".js-select-menu .js-select-menu-tab", function (t) {
    var e, n, i, r;
    return n = this.closest(".js-select-menu"), (r = n.querySelector(".js-select-menu-tab.selected")) && (r.classList.remove("selected"), r.setAttribute("aria-selected", !1)), this.classList.add("selected"), this.setAttribute("aria-selected", !0), (e = n.querySelector(".js-filterable-field")) && ((i = this.getAttribute("data-filter-placeholder")) && e.setAttribute("placeholder", i), e.focus()), !1
  }), t = function (t, e) {
    var n, i, r;
    r = t.getAttribute("data-tab-filter"), i = $(t).closest(".js-select-menu").find(".js-select-menu-tab-bucket"), n = i.filter(function () {
      return this.getAttribute("data-tab-filter") === r
    }), n.toggleClass("selected", e), e && n.fire("selectmenu:tabchange")
  }, $.observe(".js-select-menu .js-select-menu-tab.selected", {add: function () {
    return t(this, !0)
  }, remove: function () {
    return t(this, !1)
  }})
}.call(this),function () {
}.call(this),function () {
  var t, e, n, i;
  t = function (t) {
    var e;
    return null == t && (t = window.location), (e = document.querySelector("meta[name=session-resume-id]")) ? e.content : t.pathname
  }, i = null, $(window).on("submit:prepare", function (t) {
    i = t.target, setImmediate(function () {
      return t.isDefaultPrevented() ? i = null : void 0
    })
  }), e = function (t) {
    var e, n, r, s;
    if (r = "session-resume:" + t, s = function (t) {
      return t.id && t.value !== t.defaultValue && t.form !== i
    }, n = function () {
      var t, n, i, r;
      for (i = $(".js-session-resumable"), r = [], t = 0, n = i.length; n > t; t++)e = i[t], s(e) && r.push([e.id, e.value]);
      return r
    }(), n.length)try {
      sessionStorage.setItem(r, JSON.stringify(n))
    } catch (o) {
    }
  }, n = function (t) {
    var e, n, i, r, s, o, a, c;
    if (r = "session-resume:" + t, n = function () {
      try {
        return sessionStorage.getItem(r)
      } catch (t) {
      }
    }()) {
      try {
        sessionStorage.removeItem(r)
      } catch (u) {
      }
      for (e = [], o = JSON.parse(n), i = 0, s = o.length; s > i; i++)a = o[i], t = a[0], c = a[1], $(document).fire("session:resume", {targetId: t, targetValue: c}, function () {
        var n;
        n = document.getElementById(t), n && n.value === n.defaultValue && (n.value = c, e.push(n))
      });
      setImmediate(function () {
        return $(e).trigger("change")
      })
    }
  }, $(window).on("pageshow pjax:end", function () {
    n(t())
  }), $(window).on("pagehide", function () {
    e(t())
  }), $(window).on("pjax:beforeReplace", function (n) {
    var i, r, s, o;
    (o = null != (s = n.previousState) ? s.url : void 0) ? (r = t(new URL(o)), e(r)) : (i = new Error("pjax:beforeReplace event.previousState.url is undefined"), setImmediate(function () {
      throw i
    }))
  })
}.call(this),function () {
  var t, e;
  t = function () {
    var t, e, n;
    t = null, n = $.debounce(function () {
      return t = null
    }, 200), e = {x: 0, y: 0}, $(this).on("mousemove.userResize", function (i) {
      var r;
      (e.x !== i.clientX || e.y !== i.clientY) && (r = this.style.height, t && t !== r && $(this).trigger("user:resize"), t = r, n()), e = {x: i.clientX, y: i.clientY}
    })
  }, e = function () {
    $(this).off("mousemove.userResize")
  }, $.event.special["user:resize"] = {setup: t, teardown: e}
}.call(this),function () {
  var t, e, n, i;
  n = function (t) {
    return $(t).on("user:resize.trackUserResize", function () {
      return $(t).addClass("is-user-resized"), $(t).css({"max-height": ""})
    })
  }, i = function (t) {
    return $(t).off("user:resize.trackUserResize")
  }, $(document).on("reset", "form", function () {
    var t;
    t = $(this).find("textarea.js-size-to-fit"), t.removeClass("is-user-resized"), t.css({height: "", "max-height": ""})
  }), $.observe("textarea.js-size-to-fit", {add: n, remove: i}), t = function (t) {
    var e, n, i;
    e = $(t), n = null, i = function (i) {
      var r, s, o, a;
      t.value !== n && e.is($.visible) && (a = e.overflowOffset(), a.top < 0 || a.bottom < 0 || (o = e.outerHeight() + a.bottom, t.style.maxHeight = o - 100 + "px", r = t.parentNode, s = r.style.height, r.style.height = $(r).css("height"), t.style.height = "auto", e.innerHeight(t.scrollHeight), r.style.height = s, n = t.value))
    }, e.on("change.sizeToFit", function () {
      return i()
    }), e.on("input.sizeToFit", function () {
      return i()
    }), t.value && i()
  }, e = function (t) {
    $(t).off(".sizeToFit")
  }, $.observe("textarea.js-size-to-fit:not(.is-user-resized)", {add: t, remove: e})
}.call(this),function () {
  $(document).on("ajaxSuccess", ".js-social-container", function (t, e, n, i) {
    return $(this).find(".js-social-count").text(i.count)
  })
}.call(this),function (t, e) {
  "function" == typeof define && define.amd ? define([], e) : "undefined" != typeof module && module.exports ? module.exports = e() : t.ReconnectingWebSocket = e()
}(this, function () {
  function t(e, n, i) {
    function r(t, e) {
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(t, !1, !1, e), n
    }

    var s = {debug: !1, automaticOpen: !0, reconnectInterval: 1e3, maxReconnectInterval: 3e4, reconnectDecay: 1.5, timeoutInterval: 2e3, maxReconnectAttempts: null};
    i || (i = {});
    for (var o in s)"undefined" != typeof i[o] ? this[o] = i[o] : this[o] = s[o];
    this.url = e, this.reconnectAttempts = 0, this.readyState = WebSocket.CONNECTING, this.protocol = null;
    var a, c = this, u = !1, l = !1, d = document.createElement("div");
    d.addEventListener("open", function (t) {
      c.onopen(t)
    }), d.addEventListener("close", function (t) {
      c.onclose(t)
    }), d.addEventListener("connecting", function (t) {
      c.onconnecting(t)
    }), d.addEventListener("message", function (t) {
      c.onmessage(t)
    }), d.addEventListener("error", function (t) {
      c.onerror(t)
    }), this.addEventListener = d.addEventListener.bind(d), this.removeEventListener = d.removeEventListener.bind(d), this.dispatchEvent = d.dispatchEvent.bind(d), this.open = function (e) {
      if (a = new WebSocket(c.url, n || []), e) {
        if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts)return
      } else d.dispatchEvent(r("connecting")), this.reconnectAttempts = 0;
      (c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "attempt-connect", c.url);
      var i = a, s = setTimeout(function () {
        (c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "connection-timeout", c.url), l = !0, i.close(), l = !1
      }, c.timeoutInterval);
      a.onopen = function (n) {
        clearTimeout(s), (c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onopen", c.url), c.protocol = a.protocol, c.readyState = WebSocket.OPEN, c.reconnectAttempts = 0;
        var i = r("open");
        i.isReconnect = e, e = !1, d.dispatchEvent(i)
      }, a.onclose = function (n) {
        if (clearTimeout(s), a = null, u)c.readyState = WebSocket.CLOSED, d.dispatchEvent(r("close")); else {
          c.readyState = WebSocket.CONNECTING;
          var i = r("connecting");
          i.code = n.code, i.reason = n.reason, i.wasClean = n.wasClean, d.dispatchEvent(i), e || l || ((c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onclose", c.url), d.dispatchEvent(r("close")));
          var s = c.reconnectInterval * Math.pow(c.reconnectDecay, c.reconnectAttempts);
          setTimeout(function () {
            c.reconnectAttempts++, c.open(!0)
          }, s > c.maxReconnectInterval ? c.maxReconnectInterval : s)
        }
      }, a.onmessage = function (e) {
        (c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onmessage", c.url, e.data);
        var n = r("message");
        n.data = e.data, d.dispatchEvent(n)
      }, a.onerror = function (e) {
        (c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onerror", c.url, e), d.dispatchEvent(r("error"))
      }
    }, 1 == this.automaticOpen && this.open(!1), this.send = function (e) {
      if (a)return(c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "send", c.url, e), a.send(e);
      throw"INVALID_STATE_ERR : Pausing to reconnect websocket"
    }, this.close = function (t, e) {
      "undefined" == typeof t && (t = 1e3), u = !0, a && a.close(t, e)
    }, this.refresh = function () {
      a && a.close()
    }
  }

  if ("WebSocket"in window)return t.prototype.onopen = function (t) {
  }, t.prototype.onclose = function (t) {
  }, t.prototype.onconnecting = function (t) {
  }, t.prototype.onmessage = function (t) {
  }, t.prototype.onerror = function (t) {
  }, t.debugAll = !1, t.CONNECTING = WebSocket.CONNECTING, t.OPEN = WebSocket.OPEN, t.CLOSING = WebSocket.CLOSING, t.CLOSED = WebSocket.CLOSED, t
}),function () {
  var t, e, n, i, r, s, o;
  "undefined" != typeof WebSocket && null !== WebSocket && (s = {}, e = {}, t = null, i = function (t) {
    var n, i;
    if (n = document.head.querySelector("link[rel=web-socket]"))return i = new ReconnectingWebSocket(n.href), i.reconnectInterval = 2e3 * Math.random() + 1e3, i.reconnectDecay = 2, i.maxReconnectAttempts = 5, i.addEventListener("open", function () {
      var t, e, n;
      n = [];
      for (e in s)t = s[e], n.push(i.send("subscribe:" + e));
      return n
    }), i.addEventListener("message", function (t) {
      var n, i, r;
      r = JSON.parse(t.data), i = r[0], n = r[1], i && n && $(e[i]).trigger("socket:message", [n, i])
    }), i
  }, n = function (t) {
    var e, n;
    return null != (e = null != (n = t.getAttribute("data-channel")) ? n.split(/\s+/) : void 0) ? e : []
  }, r = function (r) {
    var o, a, c, u, l;
    if (null != t ? t : t = i())for (l = t, u = n(r), o = 0, a = u.length; a > o; o++)c = u[o], l.readyState !== WebSocket.OPEN || s[c] || l.send("subscribe:" + c), s[c] = !0, null == e[c] && (e[c] = []), e[c].push(r)
  }, o = function (t) {
    var i, r, s, o;
    for (o = n(t), i = 0, r = o.length; r > i; i++)s = o[i], e[s] = $(e[s]).not(t).slice(0)
  }, $.observe(".js-socket-channel[data-channel]", {add: r, remove: o}))
}.call(this),function () {
  var t, e, n;
  e = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"], n = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"], t = new WeakMap, $.fn.textFieldMirror = function (i) {
    var r, s, o, a, c, u, l, d, h, f, m, p;
    if ((p = this[0]) && (d = p.nodeName.toLowerCase(), "textarea" === d || "input" === d)) {
      if (u = t.get(p), u && u.parentElement === p.parentElement)u.innerHTML = ""; else {
        for (u = document.createElement("div"), t.set(p, u), f = window.getComputedStyle(p), h = e.slice(0), "textarea" === d ? h.push("white-space:pre-wrap;") : h.push("white-space:nowrap;"), o = 0, a = n.length; a > o; o++)l = n[o], h.push(l + ":" + f.getPropertyValue(l) + ";");
        u.style.cssText = h.join(" ")
      }
      return i !== !1 && (c = document.createElement("span"), c.style.cssText = "position: absolute;", c.className = "text-field-mirror-marker", c.innerHTML = "&nbsp;"), "number" == typeof i ? ((m = p.value.substring(0, i)) && (s = document.createTextNode(m)), (m = p.value.substring(i)) && (r = document.createTextNode(m))) : (m = p.value) && (s = document.createTextNode(m)), s && u.appendChild(s), c && u.appendChild(c), r && u.appendChild(r), u.parentElement || p.parentElement.insertBefore(u, p), u.scrollTop = p.scrollTop, u.scrollLeft = p.scrollLeft, u
    }
  }
}.call(this),function () {
  $.fn.textFieldSelectionPosition = function (t) {
    var e, n, i;
    if ((i = this[0]) && (null == t && (t = i.selectionEnd), e = $(i).textFieldMirror(t)))return n = $(e).find(".text-field-mirror-marker").position(), n.top += parseInt($(e).css("border-top-width"), 10), n.left += parseInt($(e).css("border-left-width"), 10), setTimeout(function () {
      return $(e).remove()
    }, 5e3), n
  }
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c, u, l, d, h, f = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  };
  d = function (t, e, n) {
    var i, r, s, o;
    return o = n[3], r = n[4], s = e - r.length, i = e, {type: t, text: o, query: r, startIndex: s, endIndex: i}
  }, o = {}, t = function () {
    function t(t) {
      this.textarea = t, this.deactivate = f(this.deactivate, this), this.onNavigationOpen = f(this.onNavigationOpen, this), this.onNavigationKeyDown = f(this.onNavigationKeyDown, this), this.onInput = f(this.onInput, this), this.onPaste = f(this.onPaste, this), this.teardown = f(this.teardown, this), $(this.textarea).on("focusout:delayed.suggester", this.teardown), $(this.textarea.form).on("reset.suggester", this.deactivate), $(this.textarea).on("paste.suggester", this.onPaste), $(this.textarea).on("input.suggester", this.onInput), this.suggester = this.textarea.closest(".js-suggester-container").querySelector(".js-suggester"), this.fragment = document.createElement("div"), $(this.suggester).on("navigation:keydown.suggester", "[data-value]", this.onNavigationKeyDown), $(this.suggester).on("navigation:open.suggester", "[data-value]", this.onNavigationOpen), this.loadSuggestions()
    }

    var e, i;
    return t.prototype.types = {mention: {match: /(^|\s)(@([a-z0-9\-_\/]*))$/i, replace: "$1@$value ", search: function (t, e) {
      var i, r, s;
      return s = c(e), i = $(t).find("ul.mention-suggestions"), r = i.fuzzyFilterSortList(e, {limit: 5, text: n, score: s.score}), Promise.resolve([i, r])
    }}, auditLogUser: {match: /(^|\s)((\-?actor:|\-?user:)([a-z0-9\-\+_]*))$/i, replace: "$1$3$value ", search: function (t, e) {
      var n, i;
      return n = $(t).find("ul.user-suggestions"), i = n.fuzzyFilterSortList(e, {limit: 5}), Promise.resolve([n, i])
    }, normalizeMatch: d}, auditLogOrg: {match: /(^|\s)((\-?org:)([a-z0-9\-\+_]*))$/i, replace: "$1$3$value ", search: function (t, e) {
      var n, i;
      return n = $(t).find("ul.org-suggestions"), i = n.fuzzyFilterSortList(e, {limit: 5}), Promise.resolve([n, i])
    }, normalizeMatch: d}, auditLogAction: {match: /(^|\s)((\-?action:)([a-z0-9\.\-\+_]*))$/i, replace: "$1$3$value ", search: function (t, e) {
      var n, i;
      return n = $(t).find("ul.action-suggestions"), i = n.fuzzyFilterSortList(e, {limit: 5}), Promise.resolve([n, i])
    }, normalizeMatch: d}, auditLogRepo: {match: /(^|\s)((\-?repo:)([a-z0-9\/\-\+_]*))$/i, replace: "$1$3$value ", search: function (t, e) {
      var n, i;
      return n = $(t).find("ul.repo-suggestions"), i = n.fuzzyFilterSortList(e, {limit: 5}), Promise.resolve([n, i])
    }, normalizeMatch: d}, auditLogCountry: {match: /(^|\s)((\-?country:)([a-z0-9\-\+_]*))$/i, replace: "$1$3$value ", search: function (t, e) {
      var n, i;
      return n = $(t).find("ul.country-suggestions"), i = n.fuzzyFilterSortList(e, {limit: 5}), Promise.resolve([n, i])
    }, normalizeMatch: d}, emoji: {match: /(^|\s)(:([a-z0-9\-\+_]*))$/i, replace: "$1$value ", search: function (t, e) {
      var n, i;
      return n = $(t).find("ul.emoji-suggestions"), e = " " + e.toLowerCase().replace(/_/g, " "), i = n.fuzzyFilterSortList(e, {limit: 5, text: s, score: r}), Promise.resolve([n, i])
    }}, hashed: {match: /(^|\s)(\#([a-z0-9\-_\/]*))$/i, replace: "$1#$value ", search: function (t, e) {
      var i, r, s, o;
      return r = $(t).find("ul.hashed-suggestions"), i = /^\d+$/.test(e) ? (s = new RegExp("\\b" + e), function (t) {
        return l(t, s)
      }) : c(e).score, o = r.fuzzyFilterSortList(e, {limit: 5, text: n, score: i}), Promise.resolve([r, o])
    }}}, i = function (t) {
      return t.replace(/`{3,}[^`]*\n(.+)?\n`{3,}/g, "")
    }, e = function (t) {
      var e, n;
      return(null != (e = t.match(/`{3,}/g)) ? e.length : void 0) % 2 ? !0 : (null != (n = i(t).match(/`/g)) ? n.length : void 0) % 2 ? !0 : void 0
    }, t.prototype.teardown = function () {
      this.deactivate(), $(this.textarea).off(".suggester"), $(this.textarea.form).off(".suggester"), $(this.suggester).off(".suggester"), this.onSuggestionsLoaded = function () {
        return null
      }
    }, t.prototype.onPaste = function () {
      this.deactivate(), this.justPasted = !0
    }, t.prototype.onInput = function () {
      return this.justPasted ? void(this.justPasted = !1) : this.checkQuery() ? !1 : void 0
    }, t.prototype.onNavigationKeyDown = function (t) {
      switch (t.hotkey) {
        case"tab":
          return this.onNavigationOpen(t), !1;
        case"esc":
          return this.deactivate(), t.stopImmediatePropagation(), !1
      }
    }, t.prototype.onNavigationOpen = function (t) {
      var e, n, i;
      i = t.target.getAttribute("data-value"), n = this.textarea.value.substring(0, this.currentSearch.endIndex), e = this.textarea.value.substring(this.currentSearch.endIndex), n = n.replace(this.currentSearch.type.match, this.currentSearch.type.replace.replace("$value", i)), this.textarea.value = n + e, this.deactivate(), this.textarea.focus(), this.textarea.selectionStart = n.length, this.textarea.selectionEnd = n.length
    }, t.prototype.checkQuery = function () {
      var t, e;
      if (e = this.searchQuery()) {
        if (e.query === (null != (t = this.currentSearch) ? t.query : void 0))return;
        return this.currentSearch = e, this.search(e.type, e.query).then(function (t) {
          return function (n) {
            return n ? t.activate(e.startIndex) : t.deactivate()
          }
        }(this)), this.currentSearch.query
      }
      this.currentSearch = null, this.deactivate()
    }, t.prototype.activate = function (t) {
      $(this.suggester).css($(this.textarea).textFieldSelectionPosition(t + 1)), this.suggester.classList.contains("active") || (this.suggester.classList.add("active"), this.textarea.classList.add("js-navigation-enable"), $(this.suggester).navigation("push"), $(this.suggester).navigation("focus"))
    }, t.prototype.deactivate = function () {
      this.suggester.classList.contains("active") && (this.suggester.classList.remove("active"), $(this.suggester).find(".suggestions").hide(), this.textarea.classList.remove("js-navigation-enable"), $(this.suggester).navigation("pop"))
    }, t.prototype.search = function (t, e) {
      return t.search(this.fragment, e).then(function (t) {
        return function (e) {
          var n, i, r;
          return i = e[0], r = e[1], r > 0 ? (n = i[0].cloneNode(!0), t.suggester.innerHTML = "", t.suggester.appendChild(n), $(n).show(), $(t.suggester).navigation("focus"), !0) : !1
        }
      }(this))
    }, t.prototype.searchQuery = function () {
      var t, n, i, r, s, o, a;
      if (r = this.textarea.selectionEnd, o = this.textarea.value.substring(0, r), !e(o)) {
        s = this.types;
        for (i in s)if (a = s[i], t = o.match(a.match))return n = null != a.normalizeMatch ? a.normalizeMatch(a, r, t) : this.normalizeMatch(a, r, t)
      }
    }, t.prototype.normalizeMatch = function (t, e, n) {
      var i, r, s, o;
      return o = n[2], r = n[3], s = e - o.length, i = e, {type: t, text: o, query: r, startIndex: s, endIndex: i}
    }, t.prototype.loadSuggestions = function () {
      var t, e;
      if (!this.fragment.hasChildNodes() && (e = this.suggester.getAttribute("data-url"), null != e))return t = null != o[e] ? o[e] : o[e] = $.fetchText(e), t.then(function (t) {
        return function (e) {
          return t.onSuggestionsLoaded(e)
        }
      }(this))
    }, t.prototype.onSuggestionsLoaded = function (t) {
      var e, n, i, r;
      for (r = $.parseHTML(t), n = 0, i = r.length; i > n; n++)e = r[n], this.fragment.appendChild(e);
      return document.activeElement === this.textarea ? (this.currentSearch = null, this.checkQuery()) : void 0
    }, t
  }(), i = {}, s = function (t) {
    var e;
    return e = t.getAttribute("data-emoji-name"), i[e] = " " + n(t).replace(/_/g, " "), e
  }, n = function (t) {
    return t.getAttribute("data-text").trim().toLowerCase()
  }, r = function (t, e) {
    var n;
    return n = i[t].indexOf(e), n > -1 ? 1e3 - n : 0
  }, l = function (t, e) {
    var n;
    return n = t.search(e), n > -1 ? 1e3 - n : 0
  }, h = function (t, n) {
    var i, r, s, o, a, c, l;
    if (l = e(t, n[0]), 0 !== l.length) {
      if (1 === n.length)return[l[0], 1, []];
      for (a = null, r = 0, s = l.length; s > r; r++)c = l[r], (i = u(t, n, c + 1)) && (o = i[i.length - 1] - c, (!a || o < a[1]) && (a = [c, o, i]));
      return a
    }
  }, e = function (t, e) {
    var n, i;
    for (n = 0, i = []; (n = t.indexOf(e, n)) > -1;)i.push(n++);
    return i
  }, u = function (t, e, n) {
    var i, r, s, o;
    for (r = [], i = s = 1, o = e.length; o >= 1 ? o > s : s > o; i = o >= 1 ? ++s : --s) {
      if (n = t.indexOf(e[i], n), -1 === n)return;
      r.push(n++)
    }
    return r
  }, a = function () {
    return 2
  }, c = function (t) {
    var e, n;
    return t ? (e = t.toLowerCase().split(""), n = function (n) {
      var i, r;
      return n && (i = h(n, e)) ? (r = t.length / i[1], r /= i[0] / 2 + 1) : 0
    }) : n = a, {score: n}
  }, $(document).on("focusin:delayed", ".js-suggester-field", function () {
    new t(this)
  })
}.call(this),function () {
  $(document).on("tasklist:change", ".js-task-list-container", function () {
    $(this).taskList("disable")
  }), $(document).on("tasklist:changed", ".js-task-list-container", function (t, e, n) {
    var i, r, s, o;
    return r = $(this).find("form.js-comment-update"), s = r.find("input[name=task_list_key]"), s.length > 0 || (o = r.find(".js-task-list-field").attr("name").split("[")[0], s = $("<input>", {type: "hidden", name: "task_list_key", value: o}), r.append(s)), n = n ? "1" : "0", i = $("<input>", {type: "hidden", name: "task_list_checked", value: n}), r.append(i), r.one("ajaxComplete", function (t, e) {
      return i.remove(), 200 !== e.status || /^\s*</.test(e.responseText) ? 422 === e.status && e.stale ? window.location.reload() : void 0 : $(this).taskList("enable")
    }), r.submit()
  }), $.observe(".task-list", function () {
    $(this).taskList("enable")
  })
}.call(this),function () {
  var t, e, n;
  t = function () {
    var t, i, r, s, o, a;
    if (a = this.getAttribute("data-url"))return o = $.fetchJSON(a), r = this.getAttribute("data-id"), s = $(".js-team-mention[data-id='" + r + "']"), s.removeAttr("data-url"), t = function (t) {
      return 0 === t.total ? t.members.push("This team has no members") : t.total > t.members.length && t.members.push(t.total - t.members.length + " more"), n(s, e(t.members))
    }, i = function (t) {
      return function (e) {
        var i, r, o;
        return o = (null != (r = e.response) ? r.status : void 0) || 500, i = function () {
          switch (o) {
            case 404:
              return this.getAttribute("data-permission-text");
            default:
              return this.getAttribute("data-error-text")
          }
        }.call(t), n(s, i)
      }
    }(this), o.then(t, i)
  }, n = function (t, e) {
    return t.attr("aria-label", e), t.addClass("tooltipped tooltipped-s tooltipped-multiline")
  }, e = function (t) {
    var e;
    return 0 === t.length ? "" : 1 === t.length ? t[0] : 2 === t.length ? t.join(" and ") : ([].splice.apply(t, [-1, 9e9].concat(e = "and " + t.slice(-1))), t.join(", "))
  }, $.observe(".js-team-mention", function () {
    $(this).on("mouseenter", t)
  })
}.call(this),function () {
  var t, e;
  e = function (t, e, n) {
    var i, r;
    return i = t.value.substring(0, t.selectionEnd), r = t.value.substring(t.selectionEnd), i = i.replace(e, n), r = r.replace(e, n), t.value = i + r, t.selectionStart = i.length, t.selectionEnd = i.length
  }, t = function (t, e) {
    var n, i, r, s;
    return r = t.selectionEnd, n = t.value.substring(0, r), s = t.value.substring(r), i = "" === t.value || n.match(/\n$/) ? "" : "\n", t.value = n + i + e + s, t.selectionStart = r + e.length, t.selectionEnd = r + e.length
  }, $.fn.replaceText = function (t, n) {
    var i, r, s;
    for (r = 0, s = this.length; s > r; r++)i = this[r], e(i, t, n);
    return this
  }, $.fn.insertText = function (e) {
    var n, i, r;
    for (i = 0, r = this.length; r > i; i++)n = this[i], t(n, e);
    return this
  }
}.call(this),function () {
  $.numberWithDelimiter = function (t) {
    var e;
    return e = t.toString().split("."), e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".")
  }, $.parseInt = function (t) {
    return"string" != typeof t ? 0 : parseInt(t.replace(/,/g, ""), 10)
  }, $.fn.inflect = function (t) {
    var e, n, i, r, s, o;
    for (s = [], n = 0, i = this.length; i > n; n++)r = this[n], e = $(r), o = 1 === t ? e.attr("data-singular-string") : e.attr("data-plural-string"), s.push(e.text(o));
    return s
  }
}.call(this),function () {
  $.fn.textareaContentsHeight = function () {
    var t, e, n;
    if ((n = this[0]) && (e = $.fn.textFieldMirror.call([n], !1)))return e.style.height = "", t = $.css(e, "height", "content"), setTimeout(function () {
      var t;
      return null != (t = e.parentNode) ? t.removeChild(e) : void 0
    }, 5e3), t
  }
}.call(this),function () {
  $(document).on("ajaxBeforeSend", function (t, e, n) {
    var i;
    n.crossDomain || (i = $(".js-timeline-marker"), i.length && e.setRequestHeader("X-Timeline-Last-Modified", i.attr("data-last-modified")))
  })
}.call(this),function (t) {
  var e = function () {
    "use strict";
    var t = "s", n = function (t) {
      var e = -t.getTimezoneOffset();
      return null !== e ? e : 0
    }, i = function (t, e, n) {
      var i = new Date;
      return void 0 !== t && i.setFullYear(t), i.setMonth(e), i.setDate(n), i
    }, r = function (t) {
      return n(i(t, 0, 2))
    }, s = function (t) {
      return n(i(t, 5, 2))
    }, o = function (t) {
      var e = t.getMonth() > 7, i = e ? s(t.getFullYear()) : r(t.getFullYear()), o = n(t), a = 0 > i, c = i - o;
      return a || e ? 0 !== c : 0 > c
    }, a = function () {
      var e = r(), n = s(), i = e - n;
      return 0 > i ? e + ",1" : i > 0 ? n + ",1," + t : e + ",0"
    }, c = function () {
      var t = a();
      return new e.TimeZone(e.olson.timezones[t])
    }, u = function (t) {
      var e = new Date(2010, 6, 15, 1, 0, 0, 0), n = {"America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0), "America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0), "America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0), "America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0), "America/Asuncion": new Date(2012, 9, 7, 3, 0, 0, 0), "America/Santiago": new Date(2012, 9, 3, 3, 0, 0, 0), "America/Campo_Grande": new Date(2012, 9, 21, 5, 0, 0, 0), "America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0), "America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0), "America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0), "America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0), "America/Havana": new Date(2012, 2, 10, 2, 0, 0, 0), "America/New_York": new Date(2012, 2, 10, 7, 0, 0, 0), "Europe/Helsinki": new Date(2013, 2, 31, 5, 0, 0, 0), "Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0), "America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0), "America/Goose_Bay": new Date(2011, 2, 13, 2, 1, 0, 0), "America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0), "America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0), "Europe/Moscow": e, "Asia/Amman": new Date(2013, 2, 29, 1, 0, 0, 0), "Asia/Beirut": new Date(2013, 2, 31, 2, 0, 0, 0), "Asia/Damascus": new Date(2013, 3, 6, 2, 0, 0, 0), "Asia/Jerusalem": new Date(2013, 2, 29, 5, 0, 0, 0), "Asia/Yekaterinburg": e, "Asia/Omsk": e, "Asia/Krasnoyarsk": e, "Asia/Irkutsk": e, "Asia/Yakutsk": e, "Asia/Vladivostok": e, "Asia/Baku": new Date(2013, 2, 31, 4, 0, 0), "Asia/Yerevan": new Date(2013, 2, 31, 3, 0, 0), "Asia/Kamchatka": e, "Asia/Gaza": new Date(2010, 2, 27, 4, 0, 0), "Africa/Cairo": new Date(2010, 4, 1, 3, 0, 0), "Europe/Minsk": e, "Pacific/Apia": new Date(2010, 10, 1, 1, 0, 0, 0), "Pacific/Fiji": new Date(2010, 11, 1, 0, 0, 0), "Australia/Perth": new Date(2008, 10, 1, 1, 0, 0, 0)};
      return n[t]
    };
    return{determine: c, date_is_dst: o, dst_start_for: u}
  }();
  e.TimeZone = function (t) {
    "use strict";
    var n = {"America/Denver": ["America/Denver", "America/Mazatlan"], "America/Chicago": ["America/Chicago", "America/Mexico_City"], "America/Santiago": ["America/Santiago", "America/Asuncion", "America/Campo_Grande"], "America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"], "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Asia/Beirut", "Europe/Helsinki", "Asia/Damascus"], "Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"], "America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"], "America/New_York": ["America/Havana", "America/New_York"], "America/Halifax": ["America/Goose_Bay", "America/Halifax"], "America/Godthab": ["America/Miquelon", "America/Godthab"], "Asia/Dubai": ["Europe/Moscow"], "Asia/Dhaka": ["Asia/Yekaterinburg"], "Asia/Jakarta": ["Asia/Omsk"], "Asia/Shanghai": ["Asia/Krasnoyarsk", "Australia/Perth"], "Asia/Tokyo": ["Asia/Irkutsk"], "Australia/Brisbane": ["Asia/Yakutsk"], "Pacific/Noumea": ["Asia/Vladivostok"], "Pacific/Tarawa": ["Asia/Kamchatka", "Pacific/Fiji"], "Pacific/Tongatapu": ["Pacific/Apia"], "Asia/Baghdad": ["Europe/Minsk"], "Asia/Baku": ["Asia/Yerevan", "Asia/Baku"], "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]}, i = t, r = function () {
      for (var t = n[i], r = t.length, s = 0, o = t[0]; r > s; s += 1)if (o = t[s], e.date_is_dst(e.dst_start_for(o)))return void(i = o)
    }, s = function () {
      return"undefined" != typeof n[i]
    };
    return s() && r(), {name: function () {
      return i
    }}
  }, e.olson = {}, e.olson.timezones = {"-720,0": "Pacific/Majuro", "-660,0": "Pacific/Pago_Pago", "-600,1": "America/Adak", "-600,0": "Pacific/Honolulu", "-570,0": "Pacific/Marquesas", "-540,0": "Pacific/Gambier", "-540,1": "America/Anchorage", "-480,1": "America/Los_Angeles", "-480,0": "Pacific/Pitcairn", "-420,0": "America/Phoenix", "-420,1": "America/Denver", "-360,0": "America/Guatemala", "-360,1": "America/Chicago", "-360,1,s": "Pacific/Easter", "-300,0": "America/Bogota", "-300,1": "America/New_York", "-270,0": "America/Caracas", "-240,1": "America/Halifax", "-240,0": "America/Santo_Domingo", "-240,1,s": "America/Santiago", "-210,1": "America/St_Johns", "-180,1": "America/Godthab", "-180,0": "America/Argentina/Buenos_Aires", "-180,1,s": "America/Montevideo", "-120,0": "America/Noronha", "-120,1": "America/Noronha", "-60,1": "Atlantic/Azores", "-60,0": "Atlantic/Cape_Verde", "0,0": "UTC", "0,1": "Europe/London", "60,1": "Europe/Berlin", "60,0": "Africa/Lagos", "60,1,s": "Africa/Windhoek", "120,1": "Asia/Beirut", "120,0": "Africa/Johannesburg", "180,0": "Asia/Baghdad", "180,1": "Europe/Moscow", "210,1": "Asia/Tehran", "240,0": "Asia/Dubai", "240,1": "Asia/Baku", "270,0": "Asia/Kabul", "300,1": "Asia/Yekaterinburg", "300,0": "Asia/Karachi", "330,0": "Asia/Kolkata", "345,0": "Asia/Kathmandu", "360,0": "Asia/Dhaka", "360,1": "Asia/Omsk", "390,0": "Asia/Rangoon", "420,1": "Asia/Krasnoyarsk", "420,0": "Asia/Jakarta", "480,0": "Asia/Shanghai", "480,1": "Asia/Irkutsk", "525,0": "Australia/Eucla", "525,1,s": "Australia/Eucla", "540,1": "Asia/Yakutsk", "540,0": "Asia/Tokyo", "570,0": "Australia/Darwin", "570,1,s": "Australia/Adelaide", "600,0": "Australia/Brisbane", "600,1": "Asia/Vladivostok", "600,1,s": "Australia/Sydney", "630,1,s": "Australia/Lord_Howe", "660,1": "Asia/Kamchatka", "660,0": "Pacific/Noumea", "690,0": "Pacific/Norfolk", "720,1,s": "Pacific/Auckland", "720,0": "Pacific/Tarawa", "765,1,s": "Pacific/Chatham", "780,0": "Pacific/Tongatapu", "780,1,s": "Pacific/Apia", "840,0": "Pacific/Kiritimati"}, "undefined" != typeof exports ? exports.jstz = e : t.jstz = e
}(this),function () {
  var t, e;
  e = jstz.determine().name(), "https:" === location.protocol && (t = "secure"), document.cookie = "tz=" + encodeURIComponent(e) + "; path=/; " + t
}.call(this),function () {
  var t, e;
  e = function () {
    if (!window.performance.timing)try {
      return sessionStorage.setItem("navigationStart", Date.now())
    } catch (t) {
    }
  }, t = function () {
    return setTimeout(function () {
      var t, e, n, i, r, s, o, a, c, u, l, d;
      if (l = {}, l.crossBrowserLoadEvent = Date.now(), window.performance.timing) {
        s = window.performance.timing;
        for (n in s)d = s[n], "number" == typeof d && (l[n] = d);
        (t = null != (o = window.chrome) && "function" == typeof o.loadTimes && null != (a = o.loadTimes()) ? a.firstPaintTime : void 0) && (l.chromeFirstPaintTime = Math.round(1e3 * t))
      } else r = function () {
        try {
          return sessionStorage.getItem("navigationStart")
        } catch (t) {
        }
      }(), r && (l.simulatedNavigationStart = parseInt(r, 10));
      for (u = function () {
        var t, e, n, i;
        for (n = window.performance.getEntriesByType("resource"), i = [], t = 0, e = n.length; e > t; t++)c = n[t], i.push($.extend({}, c));
        return i
      }(), e = 0, i = u.length; i > e; e++)c = u[e], delete c.toJSON;
      return Object.keys(l).length > 1 || u.length ? GitHub.stats({timing: l, resources: u}) : void 0
    }, 0)
  }, $(window).on("pagehide", e), $(window).on("load", t)
}.call(this),function () {
  $(document).on("click", ".js-toggler-container .js-toggler-target", function (t) {
    return 1 === t.which ? ($(t.target).trigger("toggler:toggle"), 0 === $(this).parent(".js-toggler-form").length ? !1 : void 0) : void 0
  }), $(document).on("ajaxBeforeSend", ".js-toggler-container", function (t) {
    return this.classList.remove("success", "error"), this.classList.add("loading")
  }), $(document).on("ajaxComplete", ".js-toggler-container", function (t) {
    return this.classList.remove("loading")
  }), $(document).on("ajaxSuccess", ".js-toggler-container", function (t) {
    return this.classList.add("success")
  }), $(document).on("ajaxError", ".js-toggler-container", function (t) {
    return this.classList.add("error")
  }), $(document).on("toggler:toggle", ".js-toggler-container", function (t) {
    return this.classList.toggle("on")
  })
}.call(this),function () {
  var t, e, n;
  n = 0, e = function (t) {
    var e;
    if (document.hasFocus() && (e = document.querySelector(".js-timeline-marker-form")))return $(e).submit()
  }, $.inViewport(".js-unread-item", {"in": function () {
    t(this)
  }}), $.observe(".js-unread-item", {add: function () {
    return n++
  }, remove: function () {
    return n--, 0 === n ? e(this) : void 0
  }}), t = function (t) {
    return t.classList.remove("js-unread-item", "unread-item")
  }, $(document).on("socket:message", ".js-discussion", function (e) {
    var n, i, r, s;
    if (this === e.target)for (s = document.querySelectorAll(".js-unread-item"), i = 0, r = s.length; r > i; i++)n = s[i], t(n)
  })
}.call(this),function () {
  var t, e, n;
  e = 0, t = /^\(\d+\)\s+/, n = function () {
    var n;
    return n = e ? "(" + e + ") " : "", document.title.match(t) ? document.title = document.title.replace(t, n) : document.title = "" + n + document.title
  }, $.observe(".js-unread-item", {add: function () {
    return e++, n()
  }, remove: function () {
    return e--, n()
  }})
}.call(this),function () {
  var t, e, n;
  $.fn.updateContent = function (t) {
    var n;
    return null != (n = this.data("xhr")) && n.abort(), e(this[0], t)
  }, $(document).on("socket:message", ".js-updatable-content", function (e, i, r) {
    var s;
    this === e.target && null == $(this).data("xhr") && (s = t(this, r).then(function (t) {
      return function (e) {
        return n(t, e)
      }
    }(this)), s["catch"](function (t) {
      return function (e) {
        return"XMLHttpRequest abort" !== e.message ? console.warn("Failed to update content", t, e) : void 0
      }
    }(this)))
  }), t = function (t, e) {
    var n;
    return null == e && (e = null), n = $(t).ajax({channel: e}), Promise.resolve(n)["catch"](function (t) {
      throw new Error("XMLHttpRequest " + t.statusText)
    })
  }, e = function (t, e) {
    return $.preserveInteractivePosition(function () {
      var n;
      return n = $($.parseHTML($.trim(e))), $(t).replaceWith(n), n
    })
  }, n = function (t, n) {
    if ($(t).hasInteractions())throw new Error("element had interactions");
    return e(t, n)
  }
}.call(this),function () {
  $(document).on("upload:setup", ".js-upload-avatar-image", function (t) {
    var e, n;
    return n = t.originalEvent.detail.policyRequest, e = this.getAttribute("data-alambic-organization"), e ? n.body.append("organization_id", e) : void 0
  }), $(document).on("upload:complete", ".js-upload-avatar-image", function (t) {
    var e, n;
    return e = t.originalEvent.detail.result, n = "/settings/avatars/" + e.id, $.facebox(function () {
      return $.fetchText(n).then($.facebox)
    })
  })
}.call(this),function () {
  var t;
  window.PNGScanner = t = function () {
    function t(t) {
      this.dataview = new DataView(t), this.pos = 0
    }

    var e, n, i;
    return n = 2303741511, e = 4, t.fromFile = function (e) {
      return new Promise(function (n, i) {
        var r;
        return r = new FileReader, r.onload = function () {
          return n(new t(r.result))
        }, r.onerror = function () {
          return i(r.error)
        }, r.readAsArrayBuffer(e)
      })
    }, t.prototype.advance = function (t) {
      return this.pos += t
    }, i = function (t) {
      var e;
      return e = this.dataview["getUint" + 8 * t](this.pos), this.advance(t), e
    }, t.prototype.readChar = function () {
      return i.call(this, 1)
    }, t.prototype.readShort = function () {
      return i.call(this, 2)
    }, t.prototype.readLong = function () {
      return i.call(this, 4)
    }, t.prototype.readString = function (t) {
      var e;
      return function () {
        var n, i, r;
        for (r = [], e = n = 1, i = t; i >= 1 ? i >= n : n >= i; e = i >= 1 ? ++n : --n)r.push(String.fromCharCode(this.readChar()));
        return r
      }.call(this).join("")
    }, t.prototype.scan = function (t) {
      var i, r, s, o;
      if (this.readLong() !== n)throw new Error("invalid PNG");
      for (this.advance(4), r = []; ;) {
        if (i = this.readLong(), o = this.readString(4), s = this.pos + i + e, t.call(this, o, i) === !1 || "IEND" === o)break;
        r.push(this.pos = s)
      }
      return r
    }, t
  }()
}.call(this),function () {
  var t;
  t = .0254, window.ImageDimensions = function (e) {
    var n;
    return"image/png" !== e.type ? Promise.resolve({}) : (n = e.slice(0, 10240, e.type), PNGScanner.fromFile(n).then(function (e) {
      var n;
      return n = {}, e.scan(function (e) {
        var i, r, s, o;
        switch (e) {
          case"IHDR":
            return n.width = this.readLong(), n.height = this.readLong();
          case"pHYs":
            return r = this.readLong(), s = this.readLong(), o = this.readChar(), 1 === o && (i = t), i && (n.ppi = Math.round((r + s) / 2 * i)), !1;
          case"IDAT":
            return!1
        }
      }), n
    }))
  }
}.call(this),function () {
  var t, e, n, i, r;
  i = function (t) {
    return t.toLowerCase().replace(/[^a-z0-9\-_]+/gi, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
  }, r = function (t) {
    var e;
    return e = n(t) ? "!" : "", e + ("[Uploading " + t.name + "\u2026]()")
  }, e = function (t) {
    return i(t).replace(/\.[^.]+$/, "").replace(/\./g, " ")
  }, n = function (t) {
    var e;
    return"image/gif" === (e = t.type) || "image/png" === e || "image/jpg" === e || "image/jpeg" === e
  }, t = 144, $(document).on("upload:setup", ".js-upload-markdown-image", function (t) {
    var e;
    e = this.querySelector(".js-comment-field"), $(e).insertText(r(t.originalEvent.detail.file) + "\n"), $(this).trigger("validation:change", !1)
  }), $(document).on("upload:complete", ".js-upload-markdown-image", function (i) {
    var s, o, a, c, u;
    return u = i.originalEvent.detail, s = this, o = s.querySelector(".js-comment-field"), a = r(u.file), c = function (i) {
      var r, c, l, d;
      return c = n(u.file) ? (r = e(u.policy.asset.name), l = u.policy.asset.href, (null != i ? i.ppi : void 0) === t ? (d = Math.round(i.width / 2), '<img width="' + d + '" alt="' + r + '" src="' + l + '">') : "![" + r + "](" + l + ")") : "[" + u.file.name + "](" + u.policy.asset.href + ")", $(o).replaceText(a, c), $(s).trigger("validation:field:change")
    }, ImageDimensions(u.file).then(c, function (t) {
      return c(), setImmediate(function () {
        throw t
      })
    })
  }), $(document).on("upload:error", ".js-upload-markdown-image", function (t) {
    var e, n;
    return e = this.querySelector(".js-comment-field"), n = r(t.originalEvent.detail.file), $(e).replaceText(n, ""), $(this).trigger("validation:field:change")
  }), $(document).on("upload:invalid", ".js-upload-markdown-image", function (t) {
    var e, n;
    return e = this.querySelector(".js-comment-field"), n = r(t.originalEvent.detail.file), $(e).replaceText(n, ""), $(this).trigger("validation:field:change")
  })
}.call(this),function () {
  $(document).on("upload:complete", ".js-upload-oauth-logo", function (t) {
    var e;
    return e = t.originalEvent.detail, this.querySelector(".js-image-field").src = e.policy.asset.href, this.querySelector(".js-oauth-application-logo-id").value = e.policy.asset.id, this.classList.add("has-uploaded-logo")
  })
}.call(this),function () {
  function t(t, e) {
    return t.href = e
  }

  function e(t, e) {
    return t.name = e
  }

  function n(t) {
    Ct.set(t)
  }

  function i(t) {
    return"function" == typeof t
  }

  function r(t) {
    return"[object Array]" == Object[pt].toString[$t](Object(t))
  }

  function s(t) {
    return void 0 != t && -1 < (t.constructor + "")[dt]("String")
  }

  function o(t, e) {
    return 0 == t[dt](e)
  }

  function a(t) {
    return t ? t[z](/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
  }

  function c() {
    return[Vt() ^ 2147483647 & Mt(), F.round((new Date)[V]() / 1e3)][xt](".")
  }

  function u(t) {
    var e = Et[Y]("img");
    return e.width = 1, e.height = 1, e.src = t, e
  }

  function l() {
  }

  function d(t) {
    return R instanceof Function ? R(t) : (n(28), t)
  }

  function h(t) {
    return d(t)[z](/\(/g, "%28")[z](/\)/g, "%29")
  }

  function f(t, e) {
    if (t) {
      var n = Et[Y]("script");
      n.type = "text/javascript", n.async = !0, n.src = t, n.id = e;
      var i = Et.getElementsByTagName("script")[0];
      i[wt].insertBefore(n, i)
    }
  }

  function m() {
    return le || "https:" == Et[Q][nt] ? "https:" : "http:"
  }

  function p() {
    var t = "" + Et[Q][tt];
    return 0 == t[dt]("www.") ? t[yt](4) : t
  }

  function g(t) {
    var e = Et.referrer;
    if (/^https?:\/\//i[ct](e)) {
      if (t)return e;
      t = "//" + Et[Q][tt];
      var n = e[dt](t);
      if ((5 == n || 6 == n) && (t = e.charAt(n + t[mt]), "/" == t || "?" == t || "" == t || ":" == t))return;
      return e
    }
  }

  function v(t, e) {
    if (1 == e[mt] && null != e[0] && "object" == typeof e[0])return e[0];
    for (var n = {}, i = F.min(t[mt] + 1, e[mt]), r = 0; i > r; r++) {
      if ("object" == typeof e[r]) {
        for (var s in e[r])e[r][Z](s) && (n[s] = e[r][s]);
        break
      }
      r < t[mt] && (n[t[r]] = e[r])
    }
    return n
  }

  function $(t) {
    if (100 != t.get(Dn) && M(Zt(t, jn)) % 1e4 >= 100 * te(t, Dn))throw"abort"
  }

  function b(t) {
    if (_t(Zt(t, xn)))throw"abort"
  }

  function y() {
    var t = Et[Q][nt];
    if ("http:" != t && "https:" != t)throw"abort"
  }

  function j(t) {
    try {
      At.XMLHttpRequest && "withCredentials"in new At.XMLHttpRequest ? n(40) : At.XDomainRequest && n(41), At[jt].sendBeacon && n(42)
    } catch (e) {
    }
    t.set($e, te(t, $e) + 1);
    var i = [];
    if (Xt.map(function (e, n) {
      if (n.p) {
        var r = t.get(e);
        void 0 != r && r != n[ht] && ("boolean" == typeof r && (r *= 1), i[ot](n.p + "=" + d("" + r)))
      }
    }), Nn(new On(1e4))) {
      var r = [];
      r[ot](Yt()), r[ot][st](r, c()[X](".")), r[ot](Jt());
      var s;
      s = At.crypto ? !0 : !1, r[ot](s ? "c" : "b"), i[ot]("z=" + r[xt]("."))
    } else i[ot]("z=" + Jt());
    t.set(ge, i[xt]("&"), !0)
  }

  function w(t) {
    var e = Zt(t, In) || Rt() + "/collect";
    Ft(e, Zt(t, ge), t.get(pe), t.get(ve)), t.set(pe, l, !0)
  }

  function x(t) {
    var e = At.gaData;
    e && (e.expId && t.set(Je, e.expId), e.expVar && t.set(Ve, e.expVar))
  }

  function k() {
    if (At[jt] && "preview" == At[jt].loadPurpose)throw"abort"
  }

  function C(t) {
    var e = At.gaDevIds;
    r(e) && 0 != e[mt] && t.set("&did", e[xt](","), !0)
  }

  function S(t) {
    if (!t.get(xn))throw"abort"
  }

  function L(t) {
    var e = te(t, Ze);
    e >= 500 && n(15);
    var i = Zt(t, me);
    if ("transaction" != i && "item" != i) {
      var i = te(t, en), r = (new Date)[V](), s = te(t, tn);
      if (0 == s && t.set(tn, r), s = F.round(2 * (r - s) / 1e3), s > 0 && (i = F.min(i + s, 20), t.set(tn, r)), 0 >= i)throw"abort";
      t.set(en, --i)
    }
    t.set(Ze, ++e)
  }

  function T(t, e, i, r) {
    e[t] = function () {
      try {
        return r && n(r), i[st](this, arguments)
      } catch (e) {
        var s = e && e[ft];
        if (!(1 <= 100 * F.random() || _t("?"))) {
          var o = ["t=error", "_e=exc", "_v=j30", "sr=1"];
          t && o[ot]("_f=" + t), s && o[ot]("_m=" + d(s[yt](0, 100))), o[ot]("aip=1"), o[ot]("z=" + Vt()), Ft(Rt() + "/collect", o[xt]("&"))
        }
        throw e
      }
    }
  }

  function A() {
    var t, e, n;
    if ((n = (n = At[jt]) ? n.plugins : null) && n[mt])for (var i = 0; i < n[mt] && !e; i++) {
      var r = n[i];
      -1 < r[ft][dt]("Shockwave Flash") && (e = r.description)
    }
    if (!e)try {
      t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), e = t.GetVariable("$version")
    } catch (s) {
    }
    if (!e)try {
      t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), e = "WIN 6,0,21,0", t.AllowScriptAccess = "always", e = t.GetVariable("$version")
    } catch (o) {
    }
    if (!e)try {
      t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), e = t.GetVariable("$version")
    } catch (a) {
    }
    return e && (t = e[U](/[\d]+/g)) && 3 <= t[mt] && (e = t[0] + "." + t[1] + " r" + t[2]), e || void 0
  }

  function E(t, e, n) {
    "none" == e && (e = "");
    var i = [], r = Dt(t);
    t = "__utma" == t ? 6 : 2;
    for (var s = 0; s < r[mt]; s++) {
      var o = ("" + r[s])[X](".");
      o[mt] >= t && i[ot]({hash: o[0], R: r[s], O: o})
    }
    return 0 == i[mt] ? void 0 : 1 == i[mt] ? i[0] : _(e, i) || _(n, i) || _(null, i) || i[0]
  }

  function _(t, e) {
    var n, i;
    null == t ? n = i = 1 : (n = M(t), i = M(o(t, ".") ? t[yt](1) : "." + t));
    for (var r = 0; r < e[mt]; r++)if (e[r][at] == n || e[r][at] == i)return e[r]
  }

  function q(t) {
    t = t.get(jn);
    var e = D(t, 0);
    return"_ga=1." + d(e + "." + t)
  }

  function D(t, e) {
    for (var n = new Date, i = At[jt], r = i.plugins || [], n = [t, i.userAgent, n.getTimezoneOffset(), n.getYear(), n.getDate(), n.getHours(), n.getMinutes() + e], i = 0; i < r[mt]; ++i)n[ot](r[i].description);
    return M(n[xt]("."))
  }

  function P(t, e) {
    if (e == Et[Q][tt])return!1;
    for (var n = 0; n < t[mt]; n++)if (t[n]instanceof RegExp) {
      if (t[n][ct](e))return!0
    } else if (0 <= e[dt](t[n]))return!0;
    return!1
  }

  function H() {
    var t = At.gaGlobal = At.gaGlobal || {};
    return t.hid = t.hid || Vt()
  }

  function I(t) {
    return 0 <= t[dt](".") || 0 <= t[dt](":")
  }

  function M(t) {
    var e, n = 1, i = 0;
    if (t)for (n = 0, e = t[mt] - 1; e >= 0; e--)i = t.charCodeAt(e), n = (n << 6 & 268435455) + i + (i << 14), i = 266338304 & n, n = 0 != i ? n ^ i >> 21 : n;
    return n
  }

  var R = encodeURIComponent, O = window, N = setTimeout, F = Math, z = "replace", B = "data", U = "match", W = "send", G = "port", Y = "createElement", J = "setAttribute", V = "getTime", K = "host", X = "split", Q = "location", Z = "hasOwnProperty", tt = "hostname", et = "search", nt = "protocol", it = "href", rt = "action", st = "apply", ot = "push", at = "hash", ct = "test", ut = "slice", lt = "cookie", dt = "indexOf", ht = "defaultValue", ft = "name", mt = "length", pt = "prototype", gt = "clientWidth", vt = "target", $t = "call", bt = "clientHeight", yt = "substring", jt = "navigator", wt = "parentNode", xt = "join", kt = "toLowerCase", Ct = new function () {
    var t = [];
    this.set = function (e) {
      t[e] = !0
    }, this.M = function () {
      for (var e = [], n = 0; n < t[mt]; n++)t[n] && (e[F.floor(n / 6)] = e[F.floor(n / 6)] ^ 1 << n % 6);
      for (n = 0; n < e[mt]; n++)e[n] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(e[n] || 0);
      return e[xt]("") + "~"
    }
  }, St = function (t, e, i, r) {
    try {
      t.addEventListener ? t.addEventListener(e, i, !!r) : t.attachEvent && t.attachEvent("on" + e, i)
    } catch (s) {
      n(27)
    }
  }, Lt = function (t, e, n) {
    t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && t.detachEvent("on" + e, n)
  }, Tt = function () {
    this.keys = [], this.w = {}, this.m = {}
  };
  Tt[pt].set = function (t, e, n) {
    this.keys[ot](t), n ? this.m[":" + t] = e : this.w[":" + t] = e
  }, Tt[pt].get = function (t) {
    return this.m[Z](":" + t) ? this.m[":" + t] : this.w[":" + t]
  }, Tt[pt].map = function (t) {
    for (var e = 0; e < this.keys[mt]; e++) {
      var n = this.keys[e], i = this.get(n);
      i && t(n, i)
    }
  };
  var At = O, Et = document, _t = function (t) {
    var e = At._gaUserPrefs;
    if (e && e.ioo && e.ioo() || t && !0 === At["ga-disable-" + t])return!0;
    try {
      var n = At.external;
      if (n && n._gaUserPrefs && "oo" == n._gaUserPrefs)return!0
    } catch (i) {
    }
    return!1
  }, qt = function (t) {
    N(t, 100)
  }, Dt = function (t) {
    var e = [], n = Et[lt][X](";");
    t = new RegExp("^\\s*" + t + "=\\s*(.*?)\\s*$");
    for (var i = 0; i < n[mt]; i++) {
      var r = n[i][U](t);
      r && e[ot](r[1])
    }
    return e
  }, Pt = function (t, e, i, r, s, o) {
    if (s = _t(s) ? !1 : It[ct](Et[Q][tt]) || "/" == i && Ht[ct](r) ? !1 : !0, !s)return!1;
    if (e && 1200 < e[mt] && (e = e[yt](0, 1200), n(24)), i = t + "=" + e + "; path=" + i + "; ", o && (i += "expires=" + new Date((new Date)[V]() + o).toGMTString() + "; "), r && "none" != r && (i += "domain=" + r + ";"), r = Et[lt], Et.cookie = i, !(r = r != Et[lt]))t:{
      for (t = Dt(t), r = 0; r < t[mt]; r++)if (e == t[r]) {
        r = !0;
        break t
      }
      r = !1
    }
    return r
  }, Ht = new RegExp(/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/), It = new RegExp(/(^|\.)doubleclick\.net$/i), Mt = function () {
    for (var t = At[jt].userAgent + (Et[lt] ? Et[lt] : "") + (Et.referrer ? Et.referrer : ""), e = t[mt], n = At.history[mt]; n > 0;)t += n-- ^ e++;
    return M(t)
  }, Rt = function () {
    return m() + "//www.google-analytics.com"
  }, Ot = function (t) {
    e(this, "len"), this.message = t + "-8192"
  }, Nt = function (t) {
    e(this, "ff2post"), this.message = t + "-2036"
  }, Ft = function (t, e, n, i) {
    if (n = n || l, i && (i = n, At[jt].sendBeacon && At[jt].sendBeacon(t, e) ? (i(), i = !0) : i = !1), !i)if (2036 >= e[mt])zt(t, e, n); else {
      if (!(8192 >= e[mt]))throw new Ot(e[mt]);
      if (0 <= At[jt].userAgent[dt]("Firefox") && ![].reduce)throw new Nt(e[mt]);
      Ut(t, e, n) || Bt(t, e, n) || Wt(e, n) || n()
    }
  }, zt = function (t, e, n) {
    var i = u(t + "?" + e);
    i.onload = i.onerror = function () {
      i.onload = null, i.onerror = null, n()
    }
  }, Bt = function (t, e, n) {
    var i;
    return(i = At.XDomainRequest) ? (i = new i, i.open("POST", t), i.onerror = function () {
      n()
    }, i.onload = n, i[W](e), !0) : !1
  }, Ut = function (t, e, n) {
    var i = At.XMLHttpRequest;
    if (!i)return!1;
    var r = new i;
    return"withCredentials"in r ? (r.open("POST", t, !0), r.withCredentials = !0, r.setRequestHeader("Content-Type", "text/plain"), r.onreadystatechange = function () {
      4 == r.readyState && (n(), r = null)
    }, r[W](e), !0) : !1
  }, Wt = function (t, n) {
    if (!Et.body)return qt(function () {
      Wt(t, n)
    }), !0;
    t = R(t);
    try {
      var i = Et[Y]('<iframe name="' + t + '"></iframe>')
    } catch (r) {
      i = Et[Y]("iframe"), e(i, t)
    }
    i.height = "0", i.width = "0", i.style.display = "none", i.style.visibility = "hidden";
    var s = Et[Q], s = Rt() + "/analytics_iframe.html#" + R(s[nt] + "//" + s[K] + "/favicon.ico"), o = function () {
      i.src = "", i[wt] && i[wt].removeChild(i)
    };
    St(At, "beforeunload", o);
    var a = !1, c = 0, u = function () {
      if (!a) {
        try {
          if (c > 9 || i.contentWindow[Q][K] == Et[Q][K])return a = !0, o(), Lt(At, "beforeunload", o), void n()
        } catch (t) {
        }
        c++, N(u, 200)
      }
    };
    return St(i, "load", u), Et.body.appendChild(i), i.src = s, !0
  }, Gt = function () {
    this.t = []
  };
  Gt[pt].add = function (t) {
    this.t[ot](t)
  }, Gt[pt].D = function (t) {
    try {
      for (var e = 0; e < this.t[mt]; e++) {
        var n = t.get(this.t[e]);
        n && i(n) && n[$t](At, t)
      }
    } catch (r) {
    }
    e = t.get(pe), e != l && i(e) && (t.set(pe, l, !0), N(e, 10))
  };
  var Yt = function () {
    return F.round(2147483647 * F.random())
  }, Jt = function () {
    try {
      var t = new Uint32Array(1);
      return At.crypto.getRandomValues(t), 2147483647 & t[0]
    } catch (e) {
      return Yt()
    }
  }, Vt = Yt, Kt = function () {
    this.data = new Tt
  }, Xt = new Tt, Qt = [];
  Kt[pt].get = function (t) {
    var e = ie(t), n = this[B].get(t);
    return e && void 0 == n && (n = i(e[ht]) ? e[ht]() : e[ht]), e && e.n ? e.n(this, t, n) : n
  };
  var Zt = function (t, e) {
    var n = t.get(e);
    return void 0 == n ? "" : "" + n
  }, te = function (t, e) {
    var n = t.get(e);
    return void 0 == n || "" === n ? 0 : 1 * n
  };
  Kt[pt].set = function (t, e, n) {
    if (t)if ("object" == typeof t)for (var i in t)t[Z](i) && ee(this, i, t[i], n); else ee(this, t, e, n)
  };
  var ee = function (t, e, n, i) {
    if (void 0 != n)switch (e) {
      case xn:
        $i[ct](n)
    }
    var r = ie(e);
    r && r.o ? r.o(t, e, n, i) : t[B].set(e, n, i)
  }, ne = function (t, n, i, r, s) {
    e(this, t), this.p = n, this.n = r, this.o = s, this.defaultValue = i
  }, ie = function (t) {
    var e = Xt.get(t);
    if (!e)for (var n = 0; n < Qt[mt]; n++) {
      var i = Qt[n], r = i[0].exec(t);
      if (r) {
        e = i[1](r), Xt.set(e[ft], e);
        break
      }
    }
    return e
  }, re = function (t) {
    var e;
    return Xt.map(function (n, i) {
      i.p == t && (e = i)
    }), e && e[ft]
  }, se = function (t, e, n, i, r) {
    return t = new ne(t, e, n, i, r), Xt.set(t[ft], t), t[ft]
  }, oe = function (t, e) {
    Qt[ot]([new RegExp("^" + t + "$"), e])
  }, ae = function (t, e, n) {
    return se(t, e, n, void 0, ce)
  }, ce = function () {
  }, ue = s(O.GoogleAnalyticsObject) && a(O.GoogleAnalyticsObject) || "ga", le = !1, de = ae("apiVersion", "v"), he = ae("clientVersion", "_v");
  se("anonymizeIp", "aip");
  var fe = se("adSenseId", "a"), me = se("hitType", "t"), pe = se("hitCallback"), ge = se("hitPayload");
  se("nonInteraction", "ni"), se("currencyCode", "cu");
  var ve = se("useBeacon", void 0, !1);
  se("dataSource", "ds"), se("sessionControl", "sc", ""), se("sessionGroup", "sg"), se("queueTime", "qt");
  var $e = se("_s", "_s");
  se("screenName", "cd");
  var be = se("location", "dl", ""), ye = se("referrer", "dr"), je = se("page", "dp", "");
  se("hostname", "dh");
  var we = se("language", "ul"), xe = se("encoding", "de");
  se("title", "dt", function () {
    return Et.title || void 0
  }), oe("contentGroup([0-9]+)", function (t) {
    return new ne(t[0], "cg" + t[1])
  });
  var ke = se("screenColors", "sd"), Ce = se("screenResolution", "sr"), Se = se("viewportSize", "vp"), Le = se("javaEnabled", "je"), Te = se("flashVersion", "fl");
  se("campaignId", "ci"), se("campaignName", "cn"), se("campaignSource", "cs"), se("campaignMedium", "cm"), se("campaignKeyword", "ck"), se("campaignContent", "cc");
  var Ae = se("eventCategory", "ec"), Ee = se("eventAction", "ea"), _e = se("eventLabel", "el"), qe = se("eventValue", "ev"), De = se("socialNetwork", "sn"), Pe = se("socialAction", "sa"), He = se("socialTarget", "st"), Ie = se("l1", "plt"), Me = se("l2", "pdt"), Re = se("l3", "dns"), Oe = se("l4", "rrt"), Ne = se("l5", "srt"), Fe = se("l6", "tcp"), ze = se("l7", "dit"), Be = se("l8", "clt"), Ue = se("timingCategory", "utc"), We = se("timingVar", "utv"), Ge = se("timingLabel", "utl"), Ye = se("timingValue", "utt");
  se("appName", "an"), se("appVersion", "av", ""), se("appId", "aid", ""), se("appInstallerId", "aiid", ""), se("exDescription", "exd"), se("exFatal", "exf");
  var Je = se("expId", "xid"), Ve = se("expVar", "xvar"), Ke = se("_utma", "_utma"), Xe = se("_utmz", "_utmz"), Qe = se("_utmht", "_utmht"), Ze = se("_hc", void 0, 0), tn = se("_ti", void 0, 0), en = se("_to", void 0, 20);
  oe("dimension([0-9]+)", function (t) {
    return new ne(t[0], "cd" + t[1])
  }), oe("metric([0-9]+)", function (t) {
    return new ne(t[0], "cm" + t[1])
  }), se("linkerParam", void 0, void 0, q, ce);
  var nn = se("usage", "_u", void 0, function () {
    return Ct.M()
  }, ce);
  se("forceSSL", void 0, void 0, function () {
    return le
  }, function (t, e, i) {
    n(34), le = !!i
  });
  var rn = se("_j1", "jid"), sn = se("_j2", "gjid");
  oe("\\&(.*)", function (t) {
    var e = new ne(t[0], t[1]), n = re(t[0][yt](1));
    return n && (e.n = function (t) {
      return t.get(n)
    }, e.o = function (t, e, i, r) {
      t.set(n, i, r)
    }, e.p = void 0), e
  });
  var on = ae("_oot"), an = se("previewTask"), cn = se("checkProtocolTask"), un = se("validationTask"), ln = se("checkStorageTask"), dn = se("historyImportTask"), hn = se("samplerTask"), fn = ae("_rlt"), mn = se("buildHitTask"), pn = se("sendHitTask"), gn = se("ceTask"), vn = se("devIdTask"), $n = se("timingTask"), bn = se("displayFeaturesTask"), yn = ae("name"), jn = ae("clientId", "cid"), wn = se("userId", "uid"), xn = ae("trackingId", "tid"), kn = ae("cookieName", void 0, "_ga"), Cn = ae("cookieDomain"), Sn = ae("cookiePath", void 0, "/"), Ln = ae("cookieExpires", void 0, 63072e3), Tn = ae("legacyCookieDomain"), An = ae("legacyHistoryImport", void 0, !0), En = ae("storage", void 0, "cookie"), _n = ae("allowLinker", void 0, !1), qn = ae("allowAnchor", void 0, !0), Dn = ae("sampleRate", "sf", 100), Pn = ae("siteSpeedSampleRate", void 0, 1), Hn = ae("alwaysSendReferrer", void 0, !1), In = se("transportUrl"), Mn = se("_r", "_r"), Rn = se("_dfr", void 0, 1), On = function (t) {
    this.V = t, this.fa = void 0, this.$ = !1, this.ha = void 0, this.ea = 1
  }, Nn = function (t, e, n) {
    if (t.fa && t.$)return 0;
    if (t.$ = !0, e) {
      if (t.ha && te(e, t.ha))return te(e, t.ha);
      if (0 == e.get(Pn))return 0
    }
    return 0 == t.V ? 0 : (void 0 === n && (n = Jt()), 0 == n % t.V ? F.floor(n / t.V) % t.ea + 1 : 0)
  }, Fn = function (t, e) {
    var n = F.min(te(t, Pn), 100);
    if (!(M(Zt(t, jn)) % 100 >= n) && (n = {}, zn(n) || Bn(n))) {
      var i = n[Ie];
      void 0 == i || 1 / 0 == i || isNaN(i) || (i > 0 ? (Un(n, Re), Un(n, Fe), Un(n, Ne), Un(n, Me), Un(n, Oe), Un(n, ze), Un(n, Be), e(n)) : St(At, "load", function () {
        Fn(t, e)
      }, !1))
    }
  }, zn = function (t) {
    var e = At.performance || At.webkitPerformance, e = e && e.timing;
    if (!e)return!1;
    var n = e.navigationStart;
    return 0 == n ? !1 : (t[Ie] = e.loadEventStart - n, t[Re] = e.domainLookupEnd - e.domainLookupStart, t[Fe] = e.connectEnd - e.connectStart, t[Ne] = e.responseStart - e.requestStart, t[Me] = e.responseEnd - e.responseStart, t[Oe] = e.fetchStart - n, t[ze] = e.domInteractive - n, t[Be] = e.domContentLoadedEventStart - n, !0)
  }, Bn = function (t) {
    if (At.top != At)return!1;
    var e = At.external, n = e && e.onloadT;
    return e && !e.isValidLoadTime && (n = void 0), n > 2147483648 && (n = void 0), n > 0 && e.setPageReadyTime(), void 0 == n ? !1 : (t[Ie] = n, !0)
  }, Un = function (t, e) {
    var n = t[e];
    (isNaN(n) || 1 / 0 == n || 0 > n) && (t[e] = void 0)
  }, Wn = function (t) {
    return function (e) {
      "pageview" != e.get(me) || t.I || (t.I = !0, Fn(e, function (e) {
        t[W]("timing", e)
      }))
    }
  }, Gn = !1, Yn = function (t) {
    if ("cookie" == Zt(t, En)) {
      var e = Zt(t, kn), i = Kn(t), r = ti(Zt(t, Sn)), s = Qn(Zt(t, Cn)), o = 1e3 * te(t, Ln), a = Zt(t, xn);
      if ("auto" != s)Pt(e, i, r, s, a, o) && (Gn = !0); else {
        n(32);
        var c;
        if (i = [], s = p()[X]("."), 4 != s[mt] || (c = s[s[mt] - 1], parseInt(c, 10) != c)) {
          for (c = s[mt] - 2; c >= 0; c--)i[ot](s[ut](c)[xt]("."));
          i[ot]("none"), c = i
        } else c = ["none"];
        for (var u = 0; u < c[mt]; u++)if (s = c[u], t[B].set(Cn, s), i = Kn(t), Pt(e, i, r, s, a, o))return void(Gn = !0);
        t[B].set(Cn, "auto")
      }
    }
  }, Jn = function (t) {
    if ("cookie" == Zt(t, En) && !Gn && (Yn(t), !Gn))throw"abort"
  }, Vn = function (t) {
    if (t.get(An)) {
      var e = Zt(t, Cn), i = Zt(t, Tn) || p(), r = E("__utma", i, e);
      r && (n(19), t.set(Qe, (new Date)[V](), !0), t.set(Ke, r.R), (e = E("__utmz", i, e)) && r[at] == e[at] && t.set(Xe, e.R))
    }
  }, Kn = function (t) {
    var e = h(Zt(t, jn)), n = Zn(Zt(t, Cn));
    return t = ei(Zt(t, Sn)), t > 1 && (n += "-" + t), ["GA1", n, e][xt](".")
  }, Xn = function (t, e, n) {
    for (var i, r = [], s = [], o = 0; o < t[mt]; o++) {
      var a = t[o];
      a.r[n] == e ? r[ot](a) : void 0 == i || a.r[n] < i ? (s = [a], i = a.r[n]) : a.r[n] == i && s[ot](a)
    }
    return 0 < r[mt] ? r : s
  }, Qn = function (t) {
    return 0 == t[dt](".") ? t.substr(1) : t
  }, Zn = function (t) {
    return Qn(t)[X](".")[mt]
  }, ti = function (t) {
    return t ? (1 < t[mt] && t.lastIndexOf("/") == t[mt] - 1 && (t = t.substr(0, t[mt] - 1)), 0 != t[dt]("/") && (t = "/" + t), t) : "/"
  }, ei = function (t) {
    return t = ti(t), "/" == t ? 1 : t[X]("/")[mt]
  }, ni = new RegExp(/^https?:\/\/([^\/:]+)/), ii = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/, ri = function (t) {
    n(48), this.target = t, this.T = !1
  };
  ri[pt].Q = function (e, n) {
    if (e.tagName) {
      if ("a" == e.tagName[kt]())return void(e[it] && t(e, si(this, e[it], n)));
      if ("form" == e.tagName[kt]())return oi(this, e)
    }
    return"string" == typeof e ? si(this, e, n) : void 0
  };
  var si = function (t, e, n) {
    var i = ii.exec(e);
    i && 3 <= i[mt] && (e = i[1] + (i[3] ? i[2] + i[3] : "")), t = t[vt].get("linkerParam");
    var r = e[dt]("?"), i = e[dt]("#");
    return n ? e += (-1 == i ? "#" : "&") + t : (n = -1 == r ? "?" : "&", e = -1 == i ? e + (n + t) : e[yt](0, i) + n + t + e[yt](i)), e
  }, oi = function (t, e) {
    if (e && e[rt]) {
      var n = t[vt].get("linkerParam")[X]("=")[1];
      if ("get" == e.method[kt]()) {
        for (var i = e.childNodes || [], r = 0; r < i[mt]; r++)if ("_ga" == i[r][ft])return void i[r][J]("value", n);
        i = Et[Y]("input"), i[J]("type", "hidden"), i[J]("name", "_ga"), i[J]("value", n), e.appendChild(i)
      } else"post" == e.method[kt]() && (e.action = si(t, e[rt]))
    }
  };
  ri[pt].S = function (e, i, r) {
    function s(r) {
      try {
        r = r || At.event;
        var s;
        t:{
          var a = r[vt] || r.srcElement;
          for (r = 100; a && r > 0;) {
            if (a[it] && a.nodeName[U](/^a(?:rea)?$/i)) {
              s = a;
              break t
            }
            a = a[wt], r--
          }
          s = {}
        }
        ("http:" == s[nt] || "https:" == s[nt]) && P(e, s[tt] || "") && s[it] && t(s, si(o, s[it], i))
      } catch (c) {
        n(26)
      }
    }

    var o = this;
    if (this.T || (this.T = !0, St(Et, "mousedown", s, !1), St(Et, "touchstart", s, !1), St(Et, "keyup", s, !1)), r) {
      r = function (t) {
        if (t = t || At.event, (t = t[vt] || t.srcElement) && t[rt]) {
          var n = t[rt][U](ni);
          n && P(e, n[1]) && oi(o, t)
        }
      };
      for (var a = 0; a < Et.forms[mt]; a++)St(Et.forms[a], "submit", r)
    }
  };
  var ai, ci = function (t, e, n, i) {
    this.U = e, this.aa = n, (e = i) || (e = (e = Zt(t, yn)) && "t0" != e ? fi[ct](e) ? "_gat_" + h(Zt(t, xn)) : "_gat_" + h(e) : "_gat"), this.Y = e
  }, ui = function (t, e) {
    var n = e.get(mn);
    e.set(mn, function (e) {
      li(t, e);
      var i = n(e);
      return di(t, e), i
    });
    var i = e.get(pn);
    e.set(pn, function (e) {
      var n = i(e);
      return hi(t, e), n
    })
  }, li = function (t, e) {
    e.get(t.U) || ("1" == Dt(t.Y)[0] ? e.set(t.U, "", !0) : e.set(t.U, "" + Vt(), !0))
  }, di = function (t, e) {
    e.get(t.U) && Pt(t.Y, "1", e.get(Sn), e.get(Cn), e.get(xn), 6e5)
  }, hi = function (t, e) {
    if (e.get(t.U)) {
      var n = new Tt, i = function (t) {
        n.set(ie(t).p, e.get(t))
      };
      i(de), i(he), i(xn), i(jn), i(t.U), i(nn);
      var r = t.aa;
      n.map(function (t, e) {
        r += d(t) + "=" + d("" + e) + "&"
      }), r += "z=" + Vt(), u(r), e.set(t.U, "", !0)
    }
  }, fi = /^gtm\d+$/, mi = function (t, e) {
    var i = t.b;
    if (!i.get("dcLoaded")) {
      n(29), At._gaq && n(52), e = e || {};
      var r;
      e[kn] && (r = h(e[kn])), r = new ci(i, rn, "https://stats.g.doubleclick.net/collect?t=dc&aip=1&", r), ui(r, i), i.set("dcLoaded", !0)
    }
  }, pi = function (t) {
    var e;
    t.get("dcLoaded") || "cookie" != t.get(En) ? e = !1 : (e = new On(te(t, Rn)), e = Nn(e, null, M(t.get(jn)))), e && (n(51), e = new ci(t, rn), li(e, t), di(e, t), t.get(e.U) && (t.set(Mn, 1, !0), t.set(In, Rt() + "/r/collect", !0)))
  }, gi = function (t, e) {
    var i = t.b;
    if (!i.get("_rlsaLoaded")) {
      if (n(38), e = e || {}, e[kn])var r = h(e[kn]);
      r = new ci(i, sn, "https://www.google.com/ads/ga-audiences?t=sr&aip=1&", r), ui(r, i), i.set("_rlsaLoaded", !0), Ai("displayfeatures", t, e)
    }
  }, vi = function (t, e, n) {
    if (!ai) {
      var i;
      i = Et[Q][at];
      var r = At[ft], s = /^#?gaso=([^&]*)/;
      (r = (i = (i = i && i[U](s) || r && r[U](s)) ? i[1] : Dt("GASO")[0] || "") && i[U](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i)) && (Pt("GASO", "" + i, n, e, t, 0), O._udo || (O._udo = e), O._utcp || (O._utcp = n), t = r[1], f("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (t ? "prefix=" + t + "&" : "") + Vt(), "_gasojs")), ai = !0
    }
  }, $i = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/, bi = function (t) {
    function e(t, e) {
      i.b[B].set(t, e)
    }

    function n(t, n) {
      e(t, n), i.filters.add(t)
    }

    var i = this;
    this.b = new Kt, this.filters = new Gt, e(yn, t[yn]), e(xn, a(t[xn])), e(kn, t[kn]), e(Cn, t[Cn] || p()), e(Sn, t[Sn]), e(Ln, t[Ln]), e(Tn, t[Tn]), e(An, t[An]), e(_n, t[_n]), e(qn, t[qn]), e(Dn, t[Dn]), e(Pn, t[Pn]), e(Hn, t[Hn]), e(En, t[En]), e(wn, t[wn]), e(de, 1), e(he, "j30"), n(on, b), n(an, k), n(cn, y), n(un, S), n(ln, Jn), n(dn, Vn), n(hn, $), n(fn, L), n(gn, x), n(vn, C), n(bn, pi), n(mn, j), n(pn, w), n($n, Wn(this)), yi(this.b, t[jn]), ji(this.b), this.b.set(fe, H()), vi(this.b.get(xn), this.b.get(Cn), this.b.get(Sn))
  }, yi = function (t, e) {
    if ("cookie" == Zt(t, En)) {
      Gn = !1;
      var i;
      t:{
        var r = Dt(Zt(t, kn));
        if (r && !(1 > r[mt])) {
          i = [];
          for (var s = 0; s < r[mt]; s++) {
            var o;
            o = r[s][X](".");
            var a = o.shift();
            ("GA1" == a || "1" == a) && 1 < o[mt] ? (a = o.shift()[X]("-"), 1 == a[mt] && (a[1] = "1"), a[0] *= 1, a[1] *= 1, o = {r: a, s: o[xt](".")}) : o = void 0, o && i[ot](o)
          }
          if (1 == i[mt]) {
            n(13), i = i[0].s;
            break t
          }
          if (0 != i[mt]) {
            if (n(14), r = Zn(Zt(t, Cn)), i = Xn(i, r, 0), 1 == i[mt]) {
              i = i[0].s;
              break t
            }
            r = ei(Zt(t, Sn)), i = Xn(i, r, 1), i = i[0] && i[0].s;
            break t
          }
          n(12)
        }
        i = void 0
      }
      i || (i = Zt(t, Cn), r = Zt(t, Tn) || p(), i = E("__utma", r, i), (i = void 0 == i ? void 0 : i.O[1] + "." + i.O[2]) && n(10)), i && (t[B].set(jn, i), Gn = !0)
    }
    i = t.get(qn), (s = (i = Et[Q][i ? "href" : "search"][U]("(?:&|#|\\?)" + d("_ga")[z](/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)")) && 2 == i[mt] ? i[1] : "") && (t.get(_n) ? (i = s[dt]("."), -1 == i ? n(22) : (r = s[yt](i + 1), "1" != s[yt](0, i) ? n(22) : (i = r[dt]("."), -1 == i ? n(22) : (s = r[yt](0, i), i = r[yt](i + 1), s != D(i, 0) && s != D(i, -1) && s != D(i, -2) ? n(23) : (n(11), t[B].set(jn, i)))))) : n(21)), e && (n(9), t[B].set(jn, d(e))), t.get(jn) || ((i = (i = At.gaGlobal && At.gaGlobal.vid) && -1 != i[et](/^(?:utma\.)?\d+\.\d+$/) ? i : void 0) ? (n(17), t[B].set(jn, i)) : (n(8), t[B].set(jn, c()))), Yn(t)
  }, ji = function (t) {
    var e = At[jt], i = At.screen, r = Et[Q];
    if (t.set(ye, g(t.get(Hn))), r) {
      var s = r.pathname || "";
      "/" != s.charAt(0) && (n(31), s = "/" + s), t.set(be, r[nt] + "//" + r[tt] + s + r[et])
    }
    i && t.set(Ce, i.width + "x" + i.height), i && t.set(ke, i.colorDepth + "-bit");
    var i = Et.documentElement, a = (s = Et.body) && s[gt] && s[bt], c = [];
    if (i && i[gt] && i[bt] && ("CSS1Compat" === Et.compatMode || !a) ? c = [i[gt], i[bt]] : a && (c = [s[gt], s[bt]]), i = 0 >= c[0] || 0 >= c[1] ? "" : c[xt]("x"), t.set(Se, i), t.set(Te, A()), t.set(xe, Et.characterSet || Et.charset), t.set(Le, e && "function" == typeof e.javaEnabled && e.javaEnabled() || !1), t.set(we, (e && (e.language || e.browserLanguage) || "")[kt]()), r && t.get(qn) && (e = Et[Q][at])) {
      for (e = e[X](/[?&#]+/), r = [], i = 0; i < e[mt]; ++i)(o(e[i], "utm_id") || o(e[i], "utm_campaign") || o(e[i], "utm_source") || o(e[i], "utm_medium") || o(e[i], "utm_term") || o(e[i], "utm_content") || o(e[i], "gclid") || o(e[i], "dclid") || o(e[i], "gclsrc")) && r[ot](e[i]);
      0 < r[mt] && (e = "#" + r[xt]("&"), t.set(be, t.get(be) + e))
    }
  };
  bi[pt].get = function (t) {
    return this.b.get(t)
  }, bi[pt].set = function (t, e) {
    this.b.set(t, e)
  };
  var wi = {pageview: [je], event: [Ae, Ee, _e, qe], social: [De, Pe, He], timing: [Ue, We, Ye, Ge]};
  bi[pt].send = function (t) {
    if (!(1 > arguments[mt])) {
      var e, i;
      "string" == typeof arguments[0] ? (e = arguments[0], i = [][ut][$t](arguments, 1)) : (e = arguments[0] && arguments[0][me], i = arguments), e && (i = v(wi[e] || [], i), i[me] = e, this.b.set(i, void 0, !0), this.filters.D(this.b), this.b[B].m = {}, n(44))
    }
  };
  var xi, ki, Ci, Si = function (t) {
    return"prerender" == Et.visibilityState ? !1 : (t(), !0)
  }, Li = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/, Ti = function (t) {
    if (i(t[0]))this.u = t[0]; else {
      var e = Li.exec(t[0]);
      if (null != e && 4 == e[mt] && (this.c = e[1] || "t0", this.e = e[2] || "", this.d = e[3], this.a = [][ut][$t](t, 1), this.e || (this.A = "create" == this.d, this.i = "require" == this.d, this.g = "provide" == this.d, this.ba = "remove" == this.d), this.i && (3 <= this.a[mt] ? (this.X = this.a[1], this.W = this.a[2]) : this.a[1] && (s(this.a[1]) ? this.X = this.a[1] : this.W = this.a[1]))), e = t[1], t = t[2], !this.d)throw"abort";
      if (this.i && (!s(e) || "" == e))throw"abort";
      if (this.g && (!s(e) || "" == e || !i(t)))throw"abort";
      if (I(this.c) || I(this.e))throw"abort";
      if (this.g && "t0" != this.c)throw"abort"
    }
  };
  xi = new Tt, Ci = new Tt, ki = {ec: 45, ecommerce: 46, linkid: 47};
  var Ai = function (t, e, r) {
    e == qi ? n(35) : e.get(yn);
    var s = xi.get(t);
    return i(s) ? (e.plugins_ = e.plugins_ || new Tt, e.plugins_.get(t) ? !0 : (e.plugins_.set(t, new s(e, r || {})), !0)) : !1
  }, Ei = function (e) {
    function n(t) {
      var e = (t[tt] || "")[X](":")[0][kt](), n = (t[nt] || "")[kt](), n = 1 * t[G] || ("http:" == n ? 80 : "https:" == n ? 443 : "");
      return t = t.pathname || "", o(t, "/") || (t = "/" + t), [e, "" + n, t]
    }

    var i = Et[Y]("a");
    t(i, Et[Q][it]);
    var r = (i[nt] || "")[kt](), s = n(i), a = i[et] || "", c = r + "//" + s[0] + (s[1] ? ":" + s[1] : "");
    return o(e, "//") ? e = r + e : o(e, "/") ? e = c + e : !e || o(e, "?") ? e = c + s[2] + (e || a) : 0 > e[X]("/")[0][dt](":") && (e = c + s[2][yt](0, s[2].lastIndexOf("/")) + "/" + e), t(i, e), r = n(i), {protocol: (i[nt] || "")[kt](), host: r[0], port: r[1], path: r[2], G: i[et] || "", url: e || ""}
  }, _i = {ga: function () {
    _i.f = []
  }};
  _i.ga(), _i.D = function (t) {
    var e = _i.J[st](_i, arguments), e = _i.f.concat(e);
    for (_i.f = []; 0 < e[mt] && !_i.v(e[0]) && (e.shift(), !(0 < _i.f[mt])););
    _i.f = _i.f.concat(e)
  }, _i.J = function (t) {
    for (var e = [], r = 0; r < arguments[mt]; r++)try {
      var s = new Ti(arguments[r]);
      if (s.g)xi.set(s.a[0], s.a[1]); else {
        if (s.i) {
          var a = s, c = a.a[0];
          if (!i(xi.get(c)) && !Ci.get(c)) {
            ki[Z](c) && n(ki[c]);
            var u = a.X;
            if (!u && ki[Z](c) ? (n(39), u = c + ".js") : n(43), u) {
              u && 0 <= u[dt]("/") || (u = m() + "//www.google-analytics.com/plugins/ua/" + u);
              var l, d = Ei(u), a = void 0, h = d[nt], p = Et[Q][nt], a = "https:" == h || h == p ? !0 : "http:" != h ? !1 : "http:" == p;
              if (l = a) {
                var a = d, g = Ei(Et[Q][it]);
                if (a.G || 0 <= a.url[dt]("?") || 0 <= a.path[dt]("://"))l = !1; else if (a[K] == g[K] && a[G] == g[G])l = !0; else {
                  var v = "http:" == a[nt] ? 80 : 443;
                  l = "www.google-analytics.com" == a[K] && (a[G] || v) == v && o(a.path, "/plugins/") ? !0 : !1
                }
              }
              l && (f(d.url), Ci.set(c, !0))
            }
          }
        }
        e[ot](s)
      }
    } catch ($) {
    }
    return e
  }, _i.v = function (t) {
    try {
      if (t.u)t.u[$t](At, qi.j("t0")); else {
        var e = t.c == ue ? qi : qi.j(t.c);
        if (t.A)"t0" == t.c && qi.create[st](qi, t.a); else if (t.ba)qi.remove(t.c); else if (e)if (t.i) {
          if (!Ai(t.a[0], e, t.W))return!0
        } else if (t.e) {
          var n = t.d, i = t.a, r = e.plugins_.get(t.e);
          r[n][st](r, i)
        } else e[t.d][st](e, t.a)
      }
    } catch (s) {
    }
  };
  var qi = function (t) {
    n(1), _i.D[st](_i, [arguments])
  };
  qi.h = {}, qi.P = [], qi.L = 0, qi.answer = 42;
  var Di = [xn, Cn, yn];
  qi.create = function (t) {
    var e = v(Di, [][ut][$t](arguments));
    e[yn] || (e[yn] = "t0");
    var n = "" + e[yn];
    return qi.h[n] ? qi.h[n] : (e = new bi(e), qi.h[n] = e, qi.P[ot](e), e)
  }, qi.remove = function (t) {
    for (var e = 0; e < qi.P[mt]; e++)if (qi.P[e].get(yn) == t) {
      qi.P.splice(e, 1), qi.h[t] = null;
      break
    }
  }, qi.j = function (t) {
    return qi.h[t]
  }, qi.K = function () {
    return qi.P[ut](0)
  }, qi.N = function () {
    "ga" != ue && n(49);
    var t = At[ue];
    if (!t || 42 != t.answer) {
      qi.L = t && t.l, qi.loaded = !0;
      var e = At[ue] = qi;
      T("create", e, e.create, 3), T("remove", e, e.remove), T("getByName", e, e.j, 5), T("getAll", e, e.K, 6), e = bi[pt], T("get", e, e.get, 7), T("set", e, e.set, 4), T("send", e, e[W], 2), e = Kt[pt],
        T("get", e, e.get), T("set", e, e.set), (At.gaplugins = At.gaplugins || {}).Linker = ri, e = ri[pt], xi.set("linker", ri), T("decorate", e, e.Q, 20), T("autoLink", e, e.S, 25), xi.set("displayfeatures", mi), xi.set("adfeatures", gi), t = t && t.q, r(t) ? _i.D[st](qi, t) : n(50)
    }
  }, function () {
    var t = qi.N;
    if (!Si(t)) {
      n(16);
      var e = !1, i = function () {
        !e && Si(t) && (e = !0, Lt(Et, "visibilitychange", i))
      };
      St(Et, "visibilitychange", i)
    }
  }()
}(window),function () {
  var t, e, n, i, r;
  window.GoogleAnalyticsObject = "ga", null == window.ga && (window.ga = function () {
    var t;
    return null == (t = window.ga).q && (t.q = []), window.ga.q.push(arguments)
  }), window.ga.l = Date.now(), t = function () {
    var t, e, n, i;
    return t = $("meta[name=analytics-location]").last()[0], e = $("meta[name=analytics-location-params]").last()[0], i = (null != t ? t.content : void 0) || window.location.pathname, n = e ? (window.location.search ? window.location.search + "&" : "?") + e.content : window.location.search, i + n
  }, e = function () {
    return $("meta[name=analytics-location]").length ? document.title.replace(/([\w-]+\/)+[\w\.-]+/g, "private/private") : document.title
  }, r = function () {
    var n, i, r, s, o;
    for (r = window.location.protocol + "//" + window.location.host + t(), window.ga("set", "title", e()), window.ga("set", "location", r), o = document.querySelectorAll("meta.js-ga-set"), n = 0, i = o.length; i > n; n++)s = o[n], window.ga("set", s.name, s.content)
  }, n = function () {
    var n;
    return n = {title: e(), path: t()}, window.ga("send", "pageview", n)
  }, i = function () {
    return r(), n()
  }, function () {
    var t;
    if (t = document.querySelector("meta[name=google-analytics]"))return window.ga("create", t.content, "github.com"), r()
  }(), $(function () {
    return n()
  }), $(document).on("pjax:complete", function () {
    return setTimeout(i, 20)
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, b, y, j, w, x, k, C, S, L, T = [].indexOf || function (t) {
    for (var e = 0, n = this.length; n > e; e++)if (e in this && this[e] === t)return e;
    return-1
  };
  x = function (t) {
    var e;
    return(null != (e = t.closest("form").elements.authenticity_token) ? e.value : void 0) || function () {
      throw new Error($(t).inspect() + " is missing authenticity_token")
    }()
  }, t = function () {
    function t() {
      this.uploads = [], this.busy = !1
    }

    return t.prototype.upload = function (t, e) {
      var n;
      return n = function () {
      }, this.uploads.push({file: t, to: e.to, sameOrigin: e.sameOrigin, csrf: e.csrf, form: e.form || {}, header: e.header || {}, start: e.start || n, progress: e.progress || n, complete: e.complete || n, error: e.error || n}), this.process()
    }, t.prototype.process = function () {
      var t, e, n, i, r, s, o;
      if (!this.busy && 0 !== this.uploads.length) {
        r = this.uploads.shift(), this.busy = !0, o = new XMLHttpRequest, o.open("POST", r.to, !0), n = r.header;
        for (e in n)s = n[e], o.setRequestHeader(e, s);
        o.onloadstart = function () {
          return r.start()
        }, o.onload = function (t) {
          return function () {
            var e;
            return 204 === o.status ? (e = o.getResponseHeader("Location"), r.complete({href: e})) : 201 === o.status ? r.complete(JSON.parse(o.responseText)) : r.error({status: o.status, body: o.responseText}), t.busy = !1, t.process()
          }
        }(this), o.onerror = function () {
          return r.error({status: 0, body: ""})
        }, o.upload.onprogress = function (t) {
          var e;
          return t.lengthComputable ? (e = Math.round(t.loaded / t.total * 100), r.progress(e)) : void 0
        }, t = new FormData, r.sameOrigin && t.append("authenticity_token", r.csrf), i = r.form;
        for (e in i)s = i[e], t.append(e, s);
        return t.append("file", r.file), o.send(t)
      }
    }, t
  }(), y = ["is-default", "is-uploading", "is-bad-file", "is-duplicate-filename", "is-too-big", "is-failed", "is-bad-dimensions", "is-empty", "is-bad-permissions", "is-repository-required"], u = function (t, e, n) {
    return t.dispatchEvent(new CustomEvent(e, {bubbles: !0, cancelable: !0, detail: n}))
  }, w = function (t, e) {
    var n;
    return(n = t.classList).remove.apply(n, y), t.classList.add(e)
  }, L = new t, j = function (t, e) {
    var n, i;
    return n = s(t, e), i = [], u(e, "upload:setup", {file: t, policyRequest: n, preprocess: i}) ? Promise.all(i).then(function () {
      return $.fetchJSON(n.url, n)
    }).then(function (n) {
      var i;
      return u(e, "upload:start", {file: t, policy: n}), i = o(t, n, e), L.upload(t, i)
    })["catch"](function (n) {
      var i;
      return u(e, "upload:invalid", {file: t, error: n}), null != n.response ? n.response.text().then(function (i) {
        var r, s;
        return s = n.response.status, r = b({status: s, body: i}, t), w(e, r)
      }) : (i = b({status: 0}), w(e, i))
    }) : void 0
  }, s = function (t, e) {
    var n, i, r;
    return r = e.getAttribute("data-upload-policy-url"), i = e.getAttribute("data-upload-repository-id"), n = new FormData, n.append("name", t.name), n.append("size", t.size), n.append("content_type", t.type), n.append("authenticity_token", x(e)), i && n.append("repository_id", i), {url: r, method: "post", body: n, headers: {}}
  }, b = function (t, e) {
    var n, i, r, s, o, a;
    if (400 === t.status)return"is-bad-file";
    if (422 !== t.status)return"is-failed";
    if (i = JSON.parse(t.body), null == (null != i ? i.errors : void 0))return"is-failed";
    for (o = i.errors, r = 0, s = o.length; s > r; r++)switch (n = o[r], n.field) {
      case"size":
        return a = null != e ? e.size : void 0, null != a && 0 === parseInt(a) ? "is-empty" : "is-too-big";
      case"width":
      case"height":
        return"is-bad-dimensions";
      case"name":
        return"already_exists" === n.code ? "is-duplicate-filename" : "is-bad-file";
      case"content_type":
        return"is-bad-file";
      case"uploader_id":
        return"is-bad-permissions";
      case"repository_id":
        return"is-repository-required"
    }
    return"is-failed"
  }, o = function (t, e, n) {
    var i;
    return i = {to: e.upload_url, form: e.form, header: e.header, sameOrigin: e.same_origin, csrf: x(n), start: function () {
      return w(n, "is-uploading")
    }, progress: function (e) {
      return u(n, "upload:progress", {file: t, percent: e})
    }, complete: function (i) {
      var r, s;
      return(null != (s = e.asset_upload_url) ? s.length : void 0) > 0 && (r = new FormData, r.append("authenticity_token", x(n)), $.fetchJSON(e.asset_upload_url, {method: "put", body: r})), u(n, "upload:complete", {file: t, policy: e, result: i}), w(n, "is-default")
    }, error: function (i) {
      var r;
      return u(n, "upload:error", {file: t, policy: e}), r = b(i), w(n, r)
    }}
  }, k = function (t) {
    return t.types ? T.call(t.types, "Files") >= 0 : !1
  }, C = function (t) {
    return t.types ? T.call(t.types, "text/uri-list") >= 0 : !1
  }, S = function (t) {
    return t.types ? T.call(t.types, "text/plain") >= 0 : !1
  }, e = function (t, e) {
    var n, i, r, s;
    for (s = [], i = 0, r = t.length; r > i; i++)n = t[i], s.push(j(n, e));
    return s
  }, n = function (t, e) {
    var n, i, r, s, o, a, c;
    if (t) {
      for (n = e.querySelector(".js-comment-field"), o = t.split("\r\n"), a = [], i = 0, r = o.length; r > i; i++)s = o[i], c = l(s) ? "\n![](" + s + ")\n" : s, a.push($(n).insertText(c));
      return a
    }
  }, i = function (t, e) {
    var n;
    return n = e.querySelector(".js-comment-field"), $(n).insertText(t)
  }, l = function (t) {
    var e;
    return e = t.split(".").pop(), "gif" === e || "png" === e || "jpg" === e || "jpeg" === e
  }, a = function (t) {
    return k(t) ? "copy" : C(t) ? "link" : S(t) ? "copy" : "none"
  }, c = function (t) {
    switch (t) {
      case"image/gif":
        return"image.gif";
      case"image/png":
        return"image.png";
      case"image/jpeg":
        return"image.jpg"
    }
  }, f = function (t) {
    return t.preventDefault()
  }, h = function (t) {
    return t.dataTransfer.dropEffect = "none", t.preventDefault()
  }, m = function (t) {
    var e;
    return e = a(t.dataTransfer), t.dataTransfer.dropEffect = e, this.classList.add("dragover"), t.stopPropagation(), t.preventDefault()
  }, p = function (t) {
    return t.dataTransfer.dropEffect = "none", this.classList.remove("dragover"), t.stopPropagation(), t.preventDefault()
  }, g = function (t) {
    var r;
    return this.classList.remove("dragover"), r = t.dataTransfer, r.types ? k(r) ? e(r.files, this) : C(r) ? n(r.getData("text/uri-list"), this) : S(r) && i(r.getData("text/plain"), this) : w(this, "is-bad-browser"), t.stopPropagation(), t.preventDefault()
  }, v = function (t) {
    var n, i, r, s, o, a, u;
    if (null != (null != (a = t.clipboardData) ? a.items : void 0)) {
      for (u = t.clipboardData.items, r = 0, o = u.length; o > r && (s = u[r], !(i = c(s.type))); r++);
      if (i)return n = s.getAsFile(), n.name = i, e([n], this), t.preventDefault()
    }
  }, d = function (t) {
    return t.target.classList.contains("js-manual-file-chooser") ? (t.target.files ? e(t.target.files, this) : w(this, "is-bad-browser"), t.target.value = "") : void 0
  }, r = 0, $.observe(".js-uploadable-container", {add: function () {
    return 0 === r++ && (document.addEventListener("drop", f), document.addEventListener("dragover", h)), this.addEventListener("dragenter", m), this.addEventListener("dragover", m), this.addEventListener("dragleave", p), this.addEventListener("drop", g), this.addEventListener("paste", v), this.addEventListener("change", d)
  }, remove: function () {
    return 0 === --r && (document.removeEventListener("drop", f), document.removeEventListener("dragover", h)), this.removeEventListener("dragenter", m), this.removeEventListener("dragover", m), this.removeEventListener("dragleave", p), this.removeEventListener("drop", g), this.removeEventListener("paste", v), this.removeEventListener("change", d)
  }}), ("undefined" == typeof FormData || null === FormData) && document.documentElement.classList.add("no-dnd-uploads")
}.call(this),function () {
  var t, e;
  $(document).on("click", ".js-release-remove-file", function () {
    var t;
    t = this.closest(".js-release-file"), t.classList.add("delete"), t.querySelector("input.destroy").value = "true"
  }), $(document).on("click", ".js-release-undo-remove-file", function () {
    var t;
    t = this.closest(".js-release-file"), t.classList.remove("delete"), t.querySelector("input.destroy").value = ""
  }), e = function (t) {
    return t.closest("form").querySelector("#release_id").value
  }, t = [], $(document).on("release:saved", ".js-release-form", function () {
    var e, n, i, r, s, o;
    for (setImmediate(function () {
      var e, n, i;
      for (e = 0, n = t.length; n > e; e++)(i = t[e])();
      return t.length = 0
    }), o = 0, s = this.querySelectorAll(".js-releases-field .js-release-file"), i = 0, r = s.length; r > i; i++)e = s[i], e.classList.contains("delete") ? e.remove() : e.classList.contains("js-template") || o++;
    return n = this.querySelector(".js-releases-field"), n.classList.toggle("not-populated", !o), n.classList.toggle("is-populated", o)
  }), $(document).on("upload:setup", ".js-upload-release-file", function (n) {
    var i, r, s, o, a;
    return a = n.originalEvent.detail, s = a.policyRequest, o = a.preprocess, r = this, i = function () {
      var t, n, i;
      return s.body.append("release_id", e(r)), i = document.querySelectorAll(".js-releases-field .js-release-file.delete .id"), i.length ? (n = function () {
        var e, n, r;
        for (r = [], e = 0, n = i.length; n > e; e++)t = i[e], r.push(t.value);
        return r
      }(), s.body.append("deletion_candidates", n.join(","))) : void 0
    }, e(r) ? i() : (o.push(new Promise(function (e) {
      return t.push(e)
    }).then(i)), 1 === t.length ? $("button.js-save-draft").click() : void 0)
  }), $(document).on("upload:start", ".js-upload-release-file", function (t) {
    var e, n, i, r, s, o, a;
    if (r = t.originalEvent.detail.policy, this.querySelector(".js-upload-meter").classList.remove("hidden"), o = r.asset.replaced_asset) {
      for (s = document.querySelectorAll(".js-releases-field .js-release-file .id"), a = [], n = 0, i = s.length; i > n; n++)e = s[n], Number(e.value) === o ? a.push(e.closest(".js-release-file").remove()) : a.push(void 0);
      return a
    }
  }), $(document).on("upload:complete", ".js-upload-release-file", function (t) {
    var e, n, i, r, s, o, a, c, u;
    for (a = t.originalEvent.detail.policy, n = document.querySelector(".js-releases-field"), u = n.querySelector(".js-template").cloneNode(!0), u.classList.remove("template", "js-template"), u.querySelector("input.id").value = a.asset.id, o = a.asset.name || a.asset.href.split("/").pop(), c = u.querySelectorAll(".filename"), r = 0, s = c.length; s > r; r++)e = c[r], "INPUT" === e.tagName ? e.value = o : e.textContent = o;
    return i = "", a.asset.size && (i = "(" + (a.asset.size / 1048576).toFixed(2) + " MB)"), u.querySelector(".filesize").textContent = i, n.appendChild(u), n.classList.remove("not-populated"), n.classList.add("is-populated"), this.querySelector(".js-upload-meter").classList.add("hidden")
  }), $(document).on("upload:progress", ".js-upload-release-file", function (t) {
    var e;
    return e = this.querySelector(".js-upload-meter"), e.style.width = t.originalEvent.detail.percent + "%"
  })
}.call(this),function () {
  var t, e;
  t = [], e = new WeakMap, $(document).on("upload:setup", ".js-upload-manifest-file", function (n) {
    var i, r, s, o, a, c;
    return c = n.originalEvent.detail, o = c.policyRequest, a = c.preprocess, r = this, i = function () {
      return o.body.append("upload_manifest_id", e.get(r))
    }, e.get(r) ? i() : a.push(new Promise(function (e) {
      return t.push(e)
    }).then(i)), t.length > 1 ? void 0 : (s = this.closest(".js-upload-manifest-file-container").querySelector(".js-upload-manifest-form"), $.fetchJSON(s.action, {method: s.method, body: new FormData(s)}).then(function (n) {
      var i, s, o;
      for (e.set(r, n.upload_manifest.id), i = 0, s = t.length; s > i; i++)(o = t[i])();
      return t.length = 0
    }))
  }), $(document).on("upload:start", ".js-upload-manifest-file", function (t) {
    return this.querySelector(".js-upload-meter").classList.remove("hidden")
  }), $(document).on("upload:complete", ".js-upload-manifest-file", function (t) {
    return this.querySelector(".js-upload-meter").classList.add("hidden")
  }), $(document).on("upload:progress", ".js-upload-manifest-file", function (t) {
    var e;
    return e = this.querySelector(".js-upload-meter"), e.style.width = t.originalEvent.detail.percent + "%"
  })
}.call(this),function () {
  var t, e, n, i, r, s, o;
  o = document.createElement("input"), "checkValidity"in o ? (o.required = !0, o.value = "hi", s = o.cloneNode().checkValidity()) : s = !1, o = null, n = function (i) {
    var r, o, a, c, u;
    if (s)return i.checkValidity();
    if (r = $(i), r.is("[required]") && !e(i))return!1;
    if (r.is("[pattern]") && !t(i))return!1;
    if (r.is("form"))for (u = i.elements, a = 0, c = u.length; c > a; a++)if (o = u[a], !n(o))return!1;
    return!0
  }, e = function (t) {
    return!!t.value.trim()
  }, t = function (t) {
    var e;
    return e = new RegExp("^(?:" + $(t).attr("pattern") + ")$"), 0 === t.value.search(e)
  }, i = function () {
    var t;
    return t = n(this), t && $(this).trigger("validation:field:change"), function () {
      var e;
      e = n(this), e !== t && $(this).trigger("validation:field:change"), t = e
    }
  }, r = ["input[pattern]", "input[required]", "textarea[required]", "select[required]"].join(","), $(document).onFocusedInput(r, i), $(document).on("change", r, i), $.observe(r, function () {
    $(this).trigger("validation:field:change")
  }), $(document).on("validation:field:change", "form", function () {
    var t;
    return t = n(this), $(this).trigger("validation:change", [t])
  }), $(document).on("validation:change", "form", function (t, e) {
    return $(this).find("button[data-disable-invalid]").prop("disabled", !e)
  }), $(document).on("submit", ".js-normalize-submit", function (t) {
    return n(this) ? void 0 : t.preventDefault()
  })
}.call(this),function () {
  var t;
  $.observe(".will-transition-once", {add: function () {
    this.addEventListener("transitionend", t)
  }, remove: function () {
    this.removeEventListener("transitionend", t)
  }}), t = function (t) {
    return t.target.classList.remove("will-transition-once")
  }
}.call(this),function () {
  $(document).on("ajaxSuccess", function (t, e) {
    var n;
    (n = e.getResponseHeader("X-XHR-Location")) && (document.location.href = n, t.stopImmediatePropagation())
  })
}.call(this),function () {
  var t;
  t = function () {
    var t, e;
    e = $(this), t = e.find(":selected"), t.attr("data-already-member") ? ($(".js-account-membership-form").addClass("is-member"), $(".js-account-membership-form").removeClass("is-not-member")) : ($(".js-account-membership-form").removeClass("is-member"), $(".js-account-membership-form").addClass("is-not-member"))
  }, $.observe(".js-account-membership", t), $(document).on("change", ".js-account-membership", t)
}.call(this),function () {
  var t, e, n, i, r, s = {}.hasOwnProperty, o = [].slice;
  n = function (t) {
    return console && console.log ? console.log(t) : void 0
  }, r = function (t) {
    return console && console.warn ? console.warn(t) : void 0
  }, e = function (t, e) {
    var n, i, r;
    if (t.length !== e.length)return!1;
    for (n = i = 0, r = t.length; r >= 0 ? r > i : i > r; n = r >= 0 ? ++i : --i)if (t[n] !== e[n])return!1;
    return!0
  }, t = {host: "collector.githubapp.com", type: "page_view", dimensions: {}, measures: {}, context: {}, actor: {}, image: new Image, performance: {}, expectedPerformanceTimingKeys: ["connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart"], recordPageView: function () {
    return this.applyMetaTags(), null == this.app ? (r("App not set, you are doing something wrong"), !1) : null == this.host ? (r("Host not set, you are doing something wrong"), !1) : (this.image.src = this._src(), this._clearPerformance(), !0)
  }, setHost: function (t) {
    return this.host = t
  }, setApp: function (t) {
    return this.app = t
  }, setDimensions: function (t) {
    return this.dimensions = t
  }, addDimensions: function (t) {
    var e, n, i;
    null == this.dimensions && (this.dimensions = {}), n = [];
    for (e in t)s.call(t, e) && (i = t[e], n.push(this.dimensions[e] = i));
    return n
  }, setMeasures: function (t) {
    return this.measures = t
  }, setMeasures: function (t) {
    return this.measures = t
  }, addMeasures: function (t) {
    var e, n, i;
    null == this.measures && (this.measures = {}), n = [];
    for (e in t)s.call(t, e) && (i = t[e], n.push(this.measures[e] = i));
    return n
  }, setContext: function (t) {
    return this.context = t
  }, addContext: function (t) {
    var e, n, i;
    null == this.context && (this.context = {}), n = [];
    for (e in t)s.call(t, e) && (i = t[e], n.push(this.context[e] = i));
    return n
  }, setActor: function (t) {
    return this.actor = t
  }, push: function (t) {
    return this.applyCall(t)
  }, enablePerformance: function () {
    return this.performance = this._performanceTiming()
  }, _recordSrc: function (t, e, n, i) {
    return"//" + this.host + "/" + this.app + "/" + t + "?" + this._queryString(e, n, i)
  }, _src: function () {
    return"//" + this.host + "/" + this.app + "/" + this.type + "?" + this._queryString()
  }, _queryString: function (t, e, n) {
    var i, r, s;
    return r = function () {
      var t, e;
      t = this._params(), e = [];
      for (i in t)s = t[i], e.push("dimensions[" + i + "]=" + s);
      return e
    }.call(this), r.push(this._encodeObject("dimensions", this._merge(this.dimensions, t))), r.push(this._encodeObject("measures", this._merge(this.measures, e))), null != this.performance && r.push(this._encodeObject("measures", {performance_timing: this.performance})), r.push(this._encodeObject("context", this._merge(this.context, n))), r.push(this._actor()), r.push(this._encodeObject("dimensions", {cid: this._clientId()})), r.join("&")
  }, _clearPerformance: function () {
    return this.performance = null
  }, _performanceTiming: function () {
    var t, e, n, i, r, s, o, a, c, u, l, d, h;
    if (null == (null != (o = window.performance) && null != (a = o.timing) ? a.navigationStart : void 0))return null;
    for (l = {}, c = this.expectedPerformanceTimingKeys, e = 0, i = c.length; i > e; e++)n = c[e], l[n] = null != (u = window.performance.timing[n]) ? u : 0;
    h = 1, s = [], t = l.navigationStart;
    for (n in l)d = l[n], r = 0 === d ? null : d - t, s.push(r);
    return h + "-" + s.join("-")
  }, _params: function () {
    return{page: this._encode(this._page()), title: this._encode(this._title()), referrer: this._encode(this._referrer()), user_agent: this._encode(this._agent()), screen_resolution: this._encode(this._screenResolution()), pixel_ratio: this._encode(this._pixelRatio()), browser_resolution: this._encode(this._browserResolution()), tz_seconds: this._encode(this._tzSeconds()), timestamp: (new Date).getTime()}
  }, _page: function () {
    var t, e;
    try {
      return document.location.href
    } catch (e) {
      return t = e, ""
    }
  }, _title: function () {
    var t, e;
    try {
      return document.title
    } catch (e) {
      return t = e, ""
    }
  }, _referrer: function () {
    var t, e, n, i;
    i = "";
    try {
      i = window.top.document.referrer
    } catch (e) {
      if (t = e, window.parent)try {
        i = window.parent.document.referrer
      } catch (n) {
        t = n
      }
    }
    return"" === i && (i = document.referrer), i
  }, _agent: function () {
    var t, e;
    try {
      return navigator.userAgent
    } catch (e) {
      return t = e, ""
    }
  }, _screenResolution: function () {
    var t, e;
    try {
      return screen.width + "x" + screen.height
    } catch (e) {
      return t = e, "unknown"
    }
  }, _pixelRatio: function () {
    return window.devicePixelRatio
  }, _browserResolution: function () {
    var t, e, n, i, r, s;
    try {
      return s = 0, n = 0, "number" == typeof window.innerWidth ? (s = window.innerWidth, n = window.innerHeight) : null != (null != (i = document.documentElement) ? i.clientWidth : void 0) ? (s = document.documentElement.clientWidth, n = document.documentElement.clientHeight) : null != (null != (r = document.body) ? r.clientWidth : void 0) && (s = document.body.clientWidth, n = document.body.clientHeight), s + "x" + n
    } catch (e) {
      return t = e, "unknown"
    }
  }, _tzSeconds: function () {
    var t, e;
    try {
      return-60 * (new Date).getTimezoneOffset()
    } catch (e) {
      return t = e, ""
    }
  }, _merge: function () {
    var t, e, n, i, r, s, a;
    for (s = 1 <= arguments.length ? o.call(arguments, 0) : [], i = {}, t = 0, n = s.length; n > t; t++) {
      r = s[t];
      for (e in r)a = r[e], i[e] = a
    }
    return i
  }, _encodeObject: function (t, e) {
    var n, i, r, s, o;
    if (s = [], null != Array.isArray && Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e))for (i = 0, r = e.length; r > i; i++)n = e[i], s.push(this._encodeObject(t + "[]", n)); else if (e === Object(e))for (o in e)s.push(this._encodeObject(t + "[" + o + "]", e[o])); else s.push(t + "=" + this._encode(e));
    return s.join("&")
  }, _actor: function () {
    var t, e, n, i, r, s, o, a;
    e = [], o = this.actor;
    for (r in o)if (a = o[r], t = "dimensions[actor_" + r + "]", a.join)for (i = 0, s = a.length; s > i; i++)n = a[i], e.push(t + "[]=" + this._encode(n)); else e.push(t + "=" + this._encode(a));
    return e.join("&")
  }, _getCookie: function (t) {
    var e, n, i, r, s, o, a, c;
    for (o = [], s = document.cookie.split(";"), n = 0, r = s.length; r > n; n++)e = s[n], a = e.trim().split("="), a.length < 2 || (i = a[0], c = a[1], i === t && o.push({key: i, value: c}));
    return o
  }, _clientId: function () {
    var t;
    return t = this._getClientId(), "" === t && (t = this._setClientId()), t
  }, _getClientId: function () {
    var t, e, n, i, r, s, o, a, c;
    for (i = this._getCookie("_octo"), e = [], s = 0, o = i.length; o > s; s++)n = i[s], a = n.value.split("."), r = a.shift(), "GH1" === r && a.length > 1 && (c = a.shift().split("-"), 1 === c.length && (c[1] = "1"), c[0] *= 1, c[1] *= 1, t = a.join("."), e.push([c, t]));
    return t = "", e.length > 0 && (t = e.sort().reverse()[0][1]), t
  }, _setClientId: function () {
    var t, e, n, i, r;
    return r = (new Date).getTime(), t = Math.round(Math.random() * (Math.pow(2, 31) - 1)) + "." + Math.round(r / 1e3), e = "GH1.1." + t, i = new Date(r + 63072e6).toGMTString(), n = "." + document.domain.split(".").reverse().slice(0, 2).reverse().join("."), document.cookie = "_octo=" + e + "; expires=" + i + "; path=/; domain=" + n, t
  }, _encode: function (t) {
    return null != t ? window.encodeURIComponent(t) : ""
  }, applyQueuedCalls: function (t) {
    var e, n, i, r;
    for (r = [], n = 0, i = t.length; i > n; n++)e = t[n], r.push(this.applyCall(e));
    return r
  }, applyCall: function (t) {
    var e, n;
    return n = t[0], e = t.slice(1), this[n] ? this[n].apply(this, e) : r(n + " is not a valid method")
  }, applyMetaTags: function () {
    var t;
    return t = this.loadMetaTags(), t.host && this.setHost(t.host), t.app && this.setApp(t.app), this._objectIsEmpty(t.actor) || this.setActor(t.actor), this.addDimensions(t.dimensions), this.addMeasures(t.measures), this.addContext(t.context)
  }, loadMetaTags: function () {
    var t, e, n, i, r, s;
    for (s = {dimensions: {}, measures: {}, context: {}, actor: {}}, r = document.getElementsByTagName("meta"), t = 0, e = r.length; e > t; t++)if (n = r[t], n.name && n.content && (i = n.name.match(this.octolyticsMetaTagName)))switch (i[1]) {
      case"host":
        s.host = n.content;
        break;
      case"app-id":
        s.app = n.content;
        break;
      case"app":
        s.app = n.content;
        break;
      case"dimension":
        this._addField(s.dimensions, i[2], n);
        break;
      case"measure":
        this._addField(s.measures, i[2], n);
        break;
      case"context":
        this._addField(s.context, i[2], n);
        break;
      case"actor":
        this._addField(s.actor, i[2], n)
    }
    return s
  }, _addField: function (t, e, n) {
    return n.attributes["data-array"] ? (null == t[e] && (t[e] = []), t[e].push(n.content)) : t[e] = n.content
  }, _objectIsEmpty: function (t) {
    var e, n;
    for (e in t)if (s.call(t, e))return n = t[e], !1;
    return!0
  }, octolyticsMetaTagName: /^octolytics-(host|app-id|app|dimension|measure|context|actor)-?(.*)/}, window._octo ? window._octo.slice && (i = window._octo.slice(0), window._octo = t, window._octo.applyQueuedCalls(i)) : window._octo = t
}.call(this),function () {
  $(function () {
    return _octo.push(["enablePerformance"]), _octo.push(["recordPageView"])
  }), $(document).on("pjax:complete", function () {
    return _octo.push(["recordPageView"])
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, b;
  u = null, l = null, p = null, g = null, i = function () {
    return document.querySelector(".js-calendar-graph").getAttribute("data-url")
  }, $(document).on("pjax:send pjax:complete", ".js-contribution-activity", function (t) {
    var e;
    e = "pjax:send" === t.type, this.classList.toggle("loading", e)
  }), $(document).on("graph:load", ".js-calendar-graph", function (t, e) {
    $(this).append(e), s(this)
  }), $.observe(".js-calendar-graph", function () {
    var t;
    t = this.querySelector(".js-calendar-graph-svg"), t && s(this)
  }), $(document).on("click", ".js-calendar-graph rect.day", function (t) {
    var e;
    e = b(this.getAttribute("data-date")), d(e, t.shiftKey, !1)
  }), n = function (t) {
    return t.target.matches("rect.day") ? v(t.target) : void 0
  }, r = function (t) {
    var e;
    return null != (e = document.querySelector(".svg-tip")) ? e.remove() : void 0
  }, s = function (t) {
    var e, i, s;
    return e = t.closest(".js-calendar-graph"), e.addEventListener("mouseover", n), e.addEventListener("mouseout", r), i = t.getAttribute("data-from"), i && (i = l = b(i)), s = t.getAttribute("data-to"), s && (s = b(s)), i || s ? d(i, s, !0) : void 0
  }, t = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], v = function (e) {
    var n, i, r, s, o, a, c, u;
    return r = b(e.getAttribute("data-date")), i = parseInt(e.getAttribute("data-count")), a = 0 === i ? "No" : $.commafy(i), o = t[r.getUTCMonth()].slice(0, 3) + " " + r.getUTCDate() + ", " + r.getUTCFullYear(), s = $('<div class="svg-tip svg-tip-one-line">\n  <strong>' + a + " " + $.pluralize(i, "contribution") + "</strong> on " + o + "\n</div>").get(0), $(".svg-tip").remove(), document.body.appendChild(s), n = e.getBoundingClientRect(), c = n.left + window.pageXOffset - s.offsetWidth / 2 + n.width / 2, u = n.bottom + window.pageYOffset - s.offsetHeight - 2 * n.height, s.style.top = u + "px", s.style.left = c + "px"
  }, a = function (t) {
    return $.pjax({url: t, container: ".js-contribution-activity", scrollTo: !1, replace: !0})
  }, f = function (t) {
    var e, n;
    return u = t, e = null, p = null, g = null, n = i() + "?tab=contributions&period=" + u, m(), a(n)
  }, h = function (t, e) {
    var n, i;
    return i = t.getAttribute("class").trim().split(" "), i = function () {
      var t, r, s;
      for (s = [], t = 0, r = i.length; r > t; t++)n = i[t], n !== e && s.push(n);
      return s
    }(), t.setAttribute("class", i.join(" "))
  }, e = function (t, e) {
    var n;
    return n = t.getAttribute("class") + " " + e, t.setAttribute("class", n.trim())
  }, m = function (t, n) {
    var i, r, s, o, a, c, u, l, d;
    for (i = document.querySelector(".js-calendar-graph"), d = i.querySelectorAll("rect.day"), o = 0, c = d.length; c > o; o++)r = d[o], h(r, "active");
    if (i.classList.remove("days-selected"), t || n) {
      for (i.classList.add("days-selected"), s = function (e) {
        var i;
        return i = b(e.getAttribute("data-date")).getTime(), t && n ? t.getTime() <= i && i <= n.getTime() : i === t.getTime()
      }, l = [], a = 0, u = d.length; u > a; a++)r = d[a], s(r) && l.push(e(r, "active"));
      return l
    }
  }, c = function (t) {
    return("0" + t).slice(-2)
  }, o = function (t) {
    return t.getUTCFullYear() + "-" + c(t.getUTCMonth() + 1) + "-" + c(t.getUTCDate())
  }, b = function (t) {
    var e, n, i, r, s;
    return i = function () {
      var e, n, i, s;
      for (i = t.split("-"), s = [], e = 0, n = i.length; n > e; e++)r = i[e], s.push(parseInt(r));
      return s
    }(), s = i[0], n = i[1], e = i[2], new Date(Date.UTC(s, n - 1, e))
  }, d = function (t, e, n) {
    var r, s, c, d, h, v, $, b;
    return b = i() + "?tab=contributions", t >= p && g >= t ? void f("weekly") : ("object" == typeof e && (l = e, e = !0), l && e ? (c = new Date(l.getTime() - 26784e5), s = new Date(l.getTime() + 26784e5), d = t > l ? [l, t] : [t, l], r = d[0], $ = d[1], c > r && (r = c), $ > s && ($ = s), h = [r, $], p = h[0], g = h[1], b += "&from=" + o(r) + "&to=" + o($)) : (r = t, v = [r, null], p = v[0], g = v[1], b += "&from=" + o(r)), l = t, u = "custom", m(r, $), n ? void 0 : a(b))
  }, $(document).on("change", ".js-period-container", function (t) {
    var e;
    return t.preventDefault(), t.stopPropagation(), e = $(t.target).val().toLowerCase(), u !== e ? f(e) : void 0
  })
}.call(this),function () {
  var t, e;
  $(document).on("submit", ".js-find-coupon-form", function (t) {
    var e, n;
    return e = t.target.action, n = $("#code").val(), window.location = e + "/" + encodeURIComponent(n), t.stopPropagation(), t.preventDefault()
  }), $(document).on("click", ".js-choose-account", function (e) {
    return $(".js-plan-row, .js-choose-plan").removeClass("selected"), $(".js-plan").val(""), $(".js-billing-section").addClass("has-removed-contents"), t($(this).closest(".js-account-row")), e.stopPropagation(), e.preventDefault()
  }), $(document).on("click", ".js-choose-plan", function (t) {
    return e($(this).closest(".js-plan-row")), t.stopPropagation(), t.preventDefault()
  }), $.observe(".js-plan-row.selected", {add: function () {
    return $(this).closest("form").find(".js-redeem-button").prop("disabled", $(this).hasClass("free-plan"))
  }}), t = function (t) {
    var n, i, r, s;
    if (t.length)return r = t.attr("data-login"), s = t.attr("data-plan"), $(".js-account-row, .js-choose-account").removeClass("selected"), t.addClass("selected"), t.find(".js-choose-account").addClass("selected"), $(".js-account").val(r), $(".js-plan-section").removeClass("is-hidden"), $(".js-billing-plans").addClass("is-hidden"), i = $(".js-plans-for-" + r), i.removeClass("is-hidden"), n = $(".js-plan-row", i), e(1 === n.length ? n : $("[data-name='" + s + "']", i))
  }, e = function (t) {
    var e, n, i, r, s;
    if (t.length)return r = t.attr("data-name"), n = parseInt(t.attr("data-cost"), 10), s = t.closest(".js-billing-plans"), i = "true" === s.attr("data-has-billing"), e = s.attr("data-login"), $(".js-plan-row, .js-choose-plan").removeClass("selected"), t.addClass("selected"), t.find(".js-choose-plan").addClass("selected"), $(".js-plan").val(r), 0 === n || i ? $(".js-billing-section").addClass("has-removed-contents") : $(".js-billing-section[data-login='" + e + "']").removeClass("has-removed-contents")
  }, $(function () {
    return t($(".js-account-row.selected")), e($(".js-plan-row.selected"))
  })
}.call(this),function () {
  $(document).on("click", ".js-git-protocol-selector", function () {
    var t, e, n, i, r, s, o;
    if (t = this.closest(".url-box"), o = this.getAttribute("data-url"), t.querySelector(".js-url-field").value = o, !/\.patch$/.test(o))for (r = document.querySelectorAll(".js-live-clone-url"), n = 0, i = r.length; i > n; n++)e = r[n], e.textContent = o;
    null != (s = t.querySelector(".js-clone-url-button.selected")) && s.classList.remove("selected"), this.closest(".js-clone-url-button").classList.add("selected")
  }), $(document).on("ajaxBeforeSend", ".js-clone-selector-form", function (t) {
    this.classList.contains("is-enabled") || t.preventDefault()
  }), $(document).on("click", ".js-clone-selector", function () {
    var t, e, n, i, r;
    for (i = this.getAttribute("data-protocol"), r = document.querySelectorAll(".js-clone-url"), e = 0, n = r.length; n > e; e++)t = r[e], t.classList.toggle("open", t.getAttribute("data-protocol-type") === i)
  })
}.call(this),function () {
  $(document).on("submit", ".js-user-recommendations-form", function (t) {
    var e;
    return e = $(".js-user-interests-input").val(), window.ga("send", "event", "Recommendations", "submit", "Interest entered : " + e)
  }), $(document).on("click", ".js-interest-option", function (t) {
    var e;
    return e = $(this).text(), window.ga("send", "event", "Recommendations", "click", "Example Interest clicked : " + e)
  }), $(document).on("submit", ".js-remove-user-interest-form", function (t) {
    var e;
    return e = this.querySelector('input[name="interest"]').value, window.ga("send", "event", "Recommendations", "click", "Interest removed : " + e)
  }), $(document).on("submit", ".recommendations-wrapper .js-unfollow-button", function (t) {
    return window.ga("send", "event", "Recommendations", "submit", "Unfollowed a User suggestion")
  }), $(document).on("submit", ".recommendations-wrapper .js-follow-button", function (t) {
    return window.ga("send", "event", "Recommendations", "submit", "Followed a User suggestion")
  }), $(document).on("submit", ".recommendations-wrapper .js-unstar-button", function (t) {
    return window.ga("send", "event", "Recommendations", "submit", "Unstarred a Repo suggestion")
  }), $(document).on("submit", ".recommendations-wrapper .js-star-button", function (t) {
    return window.ga("send", "event", "Recommendations", "submit", "Starred a Repo suggestion")
  })
}.call(this),function () {
  $(function () {
    return $(".js-form-signup-home").one("input", "input[type=text]", function () {
      return window.ga("send", "event", "Signup", "Attempt", "Homepage Form")
    }), $(".js-form-signup-detail").one("input", "input[type=text]", function () {
      return window.ga("send", "event", "Signup", "Attempt", "Detail Form")
    })
  })
}.call(this),function () {
  $(function () {
    try {
      localStorage.removeItem("hide-word-upload-callout")
    } catch (t) {
    }
    try {
      return localStorage.removeItem("word-upload-callout-count")
    } catch (t) {
    }
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c, u, l, d, h, f, m = [].slice;
  n = {originalHistoryState: JSON.stringify(window.history.state)}, e = [], u = (new Date).getTime(), r = null, f = !1, a = function () {
    f = !0
  }, o = function () {
    f = !1
  }, $(window).on("pageshow", o), $(window).on("pagehide", a), $(window).on("error", function (t) {
    var i, o, a, l, h, f, p;
    f = t.originalEvent, h = f.message, a = f.filename, l = f.lineno, o = f.error, i = $.extend.apply($, [
      {},
      n
    ].concat(m.call(e), [
      {message: h, filename: a, lineno: l, url: window.location.href, readyState: document.readyState, referrer: document.referrer, stack: null != o ? o.stack : void 0, historyState: JSON.stringify(window.history.state), timeSinceLoad: Math.round((new Date).getTime() - u), extensionScripts: JSON.stringify(s().sort()), navigations: JSON.stringify(c()), user: null != (p = document.querySelector("meta[name=user-login]")) ? p.content : void 0, jquery: $.fn.jquery}
    ], [null != o ? o.failbotContext : void 0])), e = [], null != i.eventTarget && (i.eventTarget = $(i.eventTarget).inspect()), $(document).trigger("captured:error", i), d(t) && (null == r && (r = document.querySelector("meta[name=browser-errors-url]").content), fetch(r, {method: "POST", body: JSON.stringify(i)}))
  }), d = function () {
    var t;
    return t = 0, function (e) {
      var n, i, r;
      return r = e.originalEvent, i = r.lineno, n = r.error, window.isProxySite() && !n.forceReport ? !1 : null != (null != n ? n.stack : void 0) && i ? f ? !1 : $.fn.fire ? t >= 10 ? !1 : (t++, !0) : !1 : !1
    }
  }(), s = function () {
    var t, e, n, i, r;
    for (n = $("script"), i = [], t = 0, e = n.length; e > t; t++)r = n[t], /^(?:chrome-extension|file):/.test(r.src) && i.push(r.src);
    return i
  }, i = jQuery.event.dispatch, jQuery.event.dispatch = function (t) {
    var n;
    return"error" === t.type && t.target === window ? i.apply(this, arguments) : (e.push({eventType: t.type, eventTarget: t.target}), n = i.apply(this, arguments), e.pop(), n)
  }, l = function (t, e) {
    var n;
    return n = c(), n.push({type: t, url: window.location.href, state: window.history.state, info: e}), h(n)
  }, t = "navigations", c = function () {
    var e;
    return e = function () {
      try {
        return sessionStorage.getItem(t)
      } catch (e) {
      }
    }(), e ? JSON.parse(e) : []
  }, h = function (e) {
    try {
      return sessionStorage.setItem(t, JSON.stringify(e))
    } catch (n) {
    }
  }, l("load"), $(window).on("hashchange", function (t) {
    return l("hashchange", {oldURL: t.oldURL, newURL: t.newURL})
  }), $(window).on("popstate", function (t) {
    return l("popstate", {eventState: t.state})
  }), $(document).on("pjax:success", function (t) {
    return l("pjax:success")
  }), $(document).on("pjax:popstate", function (t) {
    return l("pjax:popstate", {pjaxDirection: t.direction, pjaxState: t.state})
  }), "#b00m" === window.location.hash && b00m()
}.call(this),function () {
  var t, e;
  t = null != (e = document.querySelector("meta[name=form-nonce]")) ? e.content : void 0, null != t && $.observe("form", function (e) {
    var n, i;
    "get" !== e.method.toLowerCase() && (i = e.getAttribute("data-form-nonce"), null != i && i !== t && (n = new Error("Incorrect form-nonce"), n.failbotContext = {form: $(e).inspect(), method: e.method, action: e.action}, setImmediate(function () {
      throw n
    })), (null == i || i !== t) && e.remove())
  })
}.call(this),function () {
  $(document).on("click", ".email-hidden-toggle > a", function () {
    return $(this).parent().siblings(".email-hidden-reply").toggle(), !1
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c, u = function (t, e) {
    function n() {
      this.constructor = t
    }

    for (var i in e)l.call(e, i) && (t[i] = e[i]);
    return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
  }, l = {}.hasOwnProperty;
  t = function (t) {
    function e(t) {
      this.name = "InvalidGAEventValueError", this.message = "The event value in '" + JSON.stringify(t) + "' has to be an integer."
    }

    return u(e, t), e
  }(Error), r = function (e, n) {
    var i;
    if (null == n && (n = !0), e = e.trim().split(/\s*,\s*/), e[3])if (/^\d+$/.test(e[3]))e[3] = Number(e[3]); else if ($(document.documentElement).hasClass("is-preview-features"))return i = new t(e), void setImmediate(function () {
      throw i
    });
    e.unshift("send", "event"), e.push({useBeacon: !0, nonInteraction: !n}), window.ga.apply(null, e)
  }, n = function (t) {
    var e;
    e = $(t.target).closest("[data-ga-click]").attr("data-ga-click"), e && r(e)
  }, o = function (t) {
    var e, n, i, r;
    i = t.trim().split(/\s*,\s*/), n = i[0], r = i[1], e = {path: n}, null != r && (e.title = r), window.ga("send", "pageview", e)
  }, c = new WeakMap, i = function () {
    var t, e, n, i;
    for (e = $("[data-ga-load]"), n = 0, i = e.length; i > n; n++)t = e[n], c.get(t) || (c.set(t, !0), r(t.getAttribute("data-ga-load"), !1))
  }, s = function () {
    var t, e, n, i, s;
    for (s = $("meta[name=analytics-event]"), n = [], t = 0, e = s.length; e > t; t++)i = s[t], c.get(i) || (c.set(i, !0), n.push(r(i.content, !1)));
    return n
  }, a = function () {
    var t, e, n, i, r;
    for (r = $("meta[name=analytics-virtual-pageview]"), n = [], t = 0, e = r.length; e > t; t++)i = r[t], c.get(i) || (c.set(i, !0), n.push(o(i.content)));
    return n
  }, e = function () {
    return s(), a(), i()
  }, $(e), $(document).on("pjax:complete", function () {
    return setTimeout(e, 20)
  }), window.addEventListener("click", n, !0)
}.call(this),function () {
  $(document).on("click", ".js-new-user-contrib-example", function (t) {
    var e, n, i;
    return t.preventDefault(), e = document.querySelector(".js-calendar-graph"), e.classList.contains("sample-graph") ? void 0 : (e.classList.add("sample-graph"), n = function (t) {
      var n;
      return n = e.querySelector(".js-calendar-graph-svg"), $(n).replaceWith(t)
    }, i = function () {
      return e.classList.remove("sample-graph")
    }, $.fetchText(this.getAttribute("href")).then(n, i))
  })
}.call(this),function () {
  $(document).on("graph:load", ".js-graph-code-frequency", function (t, e) {
    var n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, b, y, j;
    return g = $(this).width(), s = 500, h = [10, 10, 20, 40], d = h[0], l = h[1], c = h[2], u = h[3], e = e.map(function (t, e) {
      return[new Date(1e3 * t[0]), t[1], t[2]]
    }).sort(function (t, e) {
      return d3.ascending(t[0], e[0])
    }), n = e.map(function (t) {
      return[t[0], t[1]]
    }), r = e.map(function (t) {
      return[t[0], t[2]]
    }), o = d3.max(n, function (t) {
      return t[1]
    }), a = d3.min(r, function (t) {
      return t[1]
    }), p = e[0][0], m = e[e.length - 1][0], v = d3.time.scale().domain([p, m]).range([0, g - u - l]), y = d3.scale.linear().domain([a, o]).range([s - c - d, 0]), b = d3.svg.axis().scale(v).tickFormat(function (t) {
      return p.getFullYear() !== m.getFullYear() ? d3.time.format("%m/%y")(t) : d3.time.format("%m/%d")(t)
    }), j = d3.svg.axis().scale(y).orient("left").tickPadding(5).tickSize(g).tickFormat(function (t) {
      return d3.formatSymbol(t, !0)
    }), i = d3.svg.area().x(function (t) {
      return v(t[0])
    }).y0(function (t) {
      return y(t[1])
    }).y1(function (t) {
      return y(0)
    }), f = d3.select(this).data(e).append("svg").attr("width", g).attr("height", s).attr("class", "viz code-frequency").append("g").attr("transform", "translate(" + u + "," + d + ")"), f.append("g").attr("class", "x axis").attr("transform", "translate(0, " + (s - d - c) + ")").call(b), f.append("g").attr("class", "y axis").attr("transform", "translate(" + g + ", 0)").call(j), f.selectAll("path.area").data([n, r]).enter().append("path").attr("class", function (t, e) {
      return 0 === e ? "addition" : "deletion"
    }).attr("d", i)
  })
}.call(this),function () {
  $(document).on("graph:load", ".js-commit-activity-graph", function (t, e) {
    var n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, b, y, j, w, x, k;
    return c = $("#commit-activity-master"), i = $("#commit-activity-detail"), o = 260, b = i.width(), y = 0, g = null, function () {
      var t, n, s, a, c, u, l, d, h, f, m, p, v, j, w, x, k, C, S, L;
      for (l = 0, c = u = 0, d = e.length; d > u; c = ++u)t = e[c], 0 !== t.total && (l = c);
      return y = l, w = [20, 30, 30, 40], v = w[0], m = w[1], p = w[2], f = w[3], s = e[y].days, h = d3.max(e, function (t) {
        return d3.max(t.days)
      }), k = d3.scale.linear().domain([0, s.length - 1]).range([0, b - m - p]), S = d3.scale.linear().domain([0, h]).range([o, 0]), L = d3.svg.axis().scale(S).orient("left").ticks(5).tickSize(-b + p + m), $(this).on("hotkey:activate", function (t) {
        var n, i;
        return i = y, n = t.originalEvent.hotkey, "left" === n || "right" === n ? (y > 0 && "left" === n && (i -= 1), y < e.length && "right" === n && (i += 1), g({index: i})) : void 0
      }), x = d3.select(i[0]).data([s]).append("svg").attr("width", b).attr("height", o + v + f).attr("class", "viz").append("g").attr("transform", "translate(" + m + "," + v + ")"), x.append("g").attr("class", "y axis").call(L), C = x.append("g").attr("class", "axis"), n = C.selectAll(".day").data(d3.weekdays).enter().append("g").attr("class", "day").attr("transform", function (t, e) {
        return"translate(" + k(e) + ", " + o + ")"
      }), n.append("text").attr("text-anchor", "middle").attr("dy", "2em").text(function (t, e) {
        return t
      }), j = d3.svg.line().x(function (t, e) {
        return k(e)
      }).y(S), x.append("path").attr("class", "path").attr("d", j), a = x.selectAll("g.dot").data(s).enter().append("g").attr("class", "dot").attr("transform", function (t, e) {
        return"translate(" + k(e) + ", " + S(t) + ")"
      }), a.append("circle").attr("r", 4), a.append("text").attr("text-anchor", "middle").attr("class", "tip").attr("dy", -10).text(function (t) {
        return t
      }), g = function (t) {
        var n, i, o;
        if (!(t.index >= 52 || t.index < 0))return y = t.index, s = e[t.index].days, h = d3.max(s), k.domain([0, s.length - 1]), o = d3.selectAll(".bar.mini").attr("class", "bar mini"), n = d3.select(o[0][y]).attr("class", "bar mini active"), i = d3.transform(n.attr("transform")), r.transition().ease("back-out").duration(300).attr("transform", "translate(" + (i.translate[0] + 8) + ", 105)"), x.selectAll(".path").data([s]).transition().duration(500).attr("d", j), x.selectAll("g.dot").data(s).transition().duration(300).attr("transform", function (t, e) {
          return"translate(" + k(e) + ", " + S(t) + ")"
        }), x.selectAll("text.tip").data(s).text(function (t) {
          return t
        })
      }
    }(), f = [10, 30, 20, 30], h = f[0], l = f[1], d = f[2], u = f[3], o = 100, p = e.map(function (t) {
      return t.total
    }), a = d3.max(p), s = d3.time.format.utc("%m/%d"), j = d3.scale.ordinal().domain(d3.range(p.length)).rangeRoundBands([0, b - l - d], .1), x = d3.scale.linear().domain([0, a]).range([o, 0]), k = d3.svg.axis().scale(x).orient("left").ticks(3).tickSize(-b + l + d).tickFormat(d3.formatSymbol), w = d3.svg.axis().scale(j).ticks(d3.time.weeks).tickFormat(function (t, n) {
      var i;
      return i = new Date(1e3 * e[n].week), s(i)
    }), m = d3.tip().attr("class", "svg-tip").offset([-10, 0]).html(function (t, n) {
      var i, r;
      return i = new Date(1e3 * e[n].week), r = d3.months[i.getUTCMonth()].slice(0, 3) + " " + i.getUTCDate(), "<strong>" + t + "</strong> " + $.pluralize(t, "commit") + " the week of " + r
    }), v = d3.select(c[0]).style("width", b + "px").append("svg").attr("width", b + (l + d)).attr("height", o + h + u).attr("class", "viz").append("g").attr("transform", "translate(" + l + "," + h + ")").call(m), v.append("g").attr("class", "y axis").call(k), n = v.selectAll("g.mini").data(p).enter().append("g").attr("class", function (t, e) {
      return e === y ? "bar mini active" : "bar mini"
    }).attr("transform", function (t, e) {
      return"translate(" + j(e) + ", 0)"
    }).on("click", function (t, e) {
      return g({node: this, index: e, data: t})
    }), n.append("rect").attr("width", j.rangeBand()).attr("height", function (t) {
      return o - x(t)
    }).attr("y", function (t) {
      return x(t)
    }).on("mouseover", m.show).on("mouseout", m.hide), v.append("g").attr("class", "x axis").attr("transform", "translate(0," + o + ")").call(w).selectAll(".tick").style("display", function (t, e) {
      return e % 3 !== 0 ? "none" : "block"
    }), r = v.append("circle").attr("class", "focus").attr("r", 8).attr("transform", "translate(" + (j(y) + j.rangeBand() / 2) + ", " + -o + ")"), r.transition().ease("elastic-in").duration(1e3).attr("r", 2).attr("transform", "translate(" + (j(y) + j.rangeBand() / 2) + ", " + (o + 5) + ")")
  })
}.call(this),function () {
  var t, e, n, i;
  n = function () {
    var t, e, n, i, r, s, o, a;
    for (r = {}, s = document.location.search.substr(1).split("&"), t = 0, n = s.length; n > t; t++)i = s[t], o = i.split("="), e = o[0], a = o[1], r[e] = a;
    return r
  }, t = function (t) {
    return t = new Date(t), d3.months[t.getUTCMonth()].slice(0, 3) + " " + t.getUTCDate() + ", " + t.getUTCFullYear()
  }, i = function (e, n) {
    var i, r;
    return r = t(e), i = t(n), $(".js-date-range").html(r + " &ndash; " + i)
  }, e = function (t) {
    var e, n;
    return e = t[0].weeks[0].date, n = new Date(e.getTime() - 6048e5), t.forEach(function (t) {
      return t.weeks.unshift({a: 0, c: 0, d: 0, date: n, w: n / 1e3})
    })
  }, $(document).on("graph:load", "#contributors", function (t, r) {
    var s, o, a, c, u, l, d, h, f, m, p, g, v, b, y, j, w, x, k;
    return o = $(this), a = [], f = n(), k = null, x = null, null != f.from && (y = new Date(f.from)), null != f.to && (u = new Date(f.to)), c = (null != f ? f.type : void 0) || "c", d = d3.time.format.utc("%Y-%m-%d"), m = function (t) {
      return new Date(1e3 * ~~t)
    }, o.on("range.selection.end", function (t, e) {
      var n;
      return n = e.range, y = n[0], u = n[1], d(y) === d(u) && (y = k, u = x), w(), i(y, u), v()
    }), g = function (t) {
      var n, r;
      return 1 === t[0].weeks.length && e(t), r = s(t), k = m(r[0].key), x = m(~~r[r.length - 1].key + 518400), n = new Date, x > n && (x = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))), null == y && (y = k), null == u && (u = x), i(y, u), b(r, k, x), v(t, k, x), $(".js-contribution-container").on("change", "input[type=radio]", h)
    }, p = function (t) {
      var e, n, i, r, s, o, a;
      for (n = 0, r = t.length; r > n; n++)for (e = t[n], o = e.weeks, i = 0, s = o.length; s > i; i++)a = o[i], a.date = new Date(1e3 * a.w);
      return t
    }, l = function (t, e) {
      return t.map(function (t) {
        var n;
        return n = $.extend(!0, {}, t), n.weeks = n.weeks.filter(function (t) {
          return t.date >= e[0] && t.date <= e[1]
        }), n
      })
    }, s = function (t) {
      var e, n, i, r, s, o, a, c, u;
      for (c = {}, n = 0, r = t.length; r > n; n++)for (e = t[n], a = e.weeks, i = 0, s = a.length; s > i; i++)u = a[i], null == c[o = u.w] && (c[o] = {c: 0, a: 0, d: 0}), c[u.w].c += u.c, c[u.w].a += u.a, c[u.w].d += u.d;
      return d3.entries(c)
    }, j = function (t) {
      return t = l(t, [y, u]), t.forEach(function (t) {
        var e, n, i, r, s, o, a;
        for (n = 0, e = 0, i = 0, o = t.weeks, r = 0, s = o.length; s > r; r++)a = o[r], n += a.c, e += a.a, i += a.d;
        return t.c = n, t.a = e, t.d = i
      }), t.sort(function (t, e) {
        return d3.descending(t[c], e[c])
      })
    }, b = function (t, e, n) {
      var i, r, s, a, l, h, f, p, g, v, $, b, j, w, x, k, C, S;
      return g = [20, 50, 20, 30], p = g[0], h = g[1], f = g[2], l = g[3], w = o.width(), s = 125, a = d3.max(t, function (t) {
        return t.value[c]
      }), x = d3.time.scale().domain([e, n]).range([0, w - h - f]), C = d3.scale.linear().domain([0, a]).range([s, 0]), S = d3.svg.axis().scale(C).orient("left").ticks(4).tickSize(-w + h + f).tickPadding(10).tickFormat(d3.formatSymbol), k = d3.svg.axis().scale(x), t.length < 5 && k.ticks(t.length), i = d3.svg.area().interpolate("basis").x(function (t) {
        return x(m(t.key))
      }).y0(function (t) {
        return s
      }).y1(function (t) {
        return C(t.value[c])
      }), d3.select("#contributors-master svg").remove(), j = d3.select("#contributors-master").data([t]).append("svg").attr("height", s + p + l).attr("width", w).attr("class", "viz").append("g").attr("transform", "translate(" + h + "," + p + ")"), j.append("g").attr("class", "x axis").attr("transform", "translate(0, " + s + ")").call(k), j.append("g").attr("class", "y axis").call(S), j.append("path").attr("class", "area").attr("d", i), b = function () {
        var t;
        return j.classed("selecting", !0), t = d3.event.target.extent(), o.trigger("range.selection.start", {data: arguments[0], range: t})
      }, v = function () {
        var t;
        return t = d3.event.target.extent(), o.trigger("range.selection.selected", {data: arguments[0], range: t})
      }, $ = function () {
        var t;
        return j.classed("selecting", !d3.event.target.empty()), t = d3.event.target.extent(), o.trigger("range.selection.end", {data: arguments[0], range: t})
      }, r = d3.svg.brush().x(x).on("brushstart", b).on("brush", v).on("brushend", $), (d(y) !== d(e) || d(u) !== d(n)) && r.extent([y, u]), j.append("g").attr("class", "selection").call(r).selectAll("rect").attr("height", s)
    }, v = function () {
      var t, e, n, i, s, l, d, h, f, m, p, g, v, b, w, x, k, C, S, L, T, A;
      return g = [10, 10, 10, 20], m = g[0], h = g[1], f = g[2], d = g[3], k = parseInt(o.attr("data-graph-width")), n = 100, $("#contributors ol").remove(), r = j(a), b = document.createElement("ol"), x = d3.select(b).attr("class", "contrib-data capped-cards clearfix"), s = d3.max(r, function (t) {
        return d3.max(t.weeks, function (t) {
          return t[c]
        })
      }), C = d3.time.scale().domain([y, u]).range([0, k]), L = d3.scale.linear().domain([0, s]).range([n - d - m, 0]), e = d3.svg.area().interpolate("basis").x(function (t) {
        return C(t.date)
      }).y0(function (t) {
        return n - d - m
      }).y1(function (t) {
        return L(t[c])
      }), T = d3.svg.axis().scale(L).orient("left").ticks(2).tickSize(-k).tickPadding(10).tickFormat(d3.formatSymbol), S = d3.svg.axis().scale(C), r[0].weeks.length < 5 && S.ticks(r[0].weeks.length).tickFormat(d3.time.format("%x")), $("li.capped-card").remove(), p = x.selectAll("li.capped-card").data(r).enter().append("li").attr("class", "capped-card").style("display", function (t) {
        return t[c] < 1 ? "none" : "block"
      }), i = p.append("h3"), i.append("img").attr("src", function (t) {
        return t.author.avatar
      }).attr("class", "avatar").attr("alt", ""), i.append("span").attr("class", "rank").text(function (t, e) {
        return"#" + (e + 1)
      }), i.append("a").attr("class", "aname").attr("href", function (t) {
        return"/" + t.author.login
      }).text(function (t) {
        return t.author.login
      }), t = i.append("span").attr("class", "ameta"), v = $(".graphs").attr("data-repo-url"), t.append("span").attr("class", "cmeta").html(function (t) {
        var e, n, i, r, s, o;
        return e = v + "/commits?author=" + t.author.login, o = $.commafy(t.c) + " " + $.pluralize(t.c, "commit"), s = $("<a>", {href: e, "class": "cmt", text: o}), i = $("<span>", {"class": "a", text: $.commafy(t.a) + " ++"}), r = $("<span>", {"class": "d", text: $.commafy(t.d) + " --"}), n = " / ", $("<div>").append([s, n, i, n, r]).html()
      }), w = p.append("svg").attr("width", k + (h + f)).attr("height", n + m + d).attr("class", "capped-card-content").append("g").attr("transform", "translate(" + h + "," + m + ")"), l = S.ticks()[0], w.append("g").attr("class", "x axis").classed("dense", l >= 10).attr("transform", "translate(0, " + (n - m - d) + ")").call(S).selectAll(".tick text").style("display", function (t, e) {
        return e % 2 !== 0 ? "none" : "block"
      }), w.select(".x.dense text").attr("dx", 7), A = w.append("g").attr("class", "y axis").call(T).selectAll(".y.axis g text").attr("dx", k / 2).style("display", function (t, e) {
        return 0 === e ? "none" : "block"
      }).classed("midlabel", !0), w.append("path").attr("d", function (t) {
        return e(t.weeks)
      }), document.querySelector("#contributors").appendChild(b)
    }, w = function () {
      var t, e;
      return $.support.pjax ? (t = document.location, c = $("input[name=ctype]:checked").prop("value").toLowerCase(), e = t.pathname + "?from=" + d(y) + "&to=" + d(u) + "&type=" + c, window.history.pushState(null, null, e)) : void 0
    }, h = function (t) {
      return c !== $(this).val() ? (w(), g(a)) : void 0
    }, a = p(r), g(r)
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a;
  i = function (t) {
    var e;
    return(e = d3.format(","))(t)
  }, n = {top: 20, right: 40, bottom: 30, left: 40}, a = 980 - n.left - n.right, e = 150 - n.top - n.bottom, t = function (t) {
    return"<div class='blankslate'> <span class='mega-octicon octicon-graph'></span> <h3>No activity so far this " + t + "</h3> </div>"
  }, o = function (t) {
    var e;
    return e = 0 > t ? "octicon-arrow-down" : t > 0 ? "octicon-arrow-up" : "", "<span class='totals-num'> <span class='octicon " + e + "'></span> " + i(Math.abs(t)) + " change </span>"
  }, r = function (t) {
    var e, n;
    return e = 0 > t ? "octicon-arrow-down" : t > 0 ? "octicon-arrow-up" : "", n = 0 > t ? "decrease" : "increase", "<span class='totals-num'> <span class='octicon " + e + "'></span> " + i(Math.abs(t)) + "% " + n + " </span>"
  }, s = function (s, c) {
    var u, l, d, h, f, m, p, g, v, b, y, j, w, x, k, C, S, L, T, A, E, _, q, D, P, H, I, M;
    if (c && null == c.error) {
      for (f = c.counts, h = c.summary.columns, T = new Date(1e3 * c.summary.starting), p = new Date(1e3 * c.summary.ending), C = c.summary.model, S = c.summary.period, k = d3.max(d3.merge(d3.values(f)), function (t) {
        return t.count
      }), x = d3.time.format("%A, %B %-d, %Y"), g = d3.time.format("%-I%p"), l = d3.bisector(function (t) {
        return t.date
      }).left, v = 0, y = h.length; y > v; v++)d = h[v], $(".js-" + C + "-" + d + " .js-total").text(i(c.summary.totals[d])), $(".js-" + C + "-" + d + " .js-changes").append(o(c.summary.total_changes[d])), $(".js-" + C + "-" + d + " .js-changes").append(r(c.summary.percent_changes[d]));
      if (0 === d3.values(c.summary.totals).filter(function (t) {
        return 0 !== t
      }).length)return $(this).html(t(S));
      for (_ = d3.tip().attr("class", "svg-tip total-unique comparison").offset([-10, 0]).html(function (t) {
        var e, n, r, s, o, a;
        for (a = "", e = function () {
          switch (S) {
            case"year":
              return"Week of " + x(t.date);
            case"week":
              return x(t.date) + " starting at " + g(t.date);
            default:
              return x(t.date)
          }
        }(), o = 270 / c.summary.columns.length, s = c.summary.columns, n = 0, r = s.length; r > n; n++)d = s[n], a += "<li class='totals " + d + "' style='width:" + o + "px'> <strong>" + i(t[d]) + "</strong> " + d.split("_at")[0] + " </li>";
        return"<span class='title'>" + e + "</span> <ul> " + a + " </ul>"
      }), L = function () {
        var t, e, n, i, r, s, o, a, c, u;
        for (c = {}, u = D.invert(d3.mouse(this)[0]), r = h[0], s = l(f[r], u, 1), e = f[r][s - 1], n = f[r][s], t = n && u - e.date > n.date - u ? s : s - 1, c.date = f[r][t].date, o = 0, a = h.length; a > o; o++)d = h[o], c[d] = f[d][t].count;
        return i = q.selectAll("g.dots circle").filter(function (t) {
          return t.date === c.date
        }), _.show.call(this, c, i[0][0])
      }, b = 0, j = h.length; j > b; b++)d = h[b], f[d].forEach(function (t) {
        return t.date = new Date(1e3 * t.bucket)
      }), f[d] = f[d].filter(function (t) {
        return t.date < new Date
      });
      return D = d3.time.scale().range([0, a]), H = d3.scale.linear().range([e, 0]), I = d3.scale.linear().range([e, 0]), A = 1, E = function () {
        switch (S) {
          case"year":
            return d3.time.months;
          case"week":
            return A = 8, d3.time.hours;
          default:
            return A = 2, d3.time.days
        }
      }(), P = d3.svg.axis().scale(D).tickSize(e + 5).tickPadding(10).ticks(E, A).orient("bottom"), M = d3.svg.axis().scale(H).ticks(3).tickFormat(d3.formatSymbol).orient("left"), w = d3.svg.line().x(function (t) {
        return D(t.date)
      }).y(function (t) {
        return H(t.count)
      }), q = d3.select(this).append("svg").attr("width", a + n.left + n.right).attr("height", e + n.top + n.bottom).attr("class", "vis").append("g").attr("transform", "translate(" + n.left + "," + n.top + ")").call(_), D.domain([T, p]), H.domain([0, k]), q.append("g").attr("class", "x axis").call(P).selectAll("text").attr("text-anchor", "middle"), q.append("g").attr("class", "y axis").call(M), u = d3.values(f), q.selectAll("path.path").data(u).enter().append("path").attr("class", function (t, e) {
        return"path total " + t[0].column
      }).attr("d", function (t) {
        return w(t)
      }), m = q.selectAll("g.dots").data(u).enter().append("g").attr("class", function (t, e) {
        return"dots totals " + t[0].column
      }), m.each(function (t, e) {
        var n;
        return n = d3.select(this), n.selectAll("circle").data(function (t) {
          return f[t[0].column]
        }).enter().append("circle").attr("cx", function (t) {
          return D(t.date)
        }).attr("cy", function (t) {
          return H(t.count)
        }).attr("r", 4)
      }), M.orient("right"), q.append("g").attr("class", "y axis unique").attr("transform", "translate(" + a + ", 0)").call(M), q.append("rect").attr("class", "overlay").attr("width", a).attr("height", e).on("mousemove", L).on("mouseout", function (t) {
        return setTimeout(_.hide, 500)
      })
    }
  }, $(document).on("graph:load", ".js-dashboards-overview-graph", s)
}.call(this),function () {
  var t, e, n;
  t = {}, n = function (t) {
    return t.json()
  }, $.observe(".js-graph", e = function (e) {
    var i, r, s, o;
    (o = e.getAttribute("data-url")) && ($(e).find("svg").remove(), s = null != t[o] ? t[o] : t[o] = $.fetchPoll(o, {headers: {accept: "application/json"}}).then(n), e.classList.add("is-graph-loading"), e.classList.remove("is-graph-load-error", "is-graph-empty"), i = function (t) {
      var n, i, r;
      return e.classList.remove("is-graph-loading"), (null != t ? t.unusable : void 0) ? e.classList.add("is-graph-without-usable-data") : 0 === (null != t ? t.length : void 0) || 0 === (null != t && null != (n = t.summary) ? n.total : void 0) || 0 === (null != (i = t[0]) && null != (r = i.weeks) ? r.length : void 0) ? e.classList.add("is-graph-empty") : d3Ready().then(function () {
        return $(e).trigger("graph:load", [t])
      })
    }, r = function () {
      return e.classList.remove("is-graph-loading"), e.classList.add("is-graph-load-error")
    }, s.then(i, r))
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  };
  i = function () {
    function i(t, e, n) {
      this.container = t, this.width = e, this.height = n, this.initError = a(this.initError, this), this.init = a(this.init, this), this.loaderInterval = null, this.loaderOffset = 0, this.ctx = this.initCanvas(this.container, this.width, this.height), this.startLoader("Loading graph data"), this.loadMeta()
    }

    return i.prototype.initCanvas = function (t, e, n) {
      var i, r, s, o, a, c, u;
      return o = t.getElementsByTagName("canvas")[0], o.style.zIndex = "0", s = o.width, r = o.height, a = o.getContext("2d"), c = window.devicePixelRatio || 1, i = a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio || 1, u = c / i, 1 === u ? a : (o.width = s * u, o.height = r * u, o.style.width = s + "px", o.style.height = r + "px", a.scale(u, u), a)
    }, i.prototype.startLoader = function (t) {
      return this.ctx.save(), this.ctx.font = "14px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#cacaca", this.ctx.textAlign = "center", this.ctx.fillText(t, this.width / 2, 155), this.ctx.restore(), this.displayLoader()
    }, i.prototype.stopLoader = function () {
      var t;
      return t = this.container.querySelector(".large-loading-area"), t.classList.add("is-hidden")
    }, i.prototype.displayLoader = function () {
      var t;
      return t = this.container.querySelector(".large-loading-area"), t.classList.remove("is-hidden")
    }, i.prototype.loadMeta = function () {
      var t, e;
      return t = function (t) {
        return t.json()
      }, e = this.container.getAttribute("data-network-graph-meta-url"), $.fetchPoll(e, {headers: {accept: "application/json"}}).then(t, this.initError).then(this.init)
    }, i.prototype.init = function (i) {
      var a, c, u, l, d, h;
      if (o) {
        for (this.focus = i.focus, this.nethash = i.nethash, this.spaceMap = i.spacemap, this.userBlocks = i.blocks, this.commits = function () {
          var e, n, r, s;
          for (r = i.dates, s = [], u = e = 0, n = r.length; n > e; u = ++e)a = r[u], s.push(new t(u, a));
          return s
        }(), this.users = {}, d = i.users, c = 0, l = d.length; l > c; c++)h = d[c], this.users[h.name] = h;
        return this.chrome = new r(this, this.ctx, this.width, this.height, this.focus, this.commits, this.userBlocks, this.users), this.graph = new s(this, this.ctx, this.width, this.height, this.focus, this.commits, this.users, this.spaceMap, this.userBlocks, this.nethash), this.mouseDriver = new n(this.container, this.chrome, this.graph), this.keyDriver = new e(this.chrome, this.graph), this.stopLoader(), this.graph.drawBackground(), this.chrome.draw(), this.graph.requestInitialChunk()
      }
    }, i.prototype.initError = function () {
      return this.stopLoader(), this.ctx.clearRect(0, 0, this.width, this.height), this.startLoader("Graph could not be drawn due to a network problem.")
    }, i
  }(), t = function () {
    function t(t, e) {
      this.time = t, this.date = new Date(e), this.requested = null, this.populated = null
    }

    return t.prototype.populate = function (t, e, n) {
      return this.user = e, this.author = t.author, this.date = new Date(t.date.replace(" ", "T")), this.gravatar = t.gravatar, this.id = t.id, this.login = t.login, this.message = t.message, this.space = t.space, this.time = t.time, this.parents = this.populateParents(t.parents, n), this.requested = !0, this.populated = new Date
    }, t.prototype.populateParents = function (t, e) {
      var n, i, r;
      return r = function () {
        var r, s, o;
        for (o = [], r = 0, s = t.length; s > r; r++)n = t[r], i = e[n[1]], i.id = n[0], i.space = n[2], o.push(i);
        return o
      }()
    }, t
  }(), r = function () {
    function t(t, e, n, i, r, s, o, a) {
      this.network = t, this.ctx = e, this.width = n, this.height = i, this.focus = r, this.commits = s, this.userBlocks = o, this.users = a, this.namesWidth = 120, this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], this.userBgColors = ["#fff", "#f7f7f7"], this.headerColor = "#f7f7f7", this.dividerColor = "#ddd", this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.nameLineHeight = 24, this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.activeUser = null
    }

    return t.prototype.moveX = function (t) {
      return this.offsetX += t, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight ? this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight : void 0
    }, t.prototype.moveY = function (t) {
      return this.offsetY += t, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
    }, t.prototype.calcContentHeight = function () {
      var t, e, n, i, r;
      for (e = 0, r = this.userBlocks, n = 0, i = r.length; i > n; n++)t = r[n], e += t.count;
      return e * this.nameLineHeight
    }, t.prototype.hover = function (t, e) {
      var n, i, r, s;
      for (s = this.userBlocks, i = 0, r = s.length; r > i; i++)if (n = s[i], t > 0 && t < this.namesWidth && e > this.graphTopOffset + this.offsetY + n.start * this.nameLineHeight && e < this.graphTopOffset + this.offsetY + (n.start + n.count) * this.nameLineHeight)return this.users[n.name];
      return null
    }, t.prototype.draw = function () {
      return this.drawTimeline(this.ctx), this.drawUsers(this.ctx)
    }, t.prototype.drawTimeline = function (t) {
      var e, n, i, r, s, o, a, c, u, l, d, h, f;
      for (t.fillStyle = this.headerColor, t.fillRect(0, 0, this.width, this.headerHeight), t.fillStyle = this.dividerColor, t.fillRect(0, this.headerHeight - 1, this.width, 1), u = parseInt((0 - this.offsetX) / this.nameLineHeight), 0 > u && (u = 0), c = u + parseInt(this.width / (this.nameLineHeight - 1)), c > this.commits.length && (c = this.commits.length), t.save(), t.translate(this.offsetX, 0), a = null, o = null, s = r = h = u, f = c; f >= h ? f > r : r > f; s = f >= h ? ++r : --r)e = this.commits[s], l = this.months[e.date.getMonth()], l !== a && (t.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", t.fillStyle = "#555", d = this.ctx.measureText(l).width, t.fillText(l, s * this.nameLineHeight - d / 2, this.headerHeight / 2 + 4), a = l), i = e.date.getDate(), i !== o && (t.font = "12px 'Helvetica Neue', Arial, sans-serif", t.fillStyle = "#555", n = this.ctx.measureText(i).width, t.fillText(i, s * this.nameLineHeight - n / 2, this.headerHeight + this.dateRowHeight / 2 + 3), o = i, t.fillStyle = "#ddd", t.fillRect(s * this.nameLineHeight, this.headerHeight, 1, 6));
      return t.restore()
    }, t.prototype.drawUsers = function (t) {
      var e, n, i, r, s, o, a;
      for (t.fillStyle = "#fff", t.fillRect(0, 0, this.namesWidth, this.height), t.save(), t.translate(0, this.headerHeight + this.dateRowHeight + this.offsetY), o = this.userBlocks, i = n = 0, r = o.length; r > n; i = ++n)e = o[i], t.fillStyle = this.userBgColors[i % 2], t.fillRect(0, e.start * this.nameLineHeight, this.namesWidth, e.count * this.nameLineHeight), this.activeUser && this.activeUser.name === e.name && (t.fillStyle = "rgba(0, 0, 0, 0.05)", t.fillRect(0, e.start * this.nameLineHeight, this.namesWidth, e.count * this.nameLineHeight)), s = (e.start + e.count / 2) * this.nameLineHeight + 3, t.fillStyle = "rgba(0, 0, 0, 0.1)", t.fillRect(0, e.start * this.nameLineHeight + e.count * this.nameLineHeight - 1, this.namesWidth, 1), t.fillStyle = "#333", t.font = "13px 'Helvetica Neue', Arial, sans-serif", t.textAlign = "center", t.fillText(e.name, this.namesWidth / 2, s, 96);
      return t.restore(), t.fillStyle = this.headerColor, t.fillRect(0, 0, this.namesWidth, this.headerHeight), t.fillStyle = "#777", t.font = "12px 'Helvetica Neue', Arial, sans-serif", t.fillText("Owners", 40, this.headerHeight / 2 + 3), a = 10, t.fillStyle = this.dividerColor, t.fillRect(this.namesWidth - 1, a, 1, this.headerHeight - 2 * a), t.fillStyle = this.dividerColor, t.fillRect(0, this.headerHeight - 1, this.namesWidth, 1), t.fillStyle = this.dividerColor, t.fillRect(this.namesWidth - 1, this.headerHeight, 1, this.height - this.headerHeight)
    }, t
  }(), s = function () {
    function t(t, e, n, i, r, s, o, a, c, u) {
      var l, d, h, f, m, p, g, v, $, b, y, j, w, x, k, C, S;
      for (this.network = t, this.ctx = e, this.width = n, this.height = i, this.focus = r, this.commits = s, this.users = o, this.spaceMap = a, this.userBlocks = c, this.nethash = u, this.namesWidth = 120, this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.bgColors = ["#fff", "#f9f9f9"], this.nameLineHeight = 24, this.spaceColors = ["#c0392b", "#3498db", "#2ecc71", "#8e44ad", "#f1c40f", "#e67e22", "#34495e", "#e74c3c", "#2980b9", "#1abc9c", "#9b59b6", "#f39c12", "#7f8c8d", "#2c3e50", "#d35400", "#e74c3c", "#95a5a6", "#bdc3c7", "#16a085", "#27ae60"], this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.bgCycle = 0, this.marginMap = {}, this.gravatars = {}, this.activeCommit = null, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.showRefs = !0, this.lastHotLoadCenterIndex = null, this.connectionMap = {}, this.spaceUserMap = {}, j = this.userBlocks, f = 0, g = j.length; g > f; f++)for (l = j[f], m = p = w = l.start, x = l.start + l.count; x >= w ? x > p : p > x; m = x >= w ? ++p : --p)this.spaceUserMap[m] = this.users[l.name];
      for (this.headsMap = {}, k = this.userBlocks, b = 0, v = k.length; v > b; b++)for (l = k[b], S = this.users[l.name], C = S.heads, y = 0, $ = C.length; $ > y; y++)d = C[y], this.headsMap[d.id] || (this.headsMap[d.id] = []), h = {name: S.name, head: d}, this.headsMap[d.id].push(h)
    }

    return t.prototype.moveX = function (t) {
      return this.offsetX += t, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight && (this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight), this.hotLoadCommits()
    }, t.prototype.moveY = function (t) {
      return this.offsetY += t, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
    }, t.prototype.toggleRefs = function () {
      return this.showRefs = !this.showRefs
    }, t.prototype.calcContentHeight = function () {
      var t, e, n, i, r;
      for (e = 0, r = this.userBlocks, n = 0, i = r.length; i > n; n++)t = r[n], e += t.count;
      return e * this.nameLineHeight
    }, t.prototype.hover = function (t, e) {
      var n, i, r, s, o, a, c, u;
      for (u = this.timeWindow(), r = i = s = u.min, o = u.max; o >= s ? o >= i : i >= o; r = o >= s ? ++i : --i)if (n = this.commits[r], a = this.offsetX + n.time * this.nameLineHeight, c = this.offsetY + this.graphTopOffset + n.space * this.nameLineHeight, t > a - 5 && a + 5 > t && e > c - 5 && c + 5 > e)return n;
      return null
    }, t.prototype.hotLoadCommits = function () {
      var t, e, n, i, r, s;
      return r = 200, e = parseInt((-this.offsetX + this.graphMidpoint) / this.nameLineHeight), 0 > e && (e = 0), e > this.commits.length - 1 && (e = this.commits.length - 1), this.lastHotLoadCenterIndex && Math.abs(this.lastHotLoadCenterIndex - e) < 10 ? void 0 : (this.lastHotLoadCenterIndex = e, t = this.backSpan(e, r), i = this.frontSpan(e, r), t || i ? (s = t ? t[0] : i[0], n = i ? i[1] : t[1], this.requestChunk(s, n)) : void 0)
    }, t.prototype.backSpan = function (t, e) {
      var n, i, r, s, o, a, c, u;
      for (s = null, i = n = c = t; (0 >= c ? 0 >= n : n >= 0) && i > t - e; i = 0 >= c ? ++n : --n)if (!this.commits[i].requested) {
        s = i;
        break
      }
      if (null !== s) {
        for (o = null, a = null, i = r = u = s; (0 >= u ? 0 >= r : r >= 0) && i > s - e; i = 0 >= u ? ++r : --r)if (this.commits[i].requested) {
          o = i;
          break
        }
        return o ? a = o + 1 : (a = s - e, 0 > a && (a = 0)), [a, s]
      }
      return null
    }, t.prototype.frontSpan = function (t, e) {
      var n, i, r, s, o, a, c, u, l, d;
      for (u = null, i = n = s = t, o = this.commits.length; (o >= s ? o > n : n > o) && t + e > i; i = o >= s ? ++n : --n)if (!this.commits[i].requested) {
        u = i;
        break
      }
      if (null !== u) {
        for (l = null, d = null, i = r = a = u, c = this.commits.length; (c >= a ? c > r : r > c) && u + e > i; i = c >= a ? ++r : --r)if (this.commits[i].requested) {
          l = i;
          break
        }
        return d = l ? l - 1 : u + e >= this.commits.length ? this.commits.length - 1 : u + e, [u, d]
      }
      return null
    }, t.prototype.chunkUrl = function () {
      return document.querySelector(".js-network-graph-container").getAttribute("data-network-graph-chunk-url")
    }, t.prototype.requestInitialChunk = function () {
      var t;
      if (o)return t = this.chunkUrl() + "?" + $.param({nethash: this.nethash}), $.fetchJSON(t).then(function (t) {
        return function (e) {
          return t.importChunk(e), t.draw(), t.network.chrome.draw()
        }
      }(this))
    }, t.prototype.requestChunk = function (t, e) {
      var n, i, r, s, a;
      if (o) {
        for (i = n = r = t, s = e; s >= r ? s >= n : n >= s; i = s >= r ? ++n : --n)this.commits[i].requested = new Date;
        return a = this.chunkUrl() + "?" + $.param({nethash: this.nethash, start: t, end: e}), $.fetchJSON(a).then(function (t) {
          return function (e) {
            return t.importChunk(e),
              t.draw(), t.network.chrome.draw(), t.lastHotLoadCenterIndex = t.focus
          }
        }(this))
      }
    }, t.prototype.importChunk = function (t) {
      var e, n, i, r, s, o, a, c, u;
      if (t.commits) {
        for (a = t.commits, c = [], i = 0, s = a.length; s > i; i++)e = a[i], u = this.spaceUserMap[e.space], n = this.commits[e.time], n.populate(e, u, this.commits), c.push(function () {
          var t, e, i, s;
          for (i = n.parents, s = [], t = 0, e = i.length; e > t; t++)o = i[t], s.push(function () {
            var t, e, i, s;
            for (s = [], r = t = e = o.time + 1, i = n.time; i >= e ? i > t : t > i; r = i >= e ? ++t : --t)this.connectionMap[r] = this.connectionMap[r] || [], s.push(this.connectionMap[r].push(n));
            return s
          }.call(this));
          return s
        }.call(this));
        return c
      }
    }, t.prototype.timeWindow = function () {
      var t, e;
      return e = parseInt((this.namesWidth - this.offsetX + this.nameLineHeight) / this.nameLineHeight), 0 > e && (e = 0), t = e + parseInt((this.width - this.namesWidth) / this.nameLineHeight), t > this.commits.length - 1 && (t = this.commits.length - 1), {min: e, max: t}
    }, t.prototype.draw = function () {
      var t, e, n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, $, b, y, j, w, x, k, C, S, L, T, A, E, _, q, D, P, H;
      for (this.drawBackground(), H = this.timeWindow(), g = H.min, p = H.max, this.ctx.save(), this.ctx.translate(this.offsetX, this.offsetY + this.graphTopOffset), i = {}, x = this.spaceMap, a = o = 0, l = x.length; l > o; a = ++o)for (t = x[a], D = this.spaceMap.length - a - 1, c = u = k = g, C = p; C >= k ? C >= u : u >= C; c = C >= k ? ++u : --u)e = this.commits[c], e.populated && e.space === D && (this.drawConnection(e), i[e.id] = !0);
      for (a = m = S = g, L = p; L >= S ? L >= m : m >= L; a = L >= S ? ++m : --m)if (n = this.connectionMap[a])for (v = 0, d = n.length; d > v; v++)e = n[v], i[e.id] || (this.drawConnection(e), i[e.id] = !0);
      for (T = this.spaceMap, a = b = 0, h = T.length; h > b; a = ++b)for (t = T[a], D = this.spaceMap.length - a - 1, c = j = A = g, E = p; E >= A ? E >= j : j >= E; c = E >= A ? ++j : --j)e = this.commits[c], e.populated && e.space === D && (e === this.activeCommit ? this.drawActiveCommit(e) : this.drawCommit(e));
      if (this.showRefs)for (c = w = _ = g, q = p; q >= _ ? q >= w : w >= q; c = q >= _ ? ++w : --w)if (e = this.commits[c], e.populated && (s = this.headsMap[e.id]))for (y = 0, P = 0, f = s.length; f > P; P++)r = s[P], this.spaceUserMap[e.space].name === r.name && ($ = this.drawHead(e, r.head, y), y += $);
      return this.ctx.restore(), this.activeCommit ? this.drawCommitInfo(this.activeCommit) : void 0
    }, t.prototype.drawBackground = function () {
      var t, e, n, i, r;
      for (this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.save(), this.ctx.translate(0, this.offsetY + this.graphTopOffset), this.ctx.clearRect(0, -10, this.width, this.height), r = this.userBlocks, n = e = 0, i = r.length; i > e; n = ++e)t = r[n], this.ctx.fillStyle = this.bgColors[n % 2], this.ctx.fillRect(0, t.start * this.nameLineHeight - 10, this.width, t.count * this.nameLineHeight), this.ctx.fillStyle = "#DDDDDD", this.ctx.fillRect(0, (t.start + t.count) * this.nameLineHeight - 11, this.width, 1);
      return this.ctx.restore()
    }, t.prototype.drawCommit = function (t) {
      var e, n;
      return e = t.time * this.nameLineHeight, n = t.space * this.nameLineHeight, this.ctx.beginPath(), this.ctx.arc(e, n, 3, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(t.space), this.ctx.fill()
    }, t.prototype.drawActiveCommit = function (t) {
      var e, n;
      return e = t.time * this.nameLineHeight, n = t.space * this.nameLineHeight, this.ctx.beginPath(), this.ctx.arc(e, n, 6, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(t.space), this.ctx.fill()
    }, t.prototype.drawCommitInfo = function (t) {
      var e, n, i, r, s, o, a, c, u, l;
      return e = 3, n = 340, l = 56, u = t.message ? this.splitLines(t.message, 48) : [], o = Math.max(l, 38 + 16 * u.length), i = this.offsetX + t.time * this.nameLineHeight, r = this.graphTopOffset + this.offsetY + t.space * this.nameLineHeight, a = 0, c = 0, a = i < this.graphMidpoint ? i + 10 : i - (n + 10), c = r < 40 + (this.height - 40) / 2 ? r + 10 : r - o - 10, this.ctx.save(), this.ctx.translate(a, c), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.2)", this.ctx.lineWidth = 1, this.roundRect(0, 0, n, o, e), s = this.gravatars[t.gravatar], s ? this.drawGravatar(s, 10, 10) : (s = new Image, s.src = t.gravatar, s.onload = function (e) {
        return function () {
          return e.activeCommit === t ? (e.drawGravatar(s, a + 10, c + 10), e.gravatars[t.gravatar] = s) : void 0
        }
      }(this)), this.ctx.fillStyle = "#000", this.ctx.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillText(t.author, 55, 24), this.ctx.fillStyle = "#bbb", this.ctx.font = "11px Consolas, Menlo, Courier, monospace", this.ctx.fillText(t.id.slice(0, 7), 280, 24), this.drawMessage(u, 55, 41), this.ctx.restore()
    }, t.prototype.drawGravatar = function (t, e, n) {
      var i;
      return i = 32, this.ctx.save(), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.0)", this.ctx.lineWidth = .1, this.roundRect(e + 2, n + 2, i, i, 4), this.ctx.clip(), this.ctx.drawImage(t, e + 2, n + 2, i, i), this.ctx.restore()
    }, t.prototype.roundRect = function (t, e, n, i, r) {
      return this.ctx.beginPath(), this.ctx.moveTo(t, e + r), this.ctx.lineTo(t, e + i - r), this.ctx.quadraticCurveTo(t, e + i, t + r, e + i), this.ctx.lineTo(t + n - r, e + i), this.ctx.quadraticCurveTo(t + n, e + i, t + n, e + i - r), this.ctx.lineTo(t + n, e + r), this.ctx.quadraticCurveTo(t + n, e, t + n - r, e), this.ctx.lineTo(t + r, e), this.ctx.quadraticCurveTo(t, e, t, e + r), this.ctx.fill(), this.ctx.stroke()
    }, t.prototype.drawMessage = function (t, e, n) {
      var i, r, s, o, a;
      for (this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#000000", a = [], r = i = 0, s = t.length; s > i; r = ++i)o = t[r], a.push(this.ctx.fillText(o, e, n + 16 * r));
      return a
    }, t.prototype.splitLines = function (t, e) {
      var n, i, r, s, o, a;
      for (a = t.split(" "), s = [], r = "", n = 0, i = a.length; i > n; n++)o = a[n], r.length + 1 + o.length < e ? r = "" === r ? o : r + " " + o : (s.push(r), r = o);
      return s.push(r), s
    }, t.prototype.drawHead = function (t, e, n) {
      var i, r, s, o;
      return this.ctx.font = "11px 'Helvetica Neue', Arial, sans-serif", this.ctx.save(), i = this.ctx.measureText(e.name).width, this.ctx.restore(), s = t.time * this.nameLineHeight, o = t.space * this.nameLineHeight + 5 + n, r = 2.5, this.ctx.save(), this.ctx.translate(s, o - r), this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)", this.ctx.beginPath(), this.ctx.moveTo(0, r), this.ctx.lineTo(-4, 10), this.ctx.quadraticCurveTo(-9, 10, -9, 15), this.ctx.lineTo(-9, 15 + i), this.ctx.quadraticCurveTo(-9, 15 + i + 5, -4, 15 + i + 5), this.ctx.lineTo(4, 15 + i + 5), this.ctx.quadraticCurveTo(9, 15 + i + 5, 9, 15 + i), this.ctx.lineTo(9, 15), this.ctx.quadraticCurveTo(9, 10, 4, 10), this.ctx.lineTo(0, r), this.ctx.fill(), this.ctx.fillStyle = "#fff", this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.textBaseline = "middle", this.ctx.scale(.85, .85), this.ctx.rotate(Math.PI / 2), this.ctx.fillText(e.name, 19, -.5), this.ctx.restore(), i + this.nameLineHeight
    }, t.prototype.drawConnection = function (t) {
      var e, n, i, r, s, o;
      for (s = t.parents, o = [], n = e = 0, i = s.length; i > e; n = ++e)r = s[n], 0 === n ? r.space === t.space ? o.push(this.drawBasicConnection(r, t)) : o.push(this.drawBranchConnection(r, t)) : o.push(this.drawMergeConnection(r, t));
      return o
    }, t.prototype.drawBasicConnection = function (t, e) {
      var n;
      return n = this.spaceColor(e.space), this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(t.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.stroke()
    }, t.prototype.drawBranchConnection = function (t, e) {
      var n;
      return n = this.spaceColor(e.space), this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight - 10, e.space * this.nameLineHeight), this.ctx.stroke(), this.threeClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight)
    }, t.prototype.drawMergeConnection = function (t, e) {
      var n, i, r;
      return n = this.spaceColor(t.space), this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), t.space > e.space ? (this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), r = this.safePath(t.time, e.time, t.space), r ? (this.ctx.lineTo(e.time * this.nameLineHeight - 10, t.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight - 10, e.space * this.nameLineHeight + 15), this.ctx.lineTo(e.time * this.nameLineHeight - 5.7, e.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight)) : (i = this.closestMargin(t.time, e.time, t.space, -1), t.space === e.space + 1 && t.space === i + 1 ? (this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 15, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.5, i * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, e.time * this.nameLineHeight, i * this.nameLineHeight), this.addMargin(t.time, e.time, i)) : t.time + 1 === e.time ? (i = this.closestMargin(t.time, e.time, e.space, 0), this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 15, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 15, e.space * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.5, e.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)) : (this.ctx.lineTo(t.time * this.nameLineHeight + 10, t.space * this.nameLineHeight - 10), this.ctx.lineTo(t.time * this.nameLineHeight + 10, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 10, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 10, e.space * this.nameLineHeight + 15), this.ctx.lineTo(e.time * this.nameLineHeight - 5.7, e.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)))) : (i = this.closestMargin(t.time, e.time, e.space, -1), i < e.space ? (this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, e.space * this.nameLineHeight - 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.4, e.space * this.nameLineHeight - 7.7), this.ctx.stroke(), this.fourClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)) : (this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, e.space * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.4, e.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)))
    }, t.prototype.addMargin = function (t, e, n) {
      return this.marginMap[n] || (this.marginMap[n] = []), this.marginMap[n].push([t, e])
    }, t.prototype.oneClockArrow = function (t, e, n) {
      return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 3, n + 10.5), this.ctx.lineTo(e - 9, n + 5.5), this.ctx.lineTo(e - 2.6, n + 3.5), this.ctx.fill()
    }, t.prototype.twoClockArrow = function (t, e, n) {
      return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 12.4, n + 6.6), this.ctx.lineTo(e - 9.3, n + 10.6), this.ctx.lineTo(e - 3.2, n + 2.4), this.ctx.fill()
    }, t.prototype.threeClockArrow = function (t, e, n) {
      return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 10, n - 3.5), this.ctx.lineTo(e - 10, n + 3.5), this.ctx.lineTo(e - 4, n), this.ctx.fill()
    }, t.prototype.fourClockArrow = function (t, e, n) {
      return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 12.4, n - 6.6), this.ctx.lineTo(e - 9.3, n - 10.6), this.ctx.lineTo(e - 3.2, n - 2.4), this.ctx.fill()
    }, t.prototype.safePath = function (t, e, n) {
      var i, r, s, o;
      for (o = this.spaceMap[n], i = 0, r = o.length; r > i; i++)if (s = o[i], this.timeInPath(t, s))return s[1] === e;
      return!1
    }, t.prototype.closestMargin = function (t, e, n, i) {
      var r, s, o, a, c;
      for (a = this.spaceMap.length, o = i, s = !1, r = !1, c = !1; !r || !s;) {
        if (n + o >= 0 && this.safeMargin(t, e, n + o))return n + o;
        0 > n + o && (s = !0), n + o > a && (r = !0), c === !1 && 0 === o ? (o = -1, c = !0) : o = 0 > o ? -o - 1 : -o - 2
      }
      return n > 0 ? n - 1 : 0
    }, t.prototype.safeMargin = function (t, e, n) {
      var i, r, s, o;
      if (!this.marginMap[n])return!0;
      for (o = this.marginMap[n], i = 0, r = o.length; r > i; i++)if (s = o[i], this.pathsCollide([t, e], s))return!1;
      return!0
    }, t.prototype.pathsCollide = function (t, e) {
      return this.timeWithinPath(t[0], e) || this.timeWithinPath(t[1], e) || this.timeWithinPath(e[0], t) || this.timeWithinPath(e[1], t)
    }, t.prototype.timeInPath = function (t, e) {
      return t >= e[0] && t <= e[1]
    }, t.prototype.timeWithinPath = function (t, e) {
      return t > e[0] && t < e[1]
    }, t.prototype.spaceColor = function (t) {
      return 0 === t ? "#000000" : this.spaceColors[t % this.spaceColors.length]
    }, t
  }(), n = function () {
    function t(t, e, n) {
      this.chrome = e, this.graph = n, this.out = a(this.out, this), this.move = a(this.move, this), this.docmove = a(this.docmove, this), this.down = a(this.down, this), this.up = a(this.up, this), this.dragging = !1, this.lastPoint = {x: 0, y: 0}, this.lastHoverCommit = null, this.lastHoverUser = null, this.pressedCommit = null, this.pressedUser = null, this.canvas = t.getElementsByTagName("canvas")[0], this.canvasOffset = $(this.canvas).offset(), this.canvas.style.cursor = "move", document.body.addEventListener("mouseup", this.up), document.body.addEventListener("mousemove", this.docmove), this.canvas.addEventListener("mousedown", this.down), this.canvas.addEventListener("mousemove", this.move), this.canvas.addEventListener("mouseout", this.out)
    }

    return t.prototype.up = function (t) {
      return this.dragging = !1, this.pressedCommit && this.graph.activeCommit === this.pressedCommit ? window.open("/" + this.graph.activeCommit.user.name + "/" + this.graph.activeCommit.user.repo + "/commit/" + this.graph.activeCommit.id) : this.pressedUser && this.chrome.activeUser === this.pressedUser && (window.location = "/" + this.chrome.activeUser.name + "/" + this.chrome.activeUser.repo + "/network"), this.pressedCommit = null, this.pressedUser = null
    }, t.prototype.down = function (t) {
      return this.graph.activeCommit ? this.pressedCommit = this.graph.activeCommit : this.chrome.activeUser ? this.pressedUser = this.chrome.activeUser : this.dragging = !0
    }, t.prototype.docmove = function (t) {
      var e, n;
      return e = t.pageX, n = t.pageY, this.dragging && (this.graph.moveX(e - this.lastPoint.x), this.graph.moveY(n - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(e - this.lastPoint.x), this.chrome.moveY(n - this.lastPoint.y), this.chrome.draw()), this.lastPoint.x = e, this.lastPoint.y = n
    }, t.prototype.move = function (t) {
      var e, n, i, r;
      return i = t.pageX, r = t.pageY, this.dragging ? (this.graph.moveX(i - this.lastPoint.x), this.graph.moveY(r - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(i - this.lastPoint.x), this.chrome.moveY(r - this.lastPoint.y), this.chrome.draw()) : (n = this.chrome.hover(i - this.canvasOffset.left, r - this.canvasOffset.top), n !== this.lastHoverUser ? (this.canvas.style.cursor = n ? "pointer" : "move", this.chrome.activeUser = n, this.chrome.draw(), this.lastHoverUser = n) : (e = this.graph.hover(i - this.canvasOffset.left, r - this.canvasOffset.top), e !== this.lastHoverCommit && (this.canvas.style.cursor = e ? "pointer" : "move", this.graph.activeCommit = e, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = e))), this.lastPoint.x = i, this.lastPoint.y = r
    }, t.prototype.out = function (t) {
      return this.graph.activeCommit = null, this.chrome.activeUser = null, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = null, this.lastHoverUser = null
    }, t
  }(), e = function () {
    function t(t, e) {
      this.chrome = t, this.graph = e, this.down = a(this.down, this), this.dirty = !1, document.addEventListener("keydown", this.down)
    }

    return t.prototype.moveBothX = function (t) {
      return this.graph.moveX(t), this.chrome.moveX(t), this.graph.activeCommit = null, this.dirty = !0
    }, t.prototype.moveBothY = function (t) {
      return this.graph.moveY(t), this.chrome.moveY(t), this.graph.activeCommit = null, this.dirty = !0
    }, t.prototype.toggleRefs = function () {
      return this.graph.toggleRefs(), this.dirty = !0
    }, t.prototype.redraw = function () {
      return this.dirty && (this.graph.draw(), this.chrome.draw()), this.dirty = !1
    }, t.prototype.down = function (t) {
      if ($(t.target).is("input"))return!0;
      if (t.shiftKey)switch (t.which) {
        case 37:
        case 72:
          return this.moveBothX(999999), this.redraw();
        case 38:
        case 75:
          return this.moveBothY(999999), this.redraw();
        case 39:
        case 76:
          return this.moveBothX(-999999), this.redraw();
        case 40:
        case 74:
          return this.moveBothY(-999999), this.redraw()
      } else switch (t.which) {
        case 37:
        case 72:
          return this.moveBothX(100), this.redraw();
        case 38:
        case 75:
          return this.moveBothY(30), this.redraw();
        case 39:
        case 76:
          return this.moveBothX(-100), this.redraw();
        case 40:
        case 74:
          return this.moveBothY(-30), this.redraw();
        case 84:
          return this.toggleRefs(), this.redraw()
      }
    }, t
  }(), o = !1, $.observe(".js-network-graph-container", {add: function () {
    return o = !0, new i(this, 920, 600)
  }, remove: function () {
    return o = !1
  }})
}.call(this),function () {
  $(document).on("graph:load", ".js-pulse-authors-graph", function (t, e) {
    var n, i, r, s, o, a, c, u, l, d;
    return n = 15, e = e.slice(0, +(n - 1) + 1 || 9e9), s = {top: 20, right: 0, bottom: 30, left: 20}, c = $(this).width() - s.left - s.right, r = $(this).height() - s.top - s.bottom, u = d3.scale.ordinal().domain(d3.range(n)).rangeRoundBands([0, c], .2), l = d3.scale.linear().domain([0, d3.max(e, function (t) {
      return t.commits
    })]).range([r, 0]), d = d3.svg.axis().scale(l).orient("left").ticks(3).tickSize(-c).tickFormat(function (t) {
      return 1e3 > t ? t : d3.format(",s")(t)
    }), o = d3.tip().attr("class", "svg-tip").offset([-10, 0]).html(function (t) {
      var e;
      return"<strong>" + t.commits + "</strong> " + $.pluralize(t.commits, "commit") + " by <strong>" + (null != (e = t.login) ? e : t.name) + "</strong>"
    }), a = d3.select(this).append("svg").attr("width", c + s.left + s.right).attr("height", r + s.top + s.bottom).append("g").attr("transform", "translate(" + s.left + ", " + s.top + ")").call(o), a.append("g").attr("class", "y axis").call(d), i = a.selectAll(".bar").data(e).enter().append("g").attr("class", "bar").attr("transform", function (t, e) {
      return"translate(" + u(e) + ", 0)"
    }), i.append("rect").attr("width", u.rangeBand()).attr("height", function (t, e) {
      return r - l(t.commits)
    }).attr("y", function (t) {
      return l(t.commits)
    }).on("mouseover", o.show).on("mouseout", o.hide), i.append("a").attr("xlink:href", function (t) {
      return null != t.login ? "/" + t.login : void 0
    }).append("image").attr("y", r + 5).attr("xlink:href", function (t) {
      return t.gravatar
    }).attr("width", u.rangeBand()).attr("height", u.rangeBand())
  })
}.call(this),function () {
  $(document).on("graph:load", ".js-graph-punchcard", function (t, e) {
    var n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, b, y, j, w, x;
    return o = 500, j = $(this).width(), d = {}, e.forEach(function (t) {
      var e, n, i;
      return i = d3.weekdays[t[0]], e = null != d[i] ? d[i] : d[i] = [], n = t[1], null == e[n] && (e[n] = 0), e[n] += t[2]
    }), e = d3.entries(d).reverse(), v = [0, 0, 0, 20], p = v[0], f = v[1], m = v[2], h = v[3], c = 100, i = d3.range(7), a = d3.range(24), l = d3.min(e, function (t) {
      return d3.min(t.value)
    }), u = d3.max(e, function (t) {
      return d3.max(t.value)
    }), w = d3.scale.ordinal().domain(a).rangeRoundBands([0, j - c - f - m], .1), x = d3.scale.ordinal().domain(i).rangeRoundBands([o - p - h, 0], .1), g = d3.scale.sqrt().domain([0, u]).range([0, w.rangeBand() / 2]), b = d3.tip().attr("class", "svg-tip").offset([-10, 0]).html(function (t) {
      return"<strong>" + t + "</strong> " + $.pluralize(t, "commit")
    }), y = d3.select(this).data(e).attr("width", j + "px").append("svg").attr("width", j + (f + m)).attr("height", o + p + h).attr("class", "viz").append("g").attr("transform", "translate(" + f + "," + p + ")").call(b), r = y.selectAll("g.day").data(e).enter().append("g").attr("class", "day").attr("transform", function (t, e) {
      return"translate(0, " + x(e) + ")"
    }), r.append("line").attr("x1", 0).attr("y1", x.rangeBand()).attr("x2", j - f - m).attr("y2", x.rangeBand()).attr("class", "axis"), r.append("text").attr("class", "day-name").text(function (t, e) {
      return t.key
    }).attr("dy", x.rangeBand() / 2), y.append("g").selectAll("text.hour").data(a).enter().append("text").attr("text-anchor", "middle").attr("transform", function (t, e) {
      return"translate(" + (w(e) + c) + ", " + o + ")"
    }).attr("class", "label").text(function (t) {
      var e;
      return e = t % 12 || 12, 0 === t || 12 > t ? e + "a" : e + "p"
    }), s = r.selectAll(".hour").data(function (t) {
      return t.value
    }).enter().append("g").attr("class", "hour").attr("transform", function (t, e) {
      return"translate(" + (w(e) + c) + ", 0)"
    }).attr("width", w.rangeBand()), s.append("line").attr("x1", 0).attr("y1", function (t, e) {
      return x.rangeBand() - (e % 2 === 0 ? 15 : 10)
    }).attr("x2", 0).attr("y2", x.rangeBand()).attr("class", function (t, e) {
      return e % 2 === 0 ? "axis even" : "axis odd"
    }), n = s.append("circle").attr("r", 0).attr("cy", x.rangeBand() / 2 - 5).attr("class", function (t) {
      return"day"
    }).on("mouseover", b.show).on("mouseout", b.hide), n.transition().attr("r", g)
  })
}.call(this),function () {
  var t, e, n, i, r, s;
  i = function (t) {
    var e;
    return(e = d3.format(","))(t)
  }, n = {top: 20, right: 80, bottom: 30, left: 40}, s = 960 - n.left - n.right, e = 150 - n.top - n.bottom, t = function (t, e) {
    var n;
    return n = d3.time.format.utc("%A, %B %-d, %Y"), d3.tip().attr("class", "svg-tip web-views comparison").offset([-10, 0]).html(function (r) {
      return"<span class='title'>" + n(r.date) + "</span> <ul class='web-views'> <li class='totals'><strong>" + i(r.total) + "</strong> " + t + "</li> <li class='uniques'><strong>" + i(r.unique) + "</strong> " + e + "</li> </ul>"
    })
  }, r = function (t, r, o) {
    var a, c, u, l, d, h, f, m, p, g, v, b, y, j, w, x, k, C, S, L, T, A, E, _, q, D;
    if (r && null == r.error) {
      for (A = d3.time.scale.utc().range([0, s]), _ = d3.scale.linear().range([e, 0]), q = d3.scale.linear().range([e, 0]), b = d3.time.format.utc("%m/%d"), E = d3.svg.axis().scale(A).ticks(r.counts.length).tickSize(e + 5).tickPadding(10).tickFormat(b).orient("bottom"), D = d3.svg.axis().scale(_).ticks(3).tickFormat(d3.formatSymbol).orient("left"), m = d3.svg.line().x(function (t) {
        return A(t.key)
      }).y(function (t) {
        return _(t.value)
      }), S = d3.select(this).select(".js-graph").append("svg").attr("width", s + n.left + n.right).attr("height", e + n.top + n.bottom).attr("class", "vis").append("g").attr("transform", "translate(" + n.left + "," + n.top + ")").call(o), c = r.counts, c.forEach(function (t) {
        return t.date = new Date(1e3 * t.bucket)
      }), c.sort(function (t, e) {
        return d3.ascending(t.date, e.date)
      }), a = d3.bisector(function (t) {
        return t.date
      }).left, y = function () {
        var t, e, n, i, r, s;
        return s = A.invert(d3.mouse(this)[0]), r = a(c, s, 1), e = c[r - 1], n = c[r], e && n ? (t = s - e.date > n.date - s ? n : e, i = S.selectAll("g.dots circle").filter(function (e) {
          return e.key === t.date
        }), i = i[0], i.sort(function (t, e) {
          return $(t).attr("cy") - $(e).attr("cy")
        }), o.show.call(this, t, i[0])) : void 0
      }, w = [], C = [], h = 0, f = c.length; f > h; h++)d = c[h], w.push({key: d.date, value: d.total}), C.push({key: d.date, value: d.unique});
      return v = [w, C], p = d3.extent(c, function (t) {
        return t.date
      }), j = p[0], l = p[1], g = d3.extent(w, function (t) {
        return t.value
      }), T = g[0], L = g[1], x = d3.max(C, function (t) {
        return t.value
      }), k = x + d3.median(C, function (t) {
        return t.value
      }), A.domain([j, l]), _.domain([0, L]), q.domain([0, k]), $(this).find(".js-traffic-total").text(i(r.summary.total)), $(this).find(".js-traffic-uniques").text(i(r.summary.unique)), S.append("g").attr("class", "x axis").call(E), S.append("g").attr("class", "y axis views").call(D), S.selectAll("path.path").data(v).enter().append("path").attr("class", function (t, e) {
        return"path " + (0 === e ? "total" : "unique")
      }).attr("d", function (t, e) {
        return 0 === e ? m(t) : m.y(function (t) {
          return q(t.value)
        })(t)
      }), u = S.selectAll("g.dots").data(v).enter().append("g").attr("class", function (t, e) {
        return 0 === e ? "dots totals" : "dots uniques"
      }), u.each(function (t, e) {
        var n;
        return n = d3.select(this), 1 === e && (_ = q), n.selectAll("circle").data(function (t, e) {
          return t
        }).enter().append("circle").attr("cx", function (t) {
          return A(t.key)
        }).attr("cy", function (t) {
          return _(t.value)
        }).attr("r", 4)
      }), D.scale(q).orient("right"), S.append("g").attr("class", "y axis unique").attr("transform", "translate(" + s + ", 0)").call(D), S.append("rect").attr("class", "overlay").attr("width", s).attr("height", e).on("mousemove", y).on("mouseout", function (t) {
        return setTimeout(o.hide, 500)
      })
    }
  }, $(document).on("graph:load", "#js-visitors-graph", function (e, n) {
    var i;
    return i = t("views", "unique visitors"), $.observe("#js-visitors-graph .js-graph", {remove: i.hide}), r.apply(this, [e, n, i])
  }), $(document).on("graph:load", "#js-clones-graph", function (e, n) {
    var i;
    return i = t("clones", "unique cloners"), $.observe("#js-clones-graph .js-graph", {remove: i.hide}), r.apply(this, [e, n, i])
  })
}.call(this),function () {
  $(document).on("click", ".js-skip-to-content", function () {
    return $("#start-of-content").next().attr("tabindex", "-1").focus(), !1
  })
}.call(this),function () {
  $.observe(".js-in-app-popup", function (t) {
    setTimeout(function (t) {
      return function () {
        return $(t).submit()
      }
    }(this), 15e3)
  })
}.call(this),function () {
  $(document).on("submit", ".js-mobile-preference-form", function (t) {
    var e;
    return e = $(this).find(".js-mobile-preference-anchor-field"), e.val(window.location.hash.substr(1)), !0
  })
}.call(this),function () {
  var t, e;
  $(document).on("click", ".js-org-billing-plans .js-choose-plan", function (e) {
    return t($(this).closest(".js-plan-row")), !1
  }), t = function (t) {
    var n, i, r, s;
    return r = t.attr("data-name"), i = parseInt(t.attr("data-cost"), 10), n = parseInt(null != (s = t.attr("data-balance")) ? s : "0", 10), $(".js-org-billing-plans").find(".js-plan-row, .js-choose-plan").removeClass("selected"), t.find(".js-choose-plan").addClass("selected"), t.addClass("selected"), $(".js-plan").val(r), 0 === i && 0 === n ? $(".js-billing-section").addClass("has-removed-contents") : ($(".js-billing-section").removeClass("has-removed-contents"), null != t.attr("data-balance") ? e(r) : void 0)
  }, e = function (t) {
    return $(".js-plan-change-message").addClass("is-hidden"), $('.js-plan-change-message[data-name="' + t + '"]').removeClass("is-hidden")
  }, $(function () {
    return $(".selected .js-choose-plan").click()
  })
}.call(this),function () {
  $(document).on("change", ".js-person-toggle", function (t) {
    var e, n;
    return e = $(".js-admin-center-toolbar"), n = e.find(".js-person-selected-actions"), e.find(".js-admin-center-toolbar-select-all-label").toggleClass("has-selected-members"), $(".js-person-not-selected-actions").toggleClass("hidden"), n.toggleClass("hidden")
  }), $(document).on("change", ".js-hosted-admin-auth-switcher", function (t) {
    var e;
    return e = $(".js-hosted-admin-saml-settings"), e.toggleClass("hidden")
  })
}.call(this),function () {
  var t, e;
  t = function () {
    var t, n, i, r, s, o;
    return s = [], n = $(".js-advanced-search-input").val(), o = {Repositories: 0, Users: 0, Code: 0}, t = $("input[type=text].js-advanced-search-prefix, select.js-advanced-search-prefix"), s = e(t, function (t, e, n) {
      return"" === t ? "" : ("" !== e && o[n]++, "" !== e ? "" + t + e : void 0)
    }), $.merge(s, e($("input[type=checkbox].js-advanced-search-prefix"), function (t, e, n) {
      var i;
      return i = $(this).prop("checked"), i !== !1 && o[n]++, i !== !1 ? "" + t + i : void 0
    })), i = function (t) {
      return t.Users > t.Code && t.Users > t.Repositories ? "Users" : t.Code > t.Users && t.Code > t.Repositories ? "Code" : "Repositories"
    }, r = $.trim(s.join(" ")), $(".js-type-value").val(i(o)), $(".js-search-query").val($.trim(n + " " + r)), $(".js-advanced-query").empty(), $(".js-advanced-query").text("" + r), $(".js-advanced-query").prepend($("<span>").text($.trim(n)), " ")
  }, e = function (t, e) {
    return $.map(t, function (t, n) {
      var i, r, s, o;
      return s = $.trim($(t).val()), i = $(t).attr("data-search-prefix"), r = $(t).attr("data-search-type"), o = function (t) {
        return-1 !== t.search(/\s/g) ? '"' + t + '"' : t
      }, "" === i ? e.call(t, i, s, r) : -1 !== s.search(/\,/g) && "location" !== i ? s.split(/\,/).map(function (n, s) {
        return e.call(t, i, o($.trim(n)), r)
      }) : e.call(t, i, o(s), r)
    })
  }, $(document).onFocusedInput(".js-advanced-search-prefix", function () {
    return function () {
      return t()
    }
  }), $(document).on("change", ".js-advanced-search-prefix", t), $(document).on("focusin", ".js-advanced-search-input", function () {
    return $(this).closest(".js-advanced-search-label").addClass("focus")
  }), $(document).on("focusout", ".js-advanced-search-input", function () {
    return $(this).closest(".js-advanced-search-label").removeClass("focus")
  }), $(document).on("click", ".js-see-all-search-cheatsheet", function () {
    return $(".js-more-cheatsheet-info").removeClass("hidden"), !1
  }), $(function () {
    return $(".js-advanced-search-input").length ? t() : void 0
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c;
  a = null, s = 300, o = [".", ".", "."], r = 0, e = function () {
    return $(".js-audit-log-export-button").removeClass("disabled")
  }, t = function () {
    return $(".js-audit-log-export-button").addClass("disabled")
  }, i = function () {
    var e, n;
    return e = $(".js-audit-log-export-status"), e.data("oldText", e.text()), n = function () {
      var t;
      return t = o.slice(0, r).join(""), e.text("Exporting" + t), r >= 3 ? r = 0 : r += 1
    }, a = setInterval(n, s), t()
  }, c = function () {
    var t;
    return e(), t = $(".js-audit-log-export-status"), t.text(t.data("oldText")), clearInterval(a), r = 0
  }, n = function () {
    return c(), $("#ajax-error-message").show(function () {
      return this.classList.add("visible")
    })
  }, $(document).on("ajaxBeforeSend", ".js-audit-log-export", i), $(document).on("ajaxError", ".js-audit-log-export", n), $(document).on("ajaxSuccess", ".js-audit-log-export", function (t, e, i, r) {
    var s, o;
    return o = this, s = function () {
      return c(), window.location = r.export_url
    }, $.fetchPoll(r.job_url).then(s, n)
  }), $(document).on("navigation:open", ".audit-search-form .js-suggester", function (t) {
    return $(this).closest("form").submit()
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c, u;
  r = function (t) {
    var e, n, i, r, s;
    if (r = t.match(/\#?(?:L)(\d+)/gi)) {
      for (s = [], e = 0, n = r.length; n > e; e++)i = r[e], s.push(parseInt(i.replace(/\D/g, "")));
      return s
    }
    return[]
  }, n = function (t) {
    var e;
    return(e = t.match(/(file-.+?-)L\d+?/i)) ? e[1] : ""
  }, i = function (t) {
    return{lineRange: r(t), anchorPrefix: n(t)}
  }, t = function (t) {
    var e, n;
    switch (n = t.lineRange, e = t.anchorPrefix, n.sort(c), n.length) {
      case 1:
        return"#" + e + "L" + n[0];
      case 2:
        return"#" + e + "L" + n[0] + "-L" + n[1];
      default:
        return"#"
    }
  }, c = function (t, e) {
    return t - e
  }, a = !1, e = function (t) {
    var e, n, i, r, s;
    if (r = t.lineRange, e = t.anchorPrefix, i = $(".js-file-line"), i.length) {
      if (i.css("background-color", ""), 1 === r.length)return $("#" + e + "LC" + r[0]).css("background-color", "#f8eec7");
      if (r.length > 1) {
        for (n = r[0], s = []; n <= r[1];)$("#" + e + "LC" + n).css("background-color", "#f8eec7"), s.push(n++);
        return s
      }
    }
  }, o = function (t) {
    var n, r, s;
    return null == t && (t = i(window.location.hash)), s = t.lineRange, n = t.anchorPrefix, e(t), !a && (r = $("#" + n + "LC" + s[0])).length && $(window).scrollTop(r.offset().top - .33 * $(window).height()), a = !1
  }, u = function (t, e) {
    var n, i, r;
    return r = "FORM" === t.nodeName ? "action" : "href", n = t.getAttribute(r), (i = n.indexOf("#")) >= 0 && (n = n.substr(0, i)), n += e, t.setAttribute(r, n)
  }, $.hashChange(function () {
    var t, e, n, i, r, s;
    if (document.querySelector(".js-file-line-container")) {
      for (setTimeout(o, 0), e = window.location.hash, r = document.querySelectorAll(".js-update-url-with-hash"), s = [], n = 0, i = r.length; i > n; n++)t = r[n], s.push(u(t, e));
      return s
    }
  }), s = function (t) {
    var e, n;
    return a = !0, n = null != (e = $(window).scrollTop()) ? e : 0, t(), $(window).scrollTop(n)
  }, $(document).on("mousedown", ".js-line-number", function (e) {
    var n, o;
    return n = i(this.id), e.shiftKey && (o = r(window.location.hash), n.lineRange.unshift(o[0])), s(function () {
      return window.location.hash = t(n)
    }), !1
  }), $(document).on("submit", ".js-jump-to-line-form", function () {
    var t, e;
    return t = this.querySelector(".js-jump-to-line-field"), (e = t.value.replace(/[^\d\-]/g, "")) && (window.location.hash = "L" + e), $(document).trigger("close.facebox"), !1
  })
}.call(this),function () {
  var t, e, n, i, r, s, o, a, c, u, l, d, h, f, m, p, g, v, b;
  a = function (t) {
    var e, n, i;
    return n = t[0], e = n.querySelector(".js-blob-filename"), e ? "." === (i = e.value) || ".." === i || ".git" === i ? !1 : /\S/.test(e.value) : !0
  }, t = function (t) {
    var e;
    return e = t.querySelector(".js-blob-contents"), e ? "true" === e.getAttribute("data-allow-unchanged") ? !0 : r(e) : !0
  }, l = function (t) {
    var e;
    return e = t.querySelector(".js-new-filename-field"), r(e)
  }, e = function (e) {
    var n;
    return e = $(".js-blob-form"), n = e[0], e.find(".js-check-for-fork").is($.visible) ? !1 : a(e) ? t(n) || l(n) : !1
  }, p = function (t) {
    var e;
    return e = t.find(".js-blob-contents")[0], e ? $(e).attr("data-allow-unchanged") ? !0 : r(e) : !1
  }, c = function (t) {
    var e, n;
    return n = t[0], e = n.querySelector(".js-blob-contents"), r(e) || l(n)
  }, n = null, i = function (t) {
    var e;
    return e = $(t).attr("data-github-confirm-unload"), ("yes" === e || "true" === e) && (e = ""), null == e && (e = "false"), "no" === e || "false" === e ? null : function () {
      return e
    }
  }, d = function () {
    var t;
    return t = $(".js-blob-form"), t[0] ? (t.find(".js-blob-submit").prop("disabled", !e(t)), t.find(".js-blob-contents-changed").val(p(t)), n ? c(t) ? window.onbeforeunload = n : window.onbeforeunload = null : void 0) : void 0
  }, h = function (t) {
    var e, n, i, r, s;
    for (r = t.querySelectorAll("input"), s = [], n = 0, i = r.length; i > n; n++)e = r[n], "hidden" === e.getAttribute("type") && e.getAttribute("class") && (null == e.getAttribute("data-default-value") ? s.push(e.setAttribute("data-default-value", e.value)) : s.push(void 0));
    return s
  }, r = function (t) {
    return null == t ? !0 : "hidden" === t.type ? t.value !== t.getAttribute("data-default-value") : t.value !== t.defaultValue
  }, f = function (t) {
    var e, n, i, r;
    return e = t.querySelector(".js-blob-contents"), i = t.querySelector(".js-new-filename-field"), n = t.querySelector(".js-blob-filename"), e && i && n && (null != (r = n.defaultValue) ? r.length : void 0) ? $(e).data("old-filename", i.value) : void 0
  }, $.observe(".js-blob-form", function () {
    h(this), f(this), d(), n = i(this), $(this).on("submit", function () {
      return window.onbeforeunload = null
    })
  }), $(document).on("change", ".js-blob-contents", function () {
    return m($(".js-blob-filename")), d()
  }), $(document).on("click", ".js-new-blob-submit", function () {
    return $(this).closest("form.js-new-blob-form").submit();
  }), $(document).onFocusedInput(".js-blob-filename", function () {
    return function () {
      return $(".js-blob-contents").attr("data-filename", $(this).val()), u($(this).val()), m($(this))
    }
  }), $(document).onFocusedInput(".js-breadcrumb-nav", function () {
    return function () {
      return b($(this)), m($(this))
    }
  }), $(document).onFocusedKeydown(".js-breadcrumb-nav", function () {
    return function (t) {
      var e, n, i;
      return n = $(this).caretSelection(), i = [0, 0], e = 0 === $(n).not(i).length && 0 === $(i).not(n).length, e && 8 === t.keyCode && 1 !== $(this).parent().children(".separator").length && (o($(this), !0), t.preventDefault()), m($(this))
    }
  }), m = function (t) {
    return null != t[0] && (v(t), g(t)), d()
  }, b = function (t) {
    var e, n, i, r, a, c;
    for (i = []; t.val().split("/").length > 1;)e = t.val(), r = e.split("/"), n = r[0], c = r.slice(1).join("/"), "" === n || "." === n || ".git" === n ? (t.val(c), a = function () {
      return t.caret(0)
    }, i.push(window.setTimeout(a, 1))) : ".." === n ? i.push(o(t)) : i.push(s(t, n, c));
    return i
  }, u = function (t) {
    var e, n;
    return e = $(".js-gitignore-template"), n = $(".js-license-template"), /^(.+\/)?\.gitignore$/.test(t) ? e.addClass("is-visible") : /^(.+\/)?(licen[sc]e|copying)($|\.)/i.test(t) ? n.addClass("is-visible") : (e.removeClass("is-visible"), n.removeClass("is-visible"))
  }, g = function (t) {
    var e, n, i, s, o, a, c, u, l, d, h, f;
    return i = t.closest("form"), n = $(".js-blob-contents"), e = i.find(".js-new-blob-commit-summary"), c = t.val() ? "Create " + t.val() : "Create new file", h = n.data("old-filename"), u = $(".js-new-filename-field").val(), n.removeData("new-filename"), c = (null != h ? h.length : void 0) && u !== h && null != t[0] ? (n.data("new-filename", !0), o = r(n[0]), s = o ? "Update and rename" : "Rename", t.val().length && u.length ? (f = h.split("/"), l = u.split("/"), d = !0, a = f.length - 1, f.forEach(function (t, e) {
      return e !== a && t !== l[e] ? d = !1 : void 0
    }), f.length === l.length && d ? s + " " + f[a] + " to " + l[a] : s + " " + h + " to " + u) : s + " " + h) : (null != h ? h.length : void 0) && u === h ? "Update " + t.val() : c, e.attr("placeholder", c), $(".js-commit-message-fallback").val(c)
  }, v = function (t) {
    var e, n;
    return e = $(".breadcrumb").children("[itemscope]"), n = "", e.each(function () {
      var t;
      return t = $(this), n = n + t.text() + "/"
    }), n += t.val(), $(".js-new-filename-field").val(n)
  }, o = function (t, e) {
    var n, i;
    return null == e && (e = !1), e || t.val(t.val().replace("../", "")), i = function () {
      return t.caret(0)
    }, 1 !== t.parent().children(".separator").length && (t.prev().remove(), n = t.prev().children().children().html(), t.prev().remove(), e && (t.val("" + n + t.val()), i = function () {
      return e ? t.caret(n.length) : void 0
    })), u(t.val()), window.setTimeout(i, 1)
  }, s = function (t, e, n) {
    var i, r, s, o, a, c, l;
    return null == n && (n = ""), e = e.replace(/[^-.a-z_0-9]+/gi, "-"), e = e.replace(/^-+|-+$/g, ""), e.length > 0 && (l = t.parent().children(".js-repo-root, [itemtype]").children("a").last().attr("href"), l || (i = t.parent().children(".js-repo-root, [itemtype]").children("span").children("a").last(), r = i.attr("data-branch"), a = i.attr("href"), l = a + "/tree/" + r), s = $(".js-crumb-template").clone().removeClass("js-crumb-template"), s.find("a[itemscope]").attr("href", l + "/" + e), s.find("span").text(e), o = $(".js-crumb-separator").clone().removeClass("js-crumb-separator"), t.before(s, o)), t.val(n), u(t.val()), c = function () {
      return t.caret(0)
    }, window.setTimeout(c, 1)
  }, $(document).onFocusedInput(".js-new-blob-commit-summary", function () {
    var t;
    return t = $(this).closest(".js-file-commit-form"), function () {
      return t.toggleClass("is-too-long-error", $(this).val().length > 50)
    }
  }), $.observe(".js-check-for-fork", function () {
    this.addEventListener("load", function () {
      return d()
    })
  }), $(document).on("change", ".js-gitignore-template input[type=radio]", function () {
    var t;
    return t = $(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"), $.fetchText(this.getAttribute("data-template-url")).then(function (e) {
      return t.setCode(e)
    })
  }), $(document).on("change", ".js-license-template input[type=radio]", function () {
    var t, e;
    return t = $(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"), e = $(this).attr("data-template-contents"), t.setCode(e)
  }), $(document).onFocusedKeydown(".js-new-blob-commit-description", function () {
    return function (t) {
      return"ctrl+enter" === t.hotkey || "meta+enter" === t.hotkey ? ($(this).closest("form").submit(), !1) : void 0
    }
  })
}.call(this),function () {
  var t;
  t = null, $.observe(".js-branch-search-field", function () {
    var e, n, i, r, s, o, a, c, u, l, d, h, f, m;
    n = $(this), i = n.closest(".js-branch-search"), e = i.closest(".js-branches"), r = e.find(".js-branches-subnav .js-subnav-item"), f = i.prop("action"), h = i.attr("data-reset-url"), m = i.attr("data-results-container"), u = /\S/, a = function () {
      return u.test(n.val())
    }, l = function (t, e) {
      var n;
      return $.support.pjax && window.history.replaceState(null, "", e), n = document.getElementById(m), $(n).html(t)
    }, o = null, s = function (t) {
      return o && o.readyState < 4 && o.abort(), o = $.ajax(t)
    }, c = function () {
      var n, o;
      return null === t && (t = r.filter(".selected")), n = a(), o = n ? f + "?" + i.serialize() : h, s({url: o, context: i}).always(function () {
        return e.removeClass("is-loading")
      }).done(function (t) {
        return l(t, o)
      }), e.toggleClass("is-search-mode", n), e.addClass("is-loading"), r.removeClass("selected"), n ? r.filter(".js-branches-all").addClass("selected") : (t.addClass("selected"), t = null)
    }, d = function () {
      var t;
      return t = a(), n.val(""), t ? c() : void 0
    }, n.on("throttled:input", c), n.on("keyup", function (t) {
      return"esc" === t.hotkey ? (d(), this.blur()) : void 0
    })
  }), $(document).on("submit", ".js-branch-search", !1), $(document).on("click", ".js-clear-branch-search", function (t) {
    var e;
    if (1 === t.which)return e = $(this).closest(".js-branch-search").find(".js-branch-search-field"), e.focus().val("").trigger("input"), t.preventDefault()
  }), $(document).on("ajaxSend", ".js-branch-destroy, .js-branch-restore", function (t, e) {
    var n, i, r, s, o;
    return i = $(this), o = i.is(".js-branch-destroy"), s = i.closest(".js-branch-row").attr("data-branch-name"), n = i.closest(".js-branches").find(".js-branch-row").filter(function () {
      return this.getAttribute("data-branch-name") === s
    }), r = i.find("button[type=submit]"), r.blur().removeClass("tooltipped"), n.addClass("loading"), e.done(function () {
      return n.toggleClass("is-deleted", o)
    }).always(function () {
      return n.removeClass("loading"), r.addClass("tooltipped")
    })
  })
}.call(this),function () {
  $(document).on("navigation:keyopen", ".commits-list-item", function () {
    return $(this).find(".commit-title > a").first().click(), !1
  }), $(document).on("navigation:keydown", ".commits-list-item", function (t) {
    return"c" === t.hotkey ? ($(this).find(".commit-title > a").first().click(), !1) : void 0
  })
}.call(this),function () {
  $(document).on("click", ".js-compare-tabs a", function () {
    return $(this).closest(".js-compare-tabs").find("a").removeClass("selected"), $(this).addClass("selected"), $("#commits_bucket, #files_bucket, #commit_comments_bucket").hide(), $(this.hash).show(), !1
  }), $.hashChange(function () {
    return $(this).closest("#files_bucket")[0] && !$(this).is($.visible) ? $('a.tabnav-tab[href="#files_bucket"]').click() : void 0
  }), $(document).on("click", ".js-toggle-range-editor-cross-repo", function () {
    return $(".js-range-editor").toggleClass("is-cross-repo"), !1
  }), $(document).on("pjax:click", ".js-range-editor", function (t, e) {
    $(".js-compare-pr").hasClass("open") && !e.url.match(/expand=1/) && (null == e.data && (e.data = {}), e.data.expand = "1")
  }), $(document).on("navigation:open", "form.js-commitish-form", function () {
    var t, e, n;
    return e = $(this), n = e.find(".js-new-item-name").text(), t = $("<input>", {type: "hidden", name: "new_compare_ref", value: n}), e.append(t), e.submit()
  }), $.observe(".js-compare-pr.open", {add: function () {
    return document.body.classList.add("is-pr-composer-expanded")
  }, remove: function () {
    return document.body.classList.remove("is-pr-composer-expanded")
  }})
}.call(this),function () {
  $.observe(".js-contact-javascript-flag", function (t) {
    t.value = "true"
  })
}.call(this),function () {
  var t, e;
  t = function (t) {
    var e, n, i, r, s, o;
    for (t = t.toLowerCase(), e = $(".js-csv-data tbody tr"), r = [], n = 0, i = e.length; i > n; n++)s = e[n], o = $(s).text().toLowerCase(), -1 === o.indexOf(t) ? r.push($(s).hide()) : r.push($(s).show());
    return r
  }, e = function (e) {
    var n;
    n = e.target.value, null != n && t(n), e.preventDefault()
  }, $(document).on("focus", ".js-csv-filter-field", function () {
    return $(this).on("keyup", e)
  }), $(document).on("blur", ".js-csv-filter-field", function () {
    return $(this).off("keyup", e)
  })
}.call(this),function () {
  var t, e, n, i, r;
  $.hashChange(i = function () {
    var i, s, o, a, c, u, l, d, h;
    return a = window.location.hash, a && (u = r(a)) && (i = u[0], s = u[1], h = u[2], c = u[3], !n(a.slice(1))) ? (d = 0, l = 1, (o = function () {
      var i, r;
      if ((r = $(n(s)).next()[0]) && (i = e(r, h, c)))return $(i).parents(".js-details-container").addClass("open"), t(i).then(function () {
        var t, e, i, r;
        if (e = n(a.slice(1))) {
          if (i = $(e).overflowOffset(), r = i.top, t = i.bottom, 0 > r || 0 > t)return e.scrollIntoView()
        } else if (l > d)return d++, o()
      })
    })()) : void 0
  }), $(document).on("click", ".js-expand", function () {
    return t(this), !1
  }), t = function (t) {
    var e;
    return e = t.getAttribute("data-url"), e += "&anchor=" + encodeURIComponent(t.hash.slice(1)), e = e.replace(/[?&]/, "?"), new Promise(function (n, i) {
      return $.fetchText(e).then(function (e) {
        var i, r;
        return i = $(t).closest(".js-expandable-line"), r = i.next(".file-diff-line"), r.preservingScrollPosition(function () {
          return i.replaceWith(e)
        }), n()
      }, i)
    })
  }, n = function (t) {
    return document.getElementById(t) || document.getElementsByName(t)[0]
  }, r = function (t) {
    var e, n;
    return e = t.match(/\#(diff\-[a-f0-9]+)([L|R])(\d+)$/i), null != e && 4 === e.length ? e : (n = t.match(/\#(discussion\-diff\-[0-9]+)([L|R])(\d+)$/i), null != n && 4 === n.length ? n : null)
  }, e = function (t, e, n) {
    var i, r, s, o, a, c, u, l;
    for (n = parseInt(n, 10), c = $(t).find(".js-expand"), o = 0, a = c.length; a > o; o++)if (r = c[o], i = "R" === e ? "data-right-range" : "data-left-range", u = r.getAttribute(i).split("-"), l = u[0], s = u[1], parseInt(l, 10) <= n && n <= parseInt(s, 10))return r;
    return null
  }
}.call(this),function () {
  var t, e, n, i, r, s, o, a;
  $(document).on("click", ".js-add-single-line-comment", function () {
    var t, e, i, r, a, c;
    n($(this).closest(".file")[0]), a = this.getAttribute("data-path"), t = this.getAttribute("data-anchor"), c = this.getAttribute("data-position"), e = this.getAttribute("data-line"), r = o($(this).closest("tr")[0], {path: a, anchor: t, position: c, line: e}), i = $(r).find(".js-line-comments")[0], i.classList.contains("is-resolved") ? i.classList.toggle("is-collapsed") : s(i)
  }), $(document).on("click", ".js-add-split-line-comment", function () {
    var t, e, r, o, c, u, l, d;
    n($(this).closest(".file")[0]), d = this.getAttribute("data-type"), u = this.getAttribute("data-path"), t = this.getAttribute("data-anchor"), l = this.getAttribute("data-position"), r = this.getAttribute("data-line"), e = function () {
      switch (d) {
        case"addition":
          return"js-addition";
        case"deletion":
          return"js-deletion"
      }
    }(), c = a($(this).closest("tr")[0]), o = i(c, e, {type: d, anchor: t, path: u, position: l, line: r}), o.classList.contains("is-resolved") ? o.classList.toggle("is-collapsed") : s(o)
  }), $(document).on("click", ".js-toggle-inline-comment-form", function () {
    return s($(this).closest(".js-line-comments")[0]), !1
  }), $(document).on("quote:selection", ".js-line-comments", function () {
    s(this)
  }), $(document).onFocusedKeydown(".js-inline-comment-form .js-comment-field", function () {
    return function (e) {
      return $(this).hasClass("js-navigation-enable") ? void 0 : "esc" === e.hotkey && 0 === this.value.length ? (t($(this).closest(".js-inline-comment-form")[0]), !1) : void 0
    }
  }), $(document).on("click", ".js-hide-inline-comment-form", function () {
    return t($(this).closest(".js-inline-comment-form")[0]), !1
  }), $(document).on("ajaxSuccess", ".js-inline-comment-form", function (e, n, i, r) {
    var s, o, a;
    this === e.target && (s = $(this).closest(".js-line-comments"), s.find(".js-comments-holder").append(r.inline_comment), (a = r.diff_line) && $(this).closest(".js-inline-comments-container").prev().replaceWith(a), (o = r.actions) && $(this).closest(".js-inline-comment-form-container").find(".js-comment-resolution").replaceWith(o), t(this))
  }), $(document).on("session:resume", function (t) {
    var e;
    (e = t.targetId.match(/^new_inline_comment_diff_(diff-\w+)_(\d+)$/)) && $(".js-add-line-comment[data-anchor=" + e[1] + "][data-position=" + e[2] + "]").click()
  }), s = function (t) {
    return $(t).find(".js-inline-comment-form-container").addClass("open"), $(t).find(".js-write-tab").click(), $(t).find(".js-comment-field").focus()
  }, t = function (t) {
    return t.reset(), $(t).closest(".js-inline-comment-form-container").removeClass("open"), e()
  }, n = function (t) {
    return $(t).find(".js-toggle-file-notes").prop("checked", !0).trigger("change")
  }, e = function () {
    var t, e, n, i, r, s;
    for (s = $(".file .js-inline-comments-container"), i = 0, r = s.length; r > i; i++)t = s[i], n = $(t).find(".js-comments-holder > *").length > 0, e = $(t).find(".js-inline-comment-form-container").hasClass("open"), n || e || $(t).remove()
  }, $.observe(".js-comment", {remove: e}), o = function (t, e) {
    var n, i, s;
    return null == e && (e = {}), (s = $(t).next(".js-inline-comments-container")[0]) ? s : (n = $("#js-inline-comments-single-container-template"), s = n.children().first().clone()[0], (i = s.querySelector(".js-inline-comment-form")) && (r(i, e), i.querySelector(".js-comment-field").id = "new_inline_comment_" + e.anchor + "_" + e.position), $(t).after(s), s)
  }, i = function (t, e, n) {
    var i, s, o;
    return null == n && (n = {}), (o = $(t).find(".js-line-comments." + e)[0]) ? o : (o = $("#js-inline-comments-split-form-container-template").clone().children()[0], $(o).addClass(e), (s = $(o).find(".js-inline-comment-form")[0]) && (r(s, n), s.querySelector(".js-comment-field").id = "new_inline_comment_" + n.anchor + "_" + n.position), i = $(t).find("." + e), i.last().after(o), i.remove(), o)
  }, a = function (t) {
    var e;
    return(e = $(t).next(".js-inline-comments-container")[0]) ? e : (e = $("#js-inline-comments-split-container-template").clone().children()[0], $(t).after(e), e)
  }, r = function (t, e) {
    var n, i, r, s;
    for (s = t.elements, i = 0, r = s.length; r > i; i++)n = s[i], n.name in e && (n.value = e[n.name])
  }
}.call(this),function () {
  var t, e;
  t = function (t, e, n) {
    return $.observe(t, function (t) {
      var i, r, s, o, a, c;
      return c = null, r = s = function () {
        c && n(c, !1), c = null
      }, o = function (t) {
        c && n(c, !1), c = $(t.target).closest(e)[0], c && n(c, !0)
      }, i = function () {
        return t.addEventListener("mouseenter", r), t.addEventListener("mouseleave", s), t.addEventListener("mouseover", o)
      }, a = function () {
        return t.removeEventListener("mouseenter", r), t.removeEventListener("mouseleave", s), t.removeEventListener("mouseover", o)
      }, {add: i, remove: a}
    })
  }, e = function (t) {
    return Math.floor(t / 2)
  }, t(".diff-table", "td.blob-code, td.blob-num", function (t, n) {
    var i, r, s, o, a, c, u, l, d, h;
    if (h = t.parentNode, i = h.children, 4 === i.length)for (o = a = 0, u = i.length; u > a; o = ++a)s = i[o], s === t && (r = e(o));
    for (d = [], o = c = 0, l = i.length; l > c; o = ++c)s = i[o], (null == r || e(o) === r) && d.push(s.classList.toggle("is-hovered", n));
    return d
  })
}.call(this),function () {
  var t, e, n;
  $(document).on("click", ".js-linkable-line-number", function () {
    return window.location.hash = this.id, !1
  }), t = null, n = function (t) {
    return Math.floor(t / 2)
  }, e = function () {
    var e, i, r, s, o, a, c, u, l, d, h;
    if (t) {
      for (a = 0, u = t.length; u > a; a++)r = t[a], r.classList.remove("selected-line");
      t = null
    }
    if (o = window.location.hash.substring(1), o && (h = document.getElementById(o)), h && h.classList.contains("js-linkable-line-number")) {
      if (d = h.parentNode, e = d.children, 4 === e.length)for (s = c = 0, l = e.length; l > c; s = ++c)r = e[s], r === h && (i = n(s));
      t = function () {
        var t, o, a;
        for (a = [], s = t = 0, o = e.length; o > t; s = ++t)r = e[s], (null == i || n(s) === i) && (r.classList.toggle("selected-line"), a.push(r));
        return a
      }()
    }
  }, $.hashChange(e), $.observe(".blob-expanded", e)
}.call(this),function () {
  var t;
  t = function () {
    var t;
    return t = "split" === $("meta[name=diff-view]").prop("content") && $(".file-diff-split").is(":visible"), document.body.classList.toggle("split-diff", t)
  }, $.observe("meta[name=diff-view]", {add: t, remove: t}), $.observe(".file-diff-split", {add: t, remove: t}), $.observe(".js-pull-request-tab.selected", {add: t, remove: t}), $.observe(".js-compare-tabs .tabnav-tab.selected", {add: t, remove: t})
}.call(this),function () {
  $(document).on("change", ".js-toggle-file-notes", function () {
    return $(this).closest(".file").toggleClass("show-inline-notes", this.checked)
  }), $(document).on("click", ".js-toggle-all-file-notes", function () {
    var t, e;
    return t = $(".js-toggle-file-notes"), e = 0 === t.filter(":checked").length, t.prop("checked", e).trigger("change"), !1
  }), $.observe(".js-inline-comments-container", function () {
    var t, e, n;
    return(e = $(this).closest(".file")[0]) ? (t = n = function () {
      var t;
      t = null != e.querySelector(".js-inline-comments-container"), e.classList.toggle("has-inline-notes", t)
    }, {add: t, remove: n}) : void 0
  })
}.call(this),function () {
  var t;
  t = function (t) {
    var e, n, i;
    return i = t.parentElement, n = i.querySelectorAll("td.js-line-comments").length, e = i.querySelectorAll("td.js-line-comments.is-collapsed").length, i.classList.toggle("is-collapsed", e > 0 && n === e)
  }, $.observe("td.js-line-comments.is-collapsed", {add: function (e) {
    return t(e)
  }, remove: function (e) {
    return t(e)
  }})
}.call(this),function () {
  $(document).on("focusin", ".js-url-field", function () {
    var t;
    return t = this, setTimeout(function () {
      return $(t).select()
    }, 0)
  })
}.call(this),function () {
  document.querySelector(".js-account-membership-form") && ($(document).one("change.early-access-tracking", ".js-account-membership-form", function () {
    return window.ga("send", "event", "Large File Storage", "attempt", "location: early access form")
  }), $(document).on("submit.early-access-tracking", ".js-account-membership-form", function (t) {
    return window.ga("send", "event", "Large File Storage", "submit", "location: early access form")
  }))
}.call(this),function () {
  $.observe(".js-auto-verify-email", function (t) {
    return t.submit()
  })
}.call(this),function () {
  $(document).on("click", ".js-events-pagination", function () {
    var t, e;
    return e = $(this).parent(".ajax_paginate"), t = e.parent(), e.hasClass("loading") ? !1 : (e.addClass("loading"), $.ajax({url: $(this).attr("href"), complete: function () {
      return e.removeClass("loading")
    }, success: function (t) {
      return e.replaceWith(t)
    }}), !1)
  })
}.call(this),function () {
  $(function () {
    var t, e;
    return t = $(".js-newsletter-frequency-choice"), t.length ? (e = function () {
      var e;
      return t.find(".selected").removeClass("selected"), e = t.find("input[type=radio]:enabled:checked"), e.closest(".choice").addClass("selected")
    }, t.on("change", "input[type=radio]", function () {
      return e()
    }), e()) : void 0
  }), $(document).on("ajaxSuccess", ".js-subscription-toggle", function (t, e, n) {
    var i;
    return i = $(this).find(".selected .notice"), i.addClass("visible"), setTimeout(function () {
      return i.removeClass("visible")
    }, 2e3)
  }), $(document).on("ajaxSuccess", ".js-explore-newsletter-subscription-container", function (t, e, n) {
    return $(this).replaceWith(e.responseText)
  })
}.call(this),function () {
  var t, e;
  t = function () {
    var t;
    return t = $("#js-features-branch-diagram"), t.removeClass("preload"), t.find("path").each(function (t) {
      var e, n, i;
      return $(this).is("#js-branch-diagram-branch") ? i = "stroke-dashoffset 3.5s linear 0.25s" : $(this).is("#js-branch-diagram-master") ? i = "stroke-dashoffset 4.1s linear 0s" : $(this).is("#js-branch-diagram-arrow") && (i = "stroke-dashoffset 0.2s linear 4.3s"), n = $(this).get(0), e = n.getTotalLength(), n.style.transition = n.style.WebkitTransition = "none", n.style.strokeDasharray = e + " " + e, n.style.strokeDashoffset = e, n.getBoundingClientRect(), n.style.transition = n.style.WebkitTransition = i, n.style.strokeDashoffset = "0"
    })
  }, $(document).on("click", ".js-segmented-nav-button", function (t) {
    var e, n;
    return n = $(this).attr("data-selected-tab"), e = $(this).closest(".js-segmented-nav"), e.find(".js-segmented-nav-button").removeClass("selected"), e.siblings(".js-selected-nav-tab").removeClass("active"), $(this).addClass("selected"), $("." + n).addClass("active"), t.preventDefault()
  }), e = function () {
    return $(document).scrollTop() >= $("#js-features-branch-diagram").offset().top - 700 ? t() : void 0
  }, $.observe("#js-features-branch-diagram.preload", {add: function () {
    return $(window).on("scroll", e)
  }, remove: function () {
    return $(window).off("scroll", e)
  }})
}.call(this),function () {
  $(function () {
    var t;
    return $(".js-survey-get-started").on("click", function () {
      return $(".js-survey-intro").removeClass("in").addClass("out"), $(".js-survey-questions").removeClass("hidden").addClass("in"), $(".js-survey-content").removeClass("quiz-inactive").addClass("quiz-active")
    }), $(document).on("ajaxSend", ".js-survey-question-form", function (t) {
      return $(this).find(".js-survey-spinner").fadeIn(150)
    }), $(document).on("ajaxSuccess", ".js-survey-question-form", function (t) {
      var e, n, i;
      return i = $(this).parents(".js-survey-questions").find(".js-survey-question"), e = i.filter(".active"), n = i.eq(i.index(e) + 1), e.removeClass("active").addClass("complete"), n.length ? n.addClass("active") : ($(".js-survey-questions").removeClass("in").addClass("out"), $(".js-survey-outro").removeClass("hidden").addClass("in"))
    }), $(document).on("ajaxError", ".js-survey-question-form", function (t) {
      return $(this).find(".js-survey-spinner").fadeOut(150), alert("There was an error submitting your response."), !1
    }), $(document).on("change", ".js-survey-question", function (e) {
      return t(this)
    }), $(document).on("click", ".js-other-text", function (e) {
      var n;
      return n = $(this).parents(".js-survey-choice").find(".js-survey-choice-radio")[0], n.checked = !0, t($(this).parents(".js-survey-question")[0])
    }), $(".js-other-text").on("throttled:input", function (e) {
      var n;
      return n = $(this).parents(".js-survey-question")[0], t(n)
    }), t = function (t) {
      var e, n, i, r, s;
      return s = function () {
        var e, i, r, s;
        for (r = t.querySelectorAll(".js-survey-choice-radio"), s = [], e = 0, i = r.length; i > e; e++)n = r[e], n.checked && s.push(n);
        return s
      }()[0], r = "Other" === s.getAttribute("data-choice-text"), i = t.querySelector(".js-other-text"), i && (i.disabled = !r, r && i.focus()), e = r ? i.value.length > 0 : !0, t.querySelector(".js-submit-choice").disabled = !e
    }
  })
}.call(this),function () {
  var t, e, n, i;
  t = function (t) {
    return document.querySelector(".js-gist-dropzone").classList.remove("hidden"), t.stopPropagation(), t.preventDefault()
  }, e = function (t) {
    var e;
    return(null != (e = t.target.classList) ? e.contains("js-gist-dropzone") : void 0) ? t.target.classList.add("hidden") : void 0
  }, n = function (t) {
    var e, n, r, s, o, a;
    for (a = t.dataTransfer.files, s = 0, o = a.length; o > s; s++)r = a[s], window.ga("send", "event", "Interaction", "File Drop", r.type, {useBeacon: !0}), e = function (e) {
      var n;
      return r = e.file, n = e.data, t.target.dispatchEvent(new CustomEvent("gist:filedrop", {bubbles: !0, cancelable: !0, detail: {file: r, text: n}}))
    }, n = function () {
    }, i(r).then(e, n);
    return document.querySelector(".js-gist-dropzone").classList.add("hidden"), t.stopPropagation(), t.preventDefault()
  }, $.observe(".js-gist-dropzone", {add: function () {
    return document.body.addEventListener("dragenter", t), document.body.addEventListener("dragleave", e), document.body.addEventListener("dragover", t), document.body.addEventListener("drop", n)
  }, remove: function () {
    return document.body.removeEventListener("dragenter", t), document.body.removeEventListener("dragleave", e), document.body.removeEventListener("dragover", t), document.body.removeEventListener("drop", n)
  }}), i = function (t) {
    return new Promise(function (e, n) {
      var i;
      return i = new FileReader, i.onload = function () {
        var r;
        return r = i.result, r && !/\0/.test(r) ? e({file: t, data: r}) : n(new Error("invalid file"))
      }, i.readAsText(t)
    })
  }
}.call(this),function () {
  var t, e, n, i, r, s, o;
  e = function (t) {
    var e, n, i, r, s, o, a, c, u, l, d;
    for (i = t.querySelector(".js-gist-files"), d = document.getElementById("js-gist-file-template"), e = document.createElement("div"), e.innerHTML = d.textContent, u = e.querySelectorAll("[id]"), r = 0, o = u.length; o > r; r++)n = u[r], n.removeAttribute("id");
    for (c = e.querySelector(".js-code-textarea"), null != c && c.setAttribute("id", "blob_contents_" + Date.now()), l = e.children, s = 0, a = l.length; a > s; s++)n = l[s], i.append(n);
    return i.lastElementChild
  }, o = function (t) {
    var n, i, r, s, o, a;
    for (o = t.querySelectorAll(".js-gist-file"), r = 0, s = o.length; s > r; r++)if (n = o[r], i = n.querySelector(".js-gist-filename"), a = n.querySelector(".js-blob-contents"), !i.value && !a.value)return n;
    return e(t)
  }, s = function (t) {
    var e;
    return e = t.closest(".js-code-editor"), new Promise(function (t) {
      var n;
      return(n = $(e).data("code-editor")) ? t(n) : $(e).one("codeEditor:ready", function () {
        return t($(this).data("code-editor"))
      })
    })
  }, t = function (t) {
    var e, n, i, r;
    for (i = t.querySelectorAll(".js-code-textarea"), e = 0, n = i.length; n > e; e++)if (r = i[e], r.value.trim().length > 0)return!0;
    return!1
  }, i = function () {
    var e, n, i, r, s;
    for (r = document.querySelectorAll(".js-gist-create"), s = [], n = 0, i = r.length; i > n; n++)e = r[n], s.push(e.disabled = !t(e.form));
    return s
  }, $(document).on("change", ".js-code-textarea", function () {
    return i()
  }), n = function () {
    var t, e;
    return e = this, (t = e.getAttribute("data-language-detection-url")) ? $.fetchJSON(t + "?filename=" + encodeURIComponent(e.value)).then(function (t) {
      return s(e).then(function (e) {
        return e.setMode(t.language)
      })
    }) : void 0
  }, $(document).onFocusedInput(".js-gist-filename", function (t) {
    var e, i;
    return i = this, e = i.closest(".js-code-editor"), s(e).then(function (e) {
      return null == e.ace ? !1 : $(i).on("throttled:input." + t, n)
    }), !1
  }), $(document).on("click", ".js-add-gist-file", function () {
    var t;
    return t = this.closest(".js-blob-form"), e(t).scrollIntoView(), !1
  }), $(document).on("gist:filedrop", ".js-blob-form", function (t) {
    var e, i, r, a, c;
    return a = t.originalEvent.detail, e = a.file, c = a.text, i = o(this), r = i.querySelector(".js-gist-filename"), r.value = e.name, n.call(r), s(r).then(function (t) {
      return t.setCode(c)
    }), i.scrollIntoView()
  }), $(document).on("click", ".js-remove-gist-file", function () {
    var t, e, n, i, r;
    for (t = this.closest(".js-gist-file"), r = t.querySelectorAll(".js-gist-deleted input"), e = 0, i = r.length; i > e; e++)n = r[e], n.disabled = !1;
    return t.querySelector(".js-code-editor").remove(), !1
  }), $(function () {
    return i()
  }), r = function (t) {
    var e, n, i, r, s;
    for (n = t.querySelectorAll(".js-remove-gist-file"), s = [], i = 0, r = n.length; r > i; i++)e = n[i], s.push(e.classList.toggle("hidden", n.length < 2));
    return s
  }, $.observe(".js-remove-gist-file", function () {
    var t;
    return t = this.closest(".js-gist-files"), {add: function () {
      return r(t)
    }, remove: function () {
      return r(t)
    }}
  })
}.call(this),function () {
  $(document).on("ajaxComplete", ".js-gist-file-update-container .js-comment-update", function (t, e) {
    var n;
    return 200 === e.status ? (n = JSON.parse(e.responseText), this.action = n.url) : void 0
  })
}.call(this),function () {
  var t, e;
  t = {isHttpFragment: function (t) {
    return 0 === "http://".indexOf(t) || 0 === "https://".indexOf(t)
  }, isValidHttpUrl: function (t) {
    var e, n, i;
    return i = function () {
      try {
        return new URL(t)
      } catch (e) {
      }
    }(), null == i ? !1 : (e = /^https?/.test(i.protocol), n = i.href === t || i.href === t + "/", e && n)
  }}, $.observe(".js-hook-url-field", function (e) {
    var n, i, r;
    n = $(e), i = function (t) {
      var e, n;
      return e = $(t).closest("form"), n = /^https:\/\/.+/.test(t.val()), e.toggleClass("is-ssl", n)
    }, r = function (e) {
      var n, i;
      return n = e.val(), i = t.isHttpFragment(n) || t.isValidHttpUrl(n), e.closest("form").toggleClass("is-invalid-url", !i)
    }, n.on("keyup", function () {
      return i(n)
    }), n.on("throttled:input", function () {
      return r(n)
    }), i(n), r(n)
  }), $(document).on("click", ".js-hook-toggle-ssl-verification", function (t) {
    return t.preventDefault(), $(".js-ssl-hook-fields").toggleClass("is-not-verifying-ssl"), $(".js-ssl-hook-fields").hasClass("is-not-verifying-ssl") ? ($(".js-hook-ssl-verification-field").val("1"), $(document).trigger("close.facebox")) : $(".js-hook-ssl-verification-field").val("0")
  }), e = function (t) {
    var e;
    return e = $(".js-hook-event-checkbox"), e.prop("checked", !1), null != t ? e.filter(t).prop("checked", !0) : void 0
  }, $(document).on("change", ".js-hook-event-choice", function () {
    var t;
    return t = "custom" === $(this).val(), $(".js-hook-events-field").toggleClass("is-custom", t), !0
  }), $(document).on("submit", ".js-hook-form", function () {
    var t, n;
    return t = $(this), n = t.find(".js-hook-event-choice:checked").val(), "custom" === n && $(".js-hook-wildcard-event").prop("checked", !1), "push" === n && e('[value="push"]'), "all" === n && e(".js-hook-wildcard-event"), !0
  }), $(document).on("details:toggled", ".js-hook-secret", function () {
    var t, e;
    return t = $(this), e = t.find("input[type=password]"), t.hasClass("open") ? e.removeAttr("disabled").focus() : e.attr("disabled", "disabled")
  }), $(document).on("details:toggle", ".js-hook-delivery-item", function () {
    var t, e;
    return t = $(this), e = this.querySelector(".js-hook-delivery-details"), t.data("details-load-initiated") ? void 0 : $.sudo().then(function () {
      var n, i;
      return t.data("details-load-initiated", !0), e.classList.add("is-loading"), n = function (t) {
        return $(e).replaceWith(t), e.classList.remove("is-loading")
      }, i = function () {
        return e.classList.add("has-error"), e.classList.remove("is-loading")
      }, $.fetchText(e.getAttribute("data-url")).then(n, i)
    })
  }), $(document).on("click", ".js-hook-delivery-details .js-tabnav-tab", function () {
    var t, e, n;
    return e = $(this), t = e.closest(".js-hook-delivery-details"), t.find(".js-tabnav-tab").removeClass("selected"), n = t.find(".js-tabnav-tabcontent").removeClass("selected"), e.addClass("selected"), n.filter(function () {
      return this.getAttribute("data-tab-name") === e.attr("data-tab-target")
    }).addClass("selected")
  }), $(document).on("click", ".js-hook-deliveries-pagination-button", function (t) {
    var e, n;
    return t.preventDefault(), n = this, e = $(this).parent(), $.sudo().then(function () {
      return e.addClass("loading"), $.fetchText(n.getAttribute("href")).then(function (t) {
        return e.replaceWith(t)
      })
    })
  }), $(document).on("click", ".js-redeliver-hook-delivery-init-button", function (t) {
    var e;
    return t.preventDefault(), e = this.getAttribute("href"), $.sudo().then(function () {
      return $.facebox({div: e})
    })
  }), $(document).on("ajaxSuccess", ".js-redeliver-hook-form", function (t, e) {
    var n, i, r, s;
    return s = this.getAttribute("data-delivery-guid"), n = $(".js-hook-delivery-details").filter(function () {
      return this.getAttribute("data-delivery-guid") === s
    }), r = n.closest(".js-hook-delivery-item"), $(document).trigger("close.facebox"), i = $(e.responseText), n.replaceWith(i), i.on("load", function () {
      return n = r.find(".js-hook-delivery-details"), r.find(".js-item-status").removeClass("success pending failure").addClass(n.attr("data-status-class")), r.find(".js-item-status-tooltip").attr("aria-label", n.attr("data-status-message"))
    })
  }), $(document).on("ajaxError", ".js-redeliver-hook-form", function () {
    return $(this).siblings(".js-redelivery-dialog").addClass("failed")
  }), $(document).on("submit", ".js-test-hook-form", function (t) {
    var e;
    return t.preventDefault(), e = this, $.sudo().then(function () {
      var t, n, i, r;
      return r = document.querySelector(".js-test-hook-message"), r.classList.remove("error", "success"), t = function () {
        return e.dispatchEvent(new CustomEvent("ajaxComplete", {bubbles: !0}))
      }, n = function () {
        return r.classList.add("success")
      }, i = function (t) {
        var e;
        return r.classList.add("error"), e = r.querySelector(".js-test-hook-message-errors"), null != t.response ? t.response.json().then(function (t) {
          return e.textContent = t.errors
        }) : e.textContent = "Network request failed"
      }, $.fetch(e.action, {method: e.method, body: $(e).serialize(), headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}}).then(n, i).then(t, t)
    })
  })
}.call(this),function () {
  $(document).on("navigation:open", ".js-issues-custom-filter", function () {
    var t, e, n, i;
    return e = $(this), i = e.find(".js-new-item-name").text(), n = e.attr("data-name"), t = $("<input>", {type: "hidden", name: n, value: i}), e.append(t), e.submit()
  })
}.call(this),function () {
  var t, e, n;
  e = function (e, n) {
    return e.closest(".js-label-editor").find(".js-color-editor-bg").css("background-color", n), e.css("color", t(n, -.5)), e.css("border-color", n)
  }, n = function (t) {
    var e, n;
    return e = "#c00", n = $(t).closest(".js-color-editor"), n.find(".js-color-editor-bg").css("background-color", e), t.css("color", "#c00"), t.css("border-color", e)
  }, t = function (t, e) {
    var n, i, r;
    for (t = String(t).toLowerCase().replace(/[^0-9a-f]/g, ""), t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), e = e || 0, r = "#", n = void 0, i = 0; 3 > i;)n = parseInt(t.substr(2 * i, 2), 16), n = Math.round(Math.min(Math.max(0, n + n * e), 255)).toString(16), r += ("00" + n).substr(n.length), i++;
    return r
  }, $(document).on("focusin", ".js-color-editor-input", function () {
    var t, i;
    return i = $(this), t = $(this).closest(".js-label-editor"), i.on("throttled:input.colorEditor", function (r) {
      var s;
      return"#" !== i.val().charAt(0) && i.val("#" + i.val()), t.removeClass("is-valid is-not-valid"), s = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(i.val()), s ? (t.addClass("is-valid"), e(i, i.val())) : (t.addClass("is-not-valid"), n(i))
    }), i.on("blur.colorEditor", function () {
      return i.off(".colorEditor")
    })
  }), $(document).on("mousedown", ".js-color-chooser-color", function (t) {
    var n, i, r;
    return $(this).closest(".js-color-editor").removeClass("open"), n = $(this).closest(".js-label-editor"), i = "#" + $(this).attr("data-hex-color"), r = n.find(".js-color-editor-input"), n.removeClass("is-valid is-not-valid"), r.val(i), e(r, i)
  }), $(document).on("submit", ".js-label-editor form", function () {
    var t, e;
    return t = $(this).find(".js-color-editor-input"), e = t.val(), e.length < 6 && (e = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]), t.val(e.replace("#", ""))
  }), $(document).on("focusin", ".js-label-editor", function () {
    return $(this).closest(".js-label-editor").addClass("open")
  }), $(document).on("reset", ".js-create-label", function () {
    var t, n, i;
    return t = $(this).find(".color-chooser span").removeAttr("data-selected"),
      i = t.eq(Math.floor(Math.random() * t.length)), n = "#" + i.attr("data-selected", "").attr("data-hex-color"), setImmediate(function (t) {
      return function () {
        var i;
        return i = $(t).find(".js-color-editor-input"), i.attr("data-original-color", n).attr("value", n), e(i, i.val())
      }
    }(this))
  })
}.call(this),function () {
  var t;
  t = function (t, e) {
    return t.closest("div.js-details-container").classList.toggle("is-empty", e)
  }, $(document).on("click", ".js-edit-label", function () {
    return $(this).closest(".labels-list-item").addClass("edit")
  }), $(document).on("click", ".js-edit-label-cancel", function () {
    return this.form.reset(), $(this).closest(".labels-list-item").removeClass("edit")
  }), $(document).on("ajaxSuccess", ".js-create-label", function (e, n, i, r) {
    var s, o, a;
    return this.reset(), $(this).nextAll(".table-list").prepend(r), s = $(".js-labels-count"), a = $.parseInt(s.text()), o = a + 1, s.text($.numberWithDelimiter(o)), $(".js-labels-label").inflect(o), t(this, !1)
  }), $(document).on("ajaxSuccess", ".js-update-label", function (t, e, n, i) {
    return $(this).closest(".labels-list-item").replaceWith(i)
  }), $(document).on("ajaxSend", ".js-update-label, .js-create-label", function () {
    return $(this).find(".error").text("")
  }), $(document).on("ajaxError", ".js-update-label, .js-create-label", function (t, e) {
    return $(this).find(".error").text(e.responseText), !1
  }), $(document).on("ajaxSuccess", ".js-delete-label", function () {
    var e, n, i;
    return e = $(".js-labels-count"), i = $.parseInt(e.text()), n = i - 1, e.text($.numberWithDelimiter(n)), $(".js-labels-label").inflect(n), t(this, 0 === n), $(this).closest(".labels-list-item").fadeOut()
  })
}.call(this),function () {
  $.hashChange(function (t) {
    var e, n, i, r;
    return r = t.newURL, (i = r.match(/\/issues#issue\/(\d+)$/)) ? (e = i[0], n = i[1], window.location = r.replace(/\/?#issue\/.+/, "/" + n)) : void 0
  }), $.hashChange(function (t) {
    var e, n, i, r, s;
    return s = t.newURL, (r = s.match(/\/issues#issue\/(\d+)\/comment\/(\d+)$/)) ? (e = r[0], i = r[1], n = r[2], window.location = s.replace(/\/?#issue\/.+/, "/" + i + "#issuecomment-" + n)) : void 0
  })
}.call(this),function () {
  var t;
  $.observe(".js-issues-list-check:checked", {add: function () {
    return $(this).closest(".js-issue-row").addClass("selected")
  }, remove: function () {
    return $(this).closest(".js-issue-row").removeClass("selected")
  }}), $(document).on("navigation:keydown", ".js-issue-row", function (e) {
    return"x" === e.hotkey ? (t(this), !1) : void 0
  }), $("#js-issues-search").focus(function (t) {
    return this.value = this.value
  }), t = function (t) {
    var e;
    (e = $(t).find(".js-issues-list-check")[0]) && (e.checked = !e.checked, $(e).trigger("change"))
  }
}.call(this),function () {
  var t, e, n, i;
  $(document).on("selectmenu:selected", ".js-issue-sidebar-form", function (t) {
    var n, i, r, s, o;
    return i = t.target, i.hasAttribute("data-assignee-value") && (r = i.closest(".js-menu-content"), n = r.querySelector(".js-assignee-field"), n.value = i.getAttribute("data-assignee-value"), n.disabled = !1), o = function (t) {
      return function () {
        return t.matches("form") ? $(t).submit() : e(t)
      }
    }(this), s = i.closest(".js-select-menu").hasAttribute("data-multiple"), s ? ($(this).off(".deferredSubmit"), $(this).one("menu:deactivate.deferredSubmit", o)) : o()
  }), i = function (t, e) {
    var n;
    t.replaceWith.apply(t, $.parseHTML(e)), n = document.querySelector(".js-discussion-sidebar-item .js-assignee-field"), n && n.value && (n.disabled = !1)
  }, $(document).on("ajaxSuccess", ".js-discussion-sidebar-item", function (t, e, n, r) {
    var s;
    s = t.target.classList, s.contains("js-issue-sidebar-form") && i(this, r)
  }), $(document).on("click", "div.js-issue-sidebar-form .js-issue-assign-self", function (t) {
    var n;
    n = this.closest(".js-issue-sidebar-form"), e(n, {name: this.name, value: this.value}), t.preventDefault()
  }), e = function (t, e) {
    var r;
    r = n(t), e && r.push(e), r.push({name: "authenticity_token", value: t.closest("form").elements.authenticity_token.value}), $.fetchText(t.getAttribute("data-url"), {method: "post", body: $.param(r), headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}}).then(function (e) {
      return i(t.closest(".js-discussion-sidebar-item"), e)
    })
  }, n = function (e) {
    var n, i, r, s, o, a;
    for (n = e.closest("form"), o = $(n).serializeArray(), a = [], i = 0, r = o.length; r > i; i++)s = o[i], $.contains(e, t(n, s)) && a.push(s);
    return a
  }, t = function (t, e) {
    var n, i, r, s;
    for (s = t.elements, i = 0, r = s.length; r > i; i++)if (n = s[i], n.name === e.name && n.value === e.value)return n
  }
}.call(this),function () {
  $(document).on("change", ".js-issues-list-check", function () {
    $("#js-issues-toolbar").toggleClass("triage-mode", $(".js-issues-list-check:checked").length > 0)
  }), $(document).on("change", ".js-issues-list-check", function () {
    var t;
    t = $(".js-issues-list-check:checked"), $("#js-issues-toolbar .js-issues-toolbar-triage .js-select-menu").data("contents-data", t).addClass("js-load-contents")
  }), $(document).on("selectmenu:selected", ".js-issues-toolbar-triage .js-navigation-item", function () {
    var t, e, n, i, r, s;
    n = $(this).closest(".js-menu-container").hasClass("js-label-select-menu"), t = $(this).closest("form"), r = $(this).hasClass("selected"), i = $(this).attr("data-name"), s = $(this).attr("data-value"), e = n ? $("<input>", {type: "hidden", name: i + "[" + s + "]", value: r ? "1" : "0"}) : $("<input>", {type: "hidden", name: i, value: r ? s : ""}), setImmediate(function (t) {
      return function () {
        return $(t).menu("deactivate")
      }
    }(this)), t.find(".js-issues-triage-fields").append(e), t.addClass("will-submit")
  }), $(document).on("menu:deactivate", ".js-issues-toolbar-triage .js-menu-container", function (t) {
    var e, n;
    (e = this.querySelector("form.will-submit")) && (this.classList.add("is-loading"), n = $.fetchJSON(e.getAttribute("action"), {method: e.getAttribute("method"), body: $.param($(e).serializeArray()), headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}}), n.then(function (t) {
      return function (e) {
        var n, i, r;
        return r = $.fetchPoll(e.job.url, {headers: {accept: "application/json"}}), n = function () {
          return $(t).menu("deactivate"), location.reload()
        }, i = function () {
          return t.classList.add("has-error")
        }, r.then(n, i)
      }
    }(this)), e.classList.remove("will-submit"), t.preventDefault())
  })
}.call(this),function () {
  var t;
  t = function () {
    var t;
    return t = "/site/keyboard_shortcuts?url=" + window.location.pathname, $.facebox(function () {
      return $.fetchText(t).then(function (t) {
        return $.facebox(t, "shortcuts")
      })
    })
  }, $(document).on("click", ".js-keyboard-shortcuts", function () {
    return t(), !1
  }), $(document).on("click", ".js-see-all-keyboard-shortcuts", function () {
    return this.remove(), $(".facebox .js-hidden-pane").css("display", "table-row-group"), !1
  }), $(document).on("keypress", function (e) {
    return e.target === document.body && 63 === e.which ? ($(".facebox").is($.visible) ? $.facebox.close() : t(), !1) : void 0
  })
}.call(this),function () {
  var t;
  t = function (t) {
    var e;
    return e = $(".js-hosted-account-linker-hosted"), e.toggleClass("hidden", "tenant" !== t.value)
  }, $(document).on("change", ".js-hosted-account-linker", function () {
    return t(this)
  }), $(function () {
    var e;
    return(e = $(".js-hosted-account-linker:checked")[0]) ? t(e) : void 0
  })
}.call(this),DateInput = function (t) {
  function e(n, i) {
    "object" != typeof i && (i = {}), t.extend(this, e.DEFAULT_OPTS, i), this.input = t(n), this.bindMethodsToObj("show", "hide", "hideIfClickOutside", "keydownHandler", "selectDate"), this.build(), this.selectDate(), this.show(), this.input.hide(), this.input.data("datePicker", this)
  }

  return e.DEFAULT_OPTS = {month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], short_month_names: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], short_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], start_of_week: 1}, e.prototype = {build: function () {
    var e = t('<p class="month_nav"><span class="date-button prev" title="[Page-Up]">\u25c0</span> <span class="month-name"></span> <span class="date-button next" title="[Page-Down]">\u25b6</span></p>');
    this.monthNameSpan = t(".month-name", e), t(".prev", e).click(this.bindToObj(function () {
      this.moveMonthBy(-1)
    })), t(".next", e).click(this.bindToObj(function () {
      this.moveMonthBy(1)
    }));
    var n = t('<p class="year_nav"><span class="date-button prev" title="[Ctrl+Page-Up]">\u25c0</span> <span class="year-name"></span> <span class="date-button next" title="[Ctrl+Page-Down]">\u25b6</span></p>');
    this.yearNameSpan = t(".year-name", n), t(".prev", n).click(this.bindToObj(function () {
      this.moveMonthBy(-12)
    })), t(".next", n).click(this.bindToObj(function () {
      this.moveMonthBy(12)
    }));
    var i = t("<div></div>").append(e, n), r = "<table><thead><tr>";
    t(this.adjustDays(this.short_day_names)).each(function () {
      r += "<th>" + this + "</th>"
    }), r += "</tr></thead><tbody></tbody></table>", this.dateSelector = this.rootLayers = t('<div class="date_selector"></div>').append(i, r).insertAfter(this.input), this.tbody = t("tbody", this.dateSelector), this.input.change(this.bindToObj(function () {
      this.selectDate()
    })), this.selectDate()
  }, selectMonth: function (e) {
    var n = new Date(e.getFullYear(), e.getMonth(), 1);
    if (!this.currentMonth || this.currentMonth.getFullYear() != n.getFullYear() || this.currentMonth.getMonth() != n.getMonth()) {
      this.currentMonth = n;
      for (var i = this.rangeStart(e), r = this.rangeEnd(e), s = this.daysBetween(i, r), o = "", a = 0; s >= a; a++) {
        var c = new Date(i.getFullYear(), i.getMonth(), i.getDate() + a, 12, 0);
        this.isFirstDayOfWeek(c) && (o += "<tr>"), o += c.getMonth() == e.getMonth() ? '<td class="selectable_day" date="' + this.dateToString(c) + '">' + c.getDate() + "</td>" : '<td class="unselected_month" date="' + this.dateToString(c) + '">' + c.getDate() + "</td>", this.isLastDayOfWeek(c) && (o += "</tr>")
      }
      this.tbody.empty().append(o), this.monthNameSpan.empty().append(this.monthName(e)), this.yearNameSpan.empty().append(this.currentMonth.getFullYear()), t(".selectable_day", this.tbody).mousedown(this.bindToObj(function (e) {
        this.changeInput(t(e.target).attr("date"))
      })), t("td[date='" + this.dateToString(new Date) + "']", this.tbody).addClass("today"), t("td.selectable_day", this.tbody).mouseover(function () {
        t(this).addClass("hover")
      }), t("td.selectable_day", this.tbody).mouseout(function () {
        t(this).removeClass("hover")
      })
    }
    t(".selected", this.tbody).removeClass("selected"), t('td[date="' + this.selectedDateString + '"]', this.tbody).addClass("selected")
  }, selectDate: function (t) {
    "undefined" == typeof t && (t = this.stringToDate(this.input.val())), t || (t = new Date), this.selectedDate = t, this.selectedDateString = this.dateToString(this.selectedDate), this.selectMonth(this.selectedDate)
  }, resetDate: function () {
    t(".selected", this.tbody).removeClass("selected"), this.changeInput("")
  }, changeInput: function (t) {
    this.input.val(t).change(), this.hide()
  }, show: function () {
    this.rootLayers.css("display", "block"), t([window, document.body]).click(this.hideIfClickOutside), this.input.unbind("focus", this.show), this.rootLayers.keydown(this.keydownHandler), this.setPosition()
  }, hide: function () {
  }, hideIfClickOutside: function (t) {
    t.target == this.input[0] || this.insideSelector(t) || this.hide()
  }, insideSelector: function (e) {
    return $target = t(e.target), $target.parents(".date_selector").length || $target.is(".date_selector")
  }, keydownHandler: function (t) {
    switch (t.keyCode) {
      case 9:
      case 27:
        return void this.hide();
      case 13:
        this.changeInput(this.selectedDateString);
        break;
      case 33:
        this.moveDateMonthBy(t.ctrlKey ? -12 : -1);
        break;
      case 34:
        this.moveDateMonthBy(t.ctrlKey ? 12 : 1);
        break;
      case 38:
        this.moveDateBy(-7);
        break;
      case 40:
        this.moveDateBy(7);
        break;
      case 37:
        this.moveDateBy(-1);
        break;
      case 39:
        this.moveDateBy(1);
        break;
      default:
        return
    }
    t.preventDefault()
  }, stringToDate: function (t) {
    var e;
    return(e = t.match(/^(\d{1,2}) ([^\s]+) (\d{4,4})$/)) ? new Date(e[3], this.shortMonthNum(e[2]), e[1], 12, 0) : null
  }, dateToString: function (t) {
    return t.getDate() + " " + this.short_month_names[t.getMonth()] + " " + t.getFullYear()
  }, setPosition: function () {
    var t = this.input.offset();
    this.rootLayers.css({top: t.top + this.input.outerHeight(), left: t.left}), this.ieframe && this.ieframe.css({width: this.dateSelector.outerWidth(), height: this.dateSelector.outerHeight()})
  }, moveDateBy: function (t) {
    var e = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() + t);
    this.selectDate(e)
  }, moveDateMonthBy: function (t) {
    var e = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + t, this.selectedDate.getDate());
    e.getMonth() == this.selectedDate.getMonth() + t + 1 && e.setDate(0), this.selectDate(e)
  }, moveMonthBy: function (t) {
    var e = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + t, this.currentMonth.getDate());
    this.selectMonth(e)
  }, monthName: function (t) {
    return this.month_names[t.getMonth()]
  }, bindToObj: function (t) {
    var e = this;
    return function () {
      return t.apply(e, arguments)
    }
  }, bindMethodsToObj: function () {
    for (var t = 0; t < arguments.length; t++)this[arguments[t]] = this.bindToObj(this[arguments[t]])
  }, indexFor: function (t, e) {
    for (var n = 0; n < t.length; n++)if (e == t[n])return n
  }, monthNum: function (t) {
    return this.indexFor(this.month_names, t)
  }, shortMonthNum: function (t) {
    return this.indexFor(this.short_month_names, t)
  }, shortDayNum: function (t) {
    return this.indexFor(this.short_day_names, t)
  }, daysBetween: function (t, e) {
    return t = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), e = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), (e - t) / 864e5
  }, changeDayTo: function (t, e, n) {
    var i = n * (Math.abs(e.getDay() - t - 7 * n) % 7);
    return new Date(e.getFullYear(), e.getMonth(), e.getDate() + i)
  }, rangeStart: function (t) {
    return this.changeDayTo(this.start_of_week, new Date(t.getFullYear(), t.getMonth()), -1)
  }, rangeEnd: function (t) {
    return this.changeDayTo((this.start_of_week - 1) % 7, new Date(t.getFullYear(), t.getMonth() + 1, 0), 1)
  }, isFirstDayOfWeek: function (t) {
    return t.getDay() == this.start_of_week
  }, isLastDayOfWeek: function (t) {
    return t.getDay() == (this.start_of_week - 1) % 7
  }, adjustDays: function (t) {
    for (var e = [], n = 0; n < t.length; n++)e[n] = t[(n + this.start_of_week) % 7];
    return e
  }}, e
}(jQuery),function () {
  $.observe("input.js-date-input", function () {
    $(this).next(".date_selector").remove(), new DateInput(this)
  }), $(document).on("click", ".js-date-input-clear", function () {
    return $("input.js-date-input").data("datePicker").resetDate(), !1
  }), $(document).on("change click", ".js-milestone-edit-form", function () {
    var t;
    t = this.querySelector(".js-milestone-edit-cancel"), $(this).hasDirtyFields() ? t.setAttribute("data-confirm", t.getAttribute("data-confirm-changes")) : t.removeAttribute("data-confirm")
  })
}.call(this),function () {
  var t, e;
  t = function (t) {
    return t.classList.contains("read") ? void 0 : (t.classList.toggle("unread"), t.classList.toggle("read"))
  }, e = function (t) {
    return t.classList.contains("unread") ? void 0 : (t.classList.toggle("unread"), t.classList.toggle("read"))
  }, $(document).on("click", ".js-notification-target", function (e) {
    return e.which > 1 ? void 0 : t(this.closest(".js-notification"))
  }), $(document).on("ajaxSuccess", ".js-delete-notification", function () {
    return t(this.closest(".js-notification"))
  }), $(document).on("ajaxSuccess", ".js-mute-notification", function () {
    var e;
    return t(this.closest(".js-notification")), e = this.closest(".js-notification"), e.classList.contains("muted") ? this.action = this.action.replace("unmute", "mute") : this.action = this.action.replace("mute", "unmute"), e.classList.toggle("muted")
  }), $(document).on("ajaxSuccess", ".js-unmute-notification", function () {
    var t;
    return t = this.closest(".js-notification"), t.classList.contains("muted") ? this.action = this.action.replace("unmute", "mute") : this.action = this.action.replace("mute", "unmute"), t.classList.toggle("muted")
  }), $(document).on("ajaxSuccess", ".js-mark-visible-as-read", function () {
    var t, e, n, i, r, s, o;
    for (t = this.closest(".js-notifications-browser"), r = t.querySelectorAll(".unread"), n = 0, i = r.length; i > n; n++)e = r[n], e.classList.remove("unread"), e.classList.add("read");
    return null != (s = t.querySelector(".js-mark-visible-as-read")) && s.classList.add("mark-all-as-read-confirmed"), null != (o = t.querySelector(".js-mark-as-read-confirmation")) ? o.classList.add("mark-all-as-read-confirmed") : void 0
  }), $(document).on("ajaxSuccess", ".js-mark-remaining-as-read", function () {
    var t, e, n;
    return t = this.closest(".js-notifications-browser"), null != (e = t.querySelector(".js-mark-remaining-as-read")) && e.classList.add("hidden"), null != (n = t.querySelector(".js-mark-remaining-as-read-confirmation")) ? n.classList.remove("hidden") : void 0
  }), $(document).on("navigation:keydown", ".js-notification", function (t) {
    switch (t.hotkey) {
      case"I":
      case"e":
      case"y":
        return $(this).find(".js-delete-notification").submit(), !1;
      case"M":
      case"m":
        return $(this).find(".js-mute-notification").submit(), !1
    }
  }), $(document).on("navigation:keyopen", ".js-notification", function (e) {
    return t(this)
  }), $(document).on("ajaxBeforeSend", ".js-notifications-subscription", function () {
    return this.querySelector(".js-spinner").classList.remove("hidden")
  }), $(document).on("ajaxComplete", ".js-notifications-subscription", function () {
    return this.querySelector(".js-spinner").classList.add("hidden")
  })
}.call(this),function () {
  $(document).on("ajaxSend", ".js-toggler-container .js-set-approval-state", function () {
    return this.closest(".js-toggler-container").classList.add("loading")
  }), $(document).on("ajaxComplete", ".js-toggler-container .js-set-approval-state", function () {
    return this.closest(".js-toggler-container").classList.remove("loading")
  }), $(document).on("ajaxSuccess", ".js-toggler-container .js-set-approval-state", function () {
    return this.closest(".js-toggler-container").classList.add("on")
  }), $(document).on("ajaxSuccess", ".js-request-approval-facebox-form", function () {
    var t;
    return t = this.getAttribute("data-container-id"), document.getElementById(t).classList.add("on"), $(document).trigger("close.facebox")
  })
}.call(this),function () {
  $(document).on("submit", ".org form[data-results-container]", function () {
    return!1
  })
}.call(this),function () {
  var t, e;
  t = function () {
    return $(".js-invitation-toggle-team:checked").visible()
  }, e = function () {
    var e, n, i;
    e = $(".js-invitation-form"), i = "legacy-contributor" === e.attr("data-role"), n = !i || t().length > 0, $(".js-invitation-create").toggleClass("disabled", !n)
  }, $(document).on("click", ".js-invitations-team-suggestions-view-all", function () {
    return $.fetchText(this.href).then(function (e) {
      return function (n) {
        var i, r;
        return r = t().map(function () {
          return this.value
        }), i = $(e).closest("ul"), i.html(n), r.each(function () {
          return i.find(".js-invitation-toggle-team[value=" + this + "]").prop("checked", !0)
        })
      }
    }(this)), !1
  }), $(document).on("change", ".js-invitation-toggle-team", e), $.observe(".js-invitation-create", e)
}.call(this),function () {
  var t, e, n, i, r;
  t = [], e = function () {
    var t, e, n;
    return t = $(".js-person-grid"), e = t.find(".js-org-person").has(".js-org-person-toggle:checked"), function () {
      var t, i, r;
      for (r = [], t = 0, i = e.length; i > t; t++)n = e[t], r.push($(n).attr("data-id"));
      return r
    }().sort()
  }, r = function (t, e) {
    var n, i, r, s;
    return null == e && (e = "+"), n = $("." + t), i = n.siblings(".js-stat-label"), s = $.parseInt(n.text()), r = function () {
      switch (e) {
        case"+":
          return s + 1;
        case"-":
          return s - 1;
        default:
          return s
      }
    }(), n.text(r), i.inflect(r)
  }, i = null, $(document).on("change", ".js-org-person-toggle", function (n) {
    var r, s, o, a;
    return r = $(".js-org-toolbar"), s = r.find(".js-member-selected-actions"), o = e(), a = o.length > 0, JSON.stringify(o) !== JSON.stringify(t) ? (t = o, r.find(".js-org-toolbar-select-all-label").toggleClass("has-selected-members", a), $(".js-member-not-selected-actions").toggleClass("hidden", a), s.toggleClass("hidden", !a), r.addClass("disabled"), null != i && i.abort(), i = $.ajax({url: s.attr("data-toolbar-actions-url"), data: {member_ids: o}}), i.done(function (t, e, n) {
      return s.html(t)
    }), i.always(function () {
      return r.removeClass("disabled")
    })) : void 0
  }), $(document).on("click", ".js-member-remove-confirm-button", function (t) {
    return t.preventDefault(), $.facebox(function () {
      var n;
      return n = $.ajax({url: $(t.target).attr("data-url"), data: {member_ids: e()}}), n.done(function (t) {
        return $.facebox(t)
      })
    })
  }), $(document).on("click", ".js-member-search-filter", function () {
    var t, e;
    return e = $(this).attr("data-filter"), t = $(".js-member-filter-field"), t.val(e + " "), t.focus(), t.trigger("throttled:input"), !1
  }), $(document).on("ajaxSend ajaxComplete", ".js-add-team-member-or-repo-form", function (t) {
    return this === t.target ? this.classList.toggle("is-sending", "ajaxSend" === t.type) : void 0
  }), n = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", $(document).onFocusedKeydown(".js-add-team-member-or-repo-form .js-autocomplete-field", function () {
    return function (t) {
      return"enter" === t.hotkey || t.hotkey === n + "+enter" ? t.preventDefault() : void 0
    }
  }), $(document).on("autocomplete:result", ".js-bulk-add-team-form .js-autocomplete-field", function (t) {
    var e, n;
    return n = $(this).data("autocompleted"), n.indexOf("/") > 0 ? (e = this.form.action, $.sudo().then(function () {
      return $.facebox(function () {
        var t;
        return t = $.ajax({url: e, method: "post", data: {member: n}}), t.done(function (t) {
          return $.facebox(t)
        })
      })
    }), t.stopPropagation()) : void 0
  }), $(document).on("autocomplete:result", ".js-add-team-member-or-repo-form", function () {
    return setImmediate(function (t) {
      return function () {
        return $(t).submit()
      }
    }(this))
  }), $(document).on("ajaxSuccess", ".js-add-team-member-or-repo-form", function (t, e) {
    var n, i, s, o, a, c, u, l, d;
    try {
      l = JSON.parse(e.responseText), n = $(l.list_item_html), r(l.stat_count_class, "+")
    } catch (h) {
      n = $(e.responseText)
    }
    if (i = $(".js-member-list"), this.querySelector(".js-autocomplete-field").value = "", d = n.attr("data-login"))for (u = i.children(), s = 0, a = u.length; a > s; s++)if (o = u[s], o.getAttribute("data-login") === d)return;
    return i.prepend(n), c = !i.children().length, i.closest(".js-org-section").toggleClass("is-empty", c), i.siblings(".js-subnav").addClass("subnav-bordered")
  }), $(document).on("ajaxSuccess", ".js-remove-team-repository", function (t, e, n, i) {
    var s, o, a, c;
    return o = $(this), s = o.closest(".js-org-section"), a = s.find(".js-org-list"), o.closest(".js-org-repo").remove(), c = !a.children().length, s.toggleClass("is-empty", c), c && (a.removeClass("table-list-bordered"), a.siblings(".js-subnav").removeClass("subnav-bordered")), r("js-repositories-count", "-")
  }), $(document).on("ajaxError", ".js-add-team-member-or-repo-form, .js-remove-team-repository", function (t, e) {
    var n, i, r;
    if (!/<html/.test(e.responseText)) {
      i = $(".js-member-list").siblings(".js-blankslate");
      try {
        r = JSON.parse(e.responseText), n = r.message_html
      } catch (s) {
        n = $(e.responseText)
      }
      return $(".flash-messages").remove(), i.before(n), !1
    }
  })
}.call(this),function () {
  $(document).on("click", ".js-remove-person-from-org-button", function (t) {
    var e;
    return t.preventDefault(), e = $(t.target), $.facebox(function () {
      var t;
      return t = $.ajax({url: e.attr("data-url"), data: {member_ids: [e.attr("data-user-id")], redirect_to_path: e.attr("data-redirect-to-path")}}), t.done(function (t) {
        return $.facebox(t)
      })
    })
  })
}.call(this),function () {
  var t, e, n, i, r;
  $(document).on("change", ".js-migrate-legacy-contributors-default-repository-permission-radio", function () {
    var t;
    return t = document.querySelector(".js-migrate-ability-list-item-default-repository-permission"), t.classList.toggle("migrate-ability-not-possible", e()), r()
  }), $(document).on("change", ".js-migrate-legacy-contributors-repository-creation-radio", function () {
    var t;
    return t = document.querySelector(".js-migrate-ability-list-item-members-can-create-repositories"), t.classList.toggle("migrate-ability-not-possible", n()), r()
  }), $(document).on("change", ".js-migrate-legacy-contributors-team-privacy-radio", function () {
    var t;
    return t = document.querySelector(".js-migrate-ability-list-item-team-privacy"), t.classList.toggle("migrate-ability-not-possible", i()), r()
  }), r = function () {
    var e;
    return e = document.querySelector(".js-save-member-privileges-button-container"), e.classList.toggle("member-privilege-radios-preserved", t())
  }, e = function () {
    return"" === document.querySelector(".js-migrate-legacy-contributors-default-repository-permission-radio:checked").value
  }, n = function () {
    return"0" === document.querySelector(".js-migrate-legacy-contributors-repository-creation-radio:checked").value
  }, i = function () {
    return"secret" === document.querySelector(".js-migrate-legacy-contributors-team-privacy-radio:checked").value
  }, t = function () {
    return e() && n() && i()
  }, $(function () {
    var t, e, n, i, s, o, a, c, u;
    return o = document.querySelector(".js-org-migration-settings-sidebar"), null != o ? (a = o.getBoundingClientRect(), c = 16, u = a.top + window.pageYOffset - c, e = o.style.position, n = o.style.top, t = o.style.left, i = o.style.width, s = $.debounce(function () {
      var r, s;
      return r = o.parentNode.getBoundingClientRect(), s = r.right - a.width, window.pageYOffset >= u ? (o.style.position = "fixed", o.style.top = c + "px", o.style.left = s + "px", o.style.width = "250px") : (o.style.position = e, o.style.top = n, o.style.left = t, o.style.width = i)
    }, 5), window.addEventListener("scroll", s), window.addEventListener("resize", s), r()) : void 0
  })
}.call(this),function () {
  var t;
  $.observe(".js-rename-owners-team-input", function () {
    $(this).on("throttled:input", function () {
      var e, n, i;
      return e = this.closest("form"), n = this.value.trim().toLowerCase(), "owners" === n || "" === n ? t(!1, "") : (e.classList.add("is-sending"), i = $.get(this.getAttribute("data-check-url"), {name: n}), i.done(function (n, i) {
        var r;
        return n = n.trim(), r = "" === n, e.classList.remove("is-sending"), t(r, n)
      }))
    })
  }), t = function (t, e) {
    return document.querySelector(".js-rename-owners-team-button").classList.toggle("disabled", !t), document.querySelector(".js-rename-owners-team-errors").innerHTML = e, document.querySelector(".js-rename-owners-team-note").classList.toggle("hidden", "" !== e)
  }
}.call(this),function () {
  $(document).onFocusedInput(".js-new-organization-name", function () {
    var t;
    return(t = this.closest("dd").querySelector(".js-field-hint-name")) ? function () {
      return"innerText"in t ? t.innerText = this.value : t.textContent = this.value
    } : void 0
  }), $(document).on("ajaxSend", ".js-org-list-item .js-org-remove-item", function () {
    return $(this).closest(".js-org-list-item").hide()
  }), $(document).on("ajaxSuccess", ".js-org-list-item .js-org-remove-item", function () {
    return $(this).closest(".js-list-org-item").remove()
  }), $(document).on("ajaxError", ".js-org-list-item .js-org-remove-item", function () {
    return $(this).closest(".js-list-org-item").show(), alert(getAttribute("data-error-message"))
  })
}.call(this),function () {
  $(document).on("click", ".js-repo-search-filter", function () {
    var t, e, n, i, r;
    return e = $(this).attr("data-filter"), n = $(this).attr("data-negate"), t = $(".js-repo-filter-field"), i = t.val(), i.indexOf(n) > -1 && (i = i.replace(n, ""), i = i.replace(/^\s*/, "")), -1 === i.indexOf(e) && (r = i && i.match(/\s$/) ? "" : " ", t.val(i + ("" + r + e + " ")), t.focus(), t.trigger("throttled:input")), $("body").removeClass("menu-active"), !1
  }), $.observe(".js-repository-fallback-search", function () {
    $(this).on("keypress", function (t) {
      var e, n, i, r;
      if (13 === t.which)return e = $(this), n = e.attr("data-host"), i = e.attr("data-org"), r = e.val(), document.location = "http://" + n + "/search?q=user%3A" + i + "+" + r + "&type=Repositories"
    })
  }), $(document).on("click", ".js-team-repo-higher-access", function (t) {
    return t.preventDefault(), $.facebox(function () {
      var e;
      return e = $.ajax({url: $(t.target).attr("data-url")}), e.done(function (t) {
        return $.facebox(t)
      })
    })
  })
}.call(this),function () {
  $(document).on("selectmenu:selected", ".js-select-repo-permission", function () {
    return $(this).submit()
  }), $(document).on("ajaxSend", ".js-select-repo-permission", function () {
    return this.classList.remove("was-successful")
  }), $(document).on("ajaxSuccess", ".js-select-repo-permission", function (t, e, n, i) {
    var r;
    return this.classList.add("was-successful"), null != (r = this.closest(".js-org-repo")) ? r.classList.toggle("with-higher-access", i.members_with_higher_access) : void 0
  })
}.call(this),function () {
  $(document).on("ajaxSend", ".js-ldap-import-groups-container", function (t, e, n) {
    return e.setRequestHeader("X-Context", "import")
  }), $(document).on("autocomplete:autocompleted:changed", ".js-team-ldap-group-field", function (t) {
    var e;
    return e = $(this).closest(".js-ldap-group-adder").removeClass("is-exists"), e.find(".js-ldap-group-adder-button").toggleClass("disabled", !$(this).data("autocompleted"))
  }), $(document).on("navigation:open", ".js-team-ldap-group-autocomplete-results .js-navigation-item", function () {
    var t, e;
    return t = $(this).closest(".js-ldap-group-adder"), e = $(this).attr("data-dn"), t.find(".js-team-ldap-dn-field").val(e), $(this).closest(".js-ldap-import-groups-container").find(".js-ldap-group-dn").map(function (n, i) {
      $(i).text() === e && (t.addClass("is-exists"), t.find(".js-ldap-group-adder-button").addClass("disabled"))
    })
  }), $(document).on("ajaxBeforeSend", ".js-import-container", function (t, e, n) {
    var i;
    return i = $(this).find(".js-ldap-group-adder-button"), i.hasClass("disabled") ? !1 : ($(this).addClass("is-importing"), i.addClass("disabled"))
  }), $(document).on("ajaxComplete", ".js-import-container", function (t, e, n) {
    return $(this).removeClass("is-importing")
  }), $(document).on("ajaxSuccess", ".js-ldap-group-adder", function (t, e, n, i) {
    return $(this).closest(".js-ldap-import-groups-container").removeClass("is-empty").find(".js-ldap-imported-groups").prepend($(i)), this.reset(), $(this).find(".js-team-ldap-group-field").focus(), $(this).find(".js-ldap-group-adder-button").addClass("disabled"), $(".js-import-form-actions").removeClass("hidden")
  }), $(document).on("submit", ".js-team-remove-group", function (t) {
    this.closest(".js-team").classList.add("is-removing"), document.querySelector(".js-team-ldap-group-field").focus()
  }), $(document).on("ajaxSuccess", ".js-team-remove-group", function () {
    this.closest(".js-team").remove(), document.querySelector(".js-team:not(.is-removing)") || (document.querySelector(".js-ldap-import-groups-container").classList.add("is-empty"), document.querySelector(".js-import-form-actions").classList.add("hidden"))
  }), $(document).on("ajaxError", ".js-team-remove-group", function () {
    this.closest(".js-team").classList.remove("is-removing")
  }), $(document).on("click", ".js-edit-team", function (t) {
    return $(this).closest(".js-team").hasClass("is-removing") ? !1 : (t.preventDefault(), $(this).closest(".js-team").addClass("is-editing"), $(this).closest(".js-team").find(".js-team-name-field").focus())
  }), $(document).on("click", ".js-save-button", function () {
    return $(this).hasClass("disabled") ? !1 : $(this).closest(".js-team").addClass("is-sending")
  }), $(document).on("click", ".js-cancel-team-edit", function (t) {
    var e, n;
    return t.preventDefault(), n = $(this).closest(".js-team").removeClass("is-editing"), e = n.find(".js-team-form").removeClass("is-exists"), e.find(".js-slug").text(e.find(".js-slug").attr("data-original-slug")), e[0].reset()
  }), $(document).on("ajaxSuccess", ".js-team-form:not(.is-checking)", function (t, e, n, i) {
    return e.nameCheck ? void 0 : $(this).closest(".js-team").removeClass("is-editing").replaceWith($(i))
  }), $(document).on("ajaxSuccess", ".js-team-form.is-checking", function (t, e, n, i) {
    var r, s;
    return r = $(this).removeClass("is-checking"), "function" == typeof(s = r.find(".js-team-name-field")).removeData && s.removeData("autocheck-xhr"), i.error ? (r.find(".js-save-button").addClass("disabled"), "exists" === i.error ? (r.addClass("is-exists"), r.find(".js-slug").html(i.slug)) : void 0) : (r.find(".js-slug").html(i.slug), r.find(".js-save-button").removeClass("disabled"))
  }), $(document).on("ajaxError", ".js-team-form", function (t, e, n, i) {
    return e.nameCheck && "abort" === e.statusText ? !1 : void 0
  }), $.observe(".js-team-name-field", function () {
    $(this).on("throttled:input", function () {
      var t, e, n, i;
      return e = $(this), t = e.closest(".js-team-form"), null != (n = e.data("autocheck-xhr")) && n.abort(), t.removeClass("is-exists").addClass("is-checking"), t.find(".js-save-button").addClass("disabled"), i = $.ajax({url: e.attr("data-check-url"), type: "GET", context: this, data: {name: this.value}}), i.nameCheck = !0, e.data("autocheck-xhr", i)
    })
  })
}.call(this),function () {
  $(document).on("click", ".js-show-own-teams", function () {
    var t, e, n, i;
    return t = $(".js-team-search-field"), i = t.val(), n = $(this).attr("data-me"), -1 === i.indexOf("@" + n) && (e = i ? " " : "", t.val("" + i + e + "@" + n), t.focus(), t.trigger("throttled:input")), !1
  })
}.call(this),function () {
  var t;
  t = function (t, e, n) {
    var i, r;
    return t.addClass("is-sending"), i = t.find(".team-name-octicon"), i.attr("class", "hidden octicon team-name-octicon"), r = $.get(e.attr("data-check-url"), {name: n}), r.done(function (r, s) {
      var o, a, c, u, l;
      return t.removeClass("is-sending"), r ? t.find(".js-team-name-errors").html(r) : t.find(".js-team-name-errors").html(""), c = null != (u = e.attr("data-original")) ? u.trim() : void 0, a = c && n === c, o = !!t.find(".js-error").length, l = (o || !n) && !a, l ? t.find(".js-create-team-button").attr("disabled", "disabled") : t.find(".js-create-team-button").removeAttr("disabled"), o ? i.attr("class", "octicon team-name-octicon octicon-alert") : n ? i.attr("class", "octicon team-name-octicon octicon-check") : void 0
    })
  }, $.observe(".js-new-team", function () {
    $(this).on("throttled:input", function () {
      var e, n;
      return n = $(this), e = n.closest("form"), t(e, n, n.val().trim())
    })
  }), $(document).ready(function () {
    var e, n;
    return $(".js-new-org-team").length > 0 && (e = $("#team-name"), n = e.val().trim()) ? t($(".org-team-form"), e, n) : void 0
  })
}.call(this),function () {
  $(document).on("submit", ".js-remove-team-members-form", function () {
    return $.sudo().then(function (t) {
      return function () {
        var e;
        return e = $(t), $.fetch(e.attr("action"), {method: "post", body: e.serialize(), headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}}).then(function () {
          var t;
          return t = e.closest(".js-org-section"), e.closest(".js-edit-team-member").remove(), t.toggleClass("is-empty", !t.find(".js-org-list").children().length)
        })
      }
    }(this)), !1
  }), $(document).on("click", ".js-team-description-toggle", function () {
    return $(".js-description-toggler").toggleClass("on")
  }), $(document).on("ajaxComplete", ".js-team-description-form", function () {
    var t;
    return t = $(".js-team-description-field").val(), $(".js-description-toggler").toggleClass("on"), t.trim() ? $(".js-team-description .description").text(t) : $(".js-team-description .description").html("<span class='link'>This team has no description</span>")
  }), $(document).on("ajaxSuccess", ".js-add-team-members-form", function (t, e, n, i) {
    var r;
    return r = $(document).find(".js-member-listings-container"), $(document).trigger("close.facebox"), r.html(e.responseText)
  }), $(document).on("click", ".js-rename-owners-team-next-btn", function () {
    return document.querySelector(".js-rename-owners-team-about-content").classList.toggle("migrate-owners-content-hidden"), document.querySelector(".js-rename-owners-team-rename-form").classList.toggle("migrate-owners-content-hidden")
  })
}.call(this),function () {
  $.observe(".js-org-transform-poller", function () {
    var t;
    t = this.getAttribute("data-redirect-url"), this.addEventListener("load", function () {
      return window.location.href = t
    })
  })
}.call(this),function () {
  $(function () {
    var t;
    return $("#load-readme").click(function () {
      var e, n, i, r, s, o;
      return n = $("#gollum-editor-body"), e = $("#editor-body-buffer"), r = $("#undo-load-readme"), o = e.text(), t(n, e), i = $(this), i.prop("disabled", !0), i.text(i.attr("data-readme-name") + " loaded"), r.show(), s = function () {
        return $(this).val() !== o && r.hide(), n.off("change keyup", s)
      }, n.on("change keyup", s), !1
    }), $("#undo-load-readme").click(function () {
      var e;
      return t($("#gollum-editor-body"), $("#editor-body-buffer")), e = $("#load-readme"), e.prop("disabled", !1), e.text("Load " + e.attr("data-readme-name")), $(this).hide(), !1
    }), t = function (t, e) {
      var n, i, r;
      return n = $(t), i = $(e), r = n.val(), n.val(i.text()), i.text(r)
    }
  })
}.call(this),function () {
  $(document).on("click", ".js-merge-branch-action", function (t) {
    var e, n;
    n = $(this), e = n.closest(".js-merge-pr"), n.fire("details:toggle", {relatedTarget: t.target}, function () {
    }), e.performTransition(function () {
      this.toggleClass("open"), this.fire("details:toggled", {relatedTarget: t.target, async: !0})
    }), t.preventDefault()
  })
}.call(this),function () {
  $(document).on("details:toggled", ".js-pull-merging", function () {
    var t;
    return t = $(this).find(".js-merge-pull-request"), t.toggleClass("is-dirty", t.is($.visible))
  }), $(document).on("ajaxSuccess", ".js-merge-pull-request", function (t, e, n, i) {
    var r, s, o;
    this.reset(), $(this).removeClass("is-dirty"), s = i.updateContent;
    for (o in s)r = s[o], $(o).updateContent(r)
  }), $(document).on("session:resume", function (t) {
    var e, n;
    return(n = document.getElementById(t.targetId)) ? (e = $(n).closest(".js-merge-pull-request"), e.closest(".js-details-container").addClass("open")) : void 0
  })
}.call(this),function () {
  $(document).on("ajaxError", ".js-handle-pull-merging-errors", function (t, e) {
    var n, i, r;
    return n = this.closest(".js-pull-merging"), n.classList.add("is-error"), 422 === e.status && (r = e.responseText) && (i = n.querySelector(".js-pull-merging-error"), $(i).replaceWith(r)), !1
  }), $(document).on("click", ".js-pull-merging-refresh", function () {
    var t;
    return t = $(this).closest(".js-pull-merging"), t.ajax().then(function (e) {
      return t.replaceWith(e)
    }), !1
  })
}.call(this),function () {
  var t;
  t = function (t) {
    return t.querySelector(".js-timeline-review-comment-group").classList.toggle("hidden"), t.querySelector(".js-timeline-resolved-comment-header").classList.toggle("hidden")
  }, $(document).on("ajaxSuccess", ".js-toggle-resolve", function (t, e, n, i) {
    var r, s, o, a;
    (o = i.resolved) && (s = this.closest(".js-line-comments"), s.classList.toggle("is-resolved", o), s.classList.toggle("is-collapsed", o)), (a = i.diff_line) && $(this).closest(".js-inline-comments-container").prev().replaceWith(a), (r = i.actions) && $(this).closest(".js-comment-resolution").replaceWith(r)
  }), $(document).on("click", ".js-expand-resolved-timeline-review-comment-group", function () {
    return t(this.closest(".js-discussion-item")), !1
  }), $(document).on("ajaxSuccess", ".js-discussion-item", function (t, e, n, i) {
    var r;
    return(r = i.review_comment_group) ? $(this).replaceWith(r) : void 0
  }), $(function () {
    var e, n, i, r, s, o, a;
    if (null != document.querySelector(".js-timeline-resolved-comment-header") && (r = document.location.hash, /^#discussion-diff-\d+$/.test(r) && (n = document.getElementById(r.slice(1)), e = n.closest(".js-discussion-item"), t(e), e.scrollIntoView()), /^#r\d+$/.test(r))) {
      for (n = document.getElementById(r.slice(1)), e = n.closest(".js-inline-comments-container"), e.classList.remove("is-collapsed"), a = e.querySelectorAll(".is-collapsed"), s = 0, o = a.length; o > s; s++)i = a[s], i.classList.remove("is-collapsed");
      return e.scrollIntoView()
    }
  })
}.call(this),function () {
  var t;
  $.observeLast(".pull-request-ref-restore", "last"), t = function () {
    var t;
    return t = $("#js-pull-restorable").length, $(".pull-discussion-timeline").toggleClass("is-pull-restorable", t)
  }, $.observe("#js-pull-restorable", {add: t, remove: t})
}.call(this),function () {
  var t;
  t = function (t) {
    var e;
    return e = t.getAttribute("data-container-id"), document.getElementById(e)
  }, $(document).on("pjax:click", ".js-pull-request-tab", function (e, n) {
    return t(this) ? !1 : (n.push = !1, n.replace = !0)
  }), $(document).on("click", ".js-pull-request-tab", function (e) {
    var n, i, r, s, o, a;
    if (1 === e.which && !e.metaKey && !e.ctrlKey && (n = t(this))) {
      for (o = $(".js-pull-request-tab.selected"), r = 0, s = o.length; s > r; r++)a = o[r], $(a).removeClass("selected"), $(t(a)).removeClass("is-visible");
      return $(n).addClass("is-visible"), $(this).addClass("selected").blur(), i = $(this).attr("data-tab"), $(".js-pull-request-tab-container").attr("data-tab", i), $.support.pjax && window.history.replaceState($.pjax.state, "", this.href), !1
    }
  }), $(document).on("ajaxSuccess", "#discussion_bucket .js-inline-comment-form, #discussion_bucket .js-pull-request-review-comment-form", function () {
    return $("#files_bucket").remove()
  }), $(document).on("ajaxSuccess", "#files_bucket .js-inline-comment-form, #files_bucket .js-pull-request-review-comment-form", function () {
    return $("#discussion_bucket").remove()
  }), $(document).on("socket:message", ".js-pull-request-tabs", function () {
    $.fetchText(this.getAttribute("data-url")).then(function (t) {
      return function (e) {
        var n, i, r, s, o, a, c, u, l, d, h;
        for (c = document.createDocumentFragment(), u = $.parseHTML(e), i = 0, o = u.length; o > i; i++)n = u[i], c.appendChild(n);
        for (l = ["#commits_tab_counter", "#files_tab_counter", "#diffstat"], h = [], s = 0, a = l.length; a > s; s++)r = l[s], h.push(null != (d = t.querySelector(r)) ? d.replaceWith(c.querySelector(r)) : void 0);
        return h
      }
    }(this))
  }), $(document).on("socket:message", ".js-pull-request-stale-files", function () {
    return $("#files_bucket").addClass("is-stale")
  })
}.call(this),function () {
  $(document).on("change", ".js-pulse-period", function (t) {
    var e;
    return e = $(t.target).attr("data-url"), $.pjax({url: e, container: "#js-repo-pjax-container"})
  })
}.call(this),function () {
  $(document).on("navigation:open", ".js-create-branch", function () {
    return $(this).submit(), !1
  })
}.call(this),function () {
  var t, e, n, i, r, s;
  $(document).on("click", ".js-timeline-tags-expander", function () {
    return $(this).closest(".js-timeline-tags").removeClass("is-collapsed")
  }), n = ["is-default", "is-saving", "is-saved", "is-failed"], i = function (t, e) {
    var i;
    return(i = t.classList).remove.apply(i, n), t.classList.add(e), t.disabled = "is-saving" === e
  }, $(document).on("click", ".js-save-draft", function () {
    var t, e, n, r;
    return t = this, r = t.closest("form"), r.querySelector("#release_draft").value = "1", e = function (e) {
      return i(t, "is-saved"), setTimeout(function () {
        return i(t, "is-default")
      }, 5e3), r.dispatchEvent(new CustomEvent("release:saved", {bubbles: !0, cancelable: !1, detail: {release: e}}))
    }, n = function () {
      return i(t, "is-failed")
    }, $.fetchJSON(r.action, {method: r.method, body: $(r).serialize(), headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}}).then(e, n), i(t, "is-saving"), !1
  }), $(document).on("release:saved", ".js-release-form", function (t) {
    var n, i, r, s, o, a, c, u;
    return o = t.originalEvent.detail.release, s = this, c = s.getAttribute("data-repo-url"), u = e("tag", c, o.tag_name), r = e("edit", c, o.tag_name), s.setAttribute("action", u), "function" == typeof(n = window.history).replaceState && n.replaceState($.pjax.state, document.title, r), (i = document.querySelector("#delete_release_confirm form")) && i.setAttribute("action", u), a = s.querySelector("#release_id"), a.value ? void 0 : (a.value = o.id, $(s).append('<input type="hidden" name="_method" value="put">'))
  }), $(document).on("click", ".js-publish-release", function (t) {
    return $("#release_draft").val("0")
  }), s = ["is-loading", "is-empty", "is-valid", "is-invalid", "is-duplicate", "is-pending"], r = function (t) {
    var e;
    switch (t) {
      case"is-valid":
        $(".release-target-wrapper").addClass("hidden");
        break;
      case"is-loading":
        break;
      default:
        $(".release-target-wrapper").removeClass("hidden")
    }
    return e = $(".js-release-tag"), e.removeClass(s.join(" ")), e.addClass(t)
  }, t = function (t) {
    return t.val() && t.val() !== t.data("last-checked") ? (r("is-loading"), $.ajax({url: t.attr("data-url"), type: "GET", data: {tag_name: t.val()}, dataType: "json", success: function (e) {
      return"duplicate" === e.status && parseInt(t.attr("data-existing-id")) === parseInt(e.release_id) ? void r("is-valid") : ($(".js-release-tag .js-edit-release-link").attr("href", e.url), r("is-" + e.status))
    }, error: function (t) {
      return r("is-invalid")
    }, complete: function () {
      return t.data("last-checked", t.val())
    }})) : void 0
  }, e = function (t, e, n) {
    return e + "/releases/" + t + "/" + n
  }, $(document).on("blur", ".js-release-tag-field", function (e) {
    return t($(this))
  }), $.observe(".js-release-tag-field", function () {
    t($(this))
  }), $(document).on("change", ".js-release-tag", function () {
    var t, e, n, i, r, s, o, a, c;
    if (n = $(this), t = n.closest("form"), e = t.find(".js-previewable-comment-form"), e.length) {
      for (i = e.data("base-preview-url"), i || (i = e.attr("data-preview-url"), i += i.indexOf("?") >= 0 ? "&" : "?", e.data("base-preview-url", i)), r = [], c = n.find('input[name="release[tag_name]"], input[name="release[target_commitish]"]:checked'), s = 0, a = c.length; a > s; s++)o = c[s], o.value && r.push({name: o.name, value: o.value});
      return e.attr("data-preview-url", i + $.param(r))
    }
  }), $.observe(".js-release-form .js-previewable-comment-form", function () {
    $(this).closest("form").find(".js-release-tag").trigger("change")
  })
}.call(this),function () {
  var t, e = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  };
  t = function () {
    function t() {
      this.validate = e(this.validate, this), this.updateUpsell = e(this.updateUpsell, this), this.selectedPrivacyToggleElement = e(this.selectedPrivacyToggleElement, this), this.handlePrivacyChange = e(this.handlePrivacyChange, this), this.handleOwnerChange = e(this.handleOwnerChange, this), this.elements = {ownerContainer: $(".js-owner-container"), iconPreviewPublic: $(".js-icon-preview-public"), iconPreviewPrivate: $(".js-icon-preview-private"), upgradeUpsell: $("#js-upgrade-container").hide(), upgradeConfirmationCheckbox: $(".js-confirm-upgrade"), upsells: $(".js-upgrade"), privacyToggles: $(".js-privacy-toggle"), privateRadio: $(".js-privacy-toggle[value=false]"), publicRadio: $(".js-privacy-toggle[value=true]"), repoNameField: $("input[type=text].js-repo-name"), form: $("#new_repository"), licenseContainer: $(".js-license-container"), teamBoxes: $(".js-team-select"), suggestion: $(".js-reponame-suggestion")}, this.current_login = $("input[name=owner]:checked").prop("value"), this.privateRepo = !1, this.changedPrivacyManually = !1, this.elements.teamBoxes.hide(), this.elements.ownerContainer.on("change", "input[type=radio]", this.handleOwnerChange), this.elements.privacyToggles.on("change", function (t) {
        return function (e) {
          return t.handlePrivacyChange(e.targetElement, e)
        }
      }(this)), this.elements.upgradeUpsell.on("change input", "input", this.validate), this.elements.form.on("repoform:validate", this.validate), this.elements.suggestion.on("click", function (t) {
        return function (e) {
          var n;
          return n = t.elements.repoNameField, n.val($(e.target).text()), n.trigger("change")
        }
      }(this)), this.handleOwnerChange(), this.validate()
    }

    return t.prototype.handleOwnerChange = function () {
      var t, e;
      return this.current_login = $("input[name=owner]:checked").prop("value"), this.elements.repoNameField.trigger("change"), e = this.elements.ownerContainer.find(".select-menu-item.selected"), this.elements.teamBoxes.hide().find("input, select").prop("disabled", !0), t = this.elements.teamBoxes.filter("[data-login=" + this.current_login + "]"), t.show().find("input, select").prop("disabled", !1), this.changedPrivacyManually || ("private" === e.attr("data-default") ? this.elements.privateRadio.prop("checked", "checked").change() : this.elements.publicRadio.prop("checked", "checked").change()), "yes" === e.attr("data-permission") ? ($(".with-permission-fields").show(), $(".without-permission-fields").hide(), $(".errored").show(), $("dl.warn").show()) : ($(".with-permission-fields").hide(), $(".without-permission-fields").show(), $(".errored").hide(), $("dl.warn").hide()), this.updateUpsell(), this.handlePrivacyChange()
    }, t.prototype.handlePrivacyChange = function (t, e) {
      var n;
      return null == t && (t = this.selectedPrivacyToggleElement()), null == e && (e = null), e && !e.isTrigger && (this.changedPrivacyManually = !0), n = this.elements.upgradeUpsell.find(".js-billing-section"), "false" === t.val() ? (this.privateRepo = !0, this.elements.upgradeUpsell.show(), n.removeClass("has-removed-contents"), this.elements.upgradeUpsell.find("input[type=checkbox]").prop("checked", "checked"), this.elements.iconPreviewPublic.hide(), this.elements.iconPreviewPrivate.show()) : (this.privateRepo = !1, this.elements.upgradeUpsell.hide(), n.addClass("has-removed-contents"), this.elements.upgradeUpsell.find("input[type=checkbox]").prop("checked", null), this.elements.form.attr("action", this.elements.form.attr("data-url")), this.elements.iconPreviewPrivate.hide(), this.elements.iconPreviewPublic.show()), this.validate()
    }, t.prototype.selectedPrivacyToggleElement = function () {
      return this.elements.privateRadio.is(":checked") ? this.elements.privateRadio : this.elements.publicRadio
    }, t.prototype.updateUpsell = function () {
      var t;
      return t = this.elements.upsells.filter("[data-login=" + this.current_login + "]"), this.elements.upgradeUpsell.html(t)
    }, t.prototype.validate = function () {
      var t, e;
      return e = !0, this.elements.repoNameField.is(".is-autocheck-successful") || (e = !1), t = this.elements.upgradeUpsell.find("input[type=checkbox]"), this.privateRepo && t.length && !t.is(":checked") && (e = !1), this.elements.form.find("button.primary").prop("disabled", !e)
    }, t
  }(), $(function () {
    return $(".page-new-repo").length ? new t : void 0
  }), $(document).on("autocheck:send", "#repository_name", function (t) {
    var e, n, i;
    n = t.originalEvent.detail, e = $(this), i = e.closest("form").find("input[name=owner]:checked").val(), n.owner = i, e.trigger("repoform:validate")
  }), $(document).on("autocheck:complete", "#repository_name", function () {
    return $(this).trigger("repoform:validate")
  }), $(document).on("autocheck:success", "#repository_name", function (t) {
    var e, n, i, r;
    (r = null != (n = t.originalEvent.detail) ? n.trim() : void 0) && (e = this.closest("dl.form"), e.classList.add("warn"), i = document.createElement("dd"), i.classList.add("warning"), i.innerHTML = r, e.append(i))
  })
}.call(this),function () {
  $(document).on("selectmenu:selected", ".js-set-user-protocol-preference", function () {
    return $(this).submit()
  })
}.call(this),function () {
  $(document).on("reveal.facebox", function (t) {
    var e;
    return(e = document.querySelector("#facebox .js-fork-select-fragment")) ? e.setAttribute("src", e.getAttribute("data-url")) : void 0
  })
}.call(this),function () {
  var t;
  t = function (t) {
    var e, n;
    return e = null != document.getElementById("js-show-full-navigation"), $(".repository-with-sidebar").toggleClass("with-full-navigation", e), e ? (n = $(".js-repo-nav").attr("data-issue-count-url"), $.fetchJSON(n).then(function (t) {
      return $(".js-issue-replace-counter").replaceWith(t.issues_count), $(".js-pull-replace-counter").replaceWith(t.pulls_count)
    })) : void 0
  }, $(function () {
    var e;
    return(e = document.getElementById("js-repo-pjax-container")) ? t(e) : void 0
  }), $(document).on("pjax:end", "#js-repo-pjax-container", function () {
    return t(this)
  }), $(document).on("pjax:clicked", ".js-directory-link", function () {
    return $(this).closest("tr").addClass("is-loading"), $(document.body).addClass("disables-context-loader")
  }), $(document).on("pjax:click", ".js-octicon-loaders a", function () {
    return $(this).addClass("is-loading"), $(document).one("pjax:end", function (t) {
      return function () {
        return $(t).removeClass("is-loading")
      }
    }(this))
  }), $(function () {
    var t;
    return t = $(".mini-nav, .repo-container .menu"), t.length ? $.each(t, function (t, e) {
      return new FastClick(e)
    }) : void 0
  })
}.call(this),function () {
  var t;
  t = function () {
    return $(".js-repo-toggle-team:checked").visible()
  }, $(document).onFocusedInput(".js-repository-name", function () {
    var t, e, n;
    return e = /[^0-9A-Za-z_\-.]/g, n = $(".js-form-note"), t = $(".js-rename-repository-button"), function () {
      n.html("Will be renamed as <strong>" + this.value.replace(e, "-") + "</strong>"), e.test(this.value) ? n.show() : n.hide(), this.value && this.value !== $(this).attr("data-original-name") ? t.prop("disabled", !1) : t.prop("disabled", !0)
    }
  }), $(document).on("click", ".js-repo-team-suggestions-view-all", function () {
    return $.fetchText(this.href).then(function (e) {
      return function (n) {
        var i, r;
        return r = t().map(function () {
          return this.value
        }), i = $(e).closest("ul"), i.html(n), r.each(function () {
          return i.find(".js-repo-toggle-team[value=" + this + "]").prop("checked", !0)
        })
      }
    }(this)), !1
  })
}.call(this),function () {
  $(document).on("pjax:end", function () {
    var t, e, n, i, r, s, o, a, c, u, l;
    if (l = $(document.head).find("meta[name='selected-link']").attr("value"), null != l)for (n = $(".js-sidenav-container-pjax .js-selected-navigation-item").removeClass("selected"), t = 0, r = n.length; r > t; t++)for (e = n[t], a = null != (c = $(e).attr("data-selected-links")) ? c : "", u = a.split(" "), i = 0, s = u.length; s > i; i++)o = u[i], o === l && $(e).addClass("selected")
  })
}.call(this),function () {
  var t, e, n;
  t = function (t) {
    var e;
    return e = $(".js-site-search-form")[0], e.setAttribute("action", e.getAttribute("data-global-search-url")), $(".js-site-search").removeClass("repo-scope"), t.setAttribute("placeholder", t.getAttribute("data-global-scope-placeholder"))
  }, n = function (t) {
    var e;
    return e = $(".js-site-search-form")[0], e.setAttribute("action", e.getAttribute("data-repo-search-url")), $(".js-site-search").addClass("repo-scope"), t.setAttribute("placeholder", t.getAttribute("data-repo-scope-placeholder"))
  }, e = function (e) {
    var i, r;
    i = e.target, r = i.value, "" === r && "backspace" === e.hotkey && i.classList.contains("is-clearable") && t(i), "" === r && "esc" === e.hotkey && n(i), i.classList.toggle("is-clearable", "" === r)
  }, $(document).on("focus", ".js-site-search-field", function () {
    return $(this).on("keyup", e)
  }), $(document).on("blur", ".js-site-search-field", function () {
    return $(this).off("keyup", e)
  }), $(document).on("focusout", ".js-site-search-focus", function () {
    this.closest(".js-chromeless-input-container").classList.remove("focus"), "" === this.value && this.classList.contains("js-site-search-field") && n(this)
  }), $(document).on("focusin", ".js-site-search-focus", function () {
    this.closest(".js-chromeless-input-container").classList.add("focus")
  })
}.call(this),function () {
  $(document).on("ajaxSend", ".js-action-ldap-create", function () {
    return $(this).find(".btn-sm").addClass("disabled")
  }), $(document).on("ajaxError", ".js-action-ldap-create", function (t, e, n, i) {
    return!1
  }), $(document).on("ajaxComplete", ".js-action-ldap-create", function (t, e) {
    var n, i;
    return n = $(this), i = 500 === e.status ? "Oops, something went wrong." : e.responseText, n.find(".js-message").show().html(" &ndash; " + i), 200 === e.status && n.find(".btn").hide(), !1
  })
}.call(this),function () {
  $(document).on("ajaxBeforeSend", ".js-auto-subscribe-toggle", function () {
    return $(this).find(".js-status-indicator").removeClass("status-indicator-success").removeClass("status-indicator-loading").addClass("status-indicator-loading")
  }), $(document).on("ajaxError", ".js-auto-subscribe-toggle", function () {
    return $(this).find(".js-status-indicator").removeClass("status-indicator-loading").addClass("status-indicator-failed")
  }), $(document).on("ajaxSuccess", ".js-auto-subscribe-toggle", function () {
    return $(this).find(".js-status-indicator").removeClass("status-indicator-loading").addClass("status-indicator-success")
  }), $(document).on("ajaxBeforeSend", ".js-unignore-form, .js-ignore-form", function () {
    return $(this).closest(".js-subscription-row").addClass("loading")
  }), $(document).on("ajaxError", ".js-unignore-form, .js-ignore-form", function () {
    return $(this).closest(".js-subscription-row").removeClass("loading"), $(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem unignoring this repo.")
  }), $(document).on("ajaxSuccess", ".js-unignore-form", function () {
    return $(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
  }), $(document).on("ajaxSuccess", ".js-ignore-form", function () {
    return $(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
  }), $(document).on("ajaxBeforeSend", ".js-unsubscribe-form, .js-subscribe-form", function () {
    return $(this).closest(".js-subscription-row").addClass("loading")
  }), $(document).on("ajaxError", ".js-unsubscribe-form, .js-subscribe-form", function () {
    return $(this).closest(".js-subscription-row").removeClass("loading"), $(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem with unsubscribing :(")
  }), $(document).on("ajaxSuccess", ".js-unsubscribe-form", function () {
    return $(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
  }), $(document).on("ajaxSuccess", ".js-subscribe-form", function () {
    return $(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
  }), $(document).on("ajaxSuccess", ".js-thread-subscription-status", function (t, e, n, i) {
    return $(".js-thread-subscription-status").updateContent(i)
  })
}.call(this),function () {
  $(document).on("change", ".js-survey-select", function () {
    var t, e, n, i;
    return n = $(this)[0], e = $(this).closest(".js-survey-question-form"), t = e.find(".js-survey-other-text"), i = n.options[n.selectedIndex], i.classList.contains("js-survey-option-other") ? (e.addClass("is-other-selected"), t.attr("required", "required"), t.focus()) : (t.removeAttr("required"), e.removeClass("is-other-selected"))
  }), $(document).on("change", ".js-survey-radio", function () {
    var t, e, n;
    return t = $(this)[0], n = $(this).closest(".js-survey-question-form"), e = n.find(".js-survey-other-text"), t.classList.contains("js-survey-radio-other") ? (n.addClass("is-other-selected"), e.attr("required", "required"), e.focus()) : (e.removeAttr("required"), n.removeClass("is-other-selected")), $(this).trigger("validation:field:change")
  })
}.call(this),function () {
  $(document).on("autocomplete:autocompleted:changed", ".js-team-add-user-name", function (t) {
    var e;
    return e = $(".js-team-add-user-button")[0], e.disabled = !$(this).data("autocompleted")
  }), $(document).on("click", ".js-team-remove-user", function (t) {
    var e, n;
    return t.preventDefault(), $(".js-team-add-user-form").removeClass("hidden"), $(".js-team-add-user-name").focus(), e = $(this).closest("li").remove(), n = e.attr("data-login")
  }), $(document).on("click", ".js-team-add-user-button", function (t) {
    var e, n, i, r, s, o;
    if (t.preventDefault(), n = $(".js-team-add-user-name"), o = n.val(), o && n.data("autocompleted")) {
      for (n.val(""), s = $(".js-team-user-logins li"), e = 0, i = s.length; i > e; e++)if (r = s[e], $(r).attr("data-login") === o)return;
      return $.sudo().then(function () {
        return $.ajax({url: $(".js-team-add-user-form").attr("data-template-url"), data: {member: o}, success: function (t) {
          return $(".js-team-user-logins").append(t), $(".js-login-field").prop("disabled", !1), $(".js-team-add-user-form").addClass("hidden")
        }}), $(".js-team-add-user-name").focus()
      })
    }
  })
}.call(this),function () {
  var t, e, n = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  };
  t = function () {
    function t(t) {
      var e;
      e = $(t), this.name = e.attr("data-theme-name"), this.slug = e.attr("data-theme-slug"), this.baseHref = e.attr("href")
    }

    return t.prototype.wrappedKey = function (t, e) {
      return null == e && (e = null), e ? e + "[" + t + "]" : t
    }, t.prototype.params = function (t) {
      var e;
      return null == t && (t = null), e = {}, e[this.wrappedKey("theme_slug", t)] = this.slug, e
    }, t.prototype.previewSrc = function () {
      return[this.baseHref, $.param(this.params())].join("&")
    }, t
  }(), e = function () {
    function e() {
      this.updateScrollLinks = n(this.updateScrollLinks, this), this.scrollThemeLinksContainer = n(this.scrollThemeLinksContainer, this), this.onPublishClick = n(this.onPublishClick, this), this.onHideClick = n(this.onHideClick, this), this.onThemeLinkClick = n(this.onThemeLinkClick, this), this.onThemeNavNextClick = n(this.onThemeNavNextClick, this), this.onThemeNavPrevClick = n(this.onThemeNavPrevClick, this), this.onScrollForwardsClick = n(this.onScrollForwardsClick, this), this.onScrollBackwardsClick = n(this.onScrollBackwardsClick, this), this.onPagePreviewLoad = n(this.onPagePreviewLoad, this), this.pagePreview = $("#page-preview"), this.contextLoader = $(".theme-picker-spinner"), this.fullPicker = $(".theme-picker-thumbs"), this.miniPicker = $(".theme-picker-controls"), this.scrollBackwardsLinks = $(".theme-toggle-full-left"), this.scrollForwardsLinks = $(".theme-toggle-full-right"), this.prevLinks = $(".theme-picker-prev"), this.nextLinks = $(".theme-picker-next"), this.themeLinksContainer = this.fullPicker.find(".js-theme-selector"), this.themeLinks = this.themeLinksContainer.find(".theme-selector-thumbnail"), this.themes = [], this.themeLinks.each(function (e) {
        return function (n, i) {
          return e.themes.push(new t(i))
        }
      }(this)), this.selectedTheme = this.themes[0], this.pagePreview.load(this.onPagePreviewLoad), this.scrollBackwardsLinks.click(this.onScrollBackwardsClick), this.scrollForwardsLinks.click(this.onScrollForwardsClick), this.prevLinks.click(this.onThemeNavPrevClick), this.nextLinks.click(this.onThemeNavNextClick), this.themeLinks.click(this.onThemeLinkClick), $(".theme-picker-view-toggle").click(this.onHideClick), $("#page-edit").click(this.onEditClick), $("#page-publish").click(this.onPublishClick), this.theme(this.selectedTheme), this.updateScrollLinks()
    }

    return e.prototype.onPagePreviewLoad = function (t) {
      var e, n;
      return this.contextLoader.removeClass("visible"), e = this.pagePreview[0].contentDocument ? this.pagePreview[0].contentDocument : this.pagePreview[0].contentWindow.document, n = this.getDocHeight(e) + "px", this.pagePreview.css("visibility", "hidden"), this.pagePreview.height("10px"), this.pagePreview.height(n), this.pagePreview.css("visibility", "visible")
    }, e.prototype.onScrollBackwardsClick = function (t) {
      return this.scrollThemeLinksContainer(-1)
    }, e.prototype.onScrollForwardsClick = function (t) {
      return this.scrollThemeLinksContainer(1)
    }, e.prototype.onThemeNavPrevClick = function (t) {
      return this.theme(this.prevTheme())
    }, e.prototype.onThemeNavNextClick = function (t) {
      return this.theme(this.nextTheme())
    }, e.prototype.onThemeLinkClick = function (t) {
      return this.theme(this.themeForLink(t.currentTarget)), !1
    }, e.prototype.onHideClick = function (t) {
      var e;
      return this.fullPicker.toggle(), this.miniPicker.toggle(), this.scrollToTheme(this.theme(), !1), e = $(t.currentTarget), e.toggleClass("open")
    }, e.prototype.onEditClick = function (t) {
      return $("#page-edit-form").submit(), !1
    }, e.prototype.onPublishClick = function (t) {
      var e;
      return e = $("#page-publish-form"), e.find('input[name="page[theme_slug]"]').val(this.theme().slug), $("#page-publish-form").submit(), !1
    }, e.prototype.scrollThemeLinksContainer = function (t) {
      var e, n, i;
      return n = this.themeLinksContainer.scrollLeft(), i = this.themeLinksContainer.outerWidth(!0), e = n + i * t, this.themeLinksContainer.animate({scrollLeft: e}, 400, function (t) {
        return function () {
          return t.updateScrollLinks()
        }
      }(this)), !1
    }, e.prototype.updateScrollLinks = function () {
      var t, e, n;
      return t = this.themeLinksContainer.scrollLeft(), 0 >= t ? (this.scrollBackwardsLinks.addClass("disabled"), this.scrollForwardsLinks.removeClass("disabled")) : (this.scrollBackwardsLinks.removeClass("disabled"), n = this.themeLinksContainer[0].scrollWidth, e = n - this.themeLinksContainer.outerWidth(!0), t >= e ? this.scrollForwardsLinks.addClass("disabled") : this.scrollForwardsLinks.removeClass("disabled"))
    }, e.prototype.selectedThemeIndex = function () {
      return this.themes.indexOf(this.selectedTheme)
    }, e.prototype.prevTheme = function () {
      var t;
      return t = (this.selectedThemeIndex() - 1) % this.themes.length, 0 > t && (t += this.themes.length), this.themes[t]
    }, e.prototype.nextTheme = function () {
      return this.themes[(this.selectedThemeIndex() + 1) % this.themes.length]
    }, e.prototype.themeForLink = function (t) {
      return this.themes[this.themeLinks.index($(t))]
    }, e.prototype.linkForTheme = function (t) {
      return $(this.themeLinks[this.themes.indexOf(t)])
    }, e.prototype.scrollToTheme = function (t, e) {
      var n, i, r, s, o, a;
      return null == e && (e = !0), n = this.linkForTheme(t), a = this.themes.indexOf(t), s = n.outerWidth(!0), r = a * s, i = this.themeLinksContainer.scrollLeft(), o = i + this.themeLinksContainer.outerWidth(!0), i > r || r + s > o ? e ? this.themeLinksContainer.animate({scrollLeft: r}, 500) : this.themeLinksContainer.scrollLeft(r) : void 0
    }, e.prototype.theme = function (t) {
      return null == t && (t = null), t ? (this.selectedTheme = t, this.showPreviewFor(t), this.themeLinks.removeClass("selected"), this.linkForTheme(t).addClass("selected"), this.scrollToTheme(t), this.miniPicker.find(".js-theme-name").text(t.name), !1) : this.selectedTheme
    }, e.prototype.showPreviewFor = function (t) {
      var e;
      return this.contextLoader.addClass("visible"), e = this.fullPicker.find("form"), e.find('input[name="theme_slug"]').val(t.slug), e.submit()
    }, e.prototype.getDocHeight = function (t) {
      var e, n;
      return this.pagePreview.height("auto"), e = t.body, n = t.documentElement, Math.max(e.scrollHeight, e.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight)
    }, e
  }(), $(function () {
    return document.getElementById("theme-picker-wrap") ? new e : void 0
  })
}.call(this),function () {
  var t, e, n, i, r, s;
  r = function (t) {
    return setTimeout(function () {
      var e, n, i, r, o;
      for (r = document.querySelectorAll(".js-tree-finder-field"), o = [], n = 0, i = r.length; i > n; n++)e = r[n], e.value = t, o.push(s(e));
      return o
    }, 0)
  }, i = null, t = new WeakMap, s = function (e, n) {
    var r, o, a, c, u, l, d, h, f, m, p, g, v, b;
    if (v = document.getElementById(e.getAttribute("data-results"))) {
      if (!(l = t.get(v)))return void(null == i && (i = $.fetchJSON(v.getAttribute("data-url")).then(function (n) {
        return t.set(v, n.paths), s(e), i = null
      })["catch"](function () {
        return i = null
      })));
      for (b = v.querySelector(".js-tree-browser-result-template").firstElementChild, m = v.querySelector(".js-tree-finder-results"), null == n && (n = e.value), n ? (d = $.fuzzyRegexp(n), g = $.fuzzySort(l, n)) : g = l, v.classList.toggle("filterable-empty", !g.length), a = document.createDocumentFragment(), h = g.slice(0, 50), r = 0, o = h.length; o > r; r++)p = h[r], f = b.cloneNode(!0), c = f.getElementsByClassName("js-tree-finder-path")[0], u = new URL(c.href), u.pathname = u.pathname + "/" + p, c.href = u.href, c.textContent = p, $.fuzzyHighlight(c, n, d), a.appendChild(f);
      m.innerHTML = "", m.appendChild(a), $(m).navigation("focus")
    }
  }, $(document).onFocusedKeydown(".js-tree-finder-field", function (t) {
    return s(this), $(this).on("throttled:input." + t, function () {
      return s(this)
    }), function (t) {
      return"esc" === t.hotkey ? (history.back(), t.preventDefault()) : void 0
    }
  }), e = function () {
    var t;
    return t = $("<textarea>").css({position: "fixed", top: 0, left: 0, opacity: 0}), $(document.body).append(t), t.focus(), function () {
      return t.blur().remove().val()
    }
  }, n = null, $(document).on("pjax:click", ".js-show-file-finder", function (t) {
    return n = e()
  }), $(document).on("pjax:end", "#js-repo-pjax-container", function (t) {
    var e;
    return n ? ((e = n()) && r(e), n = null) : void 0
  }), $.observe(".js-tree-finder-field", function () {
    s(this)
  })
}.call(this),function () {
  var t, e, n;
  e = function () {
    return document.body.classList.add("is-sending"), document.body.classList.remove("is-sent", "is-not-sent")
  }, n = function () {
    return document.body.classList.add("is-sent"), document.body.classList.remove("is-sending")
  }, t = function (t) {
    return t && (document.querySelector(".js-sms-error").textContent = t), document.body.classList.add("is-not-sent"), document.body.classList.remove("is-sending")
  }, $(document).on("ajaxSend", ".js-send-auth-code", function () {
    e()
  }), $(document).on("ajaxSuccess", ".js-send-auth-code", function () {
    n()
  }), $(document).on("ajaxError", ".js-send-auth-code", function (e, n) {
    t(n.responseText)
  }), $(document).on("click", ".js-send-two-factor-code", function () {
    var i, r, s, o, a, c;
    s = this.form, i = s.querySelector(".js-country-code-select").value, a = s.querySelector(".js-sms-number").value, o = i + " " + a, c = s.querySelector(".js-two-factor-secret").value, e(), r = new FormData, r.append("number", o),
      r.append("two_factor_secret", c), r.append("authenticity_token", s.elements.authenticity_token.value), $.fetch(this.getAttribute("data-url"), {method: "post", body: r}).then(function () {
      var t, e, i, r;
      for (n(), r = s.querySelectorAll(".js-2fa-enable"), e = 0, i = r.length; i > e; e++)t = r[e], t.disabled = !1;
      return s.querySelector(".js-2fa-otp").focus()
    })["catch"](function (e) {
      var n, i, r, o, a, c;
      for (null != (o = e.response) && o.text().then(t), a = s.querySelectorAll(".js-2fa-enable"), c = [], i = 0, r = a.length; r > i; i++)n = a[i], c.push(n.disabled = !0);
      return c
    })
  }), $(document).on("loading.facebox", function () {
    return"/settings/two_factor_authentication/configure" === window.location.pathname ? ($(".js-configure-sms-fallback .facebox-alert").text("").hide(), $(".js-configure-sms-fallback").show(), $(".js-verify-sms-fallback").hide()) : void 0
  }), $(document).on("ajaxSuccess", ".js-two-factor-set-sms-fallback", function (t, e) {
    switch (e.status) {
      case 200:
      case 201:
        return window.location.reload();
      case 202:
        return $(".js-configure-sms-fallback").hide(), $(".js-verify-sms-fallback").show(), $(".js-fallback-otp").focus()
    }
  }), $(document).on("ajaxError", ".js-two-factor-set-sms-fallback", function (t, e) {
    switch (e.status) {
      case 422:
        return window.location.reload();
      case 429:
        return $(".js-configure-sms-fallback .facebox-alert").text(e.responseText).show(), !1
    }
  })
}.call(this);
var u2f = u2f || {};
u2f.EXTENSION_ID = "kmendfapggjehodndflmmgagdbamhnfd", u2f.MessageTypes = {U2F_REGISTER_REQUEST: "u2f_register_request", U2F_SIGN_REQUEST: "u2f_sign_request", U2F_REGISTER_RESPONSE: "u2f_register_response", U2F_SIGN_RESPONSE: "u2f_sign_response"}, u2f.ErrorCodes = {OK: 0, OTHER_ERROR: 1, BAD_REQUEST: 2, CONFIGURATION_UNSUPPORTED: 3, DEVICE_INELIGIBLE: 4, TIMEOUT: 5}, u2f.Request, u2f.Response, u2f.Error, u2f.SignRequest, u2f.SignResponse, u2f.RegisterRequest, u2f.RegisterResponse, u2f.getMessagePort = function (t) {
  var e = chrome.runtime.connect(u2f.EXTENSION_ID, {includeTlsChannelId: !0});
  setTimeout(function () {
    t(new u2f.WrappedChromeRuntimePort_(e))
  }, 0)
}, u2f.WrappedChromeRuntimePort_ = function (t) {
  this.port_ = t
}, u2f.WrappedChromeRuntimePort_.prototype.postMessage = function (t) {
  this.port_.postMessage(t)
}, u2f.WrappedChromeRuntimePort_.prototype.addEventListener = function (t, e) {
  var n = t.toLowerCase();
  "message" == n || "onmessage" == n ? this.port_.onMessage.addListener(function (t) {
    e({data: t})
  }) : console.error("WrappedChromeRuntimePort only supports onMessage")
}, u2f.EXTENSION_TIMEOUT_SEC = 30, u2f.port_ = null, u2f.waitingForPort_ = [], u2f.reqCounter_ = 0, u2f.callbackMap_ = {}, u2f.getPortSingleton_ = function (t) {
  u2f.port_ ? t(u2f.port_) : (0 == u2f.waitingForPort_.length && u2f.getMessagePort(function (t) {
    for (u2f.port_ = t, u2f.port_.addEventListener("message", u2f.responseHandler_); u2f.waitingForPort_.length;)u2f.waitingForPort_.shift()(u2f.port_)
  }), u2f.waitingForPort_.push(t))
}, u2f.responseHandler_ = function (t) {
  var e = t.data, n = e.requestId;
  if (!n || !u2f.callbackMap_[n])return void console.error("Unknown or missing requestId in response.");
  var i = u2f.callbackMap_[n];
  delete u2f.callbackMap_[n], i(e.responseData)
}, u2f.sign = function (t, e, n) {
  u2f.getPortSingleton_(function (i) {
    var r = ++u2f.reqCounter_;
    u2f.callbackMap_[r] = e;
    var s = {type: u2f.MessageTypes.U2F_SIGN_REQUEST, signRequests: t, timeoutSeconds: "undefined" != typeof n ? n : u2f.EXTENSION_TIMEOUT_SEC, requestId: r};
    i.postMessage(s)
  })
}, u2f.register = function (t, e, n, i) {
  u2f.getPortSingleton_(function (r) {
    var s = ++u2f.reqCounter_;
    u2f.callbackMap_[s] = n;
    var o = {type: u2f.MessageTypes.U2F_REGISTER_REQUEST, signRequests: e, registerRequests: t, timeoutSeconds: "undefined" != typeof i ? i : u2f.EXTENSION_TIMEOUT_SEC, requestId: s};
    r.postMessage(o)
  })
}, function () {
  var t, e, n = [].slice;
  GitHub.support.u2f && (t = function () {
    var t;
    return t = 1 <= arguments.length ? n.call(arguments, 0) : [], new Promise(function (e, i) {
      return u2f.sign.apply(u2f, n.call(t).concat([function (t) {
        var n;
        return null != t.errorCode ? (n = new Error("Signing request failed"), n.code = t.errorCode, i(n)) : e(t)
      }]))
    })
  }, e = function () {
    var e, n, i, r, s, o, a;
    for (s = document.querySelectorAll(".js-u2f-error"), i = 0, r = s.length; r > i; i++)e = s[i], e.classList.add("hidden");
    return document.querySelector(".js-u2f-login-waiting").classList.remove("hidden"), n = document.querySelector(".js-u2f-auth-form"), o = n.querySelector(".js-u2f-auth-response"), a = JSON.parse(n.getAttribute("data-sign-requests")), t(a).then(function (t) {
      return o.value = JSON.stringify(t), n.submit()
    })["catch"](function (t) {
      var e;
      return e = function () {
        switch (t.code) {
          case 4:
            return".js-u2f-auth-not-registered-error";
          case 5:
            return".js-u2f-auth-timeout";
          default:
            return".js-u2f-auth-error"
        }
      }(), document.querySelector(e).classList.remove("hidden"), document.querySelector(".js-u2f-login-waiting").classList.add("hidden")
    })
  }, $(document).on("click", ".js-u2f-auth-retry", function () {
    e()
  }), $.observe(".js-u2f-auth-form", function () {
    e()
  }))
}.call(this), function () {
  var t, e, n, i, r, s, o, a, c, u, l, d = [].slice;
  c = function () {
    var t;
    return t = 1 <= arguments.length ? d.call(arguments, 0) : [], new Promise(function (e, n) {
      return u2f.register.apply(u2f, d.call(t).concat([function (t) {
        var i;
        return null != t.errorCode ? (i = new Error("Device registration failed"), i.code = t.errorCode, n(i)) : e(t)
      }]))
    })
  }, (e = document.querySelector(".js-u2f-box")) && (e.classList.toggle("available", GitHub.support.u2f), i = function (t, e, n) {
    return null != n ? t.setAttribute(e, JSON.stringify(n)) : JSON.parse(t.getAttribute(e))
  }, a = function (t) {
    var e;
    return e = document.querySelector(".js-add-u2f-registration-form"), i(e, "data-sign-requests", t)
  }, r = function (t) {
    var e;
    return e = document.querySelector(".js-add-u2f-registration-form"), i(e, "data-register-requests", t)
  }, u = function (t) {
    return t.register_requests && r(t.register_requests), t.sign_requests ? a(t.sign_requests) : void 0
  }, $(document).on("ajaxBeforeSend", ".js-u2f-registration-delete", function () {
    return this.closest(".js-u2f-registration").classList.add("is-sending")
  }), $(document).on("ajaxSuccess", ".js-u2f-registration-delete", function (t, e) {
    return u(e.responseJSON), this.closest(".js-u2f-registration").remove()
  }), $(document).on("click", ".js-add-u2f-registration-link", function (t) {
    var e, n;
    return e = document.querySelector(".js-new-u2f-registration"), e.classList.add("is-active"), e.classList.remove("is-showing-error"), n = document.querySelector(".js-u2f-registration-nickname-field"), n.focus()
  }), t = function (t) {
    var n;
    return e = document.createElement("div"), e.innerHTML = t, n = e.firstChild, document.querySelector(".js-u2f-registrations").appendChild(n)
  }, n = function (t, e) {
    var n, i, r, s, o;
    for (s = document.querySelector(".js-new-u2f-registration"), s.classList.add("is-showing-error"), s.classList.remove("is-sending"), o = s.querySelectorAll(".js-u2f-error"), i = 0, r = o.length; r > i; i++)n = o[i], n.classList.add("hidden");
    return n = s.querySelector(t), null != e && (n.textContent = e), n.classList.remove("hidden")
  }, s = function () {
    var t;
    return t = document.querySelector(".js-new-u2f-registration"), t.classList.remove("is-sending", "is-active"), document.querySelector(".js-u2f-registration-nickname-field").value = ""
  }, o = function (e) {
    var i;
    return i = document.querySelector(".js-add-u2f-registration-form"), i.elements.response.value = JSON.stringify(e), $.fetchJSON(i.action, {method: i.method, body: new FormData(i)}).then(function (e) {
      return u(e), s(), t(e.registration)
    })["catch"](function (t) {
      return null != t.response ? t.response.json().then(function (t) {
        return u(t), n(".js-u2f-server-error", t.error)
      }) : n(".js-u2f-network-error")
    })
  }, l = function () {
    var t;
    return t = document.querySelector(".js-new-u2f-registration"), t.classList.add("is-sending"), t.classList.remove("is-showing-error"), c(r(), a()).then(o)["catch"](function (t) {
      var e;
      return e = function () {
        switch (t.code) {
          case 4:
            return".js-u2f-registered-error";
          case 5:
            return".js-u2f-timeout-error";
          default:
            return".js-u2f-other-error"
        }
      }(), n(e)
    })
  }, $(document).on("click", ".js-u2f-register-retry", function () {
    l()
  }), $(document).on("submit", ".js-add-u2f-registration-form", function (t) {
    return t.preventDefault(), l()
  }))
}.call(this), function () {
  $(document).on("ajaxSuccess", ".js-user-sessions-revoke", function () {
    return this.closest("li").remove()
  })
}.call(this), function () {
  var t;
  t = function (t) {
    var e, n, i, r;
    n = t.selectors;
    for (i in n)r = n[i], $(i).text(r);
    return e = 100 === t.filled_seats_percent, $(".js-live-update-seats-percent").css("width", t.filled_seats_percent + "%"), $(".js-need-more-seats").toggleClass("hidden", !e), $(".js-add-team-member-or-repo-form").toggleClass("hidden", e)
  }, $(document).on("ajaxSuccess", ".js-add-team-member-or-repo-form, .js-org-list-item .js-org-remove-item", function (e, n) {
    return t(JSON.parse(n.responseText))
  })
}.call(this), function () {
  var t, e, n, i, r, s, o;
  $.support.pjax && (e = null, r = "last_pjax_request", s = "pjax_start", i = "pjax_end", n = function (t) {
    var n, i;
    (i = null != (n = t.relatedTarget) ? n.href : void 0) && (window.performance.mark(s), e = i)
  }, o = function () {
    setImmediate(function () {
      var n, o, a;
      if (window.performance.getEntriesByName(s).length && (window.performance.mark(i), window.performance.measure(r, s, i), o = window.performance.getEntriesByName(r), n = null != (a = o.pop()) ? a.duration : void 0))return GitHub.stats({pjax: {url: e, ms: Math.round(n)}}), t()
    })
  }, t = function () {
    window.performance.clearMarks(s), window.performance.clearMarks(i), window.performance.clearMeasures(r)
  }, $(document).on("pjax:start", n), $(document).on("pjax:end", o))
}.call(this), function () {
  $(document).on("click", ".js-rich-diff.collapsed .js-expandable", function (t) {
    return t.preventDefault(), $(t.target).closest(".js-rich-diff").removeClass("collapsed")
  }), $(document).on("click", ".js-show-rich-diff", function (t) {
    return t.preventDefault(), $(this).closest(".js-warn-no-visible-changes").addClass("hidden").hide().siblings(".js-no-rich-changes").removeClass("hidden").show()
  })
}.call(this), function () {
  var t, e, n, i, r, s, o;
  e = function () {
    return $(".user-interests-item").not(".hidden").length
  }, s = function () {
    return 0 === e() ? ($(".recommendations-outro").fadeOut(100), $(".recommendations-intro").fadeIn(100)) : ($(".recommendations-intro").fadeOut(100), $(".recommendations-outro").fadeIn(100))
  }, o = function () {
    var t, n;
    return t = e(), n = function () {
      switch (!1) {
        case 0 !== t:
          return"Which programming languages, frameworks, topics, etc.?";
        case 1 !== t:
          return"Awesome! What else?";
        case 2 !== t:
          return"Excellent \u2013 let's keep going!";
        case 3 !== t:
          return"These are great. Anything else?";
        case 4 !== t:
          return"Great! Maybe one more?"
      }
    }(), 5 === t ? ($(".js-user-recommendations-form").delay(500).hide(), $(".js-recommendations-complete").delay(500).show()) : $(".js-recommendations-complete").visible() && ($(".js-user-recommendations-form").show(), $(".js-recommendations-complete").hide()), $(".js-user-interests-input").attr("placeholder", n), s()
  }, r = null, t = function (t, e, s) {
    var a, c, u, l, d;
    return c = document.querySelector(".js-user-recommendations-form"), u = c.querySelector(".js-user-interests-input"), t = t.trim(), $(".js-button-skip").hide(), u.value = "", null == r && (r = $(".js-user-interests-item.hidden").remove().removeClass("hidden")[0]), l = r.cloneNode(!0), l.title = t, l.insertBefore(document.createTextNode(t), l.firstChild), $(".js-user-interests-list").append(l), l = $(l), d = l.offset(), a = Math.abs(s - d.left), l.css("position", "absolute").css("top", e).css("left", s).fadeIn(100).animate({top: d.top, left: d.left - 8}, {duration: 300 + .2 * a, specialEasing: {top: "easeInBack"}, complete: function () {
      return $(this).css("position", "relative"), $(this).css("top", 0), $(this).css("left", 0), u.value = t, i(c).then(function () {
        return n()
      }), u.value = ""
    }}), o()
  }, $.easing.easeInBack = function (t, e, n, i, r, s) {
    return void 0 === s && (s = 3.70158), i * (e /= r) * e * ((s + 1) * e - s) + n
  }, n = function () {
    return $.pjax({url: "/recommendations", container: "#js-pjax-container"})
  }, $(document).on("pjax:complete", function () {
    return o()
  }), $(function () {
    return $(".user-interests-item").length ? o() : void 0
  }), $(document).on("submit", ".js-user-recommendations-form", function (e) {
    var n, i, r, s, o;
    return e.preventDefault(), n = this.querySelector(".js-user-interests-input"), i = n.value, s = $(n).offset(), o = s.top, r = s.left, t(i, o, r)
  }), $(document).on("click", ".js-interest-option", function (e) {
    var n, i, r, s, o;
    return e.preventDefault(), s = this, n = s.getAttribute("data-name"), r = $(s).offset(), o = r.top - $(s).height() / 2, i = r.left - $(s).width() / 2, t(n, o, i)
  }), $(document).on("submit", ".js-remove-user-interest-form", function (t) {
    return t.preventDefault(), i(this).then(function () {
      return n()
    })
  }), $(document).onFocusedKeydown(".js-user-interests-input", function () {
    return function (t) {
      return"," === t.hotkey && ($(".js-user-recommendations-form").trigger("submit"), t.preventDefault()), "" === $(this).val() && "space" === t.hotkey ? t.preventDefault() : void 0
    }
  }), i = function (t) {
    return $.fetch(t.getAttribute("action"), {method: t.getAttribute("method"), body: $.param($(t).serializeArray()), headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}})
  }
}.call(this), function () {
  var t, e, n, i, r, s, o, a, c;
  a = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"].reduce(function (t, e) {
    return t + " " + e
  }), o = function (t) {
    var e;
    return e = t.data("timing"), null != e ? (e.load = e.hello = null, e.helloTimer && (clearTimeout(e.helloTimer), e.helloTimer = null), e.loadTimer ? (clearTimeout(e.loadTimer), e.loadTimer = null) : void 0) : void 0
  }, i = function (t) {
    var e, n, i;
    if (!t.data("timing"))return e = 10, n = 45, i = {load: null, hello: null, helloTimer: null, loadTimer: null}, i.load = Date.now(), i.helloTimer = setTimeout(c(t, function () {
      return!i.hello
    }), 1e3 * e), i.loadTimer = setTimeout(c(t), 1e3 * n), t.data("timing", i)
  }, s = function (t) {
    return t.addClass("is-render-requested")
  }, r = function (t) {
    return t.removeClass(a), t.addClass("is-render-failed"), o(t)
  }, c = function (t, e) {
    return null == e && (e = function () {
      return!0
    }), function () {
      var n, i;
      return n = function () {
        try {
          return t.is($.visible)
        } catch (e) {
          return t.visible().length > 0
        }
      }(), !n || t.hasClass("is-render-ready") || t.hasClass("is-render-failed") || t.hasClass("is-render-failed-fatally") || !e() ? void 0 : (i = t.data("timing")) ? (console.error("Render timeout: " + JSON.stringify(i) + " Now: " + Date.now()), r(t)) : console.error("No timing data on $:", t)
    }
  }, t = function (t) {
    var e, n;
    e = $(t || this), (null != (n = e.data("timing")) ? n.load : 0) || (o(e), i(e), e.addClass("is-render-automatic"), s(e))
  }, null != $.observe ? $.observe(".js-render-target", t) : $(function () {
    return $.each($(".js-render-target"), function (e, n) {
      return t(n)
    })
  }), e = function (t) {
    var e;
    return e = ".js-render-target", t ? $(e + "[data-identity='" + t + "']") : $(e)
  }, $(window).on("message", function (t) {
    var i, r, s, o, a, c, u, l, d, h;
    return l = null != (u = t.originalEvent) ? u : t, s = l.data, a = l.origin, s && a && (d = function () {
      var e;
      try {
        return JSON.parse(s)
      } catch (e) {
        return t = e, s
      }
    }(), h = d.type, o = d.identity, r = d.body, c = d.payload, h && r && 1 === (i = e(o)).length && a === i.attr("data-host") && "render" === h) ? n(i, h, o, r, c) : void 0
  }), n = function (t, e, n, i, s) {
    var o, c, u, l, d, h;
    switch (i) {
      case"hello":
        if (d = t.data("timing") || {untimed: !0}, d.hello = Date.now(), o = {type: "render:cmd", body: {cmd: "ack", ack: !0}}, u = {type: "render:cmd", body: {cmd: "branding", branding: !1}}, h = null != (l = t.find("iframe").get(0)) ? l.contentWindow : void 0, "function" == typeof h.postMessage && h.postMessage(JSON.stringify(o), "*"), "function" == typeof h.postMessage && h.postMessage(JSON.stringify(u), "*"), t.hasClass("is-local"))return c = t.parents(".js-code-editor").data("code-editor"), u = {type: "render:data", body: c.code()}, "function" == typeof h.postMessage ? h.postMessage(JSON.stringify(u), "*") : void 0;
        break;
      case"error":
        return r(t);
      case"error:fatal":
        return r(t), t.addClass("is-render-failed-fatal");
      case"error:invalid":
        return r(t, "invalid"), t.addClass("is-render-failed-invalid");
      case"loading":
        return t.removeClass(a), t.addClass("is-render-loading");
      case"loaded":
        return t.removeClass(a), t.addClass("is-render-loaded");
      case"ready":
        if (t.removeClass(a), t.addClass("is-render-ready"), null != (null != s ? s.height : void 0))return t.height(s.height);
        break;
      case"resize":
        return null != (null != s ? s.height : void 0) && t.hasClass("is-render-ready") ? t.height(s.height) : console.error("Resize event sent without height or before ready");
      default:
        return console.error("Unknown message [" + e + "]=>'" + i + "'")
    }
  }
}.call(this), function () {
  $(document).on("click", ".js-toggle-lang-stats", function (t) {
    var e, n;
    return n = document.querySelector(".js-stats-switcher-viewport"), e = 0 !== n.scrollTop ? "is-revealing-overview" : "is-revealing-lang-stats", n.classList.toggle(e), t.preventDefault()
  })
}.call(this), function () {
  var t, e, n, i, r, s;
  s = function (t, e) {
    var n;
    return n = e.querySelector(".js-repo-access-error"), n.textContent = t, n.classList.remove("hidden")
  }, i = function () {
    var t, e, n, i, r;
    for (i = document.querySelectorAll(".js-repo-access-error"), r = [], e = 0, n = i.length; n > e; e++)t = i[e], t.textContent = "", r.push(t.classList.add("hidden"));
    return r
  }, t = function (t) {
    return t.classList.toggle("is-empty", !t.querySelector(".js-repo-access-entry"))
  }, r = function () {
    var t;
    (t = document.getElementById("collaborators")) && (t.querySelector(".js-add-new-collab").disabled = !0, $(t.querySelector(".js-add-repo-access-field")).data("autocompleted"))
  }, $.observe(".js-add-new-collab", r), e = function (t) {
    var e, n, i, r, s, o, a;
    if (o = document.querySelector(".js-repo-access-team-select")) {
      for (a = 0, s = o.querySelectorAll(".js-repo-access-team-select-option"), e = 0, r = s.length; r > e; e++)n = s[e], i = n.classList, t === n.getAttribute("data-team-id") && (i.add("has-access"), i.remove("selected")), i.contains("has-access") || a++;
      if (0 === a)return o.closest(".js-repo-access-group").classList.add("no-form")
    }
  }, n = function (t) {
    var e, n;
    return(n = document.querySelector(".js-repo-access-team-select")) ? (null != (e = n.querySelector("[data-team-id='" + t + "']")) && e.classList.remove("has-access"), n.closest(".js-repo-access-group").classList.remove("no-form")) : void 0
  }, $(document).on("autocomplete:autocompleted:changed", ".js-add-repo-access-field", function () {
    return $(this).data("autocompleted") ? this.form.querySelector(".js-add-new-collab").disabled = !1 : r()
  }), $(document).on("selectmenu:selected", ".js-repo-access-team-select", function () {
    var t, e;
    return t = this.querySelector(".js-repo-access-team-select-option.selected").getAttribute("data-team-id"), e = this.closest(".js-repo-access-group").querySelector(".js-add-repo-access-field"), e.value = t, $(e.form).submit()
  }), $(document).on("ajaxBeforeSend", ".js-add-repo-access-form", function (t, e) {
    var n, r;
    return i(), r = this.closest(".js-repo-access-group"), n = this.querySelector(".js-add-repo-access-field"), "collaborators" !== r.id || $(n).data("autocompleted") ? void 0 : !1
  }), $(document).on("ajaxSuccess", ".js-add-repo-access-form", function (n, i, o, a) {
    var c, u, l, d;
    return u = this.closest(".js-repo-access-group"), c = this.querySelector(".js-add-repo-access-field"), l = u.querySelector(".js-repo-access-list"), d = c.value, c.value = "", a.error ? s(a.error, u) : (r(), l.insertAdjacentHTML("beforeend", a.html), t(u), "teams" === u.id ? e(d) : void 0)
  }), $(document).on("ajaxSuccess", ".js-remove-repo-access-form", function () {
    var e, r;
    return i(), e = this.closest(".js-repo-access-entry"), r = this.closest(".js-repo-access-group"), "teams" === r.id && n(e.getAttribute("data-team-id")), e.remove(), t(r)
  }), $(document).on("ajaxError", ".js-remove-repo-access-form", function () {
    return s(this.getAttribute("data-error-message"), this.closest(".js-repo-access-group")), !1
  })
}.call(this), function () {
  $(document).on("change", ".js-default-branch", function () {
    var t, e;
    return e = document.querySelector(".js-default-branch-confirmation"), t = document.querySelector(".js-change-default-branch-button"), t.classList.toggle("disabled", this.value === e.getAttribute("data-original-value")), e.value = this.value
  }), $(document).on("change", ".js-repo-features-form input[type=checkbox]", function () {
    var t;
    return t = this.closest(".js-repo-option").querySelector(".js-status-indicator"), t.classList.remove("status-indicator-success", "status-indicator-failed"), t.classList.add("status-indicator-loading")
  }), $(document).on("ajaxSuccess", ".js-repo-features-form", function (t, e, n, i) {
    var r, s, o, a;
    for (a = this.querySelectorAll(".status-indicator-loading"), s = 0, o = a.length; o > s; s++)r = a[s], r.classList.remove("status-indicator-loading"), r.classList.add("status-indicator-success");
    return/^\s*</.test(i) ? $(document.querySelector(".js-repo-nav")).replaceWith(i) : void 0
  }), $(document).on("ajaxError", ".js-repo-features-form", function () {
    var t, e, n, i, r, s;
    for (r = this.querySelectorAll(".status-indicator-loading"), s = [], n = 0, i = r.length; i > n; n++)e = r[n], e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-failed"), t = e.closest(".js-repo-option").querySelector("input[type=checkbox]"), s.push(t.checked = !t.checked);
    return s
  }), $(document).on("change", ".js-protect-branch", function () {
    var t, e, n, i, r, s;
    for (t = this.checked, document.querySelector(".js-protected-branch-options").classList.toggle("active", t), r = document.querySelectorAll(".js-protected-branch-option"), s = [], e = 0, i = r.length; i > e; e++)n = r[e], t ? s.push(n.removeAttribute("disabled")) : s.push(n.setAttribute("disabled", "disabled"));
    return s
  }), $(document).on("change", ".js-required-status-toggle", function () {
    return document.querySelector(".js-required-statuses").classList.toggle("hidden", !this.checked)
  }), $(document).on("change", ".js-required-status-checkbox", function () {
    var t;
    return t = this.closest(".js-protected-branches-item"), t.querySelector(".js-required-status-badge").classList.toggle("hidden", !this.checked)
  })
}.call(this), function () {
  var t, e, n;
  n = function (t) {
    var e, n, i;
    return e = $("meta[name=hostname]").attr("content"), n = null != e ? e.split(".") : void 0, i = t.split("."), null != n && n.slice(-2).join(".") !== i.slice(-2).join(".")
  }, e = "true" === $("meta[name=is-dotcom]").attr("content"), window.isProxySite = function () {
    return n(window.location.hostname) && e
  }, window.isProxySite() && (t = new Error("Potential Proxy site detected"), t.forceReport = !0, t.failbotContext = {url: window.location.href}, setImmediate(function () {
    throw t
  }))
}.call(this), function () {
  var t, e, n, i, r;
  e = function () {
    var t;
    return document.getElementById("js-sudo-prompt") ? Promise.resolve() : (t = document.querySelector("link[rel=sudo-modal]")) ? $.fetch(t.href).then(function (t) {
      return t.text()
    }).then(function (t) {
      return document.body.insertAdjacentHTML("beforeend", t)
    }) : Promise.reject()
  }, t = function () {
    return $.fetch("/sessions/in_sudo.json").then(function (t) {
      return t.json()
    })
  }, r = function () {
    return e().then(function () {
      return $.facebox({div: "#js-sudo-prompt"}, "sudo")
    }).then(function (t) {
      return new Promise(function (e, n) {
        var i, r;
        return r = null, i = $(t).find(".js-sudo-form"), i.find(".js-sudo-login, .js-sudo-password").first().focus(), i.on("ajaxSuccess", function () {
          return r = !0, $(document).trigger("close.facebox")
        }), i.on("ajaxError", function () {
          return r = !1, $(this).find(".js-sudo-error").text("Incorrect Password.").show(), $(this).find(".js-sudo-password").val(""), !1
        }), $(document).one("afterClose.facebox", function () {
          return r ? e(!0) : n(new Error("sudo prompt canceled"))
        })
      })
    })
  }, $.sudo = function () {
    return t().then(function (t) {
      return t || r()
    })
  }, i = !1, n = function (t) {
    i || (t.preventDefault(), t.stopImmediatePropagation(), $.sudo().then(function () {
      i = !0, $(t.target)[t.type](), i = !1
    }))
  }, $.observe("a.js-sudo-required", {add: function () {
    return $(this).on("click", n)
  }, remove: function () {
    return $(this).off("click", n)
  }}), $.observe("form.js-sudo-required", {add: function () {
    return $(this).on("submit", n)
  }, remove: function () {
    return $(this).off("submit", n)
  }})
}.call(this), function () {
  $(document).on("submit", ".js-delete-email", function (t) {
    var e;
    t.preventDefault(), e = this, $.sudo().then(function () {
      return $.fetch(e.action, {method: e.method, body: new FormData(e)}).then(function () {
        return e.closest("li").remove()
      })
    })
  }), $(document).on("ajaxSuccess", ".js-toggle-visibility", function (t, e, n, i) {
    return $("#settings-emails").children(".settings-email.primary").toggleClass("private", "private" === i.visibility)
  }), $.observe(".js-email-global-unsubscribe-form", function () {
    this.querySelector(".js-email-global-unsubscribe-submit").disabled = !0
  }), $(document).on("change", ".js-email-global-unsubscribe-form", function () {
    var t, e;
    return t = function () {
      var t, n, i, r;
      for (i = this.querySelectorAll(".js-email-global-unsubscribe"), r = [], t = 0, n = i.length; n > t; t++)e = i[t], e.checked && r.push(e);
      return r
    }.call(this), this.querySelector(".js-email-global-unsubscribe-submit").disabled = t[0].defaultChecked
  }), $(document).on("ajaxSend", ".js-remove-key", function (t) {
    return $(this).addClass("disabled").find("span").text("Deleting\u2026")
  }), $(document).on("ajaxError", ".js-remove-key", function (t) {
    return $(this).removeClass("disabled").find("span").text("Error. Try again.")
  }), $(document).on("ajaxSuccess", ".js-remove-key", function (t) {
    return $(this).parents("li").remove(), 0 === $(".js-ssh-keys-box li").length ? $(".js-no-ssh-keys").show() : void 0
  }), $(document).on("ajaxSuccess", ".js-leave-collaborated-repo", function (t) {
    var e, n;
    e = t.target.getAttribute("data-repo-id"), n = document.querySelector(".js-collab-repo[data-repo-id='" + e + "']"), n.remove(), $.facebox.close()
  }), $(document).on("ajaxSuccess", ".js-newsletter-unsubscribe-form", function () {
    var t, e, n, i, r;
    for (i = document.querySelectorAll(".js-newsletter-unsubscribe-message"), r = [], e = 0, n = i.length; n > e; e++)t = i[e], r.push(t.classList.toggle("hidden"));
    return r
  }), $(document).on("click", ".js-show-new-ssh-key-form", function () {
    return $(".js-new-ssh-key-box").toggle().find(".js-ssh-key-title").focus(), !1
  }), $(document).on("ajaxSuccess", ".js-revoke-access-form", function () {
    var t, e, n;
    t = this.getAttribute("data-id"), n = this.getAttribute("data-type-name"), e = document.querySelector(".js-revoke-item[data-type='" + n + "'][data-id='" + t + "']"), $.facebox.close(), e.remove(), e.classList.contains("new-token") && document.querySelector(".js-flash-new-token").remove()
  }), $(document).on("click", ".js-delete-oauth-application-image", function () {
    var t, e, n;
    return t = $(this).closest(".js-uploadable-container"), t.removeClass("has-uploaded-logo"), e = t.find("img.js-image-field"), n = t.find("input.js-oauth-application-logo-id"), e.attr("src", ""), n.val(""), !1
  }), $(document).on("click", ".js-new-callback", function (t) {
    var e, n;
    return t.preventDefault(), e = $(t.currentTarget).closest(".js-callback-urls"), n = e.find(".js-callback-url").first().clone(), n.removeClass("is-default-callback"), n.find("input").val(""), e.addClass("has-many"), $(t.currentTarget).before(n)
  }), $(document).on("click", ".js-delete-callback", function (t) {
    var e, n;
    return t.preventDefault(), e = $(t.currentTarget).closest(".js-callback-urls"), $(t.currentTarget).closest(".js-callback-url").remove(), n = e.find(".js-callback-url"), n.length <= 1 ? e.removeClass("has-many") : void 0
  }), $(document).on("click", ".js-oauth-application-whitelist .js-deny-this-request", function (t) {
    return $(t.currentTarget).siblings("#state").val("denied"), $(t.currentTarget).closest(".js-org-application-access-form").submit()
  }), $(document).on("ajaxSuccess", ".js-org-application-access-form", function (t, e, n, i) {
    return window.location.reload()
  }), $(document).on("click", ".js-user-rename-warning-continue", function () {
    var t, e, n, i, r;
    for (i = document.querySelectorAll(".js-user-rename-warning, .js-user-rename-form"), r = [], e = 0, n = i.length; n > e; e++)t = i[e], r.push(t.classList.toggle("hidden"));
    return r
  })
}.call(this), function () {
  $(function () {
    return $(".js-email-notice-trigger").focus(function () {
      return $(".js-email-notice").addClass("notice-highlight")
    }), $(".js-email-notice-trigger").blur(function () {
      return $(".js-email-notice").removeClass("notice-highlight")
    })
  }), $.observe(".js-plan-choice:checked", {add: function () {
    return $(this).closest(".plan-row").addClass("selected")
  }, remove: function () {
    return $(this).closest(".plan-row").removeClass("selected")
  }}), $.observe(".js-plan-row.selected", {add: function () {
    var t;
    return t = $(this).find(".js-choose-button"), t.text(t.attr("data-selected-text"))
  }, remove: function () {
    var t;
    return t = $(this).find(".js-choose-button"), t.text(t.attr("data-default-text"))
  }}), $.observe(".js-plan-row.free-plan.selected", {add: function () {
    var t;
    return t = $("#js-signup-billing-fields"), t.data("contents", t.contents().detach())
  }, remove: function () {
    var t, e;
    return t = $("#js-signup-billing-fields"), e = t.data("contents"), t.append(e)
  }}), $.observe(".js-setup-organization:checked", {add: function () {
    var t;
    return t = $(".js-choose-plan-submit"), t.attr("data-default-text") || t.attr("data-default-text", t.text()), t.text(t.attr("data-org-text"))
  }, remove: function () {
    var t;
    return t = $(".js-choose-plan-submit"), t.text(t.attr("data-default-text"))
  }})
}.call(this), function () {
  $.observe(".js-site-status-container", function () {
    var t, e, n, i, r;
    r = this, e = r.querySelector(".js-site-status-message"), n = r.querySelector(".js-site-status-time"), t = r.querySelector(".flash"), i = document.querySelector("meta[name=site-status-api-url]").content, fetch(i).then(function (t) {
      return t.json()
    }).then(function (i) {
      var s;
      return null != i.status && "good" !== i.status ? (e.textContent = i.body, n.setAttribute("datetime", i.created_on), s = "major" === i.status ? "error" : "warn", t.classList.add("flash-" + s), r.classList.remove("hidden")) : void 0
    })
  })
}.call(this), function () {
  var t, e, n;
  if (n = null != (e = document.querySelector("meta[name=user-login]")) ? e.content : void 0, null != n) {
    t = String(!!n.length);
    try {
      localStorage.setItem("logged-in", t)
    } catch (i) {
      return
    }
    window.addEventListener("storage", function (e) {
      var n;
      if (e.storageArea === localStorage && "logged-in" === e.key && e.newValue !== t)return t = e.newValue, n = document.querySelector(".js-stale-session-flash"), n.classList.toggle("is-signed-in", "true" === t), n.classList.toggle("is-signed-out", "false" === t), n.classList.remove("hidden"), $.pjax.disable(), $(window).on("popstate", function (t) {
        return null != t.state.container ? location.reload() : void 0
      }), $(document).on("submit", "form", function (t) {
        return t.preventDefault()
      })
    })
  }
}.call(this), function () {
  !$.support.pjax || location.search || location.hash || $(function () {
    var t, e, n;
    return t = null != (e = document.getElementById("issues-dashboard")) ? e : document.getElementById("issues_list"), (n = $(t).attr("data-url")) ? window.history.replaceState(null, document.title, n) : void 0
  })
}.call(this), function () {
  var t;
  t = function () {
    var t, e, n;
    if (location.hash && !document.querySelector(":target")) {
      try {
        t = decodeURIComponent(location.hash.slice(1))
      } catch (i) {
        return
      }
      e = "user-content-" + t, n = document.getElementById(e) || document.getElementsByName(e)[0], null != n && n.scrollIntoView()
    }
  }, window.addEventListener("hashchange", t), $(t), $(document).on("pjax:success", t)
}.call(this), $(function () {
  function t() {
    var n = $("#current-version").val();
    n && $.fetchText("_current").then(function (i) {
      n == i ? setTimeout(t, 5e3) : e || ($("#gollum-error-message").text("Someone has edited the wiki since you started. Please reload this page and re-apply your changes."), $("#gollum-error-message").show(), $("#gollum-editor-submit").attr("disabled", "disabled"), $("#gollum-editor-submit").attr("value", "Cannot Save, Someone Else Has Edited"))
    })
  }

  var e = !1;
  $("#gollum-editor-body").each(t), $("#gollum-editor-submit").click(function () {
    e = !0
  })
}), function () {
}.call(this);
