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
    function _1(_2, _3, _4) {
        for (var i = 0; i < _2.length; i++) {
            var _5 = _2[i];
            if (_5[_3] == _4) {
                return _5;
            }
        }
        return null;
    };
    function _6(_7, _8) {
        var _9 = $(_7).combo("panel");
        var _a = _9.find("div.combobox-item[value=\"" + _8 + "\"]");
        if (_a.length) {
            if (_a.position().top <= 0) {
                var h = _9.scrollTop() + _a.position().top;
                _9.scrollTop(h);
            } else {
                if (_a.position().top + _a.outerHeight() > _9.height()) {
                    var h = _9.scrollTop() + _a.position().top + _a.outerHeight() - _9.height();
                    _9.scrollTop(h);
                }
            }
        }
    };
    function _b(_c, _d) {
        var _e = $(_c).combobox("options");
        var _f = $(_c).combobox("panel");
        var _10 = _f.children("div.combobox-item-hover");
        if (!_10.length) {
            _10 = _f.children("div.combobox-item-selected");
        }
        _10.removeClass("combobox-item-hover");
        if (!_10.length) {
            _10 = _f.children("div.combobox-item:visible:" + (_d == "next" ? "first" : "last"));
        } else {
            if (_d == "next") {
                _10 = _10.nextAll(":visible:first");
                if (!_10.length) {
                    _10 = _f.children("div.combobox-item:visible:first");
                }
            } else {
                _10 = _10.prevAll(":visible:first");
                if (!_10.length) {
                    _10 = _f.children("div.combobox-item:visible:last");
                }
            }
        }
        if (_10.length) {
            _10.addClass("combobox-item-hover");
            _6(_c, _10.attr("value"));
            if (_e.selectOnNavigation) {
                _11(_c, _10.attr("value"));
            }
        }
    };
    function _11(_12, _13) {
        var _14 = $.data(_12, "combobox").options;
        var _15 = $.data(_12, "combobox").data;
        if (_14.multiple) {
            var _16 = $(_12).combo("getValues");
            for (var i = 0; i < _16.length; i++) {
                if (_16[i] == _13) {
                    return;
                }
            }
            _16.push(_13);
            _17(_12, _16);
        } else {
            _17(_12, [_13]);
        }
        var _18 = _1(_15, _14.valueField, _13);
        if (_18) {
            _14.onSelect.call(_12, _18);
        }
    };
    function _19(_1a, _1b) {
        var _1c = $.data(_1a, "combobox");
        var _1d = _1c.options;
        var _1e = $(_1a).combo("getValues");
        var _1f = _1e.indexOf(_1b + "");
        if (_1f >= 0) {
            _1e.splice(_1f, 1);
            _17(_1a, _1e);
        }
        var _20 = _1(_1c.data, _1d.valueField, _1b);
        if (_20) {
            _1d.onUnselect.call(_1a, _20);
        }
    };
    function _17(_21, _22, _23) {
        var _24 = $.data(_21, "combobox").options;
        var _25 = $.data(_21, "combobox").data;
        var _26 = $(_21).combo("panel");
        _26.find("div.combobox-item-selected").removeClass("combobox-item-selected");
        var vv = [], ss = [];
        for (var i = 0; i < _22.length; i++) {
            var v = _22[i];
            var s = v;
            var _27 = _1(_25, _24.valueField, v);
            if (_27) {
                s = _27[_24.textField];
            }
            vv.push(v);
            ss.push(s);
            _26.find("div.combobox-item[value=\"" + v + "\"]").addClass("combobox-item-selected");
        }
        $(_21).combo("setValues", vv);
        if (!_23) {
            $(_21).combo("setText", ss.join(_24.separator));
        }
    };
    function _28(_29, _2a, _2b) {
        var _2c = $.data(_29, "combobox").options;
        var _2d = $(_29).combo("panel");
        _2a = _2c.loadFilter.call(_29, _2a);
        $.data(_29, "combobox").data = _2a;
        var _2e = $(_29).combobox("getValues");
        _2d.empty();
        for (var i = 0; i < _2a.length; i++) {
            var v = _2a[i][_2c.valueField];
            var s = _2a[i][_2c.textField];
            var _2f = $("<div class=\"combobox-item\"></div>").appendTo(_2d);
            _2f.attr("value", v);
            if (_2c.formatter) {
                _2f.html(_2c.formatter.call(_29, _2a[i]));
            } else {
                _2f.html(s);
            }
            if (_2a[i]["selected"]) {
                (function () {
                    for (var i = 0; i < _2e.length; i++) {
                        if (v == _2e[i]) {
                            return;
                        }
                    }
                    _2e.push(v);
                })();
            }
        }
        if (_2c.multiple) {
            _17(_29, _2e, _2b);
        } else {
            if (_2e.length) {
                _17(_29, [_2e[_2e.length - 1]], _2b);
            } else {
                _17(_29, [], _2b);
            }
        }
        _2c.onLoadSuccess.call(_29, _2a);
    };
    function _30(_31, url, _32, _33) {
        var _34 = $.data(_31, "combobox").options;
        if (url) {
            _34.url = url;
        }
        _32 = _32 || {};
        if (_34.onBeforeLoad.call(_31, _32) == false) {
            return;
        }
        _34.loader.call(_31, _32, function (_35) {
            _28(_31, _35, _33);
        }, function () {
            _34.onLoadError.apply(this, arguments);
        });
    };
    function _36(_37, q) {
        var _38 = $.data(_37, "combobox").options;
        if (_38.multiple && !q) {
            _17(_37, [], true);
        } else {
            _17(_37, [q], true);
        }
        if (_38.mode == "remote") {
            _30(_37, null, {q: q}, true);
        } else {
            var _39 = $(_37).combo("panel");
            _39.find("div.combobox-item").hide();
            var _3a = $.data(_37, "combobox").data;
            for (var i = 0; i < _3a.length; i++) {
                if (_38.filter.call(_37, q, _3a[i])) {
                    var v = _3a[i][_38.valueField];
                    var s = _3a[i][_38.textField];
                    var _3b = _39.find("div.combobox-item[value=\"" + v + "\"]");
                    _3b.show();
                    if (s == q) {
                        _17(_37, [v], true);
                        _3b.addClass("combobox-item-selected");
                    }
                }
            }
        }
    };
    function _3c(_3d) {
        var t = $(_3d);
        var _3e = t.combobox("panel");
        var _3f = t.combobox("options");
        var _40 = t.combobox("getData");
        var _41 = _3e.children("div.combobox-item-hover");
        if (!_41.length) {
            _41 = _3e.children("div.combobox-item-selected");
        }
        if (!_41.length) {
            return;
        }
        if (_3f.multiple) {
            if (_41.hasClass("combobox-item-selected")) {
                t.combobox("unselect", _41.attr("value"));
            } else {
                t.combobox("select", _41.attr("value"));
            }
        } else {
            t.combobox("select", _41.attr("value"));
            t.combobox("hidePanel");
        }
        var vv = [];
        var _42 = t.combobox("getValues");
        for (var i = 0; i < _42.length; i++) {
            if (_1(_40, _3f.valueField, _42[i])) {
                vv.push(_42[i]);
            }
        }
        t.combobox("setValues", vv);
    };
    function _43(_44) {
        var _45 = $.data(_44, "combobox").options;
        $(_44).addClass("combobox-f");
        $(_44).combo($.extend({}, _45, {
            onShowPanel: function () {
                $(_44).combo("panel").find("div.combobox-item").show();
                _6(_44, $(_44).combobox("getValue"));
                _45.onShowPanel.call(_44);
            }
        }));
        $(_44).combo("panel").unbind().bind("mouseover", function (e) {
            $(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
            $(e.target).closest("div.combobox-item").addClass("combobox-item-hover");
            e.stopPropagation();
        }).bind("mouseout", function (e) {
            $(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
            e.stopPropagation();
        }).bind("click", function (e) {
            var _46 = $(e.target).closest("div.combobox-item");
            if (!_46.length) {
                return;
            }
            var _47 = _46.attr("value");
            if (_45.multiple) {
                if (_46.hasClass("combobox-item-selected")) {
                    _19(_44, _47);
                } else {
                    _11(_44, _47);
                }
            } else {
                _11(_44, _47);
                $(_44).combo("hidePanel");
            }
            e.stopPropagation();
        });
    };
    $.fn.combobox = function (_48, _49) {
        if (typeof _48 == "string") {
            var _4a = $.fn.combobox.methods[_48];
            if (_4a) {
                return _4a(this, _49);
            } else {
                return this.combo(_48, _49);
            }
        }
        _48 = _48 || {};
        return this.each(function () {
            var _4b = $.data(this, "combobox");
            if (_4b) {
                $.extend(_4b.options, _48);
                _43(this);
            } else {
                _4b = $.data(this, "combobox", {options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), _48)});
                _43(this);
                _28(this, $.fn.combobox.parseData(this));
            }
            if (_4b.options.data) {
                _28(this, _4b.options.data);
            }
            _30(this);
        });
    };
    $.fn.combobox.methods = {
        options: function (jq) {
            var _4c = jq.combo("options");
            return $.extend($.data(jq[0], "combobox").options, {
                originalValue: _4c.originalValue,
                disabled: _4c.disabled,
                readonly: _4c.readonly
            });
        }, getData: function (jq) {
            return $.data(jq[0], "combobox").data;
        }, setValues: function (jq, _4d) {
            return jq.each(function () {
                _17(this, _4d);
            });
        }, setValue: function (jq, _4e) {
            return jq.each(function () {
                _17(this, [_4e]);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                $(this).combo("clear");
                var _4f = $(this).combo("panel");
                _4f.find("div.combobox-item-selected").removeClass("combobox-item-selected");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var _50 = $(this).combobox("options");
                if (_50.multiple) {
                    $(this).combobox("setValues", _50.originalValue);
                } else {
                    $(this).combobox("setValue", _50.originalValue);
                }
            });
        }, loadData: function (jq, _51) {
            return jq.each(function () {
                _28(this, _51);
            });
        }, reload: function (jq, url) {
            return jq.each(function () {
                _30(this, url);
            });
        }, select: function (jq, _52) {
            return jq.each(function () {
                _11(this, _52);
            });
        }, unselect: function (jq, _53) {
            return jq.each(function () {
                _19(this, _53);
            });
        }
    };
    $.fn.combobox.parseOptions = function (_54) {
        var t = $(_54);
        return $.extend({}, $.fn.combo.parseOptions(_54), $.parser.parseOptions(_54, ["valueField", "textField", "mode", "method", "url"]));
    };
    $.fn.combobox.parseData = function (_55) {
        var _56 = [];
        var _57 = $(_55).combobox("options");
        $(_55).children("option").each(function () {
            var _58 = {};
            _58[_57.valueField] = $(this).attr("value") != undefined ? $(this).attr("value") : $(this).html();
            _58[_57.textField] = $(this).html();
            _58["selected"] = $(this).attr("selected");
            _56.push(_58);
        });
        return _56;
    };
    $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
        valueField: "value", textField: "text", mode: "local", method: "post", url: null, data: null, keyHandler: {
            up: function () {
                _b(this, "prev");
            }, down: function () {
                _b(this, "next");
            }, enter: function () {
                _3c(this);
            }, query: function (q) {
                _36(this, q);
            }
        }, filter: function (q, row) {
            var _59 = $(this).combobox("options");
            return row[_59.textField].indexOf(q) == 0;
        }, formatter: function (row) {
            var _5a = $(this).combobox("options");
            return row[_5a.textField];
        }, loader: function (_5b, _5c, _5d) {
            var _5e = $(this).combobox("options");
            if (!_5e.url) {
                return false;
            }
            $.ajax({
                type: _5e.method, url: _5e.url, data: _5b, dataType: "json", success: function (_5f) {
                    _5c(_5f);
                }, error: function () {
                    _5d.apply(this, arguments);
                }
            });
        }, loadFilter: function (_60) {
            return _60;
        }, onBeforeLoad: function (_61) {
        }, onLoadSuccess: function () {
        }, onLoadError: function () {
        }, onSelect: function (_62) {
        }, onUnselect: function (_63) {
        }
    });
})(jQuery);

