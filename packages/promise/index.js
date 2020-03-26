

class IPromise {
    constructor(resolve) {
        this.value = null
        this.callbacks = []

        resolve(this.resolve.bind(this))
    }
    then(onFulfilled) {
        this.callbacks.push(onFulfilled);
        console.log(this.callbacks, 'callbacks then')
        return this
    }
    resolve(value) {
        setTimeout(()=>{
            this.callbacks.forEach(function (callback) {
                callback(value);
            })
        })
        console.log(this.callbacks, 'callbacks resolve')
    }

}

function invoking(arg, timeSpace=100) {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(arg)
            console.log('invoking start')
        }, timeSpace)
    })
}

// invoking('test').then(d=> {
//     console.log(d, 'invoking')
// })

function IPromise(resolve) {
    let state = 'pending'
    let value = null,
        callbacks = [];  //callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        if(state==='pending') {
            callbacks.push(onFulfilled);
        } else if (state==='fulfilled') {
            onFulfilled(value)
        }
        console.log(callbacks, 'callbacks then')
        return this
    };

    function _resolve(newValue) {
        value = newValue
        state = 'fulfilled'
        setTimeout(function() {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0)
        console.log(callbacks, 'callbacks _resolve')
    }
    resolve(_resolve)
    // console.log(resolve, _resolve, callbacks, 'callbacks')
}

let p = new IPromise(resolve=> {
    setTimeout(()=> {
        resolve('IPromise')
    },100)
})
    .then(d=> {
    console.log(d, 'd')
})
//     .then(d=> {
//     console.log(d, 'd111')
// })
// console.log(p, 'p')
console.log('end')
