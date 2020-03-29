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
