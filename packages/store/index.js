const createStore = ()=> {
    const store = {}
    let offlineList = []
    // 订阅 即 存数据
    const subscribe = (eventName, func)=> {
        if(!store[eventName]) {
            store[eventName] = []
        }
        store[eventName].push(func)
        return unSubscribe.bind(null, eventName)
    }
    // 取消订阅
    const unSubscribe = (eventName)=> {
        Reflect.deleteProperty(store, eventName)
    }
    // 发布 执行
    const dispatch = (eventName, val)=> {
        if(!Array.isArray(store[eventName])) {
            return
        }
        store[eventName].forEach(func => {
            func(val)
        });
    }
    return {
        subscribe: (eventName, val)=> {
            const unSubscribe = subscribe(eventName, val)
            if(offlineList.length > 0) {
                offlineList.forEach(func=> {
                    func()
                })
            }
            offlineList = []
            return unSubscribe
        },
        dispatch(eventName, val) {
            dispatch(eventName, val)
            const fn = dispatch.bind(this, eventName, val)
            offlineList.push(fn)
        },
    }
}

const store = createStore()

store.dispatch('click', 'dispatch something1')
const unSubscribe = store.subscribe('click', (val)=> {
    console.log('subscribe :>> ', val);
})
unSubscribe()
store.dispatch('click', 'dispatch something2')
