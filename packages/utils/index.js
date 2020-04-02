
import { format } from './tools'

/**
 * @return {null || string}
 */
export function GetQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null
}

/**
 * @example http://localhost:8088/#/my-claim?type=apply&appId=518001&insuredIndex=0
 * @desc
 * @param name appId
 * @param type 获取类型 all-'appId=518001' val- '518001'
 * @return {*}
 */
export function getUrlParam(name, type = 'val') {
    if(!['val', 'all'].includes(type)) {
        throw new Error(`param type: ${type} is not valid, try one of ['val', 'all']`)
    }
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.href.match(reg);
    if (r) {
        if(type === 'val') {
            return unescape(r[2])
        } else {
            return unescape(r[0]).slice(1)
        }
    }
    return null
}

// 获取 url 参数
export function getAllUrlParams(url) {
    const href = decodeURIComponent(url), obj = {};
    const search = href.split("?")[1];
    if (search) {
        const arr = search.split("&");
        arr.forEach((item) => {
            if (item.indexOf("=") > -1) {
                const temp = item.split("=");
                obj[temp[0]] = temp[1];
            } else {
                obj[item] = "";
            }
        })
    }
    return obj;
}

/**
 * @example 获取时间差 一小时内就是x分钟前（1分钟前）、一天内就是x小时前（x小时前）、昨天以后的就是具体年月日（2020-01-01）
 * @param time { string || number } 时间戳或字符串
 * @returns {object}
 */
export function getTimeDiff(time) {
    // debugger
    if(typeof time === 'string') {
        time = +new Date(time)
    }
    const now = +new Date()
    const h = 1000 * 60 * 60
    const d = 24 * h

    const difference = now - time

    const value = difference / 1000 // second

    // 一小时内就是x分钟前（1分钟前）
    if(difference < h && difference > 0) {
        const num = Math.floor(value / 60)
        return {
            difference,
            value: num,
            unit: 'minute',
            label: `${num}分钟前`
        }
    }
    // 一天内就是x小时前（x小时前）
    else if(difference >= h && difference < d) {
        const num = Math.floor(value / 60 / 60)
        return {
            difference,
            value: num,
            unit: 'hour',
            label: `${num}小时前`
        }
    }
    // 昨天以后的就是具体年月日（2020-01-01）
    else if (difference >= d) {
        const num = Math.floor(value / 60 / 60 / 24)
        return {
            difference,
            value: Math.floor(value / 60 / 60 / 24),
            unit: 'day',
            label: format(time)
        }
    }
}

// console.log(getTimeDiff(+new Date() - 1000 * 60), 'getTimeDiff') // 1分钟前
// console.log(getTimeDiff('2020-4-1 17:00:00'), 'getTimeDiff') // xx小时前
