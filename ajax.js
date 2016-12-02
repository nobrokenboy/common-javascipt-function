/**
 * Created by jessic on 2016/10/19.
 */
window.ajax=(function(){
    var ajax={};
    ajax.requestWithRespond=function(options){
        debugger;
        //创建XMLHttpRequest
        var xmlHttp;
        options=options||{};
        options.type=options.type||"get";
        options.url=options.url||"";
        options.isAsync=options.isAsync||true;
        options.dataType=options.dataType||"json";
        options.data=options.data||{};
        var params=this.formatData(options.data);
        if(window.ActiveXObject) {
            //ie6版本以及以前
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }else if(window.XMLHttpRequest){
            xmlHttp=new XMLHttpRequest();
        }else{
            alert("亲，您的浏览器版本太低了");
            return false;
        }

        //连接
        if(options.type=="get"){
            debugger;
            xmlHttp.open(options.type,options.url+"?"+params,options.isAsync);
            xmlHttp.send(null);
        }else if(options.type="post"){
            debugger;
            xmlHttp.open(options.type,options.url,options.isAsync);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.send(params);
        }

        xmlHttp.onreadystatechange=recieveData;//这里接收的是句柄

        function recieveData(){
            debugger;
            if(xmlHttp.readyState==4&&xmlHttp.status==200){
                //responeseText是string类型
                options.success(xmlHttp.responseText,xmlHttp.responseXML);
            }else{
                options.error(xmlHttp.responseText,xmlHttp.responseXML);
            }
        }

    };

    ajax.formatData= function (data) {
        debugger;
        var arr=[];
        for(var i in data){
            //encodeURIComponent对URI组件进行编码，解析成字符串
            arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
        }
        //拒绝服务器缓存
        arr.push(("v="+Math.random()).replace(".",""));
        return arr.join("&");
    };
    return ajax;
})();
