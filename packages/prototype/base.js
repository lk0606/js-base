
/**
 * 在 call 方法中获取调用 call()函数
 * 如果第一个参数没有传入，那么默认指向 window/global(非严格模式)
 * 传入 call 的第一个参数是 this 指向的对象，根据隐式绑定的规则，我们知道 obj.foo(), foo() 中的 this 指向 obj;因此我们可以这样调用函数 thisArgs.func(...args)
 * 返回执行结果
 */
function _call() {
    // console.log(arguments);
    let [thisArg, ...args] = [...arguments]
    if(!thisArg) {
        thisArg = typeof window === 'undefined' ? global : window
    }
    console.log(thisArg, ...args, 'thisArg, ...args')
    thisArg.fn = this
    let result = thisArg.fn(...args)
    delete thisArg.fn
    return result
}

function _apply(thisArg, rest) {
    let result
    if(!thisArg) {
        thisArg = typeof window === 'undefined' ? global : window
    }
    console.log(thisArg, rest, 'thisArg, rest')
    thisArg.fn = this
    if(!rest) {
        result = thisArg.fn()
    } else {
        result = thisArg.fn(...rest)
    }
    delete thisArg.fn
    return result
}

/**
 * @param Constructor 构造函数，必传
 * new 的实现原理
 * 1.创建一个空对象，作为将要返回的对象实例。
 * 2.将这个空对象的原型，指向构造函数的prototype属性。
 * 3.将这个空对象赋值给函数内部的this关键字。
 * 4.开始执行构造函数内部的代码
 */
function _new1(Constructor) {
    // 将 arguments 对象转为数组
    // let args = [].slice.call(arguments);
    let args = [...arguments];
    // 取出构造函数
    let constructor = args.shift();
    if(!constructor.prototype || !constructor.constructor) {
        throw new Error('_new(Constructor): param Constructor is required and must be newed')
    }
    // 创建一个空对象，继承构造函数的 prototype 属性
    let context = Object.create(constructor.prototype);
    // console.log(constructor, context, 'context');

    // 执行构造函数
    let result = constructor.apply(context, args);
    // 如果返回结果是对象，就直接返回，否则返回 context 对象
    return (typeof result === 'object' && result != null) ? result : context;
}
/**
 * 不太对
 * 1.创建一个空对象，构造函数中的this指向这个空对象
 * 2.这个新对象被执行 [[原型]] 连接执行构造函数方法，属性和方法被添加到this引用的对象中，如果构造函数中没有返回其它对象，那么返回this，即创建的这个的新对象，否则，返回构造函数中返回的对象。
 */
export function _new2() {
    let target = {}
    let result
    let [thisArg, ...args] = [...arguments]
    console.log();

    // console.log(constructor, ...args, 'constructor, ...args')
    target._proto_ = thisArg.prototype
    result = thisArg.apply(target, args)
    if(result && (typeof result === 'object' && result!==null) || typeof result === 'function' ) {
        return result
    }
    return target
}


Function.prototype._call = _call
Function.prototype._apply = _apply

function test(a) {
    return this.a
}
// console.log(test._call({a:1}, 2, 1))
// console.log(test._apply({a:1}, [2, 1]))
function Hunman() {
    this.name = 'Hunman'
}
function eat(params) {
    return this.name + 'is eating'
}
Hunman.prototype.eat = eat

console.log(_new1(Hunman), new Hunman())
// console.log(_new1(), new Object())
