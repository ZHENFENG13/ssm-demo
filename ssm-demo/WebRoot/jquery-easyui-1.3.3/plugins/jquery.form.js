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
        _3 = _3 || {};
        var _4 = {};
        if (_3.onSubmit) {
            if (_3.onSubmit.call(_2, _4) == false) {
                return;
            }
        }
        var _5 = $(_2);
        if (_3.url) {
            _5.attr("action", _3.url);
        }
        var _6 = "easyui_frame_" + (new Date().getTime());
        var _7 = $("<iframe id=" + _6 + " name=" + _6 + "></iframe>").attr("src", window.ActiveXObject ? "javascript:false" : "about:blank").css({
            position: "absolute",
            top: -1000,
            left: -1000
        });
        var t = _5.attr("target"), a = _5.attr("action");
        _5.attr("target", _6);
        var _8 = $();
        try {
            _7.appendTo("body");
            _7.bind("load", cb);
            for (var n in _4) {
                var f = $("<input type=\"hidden\" name=\"" + n + "\">").val(_4[n]).appendTo(_5);
                _8 = _8.add(f);
            }
            _5[0].submit();
        }
        finally {
            _5.attr("action", a);
            t ? _5.attr("target", t) : _5.removeAttr("target");
            _8.remove();
        }
        var _9 = 10;

        function cb() {
            _7.unbind();
            var _a = $("#" + _6).contents().find("body");
            var _b = _a.html();
            if (_b == "") {
                if (--_9) {
                    setTimeout(cb, 100);
                    return;
                }
                return;
            }
            var ta = _a.find(">textarea");
            if (ta.length) {
                _b = ta.val();
            } else {
                var _c = _a.find(">pre");
                if (_c.length) {
                    _b = _c.html();
                }
            }
            if (_3.success) {
                _3.success(_b);
            }
            setTimeout(function () {
                _7.unbind();
                _7.remove();
            }, 100);
        };
    };
    function _d(_e, _f) {
        if (!$.data(_e, "form")) {
            $.data(_e, "form", {options: $.extend({}, $.fn.form.defaults)});
        }
        var _10 = $.data(_e, "form").options;
        if (typeof _f == "string") {
            var _11 = {};
            if (_10.onBeforeLoad.call(_e, _11) == false) {
                return;
            }
            $.ajax({
                url: _f, data: _11, dataType: "json", success: function (_12) {
                    _13(_12);
                }, error: function () {
                    _10.onLoadError.apply(_e, arguments);
                }
            });
        } else {
            _13(_f);
        }
        function _13(_14) {
            var _15 = $(_e);
            for (var _16 in _14) {
                var val = _14[_16];
                var rr = _17(_16, val);
                if (!rr.length) {
                    var f = _15.find("input[numberboxName=\"" + _16 + "\"]");
                    if (f.length) {
                        f.numberbox("setValue", val);
                    } else {
                        $("input[name=\"" + _16 + "\"]", _15).val(val);
                        $("textarea[name=\"" + _16 + "\"]", _15).val(val);
                        $("select[name=\"" + _16 + "\"]", _15).val(val);
                    }
                }
                _18(_16, val);
            }
            _10.onLoadSuccess.call(_e, _14);
            _20(_e);
        };
        function _17(_19, val) {
            var rr = $(_e).find("input[name=\"" + _19 + "\"][type=radio], input[name=\"" + _19 + "\"][type=checkbox]");
            rr._propAttr("checked", false);
            rr.each(function () {
                var f = $(this);
                if (f.val() == String(val) || $.inArray(f.val(), val) >= 0) {
                    f._propAttr("checked", true);
                }
            });
            return rr;
        };
        function _18(_1a, val) {
            var _1b = $(_e);
            var cc = ["combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo"];
            var c = _1b.find("[comboName=\"" + _1a + "\"]");
            if (c.length) {
                for (var i = 0; i < cc.length; i++) {
                    var _1c = cc[i];
                    if (c.hasClass(_1c + "-f")) {
                        if (c[_1c]("options").multiple) {
                            c[_1c]("setValues", val);
                        } else {
                            c[_1c]("setValue", val);
                        }
                        return;
                    }
                }
            }
        };
    };
    function _1d(_1e) {
        $("input,select,textarea", _1e).each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            if (t == "text" || t == "hidden" || t == "password" || tag == "textarea") {
                this.value = "";
            } else {
                if (t == "file") {
                    var _1f = $(this);
                    _1f.after(_1f.clone().val(""));
                    _1f.remove();
                } else {
                    if (t == "checkbox" || t == "radio") {
                        this.checked = false;
                    } else {
                        if (tag == "select") {
                            this.selectedIndex = -1;
                        }
                    }
                }
            }
        });
        if ($.fn.combo) {
            $(".combo-f", _1e).combo("clear");
        }
        if ($.fn.combobox) {
            $(".combobox-f", _1e).combobox("clear");
        }
        if ($.fn.combotree) {
            $(".combotree-f", _1e).combotree("clear");
        }
        if ($.fn.combogrid) {
            $(".combogrid-f", _1e).combogrid("clear");
        }
        _20(_1e);
    };
    function _21(_22) {
        _22.reset();
        var t = $(_22);
        if ($.fn.combo) {
            t.find(".combo-f").combo("reset");
        }
        if ($.fn.combobox) {
            t.find(".combobox-f").combobox("reset");
        }
        if ($.fn.combotree) {
            t.find(".combotree-f").combotree("reset");
        }
        if ($.fn.combogrid) {
            t.find(".combogrid-f").combogrid("reset");
        }
        if ($.fn.spinner) {
            t.find(".spinner-f").spinner("reset");
        }
        if ($.fn.timespinner) {
            t.find(".timespinner-f").timespinner("reset");
        }
        if ($.fn.numberbox) {
            t.find(".numberbox-f").numberbox("reset");
        }
        if ($.fn.numberspinner) {
            t.find(".numberspinner-f").numberspinner("reset");
        }
        _20(_22);
    };
    function _23(_24) {
        var _25 = $.data(_24, "form").options;
        var _26 = $(_24);
        _26.unbind(".form").bind("submit.form", function () {
            setTimeout(function () {
                _1(_24, _25);
            }, 0);
            return false;
        });
    };
    function _20(_27) {
        if ($.fn.validatebox) {
            var t = $(_27);
            t.find(".validatebox-text:not(:disabled)").validatebox("validate");
            var _28 = t.find(".validatebox-invalid");
            _28.filter(":not(:disabled):first").focus();
            return _28.length == 0;
        }
        return true;
    };
    $.fn.form = function (_29, _2a) {
        if (typeof _29 == "string") {
            return $.fn.form.methods[_29](this, _2a);
        }
        _29 = _29 || {};
        return this.each(function () {
            if (!$.data(this, "form")) {
                $.data(this, "form", {options: $.extend({}, $.fn.form.defaults, _29)});
            }
            _23(this);
        });
    };
    $.fn.form.methods = {
        submit: function (jq, _2b) {
            return jq.each(function () {
                _1(this, $.extend({}, $.fn.form.defaults, _2b || {}));
            });
        }, load: function (jq, _2c) {
            return jq.each(function () {
                _d(this, _2c);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                _1d(this);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                _21(this);
            });
        }, validate: function (jq) {
            return _20(jq[0]);
        }
    };
    $.fn.form.defaults = {
        url: null, onSubmit: function (_2d) {
            return $(this).form("validate");
        }, success: function (_2e) {
        }, onBeforeLoad: function (_2f) {
        }, onLoadSuccess: function (_30) {
        }, onLoadError: function () {
        }
    };
})(jQuery);

