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
function DomSelect(){}
DomSelect.prototype = {

    getMainTop: function(){
       return $(".mainTop");
    },
    getMainBottom: function(){
        return $(".mainBottom");
    },
    getBottomList: function(){
        return $(".bottomList");
    },
    getSchoolList: function(){
        return $(".schoolList");
    },

    getSchool: function(){
        return $(".schoolList .school");
    },

    getSchoolTitle: function(){
        return $(".schoolList .school .schoolTitle");
    },

    getSchoolField: function(){
        return $(".schoolList .school .fields .field");
    },

    getSchoolFieldsList: function(){
        return $(".schoolList .school .fields");
    },
    getSchoolChart: function(){
        return $(".leftChart");
    },
    getFieldChart: function(){
        return $(".rightChart");
    },
    getCheckboxBtn: function(){
        return $(".checkbox");
    },
    getNextBtn: function(){
        return $(".nextBtn");
    },
    getPreviousBtn: function(){
        return $(".previousBtn");
    },
    getChangeSchoolBtn: function(){
        return $(".changeSchool");
    },
    getChangeFieldBtn: function(){
        return $(".changeField");
    },
    getMain:function(){
        return $(".main");
    },
    getMenuBtn: function(){
        return $("#menu");
    },
    getLookupSchoolBtn: function(){
        return $("#lookupSchool");
    },
    getFgBtn: function(){
        return $(".fg-button");
    }
};

/**
 * ajax 请求工具类
 * @constructor
 */
