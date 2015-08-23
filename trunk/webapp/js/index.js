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
    getLeft: function(){
        return $(".left");
    },
    getRight: function(){
        return $(".right");
    },
    getSubjectCombo: function(){
        return $("#subject");
    },
    getBirthPlaceCombo: function(){
        return $("#birthPlace");
    },
    getConfirmBtn: function(){
        return $(".confirmInput");
    },
    getStartDesignBtn: function(){
        return $(".startDesign");
    },
    getForm: function(){
        return $(".form form");
    }
};

/**
 * ajax 请求工具类
 * @constructor
 */
function AjaxFunc(){}
AjaxFunc.prototype = {
    register: function(obj){
        var dfd = new jQuery.Deferred();
//        var url = 'data/index/savePlan.json';
        var url = HOST_URL +  'register';
        $.postJSON(url, obj, function (data) {
            dfd.resolve(data);
        });
        return dfd.promise();
    },

    getPlan: function(){
        var dfd = new jQuery.Deferred();
//        var url = 'data/index/getPlan.json';
        var url = HOST_URL +  'registerinfo';
        $.get(url).done(function (data) {
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
    addBirthPlaceOption: function(parent, optionsArray){
        var ops = [];
        optionsArray.length &&
        $.each(optionsArray, function(idx, option){
            var op = $("<option></option>",{value: option.id}).text(option.name);
            ops.push(op);
        });
        parent.append(ops);
    }
};

var domSelect = new DomSelect();
var ajaxFunc = new AjaxFunc();
var util = new Util();

/**
 * 页面加载完成
 */
$(document).ready(function(){

    layout();

    ajaxFunc.getPlan().done(function(values){
        if(values.success){
            initSetValues(values);
        }
    });

    bindEvent();

});

function initSetValues(values){
    domSelect.getForm().find("input[name=user]").val(values.realname);
    domSelect.getForm().find("input[name=sex][value=" + values.sex +"]").attr("checked",true);
    domSelect.getForm().find("select[name=kemu]").val(values.kemu);
    domSelect.getForm().find("select[name=city]").val(values.province);
    domSelect.getForm().find("input[name=school]").val(values.school);
    domSelect.getForm().find("input[name=candidateNo]").val(values.kaoshihao);
    domSelect.getForm().find("input[name=telephone]").val(values.cellphone);
    domSelect.getForm().find("input[name=email]").val(values.mail);
    domSelect.getForm().find("input[name=chinese]").val(values.chinese);
    domSelect.getForm().find("input[name=math]").val(values.math);
    domSelect.getForm().find("input[name=english]").val(values.english);
    domSelect.getForm().find("input[name=science]").val(values.lizong);
    domSelect.getForm().find("input[name=artSumup]").val(values.wenzong);
    domSelect.getForm().find("input[name=module]").val(values.optional)
    domSelect.getForm().find("input[name=score]").val(values.techscore);
    domSelect.getForm().find("input[name=predictRank]").val(values.estimateranking);
    domSelect.getForm().find("input[name=exactRank]").val(values.exactranking);

    if(values.estimateranking){
        domSelect.getForm().find("input[name=predictRank]").attr("readonly","readonly");
    }
    if(values.exactranking){
        domSelect.getForm().find("input[name=exactRank]").attr("readonly","readonly");
    }
}

function layout(){
    var leftHeight = domSelect.getLeft().height(),
        bodyHeight = $(window).height();
//    domSelect.getRight().height(leftHeight);
    domSelect.getRight().height(bodyHeight * 0.8);
}

function changeCursorStyle(){
    // 更改鼠标样式
    domSelect.getConfirmBtn().hover(function(){
        $(this).addClass("hover");
    });
    domSelect.getStartDesignBtn().hover(function(){
        $(this).addClass("hover");
    });
}

function resize(){
    $(window).resize(function(){
        layout();
    });
}

function bindEvent(){
    //  默认禁用开始设计的click功能
    domSelect.getStartDesignBtn().attr("disabled",true);

    // 绑定按钮事件
    domSelect.getConfirmBtn().click(function(){
        domSelect.getStartDesignBtn().attr("disabled",false);
        domSelect.getStartDesignBtn().addClass("enable");
    });
    domSelect.getStartDesignBtn().click(function(){
        if($(this).attr("disabled")){
            return false;
        }else{
            var values ={
                realname: domSelect.getForm().find("input[name=user]").val(),
                sex:domSelect.getForm().find("input[name=sex]:checked").val(),
                kemu:domSelect.getForm().find("select[name=kemu]").val(),
                city:domSelect.getForm().find("select[name=city]").val().trim(),
                school:domSelect.getForm().find("input[name=school]").val(),
                kaoshihao:domSelect.getForm().find("input[name=candidateNo]").val(),
                cellphone:domSelect.getForm().find("input[name=telephone]").val(),
                email:domSelect.getForm().find("input[name=email]").val(),
                chinese:domSelect.getForm().find("input[name=chinese]").val(),
                math:domSelect.getForm().find("input[name=math]").val(),
                english:domSelect.getForm().find("input[name=english]").val(),
                lizong:domSelect.getForm().find("input[name=science]").val(),
                wenzong:domSelect.getForm().find("input[name=artSumup]").val(),
                optional:domSelect.getForm().find("input[name=module]").val(),
                techscore:domSelect.getForm().find("input[name=score]").val(),
                estimateranking:domSelect.getForm().find("input[name=predictRank]").val(),
                exactranking:domSelect.getForm().find("input[name=exactRank]").val()
            };

            if(!values.realname){
                jAlert("姓名不能为空!","提示");return;
            }
            if(!values.sex){
                jAlert("性别不能为空!","提示");return;
            }
            if(!values.kemu){
                jAlert("科目不能为空!","提示");return;
            }
            if(!values.school){
                jAlert("学校不能为空!","提示");return;
            }
            if(!values.kaoshihao){
                jAlert("准考证号不能为空!","提示");return;
            }
            if(!values.email){
                jAlert("邮箱不能为空!","提示");return;
            }
            if(!values.cellphone){
                jAlert("联系电话不能为空!","提示");return;
            }
            if(!values.chinese || values.chinese < 0 || values.chinese > 150){
                jAlert("语文成绩填写错误!","提示");return;
            }
            if(!values.math || values.math < 0 || values.math > 150){
                jAlert("数学成绩填写错误!","提示");return;
            }
            if(!values.english || values.english < 0 || values.english > 150){
                jAlert("英语成绩填写错误!","提示");return;
            }

            if(values.kemu.indexOf("一")>-1 && !values.optional){
                jAlert("自选模块不能为空!","提示");return;
            }
            if(values.kemu.indexOf("三")>-1 && !values.techscore){
                jAlert("技术分不能为空!","提示");return;
            }
            if(!values.estimateranking && !values.exactranking){
                jAlert("请填写预估名次或准确名次","提示");return;
            }

			$("body").mask();
            ajaxFunc.register(values).then(function(data){
                if(data.success){
					$("body").unmask();
                    window.location.href = "step1.html";
                }else{
					$("body").unmask();
                   if(data.errorstring == "已注册"){
                       window.location.href = "step1.html";
                   }else{
                       jAlert(data.errorstring, "提示");
                   }
                }
            });
        }
    });

    // 改变鼠标样式
    changeCursorStyle();
    // 窗口改变大小
    resize();
}


