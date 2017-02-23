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
        var _3 = $.data(_2, "treegrid");
        var _4 = _3.options;
        $(_2).datagrid($.extend({}, _4, {
            url: null, data: null, loader: function () {
                return false;
            }, onBeforeLoad: function () {
            }, onLoadSuccess: function () {
            }, onResizeColumn: function (_5, _6) {
                _20(_2);
                _4.onResizeColumn.call(_2, _5, _6);
            }, onSortColumn: function (_7, _8) {
                _4.sortName = _7;
                _4.sortOrder = _8;
                if (_4.remoteSort) {
                    _1f(_2);
                } else {
                    var _9 = $(_2).treegrid("getData");
                    _39(_2, 0, _9);
                }
                _4.onSortColumn.call(_2, _7, _8);
            }, onBeforeEdit: function (_a, _b) {
                if (_4.onBeforeEdit.call(_2, _b) == false) {
                    return false;
                }
            }, onAfterEdit: function (_c, _d, _e) {
                _4.onAfterEdit.call(_2, _d, _e);
            }, onCancelEdit: function (_f, row) {
                _4.onCancelEdit.call(_2, row);
            }, onSelect: function (_10) {
                _4.onSelect.call(_2, _41(_2, _10));
            }, onUnselect: function (_11) {
                _4.onUnselect.call(_2, _41(_2, _11));
            }, onSelectAll: function () {
                _4.onSelectAll.call(_2, $.data(_2, "treegrid").data);
            }, onUnselectAll: function () {
                _4.onUnselectAll.call(_2, $.data(_2, "treegrid").data);
            }, onCheck: function (_12) {
                _4.onCheck.call(_2, _41(_2, _12));
            }, onUncheck: function (_13) {
                _4.onUncheck.call(_2, _41(_2, _13));
            }, onCheckAll: function () {
                _4.onCheckAll.call(_2, $.data(_2, "treegrid").data);
            }, onUncheckAll: function () {
                _4.onUncheckAll.call(_2, $.data(_2, "treegrid").data);
            }, onClickRow: function (_14) {
                _4.onClickRow.call(_2, _41(_2, _14));
            }, onDblClickRow: function (_15) {
                _4.onDblClickRow.call(_2, _41(_2, _15));
            }, onClickCell: function (_16, _17) {
                _4.onClickCell.call(_2, _17, _41(_2, _16));
            }, onDblClickCell: function (_18, _19) {
                _4.onDblClickCell.call(_2, _19, _41(_2, _18));
            }, onRowContextMenu: function (e, _1a) {
                _4.onContextMenu.call(_2, e, _41(_2, _1a));
            }
        }));
        if (!_4.columns) {
            var _1b = $.data(_2, "datagrid").options;
            _4.columns = _1b.columns;
            _4.frozenColumns = _1b.frozenColumns;
        }
        _3.dc = $.data(_2, "datagrid").dc;
        if (_4.pagination) {
            var _1c = $(_2).datagrid("getPager");
            _1c.pagination({
                pageNumber: _4.pageNumber,
                pageSize: _4.pageSize,
                pageList: _4.pageList,
                onSelectPage: function (_1d, _1e) {
                    _4.pageNumber = _1d;
                    _4.pageSize = _1e;
                    _1f(_2);
                }
            });
            _4.pageSize = _1c.pagination("options").pageSize;
        }
    };
    function _20(_21, _22) {
        var _23 = $.data(_21, "datagrid").options;
        var dc = $.data(_21, "datagrid").dc;
        if (!dc.body1.is(":empty") && (!_23.nowrap || _23.autoRowHeight)) {
            if (_22 != undefined) {
                var _24 = _25(_21, _22);
                for (var i = 0; i < _24.length; i++) {
                    _26(_24[i][_23.idField]);
                }
            }
        }
        $(_21).datagrid("fixRowHeight", _22);
        function _26(_27) {
            var tr1 = _23.finder.getTr(_21, _27, "body", 1);
            var tr2 = _23.finder.getTr(_21, _27, "body", 2);
            tr1.css("height", "");
            tr2.css("height", "");
            var _28 = Math.max(tr1.height(), tr2.height());
            tr1.css("height", _28);
            tr2.css("height", _28);
        };
    };
    function _29(_2a) {
        var dc = $.data(_2a, "datagrid").dc;
        var _2b = $.data(_2a, "treegrid").options;
        if (!_2b.rownumbers) {
            return;
        }
        dc.body1.find("div.datagrid-cell-rownumber").each(function (i) {
            $(this).html(i + 1);
        });
    };
    function _2c(_2d) {
        var dc = $.data(_2d, "datagrid").dc;
        var _2e = dc.body1.add(dc.body2);
        var _2f = ($.data(_2e[0], "events") || $._data(_2e[0], "events")).click[0].handler;
        dc.body1.add(dc.body2).bind("mouseover", function (e) {
            var tt = $(e.target);
            var tr = tt.closest("tr.datagrid-row");
            if (!tr.length) {
                return;
            }
            if (tt.hasClass("tree-hit")) {
                tt.hasClass("tree-expanded") ? tt.addClass("tree-expanded-hover") : tt.addClass("tree-collapsed-hover");
            }
            e.stopPropagation();
        }).bind("mouseout", function (e) {
            var tt = $(e.target);
            var tr = tt.closest("tr.datagrid-row");
            if (!tr.length) {
                return;
            }
            if (tt.hasClass("tree-hit")) {
                tt.hasClass("tree-expanded") ? tt.removeClass("tree-expanded-hover") : tt.removeClass("tree-collapsed-hover");
            }
            e.stopPropagation();
        }).unbind("click").bind("click", function (e) {
            var tt = $(e.target);
            var tr = tt.closest("tr.datagrid-row");
            if (!tr.length) {
                return;
            }
            if (tt.hasClass("tree-hit")) {
                _30(_2d, tr.attr("node-id"));
            } else {
                _2f(e);
            }
            e.stopPropagation();
        });
    };
    function _31(_32, _33) {
        var _34 = $.data(_32, "treegrid").options;
        var tr1 = _34.finder.getTr(_32, _33, "body", 1);
        var tr2 = _34.finder.getTr(_32, _33, "body", 2);
        var _35 = $(_32).datagrid("getColumnFields", true).length + (_34.rownumbers ? 1 : 0);
        var _36 = $(_32).datagrid("getColumnFields", false).length;
        _37(tr1, _35);
        _37(tr2, _36);
        function _37(tr, _38) {
            $("<tr class=\"treegrid-tr-tree\">" + "<td style=\"border:0px\" colspan=\"" + _38 + "\">" + "<div></div>" + "</td>" + "</tr>").insertAfter(tr);
        };
    };
    function _39(_3a, _3b, _3c, _3d) {
        var _3e = $.data(_3a, "treegrid");
        var _3f = _3e.options;
        var dc = _3e.dc;
        _3c = _3f.loadFilter.call(_3a, _3c, _3b);
        var _40 = _41(_3a, _3b);
        if (_40) {
            var _42 = _3f.finder.getTr(_3a, _3b, "body", 1);
            var _43 = _3f.finder.getTr(_3a, _3b, "body", 2);
            var cc1 = _42.next("tr.treegrid-tr-tree").children("td").children("div");
            var cc2 = _43.next("tr.treegrid-tr-tree").children("td").children("div");
            if (!_3d) {
                _40.children = [];
            }
        } else {
            var cc1 = dc.body1;
            var cc2 = dc.body2;
            if (!_3d) {
                _3e.data = [];
            }
        }
        if (!_3d) {
            cc1.empty();
            cc2.empty();
        }
        if (_3f.view.onBeforeRender) {
            _3f.view.onBeforeRender.call(_3f.view, _3a, _3b, _3c);
        }
        _3f.view.render.call(_3f.view, _3a, cc1, true);
        _3f.view.render.call(_3f.view, _3a, cc2, false);
        if (_3f.showFooter) {
            _3f.view.renderFooter.call(_3f.view, _3a, dc.footer1, true);
            _3f.view.renderFooter.call(_3f.view, _3a, dc.footer2, false);
        }
        if (_3f.view.onAfterRender) {
            _3f.view.onAfterRender.call(_3f.view, _3a);
        }
        _3f.onLoadSuccess.call(_3a, _40, _3c);
        if (!_3b && _3f.pagination) {
            var _44 = $.data(_3a, "treegrid").total;
            var _45 = $(_3a).datagrid("getPager");
            if (_45.pagination("options").total != _44) {
                _45.pagination({total: _44});
            }
        }
        _20(_3a);
        _29(_3a);
        $(_3a).treegrid("autoSizeColumn");
    };
    function _1f(_46, _47, _48, _49, _4a) {
        var _4b = $.data(_46, "treegrid").options;
        var _4c = $(_46).datagrid("getPanel").find("div.datagrid-body");
        if (_48) {
            _4b.queryParams = _48;
        }
        var _4d = $.extend({}, _4b.queryParams);
        if (_4b.pagination) {
            $.extend(_4d, {page: _4b.pageNumber, rows: _4b.pageSize});
        }
        if (_4b.sortName) {
            $.extend(_4d, {sort: _4b.sortName, order: _4b.sortOrder});
        }
        var row = _41(_46, _47);
        if (_4b.onBeforeLoad.call(_46, row, _4d) == false) {
            return;
        }
        var _4e = _4c.find("tr[node-id=" + _47 + "] span.tree-folder");
        _4e.addClass("tree-loading");
        $(_46).treegrid("loading");
        var _4f = _4b.loader.call(_46, _4d, function (_50) {
            _4e.removeClass("tree-loading");
            $(_46).treegrid("loaded");
            _39(_46, _47, _50, _49);
            if (_4a) {
                _4a();
            }
        }, function () {
            _4e.removeClass("tree-loading");
            $(_46).treegrid("loaded");
            _4b.onLoadError.apply(_46, arguments);
            if (_4a) {
                _4a();
            }
        });
        if (_4f == false) {
            _4e.removeClass("tree-loading");
            $(_46).treegrid("loaded");
        }
    };
    function _51(_52) {
        var _53 = _54(_52);
        if (_53.length) {
            return _53[0];
        } else {
            return null;
        }
    };
    function _54(_55) {
        return $.data(_55, "treegrid").data;
    };
    function _56(_57, _58) {
        var row = _41(_57, _58);
        if (row._parentId) {
            return _41(_57, row._parentId);
        } else {
            return null;
        }
    };
    function _25(_59, _5a) {
        var _5b = $.data(_59, "treegrid").options;
        var _5c = $(_59).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
        var _5d = [];
        if (_5a) {
            _5e(_5a);
        } else {
            var _5f = _54(_59);
            for (var i = 0; i < _5f.length; i++) {
                _5d.push(_5f[i]);
                _5e(_5f[i][_5b.idField]);
            }
        }
        function _5e(_60) {
            var _61 = _41(_59, _60);
            if (_61 && _61.children) {
                for (var i = 0, len = _61.children.length; i < len; i++) {
                    var _62 = _61.children[i];
                    _5d.push(_62);
                    _5e(_62[_5b.idField]);
                }
            }
        };
        return _5d;
    };
    function _63(_64) {
        var _65 = _66(_64);
        if (_65.length) {
            return _65[0];
        } else {
            return null;
        }
    };
    function _66(_67) {
        var _68 = [];
        var _69 = $(_67).datagrid("getPanel");
        _69.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function () {
            var id = $(this).attr("node-id");
            _68.push(_41(_67, id));
        });
        return _68;
    };
    function _6a(_6b, _6c) {
        if (!_6c) {
            return 0;
        }
        var _6d = $.data(_6b, "treegrid").options;
        var _6e = $(_6b).datagrid("getPanel").children("div.datagrid-view");
        var _6f = _6e.find("div.datagrid-body tr[node-id=" + _6c + "]").children("td[field=" + _6d.treeField + "]");
        return _6f.find("span.tree-indent,span.tree-hit").length;
    };
    function _41(_70, _71) {
        var _72 = $.data(_70, "treegrid").options;
        var _73 = $.data(_70, "treegrid").data;
        var cc = [_73];
        while (cc.length) {
            var c = cc.shift();
            for (var i = 0; i < c.length; i++) {
                var _74 = c[i];
                if (_74[_72.idField] == _71) {
                    return _74;
                } else {
                    if (_74["children"]) {
                        cc.push(_74["children"]);
                    }
                }
            }
        }
        return null;
    };
    function _75(_76, _77) {
        var _78 = $.data(_76, "treegrid").options;
        var row = _41(_76, _77);
        var tr = _78.finder.getTr(_76, _77);
        var hit = tr.find("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-collapsed")) {
            return;
        }
        if (_78.onBeforeCollapse.call(_76, row) == false) {
            return;
        }
        hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        hit.next().removeClass("tree-folder-open");
        row.state = "closed";
        tr = tr.next("tr.treegrid-tr-tree");
        var cc = tr.children("td").children("div");
        if (_78.animate) {
            cc.slideUp("normal", function () {
                $(_76).treegrid("autoSizeColumn");
                _20(_76, _77);
                _78.onCollapse.call(_76, row);
            });
        } else {
            cc.hide();
            $(_76).treegrid("autoSizeColumn");
            _20(_76, _77);
            _78.onCollapse.call(_76, row);
        }
    };
    function _79(_7a, _7b) {
        var _7c = $.data(_7a, "treegrid").options;
        var tr = _7c.finder.getTr(_7a, _7b);
        var hit = tr.find("span.tree-hit");
        var row = _41(_7a, _7b);
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-expanded")) {
            return;
        }
        if (_7c.onBeforeExpand.call(_7a, row) == false) {
            return;
        }
        hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        hit.next().addClass("tree-folder-open");
        var _7d = tr.next("tr.treegrid-tr-tree");
        if (_7d.length) {
            var cc = _7d.children("td").children("div");
            _7e(cc);
        } else {
            _31(_7a, row[_7c.idField]);
            var _7d = tr.next("tr.treegrid-tr-tree");
            var cc = _7d.children("td").children("div");
            cc.hide();
            _1f(_7a, row[_7c.idField], {id: row[_7c.idField]}, true, function () {
                if (cc.is(":empty")) {
                    _7d.remove();
                } else {
                    _7e(cc);
                }
            });
        }
        function _7e(cc) {
            row.state = "open";
            if (_7c.animate) {
                cc.slideDown("normal", function () {
                    $(_7a).treegrid("autoSizeColumn");
                    _20(_7a, _7b);
                    _7c.onExpand.call(_7a, row);
                });
            } else {
                cc.show();
                $(_7a).treegrid("autoSizeColumn");
                _20(_7a, _7b);
                _7c.onExpand.call(_7a, row);
            }
        };
    };
    function _30(_7f, _80) {
        var _81 = $.data(_7f, "treegrid").options;
        var tr = _81.finder.getTr(_7f, _80);
        var hit = tr.find("span.tree-hit");
        if (hit.hasClass("tree-expanded")) {
            _75(_7f, _80);
        } else {
            _79(_7f, _80);
        }
    };
    function _82(_83, _84) {
        var _85 = $.data(_83, "treegrid").options;
        var _86 = _25(_83, _84);
        if (_84) {
            _86.unshift(_41(_83, _84));
        }
        for (var i = 0; i < _86.length; i++) {
            _75(_83, _86[i][_85.idField]);
        }
    };
    function _87(_88, _89) {
        var _8a = $.data(_88, "treegrid").options;
        var _8b = _25(_88, _89);
        if (_89) {
            _8b.unshift(_41(_88, _89));
        }
        for (var i = 0; i < _8b.length; i++) {
            _79(_88, _8b[i][_8a.idField]);
        }
    };
    function _8c(_8d, _8e) {
        var _8f = $.data(_8d, "treegrid").options;
        var ids = [];
        var p = _56(_8d, _8e);
        while (p) {
            var id = p[_8f.idField];
            ids.unshift(id);
            p = _56(_8d, id);
        }
        for (var i = 0; i < ids.length; i++) {
            _79(_8d, ids[i]);
        }
    };
    function _90(_91, _92) {
        var _93 = $.data(_91, "treegrid").options;
        if (_92.parent) {
            var tr = _93.finder.getTr(_91, _92.parent);
            if (tr.next("tr.treegrid-tr-tree").length == 0) {
                _31(_91, _92.parent);
            }
            var _94 = tr.children("td[field=" + _93.treeField + "]").children("div.datagrid-cell");
            var _95 = _94.children("span.tree-icon");
            if (_95.hasClass("tree-file")) {
                _95.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_95);
                if (hit.prev().length) {
                    hit.prev().remove();
                }
            }
        }
        _39(_91, _92.parent, _92.data, true);
    };
    function _96(_97, _98) {
        var ref = _98.before || _98.after;
        var _99 = $.data(_97, "treegrid").options;
        var _9a = _56(_97, ref);
        _90(_97, {parent: (_9a ? _9a[_99.idField] : null), data: [_98.data]});
        _9b(true);
        _9b(false);
        _29(_97);
        function _9b(_9c) {
            var _9d = _9c ? 1 : 2;
            var tr = _99.finder.getTr(_97, _98.data[_99.idField], "body", _9d);
            var _9e = tr.closest("table.datagrid-btable");
            tr = tr.parent().children();
            var _9f = _99.finder.getTr(_97, ref, "body", _9d);
            if (_98.before) {
                tr.insertBefore(_9f);
            } else {
                var sub = _9f.next("tr.treegrid-tr-tree");
                tr.insertAfter(sub.length ? sub : _9f);
            }
            _9e.remove();
        };
    };
    function _a0(_a1, _a2) {
        var _a3 = $.data(_a1, "treegrid").options;
        var tr = _a3.finder.getTr(_a1, _a2);
        tr.next("tr.treegrid-tr-tree").remove();
        tr.remove();
        var _a4 = del(_a2);
        if (_a4) {
            if (_a4.children.length == 0) {
                tr = _a3.finder.getTr(_a1, _a4[_a3.idField]);
                tr.next("tr.treegrid-tr-tree").remove();
                var _a5 = tr.children("td[field=" + _a3.treeField + "]").children("div.datagrid-cell");
                _a5.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                _a5.find(".tree-hit").remove();
                $("<span class=\"tree-indent\"></span>").prependTo(_a5);
            }
        }
        _29(_a1);
        function del(id) {
            var cc;
            var _a6 = _56(_a1, _a2);
            if (_a6) {
                cc = _a6.children;
            } else {
                cc = $(_a1).treegrid("getData");
            }
            for (var i = 0; i < cc.length; i++) {
                if (cc[i][_a3.idField] == id) {
                    cc.splice(i, 1);
                    break;
                }
            }
            return _a6;
        };
    };
    $.fn.treegrid = function (_a7, _a8) {
        if (typeof _a7 == "string") {
            var _a9 = $.fn.treegrid.methods[_a7];
            if (_a9) {
                return _a9(this, _a8);
            } else {
                return this.datagrid(_a7, _a8);
            }
        }
        _a7 = _a7 || {};
        return this.each(function () {
            var _aa = $.data(this, "treegrid");
            if (_aa) {
                $.extend(_aa.options, _a7);
            } else {
                _aa = $.data(this, "treegrid", {
                    options: $.extend({}, $.fn.treegrid.defaults, $.fn.treegrid.parseOptions(this), _a7),
                    data: []
                });
            }
            _1(this);
            if (_aa.options.data) {
                $(this).treegrid("loadData", _aa.options.data);
            }
            _1f(this);
            _2c(this);
        });
    };
    $.fn.treegrid.methods = {
        options: function (jq) {
            return $.data(jq[0], "treegrid").options;
        }, resize: function (jq, _ab) {
            return jq.each(function () {
                $(this).datagrid("resize", _ab);
            });
        }, fixRowHeight: function (jq, _ac) {
            return jq.each(function () {
                _20(this, _ac);
            });
        }, loadData: function (jq, _ad) {
            return jq.each(function () {
                _39(this, _ad.parent, _ad);
            });
        }, reload: function (jq, id) {
            return jq.each(function () {
                if (id) {
                    var _ae = $(this).treegrid("find", id);
                    if (_ae.children) {
                        _ae.children.splice(0, _ae.children.length);
                    }
                    var _af = $(this).datagrid("getPanel").find("div.datagrid-body");
                    var tr = _af.find("tr[node-id=" + id + "]");
                    tr.next("tr.treegrid-tr-tree").remove();
                    var hit = tr.find("span.tree-hit");
                    hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    _79(this, id);
                } else {
                    _1f(this, null, {});
                }
            });
        }, reloadFooter: function (jq, _b0) {
            return jq.each(function () {
                var _b1 = $.data(this, "treegrid").options;
                var dc = $.data(this, "datagrid").dc;
                if (_b0) {
                    $.data(this, "treegrid").footer = _b0;
                }
                if (_b1.showFooter) {
                    _b1.view.renderFooter.call(_b1.view, this, dc.footer1, true);
                    _b1.view.renderFooter.call(_b1.view, this, dc.footer2, false);
                    if (_b1.view.onAfterRender) {
                        _b1.view.onAfterRender.call(_b1.view, this);
                    }
                    $(this).treegrid("fixRowHeight");
                }
            });
        }, getData: function (jq) {
            return $.data(jq[0], "treegrid").data;
        }, getFooterRows: function (jq) {
            return $.data(jq[0], "treegrid").footer;
        }, getRoot: function (jq) {
            return _51(jq[0]);
        }, getRoots: function (jq) {
            return _54(jq[0]);
        }, getParent: function (jq, id) {
            return _56(jq[0], id);
        }, getChildren: function (jq, id) {
            return _25(jq[0], id);
        }, getSelected: function (jq) {
            return _63(jq[0]);
        }, getSelections: function (jq) {
            return _66(jq[0]);
        }, getLevel: function (jq, id) {
            return _6a(jq[0], id);
        }, find: function (jq, id) {
            return _41(jq[0], id);
        }, isLeaf: function (jq, id) {
            var _b2 = $.data(jq[0], "treegrid").options;
            var tr = _b2.finder.getTr(jq[0], id);
            var hit = tr.find("span.tree-hit");
            return hit.length == 0;
        }, select: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("selectRow", id);
            });
        }, unselect: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("unselectRow", id);
            });
        }, collapse: function (jq, id) {
            return jq.each(function () {
                _75(this, id);
            });
        }, expand: function (jq, id) {
            return jq.each(function () {
                _79(this, id);
            });
        }, toggle: function (jq, id) {
            return jq.each(function () {
                _30(this, id);
            });
        }, collapseAll: function (jq, id) {
            return jq.each(function () {
                _82(this, id);
            });
        }, expandAll: function (jq, id) {
            return jq.each(function () {
                _87(this, id);
            });
        }, expandTo: function (jq, id) {
            return jq.each(function () {
                _8c(this, id);
            });
        }, append: function (jq, _b3) {
            return jq.each(function () {
                _90(this, _b3);
            });
        }, insert: function (jq, _b4) {
            return jq.each(function () {
                _96(this, _b4);
            });
        }, remove: function (jq, id) {
            return jq.each(function () {
                _a0(this, id);
            });
        }, pop: function (jq, id) {
            var row = jq.treegrid("find", id);
            jq.treegrid("remove", id);
            return row;
        }, refresh: function (jq, id) {
            return jq.each(function () {
                var _b5 = $.data(this, "treegrid").options;
                _b5.view.refreshRow.call(_b5.view, this, id);
            });
        }, update: function (jq, _b6) {
            return jq.each(function () {
                var _b7 = $.data(this, "treegrid").options;
                _b7.view.updateRow.call(_b7.view, this, _b6.id, _b6.row);
            });
        }, beginEdit: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("beginEdit", id);
                $(this).treegrid("fixRowHeight", id);
            });
        }, endEdit: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("endEdit", id);
            });
        }, cancelEdit: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("cancelEdit", id);
            });
        }
    };
    $.fn.treegrid.parseOptions = function (_b8) {
        return $.extend({}, $.fn.datagrid.parseOptions(_b8), $.parser.parseOptions(_b8, ["treeField", {animate: "boolean"}]));
    };
    var _b9 = $.extend({}, $.fn.datagrid.defaults.view, {
        render: function (_ba, _bb, _bc) {
            var _bd = $.data(_ba, "treegrid").options;
            var _be = $(_ba).datagrid("getColumnFields", _bc);
            var _bf = $.data(_ba, "datagrid").rowIdPrefix;
            if (_bc) {
                if (!(_bd.rownumbers || (_bd.frozenColumns && _bd.frozenColumns.length))) {
                    return;
                }
            }
            var _c0 = 0;
            var _c1 = this;
            var _c2 = _c3(_bc, this.treeLevel, this.treeNodes);
            $(_bb).append(_c2.join(""));
            function _c3(_c4, _c5, _c6) {
                var _c7 = ["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                for (var i = 0; i < _c6.length; i++) {
                    var row = _c6[i];
                    if (row.state != "open" && row.state != "closed") {
                        row.state = "open";
                    }
                    var cls = (_c0++ % 2 && _bd.striped) ? "class=\"datagrid-row datagrid-row-alt\"" : "class=\"datagrid-row\"";
                    var _c8 = _bd.rowStyler ? _bd.rowStyler.call(_ba, row) : "";
                    var _c9 = _c8 ? "style=\"" + _c8 + "\"" : "";
                    var _ca = _bf + "-" + (_c4 ? 1 : 2) + "-" + row[_bd.idField];
                    _c7.push("<tr id=\"" + _ca + "\" node-id=\"" + row[_bd.idField] + "\" " + cls + " " + _c9 + ">");
                    _c7 = _c7.concat(_c1.renderRow.call(_c1, _ba, _be, _c4, _c5, row));
                    _c7.push("</tr>");
                    if (row.children && row.children.length) {
                        var tt = _c3(_c4, _c5 + 1, row.children);
                        var v = row.state == "closed" ? "none" : "block";
                        _c7.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan=" + (_be.length + (_bd.rownumbers ? 1 : 0)) + "><div style=\"display:" + v + "\">");
                        _c7 = _c7.concat(tt);
                        _c7.push("</div></td></tr>");
                    }
                }
                _c7.push("</tbody></table>");
                return _c7;
            };
        }, renderFooter: function (_cb, _cc, _cd) {
            var _ce = $.data(_cb, "treegrid").options;
            var _cf = $.data(_cb, "treegrid").footer || [];
            var _d0 = $(_cb).datagrid("getColumnFields", _cd);
            var _d1 = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
            for (var i = 0; i < _cf.length; i++) {
                var row = _cf[i];
                row[_ce.idField] = row[_ce.idField] || ("foot-row-id" + i);
                _d1.push("<tr class=\"datagrid-row\" node-id=" + row[_ce.idField] + ">");
                _d1.push(this.renderRow.call(this, _cb, _d0, _cd, 0, row));
                _d1.push("</tr>");
            }
            _d1.push("</tbody></table>");
            $(_cc).html(_d1.join(""));
        }, renderRow: function (_d2, _d3, _d4, _d5, row) {
            var _d6 = $.data(_d2, "treegrid").options;
            var cc = [];
            if (_d4 && _d6.rownumbers) {
                cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
            }
            for (var i = 0; i < _d3.length; i++) {
                var _d7 = _d3[i];
                var col = $(_d2).datagrid("getColumnOption", _d7);
                if (col) {
                    var _d8 = col.styler ? (col.styler(row[_d7], row) || "") : "";
                    var _d9 = col.hidden ? "style=\"display:none;" + _d8 + "\"" : (_d8 ? "style=\"" + _d8 + "\"" : "");
                    cc.push("<td field=\"" + _d7 + "\" " + _d9 + ">");
                    if (col.checkbox) {
                        var _d9 = "";
                    } else {
                        var _d9 = _d8;
                        if (col.align) {
                            _d9 += ";text-align:" + col.align + ";";
                        }
                        if (!_d6.nowrap) {
                            _d9 += ";white-space:normal;height:auto;";
                        } else {
                            if (_d6.autoRowHeight) {
                                _d9 += ";height:auto;";
                            }
                        }
                    }
                    cc.push("<div style=\"" + _d9 + "\" ");
                    if (col.checkbox) {
                        cc.push("class=\"datagrid-cell-check ");
                    } else {
                        cc.push("class=\"datagrid-cell " + col.cellClass);
                    }
                    cc.push("\">");
                    if (col.checkbox) {
                        if (row.checked) {
                            cc.push("<input type=\"checkbox\" checked=\"checked\"");
                        } else {
                            cc.push("<input type=\"checkbox\"");
                        }
                        cc.push(" name=\"" + _d7 + "\" value=\"" + (row[_d7] != undefined ? row[_d7] : "") + "\"/>");
                    } else {
                        var val = null;
                        if (col.formatter) {
                            val = col.formatter(row[_d7], row);
                        } else {
                            val = row[_d7];
                        }
                        if (_d7 == _d6.treeField) {
                            for (var j = 0; j < _d5; j++) {
                                cc.push("<span class=\"tree-indent\"></span>");
                            }
                            if (row.state == "closed") {
                                cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
                                cc.push("<span class=\"tree-icon tree-folder " + (row.iconCls ? row.iconCls : "") + "\"></span>");
                            } else {
                                if (row.children && row.children.length) {
                                    cc.push("<span class=\"tree-hit tree-expanded\"></span>");
                                    cc.push("<span class=\"tree-icon tree-folder tree-folder-open " + (row.iconCls ? row.iconCls : "") + "\"></span>");
                                } else {
                                    cc.push("<span class=\"tree-indent\"></span>");
                                    cc.push("<span class=\"tree-icon tree-file " + (row.iconCls ? row.iconCls : "") + "\"></span>");
                                }
                            }
                            cc.push("<span class=\"tree-title\">" + val + "</span>");
                        } else {
                            cc.push(val);
                        }
                    }
                    cc.push("</div>");
                    cc.push("</td>");
                }
            }
            return cc.join("");
        }, refreshRow: function (_da, id) {
            this.updateRow.call(this, _da, id, {});
        }, updateRow: function (_db, id, row) {
            var _dc = $.data(_db, "treegrid").options;
            var _dd = $(_db).treegrid("find", id);
            $.extend(_dd, row);
            var _de = $(_db).treegrid("getLevel", id) - 1;
            var _df = _dc.rowStyler ? _dc.rowStyler.call(_db, _dd) : "";

            function _e0(_e1) {
                var _e2 = $(_db).treegrid("getColumnFields", _e1);
                var tr = _dc.finder.getTr(_db, id, "body", (_e1 ? 1 : 2));
                var _e3 = tr.find("div.datagrid-cell-rownumber").html();
                var _e4 = tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                tr.html(this.renderRow(_db, _e2, _e1, _de, _dd));
                tr.attr("style", _df || "");
                tr.find("div.datagrid-cell-rownumber").html(_e3);
                if (_e4) {
                    tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                }
            };
            _e0.call(this, true);
            _e0.call(this, false);
            $(_db).treegrid("fixRowHeight", id);
        }, onBeforeRender: function (_e5, _e6, _e7) {
            if ($.isArray(_e6)) {
                _e7 = {total: _e6.length, rows: _e6};
                _e6 = null;
            }
            if (!_e7) {
                return false;
            }
            var _e8 = $.data(_e5, "treegrid");
            var _e9 = _e8.options;
            if (_e7.length == undefined) {
                if (_e7.footer) {
                    _e8.footer = _e7.footer;
                }
                if (_e7.total) {
                    _e8.total = _e7.total;
                }
                _e7 = this.transfer(_e5, _e6, _e7.rows);
            } else {
                function _ea(_eb, _ec) {
                    for (var i = 0; i < _eb.length; i++) {
                        var row = _eb[i];
                        row._parentId = _ec;
                        if (row.children && row.children.length) {
                            _ea(row.children, row[_e9.idField]);
                        }
                    }
                };
                _ea(_e7, _e6);
            }
            var _ed = _41(_e5, _e6);
            if (_ed) {
                if (_ed.children) {
                    _ed.children = _ed.children.concat(_e7);
                } else {
                    _ed.children = _e7;
                }
            } else {
                _e8.data = _e8.data.concat(_e7);
            }
            if (!_e9.remoteSort) {
                this.sort(_e5, _e7);
            }
            this.treeNodes = _e7;
            this.treeLevel = $(_e5).treegrid("getLevel", _e6);
        }, sort: function (_ee, _ef) {
            var _f0 = $.data(_ee, "treegrid").options;
            var opt = $(_ee).treegrid("getColumnOption", _f0.sortName);
            if (opt) {
                var _f1 = opt.sorter || function (a, b) {
                        return (a > b ? 1 : -1);
                    };
                _f2(_ef);
            }
            function _f2(_f3) {
                _f3.sort(function (r1, r2) {
                    return _f1(r1[_f0.sortName], r2[_f0.sortName]) * (_f0.sortOrder == "asc" ? 1 : -1);
                });
                for (var i = 0; i < _f3.length; i++) {
                    var _f4 = _f3[i].children;
                    if (_f4 && _f4.length) {
                        _f2(_f4);
                    }
                }
            };
        }, transfer: function (_f5, _f6, _f7) {
            var _f8 = $.data(_f5, "treegrid").options;
            var _f9 = [];
            for (var i = 0; i < _f7.length; i++) {
                _f9.push(_f7[i]);
            }
            var _fa = [];
            for (var i = 0; i < _f9.length; i++) {
                var row = _f9[i];
                if (!_f6) {
                    if (!row._parentId) {
                        _fa.push(row);
                        _f9.splice(i, 1);
                        i--;
                    }
                } else {
                    if (row._parentId == _f6) {
                        _fa.push(row);
                        _f9.splice(i, 1);
                        i--;
                    }
                }
            }
            var _fb = [];
            for (var i = 0; i < _fa.length; i++) {
                _fb.push(_fa[i]);
            }
            while (_fb.length) {
                var _fc = _fb.shift();
                for (var i = 0; i < _f9.length; i++) {
                    var row = _f9[i];
                    if (row._parentId == _fc[_f8.idField]) {
                        if (_fc.children) {
                            _fc.children.push(row);
                        } else {
                            _fc.children = [row];
                        }
                        _fb.push(row);
                        _f9.splice(i, 1);
                        i--;
                    }
                }
            }
            return _fa;
        }
    });
    $.fn.treegrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
        treeField: null, animate: false, singleSelect: true, view: _b9, loader: function (_fd, _fe, _ff) {
            var opts = $(this).treegrid("options");
            if (!opts.url) {
                return false;
            }
            $.ajax({
                type: opts.method, url: opts.url, data: _fd, dataType: "json", success: function (data) {
                    _fe(data);
                }, error: function () {
                    _ff.apply(this, arguments);
                }
            });
        }, loadFilter: function (data, _100) {
            return data;
        }, finder: {
            getTr: function (_101, id, type, _102) {
                type = type || "body";
                _102 = _102 || 0;
                var dc = $.data(_101, "datagrid").dc;
                if (_102 == 0) {
                    var opts = $.data(_101, "treegrid").options;
                    var tr1 = opts.finder.getTr(_101, id, type, 1);
                    var tr2 = opts.finder.getTr(_101, id, type, 2);
                    return tr1.add(tr2);
                } else {
                    if (type == "body") {
                        var tr = $("#" + $.data(_101, "datagrid").rowIdPrefix + "-" + _102 + "-" + id);
                        if (!tr.length) {
                            tr = (_102 == 1 ? dc.body1 : dc.body2).find("tr[node-id=" + id + "]");
                        }
                        return tr;
                    } else {
                        if (type == "footer") {
                            return (_102 == 1 ? dc.footer1 : dc.footer2).find("tr[node-id=" + id + "]");
                        } else {
                            if (type == "selected") {
                                return (_102 == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row-selected");
                            } else {
                                if (type == "highlight") {
                                    return (_102 == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row-over");
                                } else {
                                    if (type == "checked") {
                                        return (_102 == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row:has(div.datagrid-cell-check input:checked)");
                                    } else {
                                        if (type == "last") {
                                            return (_102 == 1 ? dc.body1 : dc.body2).find("tr:last[node-id]");
                                        } else {
                                            if (type == "allbody") {
                                                return (_102 == 1 ? dc.body1 : dc.body2).find("tr[node-id]");
                                            } else {
                                                if (type == "allfooter") {
                                                    return (_102 == 1 ? dc.footer1 : dc.footer2).find("tr[node-id]");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, getRow: function (_103, p) {
                var id = (typeof p == "object") ? p.attr("node-id") : p;
                return $(_103).treegrid("find", id);
            }
        }, onBeforeLoad: function (row, _104) {
        }, onLoadSuccess: function (row, data) {
        }, onLoadError: function () {
        }, onBeforeCollapse: function (row) {
        }, onCollapse: function (row) {
        }, onBeforeExpand: function (row) {
        }, onExpand: function (row) {
        }, onClickRow: function (row) {
        }, onDblClickRow: function (row) {
        }, onClickCell: function (_105, row) {
        }, onDblClickCell: function (_106, row) {
        }, onContextMenu: function (e, row) {
        }, onBeforeEdit: function (row) {
        }, onAfterEdit: function (row, _107) {
        }, onCancelEdit: function (row) {
        }
    });
})(jQuery);

