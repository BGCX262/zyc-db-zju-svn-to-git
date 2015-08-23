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
    getPreviousBtn: function(){
        return $(".bottomBtn .previous");
    },

    getDownloadBtn: function(){
        return $(".bottomBtn .download");
    },
    getTableBody: function(){
        return $(".bottomTable tbody");
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
        var url =HOST_URL + 'getfinalplanlist';
//        var url = 'data/schoolList_step3.json';
        $.get(url).done(function(data){
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    download: function(){
        var dfd = new jQuery.Deferred();
        var url =HOST_URL + 'downloadplanaction';
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
function Util(){}
Util.prototype = {
   createTable: function(data){
       if(!data.list.length){
           return;
       }
       var tBody = domSelect.getTableBody();
       tBody.empty();
       $.each(data.list, function(i,school){
           var tr = $("<tr></tr>");
            if( i == 0){
                tr.append(
                    $("<td></td>",{"class":"batch", rowspan: data.list.length}).append(
                        $("<div></div>").text(data.pici)
                    ),
                    $("<td></td>").text("A志愿学校 " + school.schoolname)
                )
            }else{
                var type = 'B';
                switch(i){
                    case 1:
                        type = 'B';
                        break;
                    case 2:
                        type = 'C';
                        break;
                    case 3:
                        type = 'D';
                        break;
                    case 4:
                        type = 'E';
                        break;
                    default:
                        break;
                }
                if(i % 2){
                    tr.addClass("rowEven");
                    tr.append(
                      $("<td></td>").text(type +"志愿学校 " + school.schoolname)
                    );
                }else{
                    tr.append(
                      $("<td></td>").text(type +"志愿学校 " + school.schoolname)
                    );
                }
            }
           var td = $("<td></td>");
           $.each(school.professionlist, function(ii, f){
               td.append(
                   $("<div></div>", {"class": "field"}).html(
                       "第<span>" +(ii+1) + "</span>专业 " + f
                   )
               )
           });
           tr.append(td);
           tr.append(
               $("<td></td>").append(
                   $("<div></div>",{"class": 'obedience'}).append(
                       $("<div></div>",{"class": 'check'}).append(
                           $("<img>",{src: 'images/tableCheck.jpg'})
                       ),
                       $("<span></span>").text("专业服从")
                   ),
                   $("<div></div>",{"class": 'obedience'}).append(
                       $("<div></div>",{"class": 'check'}).append(
                           $("<img>",{"src": 'images/tableCheck.jpg'})
                       ),
                       $("<span></span>").text("走读服从")
                   )
               )
           );
           tBody.append(tr);
       });
   }
};

var domSelect = new DomSelect();
var util = new Util();
var ajaxFunc = new AjaxFunc();

$(document).ready(function(){
    bindEvents();

    ajaxFunc.getSchoolList().done(function(data){
        util.createTable(data);
    });

});

function bindEvents(){

    $(".step1").click(function(){
        window.location.href = 'step1.html';
    });
    $(".step2").click(function(){
        window.location.href = 'step2.html';
    });
    $(".step3").click(function(){
        window.location.href = 'step3.html';
    });

    domSelect.getPreviousBtn().click(function(){
        window.location.href = 'step3.html';
    });

    domSelect.getDownloadBtn().click(function(){
        window.location.href = HOST_URL + "downloadplanaction";
    });

    //保存方案
    domSelect_common.getSavePlanConfirmBtn().click(function(){
        var planname = $("#inputPlanName").val();
        if(!planname){
            jAlert("方案名不能为空！","提示");
            return;
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
                            }else{
								$("body").unmask();
                                jAlert("保存失败，抱歉！","提示");
                            }
                        });
                    }
                    else{
                        $("#inputPlanName").val("");
                    }
                });
            }else{
                $("body").mask();
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
                    }else{
						$("body").unmask();
                        jAlert("保存失败，抱歉！","提示");
                    }
                });
            }
        }
    });

}


function layout(){
    var bodyWidth = $(document).width();
    var schoolWidth = domSelect.getSchool().width() + 20;

    domSelect.getSchoolList().css({
        width: schoolWidth * 5 + 20,
        marginLeft: (bodyWidth - schoolWidth * 5 ) / 2
    });
    domSelect.getBottomList().css({
        width: schoolWidth * 5 + 20
    });
}
