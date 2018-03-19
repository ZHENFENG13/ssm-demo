<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//Dtd HTML 4.01 Transitional//EN">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>ssm-maven系统登录</title>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>--%>
    <style type=text/css>
        body {
            text-align: center;
            padding-bottom: 0px;
            background-color: #ddeef2;
            margin: 0px;
            padding-left: 0px;
            padding-right: 0px;
            padding-top: 0px
        }

        A:link {
            COLOR: #000000;
            text-decoration: none
        }

        A:visited {
            COLOR: #000000;
            text-decoration: none
        }

        A:hover {
            COLOR: #ff0000;
            text-decoration: underline
        }

        A:active {
            text-decoration: none
        }

        .input {
            border-bottom: #ccc 1px solid;
            border-left: #ccc 1px solid;
            line-height: 20px;
            width: 182px;
            height: 20px;
            border-top: #ccc 1px solid;
            border-right: #ccc 1px solid
        }

        .input1 {
            border-bottom: #ccc 1px solid;
            border-left: #ccc 1px solid;
            line-height: 20px;
            width: 120px;
            height: 20px;
            border-top: #ccc 1px solid;
            border-right: #ccc 1px solid;
        }
    </style>
    <script type="text/javascript">
        function login() {
            var userName = $("#userName").val();
            var password = $("#password").val();
            var roleName = $("#roleName").val();
            if (userName == null || userName == "") {
                alert("用户名不能为空！");
                return;
            }
            if (password == null || password == "") {
                alert("密码不能为空！");
                return;
            }
            $("#adminlogin").submit();

        }
    </script>
</head>
<body>
<form id=adminlogin method=post
      name=adminlogin action="${pageContext.request.contextPath}/user/login.do">
    <div></div>
    <table style="margin: auto; width: 100%; height: 100%" border=0
           cellSpacing=0 cellPadding=0>
        <tbody>
        <tr>
            <td height=150>&nbsp;</td>
        </tr>
        <tr style="height: 254px">
            <td>
                <div style="margin: 0px auto; width: 936px"><img
                        style="display: block" src="${pageContext.request.contextPath}/images/body_03.jpg"></div>
                <div style="background-color: #278296">
                    <div style="margin: 0px auto; width: 936px">
                        <div
                                style="BACKGROUND: url(${pageContext.request.contextPath}/images/body_05.jpg) no-repeat; height: 155px">
                            <div
                                    style="text-align: left; width: 265px; float: right; height: 125px; _height: 95px">
                                <table border=0 cellSpacing=0 cellPadding=0 width="100%">
                                    <tbody>
                                    <tr>
                                        <td style="height: 45px"><input type="text" class=input
                                                                        value="${user.userName }" name="userName"
                                                                        id="userName"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="password" class=input value="${user.password }" name="password"
                                                   id="password"/></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style="height: 1px; clear: both"></div>
                            <div style="width: 380px; float: right; clear: both">
                                <table border=0 cellSpacing=0 cellPadding=0 width=300>
                                    <tbody>

                                    <tr>
                                        <td width=100 align=right><input
                                                style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px"
                                                id=btnLogin src="${pageContext.request.contextPath}/images/btn1.jpg"
                                                type=image name=btnLogin onclick="javascript:login();return false;">
                                        </td>
                                        <td width=100 align=middle><input
                                                style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px"
                                                id=btnReset src="${pageContext.request.contextPath}/images/btn2.jpg"
                                                type=image name=btnReset
                                                onclick="javascript:adminlogin.reset();return false;"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin: 0px auto; width: 936px"><img
                        src="${pageContext.request.contextPath}/images/body_06.jpg"></div>
            </td>
        </tr>
        <tr style="height: 30%">
            <td>&nbsp;</td>
        </tr>
        </tbody>
    </table>
</form>
</body>
</html>
<script type=text/javascript>
    if ('${errorMsg}' != '') {
        alert('${errorMsg}');
    }
</script>