/**
 * Created with JetBrains WebStorm.
 * User: zyc
 * Date: 12-11-25
 * Time: 上午2:39
 * To change this template use File | Settings | File Templates.
 */

/**
 * ajax 请求工具类
 * @constructor
 */
function AjaxFunc(){}
AjaxFunc.prototype = {
    postPlan: function(schoolNames){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'saveSchool';
//        var url = 'data/step1/savePlan.json';
        $.postJSON(url, {list: schoolNames}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },
    getSelectedSchool: function(){
        var dfd = new jQuery.Deferred();
        var url =HOST_URL + 'loadSelectedSchool';
//        var url = 'data/step1/selectedSchool.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },
    getFieldOfAllSchool: function(params){
        var dfd = new jQuery.Deferred();
//        var url = 'data/common/searchField2.json';
        var url = HOST_URL + 'searchmajorallsch';
        $.postJSON(url, {xuezhi: params.xuezhi, professionname:params.professionname}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },
    getFieldOfAllSchool2: function(params){
        var dfd = new jQuery.Deferred();
//        var url = 'data/common/searchField2.json';
        var url = HOST_URL + 'searchmajorallsch';
        $.postJSON(url, {xuezhi: params.xuezhi, professionname:params.professionname}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    }

};

var ajaxFunc = new AjaxFunc();

$(document).ready(function(){
    layout();
    bindEvent();

    $(".colorBtn .clicked").removeClass("clicked");
    $(".colorBtn .stable").addClass("clicked");

    ajaxFunc.getSelectedSchool().done(function(data){
        $(".selectedList").empty();
        data.length && createSelectedSchoolList(data);
        bindEventForSelectedList();
    });

    ajaxFunc.getFieldOfAllSchool({xuezhi: 3}).done(function(data){
        if(data.success){
            $("body").unmask();
            $(".searchFieldForm").hide();
            createSearchFieldOfAllSchoolResultTable(data);
        }else{
            jAlert("该类别下没有数据, 抱歉！","提示");
        }
    });

});

function layout(){

    var h =getWindowHeight(),
        w = $(".left").width();
    $('#return').css({
        left: (w - 210) / 2
    });
}


function createSelectedSchoolList(dataList){
    $.each(dataList, function(index, school){
        addItemToSelectedList(school);
    });
   $(".selectedSchool").find(".title span").text("已选" + dataList.length + "所");
}

function bindEventForTable(){
    $("table img").click(function(){
        if( $(".selectedSchool").find(".schoolName").length >= 15){
            jAlert("最多只能选取15所院校!","提示");
            return;
        }
        var schoolName = $($(this).parent().parent().parent().find("td")[1]).text();
        addItemToSelectedList(schoolName);
    });
}

function bindEventForSelectedList(){
    $(".selectedList .school .remove").unbind("click");
    $(".selectedList .school .remove").click(function(){
        $(this).parent().remove();
        $("#selectedNum").text("已选" + $(".right .selectedList .schoolName").length + "所");
    });
}

function bindEvent(){

    $(".step1").click(function(){
       $("#return").click();
    });

    $(".step2").click(function(){
        var schoolName = [];
        $.each($(".selectedList").find(".schoolName span"),function(idx, record){
            schoolName.push($(record).text());
        });
        $("body").mask();
        ajaxFunc.postPlan(schoolName).done(function(data){
            if(data.success){
                $("body").unmask();
                window.location.href = "step2.html";
            }
        });
    });

    $(".step3").click(function(){
        var schoolName = [];
        $.each($(".selectedList").find(".schoolName span"),function(idx, record){
            schoolName.push($(record).text());
        });
        $("body").mask();
        ajaxFunc.postPlan(schoolName).done(function(data){
            if(data.success){
                $("body").unmask();
                window.location.href = "step3.html";
            }
        });
    });

    // 保存方案
    domSelect_common.getSavePlanConfirmBtn().click(function(){
        var planname = $("#inputPlanName").val();
        if(!planname){
            jAlert("请输入保存方案名称,谢谢！","提示");
            return;
        }
        var planName = null;
        if($(this).parent().parent().hasClass("loadPlan")){
            $(this).parent().parent().removeClass("loadPlan");
            planName = $(this).parent().parent().attr("planname");
        }
        var schoolName = [];
        $.each($(".selectedList").find(".schoolName span"),function(idx, record){
            schoolName.push($(record).text());
        });
        var flag = false;
        $.each( $(".savedPlansList li a"), function(i, a){
            if($(a).text() == planname){
                flag = true;
            }
        });

        if(flag){
            jConfirm(planname +"　方案已存在，是否覆盖", "提示", function(btn){
                if(btn ){
                    $("body").mask();
                    ajaxFunc.postPlan(schoolName).done(function(data){
                        if(data.success){
                            ajaxFunc_common.savePlan(planname).done(function(data){
                                if(data.success){
                                    $("#inputPlanName").val("");
                                    domSelect_common.getSavePlanWin().hide();
                                    domSelect_common.getMenuBtn().menu({
                                        content: $('#menu-items').html(),
                                        flyOut: true,
                                        width: 120
                                    });
                                    $("body").unmask();
                                    jAlert("方案保存成功！","提示");
                                    if(planName){
                                        var url = HOST_URL + 'loadplan';
                                        $.postJSON(url, {loadname:planName}, function (data) {
                                            if(data.success){
                                                window.location.reload();
                                            }
                                        });
                                    }
                                }else{
                                    $("body").unmask();
                                    jAlert("保存失败，抱歉！","提示");
                                }
                            });
                        }
                    });
                } else{
                    $("#inputPlanName").val("");
                }
            });
        }
        else{
            $("body").mask();
            ajaxFunc.postPlan(schoolName).done(function(data){
                if(data.success){
                    ajaxFunc_common.savePlan(planname).done(function(data){
                        if(data.success){
                            $("#inputPlanName").val("");
                            domSelect_common.getSavePlanWin().hide();
                            $(".savedPlansList").append(
                                $("<li></li>").append(
                                    $("<a></a>",{href: "#","class":"plan"}).text(planname)
                                )
                            );
                            domSelect_common.getMenuBtn().menu({
                                content: $('#menu-items').html(),
                                flyOut: true,
                                width: 120
                            });
                            $("body").unmask();
                            jAlert("方案保存成功！","提示");
                            if(planName){
                                var url = HOST_URL + 'loadplan';
                                $.postJSON(url, {loadname:planName}, function (data) {
                                    if(data.success){
                                        window.location.reload();
                                    }
                                });
                            }
                        }else{
                            $("body").unmask();
                            jAlert("保存失败，抱歉！","提示");
                        }
                    });
                }
            });
        }
    });

    //查询专业
    domSelect_common.getSearchFieldConfirmBtn().unbind("click");
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
                schoolName = [];
                $.each($(".selectedList").find(".schoolName span"),function(idx, record){
                    schoolName.push($(record).text());
                });
                $("body").mask();
                ajaxFunc.postPlan(schoolName).done(function(data){
                    if(data.success){
                        $("body").unmask();
                        window.location.href = "fieldsofallschool.html";
                    }else{
                        jAlert("未查到数据, 抱歉！","提示");
                    }
                });
            }
        }
    });

    //退出
    $(".logout").unbind("click");
    $(".logout").click(function(){
        jConfirm("确认退出?" ,"提示", function(btn){
            if(btn){
                var schoolName = [];
                $.each($(".selectedList").find(".schoolName span"),function(idx, record){
                    schoolName.push($(record).text());
                });
                $("body").mask();
                ajaxFunc.postPlan(schoolName).done(function(data){
                    if(data.success){
                        $("body").unmask();
                        window.location.href = "login.html";
                    }
                });
            }
        });
    });

    $("#lookupForOtherFields").click(function(){
        $("body").mask();
        $("body .searchFieldForm").show().css({
            top: (getWindowHeight() - 95)/2,
            left: (getWindowWidth() - 320)/2,
            height: 125
        });
        $(".searchFieldForm .inputSchool2").hide();
        $("#inputField").val("");
        $("#inputSchool2").val("");
    });
    $(".searchFieldForm .button .confirm2").click(function(){
        var fieldName = $("#inputField").val();
        if(!fieldName){
            jAlert("请输入专业名称，谢谢！","提示");
        }else{
            var params = {
                professionname:fieldName,
                selType: 3,
                xuezhi: 3
            };
            $(".colorBtn .clicked").removeClass("clicked");
            $(".colorBtn .stable").addClass("clicked");
            getSearchResult(params);
        }
    });

    $(".detailBtn").click(function(){
        $("body").mask();
        var schoolName = [];
        $.each($(".selectedList").find(".schoolName span"),function(idx, record){
            schoolName.push($(record).text());
        });
        if(!schoolName.length){
            jAlert("请先选择学校！","提示");
            $("body").unmask();
            return;
        }
        ajaxFunc_common.getSearchSchoolResult(schoolName).done(function(data){
            if(data.success){
                util_common.createSearchSchoolResultTable(data);
                domSelect_common.getSearchSchoolResultTable().show().css({
                    top: ( getWindowHeight() - domSelect_common.getSearchSchoolResultTable().height()) / 2,
                    left: ( getWindowWidth() - domSelect_common.getSearchSchoolResultTable().width() ) / 2
                });
            }else{
                jAlert("没有查到相关数据,抱歉！","提示")
            }
        });
        $(".loadmask").click(function(){
            $("body").unmask();
            domSelect_common.getSearchSchoolResultTable().hide();
        });
    });

    $("#return").click(function(){
        var schoolName = [];
        $.each($(".selectedList").find(".schoolName span"),function(idx, record){
            schoolName.push($(record).text());
        });
        $("body").mask();
        ajaxFunc.postPlan(schoolName).done(function(data){
            if(data.success){
                $("body").unmask();
                window.location.href = "step1.html";
            }else{
                $("body").unmask();
                jAlert("返回失败!","提示");
            }
        });
    });

    $(".colorBtn .risk").click(function(){
        $(".colorBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");

        var params = {
            professionname: $(".left .title .fieldName").text(),
            xuezhi:1
        };

        getSearchResult(params);

    });
    $(".colorBtn .rush").click(function(){
        $(".colorBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        var params = {
            professionname: $(".left .title .fieldName").text(),
            xuezhi:2
        };
        getSearchResult(params);

    });
    $(".colorBtn .stable").click(function(){
        $(".colorBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        var params = {
            professionname: $(".left .title .fieldName").text(),
            xuezhi:3
        };
        getSearchResult(params);

    });

    $(".cancel").click(function(){
        $("body").unmask();
        $(".searchFieldForm").hide();
    });

}

