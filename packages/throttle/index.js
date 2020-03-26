
/**
 * @desc 节流：函数在一定时间内，只能执行一次，如触发多次，只有一次生效
 * @param fn
 * @param wait
 */
export function throttleTag(fn, wait = 300) {
    let canRun = true
    return function() {
        if(!canRun) return
        canRun = false
        setTimeout(()=> {
            // fn.apply(this, arguments)
            fn()
            canRun = true
        }, wait)
    }
}

export function throttleGapTime(fn, gapTime) {
    let last = null

    return function () {
        let now = + new Date()
        if(now - last >= gapTime ||  !last) {
            fn()
            last = now
        }
    }
}


// 测试用例
export function test(str) {
    console.log(str)
}
let str = '节流中'

// window.addEventListener('mousemove', throttleTag(test.bind(null, str+ ': setTimeout'), 1000))
window.addEventListener('mousemove', throttleGapTime(test.bind(null, str+ ': 时间戳'), 1000))
