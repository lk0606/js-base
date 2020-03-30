
// 资料参考 https://www.cnblogs.com/163yun/p/9505378.html

// class IPromise {
//     constructor(resolve) {
//         this.value = null
//         this.callbacks = []
//
//         resolve(this.resolve.bind(this))
//     }
//     then(onFulfilled) {
//         this.callbacks.push(onFulfilled);
//         console.log(this.callbacks, 'callbacks then')
//         return this
//     }
//     resolve(value) {
//         setTimeout(()=>{
//             this.callbacks.forEach(function (callback) {
//                 callback(value);
//             })
//         })
//         console.log(this.callbacks, 'callbacks resolve')
//     }
//
// }

function IPromise(resolve) {
    let state = 'pending'
    let value = null,
        callbacks = [];  //callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        console.log(onFulfilled, 'onFulfilled then')
        return new IPromise(resolve=> {
            handle({
                onFulfilled: onFulfilled || null,
                resolve,
            })
        })
    }

    function handle(callback) {
        if(state==='pending') {
            callbacks.push(callback)
            return
        }
        if (!callback.onFulfilled) {
            callback.resolve(value)
            return
        }
        const result = callback.onFulfilled(value)
        callback.resolve(result)
    }

    function _resolve(newValue) {
        // console.log(newValue, 'newValue')
        if(newValue && (typeof newValue==='object' || typeof newValue==='function')) {
            const then = newValue.then
            if(typeof newValue.then === 'function') {
                then.call(newValue, resolve)
                return
            }
        }
        value = newValue
        state = 'fulfilled'
        setTimeout(function() {
            callbacks.forEach(function (callback) {
                // callback(value);
                handle(callback)
            });
        }, 0)
        // console.log(callbacks, 'callbacks _resolve')
    }
    resolve(_resolve)
    // console.log(resolve, _resolve, callbacks, 'callbacks')
}

let p = new Promise(resolve=> {
    setTimeout(()=> {
        resolve('IPromise1')
    },100)
})
    .then(d=> {
        console.log(d, 'then1')
        return new Promise(res=> {
            setTimeout(()=> {
                res('IPromise2')
            },100)
        })
})
    .then(d=> {
        console.log(d, 'then2')
})
console.log('end')
