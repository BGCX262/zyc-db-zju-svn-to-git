/**
 * Created with JetBrains WebStorm.
 * User: zyc
 * Date: 12-11-25
 * Time: 上午2:39
 * To change this template use File | Settings | File Templates.
 */

/**
 * 获取dom元素工具类
 * @constructor
 */
function DomSelect_Common(){}
DomSelect_Common.prototype = {

    getMenuBtn: function(){
        return $("#menu");
    },
    getLookupSchoolBtn: function(){
        return $("#lookupSchool");
    },
    getLogoutBtn: function(){
        return $(".logout");
    },
    getFgBtn: function(){
        return $(".fg-button");
    },
    getSearchSchoolInfoBtn: function(){
        return $(".searchSchoolInfo");
    },
    getSearchFieldOfOneSchool: function(){
        return $(".searchFieldOfOneSchool");
    },
    getSearchFieldOfAllSchool: function(){
        return $(".searchFieldOfAllSchool");
    },
    getSearchSchoolConfirmBtn: function(){
        return $(".searchSchoolForm .button .confirm");
    },
    getSearchSchoolCancelBtn: function(){
        return $(".searchSchoolForm .button .cancel");
    },
    getSavePlanConfirmBtn: function(){
        return $(".savePlanWin .button .confirm");
    },
    getSavePlanCancelBtn: function(){
        return $(".savePlanWin .button .cancel");
    },
    getSearchFieldConfirmBtn: function(){
        return $(".searchFieldForm .button .confirm");
    },
    getSearchFieldCancelBtn: function(){
        return $(".searchFieldForm .button .cancel");
    },
    getSearchSchoolForm: function(){
        return $(".searchSchoolForm");
    },
    getSearchFieldForm: function(){
        return $(".searchFieldForm");
    },
    getSavePlanWin: function(){
        return $(".savePlanWin");
    },

    getReturnBtn: function(){
        return $(".fieldAllSchool .returnBtn");
    },

    getFieldsAllSchool: function(){
        return $(".fieldAllSchool");
    },

    getSearchSchoolResultTable: function(){
        return $(".searchSchoolResultTable");
    },

    getSearchFieldOfSchoolResultTable: function(){
        return $(".searchFieldOfSchoolResultTable");
    },

    getSearchFieldOfAllSchoolResultTable: function(){
        return $(".fieldAllSchool");
    }
};

/**
 * ajax 请求工具类
 * @constructor
 */
