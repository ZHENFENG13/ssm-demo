<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%--防强值跳转 --%>
<%
    if (session.getAttribute("currentUser") == null) {
        out.println("<script>window.location.href='" + session.getServletContext().getContextPath() + "/login.jsp';</script>");
    }
%>
