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
    getLeft:function(){
        return $(".main .left");
    },
    getRight: function(){
        return $(".main .right");
    },
    getSelectByProvinceBtn: function(){
        return $(".selectByProvince");
    },
    getSelectByRankBtn: function(){
        return $(".selectByRank");
    },
    getSelectSchoolColorBtn: function(){
        return $(".selectSchool.colorBtn");
    },
    getSelectSchoolColorBtnClicked: function(){
        return $(".selectSchool.colorBtn .clicked");
    },
    getSelectSchoolRankBtnClicked: function(){
        return $(".selectSchool.rankBtn .clicked");
    },
    getSelectFieldRankBtnClicked: function(){
        return $(".schoolInfo .selectField.rankBtn .clicked");
    },
    getSelectFieldColorBtn: function(){
        return $(".selectField.colorBtn");
    },
    getSelectSchoolByAsc: function(){
        return $(".left .selectSchool.rankBtn .selectByAsc");
    },
    getSelectSchoolByDesc: function(){
        return $(".left .selectSchool.rankBtn .selectByDesc");
    },
    getSelectSchoolByAuto: function(){
        return $(".left .selectSchool.rankBtn .selectByAuto");
    },
    getSelectSchoolByRisk: function(){
        return $(".left .selectSchool.colorBtn .risk");
    },
    getSelectSchoolByRush: function(){
        return $(".left .selectSchool.colorBtn .rush");
    },
    getSelectSchoolByStable: function(){
        return $(".left .selectSchool.colorBtn .stable");
    },
    getSelectSchoolByInsure: function(){
        return $(".left .selectSchool.colorBtn .insure");
    },
    getSelectFieldByAsc: function(){
        return $(".schoolInfo .selectField.rankBtn .selectByAsc");
    },
    getSelectFieldByDesc: function(){
        return $(".schoolInfo .selectField.rankBtn .selectByDesc");
    },
    getSelectFieldByAuto: function(){
        return $(".schoolInfo .selectField.rankBtn .selectByAuto");
    },
    getSelectFieldByRisk: function(){
        return $(".schoolInfo .selectField.colorBtn .risk");
    },
    getSelectFieldByRush: function(){
        return $(".schoolInfo .selectField.colorBtn .rush");
    },
    getSelectFieldByStable: function(){
        return $(".schoolInfo .selectField.colorBtn .stable");
    },

    getSelectedList: function(){
        return $(".selectedList");
    },
    getSelectedSchool: function(){
        return $(".selectedSchool");
    },
    getSchoolList: function(){
        return $(".schoolList");
    },
    getSchoolInfo: function(){
        return $(".schoolInfo");
    },
    getSchoolInfoOfTitle: function(){
        return $(".schoolInfo .selectTitle");
    },
    getSchoolInfoOfRank: function(){
        return $(".schoolInfo .selectInfo");
    },
    getSchoolInfoOfFieldList: function(){
        return $(".schoolInfo .fieldList");
    },
    getSchoolInfoOfFieldListDiv: function(){
        return $(".schoolInfo .fieldList div");
    },
    getLookupBtn: function(){
        return $(".detailBtn");
    },
    getHoverSchool: function(){
        return $(".school.hover");
    },
    getNextBtn: function(){
        return $(".nextBtn");
    },
    getPreviousBtn: function(){
        return $(".previousBtn");
    },
    getProvinceInfo: function(){
        return $(".selectInfo.provinceInfo");
    },
    // 搜索
    getRankInfo: function(){
        return $(".selectInfo.rankInfo");
    },

    getMenuBtn: function(){
        return $("#menu");
    },
    getLookupSchoolBtn: function(){
        return $("#lookupSchool");
    },
    getFgBtn: function(){
        return $(".fg-button");
    },

    getSearchBtn: function(){
        return $(".search");
    },

    getPagination: function(){
        return $("#pagination");
    },

    getProvinceCombo: function(){
        return $(".selectInfo.provinceInfo select");
    },

    getPageCombo: function(){
        return $(".pages .pageIndex");
    },

    getFirstPage: function(){
        return $(".pages .firstpage");
    },

    getLastPage: function(){
        return $(".pages .lastpage");
    },

    getNextPage: function(){
        return $(".pages .nextpage");
    },

    getPrevPage: function(){
        return $(".pages .prevpage");
    },

    getTotalPage: function(){
        return $(".pages .total");
    },

    getPages: function(){
        return $(".pages");
    }


};

