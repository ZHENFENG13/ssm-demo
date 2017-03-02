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
    function _1(_2) {
        var _3 = $("<div class=\"slider\">" + "<div class=\"slider-inner\">" + "<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>" + "<span class=\"slider-tip\"></span>" + "</div>" + "<div class=\"slider-rule\"></div>" + "<div class=\"slider-rulelabel\"></div>" + "<div style=\"clear:both\"></div>" + "<input type=\"hidden\" class=\"slider-value\">" + "</div>").insertAfter(_2);
        var _4 = $(_2).hide().attr("name");
        if (_4) {
            _3.find("input.slider-value").attr("name", _4);
            $(_2).removeAttr("name").attr("sliderName", _4);
        }
        return _3;
    };
    function _5(_6, _7) {
        var _8 = $.data(_6, "slider");
        var _9 = _8.options;
        var _a = _8.slider;
        if (_7) {
            if (_7.width) {
                _9.width = _7.width;
            }
            if (_7.height) {
                _9.height = _7.height;
            }
        }
        if (_9.mode == "h") {
            _a.css("height", "");
            _a.children("div").css("height", "");
            if (!isNaN(_9.width)) {
                _a.width(_9.width);
            }
        } else {
            _a.css("width", "");
            _a.children("div").css("width", "");
            if (!isNaN(_9.height)) {
                _a.height(_9.height);
                _a.find("div.slider-rule").height(_9.height);
                _a.find("div.slider-rulelabel").height(_9.height);
                _a.find("div.slider-inner")._outerHeight(_9.height);
            }
        }
        _b(_6);
    };
    function _c(_d) {
        var _e = $.data(_d, "slider");
        var _f = _e.options;
        var _10 = _e.slider;
        var aa = _f.mode == "h" ? _f.rule : _f.rule.slice(0).reverse();
        if (_f.reversed) {
            aa = aa.slice(0).reverse();
        }
        _11(aa);
        function _11(aa) {
            var _12 = _10.find("div.slider-rule");
            var _13 = _10.find("div.slider-rulelabel");
            _12.empty();
            _13.empty();
            for (var i = 0; i < aa.length; i++) {
                var _14 = i * 100 / (aa.length - 1) + "%";
                var _15 = $("<span></span>").appendTo(_12);
                _15.css((_f.mode == "h" ? "left" : "top"), _14);
                if (aa[i] != "|") {
                    _15 = $("<span></span>").appendTo(_13);
                    _15.html(aa[i]);
                    if (_f.mode == "h") {
                        _15.css({left: _14, marginLeft: -Math.round(_15.outerWidth() / 2)});
                    } else {
                        _15.css({top: _14, marginTop: -Math.round(_15.outerHeight() / 2)});
                    }
                }
            }
        };
    };
    function _16(_17) {
        var _18 = $.data(_17, "slider");
        var _19 = _18.options;
        var _1a = _18.slider;
        _1a.removeClass("slider-h slider-v slider-disabled");
        _1a.addClass(_19.mode == "h" ? "slider-h" : "slider-v");
        _1a.addClass(_19.disabled ? "slider-disabled" : "");
        _1a.find("a.slider-handle").draggable({
            axis: _19.mode, cursor: "pointer", disabled: _19.disabled, onDrag: function (e) {
                var _1b = e.data.left;
                var _1c = _1a.width();
                if (_19.mode != "h") {
                    _1b = e.data.top;
                    _1c = _1a.height();
                }
                if (_1b < 0 || _1b > _1c) {
                    return false;
                } else {
                    var _1d = _31(_17, _1b);
                    _1e(_1d);
                    return false;
                }
            }, onStartDrag: function () {
                _19.onSlideStart.call(_17, _19.value);
            }, onStopDrag: function (e) {
                var _1f = _31(_17, (_19.mode == "h" ? e.data.left : e.data.top));
                _1e(_1f);
                _19.onSlideEnd.call(_17, _19.value);
            }
        });
        function _1e(_20) {
            var s = Math.abs(_20 % _19.step);
            if (s < _19.step / 2) {
                _20 -= s;
            } else {
                _20 = _20 - s + _19.step;
            }
            _21(_17, _20);
        };
    };
    function _21(_22, _23) {
        var _24 = $.data(_22, "slider");
        var _25 = _24.options;
        var _26 = _24.slider;
        var _27 = _25.value;
        if (_23 < _25.min) {
            _23 = _25.min;
        }
        if (_23 > _25.max) {
            _23 = _25.max;
        }
        _25.value = _23;
        $(_22).val(_23);
        _26.find("input.slider-value").val(_23);
        var pos = _28(_22, _23);
        var tip = _26.find(".slider-tip");
        if (_25.showTip) {
            tip.show();
            tip.html(_25.tipFormatter.call(_22, _25.value));
        } else {
            tip.hide();
        }
        if (_25.mode == "h") {
            var _29 = "left:" + pos + "px;";
            _26.find(".slider-handle").attr("style", _29);
            tip.attr("style", _29 + "margin-left:" + (-Math.round(tip.outerWidth() / 2)) + "px");
        } else {
            var _29 = "top:" + pos + "px;";
            _26.find(".slider-handle").attr("style", _29);
            tip.attr("style", _29 + "margin-left:" + (-Math.round(tip.outerWidth())) + "px");
        }
        if (_27 != _23) {
            _25.onChange.call(_22, _23, _27);
        }
    };
    function _b(_2a) {
        var _2b = $.data(_2a, "slider").options;
        var fn = _2b.onChange;
        _2b.onChange = function () {
        };
        _21(_2a, _2b.value);
        _2b.onChange = fn;
    };
    function _28(_2c, _2d) {
        var _2e = $.data(_2c, "slider");
        var _2f = _2e.options;
        var _30 = _2e.slider;
        if (_2f.mode == "h") {
            var pos = (_2d - _2f.min) / (_2f.max - _2f.min) * _30.width();
            if (_2f.reversed) {
                pos = _30.width() - pos;
            }
        } else {
            var pos = _30.height() - (_2d - _2f.min) / (_2f.max - _2f.min) * _30.height();
            if (_2f.reversed) {
                pos = _30.height() - pos;
            }
        }
        return pos.toFixed(0);
    };
    function _31(_32, pos) {
        var _33 = $.data(_32, "slider");
        var _34 = _33.options;
        var _35 = _33.slider;
        if (_34.mode == "h") {
            var _36 = _34.min + (_34.max - _34.min) * (pos / _35.width());
        } else {
            var _36 = _34.min + (_34.max - _34.min) * ((_35.height() - pos) / _35.height());
        }
        return _34.reversed ? _34.max - _36.toFixed(0) : _36.toFixed(0);
    };
    $.fn.slider = function (_37, _38) {
        if (typeof _37 == "string") {
            return $.fn.slider.methods[_37](this, _38);
        }
        _37 = _37 || {};
        return this.each(function () {
            var _39 = $.data(this, "slider");
            if (_39) {
                $.extend(_39.options, _37);
            } else {
                _39 = $.data(this, "slider", {
                    options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), _37),
                    slider: _1(this)
                });
                $(this).removeAttr("disabled");
            }
            var _3a = _39.options;
            _3a.min = parseFloat(_3a.min);
            _3a.max = parseFloat(_3a.max);
            _3a.value = parseFloat(_3a.value);
            _3a.step = parseFloat(_3a.step);
            _16(this);
            _c(this);
            _5(this);
        });
    };
    $.fn.slider.methods = {
        options: function (jq) {
            return $.data(jq[0], "slider").options;
        }, destroy: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").slider.remove();
                $(this).remove();
            });
        }, resize: function (jq, _3b) {
            return jq.each(function () {
                _5(this, _3b);
            });
        }, getValue: function (jq) {
            return jq.slider("options").value;
        }, setValue: function (jq, _3c) {
            return jq.each(function () {
                _21(this, _3c);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").options.disabled = false;
                _16(this);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").options.disabled = true;
                _16(this);
            });
        }
    };
    $.fn.slider.parseOptions = function (_3d) {
        var t = $(_3d);
        return $.extend({}, $.parser.parseOptions(_3d, ["width", "height", "mode", {
            reversed: "boolean",
            showTip: "boolean",
            min: "number",
            max: "number",
            step: "number"
        }]), {
            value: (t.val() || undefined),
            disabled: (t.attr("disabled") ? true : undefined),
            rule: (t.attr("rule") ? eval(t.attr("rule")) : undefined)
        });
    };
    $.fn.slider.defaults = {
        width: "auto",
        height: "auto",
        mode: "h",
        reversed: false,
        showTip: false,
        disabled: false,
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        rule: [],
        tipFormatter: function (_3e) {
            return _3e;
        },
        onChange: function (_3f, _40) {
        },
        onSlideStart: function (_41) {
        },
        onSlideEnd: function (_42) {
        }
    };
})(jQuery);

