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
    getMain: function(){
        return $(".main");
    },
    getLoginForm: function(){
        return $(".loginForm");
    },

    getUser: function(){
        return $(".loginForm #user");
    },

    getPwd: function(){
        return $(".loginForm #pwd");
    },

    getLoginBtn: function(){
        return $(".loginForm .leftBtn");
    },

    getLookupBtn: function(){
        return $(".loginForm .rightBtn");
    }

};

/**
 * ajax 请求工具类
 * @constructor
 */
function AjaxFunc(){}
AjaxFunc.prototype = {

    login: function(obj){
        var dfd = new jQuery.Deferred();
//        var url = 'data/index/savePlan.json';
        var url = HOST_URL +  'login';
        $.postJSON(url,obj, function (data) {
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

};

var domSelect = new DomSelect();
var ajaxFunc = new AjaxFunc();
var util = new Util();

/**
 * 页面加载完成
 */
$(document).ready(function(){

    layout();

    bindEvent();

});

function layout(){

    domSelect.getMain().height(getWindowHeight() - 35);
    domSelect.getMain().width(getWindowWidth());

    $(".loginForm").css({
        top:getWindowHeight() * 0.35 + 30
    });

    $(window).resize(function(){
        layout();
    });
}


function bindEvent(){
    domSelect.getLoginBtn().click(function(){
        var username = domSelect.getUser().val(),
            pwd = domSelect.getPwd().val();
        if(!username || !pwd){
            jAlert("用户名或密码输入错误!","提示");
        }else{
            var obj = {
                username: username,
                password: pwd
            };
			$("body").mask();
            ajaxFunc.login(obj).done(function(data){
                if(data.success){
					$("body").mask();
                    if(data.isregistered){
                        window.location.href = "step1.html";
                    }else{
                        window.location.href = "index.html";
                    }
                }else{
					$("body").unmask();
                    jAlert("用户名或密码错误!","提示");
                }
            });
        }
    });

   $("#pwd").keydown(function(e){
        if(e.keyCode == 13){
            var username = domSelect.getUser().val(),
                pwd = domSelect.getPwd().val();
            if(!username || !pwd){
                jAlert("用户名或密码输入错误!","提示");
            }else{
                var obj = {
                    username: username,
                    password: pwd
                };
				$("body").mask();
                ajaxFunc.login(obj).done(function(data){
                    if(data.success){
						$("body").unmask();
						if(data.isregistered){
							window.location.href = "step1.html";
						}else{
							window.location.href = "index.html";
						}
                    }else{
						$("body").unmask();
						jAlert("登录失败!","提示");
					}
				});
            }
        }
    });
}


