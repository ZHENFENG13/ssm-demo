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

    function _2(_3) {
        var _4 = $.data(_3, "layout");
        var _5 = _4.options;
        var _6 = _4.panels;
        var cc = $(_3);
        if (_3.tagName == "BODY") {
            cc._fit();
        } else {
            _5.fit ? cc.css(cc._fit()) : cc._fit(false);
        }
        var _7 = {top: 0, left: 0, width: cc.width(), height: cc.height()};

        function _8(pp) {
            if (pp.length == 0) {
                return;
            }
            var _9 = pp.panel("options");
            var _a = Math.min(Math.max(_9.height, _9.minHeight), _9.maxHeight);
            pp.panel("resize", {width: cc.width(), height: _a, left: 0, top: 0});
            _7.top += _a;
            _7.height -= _a;
        };
        if (_14(_6.expandNorth)) {
            _8(_6.expandNorth);
        } else {
            _8(_6.north);
        }
        function _b(pp) {
            if (pp.length == 0) {
                return;
            }
            var _c = pp.panel("options");
            var _d = Math.min(Math.max(_c.height, _c.minHeight), _c.maxHeight);
            pp.panel("resize", {width: cc.width(), height: _d, left: 0, top: cc.height() - _d});
            _7.height -= _d;
        };
        if (_14(_6.expandSouth)) {
            _b(_6.expandSouth);
        } else {
            _b(_6.south);
        }
        function _e(pp) {
            if (pp.length == 0) {
                return;
            }
            var _f = pp.panel("options");
            var _10 = Math.min(Math.max(_f.width, _f.minWidth), _f.maxWidth);
            pp.panel("resize", {width: _10, height: _7.height, left: cc.width() - _10, top: _7.top});
            _7.width -= _10;
        };
        if (_14(_6.expandEast)) {
            _e(_6.expandEast);
        } else {
            _e(_6.east);
        }
        function _11(pp) {
            if (pp.length == 0) {
                return;
            }
            var _12 = pp.panel("options");
            var _13 = Math.min(Math.max(_12.width, _12.minWidth), _12.maxWidth);
            pp.panel("resize", {width: _13, height: _7.height, left: 0, top: _7.top});
            _7.left += _13;
            _7.width -= _13;
        };
        if (_14(_6.expandWest)) {
            _11(_6.expandWest);
        } else {
            _11(_6.west);
        }
        _6.center.panel("resize", _7);
    };
    function _15(_16) {
        var cc = $(_16);
        cc.addClass("layout");
        function _17(cc) {
            cc.children("div").each(function () {
                var _18 = $.parser.parseOptions(this, ["region", {
                    split: "boolean",
                    minWidth: "number",
                    minHeight: "number",
                    maxWidth: "number",
                    maxHeight: "number"
                }]);
                var r = _18.region;
                if (r == "north" || r == "south" || r == "east" || r == "west" || r == "center") {
                    _1b(_16, _18, this);
                }
            });
        };
        cc.children("form").length ? _17(cc.children("form")) : _17(cc);
        $("<div class=\"layout-split-proxy-h\"></div>").appendTo(cc);
        $("<div class=\"layout-split-proxy-v\"></div>").appendTo(cc);
        cc.bind("_resize", function (e, _19) {
            var _1a = $.data(_16, "layout").options;
            if (_1a.fit == true || _19) {
                _2(_16);
            }
            return false;
        });
    };
    function _1b(_1c, _1d, el) {
        _1d.region = _1d.region || "center";
        var _1e = $.data(_1c, "layout").panels;
        var cc = $(_1c);
        var dir = _1d.region;
        if (_1e[dir].length) {
            return;
        }
        var pp = $(el);
        if (!pp.length) {
            pp = $("<div></div>").appendTo(cc);
        }
        pp.panel($.extend({minWidth: 10, minHeight: 10, maxWidth: 10000, maxHeight: 10000}, {
            width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
            height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
            doSize: false,
            collapsible: true,
            cls: ("layout-panel layout-panel-" + dir),
            bodyCls: "layout-body",
            onOpen: function () {
                var _1f = $(this).panel("header").children("div.panel-tool");
                _1f.children("a.panel-tool-collapse").hide();
                var _20 = {north: "up", south: "down", east: "right", west: "left"};
                if (!_20[dir]) {
                    return;
                }
                var _21 = "layout-button-" + _20[dir];
                var t = _1f.children("a." + _21);
                if (!t.length) {
                    t = $("<a href=\"javascript:void(0)\"></a>").addClass(_21).appendTo(_1f);
                    t.bind("click", {dir: dir}, function (e) {
                        _2f(_1c, e.data.dir);
                        return false;
                    });
                }
                $(this).panel("options").collapsible ? t.show() : t.hide();
            }
        }, _1d));
        _1e[dir] = pp;
        if (pp.panel("options").split) {
            var _22 = pp.panel("panel");
            _22.addClass("layout-split-" + dir);
            var _23 = "";
            if (dir == "north") {
                _23 = "s";
            }
            if (dir == "south") {
                _23 = "n";
            }
            if (dir == "east") {
                _23 = "w";
            }
            if (dir == "west") {
                _23 = "e";
            }
            _22.resizable($.extend({}, {
                handles: _23, onStartResize: function (e) {
                    _1 = true;
                    if (dir == "north" || dir == "south") {
                        var _24 = $(">div.layout-split-proxy-v", _1c);
                    } else {
                        var _24 = $(">div.layout-split-proxy-h", _1c);
                    }
                    var top = 0, _25 = 0, _26 = 0, _27 = 0;
                    var pos = {display: "block"};
                    if (dir == "north") {
                        pos.top = parseInt(_22.css("top")) + _22.outerHeight() - _24.height();
                        pos.left = parseInt(_22.css("left"));
                        pos.width = _22.outerWidth();
                        pos.height = _24.height();
                    } else {
                        if (dir == "south") {
                            pos.top = parseInt(_22.css("top"));
                            pos.left = parseInt(_22.css("left"));
                            pos.width = _22.outerWidth();
                            pos.height = _24.height();
                        } else {
                            if (dir == "east") {
                                pos.top = parseInt(_22.css("top")) || 0;
                                pos.left = parseInt(_22.css("left")) || 0;
                                pos.width = _24.width();
                                pos.height = _22.outerHeight();
                            } else {
                                if (dir == "west") {
                                    pos.top = parseInt(_22.css("top")) || 0;
                                    pos.left = _22.outerWidth() - _24.width();
                                    pos.width = _24.width();
                                    pos.height = _22.outerHeight();
                                }
                            }
                        }
                    }
                    _24.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                }, onResize: function (e) {
                    if (dir == "north" || dir == "south") {
                        var _28 = $(">div.layout-split-proxy-v", _1c);
                        _28.css("top", e.pageY - $(_1c).offset().top - _28.height() / 2);
                    } else {
                        var _28 = $(">div.layout-split-proxy-h", _1c);
                        _28.css("left", e.pageX - $(_1c).offset().left - _28.width() / 2);
                    }
                    return false;
                }, onStopResize: function () {
                    $(">div.layout-split-proxy-v", _1c).css("display", "none");
                    $(">div.layout-split-proxy-h", _1c).css("display", "none");
                    var _29 = pp.panel("options");
                    _29.width = _22.outerWidth();
                    _29.height = _22.outerHeight();
                    _29.left = _22.css("left");
                    _29.top = _22.css("top");
                    pp.panel("resize");
                    _2(_1c);
                    _1 = false;
                    cc.find(">div.layout-mask").remove();
                }
            }, _1d));
        }
    };
    function _2a(_2b, _2c) {
        var _2d = $.data(_2b, "layout").panels;
        if (_2d[_2c].length) {
            _2d[_2c].panel("destroy");
            _2d[_2c] = $();
            var _2e = "expand" + _2c.substring(0, 1).toUpperCase() + _2c.substring(1);
            if (_2d[_2e]) {
                _2d[_2e].panel("destroy");
                _2d[_2e] = undefined;
            }
        }
    };
    function _2f(_30, _31, _32) {
        if (_32 == undefined) {
            _32 = "normal";
        }
        var _33 = $.data(_30, "layout").panels;
        var p = _33[_31];
        if (p.panel("options").onBeforeCollapse.call(p) == false) {
            return;
        }
        var _34 = "expand" + _31.substring(0, 1).toUpperCase() + _31.substring(1);
        if (!_33[_34]) {
            _33[_34] = _35(_31);
            _33[_34].panel("panel").click(function () {
                var _36 = _37();
                p.panel("expand", false).panel("open").panel("resize", _36.collapse);
                p.panel("panel").animate(_36.expand, _32, function () {
                    $(this).unbind(".layout").bind("mouseleave.layout", {region: _31}, function (e) {
                        if (_1 == true) {
                            return;
                        }
                        _2f(_30, e.data.region);
                    });
                });
                return false;
            });
        }
        var _38 = _37();
        if (!_14(_33[_34])) {
            _33.center.panel("resize", _38.resizeC);
        }
        p.panel("panel").animate(_38.collapse, _32, function () {
            p.panel("collapse", false).panel("close");
            _33[_34].panel("open").panel("resize", _38.expandP);
            $(this).unbind(".layout");
        });
        function _35(dir) {
            var _39;
            if (dir == "east") {
                _39 = "layout-button-left";
            } else {
                if (dir == "west") {
                    _39 = "layout-button-right";
                } else {
                    if (dir == "north") {
                        _39 = "layout-button-down";
                    } else {
                        if (dir == "south") {
                            _39 = "layout-button-up";
                        }
                    }
                }
            }
            var p = $("<div></div>").appendTo(_30).panel({
                cls: "layout-expand", title: "&nbsp;", closed: true, doSize: false, tools: [{
                    iconCls: _39, handler: function () {
                        _3a(_30, _31);
                        return false;
                    }
                }]
            });
            p.panel("panel").hover(function () {
                $(this).addClass("layout-expand-over");
            }, function () {
                $(this).removeClass("layout-expand-over");
            });
            return p;
        };
        function _37() {
            var cc = $(_30);
            if (_31 == "east") {
                return {
                    resizeC: {width: _33.center.panel("options").width + _33["east"].panel("options").width - 28},
                    expand: {left: cc.width() - _33["east"].panel("options").width},
                    expandP: {
                        top: _33["east"].panel("options").top,
                        left: cc.width() - 28,
                        width: 28,
                        height: _33["center"].panel("options").height
                    },
                    collapse: {left: cc.width()}
                };
            } else {
                if (_31 == "west") {
                    return {
                        resizeC: {
                            width: _33.center.panel("options").width + _33["west"].panel("options").width - 28,
                            left: 28
                        },
                        expand: {left: 0},
                        expandP: {
                            left: 0,
                            top: _33["west"].panel("options").top,
                            width: 28,
                            height: _33["center"].panel("options").height
                        },
                        collapse: {left: -_33["west"].panel("options").width}
                    };
                } else {
                    if (_31 == "north") {
                        var hh = cc.height() - 28;
                        if (_14(_33.expandSouth)) {
                            hh -= _33.expandSouth.panel("options").height;
                        } else {
                            if (_14(_33.south)) {
                                hh -= _33.south.panel("options").height;
                            }
                        }
                        _33.east.panel("resize", {top: 28, height: hh});
                        _33.west.panel("resize", {top: 28, height: hh});
                        if (_14(_33.expandEast)) {
                            _33.expandEast.panel("resize", {top: 28, height: hh});
                        }
                        if (_14(_33.expandWest)) {
                            _33.expandWest.panel("resize", {top: 28, height: hh});
                        }
                        return {
                            resizeC: {top: 28, height: hh},
                            expand: {top: 0},
                            expandP: {top: 0, left: 0, width: cc.width(), height: 28},
                            collapse: {top: -_33["north"].panel("options").height}
                        };
                    } else {
                        if (_31 == "south") {
                            var hh = cc.height() - 28;
                            if (_14(_33.expandNorth)) {
                                hh -= _33.expandNorth.panel("options").height;
                            } else {
                                if (_14(_33.north)) {
                                    hh -= _33.north.panel("options").height;
                                }
                            }
                            _33.east.panel("resize", {height: hh});
                            _33.west.panel("resize", {height: hh});
                            if (_14(_33.expandEast)) {
                                _33.expandEast.panel("resize", {height: hh});
                            }
                            if (_14(_33.expandWest)) {
                                _33.expandWest.panel("resize", {height: hh});
                            }
                            return {
                                resizeC: {height: hh},
                                expand: {top: cc.height() - _33["south"].panel("options").height},
                                expandP: {top: cc.height() - 28, left: 0, width: cc.width(), height: 28},
                                collapse: {top: cc.height()}
                            };
                        }
                    }
                }
            }
        };
    };
    function _3a(_3b, _3c) {
        var _3d = $.data(_3b, "layout").panels;
        var _3e = _3f();
        var p = _3d[_3c];
        if (p.panel("options").onBeforeExpand.call(p) == false) {
            return;
        }
        var _40 = "expand" + _3c.substring(0, 1).toUpperCase() + _3c.substring(1);
        _3d[_40].panel("close");
        p.panel("panel").stop(true, true);
        p.panel("expand", false).panel("open").panel("resize", _3e.collapse);
        p.panel("panel").animate(_3e.expand, function () {
            _2(_3b);
        });
        function _3f() {
            var cc = $(_3b);
            if (_3c == "east" && _3d.expandEast) {
                return {collapse: {left: cc.width()}, expand: {left: cc.width() - _3d["east"].panel("options").width}};
            } else {
                if (_3c == "west" && _3d.expandWest) {
                    return {collapse: {left: -_3d["west"].panel("options").width}, expand: {left: 0}};
                } else {
                    if (_3c == "north" && _3d.expandNorth) {
                        return {collapse: {top: -_3d["north"].panel("options").height}, expand: {top: 0}};
                    } else {
                        if (_3c == "south" && _3d.expandSouth) {
                            return {
                                collapse: {top: cc.height()},
                                expand: {top: cc.height() - _3d["south"].panel("options").height}
                            };
                        }
                    }
                }
            }
        };
    };
    function _14(pp) {
        if (!pp) {
            return false;
        }
        if (pp.length) {
            return pp.panel("panel").is(":visible");
        } else {
            return false;
        }
    };
    function _41(_42) {
        var _43 = $.data(_42, "layout").panels;
        if (_43.east.length && _43.east.panel("options").collapsed) {
            _2f(_42, "east", 0);
        }
        if (_43.west.length && _43.west.panel("options").collapsed) {
            _2f(_42, "west", 0);
        }
        if (_43.north.length && _43.north.panel("options").collapsed) {
            _2f(_42, "north", 0);
        }
        if (_43.south.length && _43.south.panel("options").collapsed) {
            _2f(_42, "south", 0);
        }
    };
    $.fn.layout = function (_44, _45) {
        if (typeof _44 == "string") {
            return $.fn.layout.methods[_44](this, _45);
        }
        _44 = _44 || {};
        return this.each(function () {
            var _46 = $.data(this, "layout");
            if (_46) {
                $.extend(_46.options, _44);
            } else {
                var _47 = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), _44);
                $.data(this, "layout", {
                    options: _47,
                    panels: {center: $(), north: $(), south: $(), east: $(), west: $()}
                });
                _15(this);
            }
            _2(this);
            _41(this);
        });
    };
    $.fn.layout.methods = {
        resize: function (jq) {
            return jq.each(function () {
                _2(this);
            });
        }, panel: function (jq, _48) {
            return $.data(jq[0], "layout").panels[_48];
        }, collapse: function (jq, _49) {
            return jq.each(function () {
                _2f(this, _49);
            });
        }, expand: function (jq, _4a) {
            return jq.each(function () {
                _3a(this, _4a);
            });
        }, add: function (jq, _4b) {
            return jq.each(function () {
                _1b(this, _4b);
                _2(this);
                if ($(this).layout("panel", _4b.region).panel("options").collapsed) {
                    _2f(this, _4b.region, 0);
                }
            });
        }, remove: function (jq, _4c) {
            return jq.each(function () {
                _2a(this, _4c);
                _2(this);
            });
        }
    };
    $.fn.layout.parseOptions = function (_4d) {
        return $.extend({}, $.parser.parseOptions(_4d, [{fit: "boolean"}]));
    };
    $.fn.layout.defaults = {fit: false};
})(jQuery);

