/**
 * Created by Administrator on 2015/4/17 0017.
 */
function csMenu(_object, _menu) {
  this.IEventHander = null;
  this.IFrameHander = null;
  this.IContextMenuHander = null;

  this.Show = function (_menu) {
    var e = window.event || event;
    if (e.button == 2) {
      if (window.document.all) {
        this.IContextMenuHander = function () {
          return false;
        };
        document.attachEvent("oncontextmenu", this.IContextMenuHander);
      }
      else {
        this.IContextMenuHander = document.oncontextmenu;
        document.oncontextmenu = function () {
          return false;
        };
      }

      window.csMenu$Object = this;
      this.IEventHander = function () {
        window.csMenu$Object.Hide(_menu);
      };

      if (window.document.all)
        document.attachEvent("onmousedown", this.IEventHander);
      else
        document.addEventListener("mousedown", this.IEventHander, false);

      _menu.style.left = e.clientX;
      _menu.style.top = e.clientY;
      _menu.style.display = "";

      if (this.IFrameHander) {
        var _iframe = document.getElementById(this.IFrameHander);
        _iframe.style.left = e.clientX;
        _iframe.style.top = e.clientY;
        _iframe.style.height = _menu.offsetHeight;
        _iframe.style.width = _menu.offsetWidth;
        _iframe.style.display = "";
      }
    }
  };

  this.Hide = function (_menu) {
    var e = window.event || event;
    var _element = e.srcElement;
    do
    {
      if (_element == _menu) {
        return false;
      }
    }
    while ((_element = _element.offsetParent));

    if (window.document.all)
      document.detachEvent("on" + e.type, this.IEventHander);
    else
      document.removeEventListener(e.type, this.IEventHander, false);

    if (this.IFrameHander) {
      var _iframe = document.getElementById(this.IFrameHander);
      _iframe.style.display = "none";
    }

    _menu.style.display = "none";

    if (window.document.all)
      document.detachEvent("oncontextmenu", this.IContextMenuHander);
    else
      document.oncontextmenu = this.IContextMenuHander;
  };

  this.initialize = function (_object, _menu) {
    window._csMenu$Object = this;
    var _eventHander = function () {
      window._csMenu$Object.Show(_menu);
    };

    _menu.style.position = "absolute";
    _menu.style.display = "none";
    _menu.style.zIndex = "1000000";

    if (window.document.all) {
      var _iframe = document.createElement('iframe');
      document.body.insertBefore(_iframe, document.body.firstChild);
      _iframe.id = _menu.id + "_iframe";
      this.IFrameHander = _iframe.id;

      _iframe.style.position = "absolute";
      _iframe.style.display = "none";
      _iframe.style.zIndex = "999999";
      _iframe.style.border = "0px";
      _iframe.style.height = "0px";
      _iframe.style.width = "0px";

      _object.attachEvent("onmouseup", _eventHander);
    }
    else {
      _object.addEventListener("mouseup", _eventHander, false);
    }
  };

  this.initialize(_object, _menu);
}