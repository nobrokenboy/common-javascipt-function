/**
 * Created by jessic on 2016/10/20.
 */
window.util=(function(){
    var util={};
    util.url=window.location.href;
    util.search=window.location.search;
    util.hasClass=function(obj,classOfName){
        return obj.className.match(new RegExp('(\\s|^)'+classOfName+'(\\s|$)'));
    };
    util.addClass=function(obj,classOfName){
        if(!this.hasClass(obj,classOfName)){
            //必须是加空格的双引号
            obj.className+=" "+classOfName;
        }
    };
    util.removeClass=function(obj,classOfName){
        if(this.hasClass(obj,classOfName)){
            var reg=new RegExp('(\\s|^)'+classOfName+'(\\s|$)');
            obj.className=obj.className.replace(reg,"");
        }
    };
    util.toggleClass=function(obj,classOfName){
        if(this.hasClass(obj,classOfName)){
            this.removeClass(obj,classOfName);
        }else{
            this.addClass(obj,classOfName);
        }
    };
    /*
    * change to Array,the method is better than the next one
    * */
    util.toArr= function (items) {
            try {
                return Array.prototype.slice.call(items);
            } catch (ex) {

                var i= 0,
                    len= items.length,
                    result= Array(len);

                while (i < len) {
                    result[i] = items[i];
                    i++;
                }

                return result;
            }
    };
    util.toArray= function (obj) {
        return Array.prototype.slice.call(obj);
    };
    /*
    * 检测对象的类型
    * */
    util.isType = function(type, obj) {
        //检测数组可以使用Object.prototype.toString()方法进行检测，如果是数组的话，他会返回"[object Array]",如果是对象，会返回"[object object]"
        var _class = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && _class === type;
    };
    /*
    *深度扩展
    * */
    util.deepExtend = function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (!obj)
                continue;
            for (var key in obj) {
                //检测该对象属性是不是从父类那边继承来的
                if (obj.hasOwnProperty(key)) {
                    if (this.isType('Object', obj[key]) && obj[key] !== null)
                        this.deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }
        return out;
    };
    /*
    *去重数组的函数
    * */
    util.removeDuplicate=function(arr){
        var obj={},
            result=[];
        for(var i= 0,j=arr.length;i<j;i++){
            obj[arr[i]]=i;
        }
        //获取对象的key
        for(var i in obj){
            result.push(parseInt(i));
        }
        return result;
    }
    /*
    *传入地址栏参数获取对应的值；
    */
    util.getUrlParas=function(para){
        var paraStr,arr=[];
        paraStr=this.search.substr(1);
        arr=paraStr.split("&");
        for(var i=0,j=arr.length;i<j;i++){
            var parameter=arr[i].split("=");
            if(parameter[0].toLowerCase()==para.toLowerCase()){
                return parameter[1];
            }
        }
        return "";

    };
    
    //判断元素是否在数组中
	util.isElementInArr=function(ele,arr){
		for(var i= 0,j=arr.length;i<j;i++){
			if(ele==arr[i]){
				return true;
			}
		}
	};
	//获取时间差,返回时间差
	util.getDiffTimes= function (t1,t2) {
		var diffTimes=t2-t1;
		var timesObj={};
		var d=0;//天数
		var h=0;//时
		var m=0;//分
		var s=0;//秒
		if(diffTimes>=0){
			d=Math.floor(diffTimes/1000/60/60/24);
			h=Math.floor(diffTimes/1000/60/60%24);
			m=Math.floor(diffTimes/1000/60%60);
			s=Math.floor(diffTimes/1000%60);
		}

		h = h>9 ? h : "0"+h; //如果小时小于10,则在前面加0补充为两位数字
		m = m>9 ? m : "0"+m; //如果分钟小于10,则在前面加0补充为两位数字
		s = s>9 ? s : "0"+s; //如果秒数小于10,则在前面加0补充为两位数字

		timesObj={
			h:h,
			m:m,
			s:s
		};
		return timesObj;

	};
    
    
    return util;
})();