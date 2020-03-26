/**
 * @desc 防抖：函数一定时间后，执行回调，如果一定时间内多次触发，则以最后一次为准，重新计时
 * @param fn
 * @param wait
 */
export function debounce(fn, wait) {
    let timer = null
    return function() {
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(()=> {
            fn.call(this, ...arguments)
            // fn()
        }, wait)
    }
}


// 测试用例
export function test(str) {
    console.log('防抖中：' + str)
}
// const t = debounce(test( 'setTimeout'), 1000)
window.addEventListener('mousemove', debounce(test.bind(null, 'setTimeout'), 1000))
