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
    var _1 = false;
    $.fn.resizable = function (_2, _3) {
        if (typeof _2 == "string") {
            return $.fn.resizable.methods[_2](this, _3);
        }
        function _4(e) {
            var _5 = e.data;
            var _6 = $.data(_5.target, "resizable").options;
            if (_5.dir.indexOf("e") != -1) {
                var _7 = _5.startWidth + e.pageX - _5.startX;
                _7 = Math.min(Math.max(_7, _6.minWidth), _6.maxWidth);
                _5.width = _7;
            }
            if (_5.dir.indexOf("s") != -1) {
                var _8 = _5.startHeight + e.pageY - _5.startY;
                _8 = Math.min(Math.max(_8, _6.minHeight), _6.maxHeight);
                _5.height = _8;
            }
            if (_5.dir.indexOf("w") != -1) {
                var _7 = _5.startWidth - e.pageX + _5.startX;
                _7 = Math.min(Math.max(_7, _6.minWidth), _6.maxWidth);
                _5.width = _7;
                _5.left = _5.startLeft + _5.startWidth - _5.width;
            }
            if (_5.dir.indexOf("n") != -1) {
                var _8 = _5.startHeight - e.pageY + _5.startY;
                _8 = Math.min(Math.max(_8, _6.minHeight), _6.maxHeight);
                _5.height = _8;
                _5.top = _5.startTop + _5.startHeight - _5.height;
            }
        };
        function _9(e) {
            var _a = e.data;
            var t = $(_a.target);
            t.css({left: _a.left, top: _a.top});
            if (t.outerWidth() != _a.width) {
                t._outerWidth(_a.width);
            }
            if (t.outerHeight() != _a.height) {
                t._outerHeight(_a.height);
            }
        };
        function _b(e) {
            _1 = true;
            $.data(e.data.target, "resizable").options.onStartResize.call(e.data.target, e);
            return false;
        };
        function _c(e) {
            _4(e);
            if ($.data(e.data.target, "resizable").options.onResize.call(e.data.target, e) != false) {
                _9(e);
            }
            return false;
        };
        function _d(e) {
            _1 = false;
            _4(e, true);
            _9(e);
            $.data(e.data.target, "resizable").options.onStopResize.call(e.data.target, e);
            $(document).unbind(".resizable");
            $("body").css("cursor", "");
            return false;
        };
        return this.each(function () {
            var _e = null;
            var _f = $.data(this, "resizable");
            if (_f) {
                $(this).unbind(".resizable");
                _e = $.extend(_f.options, _2 || {});
            } else {
                _e = $.extend({}, $.fn.resizable.defaults, $.fn.resizable.parseOptions(this), _2 || {});
                $.data(this, "resizable", {options: _e});
            }
            if (_e.disabled == true) {
                return;
            }
            $(this).bind("mousemove.resizable", {target: this}, function (e) {
                if (_1) {
                    return;
                }
                var dir = _10(e);
                if (dir == "") {
                    $(e.data.target).css("cursor", "");
                } else {
                    $(e.data.target).css("cursor", dir + "-resize");
                }
            }).bind("mouseleave.resizable", {target: this}, function (e) {
                $(e.data.target).css("cursor", "");
            }).bind("mousedown.resizable", {target: this}, function (e) {
                var dir = _10(e);
                if (dir == "") {
                    return;
                }
                function _11(css) {
                    var val = parseInt($(e.data.target).css(css));
                    if (isNaN(val)) {
                        return 0;
                    } else {
                        return val;
                    }
                };
                var _12 = {
                    target: e.data.target,
                    dir: dir,
                    startLeft: _11("left"),
                    startTop: _11("top"),
                    left: _11("left"),
                    top: _11("top"),
                    startX: e.pageX,
                    startY: e.pageY,
                    startWidth: $(e.data.target).outerWidth(),
                    startHeight: $(e.data.target).outerHeight(),
                    width: $(e.data.target).outerWidth(),
                    height: $(e.data.target).outerHeight(),
                    deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(),
                    deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height()
                };
                $(document).bind("mousedown.resizable", _12, _b);
                $(document).bind("mousemove.resizable", _12, _c);
                $(document).bind("mouseup.resizable", _12, _d);
                $("body").css("cursor", dir + "-resize");
            });
            function _10(e) {
                var tt = $(e.data.target);
                var dir = "";
                var _13 = tt.offset();
                var _14 = tt.outerWidth();
                var _15 = tt.outerHeight();
                var _16 = _e.edge;
                if (e.pageY > _13.top && e.pageY < _13.top + _16) {
                    dir += "n";
                } else {
                    if (e.pageY < _13.top + _15 && e.pageY > _13.top + _15 - _16) {
                        dir += "s";
                    }
                }
                if (e.pageX > _13.left && e.pageX < _13.left + _16) {
                    dir += "w";
                } else {
                    if (e.pageX < _13.left + _14 && e.pageX > _13.left + _14 - _16) {
                        dir += "e";
                    }
                }
                var _17 = _e.handles.split(",");
                for (var i = 0; i < _17.length; i++) {
                    var _18 = _17[i].replace(/(^\s*)|(\s*$)/g, "");
                    if (_18 == "all" || _18 == dir) {
                        return dir;
                    }
                }
                return "";
            };
        });
    };
    $.fn.resizable.methods = {
        options: function (jq) {
            return $.data(jq[0], "resizable").options;
        }, enable: function (jq) {
            return jq.each(function () {
                $(this).resizable({disabled: false});
            });
        }, disable: function (jq) {
            return jq.each(function () {
                $(this).resizable({disabled: true});
            });
        }
    };
    $.fn.resizable.parseOptions = function (_19) {
        var t = $(_19);
        return $.extend({}, $.parser.parseOptions(_19, ["handles", {
            minWidth: "number",
            minHeight: "number",
            maxWidth: "number",
            maxHeight: "number",
            edge: "number"
        }]), {disabled: (t.attr("disabled") ? true : undefined)});
    };
    $.fn.resizable.defaults = {
        disabled: false,
        handles: "n, e, s, w, ne, se, sw, nw, all",
        minWidth: 10,
        minHeight: 10,
        maxWidth: 10000,
        maxHeight: 10000,
        edge: 5,
        onStartResize: function (e) {
        },
        onResize: function (e) {
        },
        onStopResize: function (e) {
        }
    };
})(jQuery);

