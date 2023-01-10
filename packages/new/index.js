
/**
 * new Function() => _new(Function, args)
 * 1. 从类中取出构造函数和参数
 * 2. 创建新的对象 创建对象有两种方式 new Object or Object.create(Constructor.prototype)
 * 3. 将构造函数的prototype指向对象的__proto__
 * 4. 使用构造函数，绑定新创建的对象，并执行参数
 * 5. 返回结果
 * @param  {...any} rest
 * @returns {object}
 */
const _new = (...rest)=> {
    const [Constructor, ...args] = rest
    // const obj = new Object()
    // obj.__proto__ = Constructor.prototype
    const obj = Object.create(Constructor.prototype)
    const result = Constructor.apply(obj, args)
    return typeof result === 'object' ? result : obj
}

function Person( name ){
	this.name = name;
};
Person.prototype.getName = function(){
	return this.name;
};
const p = _new(Person, '_new')
console.log('p :>> ', p);
