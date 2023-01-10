
/**
 * @description Object.create 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）
 * 1. 创建一个函数 Func
 * 2. 将传入prototype指向 Func
 * 3. 使用 new Func创建新对象o
 * 4. 如果有可枚举属性，则Object.defineProperties定义可枚举实现
 * 5. 返回新对象o
 * @param {object} prototype
 * @param {object} propertiesObject
 * @returns {object}
 */
function _create(prototype, propertiesObject) {
    if (typeof prototype !== 'object') {
        throw new TypeError('Object prototype may only be an Object: ' + prototype);
    } else if (prototype === null) {
        throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    }
    function F() {}
    F.prototype = prototype;
    let o = new F()
    if(propertiesObject) Object.defineProperties(o, propertiesObject)
    return o
}
Object._create = _create

/**
 * @desc call 改变this指向，带参执行
 * 1. 从参数值取出构造函数和参数
 * 2. 将call和构造函数建立关系（因为this为就近原则，指向调用方）
 * 3. 使用构造函数下的函数执行参数
 * 4. 删除函数
 * 5. 返回结果
 * @param  {...any} rest
 * @returns {object}
 */
function _call(...rest) {
    let [Con, ...args] = rest
    if(!Con) {
        Con = typeof window === 'undefined' ? global : window
    }
    // console.log(Con, ...args, 'Con, ...args')
    Con.fn = this
    const result = Con.fn(...args)
    delete Con.fn
    return result
}

function _apply(...rest) {
    const [thisArg, ...args] = rest
    let result
    if(!thisArg) {
        thisArg = typeof window === 'undefined' ? global : window
    }
    thisArg.fn = this
    if(!args) {
        result = thisArg.fn()
    } else {
        result = thisArg.fn(...args)
    }
    delete thisArg.fn
    return result
}
Function.prototype._call = _call
Function.prototype._apply = _apply

function test(...rest) {
    return `${this.a} ${rest}`
}
console.log('test._call({a:1}, 2, 1) :>> ', test._call({a: '_call:'}, 2, 1));
console.log('test._apply({a:1}, [2, 1]) :>> ', test._apply({a: '_apply:'}, [2, 1]));

// es5 类的继承
function Human() {
	this.name = "Human"
	Human.prototype.hi = function() {
      	return 'hi Human'
	}
}

function Student() {
	this.name = 'Student'
  	let p = Object._create(Human.prototype)
  	// console.log(p, 'p')
  	Human.prototype = p
    Object.setPrototypeOf(Student.prototype, Human.prototype)
    // Student.prototype.__proto__ = Human.prototype.__proto__ // 与上恒等
}
function eat(params) {
    return this.name + 'is eating'
}
Human.prototype.eat = eat

let h = new Human()
let s = new Student()
// console.log(h, s)