function AjaxFunc_Common(){}
AjaxFunc_Common.prototype = {

    postPlan: function(paramsObj){
        var dfd = new jQuery.Deferred();
        var url = 'data/common/savePlan.json';
        $.postJSON(url, paramsObj, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    savePlan:  function(planname){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'saveplan';
//        var url = 'data/common/savePlan.json';
        $.postJSON(url, {planname: planname}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getSearchSchoolResult: function(paramsObj){
        var dfd = new jQuery.Deferred();
//        var url = 'data/common/schoolResult.json';
        var url = HOST_URL + 'searchschool';
        $.postJSON(url, paramsObj, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getSearchFieldResult: function(school, field){
        var dfd = new jQuery.Deferred();
//        var url = 'data/common/searchField.json';
        var url = HOST_URL + 'searchmajor';
        $.postJSON(url, {schoolname: school, professionname: field}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getSearchFieldResult2: function(field){
        var dfd = new jQuery.Deferred();
//        var url = 'data/common/searchField.json';
        var url = HOST_URL + 'postprofession' ;
        $.postJSON(url, {professionname: field}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getStudentInfo: function(){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'getstudent';
//        var url = 'data/studentInfo.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    logout: function(){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'logout';
//        var url = 'data/common/savePlan.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getAllPlans: function(){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'getallplanname';
//        var url = 'data/common/savePlan.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    }

};

/**
 * 其他功能函数集合类
 * @constructor
 */
function Util_Common(){}
Util_Common.prototype = {
    createSearchSchoolResultTable: function(data){
        var headTr = $("<tr></tr>").append($("<th></th>",{"rowspan":2, "width": 150, "style": 'font-size:20px',"class":"head1"}).text("院校名称"));
        $.each(data.year, function(idx, rec){
            headTr.append($("<th></th>",{"colspan": 4}).text(
                "" + rec.year + "" + rec.province + "" + rec.wenlike + "第"+ rec.pici + "批次" +
                "分数线"+rec.score + "分"
            ));
        });
        headTr.append(
            $("<th></th>",{"rowspan": 2}).text('2013年招生人数'),
            $("<th></th>",{"rowspan": 2, "width": 80}).text('院校地址')
        );
        var tBody = domSelect_common.getSearchSchoolResultTable().find("tbody");
        tBody.empty();
        $.each(data.record, function(index, rec){
            var bodyTr = $("<tr></tr>");
            $.each(rec, function(idx, r){
                bodyTr.append($("<td></td>").text(r<0?"":r));
            });
            tBody.append(bodyTr);
        });

        $(domSelect_common.getSearchSchoolResultTable().find("thead").find("tr")[0]).remove();
        domSelect_common.getSearchSchoolResultTable().find("thead").prepend(headTr);

    },

    createSearchFieldOfOneSchoolResultTable: function(data, fieldname, schoolname){
        domSelect_common.getSearchFieldOfSchoolResultTable().find("tbody")
            .empty();
        var trs = [$("<tr></tr>").append(
            $("<td></td>",{"rowspan": 4}).text(schoolname),
            $("<td></td>",{"rowspan": 4}).text(fieldname)
        ), $("<tr></tr>") , $("<tr></tr>"), $("<tr></tr>")];
        $.each(data.list, function(index, rec){
            trs[index].append(
                $("<td></td>").text(rec.year<0? "":rec.year),
                $("<td></td>").text(rec.renshu<0? "":rec.renshu),
                $("<td></td>").text(rec.max<0? "":rec.max),
                $("<td></td>").text(rec.maxRank<0? "":rec.maxRank),
                $("<td></td>").text(rec.min<0? "":rec.min),
                $("<td></td>").text(rec.minRank<0? "":rec.minRank),
                $("<td></td>").text(rec.average<0? "":rec.average),
                $("<td></td>").text(rec.averageRank<0? "":rec.averageRank)
            );
            domSelect_common.getSearchFieldOfSchoolResultTable().find("tbody")
                .append(trs[index]);
        });

    },

    createSearchFieldOfAllSchoolResultTable: function(data, fieldname){
        $(domSelect_common.getSearchFieldOfAllSchoolResultTable().find("tr")[0]).find("th.tableleft")
            .text(fieldname);
        var ths =  $(domSelect_common.getSearchFieldOfAllSchoolResultTable().find("tr")[0]).find("th.tablemiddle");
        $.each(data.year, function(i, y){
            $(ths[i]).text(y + '年');
        });
        var tbody = domSelect_common.getSearchFieldOfAllSchoolResultTable().find("tbody");
        tbody.empty();
        $.each(data.record, function(index, re){
            var tr = $("<tr></tr>");
            var cs;
            $.each(re, function(j, r){
                if(j % 2 == 0){
                    cs = "tableleft";
                }else{
                    cs = "tableright";
                }
                if(j == 8){
                    cs = "tableleftright";
                }
                tr.append($("<td></td>",{"class": cs}).text(r));
            });
            tbody.append(tr);
        });
    }
};

var domSelect_common = new DomSelect_Common();
var ajaxFunc_common = new AjaxFunc_Common();
var util_common = new Util_Common();

/**
 * 页面加载完成
 */
$(document).ready(function(){

    ajaxFunc_common.getStudentInfo().done(function(data){
        $(".info .kemu").empty().text(data.kemu);
        $(".info .mingci").empty().text(data.mingci);
        $(".info .studentname").empty().text(data.name);
        $(".info .totalscore").empty().text(data.score);
    });

    $(".logout").click(function(){
        jConfirm("确认退出?" ,"提示", function(btn){
            if(btn){
                $("body").mask();
                ajaxFunc_common.logout().done(function(data){
                    if(data.success){
                        $("body").unmask();
                        jAlert("成功退出！","提示",function(){
                            window.location.href = "login.html";
                        });
                    }else{
                        $("body").unmask();
                        jAlert("退出失败！","提示");
                    }
                });
            }
        });
    });

    ajaxFunc_common.getAllPlans().done(function(data){
        $.each(data, function(i,p){
            $(".savedPlansList").append(
                $("<li></li>").append(
                    $("<a></a>",{href: "#","class":"plan"}).text(p)
                )
            );
        });

        changeCursorStyle_Menu();
        bindEvent_Menu();
    });
});

function bindEvent_Menu(){

    // 菜单栏事件
    domSelect_common.getFgBtn().hover(
        function(){ $(this).addClass('focus'); },
        function(){ $(this).removeClass('focus'); }
    );
    domSelect_common.getMenuBtn().menu({
        content: $('#menu-items').html(),
        flyOut: true,
        width: 120
    });
    domSelect_common.getLookupSchoolBtn().menu({
        content: $('#lookupSchool_items').html(),
        flyOut: true,
        width: 180
    });

    domSelect_common.getSearchSchoolConfirmBtn().click(function(){
        var schoolName = $("#inputSchool").val();
        if(schoolName){
            $("#inputSchool").val("");
            ajaxFunc_common.getSearchSchoolResult([schoolName]).done(function(data){
                if(data.success){
                    domSelect_common.getSearchSchoolForm().hide();
                    domSelect_common.getSearchSchoolResultTable().show().css({
                        top: ( getWindowHeight() - domSelect_common.getSearchSchoolResultTable().height()) / 2,
                        left: ( getWindowWidth() - domSelect_common.getSearchSchoolResultTable().width() ) / 2
                    });
                    util_common.createSearchSchoolResultTable(data);
                }else{
                    jAlert("不存在该院校！","提示")
                }
            });
        }else{
            jAlert("请输入院校名称,谢谢！","提示");
        }
    });
    domSelect_common.getSearchSchoolCancelBtn().click(function(){
        $("body").unmask();
        domSelect_common.getSearchSchoolForm().hide();
    });
    domSelect_common.getSavePlanCancelBtn().click(function(){
        $("body").unmask();
        domSelect_common.getSavePlanWin().hide();
    });
//
//    domSelect_common.getSavePlanConfirmBtn().click(function(){
//        var planname = $("#inputPlanName").val();
//        if(planname){
//            ajaxFunc_common.savePlan(planname).done(function(data){
//                if(data.success){
//                    $("#inputPlanName").val("");
//                    domSelect_common.getSavePlanWin().hide();
//                    $(".savedPlansList").append(
//                        $("<li></li>").append(
//                            $("<a></a>",{href: "#",class:"plan"}).text(planname)
//                        )
//                    );
//                    domSelect_common.getMenuBtn().menu({
//                        content: $('#menu-items').html(),
//                        flyOut: true,
//                        width: 120
//                    });
//                    $("body").unmask();
//                    jAlert("方案保存成功！","提示");
//                }else{
//                    jAlert("保存失败，抱歉！","提示");
//                }
//            });
//        }else{
//            jAlert("请输入保存方案名称,谢谢！","提示");
//        }
//    });

    domSelect_common.getReturnBtn().click(function(){
        $("body").unmask();
        domSelect_common.getFieldsAllSchool().hide();
    });

    domSelect_common.getSearchFieldConfirmBtn().click(function(){
        var fieldName = $("#inputField").val();
        var schoolName = $("#inputSchool2").val();
        if($("#inputSchool2").css("display") != "none"){
            if(!fieldName){
                jAlert("请输入专业名称，谢谢！","提示");
            }else if(!schoolName){
                jAlert("请输入院校名称, 谢谢！","提示");
            }else if(fieldName && schoolName){
                ajaxFunc_common.getSearchFieldResult(schoolName, fieldName).done(function(data){
                    if(data.success){
                        domSelect_common.getSearchFieldForm().hide();
                        domSelect_common.getSearchFieldOfSchoolResultTable().show().css({
                            top: ( getWindowHeight() - domSelect_common.getSearchFieldOfSchoolResultTable().height()) / 2,
                            left: ( getWindowWidth() - domSelect_common.getSearchFieldOfSchoolResultTable().width() ) / 2
                        });
                       util_common.createSearchFieldOfOneSchoolResultTable(data, fieldName, schoolName);
                    }else{
                        jAlert("未查到数据，抱歉！","提示");
                    }
                });
            }
        }else{
            if(!fieldName){
                jAlert("请输入专业名称，谢谢！","提示");
            }else{
                ajaxFunc_common.getSearchFieldResult2(fieldName).done(function(data){
                    if(data.success){
                        window.location.href = "fieldsofallschool.html";
//                        domSelect_common.getSearchFieldForm().hide();
//                        util_common.createSearchFieldOfAllSchoolResultTable(data, fieldName);
//                        domSelect_common.getFieldsAllSchool().show();
//                        var height = domSelect_common.getFieldsAllSchool().find("table").height() + 50;
//                        if(height <= 500){
//                            domSelect_common.getFieldsAllSchool().css({
//                                height: height,
//                                overflow: 'hidden'
//                            });
//                        }else{
//                            domSelect_common.getFieldsAllSchool().css({
//                                height: 500,
//                                overflowY: 'scroll'
//                            });
//                        }
//                        domSelect_common.getFieldsAllSchool().show().css({
//                            top: (getWindowHeight() -  domSelect_common.getFieldsAllSchool().height() ) / 2,
//                            left: (getWindowWidth() - domSelect_common.getFieldsAllSchool().width()) / 2
//                        });
                    }else{
                        jAlert("未查到数据, 抱歉！","提示");
                    }
                });
            }
        }
    });
    domSelect_common.getSearchFieldCancelBtn().click(function(){
        $("body").unmask();
        domSelect_common.getSearchFieldForm().hide();
    });
}

// 更改鼠标样式
function changeCursorStyle_Menu(){

    domSelect_common.getLogoutBtn().hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    domSelect_common.getSearchSchoolConfirmBtn().hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    domSelect_common.getSearchSchoolCancelBtn().hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    domSelect_common.getSearchFieldConfirmBtn().hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    domSelect_common.getSearchFieldCancelBtn().hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
}


