<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>Struts2+JQuery+JSON</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<script type="text/javascript" src="<%=path %>/js/jquery.js"></script>
	<script type="text/javascript" src="<%=path %>/js/json.js"></script>
  </head>
  
  <body>
    <input id="getMessage" type="button" value="获取单个值"/>&nbsp;&nbsp;
    <input id="getUserInfo" type="button" value="获取UserInfo对象"/>&nbsp;&nbsp;
    <input id="getList" type="button" value="获取List对象"/>&nbsp;&nbsp;
    <input id="getMap" type="button" value="获取Map对象"/>&nbsp;&nbsp;
    <br>
    <br>
    <br>
    <!-- 要显示信息的层 -->
    <div class="province">天津</div>
    <div class="province">北京</div>
    <div class="province">上海</div>
    <div id="message"></div>
    <a href="schoolselect">jsontest</a><br>
    <a href="loadProvince">获取所有省份</a><br>
    <a href="querySchoolByRange?rankstart=100&rankend=4000&seqType=1&pagesize=14">按名次升序查询</a><br>
    <a href="querySchoolByRange?rankstart=100&rankend=4000&seqType=2&pagesize=14">按名次降序查询</a><br>
    <a href="querySchoolByRange?rankstart=100&rankend=4000&seqType=3&xuezhi=1&pagesize=14">按学制忌查询</a><br>
    <a href="querySchoolByRange?rankstart=100&rankend=4000&seqType=3&xuezhi=2&pagesize=14">按学制冲查询</a><br>
    <a href="querySchoolByRange?rankstart=100&rankend=4000&seqType=3&xuezhi=3&pagesize=14">按学制稳查询</a><br>
    <a href="querySchoolByRange?rankstart=100&rankend=4000&seqType=3&xuezhi=4&pagesize=14">按学制保查询</a><br>
    <a href="querySchoolByProvince?province=浙江&seqType=1&pagesize=14&start=1">省份按名次升序排列</a><br>
    <a href="querySchoolByProvince?province=浙江&seqType=2&pagesize=14">省份按名次降序排列</a><br>
    <a href="querySchoolByProvince?province=浙江&seqType=3&xuezhi=1&pagesize=14">省份按学制忌查询</a><br>
    <a href="querySchoolByProvince?province=浙江&seqType=3&xuezhi=2&pagesize=14">省份按学制冲查询</a><br>
    <a href="querySchoolByProvince?province=浙江&seqType=3&xuezhi=3&pagesize=14">省份按学制稳查询</a><br>
    <a href="querySchoolByProvince?province=浙江&seqType=3&xuezhi=4&pagesize=14">省份按学制保查询</a><br>
    <a href="queryProfessionBySchool?schoolName=浙江大学&seqType=1">按照学校获取专业升序</a><br>
    <a href="queryProfessionBySchool?schoolName=浙江大学&seqType=2">按照学校获取专业降序</a><br>
    <a href="queryProfessionBySchool?schoolName=浙江大学&seqType=3&xuezhi=1">按照学校获取专业学制排序忌</a><br>
    <a href="queryProfessionBySchool?schoolName=浙江大学&seqType=3&xuezhi=2">按照学校获取专业学制排序冲</a><br>
    <a href="queryProfessionBySchool?schoolName=浙江大学&seqType=3&xuezhi=3">按照学校获取专业学制排序稳</a><br>
    <a href="queryProfessionBySchool?schoolName=浙江大学&seqType=3&xuezhi=4">按照学校获取专业学制排序保</a><br>
    <a href="loadSelectedSchool">获取用户所选学校</a><br>
    <a href="loadSchoolPlan">获取已选学校</a><br>
    <a href="loadProfessionPlan?schoolName=上海交通大学">获取上海交通大学专业</a><br>
    <a href="queryProfession?schoolName=上海交通大学&seqType=1">升序获取上海交通大学专业</a><br>
    <a href="queryProfession?schoolName=上海交通大学&seqType=2">降序获取上海交通大学专业</a><br>
    <a href="queryProfession?schoolName=上海交通大学&seqType=3&xuezhi=1">学制排序忌获取上海交通大学专业</a><br>
    <a href="queryProfession?schoolName=上海交通大学&seqType=3&xuezhi=2">学制排序冲获取上海交通大学专业</a><br>
    <a href="queryProfession?schoolName=上海交通大学&seqType=3&xuezhi=3">学制排序稳获取上海交通大学专业</a><br>
    <a href="queryProfession?schoolName=上海交通大学&seqType=3&xuezhi=4">学制排序保获取上海交通大学专业</a><br>
    <a href="loadProfessionBySchool?schoolName=上海交通大学">获取已经选择的上海交通大学专业</a><br>
    <form>
    	用户ID：<input name="userInfo.userId" type="text"/><br/>
    	用户名：<input name="userInfo.userName" type="text"/><br/>
    	密&nbsp;&nbsp;&nbsp;码：<input name="userInfo.password" type="text"/><br>
    	<input id="regRe" type="button" value="注册"/>
    </form>
  </body>
</html>
