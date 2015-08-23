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
Array.prototype.removeByIndex = function(i){
    if (i < this.length || i >= 0) {
        var ret = this.slice(0, i).concat(this.slice(i + 1));
        this.length = 0;
        this.push.apply(this, ret);
    }
};

function DomSelect(){}
DomSelect.prototype = {

    getNextBtn: function(){
        return $(".nextBtn");
    },
    getPreviousBtn: function(){
        return $(".previousBtn");
    },
    getLeftOfSchoolName: function(){
        return $(".leftContent .schoolName");
    },

    getLeftOfSchoolInfo: function(){
        return $(".leftContent .schoolInfo");
    },

    getLeftOfSchoolDetail: function(){
        return $(".leftContent .schoolDetail");
    },

    getLeftOfSchoolChart: function(){
        return $(".leftContent .schoolChart");
    },

    getLeftOfSchoolDataTable: function(){
        return $(".leftContent .schoolDataTable");
    },

    getLeftOfAddBtn: function(){
        return $(".rightContent .addSchoolBtn");
    },

    getLeftOfSchoolTable: function(){
        return $(".rightContent .schoolTable");
    },

    getRightOfFieldTable: function(){
        return $(".leftBottom .fieldTable");
    },

    getRightOfFieldTableOfColorBtn: function(){
        return $(".leftBottom .fieldTable .colorBtn");
    },

    getRightOfFieldTableOfRankBtn: function(){
        return $(".leftBottom .fieldTable .rankBtn");
    },

    getRightOfFieldDataTable: function(){
        return $(".rightBottom .fieldDataTable");
    },

    getRightOfSelectedFields: function(){
        return $(".rightBottom .selectedFields");
    },

    getRightOfSelectedTitle: function(){
        return $(".rightBottom .selectedCount");
    },

    getRightOfSelectedBtn: function(){
        return $(".rightBottom .detailBtn");
    },

    getRightOfSelectedList: function(){
        return $('.rightBottom .selectedList');
    },

    getLeftOfSchoolTableByRow: function(){
        return $(".rightContent .schoolTable table tbody tr");
    },

    getLeftOfSchoolTableByRowOfSchoolName: function(){
        return $(".rightContent .schoolTable table tbody .schoolname");
    },

    getRightOfFieldTableByRow: function(){
        return $(".mainRight .fieldTable table tbody tr");
    },

    getFieldsCompared: function(){
        return $(".fieldsCompared");
    },

    getReturnBtn: function(){
        return $(".fieldsCompared .returnBtn");
    },

    getFieldColorBtn: function(){
        return $(".fieldTable .colorBtn");
    },

    getFieldColorRiskBtn: function(){
        return $(".fieldTable .colorBtn .risk");
    },

    getFieldColorRushBtn: function(){
        return $(".fieldTable .colorBtn .rush");
    },

    getFieldColorStableBtn: function(){
        return $(".fieldTable .colorBtn .stable");
    },

    getFieldRankAcsBtn: function(){
        return $(".fieldTable .rankBtn .selectByAsc");
    },
    getFieldRankDecsBtn: function(){
        return $(".fieldTable .rankBtn .selectByDesc");
    },
    getFieldRankAutoBtn: function(){
        return $(".fieldTable .rankBtn .selectByAuto");
    }
};

/**
 * ajax 请求工具类
 * @constructor
 */
