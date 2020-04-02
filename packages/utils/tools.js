//获取周岁：参数string '2019-11-12'，返回值string 30
export function getAge(strBirthday) {
    if (!strBirthday) {
        return null
    }
    let birthday=new Date(typeof(strBirthday)=='string'?strBirthday.replace(/-/g, "\/"):strBirthday);
    let d=new Date();
    return d.getFullYear()-birthday.getFullYear()-((d.getMonth()<birthday.getMonth()|| d.getMonth()===birthday.getMonth() && d.getDate()<birthday.getDate())?1:0);
}

export function getBirthdayFromIdCard(idCard) {
    if (typeof idCard==='number') {
        idCard = idCard.toString()
    }
    let birthday = "";
    if (idCard != null && idCard !== "") {
        if (idCard.length === 15) {
            birthday = "19" + idCard.substr(6, 6);

        } else if (idCard.length === 18) {
            birthday = idCard.substr(6, 8);
        }

        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }

    return birthday;
}


/**
 * 格式化时间
 * @param   fmt        [支持参数 yyyy-MM-dd hh:mm:ss，yyyy-MM-d h:m:s, yyyy.MM.d h:m:s]
 * @param   timestamp  [description]
 * var time1 = Format("yyyy-MM-dd");
 * var time2 = Format("yyyy-MM-dd HH:mm:ss");
 */
export const format = function (timestamp, fmt = 'yyyy-MM-dd') {
    let date;
    if(timestamp!=null)
        timestamp = parseInt(timestamp)
    date = new Date(timestamp);
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 格式化时间，毫秒数转为**天**小时**分钟**秒
 * @param     {[type]}                 msd [毫秒]
 */
const MillisecondToDate = function(msd) {
    let Millisecond =msd/1000;
    let output = ''
    if (null != Millisecond && "" != Millisecond) {
        if (Millisecond >60 && Millisecond < 60 * 60) {
            output = decode(msd).minutes + "分钟" + decode(msd).seconds + "秒";
        }
        else if (Millisecond >= 60 * 60 && Millisecond < 60 * 60 * 24) {
            output = decode(msd).hours + "小时" +
                decode(msd).minutes + "分钟" +
                decode(msd).seconds + "秒";
        }
        else if(Millisecond >= 60 * 60 * 24){
            output = decode(msd).day + "天" +
                decode(msd).hours + "小时" +
                decode(msd).minutes + "分钟" +
                decode(msd).seconds+ "秒";
        }
        else {
            output = decode(msd).seconds + "秒";
        }
    }
    return output
}

/**
 * 取时间差值，date2-date1返回毫秒数
 * @param     {[type]}                 date1 [description]
 * @param     {[type]}                 date2 [description]
 */
const timestampDiff=function(date1,date2){
    let timestamp1 = new Date(date1.replace(/-/g,'/')).getTime();
    let timestamp2 = new Date(date2.replace(/-/g,'/')).getTime();
    return timestamp2-timestamp1;
}

/**
 * 时间转天数、小时数、分钟数、秒数
 * 返回对象 obj.day、obj.hours、obj.minutes、obj.seconds
 * @param     {[type]}                 fmt [description]
 */
const decode=function(timestamp){
    let days=Math.floor(timestamp/(24*3600*1000));
    let leave1=timestamp%(24*3600*1000)
    let hours=Math.floor(leave1/(3600*1000))
    let leave2=leave1%(3600*1000)
    let minutes=Math.floor(leave2/(60*1000))
    let leave3=leave2%(60*1000)
    let seconds=Math.round(leave3/1000)
    let o={
        "day":days,
        "hours":hours,
        "minutes":minutes,
        "seconds":seconds
    }
    return o;
};
const getDaysInOneMonth = function(year, month){
    month = parseInt(month, 10);
    let d= new Date(year, month, 0);
    return d.getDate();
};

export function deepClone(obj) {
    var copy;

    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
