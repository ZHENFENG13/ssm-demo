<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>bookInfo</title>
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/jquery-easyui-1.3.3/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/jquery-easyui-1.3.3/themes/icon.css">
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.3.3/jquery.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
    <%
        String storeId = request.getParameter("storeId");
    %>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/js/common.js"></script>
    <script type="text/javascript">
        var url;


        function emptyWarehouse() {
            var selectedRows = $("#dg").datagrid('getSelections');
            if (selectedRows.length == 0) {
                $.messager.alert("系统提示", "请选择要出库的数据！");
                return;
            }
            var strIds = [];
            for (var i = 0; i < selectedRows.length; i++) {
                strIds.push(selectedRows[i].id);
            }
            var ids = strIds.join(",");
            $.messager.confirm("系统提示", "确认要执行此操作吗？", function (r) {
                if (r) {
                    $.post("${pageContext.request.contextPath}/storeBook/emptyWarehouse.do",
                            {
                                ids: ids,
                            }, function (result) {
                                if (result.success) {
                                    $.messager.alert("系统提示", "操作成功！");
                                    $("#dg").datagrid("reload");
                                } else {
                                    $.messager.alert("系统提示", "操作失败！");
                                }
                            }, "json");
                }
            });

        }
        function outWarehouse() {
            var selectedRows = $("#dg").datagrid('getSelections');
            if (selectedRows.length == 0) {
                $.messager.alert("系统提示", "请选择要出库的数据！");
                return;
            }
            var strIds = [];
            for (var i = 0; i < selectedRows.length; i++) {
                strIds.push(selectedRows[i].id);
            }
            var ids = strIds.join(",");
            $.messager.confirm("系统提示", "确认要执行此操作吗？", function (r) {
                if (r) {
                    $.post("${pageContext.request.contextPath}/storeBook/outWarehouse.do",
                            {
                                ids: ids,
                            }, function (result) {
                                if (result.success) {
                                    $.messager.alert("系统提示", "操作成功！");
                                    $("#dg").datagrid("reload");
                                } else {
                                    $.messager.alert("系统提示", "操作失败！");
                                }
                            }, "json");
                }
            });

        }
        function formatProPic(val, row) {
            return "<img width=80 height=110 src='../" + val + "'>";
        }

        function resetValue() {
            $("#isbn").val("");
        }

        function closeCategoryDialog() {
            $("#dlg").dialog("close");
            resetValue();
        }
    </script>
</head>
<body style="margin:1px;" id="ff">
<table id="dg" title="书籍信息" class="easyui-datagrid" pagination="true"
       rownumbers="true" fit="true" data-options="pageSize:20"
       url="${pageContext.request.contextPath}/storeBook/list.do?storeId=<%=storeId %>"
       toolbar="#tb">
    <thead data-options="frozen:true">
    <tr>
        <th field="cb" checkbox="true" align="center"></th>
        <th field="id" width="10%" align="center" hidden="true">编号</th>
        <th field="book.title" width="300" align="center">书名</th>
        <th field="book.path" width="300" align="center"
            formatter="formatProPic">封面
        </th>
        <th field="number" width="300" align="center">数量</th>
    </tr>
    </thead>
</table>
<div id="tb">
    <div>
        <a href="javascript:outWarehouse()" class="easyui-linkbutton"
           iconCls="icon-remove" plain="true">出库</a> <a
            href="javascript:emptyWarehouse()" class="easyui-linkbutton"
            iconCls="icon-remove" plain="true">全部出库</a>
    </div>
</div>


</body>
</html>