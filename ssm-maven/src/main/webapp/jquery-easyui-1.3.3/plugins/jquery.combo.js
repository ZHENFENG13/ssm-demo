/**
 * jQuery EasyUI 1.3.3
 *
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function ($) {
    function _1(_2, _3) {
        var _4 = $.data(_2, "combo").options;
        var _5 = $.data(_2, "combo").combo;
        var _6 = $.data(_2, "combo").panel;
        if (_3) {
            _4.width = _3;
        }
        if (isNaN(_4.width)) {
            var c = $(_2).clone();
            c.css("visibility", "hidden");
            c.appendTo("body");
            _4.width = c.outerWidth();
            c.remove();
        }
        _5.appendTo("body");
        var _7 = _5.find("input.combo-text");
        var _8 = _5.find(".combo-arrow");
        var _9 = _4.hasDownArrow ? _8._outerWidth() : 0;
        _5._outerWidth(_4.width)._outerHeight(_4.height);
        _7._outerWidth(_5.width() - _9);
        _7.css({height: _5.height() + "px", lineHeight: _5.height() + "px"});
        _8._outerHeight(_5.height());
        _6.panel("resize", {width: (_4.panelWidth ? _4.panelWidth : _5.outerWidth()), height: _4.panelHeight});
        _5.insertAfter(_2);
    };
    function _a(_b) {
        $(_b).addClass("combo-f").hide();
        var _c = $("<span class=\"combo\"></span>").insertAfter(_b);
        var _d = $("<input type=\"text\" class=\"combo-text\">").appendTo(_c);
        $("<span><span class=\"combo-arrow\"></span></span>").appendTo(_c);
        $("<input type=\"hidden\" class=\"combo-value\">").appendTo(_c);
        var _e = $("<div class=\"combo-panel\"></div>").appendTo("body");
        _e.panel({
            doSize: false,
            closed: true,
            cls: "combo-p",
            style: {position: "absolute", zIndex: 10},
            onOpen: function () {
                $(this).panel("resize");
            },
            onClose: function () {
                var _f = $.data(_b, "combo");
                if (_f) {
                    _f.options.onHidePanel.call(_b);
                }
            }
        });
        var _10 = $(_b).attr("name");
        if (_10) {
            _c.find("input.combo-value").attr("name", _10);
            $(_b).removeAttr("name").attr("comboName", _10);
        }
        _d.attr("autocomplete", "off");
        return {combo: _c, panel: _e};
    };
    function _11(_12) {
        var _13 = $.data(_12, "combo");
        var _14 = _13.options;
        var _15 = _13.combo;
        if (_14.hasDownArrow) {
            _15.find(".combo-arrow").show();
        } else {
            _15.find(".combo-arrow").hide();
        }
        _16(_12, _14.disabled);
        _17(_12, _14.readonly);
    };
    function _18(_19) {
        var _1a = $.data(_19, "combo");
        var _1b = _1a.combo.find("input.combo-text");
        _1b.validatebox("destroy");
        _1a.panel.panel("destroy");
        _1a.combo.remove();
        $(_19).remove();
    };
    function _1c(_1d) {
        var _1e = $.data(_1d, "combo");
        var _1f = _1e.options;
        var _20 = _1e.panel;
        var _21 = _1e.combo;
        var _22 = _21.find(".combo-text");
        var _23 = _21.find(".combo-arrow");
        $(document).unbind(".combo").bind("mousedown.combo", function (e) {
            var p = $(e.target).closest("span.combo,div.combo-panel");
            if (p.length) {
                return;
            }
            $("body>div.combo-p>div.combo-panel:visible").panel("close");
        });
        _22.unbind(".combo");
        _23.unbind(".combo");
        if (!_1f.disabled && !_1f.readonly) {
            _22.bind("mousedown.combo", function (e) {
                $("div.combo-panel").not(_20).panel("close");
                e.stopPropagation();
            }).bind("keydown.combo", function (e) {
                switch (e.keyCode) {
                    case 38:
                        _1f.keyHandler.up.call(_1d);
                        break;
                    case 40:
                        _1f.keyHandler.down.call(_1d);
                        break;
                    case 13:
                        e.preventDefault();
                        _1f.keyHandler.enter.call(_1d);
                        return false;
                    case 9:
                    case 27:
                        _2c(_1d);
                        break;
                    default:
                        if (_1f.editable) {
                            if (_1e.timer) {
                                clearTimeout(_1e.timer);
                            }
                            _1e.timer = setTimeout(function () {
                                var q = _22.val();
                                if (_1e.previousValue != q) {
                                    _1e.previousValue = q;
                                    $(_1d).combo("showPanel");
                                    _1f.keyHandler.query.call(_1d, _22.val());
                                    _2f(_1d, true);
                                }
                            }, _1f.delay);
                        }
                }
            });
            _23.bind("click.combo", function () {
                if (_20.is(":visible")) {
                    _2c(_1d);
                } else {
                    $("div.combo-panel:visible").panel("close");
                    $(_1d).combo("showPanel");
                }
                _22.focus();
            }).bind("mouseenter.combo", function () {
                $(this).addClass("combo-arrow-hover");
            }).bind("mouseleave.combo", function () {
                $(this).removeClass("combo-arrow-hover");
            });
        }
    };
    function _24(_25) {
        var _26 = $.data(_25, "combo").options;
        var _27 = $.data(_25, "combo").combo;
        var _28 = $.data(_25, "combo").panel;
        if ($.fn.window) {
            _28.panel("panel").css("z-index", $.fn.window.defaults.zIndex++);
        }
        _28.panel("move", {left: _27.offset().left, top: _29()});
        if (_28.panel("options").closed) {
            _28.panel("open");
            _26.onShowPanel.call(_25);
        }
        (function () {
            if (_28.is(":visible")) {
                _28.panel("move", {left: _2a(), top: _29()});
                setTimeout(arguments.callee, 200);
            }
        })();
        function _2a() {
            var _2b = _27.offset().left;
            if (_2b + _28._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                _2b = $(window)._outerWidth() + $(document).scrollLeft() - _28._outerWidth();
            }
            if (_2b < 0) {
                _2b = 0;
            }
            return _2b;
        };
        function _29() {
            var top = _27.offset().top + _27._outerHeight();
            if (top + _28._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = _27.offset().top - _28._outerHeight();
            }
            if (top < $(document).scrollTop()) {
                top = _27.offset().top + _27._outerHeight();
            }
            return top;
        };
    };
    function _2c(_2d) {
        var _2e = $.data(_2d, "combo").panel;
        _2e.panel("close");
    };
    function _2f(_30, _31) {
        var _32 = $.data(_30, "combo").options;
        var _33 = $.data(_30, "combo").combo.find("input.combo-text");
        _33.validatebox($.extend({}, _32, {deltaX: (_32.hasDownArrow ? _32.deltaX : (_32.deltaX > 0 ? 1 : -1))}));
        if (_31) {
            _33.validatebox("validate");
        }
    };
    function _16(_34, _35) {
        var _36 = $.data(_34, "combo");
        var _37 = _36.options;
        var _38 = _36.combo;
        if (_35) {
            _37.disabled = true;
            $(_34).attr("disabled", true);
            _38.find(".combo-value").attr("disabled", true);
            _38.find(".combo-text").attr("disabled", true);
        } else {
            _37.disabled = false;
            $(_34).removeAttr("disabled");
            _38.find(".combo-value").removeAttr("disabled");
            _38.find(".combo-text").removeAttr("disabled");
        }
    };
    function _17(_39, _3a) {
        var _3b = $.data(_39, "combo");
        var _3c = _3b.options;
        _3c.readonly = _3a == undefined ? true : _3a;
        _3b.combo.find(".combo-text").attr("readonly", _3c.readonly ? true : (!_3c.editable));
    };
    function _3d(_3e) {
        var _3f = $.data(_3e, "combo");
        var _40 = _3f.options;
        var _41 = _3f.combo;
        if (_40.multiple) {
            _41.find("input.combo-value").remove();
        } else {
            _41.find("input.combo-value").val("");
        }
        _41.find("input.combo-text").val("");
    };
    function _42(_43) {
        var _44 = $.data(_43, "combo").combo;
        return _44.find("input.combo-text").val();
    };
    function _45(_46, _47) {
        var _48 = $.data(_46, "combo").combo;
        _48.find("input.combo-text").val(_47);
        _2f(_46, true);
        $.data(_46, "combo").previousValue = _47;
    };
    function _49(_4a) {
        var _4b = [];
        var _4c = $.data(_4a, "combo").combo;
        _4c.find("input.combo-value").each(function () {
            _4b.push($(this).val());
        });
        return _4b;
    };
    function _4d(_4e, _4f) {
        var _50 = $.data(_4e, "combo").options;
        var _51 = _49(_4e);
        var _52 = $.data(_4e, "combo").combo;
        _52.find("input.combo-value").remove();
        var _53 = $(_4e).attr("comboName");
        for (var i = 0; i < _4f.length; i++) {
            var _54 = $("<input type=\"hidden\" class=\"combo-value\">").appendTo(_52);
            if (_53) {
                _54.attr("name", _53);
            }
            _54.val(_4f[i]);
        }
        var tmp = [];
        for (var i = 0; i < _51.length; i++) {
            tmp[i] = _51[i];
        }
        var aa = [];
        for (var i = 0; i < _4f.length; i++) {
            for (var j = 0; j < tmp.length; j++) {
                if (_4f[i] == tmp[j]) {
                    aa.push(_4f[i]);
                    tmp.splice(j, 1);
                    break;
                }
            }
        }
        if (aa.length != _4f.length || _4f.length != _51.length) {
            if (_50.multiple) {
                _50.onChange.call(_4e, _4f, _51);
            } else {
                _50.onChange.call(_4e, _4f[0], _51[0]);
            }
        }
    };
    function _55(_56) {
        var _57 = _49(_56);
        return _57[0];
    };
    function _58(_59, _5a) {
        _4d(_59, [_5a]);
    };
    function _5b(_5c) {
        var _5d = $.data(_5c, "combo").options;
        var fn = _5d.onChange;
        _5d.onChange = function () {
        };
        if (_5d.multiple) {
            if (_5d.value) {
                if (typeof _5d.value == "object") {
                    _4d(_5c, _5d.value);
                } else {
                    _58(_5c, _5d.value);
                }
            } else {
                _4d(_5c, []);
            }
            _5d.originalValue = _49(_5c);
        } else {
            _58(_5c, _5d.value);
            _5d.originalValue = _5d.value;
        }
        _5d.onChange = fn;
    };
    $.fn.combo = function (_5e, _5f) {
        if (typeof _5e == "string") {
            return $.fn.combo.methods[_5e](this, _5f);
        }
        _5e = _5e || {};
        return this.each(function () {
            var _60 = $.data(this, "combo");
            if (_60) {
                $.extend(_60.options, _5e);
            } else {
                var r = _a(this);
                _60 = $.data(this, "combo", {
                    options: $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), _5e),
                    combo: r.combo,
                    panel: r.panel,
                    previousValue: null
                });
                $(this).removeAttr("disabled");
            }
            _11(this);
            _1(this);
            _1c(this);
            _2f(this);
            _5b(this);
        });
    };
    $.fn.combo.methods = {
        options: function (jq) {
            return $.data(jq[0], "combo").options;
        }, panel: function (jq) {
            return $.data(jq[0], "combo").panel;
        }, textbox: function (jq) {
            return $.data(jq[0], "combo").combo.find("input.combo-text");
        }, destroy: function (jq) {
            return jq.each(function () {
                _18(this);
            });
        }, resize: function (jq, _61) {
            return jq.each(function () {
                _1(this, _61);
            });
        }, showPanel: function (jq) {
            return jq.each(function () {
                _24(this);
            });
        }, hidePanel: function (jq) {
            return jq.each(function () {
                _2c(this);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                _16(this, true);
                _1c(this);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                _16(this, false);
                _1c(this);
            });
        }, readonly: function (jq, _62) {
            return jq.each(function () {
                _17(this, _62);
                _1c(this);
            });
        }, validate: function (jq) {
            return jq.each(function () {
                _2f(this, true);
            });
        }, isValid: function (jq) {
            var _63 = $.data(jq[0], "combo").combo.find("input.combo-text");
            return _63.validatebox("isValid");
        }, clear: function (jq) {
            return jq.each(function () {
                _3d(this);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var _64 = $.data(this, "combo").options;
                if (_64.multiple) {
                    $(this).combo("setValues", _64.originalValue);
                } else {
                    $(this).combo("setValue", _64.originalValue);
                }
            });
        }, getText: function (jq) {
            return _42(jq[0]);
        }, setText: function (jq, _65) {
            return jq.each(function () {
                _45(this, _65);
            });
        }, getValues: function (jq) {
            return _49(jq[0]);
        }, setValues: function (jq, _66) {
            return jq.each(function () {
                _4d(this, _66);
            });
        }, getValue: function (jq) {
            return _55(jq[0]);
        }, setValue: function (jq, _67) {
            return jq.each(function () {
                _58(this, _67);
            });
        }
    };
    $.fn.combo.parseOptions = function (_68) {
        var t = $(_68);
        return $.extend({}, $.fn.validatebox.parseOptions(_68), $.parser.parseOptions(_68, ["width", "height", "separator", {
            panelWidth: "number",
            editable: "boolean",
            hasDownArrow: "boolean",
            delay: "number",
            selectOnNavigation: "boolean"
        }]), {
            panelHeight: (t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined),
            multiple: (t.attr("multiple") ? true : undefined),
            disabled: (t.attr("disabled") ? true : undefined),
            readonly: (t.attr("readonly") ? true : undefined),
            value: (t.val() || undefined)
        });
    };
    $.fn.combo.defaults = $.extend({}, $.fn.validatebox.defaults, {
        width: "auto",
        height: 22,
        panelWidth: null,
        panelHeight: 200,
        multiple: false,
        selectOnNavigation: true,
        separator: ",",
        editable: true,
        disabled: false,
        readonly: false,
        hasDownArrow: true,
        value: "",
        delay: 200,
        deltaX: 19,
        keyHandler: {
            up: function () {
            }, down: function () {
            }, enter: function () {
            }, query: function (q) {
            }
        },
        onShowPanel: function () {
        },
        onHidePanel: function () {
        },
        onChange: function (_69, _6a) {
        }
    });
})(jQuery);

