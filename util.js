/**
 * Created by jessic on 2016/10/20.
 */
window.util=(function(){
    var util={};
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
    return util;
})();