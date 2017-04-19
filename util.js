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
    };
    /*
    *判断地址了是否存在该字段
     * */
    util.isIndexOfValue=function(val){
		if(this.url.indexOf(val)>-1){
			return true;
		}
	};
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
	//将手机号码显示进行处理
	util.replacePhoneStr=function (phone,str1,str2,replaceStr) {
		//检验参数的个数
		if(arguments.length!=4)
			throw new Error('received ' + arguments.length + ' parameters and should work with 4');
		str1=str1||0;
		str2=str2||phone.length;
		//str2至少要str1后一位
		if(!phone){
			return "请确定手机号码";
		}
		if(typeof str1 !="number"||typeof str2!="number"){
			return "请输入正确的参数格式";
		}
		replaceStr=replaceStr||eval("alert('请传入手机号要替换的字符串');");
		phone=phone.replace(phone.substring(str1,str2),replaceStr);
		return phone;
	}
	
	//获取前天，今天，昨天，明天，后天的日期
	util.getDate=function(AddDayCount){
		var dd = new Date();
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		var y = dd.getFullYear();
		var m = dd.getMonth()+1;//获取当前月份的日期
		var d = dd.getDate();
		return y+"-"+m+"-"+d;

	};

	//获取前一个月，后一个月
	util.getMonths=function(AddMonthCount){
		var dd=new Date();
		dd.setMonth(dd.getMonth()+AddMonthCount);
		var y=dd.getFullYear();
		var m=dd.getMonth()+1;
		var d=dd.getDate();
		return y+"-"+m+"-"+d;
	};
	
	//获取统一为“-”连接符的日期格式
	util.getDateToday=function(){
		var tempDate=new Date();
		var nowYear=tempDate.getFullYear();
		var nowMonth=tempDate.getMonth()+1;
		var nowDate=tempDate.getDate();
		var nowHour=tempDate.getHours()>9?tempDate.getHours():"0"+tempDate.getHours();
		var nowMini=tempDate.getMinutes()>9?tempDate.getMinutes():"0"+tempDate.getMinutes();
		var nowSecond=tempDate.getSeconds()>9?tempDate.getSeconds():"0"+tempDate.getSeconds();
		return nowYear+"-"+nowMonth+"-"+nowDate+" "+nowHour+":"+nowMini+":"+nowSecond;
	};
	
	//判断身份证是否正确
	util.fisCardID=function (sId) {
		var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
		var iSum=0 ;
		var info="" ;
		if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
		sId=sId.replace(/x$/i,"a");
		if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
		sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
		var d=new Date(sBirthday.replace(/-/g,"/")) ;
		if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
		for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
		if(iSum%11!=1) return "你输入的身份证号非法";
		return true;
	};
    
    
    return util;
})();