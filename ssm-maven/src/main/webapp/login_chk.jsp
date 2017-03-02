<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%--防强值跳转 --%>
<%
    if (session.getAttribute("currentUser") == null) {
        out.println("<script>alert('登录超时，请先登录！');window.location.href='login.jsp';</script>");
    }
%>