function AjaxFunc(){}
AjaxFunc.prototype = {
    getSchoolList: function(){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'getplanlist';
//        var url = 'data/schoolList_step3.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },
    postPlan:function(obj){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'updateplanseq';
//        var url = 'data/common/savePlan.json';
        $.postJSON(url, {list: obj}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    }
};

/**
 * 其他功能函数集合类
 * @constructor
 */
function Util(){}
Util.prototype = {
    createSchool: function(index, data){
        var school = $("<div></div>",{"class": "school"}).append(
            $("<div></div>",{"class": "schoolTitle"}).append(
                $("<div></div>",{"class": "rank schoolrank"}).text(index),
                $("<span></span>").text(data.schoolname)
            ),
            $("<div></div>",{"class": "clr"})
        );
        var fields =  $("<div></div>",{"class": "fields"});
        $.each(data.professionlist, function(idx, field){
            fields.append(
                $("<div></div>",{"class":"field"}).append(
                        $("<div></div>",{"class": "rank fieldrank"}).text(idx + 1),
                        $("<div></div>",{"class": "colorBtn " + fieldColor[field.type - 1].color}).text(fieldColor[field.type - 1].text),
//                        $("<span></span>").text(field.name)
                    "" +field.name
                )
            );
        });
        school.append(fields);
        return school;
    }
};

var domSelect = new DomSelect();
var util = new Util();
var ajaxFunc = new AjaxFunc();

var plan = [];
var data = [];
var schoolsData = [];
var fieldsData = [];
var fieldColor = [
    {"color": "risk",text: "险"},
    {"color": "rush",text: "冲"},
    {"color": "stable",text: "稳"},
    {"color": "insure",text: "保"}
];
var xData1 = [1,'',2,'',3,'',4,'',5,''];
var xData2 = [1,'',2,'',3,'',4,'',5,'',6,''];
$(document).ready(function(){
    var h = $(window).height() - 35 - 5;

    createSchoolList();
});

function bindEvents(){

    $(".step2").click(function(){
        $.each(domSelect.getSchoolList().find(".school"), function(i, school){
            var fields = [];
            $.each($(school).find(".fields .field"), function(idx, f){
                fields.push(
                    $(f).text().substr(2,$(f).text().length)
                );
            });
            plan.push({
                schoolname: $(school).find(".schoolTitle span").text(),
                professionlist: fields
            });
        });
		$("body").mask();
        ajaxFunc.postPlan(plan).done(function(data){
            if(data.success){
				$("body").unmask();
                window.location.href = 'step2.html';
            }
        });
    });
    $(".step1").click(function(){
        $.each(domSelect.getSchoolList().find(".school"), function(i, school){
            var fields = [];
            $.each($(school).find(".fields .field"), function(idx, f){
                fields.push(
                    $(f).text().substr(2,$(f).text().length)
                );
            });
            plan.push({
                schoolname: $(school).find(".schoolTitle span").text(),
                professionlist: fields
            });
        });
		$("body").mask();
        ajaxFunc.postPlan(plan).done(function(data){
            if(data.success){
				$("body").unmask();
                window.location.href = 'step1.html';
            }
        });
    });

    // 拖动排序
    domSelect.getSchoolList().sortable({
        axis: 'x',
        stop: function(){
            $.each(domSelect.getSchool(), function(idx, school){
                $(school).find('.schoolrank').text(idx + 1);
            });

            getSchoolsData();
            var histogram1 = new Histogram("test1", "histogram1", 350, 200, "院校", xData1, "安全", schoolsData, true);
            histogram1.create();
        }
    });
    domSelect.getSchool().click(function(){
        getFieldsData($(this));
        var histogram2 = new Histogram("test2", "histogram2", 350, 200, "专业", xData2, "安全", fieldsData, true);
        histogram2.create();

        $(".rightChart .titleField span").text($(this).find(".schoolTitle span").text());
    });

    domSelect.getSchoolFieldsList().sortable({
        axis:'y',
        stop: function(){
            $.each(domSelect.getSchool(),function(idx, school){
                $.each($(school).find(".fields").find(".field"), function(index, field){
                    $(field).find('.rank').text(index + 1);
                });
            });

            getFieldsData($(this).parent());

            $(".rightChart .titleField span").text($(this).parent().find(".schoolTitle span").text());
            var histogram2 = new Histogram("test2", "histogram2", 350, 200, "专业", xData2, "安全", fieldsData, true);
            histogram2.create();
        }
    });
    domSelect.getSchoolFieldsList().disableSelection();

    domSelect.getNextBtn().attr("disabled",false);

    domSelect.getCheckboxBtn().click(function(){
        if($(this).hasClass("checked")){
            domSelect.getNextBtn().attr("disabled",false);
            domSelect.getNextBtn().removeClass("enable");

            $(this).removeClass("checked");
            $(this).find("img").attr("src","images/checkbox.jpg");
        }else{
            domSelect.getNextBtn().attr("disabled",false);
            domSelect.getNextBtn().addClass("enable");

            $(this).addClass("checked");
            $(this).find("img").attr("src","images/checkbox_checked.jpg");
        }
    });

    domSelect.getNextBtn().click(function(){
        if($(this).attr("disabled")){
            return false;
        }else{
            $.each(domSelect.getSchoolList().find(".school"), function(i, school){
                var fields = [];
                $.each($(school).find(".fields .field"), function(idx, f){
                    fields.push(
                        $(f).text().substr(2,$(f).text().length)
                    );
                });
                plan.push({
                    schoolname: $(school).find(".schoolTitle span").text(),
                    professionlist: fields
                });
            });
			$("body").mask();
            ajaxFunc.postPlan(plan).done(function(data){
                if(data.success){
					$("body").unmask();
                    window.location.href = 'step4.html';
                }
            });
        }
    });
    domSelect.getPreviousBtn().click(function(){
        $(".step2").click();
    });

    domSelect.getChangeFieldBtn().click(function(){
        $(".step2").click();
    });

    domSelect.getChangeSchoolBtn().click(function(){
        $(".step2").click();
    });

    // 保存方案
    domSelect_common.getSavePlanConfirmBtn().click(function(){
        var planname = $("#inputPlanName").val();
        $.each(domSelect.getSchoolList().find(".school"), function(i, school){
            var fields = [];
            $.each($(school).find(".fields .field"), function(idx, f){
                fields.push(
                    $(f).text().substr(2,$(f).text().length)
                );
            });
            plan.push({
                schoolname: $(school).find(".schoolTitle span").text(),
                professionlist: fields
            });
        });
        var planName = null;
        if($(this).parent().parent().hasClass("loadPlan")){
            $(this).parent().parent().removeClass("loadPlan");
            planName = $(this).parent().parent().attr("planname");
        }
        if(planname){
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
                        ajaxFunc.postPlan(plan).done(function(data){
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
                ajaxFunc.postPlan(plan).done(function(data){
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
        }else{
            jAlert("方案名不能为空！","提示");
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
                $.each(domSelect.getSchoolList().find(".school"), function(i, school){
                    var fields = [];
                    $.each($(school).find(".fields .field"), function(idx, f){
                        fields.push(
                            $(f).text().substr(2,$(f).text().length)
                        );
                    });
                    plan.push({
                        schoolname: $(school).find(".schoolTitle span").text(),
                        professionlist: fields
                    });
                });
                ajaxFunc.postPlan(plan).done(function(data){
                    if(data.success){
                        ajaxFunc_common.getSearchFieldResult2(fieldName).done(function(data){
                            if(data.success){
                                window.location.href = "fieldsofallschool.html";
                            }else{
                                jAlert("未查到数据, 抱歉！","提示");
                            }
                        });
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
                $.each(domSelect.getSchoolList().find(".school"), function(i, school){
                    var fields = [];
                    $.each($(school).find(".fields .field"), function(idx, f){
                        fields.push(
                            $(f).text().substr(2,$(f).text().length)
                        );
                    });
                    plan.push({
                        schoolname: $(school).find(".schoolTitle span").text(),
                        professionlist: fields
                    });
                });
                ajaxFunc.postPlan(plan).done(function(data){
                    if(data.success){
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
            }
        });
    });
}

function createSchoolList(){
    var list = $("<div></div>",{"class":"schoolList"});
    ajaxFunc.getSchoolList().done(function(d){
        data = d.list;
        $.each(d.list,function(index, school){
            list.append(util.createSchool(index + 1, school));
        });

        domSelect.getMainTop().empty();
        domSelect.getMainTop().append(list);
        domSelect.getMainTop().append($("<div></div>",{"class": "clr"}));

        layout();
        changeCursorStyle();
        bindEvents();

        getSchoolsData();
        getFieldsData($(domSelect.getSchool()[0]));

        $(".rightChart .titleField span").text($(domSelect.getSchool()[0]).find(".schoolTitle span").text());
        var histogram1 = new Histogram("test1", "histogram1", 350, 200, "院校", xData1, "安全", schoolsData, true);
        histogram1.create();
        var histogram2 = new Histogram("test2", "histogram2", 350, 200, "专业", xData2, "安全", fieldsData,true);
        histogram2.create();

    });

}

function getSchoolsData(){
    schoolsData = [];
    $.each(domSelect.getSchool(), function(idx, s){
        $.each(data, function(i, d){
            if($(s).find(".schoolTitle span").text() == d.schoolname){
                schoolsData.push(d.minrank, d.maxrank);
            }
        });
    });
}

function getFieldsData(schoolDiv){
    fieldsData = [];
    $.each(data, function(i, d){
        if(d.schoolname == $(schoolDiv).find(".schoolTitle span").text()){
            $.each($(schoolDiv).find(".field"), function(ii, f){
                $.each(d.professionlist, function(iii, p){
                    if(p.name == $(f).text().substr(2,$(f).text().length)){
                        fieldsData.push(p.minrank, p.maxrank);
                    }
                });
            });
        }
    });
}

function layout(){
    var bodyWidth = $(document).width();
    var schoolWidth = domSelect.getSchool().width() + 20;

    domSelect.getSchoolList().css({
        width: schoolWidth * 5 + 20,
        marginLeft: (bodyWidth - schoolWidth * 5 ) <= 0? 0: (bodyWidth - schoolWidth * 5 )/ 2
    });
    domSelect.getBottomList().css({
        width: schoolWidth * 5 + 20
    });
}

function changeCursorStyle(){
    domSelect.getSchoolTitle().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSchoolField().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getNextBtn().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getPreviousBtn().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getChangeFieldBtn().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getChangeSchoolBtn().hover(function(){
        $(this).addClass("hover");
    });
}