/**
 * ajax 请求工具类
 * @constructor
 */
function AjaxFunc(){}
AjaxFunc.prototype = {

    getSchoolListByProvince: function(obj){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'querySchoolByProvince';
//        var url = 'data/step1/schoolList.json';
        $.postJSON(url, obj, function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getSchoolInfo: function(obj){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'queryProfessionBySchool';
//        var url = 'data/step1/schoolInfo.json';
        $.postJSON(url, obj, function(data){
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

    getSearchResult: function(obj){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'querySchoolByRange';
//        var url = 'data/step1/searchResult.json';
        $.postJSON(url, obj, function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getProvince: function(){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'loadProvince';
//        var url = 'data/step1/province.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    postPlan: function(schoolNames){
        var dfd = new jQuery.Deferred();
        var url = HOST_URL + 'saveSchool';
//        var url = 'data/step1/savePlan.json';
        $.postJSON(url, {list: schoolNames}, function (data) {
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
    addSchoolItem: function($parent, itemObj){
        var school = $("<div></div>",{"class": "school"})
                        .append($("<div></div>",{"class": "schoolName"})
                                    .append( $("<span></span>").text(itemObj.name) ),
                                $("<div></div>",{"class": "remove"})
                                    .append($("<img>",{"src": "images/remove.png"}))
                                );
        $parent.prepend(school);
    },

    createSchoolList: function(dataList){
        var schoolArray = [];
        $.each(dataList, function(index, name){
            schoolArray.push(
                $("<div></div>",{"class": "school"}).append(
                    $("<div></div>",{"class": "schoolName"}).append(
                        $("<span></span>").text(name)
                    ),
                    $("<div></div>",{"class": "add"}).append(
                        $("<img>",{"src": "images/addimg.jpg"})
                    )
                )
            );
        });
        return schoolArray;
    },

    createSchoolInfo: function(schoolInfo){
        var title = schoolInfo.province + "  " + schoolInfo.city,
            year = schoolInfo.year + "年投档名次",
            rank = schoolInfo.rank,
            fields = schoolInfo.list,
            fieldArray = [];
        $.each(fields, function(index, field){
            fieldArray.push(
                $("<div></div>",{"class": "field"}).append(
                    $("<span></span>").text(field)
                )
            );
        });

        domSelect.getSchoolInfoOfTitle().find("span").empty().text(title);
        $(domSelect.getSchoolInfoOfRank().find("span")[0]).empty().text(year);
        $(domSelect.getSchoolInfoOfRank().find("span")[1]).empty().text(rank);
        domSelect.getSchoolInfoOfFieldListDiv().empty().append(fieldArray);
    },

    createSelectedSchoolList: function(dataList){
        var me = this;

        $.each(dataList, function(index, school){
            me.addSchoolItem(domSelect.getSelectedList(), {name: school});
        });
        domSelect.getSelectedSchool().find(".title span").text("已选" + dataList.length + "所");
    },

    createProvinceInfo: function(provinceInfo){
        var text = "该批次共" + provinceInfo.totalschoolnum + "所" + " 推荐" + provinceInfo.recommendnum + "所";
        domSelect.getProvinceInfo().find("span").empty().text(text);
    }
};

var domSelect = new DomSelect();
var util = new Util();
var ajaxFunc = new AjaxFunc();

var pageSize = 0;
var pageIndex = 0;
var totalPages = 0;

$(document).ready(function(){
    layout();
    bindEvent();

    ajaxFunc.getSelectedSchool().done(function(data){
        domSelect.getSelectedList().empty();
        data.length && util.createSelectedSchoolList(data);
        bindEventForSelectedList();
    });
    domSelect.getRankInfo().hide();

    init().then(function(){
        domSelect.getProvinceCombo().change();
    });

    initMap();
});

function layout(){

    var h = $(window).height() - 35 - 5;

    domSelect.getRight().height(h);
    domSelect.getLeft().height(h - 30);
    domSelect.getRight().css({
        border: "1px #fff000 solid"
    });
}

function init(){
    var dfd = new jQuery.Deferred();
    pageSize =  parseInt (( getWindowHeight() - 218 - 60 ) / 30);

    ajaxFunc.getProvince().done(function(data){
        domSelect.getProvinceCombo().empty();
        $.each(data, function(i,rec){
            domSelect.getProvinceCombo().append(
                $("<option></option>").text(rec)
            );
        });
        domSelect.getProvinceCombo().val("浙江");
        dfd.resolve();
    });
    return dfd.promise();
}

function initMap(){
    var map = new BMap.Map('map');
    map.centerAndZoom(new BMap.Point(108.403765, 33.914850), 5);
    map.disableDoubleClickZoom(); // 禁用双击放大
    map.removeControl(new BMap.CopyrightControl());
//
//    var provinces2 = [
//        "广西", "广东", "湖南", "贵州","云南",
//        "福建", "江西", "浙江-#6ef491", "安徽","湖北",
//        "河南", "江苏", "四川", "海南省","山东",
//        "辽宁", "新疆", "西藏", "陕西", "河北",
//        "黑龙江", "宁夏", "内蒙古自治区", "青海","甘肃",
//        "山西", "吉林省", "北京", "天津", "三河市",
//        "上海", "重庆市", "香港"
//    ];

    var Province = [
        {name: '广西',overlayColor:"",polygon: null},{name: '广东',overlayColor:"",polygon: null},
        {name: '湖南',overlayColor:"",polygon: null},{name: '贵州',overlayColor:"",polygon: null},
        {name: '云南',overlayColor:"",polygon: null},{name: '福建',overlayColor:"",polygon: null},
        {name: '江西',overlayColor:"",polygon: null},{name: '',overlayColor:"",polygon: null},
        {name: '浙江',overlayColor:"#6ef491",polygon: null},{name: '安徽',overlayColor:"",polygon: null},
        {name: '湖北',overlayColor:"",polygon: null},{name: '河南',overlayColor:"",polygon: null},
        {name: '江苏',overlayColor:"",polygon: null},{name: '四川',overlayColor:"",polygon: null},
        {name: '海南省',overlayColor:"",polygon: null},{name: '山东省',overlayColor:"",polygon: null},
        {name: '辽宁',overlayColor:"",polygon: null}, {name: '新疆',overlayColor:"",polygon: null},
        {name: '西藏',overlayColor:"",polygon: null}, {name: '陕西',overlayColor:"",polygon: null},
        {name: '河北',overlayColor:"",polygon: null},{name: '黑龙江',overlayColor:"",polygon: null},
        {name: '宁夏',overlayColor:"",polygon: null},{name: '内蒙古',overlayColor:"",polygon: null},
        {name: '青海',overlayColor:"",polygon: null}, {name: '甘肃',overlayColor:"",polygon: null},
        {name: '山西',overlayColor:"",polygon: null},{name: '吉林省',overlayColor:"",polygon: null},
        {name: '北京',overlayColor:"",polygon: null},{name: '天津',overlayColor:"",polygon: null},
        {name: '上海',overlayColor:"",polygon: null},{name: '重庆',overlayColor:"",polygon: null},
        {name: '香港',overlayColor:"",polygon: null},{name: '三河',overlayColor:"",polygon: null}
    ];

    function getBoundary(province){
        var bdary = new BMap.Boundary();
        bdary.get(province.name, function(rs){
            var count = rs.boundaries.length;
            for(var i = 0; i < count; i++){
                var ply;
                if(province.overlayColor){
                    ply = new BMap.Polygon(rs.boundaries[i],
                        {strokeWeight: 1, strokeOpacity:0.5,
                            fillColor:province.overlayColor ,strokeColor: "#000000"}
                    );
                }else{
                    ply = new BMap.Polygon(rs.boundaries[i],{
                        strokeWeight: 1, strokeColor: "#000000", strokeOpacity:0.5,
                        fillOpacity:0,fillColor:"#f5f3f0"
                    });
                }

                map.addOverlay(ply);
                ply.addEventListener("click",function(e){
                    var pname = province.name;
                    if(province.name.indexOf("省") >= 0){
                        pname = province.name.substr(0, province.name.length - 1);
                    }
                    var obj = {
                        province: pname,
                        seqType: 3,
                        xuezhi: 3,
                        start:0,
                        pagesize:pageSize
                    };

                    pageIndex = 0;
                    domSelect.getSelectSchoolRankBtnClicked().removeClass("clicked");
                    domSelect.getSelectSchoolByAuto().addClass("clicked");
                    domSelect.getSelectSchoolColorBtnClicked().removeClass("clicked");
                    domSelect.getSelectSchoolByStable().addClass("clicked");
                    domSelect.getProvinceInfo().show();
                    domSelect.getRankInfo().hide();
                    domSelect.getProvinceCombo().val(pname);

                    var self = this, ee = e;
                    self.setFillColor("#6ef491");
                    $("body").mask();
                    createSchoolListByProvince(obj, function(nationTotal, nationRecommend){
                        var latlng = ee.point;
                        var text = $(".provinceInfo").find("span").text();
                        var info = new BMap.InfoWindow(
                            "<strong style='font-size: 16px;'>" +  province.name + " " + text + "</strong><br/>"+
                            "<strong style='font-size: 16px;'>" + "全国该批次共" + nationTotal + "所 推荐" + nationRecommend +"所</strong>",
                            {width:250});
                        $("body").unmask();
                        map.openInfoWindow(info, latlng);
                    });
                });
            }
        });
    }
    map.clearOverlays();
    for(var i=0;i<Province.length;i++){
        getBoundary(Province[i]);
    }
}

function bindEventForSchoolList(){
    // 选中school
    domSelect.getSchoolList().find(".school").on("click",function(){
        var me = this;
        domSelect.getHoverSchool().removeClass("hover");
        $(me).addClass("hover");

        var schoolName = $(me).find(".schoolName span").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi: 3
        };
        $(".selectField.colorBtn .clicked").removeClass("clicked");
        $(".selectField.colorBtn .stable").addClass("clicked");

        $(".selectField.rankBtn .clicked").removeClass("clicked");
        $(".selectField.rankBtn .selectByAuto").addClass("clicked");
        createSchoolInfo(obj);
    });

    // 添加school
    domSelect.getSchoolList().find(".add").on("click", function(){
        if(domSelect.getSelectedList().find(".schoolName").length >= 15){
            jAlert("最多只能选取15所院校!","提示");
            return;
        }
        var me = this,
            index = $(me).parent().index(),
            selectedList = domSelect.getSelectedList(),
            school = domSelect.getSchoolList().find(".school")[index],
            schoolName = $(school).find("span").text();
        var flag = false;
        $.each(domSelect.getSelectedList().find(".schoolName"), function(i,s){
            if(schoolName == $(s).find("span").text()){
                flag = true;
            }
        });
        if(flag){
            return;
        }
        util.addSchoolItem(selectedList, {name: schoolName});
        var length = domSelect.getSelectedList().find(".school").length;
        domSelect.getSelectedSchool().find(".title span").text("已选" + length + "所");

        bindEventForSelectedList();
    });
    changeCursorStyle();
}

function bindEventForSelectedList(){
    domSelect.getSelectedList().find(".remove").unbind("click");
    //移除school
    domSelect.getSelectedList().find(".remove").on("click", function(){
        var me = this;
        $(me).parent().remove();
        var length = domSelect.getSelectedList().find(".school").length;
        domSelect.getSelectedSchool().find(".title span").text("已选" + length + "所");
    });
    changeCursorStyle();
}

function bindEvent(){

    $(".step2").click(function(){
       domSelect.getNextBtn().click();
    });
    $(".step3").click(function(){
        var selectedSchool = [];
        $.each(domSelect.getSelectedList().find(".school"), function(index, school){
            selectedSchool.push($(school).find(".schoolName span").text());
        });
		$("body").mask();
        ajaxFunc.postPlan(selectedSchool).done(function(data){
            if(data.success){
				$("body").unmask();
                window.location.href = "step3.html";
            }else{
				$("body").unmask();
			}
		});
    });

    // 按省份筛选按钮
    domSelect.getSelectByProvinceBtn().click(function(){
        domSelect.getProvinceInfo().show();
        domSelect.getRankInfo().hide();
        domSelect.getProvinceCombo().change();
    });

    // 按名次筛选按钮
    domSelect.getSelectByRankBtn().click(function(){
        domSelect.getProvinceInfo().hide();
        domSelect.getRankInfo().show();
        $("#start").val("");
        $("#end").val("");

        $(".leftMain .schoolList").empty();
        $(".schoolInfo").hide();
        domSelect.getPages().hide();
    });

    // 省份多选框
    domSelect.getProvinceCombo().change(function(){
        var obj = {
            province: domSelect.getProvinceCombo().val(),
            seqType: 3,
            xuezhi: 3,
            start:0,
            pagesize:pageSize
        };

        pageIndex = 0;
        domSelect.getSelectSchoolRankBtnClicked().removeClass("clicked");
        domSelect.getSelectSchoolByAuto().addClass("clicked");
        domSelect.getSelectSchoolColorBtnClicked().removeClass("clicked");
        domSelect.getSelectSchoolByStable().addClass("clicked");
        createSchoolListByProvince(obj);
    });

    // 搜索按钮
    domSelect.getSearchBtn().click(function(){
        var from = $("#start").val(),
            end = $("#end").val();
        var obj = {
            rankstart: from,
            rankend: end,
            seqType: 3,
            xuezhi: 3,
            start:0,
            pagesize:pageSize
        };
        pageIndex = 0;
        createSchoolListByRang(obj);
    });

    // 选择学校 排序
    domSelect.getSelectSchoolByAsc().click(function(){
        domSelect.getSelectSchoolRankBtnClicked().removeClass("clicked");
        $(this).addClass("clicked");
        domSelect.getSelectSchoolColorBtn().hide();
        var obj = {};
        if(domSelect.getRankInfo().css("display") == "none"){
            obj = {
                province: domSelect.getProvinceCombo().val(),
                seqType: 1,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByProvince(obj);
        }else{
            var from = $("#start").val(),
                end = $("#end").val();
            obj = {
                rankstart: from,
                rankend: end,
                seqType: 1,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByRang(obj);
        }
    });
    domSelect.getSelectSchoolByDesc().click(function(){
        domSelect.getSelectSchoolRankBtnClicked().removeClass("clicked");
        $(this).addClass("clicked");
        domSelect.getSelectSchoolColorBtn().hide();
        var obj = {};
        if(domSelect.getRankInfo().css("display") == "none"){
            obj = {
                province: domSelect.getProvinceCombo().val(),
                seqType: 2,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByProvince(obj);
        }else{
            var from = $("#start").val(),
                end = $("#end").val();
            obj = {
                rankstart: from,
                rankend: end,
                seqType: 2,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByRang(obj);
        }
    });
    domSelect.getSelectSchoolByAuto().click(function(){
        domSelect.getSelectSchoolRankBtnClicked().removeClass("clicked");
        $(this).addClass("clicked");
        domSelect.getSelectSchoolColorBtnClicked().removeClass("clicked");
        domSelect.getSelectSchoolByStable().addClass("clicked");

        domSelect.getSelectSchoolColorBtn().show();
        var obj = {};
        if(domSelect.getRankInfo().css("display") == "none"){
            obj = {
                province: domSelect.getProvinceCombo().val(),
                seqType: 3,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };
            createSchoolListByProvince(obj);
        }else{
            var from = $("#start").val(),
                end = $("#end").val();
            obj = {
                rankstart: from,
                rankend: end,
                seqType: 3,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByRang(obj);
        }
    });

    domSelect.getSelectSchoolByRisk().click(function(){
        domSelect.getSelectSchoolColorBtnClicked().removeClass("clicked");
        $(this).addClass("clicked");
        var obj = {};
        if(domSelect.getRankInfo().css("display") == "none"){
            obj = {
                province: domSelect.getProvinceCombo().val(),
                seqType: 3,
                xuezhi: 1,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByProvince(obj);
        }else{
            var from = $("#start").val(),
                end = $("#end").val();
            obj = {
                rankstart: from,
                rankend: end,
                seqType: 3,
                xuezhi: 1,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByRang(obj);
        }
    });
    domSelect.getSelectSchoolByInsure().click(function(){
        domSelect.getSelectSchoolColorBtnClicked().removeClass("clicked");
        $(this).addClass("clicked");
        var obj = {};
        if(domSelect.getRankInfo().css("display") == "none"){
            obj = {
                province: domSelect.getProvinceCombo().val(),
                seqType: 3,
                xuezhi: 4,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByProvince(obj);
        }else{
            var from = $("#start").val(),
                end = $("#end").val();
            obj = {
                rankstart: from,
                rankend: end,
                seqType: 3,
                xuezhi: 4,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByRang(obj);
        }
    });
    domSelect.getSelectSchoolByRush().click(function(){
        domSelect.getSelectSchoolColorBtnClicked().removeClass("clicked");
        $(this).addClass("clicked");
        var obj = {};
        if(domSelect.getRankInfo().css("display") == "none"){
            obj = {
                province: domSelect.getProvinceCombo().val(),
                seqType: 3,
                xuezhi: 2,
                start:0,
                pagesize:pageSize
            };
            createSchoolListByProvince(obj);
        }else{
            var from = $("#start").val(),
                end = $("#end").val();
            obj = {
                rankstart: from,
                rankend: end,
                seqType: 3,
                xuezhi: 2,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByRang(obj);
        }
    });
    domSelect.getSelectSchoolByStable().click(function(){
        domSelect.getSelectSchoolColorBtnClicked().removeClass("clicked");
        $(this).addClass("clicked");
        var obj = {};
        if(domSelect.getRankInfo().css("display") == "none"){
            obj = {
                province: domSelect.getProvinceCombo().val(),
                seqType: 3,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByProvince(obj);
        }else{
            var from = $("#start").val(),
                end = $("#end").val();
            obj = {
                rankstart: from,
                rankend: end,
                seqType: 3,
                xuezhi: 3,
                start:0,
                pagesize:pageSize
            };

            createSchoolListByRang(obj);
        }
    });

    // 选择专业 排序
    domSelect.getSelectFieldByAsc().click(function(){
        domSelect.getSelectFieldColorBtn().hide();
        $(".selectField.rankBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        var schoolName = domSelect.getHoverSchool().find(".schoolName").text();
        var obj = {
            schoolname: schoolName,
            seqType: 1,
            xuezhi: 3
        };

        createSchoolInfo(obj);
    });
    domSelect.getSelectFieldByDesc().click(function(){
        domSelect.getSelectFieldColorBtn().hide();
        $(".selectField.rankBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        var schoolName = domSelect.getHoverSchool().find(".schoolName").text();
        var obj = {
            schoolname: schoolName,
            seqType: 2,
            xuezhi: 3
        };

        createSchoolInfo(obj);
    });
    domSelect.getSelectFieldByAuto().click(function(){
        domSelect.getSelectFieldColorBtn().show();
        $(".selectField.rankBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        $(".selectField.colorBtn .clicked").removeClass("clicked");
        domSelect.getSelectFieldByStable().addClass("clicked");

        var schoolName = domSelect.getHoverSchool().find(".schoolName").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi: 3
        };

        createSchoolInfo(obj);
    });

    domSelect.getSelectFieldByRisk().click(function(){
        $(".selectField.colorBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        var schoolName = domSelect.getHoverSchool().find(".schoolName").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi: 1
        };
        createSchoolInfo(obj);
    });
    domSelect.getSelectFieldByRush().click(function(){
        $(".selectField.colorBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        var schoolName = domSelect.getHoverSchool().find(".schoolName").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi: 2
        };
        createSchoolInfo(obj);
    });
    domSelect.getSelectFieldByStable().click(function(){
        $(".selectField.colorBtn .clicked").removeClass("clicked");
        $(this).addClass("clicked");
        var schoolName = domSelect.getHoverSchool().find(".schoolName").text();
        var obj = {
            schoolname: schoolName,
            seqType: 3,
            xuezhi: 3
        };
        createSchoolInfo(obj);
    });

    // 分页
    domSelect.getFirstPage().click(function(){
       if(pageIndex == 0){
           jAlert("已经是第一页!","提示");
           return ;
       }
        pageIndex = 0;
        var obj = getPageCondition(pageIndex);
        if(domSelect.getRankInfo().css("display") == "none"){
            createSchoolListByProvince(obj);
        }else{
            createSchoolListByRang(obj);
        }
    });
    domSelect.getNextPage().click(function(){
        if(pageIndex < totalPages - 1){
            pageIndex = pageIndex + 1;
            var obj = getPageCondition(pageIndex);
            if(domSelect.getRankInfo().css("display") == "none"){
                createSchoolListByProvince(obj);
            }else{
                createSchoolListByRang(obj);
            }
        }else{
            jAlert("已经是最后一页!","提示");
        }

    });
    domSelect.getPrevPage().click(function(){
        if(pageIndex > 0){
            pageIndex = pageIndex - 1;
            var obj = getPageCondition(pageIndex);
            if(domSelect.getRankInfo().css("display") == "none"){
                createSchoolListByProvince(obj);
            }else{
                createSchoolListByRang(obj);
            }
        }else{
            jAlert("已经是第一页!","提示");
        }
    });
    domSelect.getLastPage().click(function(){
        if(pageIndex == totalPages - 1){
            jAlert("已经是最后一页!","提示");
            return ;
        }
        pageIndex = totalPages - 1;
        var obj = getPageCondition(pageIndex);
        if(domSelect.getRankInfo().css("display") == "none"){
            createSchoolListByProvince(obj);
        }else{
            createSchoolListByRang(obj);
        }
    });
    // 分页多选框
    domSelect.getPageCombo().change(function(){
        var page = domSelect.getPageCombo().val();
        pageIndex = page - 1;
        var obj = getPageCondition(pageIndex);
        if(domSelect.getRankInfo().css("display") == "none"){
            createSchoolListByProvince(obj);
        }else{
            createSchoolListByRang(obj);
        }
    });

    // 下一步
    domSelect.getNextBtn().click(function(){
        var selectedSchool = [];
        $.each(domSelect.getSelectedList().find(".school"), function(index, school){
            selectedSchool.push($(school).find(".schoolName span").text());
        });
		$("body").mask();
        ajaxFunc.postPlan(selectedSchool).done(function(data){
            if(data.success){
				$("body").unmask();
                window.location.href = "step2.html";
            }else{
				$("body").unmask();
			}
		});
    });
    // 上一步
    domSelect.getPreviousBtn().click(function(){
        var selectedSchool = [];
        $.each(domSelect.getSelectedList().find(".school"), function(index, school){
            selectedSchool.push($(school).find(".schoolName span").text());
        });
		$("body").mask();
        ajaxFunc.postPlan(selectedSchool).done(function(data){
            if(data.success){
				$("body").unmask();	
                window.location.href = "index.html";
            }else{
				$("body").unmask();
			}
        });
    });

    // 查看详细数据
    domSelect.getLookupBtn().click(function(){
        $("body").mask();
        var schoolName = [];
        $.each(domSelect.getSelectedList().find(".schoolName span"),function(idx, record){
            schoolName.push($(record).text());
        });
        ajaxFunc_common.getSearchSchoolResult(schoolName).done(function(data){
            if(data.success){
                util_common.createSearchSchoolResultTable(data);
                domSelect_common.getSearchSchoolResultTable().show().css({
                    top: ( getWindowHeight() - domSelect_common.getSearchSchoolResultTable().height()) / 2,
                    left: ( getWindowWidth() - domSelect_common.getSearchSchoolResultTable().width() ) / 2
                });
            }
        });
        $(".loadmask").click(function(){
            $("body").unmask();
            domSelect_common.getSearchSchoolResultTable().hide();
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
        var selectedSchool = [];
        $.each(domSelect.getSelectedList().find(".school"), function(index, school){
            selectedSchool.push($(school).find(".schoolName span").text());
        });
        var flag = false;
        $.each( $(".savedPlansList li a"), function(i, a){
            if($(a).text() == planname){
                flag = true;
            }
        });
        if(flag){
            jConfirm(planname +"　方案已存在，是否覆盖", "提示",function(btn){
                if(btn ){
                    $("body").mask();
                    ajaxFunc.postPlan(selectedSchool).done(function(data){
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
            ajaxFunc.postPlan(selectedSchool).done(function(data){
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

    //查看专业
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
                var selectedSchool = [];
                $.each(domSelect.getSelectedList().find(".school"), function(index, school){
                    selectedSchool.push($(school).find(".schoolName span").text());
                });
                ajaxFunc.postPlan(selectedSchool).done(function(data){
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
                var selectedSchool = [];
                $.each(domSelect.getSelectedList().find(".school"), function(index, school){
                    selectedSchool.push($(school).find(".schoolName span").text());
                });
                ajaxFunc.postPlan(selectedSchool).done(function(data){
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

    changeCursorStyle();
}

// 更改鼠标样式
function changeCursorStyle(){
    domSelect.getSelectByProvinceBtn().hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    domSelect.getSelectByRankBtn().hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });

    domSelect.getNextBtn().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getPreviousBtn().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSchoolList().find(".add").hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectedList().find(".remove").hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSchoolList().find(".school").hover(function(){
        $(this).addClass("mouseEnter");
    });
    domSelect.getLookupBtn().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectFieldByAsc().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectFieldByAuto().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectFieldByDesc().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectFieldByRisk().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectFieldByRush().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectFieldByStable().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectSchoolByAsc().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectSchoolByAuto().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectSchoolByDesc().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectSchoolByInsure().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectSchoolByRisk().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectSchoolByRush().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSelectSchoolByStable().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getSearchBtn().hover(function(){
        $(this).addClass("hover");
    });
};

function createSchoolListByProvince(obj, callback){
    ajaxFunc.getSchoolListByProvince(obj).done(function(data){
        util.createProvinceInfo(data);
        if(!data.list.length){
            domSelect.getSchoolList().empty();
            jAlert("该类别下无学校!","提示");
            domSelect.getSchoolInfo().hide();
            domSelect.getPages().hide();
            if(callback){
                callback(data.nationTotal, data.nationRecommend);
            }
            return;
        }
        var schoolList = data.list;
        domSelect.getSchoolList().empty().append(
            util.createSchoolList(schoolList)
        );
//        pageIndex = 0;
        // 是否需要分页
        if(data.totalnum > pageSize){
            totalPages =  Math.ceil( data.totalnum / pageSize );
            domSelect.getPages().show();
            domSelect.getTotalPage().empty().text("共" + totalPages +"页");
            domSelect.getPageCombo().empty();
            for( var i = 1; i <=  totalPages ; i++){
                domSelect.getPageCombo().append(
                    $("<option></option>").text(i)
                );
            }
            domSelect.getPageCombo().val(pageIndex + 1);
        }else{
            domSelect.getPages().hide();
        }

        bindEventForSchoolList();
        $(domSelect.getSchoolList().find(".school")[0]).click();

        if(callback){
            callback(data.nationTotal, data.nationRecommend);
        }

    });
};

function createSchoolListByRang(obj){
    ajaxFunc.getSearchResult(obj).done(function(data){
        if(!data.list.length){
            domSelect.getSchoolList().empty();
            jAlert("该类别下无学校!","提示");
            domSelect.getSchoolInfo().hide();
            domSelect.getPages().hide();
            return;
        }
        domSelect.getSchoolList().empty().append(
            util.createSchoolList(data.list)
        );

//        pageIndex = 0;
        // 是否需要分页
        if(data.totalnum > pageSize){
            totalPages =  Math.ceil( data.totalnum / pageSize );
            domSelect.getPages().show();
            domSelect.getTotalPage().empty().text("共" + totalPages +"页");
            domSelect.getPageCombo().empty();
            for( var i = 1; i <=  totalPages ; i++){
                domSelect.getPageCombo().append(
                    $("<option></option>").text(i)
                );
            }
            domSelect.getPageCombo().val(pageIndex + 1);
        }else{
            domSelect.getPages().hide();
        }
        bindEventForSchoolList();
        $(domSelect.getSchoolList().find(".school")[0]).click();
    });
};

function createSchoolInfo(obj){
    ajaxFunc.getSchoolInfo(obj).done(function(schoolInfo){
        util.createSchoolInfo(schoolInfo);
        var offsetTop = domSelect.getHoverSchool().offset().top,
            winHeight = $(window).height();
        if( offsetTop + 300 >= winHeight){
            offsetTop = winHeight - 300 - 10;
        }
        var marginTop = offsetTop - domSelect.getSchoolList().offset().top;
        domSelect.getSchoolInfo().animate({
            marginTop: marginTop - 1
        }).show();

        var height = domSelect.getSchoolInfoOfFieldListDiv().height();
        if(height > 180){
            domSelect.getSchoolInfoOfFieldList().css({
                "overflow-y":'scroll'
            });
        }

    });
};

function getPageCondition(index){
    var obj = {};
    var selType = 0,xuezhi = 0;
    if(domSelect.getSelectSchoolRankBtnClicked().hasClass("selectByAuto")){
        selType = 3;
    }else if(domSelect.getSelectSchoolRankBtnClicked().hasClass("selectByAsc")){
        selType = 1;
    }else if(domSelect.getSelectSchoolRankBtnClicked().hasClass("selectByDesc")){
        selType = 2;
    }

    if(domSelect.getSelectSchoolColorBtnClicked().hasClass("risk")){
        xuezhi = 1;
    }else if(domSelect.getSelectSchoolColorBtnClicked().hasClass("rush")){
        xuezhi = 2;
    }else if(domSelect.getSelectSchoolColorBtnClicked().hasClass("stable")){
        xuezhi = 3;
    }else if(domSelect.getSelectSchoolColorBtnClicked().hasClass("insure")){
        xuezhi = 4;
    }

    if(domSelect.getRankInfo().css("display") == "none"){
        obj = {
            province: domSelect.getProvinceCombo().val(),
            seqType: selType,
            xuezhi: xuezhi,
            start: index,
            pagesize:pageSize
        };
    }else{
        var from = $("#start").val(),
            end = $("#end").val();
        obj = {
            rankstart: from,
            rankend: end,
            seqType: selType,
            xuezhi: xuezhi,
            start: index,
            pagesize:pageSize
        };
    }
    return obj;
};



