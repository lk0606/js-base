const createStore = ()=> {
    const store = {}
    const offlineList = []
    const offlineDispatch = ()=> {
        const func = offlineList.shift()
        func()
    }
    const offlineSubscribe = (func)=> {
        offlineList.push(func)
        console.log('offlineList :>> ', offlineList);
        // return unSubscribe.bind(null, eventName)
    }

    // 订阅 即 存数据
    const subscribe = (eventName, func, store)=> {
        if(!store[eventName]) {
            store[eventName] = []
        }
        store[eventName].push(func)
        // return unSubscribe.bind(null, eventName)
    }
    // 取消订阅
    const unSubscribe = (eventName)=> {
        // TODO 优雅删除对象
        delete store[eventName]
    }
    // 发布 执行
    const dispatch = (eventName, val, store)=> {
        if(!Array.isArray(store[eventName])) {
            return
        }
        store[eventName].forEach(func => {
            func(val)
        });
    }
    return {
        subscribe: (eventName, func)=> {
            subscribe(eventName, func, store)
        },
        dispatch: (eventName, val)=> {
            dispatch(eventName, val, store)
        },
    }
}

// const store = createStore()

// store.dispatch('click', 'dispatch something1')
// const unSubscribe = store.subscribe('click', (val)=> {
//     console.log('subscribe :>> ', val);
// })
// // unSubscribe()
// store.dispatch('click', 'dispatch something2')


const Observer = (function Observer() {
    const _default = 'default'
    const Event = (function Event() {
        const namespaceCache = {}
        const each = (ary, fn) => {
            let ret
            for (let i = 0, len = ary.length; i < len; i += 1) {
                const n = ary[i]
                ret = fn.call(n, i, n)
            }
            return ret
        }
        const _listen = (key, fn, cache) => {
            if (!cache[key]) {
                cache[key] = []
            }
            cache[key].push(fn)
        }
        const _remove = (key, cache, fn) => {
            if (cache[key]) {
                if (fn) {
                    for (let i = cache[key].length; i >= 0; i -= 1) {
                        if (cache[key][i] === fn) {
                            cache[key].splice(i, 1)
                        }
                    }
                } else {
                    cache[key] = []
                }
            }
        }
        const _trigger = (...rest) => {
            const [cache, key, ...args] = rest
            const stack = cache[key]
            if (!stack || !stack.length) {
                return
            }
            return each(stack, (index, fn) => fn(...args))
        }
        const create = (namespace) => {
            namespace = namespace || _default
            const cache = {}
            let offlineStack = [] // 离线事件
            const ret = {
                listen(key, fn, last) {
                    _listen(key, fn, cache)
                    if (offlineStack === null) {
                        return
                    }
                    if (last === 'last') {
                        offlineStack.length && offlineStack.pop()()
                    } else {
                        each(offlineStack, (index, func) => {
                            func()
                        })
                    }
                    offlineStack = null
                },
                one(key, fn, last) {
                    _remove(key, cache)
                    this.listen(key, fn, last)
                },
                remove(key, fn) {
                    _remove(key, cache, fn)
                },
                trigger(...rest) {
                    rest.unshift(cache)
                    const fn = () => _trigger.apply(this, rest)
                    if (offlineStack) {
                        return offlineStack.push(fn)
                    }
                    return fn()
                },
            }
            const namespaceRet = namespaceCache[namespace]
                ? namespaceCache[namespace]
                : (namespaceCache[namespace] = ret)
            return namespace ? namespaceRet : ret
        }
        return {
            create,
            one(key, fn, last) {
                const event = this.create()
                event.one(key, fn, last)
            },
            remove(key, fn) {
                const event = this.create()
                event.remove(key, fn)
            },
            listen(key, fn, last) {
                const event = this.create()
                event.listen(key, fn, last)
            },
            trigger(...rest) {
                const event = this.create()
                event.trigger.apply(this, rest)
            },
        }
    })()
    return Event
})()
/** ************ 先发布后订阅 ******************* */
Observer.trigger('click', 1)
Observer.listen('click', (a) => {
    console.log(a) // 输出：1
})
/** ************ 使用命名空间 ******************* */
// Observer.create('namespace1').listen(
//     'click',
//     (a) => {
//         console.log(a) // 输出：1
//     },
//     'last',
// )
// Observer.create('namespace1').trigger('click', 1)

// Event.create('namespace2').listen('click', function (a) {
//     console.log(a); // 输出：2
// });
// Event.create('namespace2').trigger('click', 2);
