
/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}


/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

/**
 * isNull 非空检测
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                    		[true 为空，false为非空]
 */
const isNull = function (val){
    if(val==null||val.length<=0)
        return true;
    return false;
}

/**
 * 数字检测
 * @param     {[type]}                 val [description]
 * @return    {Boolean}                    [description]
 */
const isNumber = function (val){
    if(!isNull(val)&&(/^[0-9]*$/.test(val)||/^\-[1-9][0-9]*$/.test(val)))
        return true;
    return false;
}

/**
 * 整数检测
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isInteger = function (val){
    if(!isNull(val)&&(/^\+?[1-9][0-9]*$/.test(val)||/^\-[1-9][0-9]*$/.test(val)))
        return true;
    return false;
}

/**
 * 浮点数检测
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isFloat = function (val){
    if(!isNull(val)&&/^(-?\d+)(\.\d+)?$/.test(val))
        return true;
    return false;
}

/**
 * 货币格式检测
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isMoney = function (val){
    if(!isNull(val)&&(/^\d+.?\d{0,2}$/.test(val)))
        return true;
    return false;
}

/**
 * 电话号码格式检测 11位数字，以1开头
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isPhone = function (val){
    const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!isNull(val)&& /^((\+86)|(86))?(1)\d{10}$/.test(val))
        return true;
    return false;
}
/**
 * eamil格式检测
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isEmail = function (val){
    if(!isNull(val)&&/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val))
        return true;
    return false;
}

/**
 * 字符长度检测
 * @param     {[string]}                 lengthNum 	[要求长度]
 * @param     {[string]}                 val 		[检测值]
 * @return    {Boolean}                				[true 是，false否]
 */
const isLength = function (minlength,maxlength,val){
//		val=val+"";
    if(!isNull(val)&&val.length>=minlength&&val.length<=maxlength)
        return true;
    return false;
}


/**
 * 空格监测
 * @param     {[string]}                 val 		[检测值]
 * @return    {Boolean}                				[true 是，false否]
 */
const isSpace = function (val){
    var reg =/\s/;
    return reg.test(val);
}

const isCardNo = function (val) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(val);
}

const buildInType = {
    email: function email(value) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
    },
    mobile: function mobile(value) {
        return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value);
    },
    bank: function bank(value) {
        return /^([1-9]{1})(\d{14}|\d{18})$/.test(value);
    },
    idCard: function idCard(value) {
        return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value);
    }
};