function getSearchResult(params){
    $("body").mask();
    ajaxFunc.getFieldOfAllSchool2(params).done(function(data){
        if(data.success){
            $("body").unmask();
            $(".searchFieldForm").hide();
            createSearchFieldOfAllSchoolResultTable(data);
        }else{
            jAlert("该类别下没有数据, 抱歉！","提示");
        }
    });
}

function createSearchFieldOfAllSchoolResultTable(data){
    $(".left .fieldName").empty().text(data.professionname);
    var ths =  $($(".left .table table thead").find("tr")[0]).find(".year");
    $.each(data.year, function(i, y){
        $(ths[i]).text(y + '年');
    });
    var tbody = $(".left .table table").find("tbody");
    tbody.empty();
    $.each(data.record, function(index, re){
        var tr = $("<tr></tr>");
        tr.append($("<td></td>").append($("<a></a>").append($("<img>",{src: 'images/addimg.jpg'}))));
        $.each(re, function(j, r){
            tr.append($("<td></td>",{"class": "lefttd"}).text(r));
        });
        tbody.append(tr);
    });

    var height = $(".left .table table").height();
    var tableHeight = $("#return").offset().top - $(".left .table").offset().top - 20;
    if(tableHeight >= height){
        $(".left .table").css({
            height: height,
            overflow: 'hidden'
        });
    }else{
        $(".left .table").css({
            height: tableHeight,
            overflowY: 'scroll'
        });
    }

    bindEventForTable();
}

function addItemToSelectedList(schoolName){
    var flag = false;
    $.each($(".right .selectedList .schoolName"), function(i, school){
        if(schoolName == $(school).text()){
            flag = true;
        }
    });
    if(flag) return;
    var school = $("<div></div>",{"class": "school"})
        .append($("<div></div>",{"class": "schoolName"})
        .append( $("<span></span>").text(schoolName) ),
        $("<div></div>",{"class": "remove"}).append($("<a></a>")
            .append($("<img>",{"src": "images/remove.png"})))
    );
    $(".right .selectedList").prepend(school);
    $("#selectedNum").text("已选" + $(".right .selectedList .schoolName").length + "所");

    bindEventForSelectedList();
}


