var idCardValid = {};

idCardValid.wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];// 加权因子
idCardValid.valideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X
idCardValid.idCity = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
	   		     	  21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
	   		     	  33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
	   		     	  42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
	   		     	  51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
	    	     	  63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
	  		         };//省份
  		        
//最终验证身份证号
idCardValid.idCardValidate = function(idCard,tips){ 
    idCard = idCardValid.trim(idCard.replace(/ /g, ""));      //去掉字符串头尾空格                     
    if (idCard.length == 18) {   
        var arr_idCard = idCard.split("");              // 得到身份证数组   
        //进行身份证的生日验证和第18位的验证
        if( idCardValid.checkProvince(idCard,tips) && idCardValid.isValidBrith(idCard,tips) && idCardValid.isValid18Code(arr_idCard,tips)){
            return true;   
        }else {   
            return false;   
        }   
    }else {
    	alert("身份证号码位数不对,请输入正确的身份证号码");
        return false;   
    }   
};
//验证省份
idCardValid.checkProvince = function(card,tips){  
    var province = card.substr(0,2);  
    if(idCardValid.idCity[province] == undefined){  
    	alert("身份证地区非法,请输入正确的身份证号码");
        return false
    }  
    return true;
};
/**  
 * 验证身份证号中的生日是否是有效生日  
 * @param idCard 身份证字符串  
 * @return  
 */  
idCardValid.isValidBrith = function(idCard,tips){
    var year =  idCard.substring(6,10);   
    var month = idCard.substring(10,12);   
    var day = idCard.substring(12,14);   
    var temp_date = new Date(year, parseFloat(month)-1, parseFloat(day));   
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if(temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month)-1 || temp_date.getDate() != parseFloat(day)){   
	    alert("身份证号码出生日期超出范围或含有非法字符,请输入正确的身份证号码");
        return false;
    }else{   
        return true;   
    }
};
/**  
 * 判断身份证号最后的验证位是否正确  
 * @param arr_idCard 身份证号码数组  
 * @return  
 */  
idCardValid.isValid18Code = function(arr_idCard,tips) {
    var sum = 0;                                 // 声明加权求和变量   
    if (arr_idCard[17].toLowerCase() == 'x') {   
        arr_idCard[17] = 10;                     // 将最后位为x的验证码替换为10方便后续操作   
    }   
    for ( var i = 0; i < 17; i++) {   
        sum += idCardValid.wi[i] * arr_idCard[i];       // 加权求和   
    }   
    valCodePosition = sum % 11;                  // 得到验证码所位置   
    if (arr_idCard[17] == idCardValid.valideCode[valCodePosition]) {
        return true;   
    } else {   
    	alert("身份证号码校验错误,请输入正确的身份证号码");
        return false;   
    }   
},
 //去掉字符串头尾空格   
idCardValid.trim = function(str) {   
    return str.replace(/(^\s*)|(\s*$)/g, "");   
}