function AjaxFunc(){}
AjaxFunc.prototype = {
    getSchoolInfo: function(schoolName){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'loadProfessionPlan';
//        var url = 'data/step2/schoolInfo.json';
        $("body").mask();
        $.postJSON(url, {schoolname: schoolName}, function (data) {
            $("body").unmask();
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getSelectedSchool: function(){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'loadSchoolPlan';
//        var url = 'data/step2/selectedSchool.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getSelectedFieldPlan: function(schoolname){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'loadProfessionBySchool';
//        var url = 'data/step2/selectedFieldPlan.json';
        $.postJSON(url, {schoolname: schoolname}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getFieldsComparedResult: function(params){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'compareprofession';
//        var url = 'data/step2/fieldsCompared.json';
        $.postJSON(url, params, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getSchoolFieldInfo: function(obj){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'getprofessionrankrenshu';
//        var url = 'data/step2/fieldInfo.json';
        $.postJSON(url, obj, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    postPlan: function(params){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'updateplanlist';
//        var url = 'data/step2/savePlan.json';
        $.postJSON(url, {list:params}, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getFieldsRankList: function(obj){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'queryProfession';
//        var url = 'data/step2/fieldsRank.json';
        $.postJSON(url, obj, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },
    previous: function(obj){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'previousStep';
//        var url = 'data/step2/fieldsRank.json';
        $.postJSON(url, {list:obj}, function (data) {
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
    createFieldTable: function(dataList, callback){
        var schoolList = dataList;
        var trArray = [];
        trArray.push($("<tr></tr>").append(
        $("<th></th>",{width: 40}).text(""),
            $("<th></th>",{width: 133}).text(""),
            $("<th></th>",{width: 78}).text(""),
            $("<th></th>",{width: 61}).text("")
        ));
        $.each(schoolList, function(index,field){
            trArray.push($("<tr></tr>",{type: field.type}).append(
                $("<td></td>",{"class":"checkbox"}).append($("<img>",{src:"images/checkbox.jpg"})),
                $("<td></td>",{"class":"fieldName"}).text(field.name),
                $("<td></td>").text(field.renshu),
                $("<td></td>").text(field.rank)
            ));
        });
        var table = $("<table></table>",{
            cellpadding:0,
            cellspacing: 0
        }).append(trArray);
        domSelect.getRightOfFieldTable().find("table").remove();
        domSelect.getRightOfFieldTable().find(".fieldTableBodyWap").append(table);

        var height = domSelect.getRightOfFieldTable().find("table").height();
        if( height > 440){
            domSelect.getRightOfFieldTable().find(".fieldTableBodyWap").css({
                "overflow-y":'scroll'
            });
        }
        if(callback){
            callback();
        }
    },

    createSchoolTable: function(dataList){
        var schoolList = dataList;
        var tHead = $("<thead></thead>").append(
            $("<tr></tr>").append(
                $("<th></th>",{width: 28}).text(""),
                $("<th></th>",{width: 135}).text("院校名称"),
                $("<th></th>",{width: 56}).text(""),
                $("<th></th>",{width: 98}).text("所在城市"),
                $("<th></th>",{width: 61}).text("2012年投档名次")
            ));
        var tBody = $("<tbody></tbody>"), trs = [];
        $.each(schoolList, function(index, school){
            var schoolname;
            if(school.schoolname.indexOf("大学") > -1 && school.schoolname.indexOf("学院")> -1 ){
                var i = school.schoolname.indexOf("大学") + 1;
                schoolname = school.schoolname.substr(0,i+1) + "<br/>" + school.schoolname.substr(i + 1, school.schoolname.length);
            }else if(school.schoolname.indexOf("学院") > -1){
                i = school.schoolname.indexOf("学院") + 1;
                schoolname = school.schoolname.substr(0,i+1) + "<br/>" + school.schoolname.substr(i + 1, school.schoolname.length);
            }else{
                schoolname = school.schoolname;
            }
            trs.push(
                $("<tr></tr>").append(
                    $("<td></td>",{"class":"checkbox left"}).append($("<img>",{src:"images/star2.png"})),
                    $("<td></td>",{"class": "schoolname middle"}).html(schoolname),
                    $("<td></td>",{"class":"remove middle"}).append($("<img>",{src:"images/remove.png"})),
                    $("<td></td>",{"class": "middle"}).text(school.city),
                    $("<td></td>",{"class": "right"}).text(school.rank)
                ));
        });
        tBody.append(trs);
        var table = $("<table></table>",{
            cellpadding: 0,
            cellspacing: 0
        }).append(tHead,tBody);
        domSelect.getLeftOfSchoolTable().empty().append(table);
    },

    createSchoolInfo: function(data){
        var table = $("<table></table>")
            .append(
            $("<tr></tr>").append(
                $("<td></td>",{"class": "left", align: "left"}).text("类型："),
                $("<td></td>",{"class": "right", align: "left"}).text(data.type)
            ),
            $("<tr></tr>").append(
                $("<td></td>",{"class": "left", align: "left"}).text("隶属："),
                $("<td></td>",{"class": "right", align: "left"}).text(data.belongTo)
            ),
            $("<tr></tr>").append(
                $("<td></td>",{"class": "left", align: "left"}).text("城市："),
                $("<td></td>",{"class": "right", align: "left"}).text(data.city)
            ),
            $("<tr></tr>").append(
                $("<td></td>",{"class": "left", align: "left"}).text("地址："),
                $("<td></td>",{"class": "right", align: "left"}).text(data.address)
            ),
            $("<tr></tr>").append(
                $("<td></td>",{"class": "left", align: "left"}).text("电话："),
                $("<td></td>",{"class": "right", align: "left"}).text(data.cellphone)
            ),
            $("<tr></tr>").append(
                $("<td></td>",{"class": "left", align: "left"}).text("网址："),
                $("<td></td>",{"class": "right", align: "left"}).append($("<a></a>",{"href":data.website,"target":"_blank"}).text(data.website))
            )
        );
        domSelect.getLeftOfSchoolInfo().find("table").remove();
        domSelect.getLeftOfSchoolInfo().append(table);
        domSelect.getLeftOfSchoolDetail().find("a").attr({"href":data.detaillink,"target":"_blank"});
        if(data.is985){
            $(".nineeightfive").show();
        }
        if(data.is211){
            $(".twooneone").show();
        }
        if(data.hasGraduate){
            $(".yan").show();
        }
    },

    addFieldItem:function(fieldname, type){
        domSelect.getRightOfSelectedList().prepend(
            $("<div></div>",{"class": "field colorBtn", type: type})
            .append(
                $("<div></div>",{"class": ""+ fieldColor[type - 1].color}).text(fieldColor[type - 1].text),
                $("<div></div>",{"class":"fieldName"}).text(fieldname),
                $("<div></div>",{"class": "remove"})
                    .append($("<img>",{src: "images/remove.png"})
                )
            )
        );
        domSelect.getRightOfSelectedList().append(
            $("<div></div>",{"class": 'clr'})
        );

        var height = domSelect.getRightOfSelectedList().height();
        if(height >= 185){
            domSelect.getRightOfSelectedList().css({"overflow-y":"scroll",height: 185});
        }else{
            domSelect.getRightOfSelectedList().css({"overflow-y":"hidden",height: "auto"});
        }
        bindEventForSelectedList();
    },

    createSelectedFieldList: function(dataList){
        var me = this;
        if(dataList.length){
            domSelect.getRightOfSelectedTitle().text("已选"+dataList.length+"个专业");
            domSelect.getRightOfSelectedList().empty();
            $.each(dataList, function(index, field){
                me.addFieldItem(field.name, field.type);
            });
        }
    },

    createFieldsComparedTable: function(data, schoolname){
        $(domSelect.getFieldsCompared().find("tr")[0]).find("th.left")
            .text(schoolname);
        domSelect.getFieldsCompared().find("tbody")
            .empty();
        $.each(data.list, function(index, record){
            var tr = $("<tr></tr>").append(
                $("<td></td>",{"class": "remove leftleft"}).append($("<img>",{src:"images/remove.png"}))
            );
            $.each(record, function(i, r){
                if(i == 9){
                    tr.append(
                        $("<td></td>",{"class":"leftright"}).text(r=="-1"?"":r)
                    );
                }else{
                    if(i % 2){
                        tr.append(
                            $("<td></td>",{"class":"right"}).text(r=="-1"?"":r)
                        );
                    }else{
                        tr.append(
                            $("<td></td>",{"class":"left"}).text(r<0?"":r)
                        );
                    }
                }
            });
            domSelect.getFieldsCompared().find("tbody")
                .append(tr);
        });
    },

    createDateTable: function(rankData, renshuData, yearData, type){
        var tr0 = $("<tr></tr>").append(
            $("<td></td>").text(""),
            $("<td></td>").text(yearData[0]),
            $("<td></td>").text(yearData[1]),
            $("<td></td>").text(yearData[2]),
            $("<td></td>").text(yearData[3]),
            $("<td></td>").text(yearData[4])
        );
        var tr1 = $("<tr></tr>").append($("<td></td>").text("录取名次"));
        var tr2 = $("<tr></tr>").append($("<td></td>").text("招生人数"));
        $.each(rankData, function(i, d){
            tr1.append($("<td></td>",{width:"15%"}).text(d));
        });
        $.each(renshuData, function(i, d){
            tr2.append($("<td></td>",{width:"15%"}).text(d));
        });
        if(type == "school"){
            domSelect.getLeftOfSchoolDataTable().find("table").empty().append(tr0, tr1, tr2);
        }else if(type == "field"){
            domSelect.getRightOfFieldDataTable().find("table").empty().append(tr0, tr1, tr2);
        }
    }

};

var domSelect = new DomSelect();
var util = new Util();
var ajaxFunc = new AjaxFunc();

var plan = [];
var fieldColor = [
    {"color": "risk",text: "险"},
    {"color": "rush",text: "冲"},
    {"color": "stable",text: "稳"},
    {"color": "insure",text: "保"}
];
$(document).ready(function(){
    bindEvent();
    ajaxFunc.getSelectedSchool().done(function(data){
        data.length &&
        util.createSchoolTable(data);
        bindEventForSchoolTable();

        $.each(data, function(i, school){
            plan.push({
                schoolname:school.schoolname,
                professionlist: school.professionlist,
                selected: school.selected
            });
            $.each(domSelect.getLeftOfSchoolTableByRow(), function(j, r){
                if($(r).find(".schoolname").text() == school.schoolname && school.selected){
                    $(r).find(".checkbox").addClass("light");
                    $(r).find(".checkbox img").attr("src","images/star1.png");
                }
            });
        });

        $(domSelect.getLeftOfSchoolTableByRowOfSchoolName()[0]).click();
    });
});

function bindEventForSchoolTable(){
    domSelect.getLeftOfSchoolTable().find(".remove").on("click",function(){
        var self = this;
        var schoolName = $(self).parent().find(".schoolname").text();
        jConfirm("确认删除该所院校？","提示",function(btn){
            if(btn){
                $(self).parent().remove();
				if(!domSelect.getLeftOfSchoolTable().find(".remove").length){
					plan = [];
                    domSelect.getRightOfFieldTable().empty();
                    $(".leftContent").empty();
                    $(".rightBottom").empty();
                    $(".topContent").empty();
					return;
				}
                if($(self).parent().hasClass("clicked")){
                    $(domSelect.getLeftOfSchoolTableByRowOfSchoolName()[0]).click();
                }
                if(!schoolName) return;
                var idx = 0;
                $.each(plan, function(index, school){
                    if(school.schoolname == schoolName){
                        idx = index;
                    }
                });
                plan = plan.slice(0,idx).concat(plan.slice(idx+1, plan.length));
            }else{
                return;
            }
        });
    });
    domSelect.getLeftOfSchoolTableByRow().mouseover(function(){
        $(this).addClass("hover");
    });
    domSelect.getLeftOfSchoolTableByRow().mouseleave(function(){
        $(this).removeClass("hover");
    });

    // 单击学校列表中的一行
    domSelect.getLeftOfSchoolTableByRowOfSchoolName().click(function(){
        savingPlan();
        domSelect.getLeftOfSchoolTable().find(".clicked").removeClass("hover clicked");
        $(this).parent().addClass("hover clicked");
        domSelect.getFieldColorBtn().show();

        var schoolName = $(this).parent().find(".schoolname").text();

        $(".leftContent .schoolName").text(schoolName);
        $(".mainRight .topContent").text(schoolName);

        $(".fieldTable .colorBtn .hovered").removeClass("hovered");
        $(".fieldTable .colorBtn .stable").addClass("hovered");
        $(".fieldTable .rankBtn .hovered").removeClass("hovered");
        $(".fieldTable .rankBtn .selectByAuto").addClass("hovered");

        $(".fieldTitle").text("");

        ajaxFunc.getSchoolInfo(schoolName).done(function(data){
            util.createSchoolInfo(data);
            util.createDateTable(data.rankarray, data.renshuarray, data.yeararray, "school");
            var xData = [];
            $.each(data.yeararray,function(i,d){
                if(i < 4){
                    xData.push(d);
                }
            });
            createSchoolTable(xData, data.chartarray);
            util.createFieldTable(data.list, function(){
                domSelect.getRightOfSelectedList().empty();
                domSelect.getRightOfSelectedList().css({"overflow-y":"hidden",height: "auto"});
                domSelect.getRightOfSelectedTitle().text("已选0个专业");
                $.each(plan, function(index, p){
                    if(p.schoolname == schoolName && p.professionlist.length){
                        util.createSelectedFieldList(p.professionlist);
                        $.each(p.professionlist, function(i,field){
                            $.each(domSelect.getRightOfFieldTableByRow(), function(ii,r){
                                if(field.name == $(r).find(".fieldName").text()){
                                    $(r).find(".checkbox").addClass("checked");
                                    $(r).find(".checkbox img").attr("src","images/checkbox_checked.jpg");
                                }
                            });
                        });
                    }
                });
                bindEventForFieldTable();

                $(domSelect.getRightOfFieldTableByRow()[1]).click();
            });
        });
    });

    domSelect.getLeftOfSchoolTable().find(".checkbox").click(function(){

        var len = domSelect.getLeftOfSchoolTable().find(".light").length;
        if(len >= 5 && $(this).find("img").attr("src") == "images/star2.png" ){
            jAlert("只能选取5所学校！","提示");
            return;
        }
        var name = $(this).parent().find(".schoolname").text();
        if($(this).find("img").attr("src") == "images/star1.png"){
            $(this).find("img").attr("src","images/star2.png");
            $(this).removeClass("light");
            $.each(plan, function(i, p){
                if(p.schoolname == name){
                    p.selected = false;
                }
            });
        }else{
            $(this).find("img").attr("src","images/star1.png");
            $(this).addClass("light");
            $.each(plan, function(i, p){
                if(p.schoolname == name){
                    p.selected = true;
                }
            });
        }
    });
};

function bindEventForFieldTable(){

    domSelect.getRightOfFieldTableByRow().mouseover(function(){
        $(this).addClass("hover");
    });

    domSelect.getRightOfFieldTableByRow().mouseleave(function(){
        $(this).removeClass("hover");
    });

    domSelect.getRightOfFieldTableByRow().click(function(){
        domSelect.getRightOfFieldTable().find(".clicked").removeClass("hover clicked");
        $(this).addClass("hover clicked");
        $(".fieldTitle").text("");

        var obj = {
            schoolname: domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text(),
            professionname: $(this).find(".fieldName").text()
        };
        ajaxFunc.getSchoolFieldInfo(obj).done(function(data){

            $(".fieldTitle").text(obj.professionname);
            util.createDateTable(data.rankarray, data.renshuarray,  data.yeararray, "field");

            var xData = [];
            $.each(data.yeararray,function(i,d){
                if(i < 4){
                    xData.push(d);
                }
            });
            createFieldTable(xData, data.chartarray);
        });
    });

    domSelect.getRightOfFieldTable().find(".checkbox").click(function(){
        var fieldName = $(this).parent().find(".fieldName").text();
        var flag = false, index = 0;

        $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(i, f){
            if( $(f).text() == fieldName){
                flag = true;
                index = i;
            }
        });
        if($(this).hasClass("checked")){
            $(this).removeClass("checked");
            $(this).find("img").attr("src","images/checkbox.jpg");
            if(flag){
                $(domSelect.getRightOfSelectedList().find(".field")[index]).remove();
            }
        }else{
            var type = parseInt($(this).parent().attr("type"));
            $(this).addClass("checked");
            $(this).find("img").attr("src","images/checkbox_checked.jpg");
            if(!flag){
                util.addFieldItem(fieldName, type);
            }
        }
        var length = domSelect.getRightOfSelectedList().find(".remove").length;
        domSelect.getRightOfSelectedTitle().text("已选"+length+"个专业");
    });

};

function bindEventForSelectedList(){
    domSelect.getRightOfSelectedList().find(".remove").unbind("click");
    domSelect.getRightOfSelectedList().find(".remove").on("click",function(){
        var fieldName = $(this).parent().find(".fieldName").text();
        $(this).parent().remove();
        var length = domSelect.getRightOfSelectedList().find(".remove").length;
        domSelect.getRightOfSelectedTitle().text("已选"+length+"个专业");
        $.each(domSelect.getRightOfFieldTable().find("tbody tr"),function(i, field){
            if($(field).find(".fieldName").text() == fieldName){
                $(field).find(".checkbox").removeClass("checked");
                $(field).find("img").attr("src","images/checkbox.jpg");
            }
        });
    });
};

function bindEvent(){

    $(".step1").click(function(){
        domSelect.getPreviousBtn().click();
    });
    $(".step3").click(function(){
        domSelect.getNextBtn().click();
    });
    $(".addSchoolBtn").click(function(){
        domSelect.getPreviousBtn().click();
    });

    // 专业对比筛选
    domSelect.getRightOfSelectedBtn().click(function(){
        var selectedList = domSelect.getRightOfSelectedList().find(".field .fieldName");
        if(!selectedList.length){
            jAlert("请先选择需要对比的专业，谢谢", "提示");
        }else{
            var fields = [];
            $.each(selectedList, function(i, s){
                fields.push($(s).text());
            });
            var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
            var obj = {
                schoolname: schoolName,
                 professionlist: fields
            };
            ajaxFunc.getFieldsComparedResult(obj).done(function(data){
                $("body").mask();
                util.createFieldsComparedTable(data, schoolName);
                domSelect.getFieldsCompared().show().css({
                    top: (getWindowHeight() -  domSelect.getFieldsCompared().height() ) / 2,
                    left: (getWindowWidth() - domSelect.getFieldsCompared().width()) / 2
                });
                var height = domSelect.getFieldsCompared().find("table").height() + 80;
                if(height <= 500){
                    domSelect.getFieldsCompared().css({
                        height: height,
                        overflow: 'hidden'
                    });
                }else{
                    domSelect.getFieldsCompared().css({
                        height: 500,
                        overflowY: 'scroll'
                    });
                }
                domSelect.getFieldsCompared().show().css({
                    top: (getWindowHeight() -  domSelect.getFieldsCompared().height() ) / 2,
                    left: (getWindowWidth() - domSelect.getFieldsCompared().width()) / 2
                });

                $(".loadmask").click(function(){
                    $("body").unmask();
                    domSelect.getFieldsCompared().hide();
                });

                bindEventForFieldCompared();
            });
        }
    });

    domSelect.getReturnBtn().click(function(){
        $("body").unmask();
        domSelect.getFieldsCompared().hide();
    });

    // 排序按钮
    domSelect.getFieldColorStableBtn().click(function(){
        $(".fieldTable .colorBtn .hovered").removeClass("hovered");
        $(".fieldTable .colorBtn .stable").addClass("hovered");
        var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi:3
        };
        ajaxFunc.getFieldsRankList(obj).done(function(data){
            util.createFieldTable(data, function(){
                $.each(domSelect.getRightOfFieldTableByRow(), function(ii,r){
                    $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(ij,p){
                        if($(p).text() == $(r).find(".fieldName").text()){
                            $(r).find(".checkbox").addClass("checked");
                            $(r).find(".checkbox img").attr("src","images/checkbox_checked.jpg");
                        }
                    });
                });
                bindEventForFieldTable();
                if(domSelect.getRightOfFieldTableByRow()[1]){
                    $(domSelect.getRightOfFieldTableByRow()[1]).click();
                }else{
                    util.createDateTable(["    ","    ","    ","    ","    "], ["","","","",""], ["","","","",""], "field");
                    var xData = ["","","",""];
                    createFieldTable(xData, [0,0,0,0]);
                }
            });
        });
    });
    domSelect.getFieldColorRiskBtn().click(function(){
        $(".fieldTable .colorBtn .hovered").removeClass("hovered");
        $(".fieldTable .colorBtn .risk").addClass("hovered");
        var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi:1
        };
        ajaxFunc.getFieldsRankList(obj).done(function(data){
            util.createFieldTable(data, function(){
                $.each(domSelect.getRightOfFieldTableByRow(), function(ii,r){
                    $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(ij,p){
                        if($(p).text() == $(r).find(".fieldName").text()){
                            $(r).find(".checkbox").addClass("checked");
                            $(r).find(".checkbox img").attr("src","images/checkbox_checked.jpg");
                        }
                    });
                });
                bindEventForFieldTable();
                if(domSelect.getRightOfFieldTableByRow()[1]){
                    $(domSelect.getRightOfFieldTableByRow()[1]).click();
                }else{
                    util.createDateTable(["    ","    ","    ","    ","    "], ["","","","",""], ["","","","",""], "field");
                    var xData = ["","","",""];
                    createFieldTable(xData, [0,0,0,0]);
                }
            });
        });
    });
    domSelect.getFieldColorRushBtn().click(function(){
        $(".fieldTable .colorBtn .hovered").removeClass("hovered");
        $(".fieldTable .colorBtn .rush").addClass("hovered");
        var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi:2
        };
        ajaxFunc.getFieldsRankList(obj).done(function(data){
            util.createFieldTable(data, function(){
                $.each(domSelect.getRightOfFieldTableByRow(), function(ii,r){
                    $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(ij,p){
                        if($(p).text() == $(r).find(".fieldName").text()){
                            $(r).find(".checkbox").addClass("checked");
                            $(r).find(".checkbox img").attr("src","images/checkbox_checked.jpg");
                        }
                    });
                });
                bindEventForFieldTable();
                if(domSelect.getRightOfFieldTableByRow()[1]){
                    $(domSelect.getRightOfFieldTableByRow()[1]).click();
                }else{
                    util.createDateTable(["    ","    ","    ","    ","    "], ["","","","",""], ["","","","",""], "field");
                    var xData = ["","","",""];
                    createFieldTable(xData, [0,0,0,0]);
                }
            });
        });
    });
    domSelect.getFieldRankAcsBtn().click(function(){
        $(".fieldTable .rankBtn .hovered").removeClass("hovered");
        $(".fieldTable .rankBtn .selectByAsc").addClass("hovered");
        domSelect.getFieldColorBtn().hide();
        var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
        var obj = {
            schoolname: schoolName,
            seqType: 1,
            xuezhi: 3
        };
        ajaxFunc.getFieldsRankList(obj).done(function(data){
            util.createFieldTable(data, function(){
                $.each(domSelect.getRightOfFieldTableByRow(), function(ii,r){
                    $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(ij,p){
                        if($(p).text() == $(r).find(".fieldName").text()){
                            $(r).find(".checkbox").addClass("checked");
                            $(r).find(".checkbox img").attr("src","images/checkbox_checked.jpg");
                        }
                    });
                });
                bindEventForFieldTable();
                if(domSelect.getRightOfFieldTableByRow()[1]){
                    $(domSelect.getRightOfFieldTableByRow()[1]).click();
                }else{
                    util.createDateTable(["    ","    ","    ","    ","    "], ["","","","",""], ["","","","",""], "field");
                    var xData = ["","","",""];
                    createFieldTable(xData, [0,0,0,0]);
                }
            });
        });
    });
    domSelect.getFieldRankAutoBtn().click(function(){
        $(".fieldTable .rankBtn .hovered").removeClass("hovered");
        $(".fieldTable .rankBtn .selectByAuto").addClass("hovered");
        $(".fieldTable .colorBtn .hovered").removeClass("hovered");
        $(".fieldTable .colorBtn .stable").addClass("hovered");
        domSelect.getFieldColorBtn().show();
        var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi:3
        };
        ajaxFunc.getFieldsRankList(obj).done(function(data){
            util.createFieldTable(data, function(){
                $.each(domSelect.getRightOfFieldTableByRow(), function(ii,r){
                    $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(ij,p){
                        if($(p).text() == $(r).find(".fieldName").text()){
                            $(r).find(".checkbox").addClass("checked");
                            $(r).find(".checkbox img").attr("src","images/checkbox_checked.jpg");
                        }
                    });
                });
                bindEventForFieldTable();
                if(domSelect.getRightOfFieldTableByRow()[1]){
                    $(domSelect.getRightOfFieldTableByRow()[1]).click();
                }else{
                    util.createDateTable(["","","","",""], ["","","","",""], ["","","","",""], "field");
                    var xData = ["","","",""];
                    createFieldTable(xData, [0,0,0,0]);
                }
            });
        });
    });
    domSelect.getFieldRankDecsBtn().click(function(){
        $(".fieldTable .rankBtn .hovered").removeClass("hovered");
        $(".fieldTable .rankBtn .selectByDesc").addClass("hovered");
        domSelect.getFieldColorBtn().hide();
        var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
        var obj = {
            schoolname: schoolName,
            seqType: 2,
            xuezhi:3
        };
        ajaxFunc.getFieldsRankList(obj).done(function(data){
            util.createFieldTable(data, function(){
                $.each(domSelect.getRightOfFieldTableByRow(), function(ii,r){
                    $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(ij,p){
                        if($(p).text() == $(r).find(".fieldName").text()){
                            $(r).find(".checkbox").addClass("checked");
                            $(r).find(".checkbox img").attr("src","images/checkbox_checked.jpg");
                        }
                    });
                });
                bindEventForFieldTable();
                if(domSelect.getRightOfFieldTableByRow()[1]){
                    $(domSelect.getRightOfFieldTableByRow()[1]).click();
                }else{
                    util.createDateTable(["    ","    ","    ","    ","    "], ["","","","",""], ["","","","",""], "field");
                    var xData = ["","","",""];
                    createFieldTable(xData, [0,0,0,0]);
                }
            });
        });
    });

     // 下一步
    domSelect.getNextBtn().click(function(){
        savingPlan();
        var plan2 = [];
        var len = 0;
        $.each(plan, function(i, p){
            var fields = [];
            $.each(p.professionlist, function(j,pp){
                    fields.push(pp.name);
            });
            if(p.selected && (p.professionlist.length >=1 && p.professionlist.length <= 6)){
                len++;
            }
            plan2.push({
                schoolname: p.schoolname,
                professionlist: fields,
                selected: p.selected
            });
        });
        if(len != 5){
            jAlert("抱歉!进入下一步必须选取5所学校，每所学校至多选6个专业,至少选1个专业","提示");
            return;
        }
		$("body").mask();
        ajaxFunc.postPlan(plan2).done(function(data){
            if(data.success){
				$("body").unmask();
                window.location.href = 'step3.html';
            }else{
				$("body").unmask();
			}
        });
    });
     //  上一步
    domSelect.getPreviousBtn().click(function(){
        savingPlan();
        var plan2 = [];
        $.each(plan, function(i, p){
            var fields = [];
            $.each(p.professionlist, function(j,pp){
                fields.push(pp.name);
            });
            plan2.push({
                schoolname: p.schoolname,
                professionlist: fields,
                selected: p.selected
            });
        });
		$("body").mask();
        ajaxFunc.postPlan(plan2).done(function(data){
            if(data.success){
				$("body").unmask();
                window.location.href = 'step1.html';
            }else{
				$("body").unmask();
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
        savingPlan();
        var plan2 = [];
        $.each(plan, function(i, p){
            var fields = [];
            $.each(p.professionlist, function(j,pp){
                fields.push(pp.name);
            });
            plan2.push({
                schoolname: p.schoolname,
                professionlist: fields,
                selected: p.selected
            });
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
                    ajaxFunc.postPlan(plan2).done(function(data){
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
            ajaxFunc.postPlan(plan2).done(function(data){
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
                savingPlan();
                var plan2 = [];
                $.each(plan, function(i, p){
                    var fields = [];
                    $.each(p.professionlist, function(j,pp){
                        fields.push(pp.name);
                    });

                    plan2.push({
                        schoolname: p.schoolname,
                        professionlist: fields,
                        selected: p.selected
                    });
                });

                ajaxFunc.postPlan(plan2).done(function(data){
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
                savingPlan();
                var plan2 = [];
                $.each(plan, function(i, p){
                    var fields = [];
                    $.each(p.professionlist, function(j,pp){
                        fields.push(pp.name);
                    });
                    plan2.push({
                        schoolname: p.schoolname,
                        professionlist: fields,
                        selected: p.selected
                    });
                });
                ajaxFunc.postPlan(plan2).done(function(data){
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
};

function savingPlan(){
    var schoolName = domSelect.getLeftOfSchoolTable().find(".clicked .schoolname").text();
    if(!schoolName) return;
    var flag = false, idx = 0;
    $.each(plan, function(index, school){
        if(school.schoolname == schoolName){
            flag = true;
            idx = index;
        }
    });
    var fields = [];
    $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(i, f){
        fields.push(
            { name: $(f).text(), type: parseInt($(f).parent().attr("type"))}
        );
    });
    if(flag){
        plan[idx].professionlist = fields;
    }else{
        plan.push({
            schoolname: schoolName,
            professionlist: fields,
            selected: false
        });
    }
};

function bindEventForFieldCompared(){
    domSelect.getFieldsCompared().find(".remove").click(function(){
        var fieldName = $($(this).parent().find("td.left")[0]).text();

        $(this).parent().remove();
        $.each(domSelect.getRightOfSelectedList().find(".fieldName"), function(i, f){
            if($(f).text() == fieldName){
                $(f).parent().remove();
            }
        });
        var length = domSelect.getRightOfSelectedList().find(".remove").length;
        domSelect.getRightOfSelectedTitle().text("已选"+length+"个专业");

        $.each(domSelect.getRightOfFieldTable().find("tbody tr"),function(i, field){
            if($(field).find(".fieldName").text() == fieldName){
                $(field).find(".checkbox").removeClass("checked");
                $(field).find("img").attr("src","images/checkbox.jpg");
            }
        });
    });
};

function createSchoolTable(xData, yData){
    var leftWidth = 240;
    var histogram1 = new Histogram("test1", "histogram1", leftWidth , 180, "年份", xData, "安全", yData, true);
    histogram1.create();
};

function createFieldTable(xData, yData){
    var rightWidth = 250;
    var histogram1 = new Histogram("test2", "histogram2", rightWidth, 180, "年份", xData, "安全", yData, true);
    histogram1.create();
};