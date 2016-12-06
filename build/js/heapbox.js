"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (e, t, n, r) {
  var _o$prototype;

  function o(t, n) {
    this.element = t;this.options = e.extend({}, s, n);this._defaults = s;this._name = i;this.instance;this.callbackManager = new Array();this.elem_isVisible = "";this.init();
  }var i = "heapbox",
      s = { effect: { type: "slide", speed: "slow" }, insert: "before", heapsize: r, emptyMessage: "Empty", tabindex: "undefined", title: r, showFirst: true, inheritVisibility: true, openStart: function openStart() {}, openComplete: function openComplete() {}, closeStart: function closeStart() {}, closeComplete: function closeComplete() {}, onChange: function onChange() {} };o.prototype = (_o$prototype = { init: function init() {
      this._hideSourceElement();this._isSourceSelectbox();this.instance = this.createInstance();this._createElements();this._setDefaultValues();
    }, createInstance: function createInstance() {
      return { heapId: e(this.element).attr("id") || Math.round(Math.random() * 99999999), state: false };
    }, _setEvents: function _setEvents() {
      var t = this;this._setControlsEvents();e(n).on("click", "html", function (e) {
        e.stopPropagation();t._closeheap(true, function () {}, function () {});
      });
    }, _setSliderEvents: function _setSliderEvents() {
      var t = this;this.scrollingStatus = false;heap = e("#heapbox_" + this.instance.heapId + " .heap");heap.find(".sliderDown").click(function (e) {
        e.preventDefault();e.stopPropagation();t._setHeapboxFocus();
      });heap.find(".sliderDown").mousedown(function (n) {
        t.scrollingStatus = true;t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "down");t.interval = setInterval(function () {
          t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "down");
        }, 300);
      }).mouseup(function (e) {
        clearInterval(t.interval);t.scrollingStatus = false;
      }).mouseout(function (e) {
        clearInterval(t.interval);t.scrollingStatus = false;
      });heap.find(".sliderUp").click(function (e) {
        e.preventDefault();e.stopPropagation();t._setHeapboxFocus();
      });heap.find(".sliderUp").mousedown(function (n) {
        t.scrollingStatus = true;t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "up");t.interval = setInterval(function () {
          t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "up");
        }, 300);
      }).mouseup(function (e) {
        clearInterval(t.interval);t.scrollingStatus = false;
      }).mouseout(function (e) {
        clearInterval(t.interval);t.scrollingStatus = false;
      });
    }, _setViewPosition: function _setViewPosition(t) {
      heap = e("div#heapbox_" + this.instance.heapId + " .heap");heap.show();var n = this;selected = t.find(".heapOptions li a.selected");firstTop = t.find(".heapOptions li a").first().offset().top;actTop = e(selected).offset().top;newTop = firstTop - actTop + this.sliderUpHeight;heapHeight = e("div#heapbox_" + this.instance.heapId + " .heapOptions").height();maxPosition = heapHeight - parseInt(this.options.heapsize, 10) + this.sliderDownHeight;minPosition = 0 + this.sliderUpHeight;if (-1 * newTop > maxPosition) newTop = -1 * maxPosition;t.find(".heapOptions").css("top", newTop);if (!this.instance.state) heap.hide();
    }, _setKeyboardEvents: function _setKeyboardEvents() {
      var t = this;heapbox = e("#heapbox_" + this.instance.heapId);heapbox.keydown(function (n) {
        switch (n.which) {case 13:
            t._handlerClicked();return false;break;case 27:
            t._closeheap();break;case 37:
            t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "up");n.preventDefault();break;case 39:
            t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "down");n.preventDefault();break;case 38:
            t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "up");n.preventDefault();break;case 40:
            t._keyArrowHandler(e("#heapbox_" + t.instance.heapId), "down");n.preventDefault();break;}
      });
    }, _setMouseWheelEvents: function _setMouseWheelEvents() {
      var t = this,
          n = e("div#heapbox_" + this.instance.heapId + " .handler"),
          r = n.find("div.heap");n.on("mousewheel", function (e, t) {
        e.preventDefault();if (t == -1) {
          r.find(".sliderDown").mousedown().mouseup();
        } else {
          r.find(".sliderUp").mousedown().mouseup();
        }
      });
    }, _keyArrowHandler: function _keyArrowHandler(t, n) {
      var r = this;var i = false;t.find("div.heap ul li").each(function () {
        if (e(this).find("a").hasClass("selected")) {
          i = true;selectItem = n == "down" ? r._findNext(e(this)) : r._findPrev(e(this));if (selectItem) {
            r._heapChanged(r, selectItem, true);return false;
          }
        }
      });if (i == false) {
        selectItem = e("div#heapbox_" + r.instance.heapId + " .heapOptions .heapOption").first().find("a").addClass("selected");r._heapChanged(r, selectItem, true);
      }r._setViewPosition(e("#heapbox_" + r.instance.heapId));
    } }, _defineProperty(_o$prototype, "_setMouseWheelEvents", function _setMouseWheelEvents() {
    var t = this,
        n = e("div#heapbox_" + this.instance.heapId),
        r = n.find("div.heap");n.on("mousewheel", function (e, t) {
      e.preventDefault();if (t == -1) {
        r.find(".sliderDown").mousedown().mouseup();
      } else {
        r.find(".sliderUp").mousedown().mouseup();
      }
    });
  }), _defineProperty(_o$prototype, "_findPrev", function _findPrev(e) {
    if (e.prev().length > 0) {
      if (!e.prev().find("a").hasClass("disabled")) {
        return e.prev().find("a");
      } else {
        return this._findPrev(e.prev());
      }
    }
  }), _defineProperty(_o$prototype, "_findNext", function _findNext(e) {
    if (e.next().length > 0) {
      if (!e.next().find("a").hasClass("disabled")) {
        return e.next().find("a");
      } else {
        return this._findNext(e.next());
      }
    }
  }), _defineProperty(_o$prototype, "_createElements", function _createElements() {
    var t = this;heapBoxEl = e("<div/>", { id: "heapbox_" + this.instance.heapId, "class": "heapBox", data: { sourceElement: this.element } });if (t.options.inheritVisibility == true && t.elem_isVisible == false) {
      heapBoxEl.css("display", "none");
    }heapBoxHolderEl = e("<a/>", { href: "", "class": "holder" });heapBoxHandlerEl = e("<a/>", { href: "", "class": "handler" });heapBoxheapEl = e("<div/>", { "class": "heap" });heapBoxEl.append(heapBoxHolderEl);heapBoxEl.append(heapBoxHandlerEl);heapBoxEl.append(heapBoxheapEl);this.heapBoxEl = heapBoxEl;this._insertHeapbox(this.heapBoxEl);
  }), _defineProperty(_o$prototype, "_insertHeapbox", function _insertHeapbox(t) {
    if (this.isSourceElementSelect && this.options.insert == "inside") this.options.insert = "before";switch (this.options.insert) {case "before":
        e(this.element).before(t);break;case "after":
        e(this.element).after(t);break;case "inside":
        e(this.element).html(t);this._showSourceElement();break;default:
        e(this.element).before(t);break;}
  }), _defineProperty(_o$prototype, "_setDefaultValues", function _setDefaultValues() {
    this._initHeap();this._initView(heapBoxEl);this._setHolderTitle();this._setTabindex();this._setEvents();this._handleFirst();
  }), _defineProperty(_o$prototype, "_setHeapboxFocus", function _setHeapboxFocus() {
    heapbox = e("div#heapbox_" + this.instance.heapId + " .handler");heapbox.focus();
  }), _defineProperty(_o$prototype, "_setHeapSize", function _setHeapSize() {
    if (this.options.heapsize) {
      if (heapBoxheapEl.height() < parseInt(this.options.heapsize, 10)) {
        delete this.options.heapsize;return;
      } else {
        heapBoxheapEl.css("height", this.options.heapsize);
      }
    }
  }), _defineProperty(_o$prototype, "_initHeap", function _initHeap() {
    var e;if (this.isSourceElementSelect) {
      e = this._optionsToJson();this._setData(e);
    }
  }), _defineProperty(_o$prototype, "_initView", function _initView(e) {
    if (this._isHeapEmpty()) {
      return;
    } else {
      this._setViewPosition(e);
    }
  }), _defineProperty(_o$prototype, "_handleFirst", function _handleFirst() {
    if (!this.options.showFirst) {
      e("div#heapbox_" + this.instance.heapId + " .heapOptions .heapOption").first().remove();
    }
  }), _defineProperty(_o$prototype, "_setHolderTitle", function _setHolderTitle() {
    var t = this;holderEl = e("#heapbox_" + this.instance.heapId).find(".holder");selectedEl = e("#heapbox_" + this.instance.heapId).find(".heap ul li a.selected").last();if (selectedEl.length != 0) {
      if (this.options.title) {
        holderEl.text(this.options.title);
      } else {
        holderEl.text(selectedEl.text());
      }holderEl.attr("rel", selectedEl.attr("rel"));if (selectedEl.attr("data-icon-src")) {
        iconEl = this._createIconElement(selectedEl.attr("data-icon-src"));holderEl.append(iconEl);
      }
    } else {
      holderEl.text(this.options.emptyMessage);this._removeHeapboxHolderEvents();this._removeHeapboxHandlerEvents();
    }
  }), _defineProperty(_o$prototype, "_setTabindex", function _setTabindex() {
    var t;t = this.options.tabindex != "undefined" ? this.options.tabindex : e(this.element).attr("tabindex");if (t != "undefined") {
      e("#heapbox_" + this.instance.heapId).attr("tabindex", t);
    }
  }), _defineProperty(_o$prototype, "_setData", function _setData(t) {
    var n = this;var r = jQuery.parseJSON(t);var i = false;heapBoxheapOptionsEl = e("<ul/>", { "class": "heapOptions" });e.each(r, function () {
      if (this.selected) {
        i = true;
      }heapBoxOptionLiEl = e("<li/>", { "class": "heapOption" });heapBoxheapOptionAEl = e("<a/>", { href: "", rel: this.value, title: this.text, text: this.text, "class": this.selected ? "selected" : "", click: function click(e) {
          e.preventDefault();e.stopPropagation();n._heapChanged(n, this);
        } });if (this.disabled) {
        heapBoxheapOptionAEl.unbind("click");heapBoxheapOptionAEl.addClass("disabled");heapBoxheapOptionAEl.click(function (e) {
          e.preventDefault();e.stopPropagation();
        });
      }if (this.icon) {
        heapBoxheapOptionAEl.attr("data-icon-src", this.icon);heapBoxOptionIcon = n._createIconElement(this.icon);heapBoxheapOptionAEl.append(heapBoxOptionIcon);
      }heapBoxOptionLiEl.append(heapBoxheapOptionAEl);heapBoxheapOptionsEl.append(heapBoxOptionLiEl);
    });e("div#heapbox_" + this.instance.heapId + " .heap ul").remove();e("div#heapbox_" + this.instance.heapId + " .heap").append(heapBoxheapOptionsEl);this._setHeapSize();if (this._isHeapsizeSet()) {
      this._createSliderUpElement();this._createSliderDownElement();
    }if (i != true) {
      e("div#heapbox_" + this.instance.heapId + " .heap ul li a").first().addClass("selected");
    }
  }), _defineProperty(_o$prototype, "_createSliderUpElement", function _createSliderUpElement() {
    slideUp = e("<a/>", { "class": "sliderUp", href: "" });e("div#heapbox_" + this.instance.heapId + " .heap .heapOptions").before(slideUp);sliderUp = e("#heapbox_" + this.instance.heapId + " .sliderUp");this.sliderUpHeight = parseInt(sliderUp.css("height"), 10) + parseInt(sliderUp.css("border-top-width"), 10) + parseInt(sliderUp.css("border-bottom-width"), 10);e("#heapbox_" + this.instance.heapId + " .heapOptions").css("top", this.sliderUpHeight);
  }), _defineProperty(_o$prototype, "_createSliderDownElement", function _createSliderDownElement() {
    slideDown = e("<a/>", { "class": "sliderDown", href: "" });e("div#heapbox_" + this.instance.heapId + " .heap .heapOptions").after(slideDown);sliderDown = e("#heapbox_" + this.instance.heapId + " .sliderDown");this.sliderDownHeight = parseInt(sliderDown.css("height"), 10) + parseInt(sliderDown.css("border-top-width")) + parseInt(sliderDown.css("border-bottom-width"));
  }), _defineProperty(_o$prototype, "_createIconElement", function _createIconElement(t) {
    heapBoxOptionIcon = e("<img/>", { src: t, alt: t });return heapBoxOptionIcon;
  }), _defineProperty(_o$prototype, "_optionsToJson", function _optionsToJson() {
    var t = [];e(this.element).find("option").each(function () {
      t.push({ value: e(this).attr("value"), text: e(this).text(), icon: e(this).attr("data-icon-src"), disabled: e(this).attr("disabled"), selected: e(this).is(":selected") ? "selected" : "" });
    });var n = JSON.stringify(t);return n;
  }), _defineProperty(_o$prototype, "_heapboxToJson", function _heapboxToJson() {
    var t = [];e("div#heapbox_" + this.instance.heapId + " .heap ul li a").each(function () {
      t.push({ value: e(this).attr("rel"), text: e(this).text(), selected: e(this).is(":selected") ? "selected" : "" });
    });var n = JSON.stringify(t);return n;
  }), _defineProperty(_o$prototype, "_isHeapEmpty", function _isHeapEmpty() {
    var t = e("div#heapbox_" + this.instance.heapId + " .heap ul li").length;return t == 0;
  }), _defineProperty(_o$prototype, "_setControlsEvents", function _setControlsEvents() {
    if (!this._isHeapEmpty()) {
      this._setHeapboxHolderEvents();this._setHeapboxHandlerEvents();this._setKeyboardEvents();this._setSliderEvents();if (_typeof(e.event.special.mousewheel) == "object") {
        this._setMouseWheelEvents();
      }
    }
  }), _defineProperty(_o$prototype, "_isSourceSelectbox", function _isSourceSelectbox() {
    this.isSourceElementSelect = e(this.element).is("select");
  }), _defineProperty(_o$prototype, "_isHeapsizeSet", function _isHeapsizeSet() {
    return this.options.heapsize ? true : false;
  }), _defineProperty(_o$prototype, "_refreshSourceSelectbox", function _refreshSourceSelectbox(t) {
    var n = this;var r = false;e(this.element).find("option").remove();e.each(t, function () {
      option = e("<option/>", { value: this.value, text: this.text });if (this.selected) {
        option.attr("selected", "selected");r = true;
      }e(n.element).append(option);
    });if (r != true) e(n.element).find("option").first().attr("selected", "selected");
  }), _defineProperty(_o$prototype, "_setSelectedOption", function _setSelectedOption(t) {
    var n = this;this._deselectSelectedOptions();e(this.element).val(t);e(this.element).find("option[value='" + t + "']").attr("selected", "selected");
  }), _defineProperty(_o$prototype, "_deselectSelectedOptions", function _deselectSelectedOptions() {
    select = e(this.element).find("option");select.each(function () {
      e(this).removeAttr("selected");
    });
  }), _defineProperty(_o$prototype, "_setHeapboxHolderEvents", function _setHeapboxHolderEvents() {
    var t = this;heapBoxEl = e("div#heapbox_" + this.instance.heapId);heapBoxEl.find(".holder").click(function (e) {
      e.preventDefault();e.stopPropagation();t._setHeapboxFocus();t._handlerClicked();
    });
  }), _defineProperty(_o$prototype, "_setHeapboxHandlerEvents", function _setHeapboxHandlerEvents() {
    var t = this;heapBoxEl = e("div#heapbox_" + this.instance.heapId);heapBoxEl.find(".handler").click(function (e) {
      e.preventDefault();e.stopPropagation();t._setHeapboxFocus();t._handlerClicked();
    });
  }), _defineProperty(_o$prototype, "_removeHeapboxHolderEvents", function _removeHeapboxHolderEvents() {
    var t = this;heapBoxEl = e("div#heapbox_" + this.instance.heapId);heapBoxEl.find(".holder").unbind("click");heapBoxEl.find(".holder").click(function (e) {
      e.preventDefault();
    });heapBoxEl.unbind("keydown");
  }), _defineProperty(_o$prototype, "_removeHeapboxHandlerEvents", function _removeHeapboxHandlerEvents() {
    var t = this;heapBoxEl = e("div#heapbox_" + this.instance.heapId);heapBoxEl.find(".handler").unbind("click");heapBoxEl.find(".handler").click(function (e) {
      e.preventDefault();
    });
  }), _defineProperty(_o$prototype, "_handlerClicked", function _handlerClicked(e) {
    if (this.instance.state) {
      this._closeheap();
    } else {
      if (!e) this._closeOthers();else this._openheap();
    }
  }), _defineProperty(_o$prototype, "_heapChanged", function _heapChanged(t, n, r) {
    if (!r) this._closeheap(true, function () {}, function () {});this._setSelected(e(n));this._setHolderTitle();this._setHeapboxFocus();this._setSelectedOption(e(n).attr("rel"));this.options.onChange(e(n).attr("rel"), e(this.element));
  }), _defineProperty(_o$prototype, "_setSelected", function _setSelected(e) {
    this._deselectAll();e.addClass("selected");
  }), _defineProperty(_o$prototype, "_deselectAll", function _deselectAll(t) {
    heapLinks = e("#heapbox_" + this.instance.heapId).find(".heap ul li a");heapLinks.each(function () {
      e(this).removeClass("selected");
    });
  }), _defineProperty(_o$prototype, "_closeheap", function _closeheap(t, n, r) {
    heapEl = e("#heapbox_" + this.instance.heapId).removeClass("open").find(".heap");if (heapEl.is(":animated") && !t) return false;this.instance.state = false;if (t) {
      n = n;r = r;
    } else {
      n = this.options.closeStart;r = this.options.closeComplete;
    }n.call();switch (this.options.effect.type) {case "fade":
        heapEl.fadeOut(this.options.effect.speed, r);break;case "slide":
        heapEl.slideUp(this.options.effect.speed, r);break;case "standard":
        heapEl.css("display", "none");r.call();break;default:
        heapEl.slideUp(this.options.effect.speed, r);break;}
  }), _defineProperty(_o$prototype, "_openheap", function _openheap() {
    if (this._isHeapsizeSet()) {
      this._setViewPosition(e("div#heapbox_" + this.instance.heapId));
    }heapEl = e("#heapbox_" + this.instance.heapId).addClass("open").find(".heap");if (heapEl.is(":animated")) return false;this.instance.state = true;this.options.openStart.call();switch (this.options.effect.type) {case "fade":
        heapEl.fadeIn(this.options.effect.speed, this.options.openComplete);break;case "slide":
        heapEl.slideDown(this.options.effect.speed, this.options.openComplete);break;case "standard":
        heapEl.css("display", "block");this.options.openComplete.call();break;default:
        heapEl.slideDown(this.options.effect.speed, this.options.openComplete);break;}
  }), _defineProperty(_o$prototype, "_closeOthers", function _closeOthers() {
    var t = this;e("div[id^=heapbox_]").each(function (n) {
      el = e("div#" + e(this).attr("id"));if (el.data("sourceElement")) {
        sourceEl = e.data(this, "sourceElement");heapBoxInst = e.data(sourceEl, "plugin_" + i);if (t.instance.heapId != heapBoxInst.instance.heapId) {
          if (heapBoxInst.instance.state) {
            t._callbackManager("change", "_closeOthers", true);heapBoxInst._closeheap(true, function () {}, function () {
              t._callbackManager("change", "_closeOthers", false);
            });
          }
        }
      }
    });t._callbackManager("test", "_closeOthers");
  }), _defineProperty(_o$prototype, "_callbackManager", function _callbackManager(e, t, n) {
    if (!this.callbackManager[t]) this.callbackManager[t] = 0;if (e == "change") {
      n ? this.callbackManager[t]++ : this.callbackManager[t]--;this._callbackManager("test", t);
    } else if (e == "test") {
      if (this.callbackManager[t] == 0) this._handlerClicked(true);
    }
  }), _defineProperty(_o$prototype, "set", function set(e) {
    this._setData(e);this._setHolderTitle();this._setEvents();
  }), _defineProperty(_o$prototype, "select", function select(t) {
    heapBoxEl = e("div#heapbox_" + this.instance.heapId);this._heapChanged(this, heapBoxEl.find('.heapOptions [rel="' + t + '"]'));
  }), _defineProperty(_o$prototype, "update", function update() {
    this._setDefaultValues();
  }), _defineProperty(_o$prototype, "_hideSourceElement", function _hideSourceElement() {
    this.elem_isVisible = e(this.element).is(":visible");e(this.element).css("display", "none");
  }), _defineProperty(_o$prototype, "_showSourceElement", function _showSourceElement() {
    e(this.element).css("display", "block");
  }), _defineProperty(_o$prototype, "hide", function hide() {
    e("div#heapbox_" + this.instance.heapId).css("visibility", "hidden");
  }), _defineProperty(_o$prototype, "show", function show() {
    e("div#heapbox_" + this.instance.heapId).css("visibility", "visible");
  }), _defineProperty(_o$prototype, "disable", function disable() {
    heapBoxEl = e("div#heapbox_" + this.instance.heapId);heapBoxEl.addClass("disabled");this._removeHeapboxHandlerEvents();this._removeHeapboxHolderEvents();return this;
  }), _defineProperty(_o$prototype, "enable", function enable() {
    heapBoxEl = e("div#heapbox_" + this.instance.heapId);heapBoxEl.removeClass("disabled");this._setEvents();return this;
  }), _defineProperty(_o$prototype, "_remove", function _remove() {
    heapBoxEl = e("div#heapbox_" + this.instance.heapId);heapBoxEl.remove();this._showSourceElement();
  }), _o$prototype);e.fn[i] = function (t, n) {
    return this.each(function () {
      if (!e.data(this, "plugin_" + i)) {
        e.data(this, "plugin_" + i, new o(this, t));
      } else {
        heapBoxInst = e.data(this, "plugin_" + i);switch (t) {case "select":
            heapBoxInst.select(n);break;case "update":
            heapBoxInst.update();break;case "set":
            heapBoxInst.set(n);break;case "hide":
            heapBoxInst.hide();break;case "show":
            heapBoxInst.show();break;case "disable":
            heapBoxInst.disable();break;case "enable":
            heapBoxInst.enable();break;case "remove":
            heapBoxInst._remove();break;}
      }
    });
  };
})(jQuery, window, document);