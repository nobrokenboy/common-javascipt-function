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
            result.push(i);
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
	//验证手机号码的正确性
	util.testPhone=function(phoneNum,isRequire){
		isRequire=isRequire||true;
		var phoneRegx=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
		if(!phoneNum&&isRequire){
			return "手机号不能为空";
		}
		if(!phoneNum.match(phoneRegx)){
			return "您输入的手机格式有误";
		}
		return true;
	}
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
	
	util.turnOneToTwo=function(arr,column){
		var twoDimensArr=[];
		//获取数组长度
		var arrlength=arr.length;
		//获取行数
		var rows=Math.ceil(arrlength/column);
		for(var i=0,j=rows;i<j;i++){
			var startIndex=i*column;
			var endIndex=startIndex+column;
			twoDimensArr.push(arr.slice(startIndex,endIndex));
		}
		
		return twoDimensArr; 
	};
	
	util.setCookie=function(c_name,value,expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	};

	util.getCookie=function(c_name){
		var c_start,c_end;
		if (document.cookie.length>0)
		{
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1)
			{
				c_start=c_start + c_name.length+1
				c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			}
		}
		return ""
	};

	util.deleteCookie=function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null)
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	};
	
	util.getArrIntoClassify=function(arr){//将数组中的项进行归类和计数,
		var obj={},tempStr="",temArr=[],removeRepeateArr=[];
		if(arr.length>0){
			//这一步是去重
			arr.forEach(function(item,key,arr){
				obj[item]=item;//获取到不重复的key
			});
			//console.log(obj);
			for(var i in obj){//获取种类以及对于个数
				removeRepeateArr.push({
					"typeName":i,
					"num":0
				});
			}
			arr.forEach(function(item,key,arr){
				removeRepeateArr.forEach(function(value,index,arr1){
					if(item==value.typeName){
						value.num++;
					}
				});
			});
			removeRepeateArr.forEach(function(item,key,arr){//根据后台处理，默认
				temArr.push(item.typeName+"*"+item.num);
			});
			//console.log(removeRepeateArr);
			//console.log(temArr);

			tempStr=temArr.join('、');
		}
		return {
			arr:removeRepeateArr,
			str:tempStr//默认的已经处理好的
		};
	};
	
	util.keyNum=function(val){//作用：输入必须是数字，否则置为空
		if(isNaN(val))
			val="";
		//return val.replace(/[^\d,.?]/g,'');
		return val;
	};
	
	util.keyPositiveNum=function(val,isLessNumberOne){//判断输入是否为正数,val输入值，isLessNumberOne是否需要小于1
		isLessNumberOne=isLessNumberOne||false;
		//debugger;
		if(!isNaN(val)){
			if(val>0&&!isLessNumberOne){
				return true;
			}else if(val>0&&isLessNumberOne){
				if(val>1||val==1){
					return "请输入大于0小于1的正数";
				}else{
					return true;
				}
			}else if((val<0||val==0)&&!isLessNumberOne){
				return "请输入正数";
			}else if((val<0||val==0)&&isLessNumberOne){
				return "请输入大于0小于1的正数";
			}
		}else{
			if(!isLessNumberOne){
				return "请输入正数";
			}else{
				return "请输入大于0小于1的正数";
			}
		}
	};
	
	util.keyOneLessThanTwo=function(val1,val2){//val1必须小于val2
		if(val1>val2){
			val1=val2;
		}
		return val1;
	};

	util.keepNumDecimal=function(val,nums){//保持num代表的是位数，保留小数点后的位数
		var temp=val.toString();
		var strLength=temp.length;
		var dotIndex=temp.indexOf(".");
		var strMaxLength=dotIndex+1+nums;
		if(dotIndex>-1){
			//存在小数点
			if(strLength>strMaxLength){
				val=Math.floor(val);
			}
		}
		return val;
	};
	util.trim=function(str){//去除空格
		return str.replace(/(^\s*)|(\s*$)/g, ""); 
	}
	util.checkIdentityId=function(sID){//sID传字符串
		ns
		
	}
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
		if(iSum%11!=1) return "你输入的身份证号非法的哦";
		return true;
	};
	
	//判断是不是正整数
	util.testIsPositiveInt=function(val){
		var regxVal=/^[0-9]*[1-9][0-9]*$/;
		if(isNaN(val)){
			return "请输入正整数";
		}
		var temp=parseFloat(val);
		if(regxVal.test(temp)){
			return true;
		}else{
			return "请输入正整数";
		}
	};
    //删除数组中指定的元素，并返回新的数组
    util.deleteElementFromArray=function(arr,ele){
    	var eleIndex;
		for(var i=0;i<arr.length;i++){
			if(arr[i]==ele){
				console.log(i);
                eleIndex=i;
			}
		}
		if(eleIndex>-1){
			console.log("要删除的元素索引值",eleIndex);
            return arr.splice(eleIndex,1);
		}
		
	
    };
    //new set 去重
    util.removeRepeate=function(arr){
    	return Array.from(new Set(arr));//转化为数组
    };
    //获取星星评价
    util.getStarEvaluate=function(para,rate){
    	return para.slice(5-rate,10-rate);
    };
    //判断是否唯一
    util.checkOnly=function(value,arr){//判断是否出现重复
		var appearTimes=0;//是否找到数组的位置标记以及次数
		var appearIndex=[];
		for(var i in arr){
			if(value==arr[i]){
                appearTimes++;
                appearIndex.push(i);
			}
		}
		console.log(appearTimes);
		console.log(appearIndex);
		//结果,0次，1次或者多次；
		if(appearTimes==0){
			return true;
		}else if(appearTimes==1){
			return true;
		}else if(appearTimes>1){
			return false;
		}
	};
	util.getDateStr=function(addDayNums){//获取今，明，后等的日期
        const date=new Date();
        date.setDate(date.getDate()+addDayNums);
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        return `${year}-${month}-${day}`;
    }
	
	util.getDateDiff=function(d1,d2){//获取两个日期之间的天数,d1是2018-08-23这种格式
		let d1Times,d1DateArr,d2DateArr,d2Times,diffTimes,differDate;
		d1DateArr=d1.split('-');
		d2DateArr=d2.split('-');
		d1Times=new Date(d1DateArr[0],d1DateArr[1]-1,d1DateArr[2]).getTime();
		d2Times=new Date(d2DateArr[0],d2DateArr[1]-1,d2DateArr[2]).getTime();
		diffTimes=d2Times-d1Times;
		console.log(diffTimes);
		console.log(diffTimes/(1000*60*60*24));
		differDate=Math.abs(Math.floor(diffTimes/(1000*60*60*24))); 
		console.log('相差天数'+differDate);
		return differDate;
	}
	
	util.dealWidthRepeateObj=function(arr,differ){//arr是去重的数组对象,differ是key,3个以上数据存在问题
//	
//		 for (var i = 0; i < arr.length - 1; i++) {//出现3个以上就去重不了
//            for (var j = 1; j < arr.length; j++) {
//                if (i != j) {
//                    if (arr[i][differ] == arr[j][differ]) {
//                        arr.splice(j, 1);
//                    }
//                }
//
//            }
//        }

			for(var i = 0; i < arr.length - 1; i++) {  
		        for(var j = i+1; j < arr.length; j++) {  
		          if(arr[i][differ] ==arr[j][differ]) {  
		            arr.splice(j, 1)  
		            j = j-1  
		          }  
		        }  
		      }  
		 
		 return arr;
	}
    return util;
})();