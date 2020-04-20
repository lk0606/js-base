
import './base'
import './class'


/**
 * @desc学习资料
 * @example https://www.jianshu.com/p/7d58f8f45557 _proto_ 与 prototype
 * @example https://www.cnblogs.com/rencoo/p/11879150.html [ES6]ES6语法中的class、extends与super的原理
 */

function Animal(props) {
    this.name = props.name || 'Unnamed'
    function eat() {
        console.log('Animal eat')
    }
}

Animal.prototype.hello = function () {
    console.log('Animal hello')
}

let a = new Animal({name: 'Animal'})

function Dog(props) {
    Animal.call(this, props)
}

// Dog.prototype = new Animal({name: 'wang cai'})
Dog.prototype.bark = function () {
    console.log('wang wang wang')
}
const d = new Dog({name: 'wang cai'})

class Human {
    constructor(props) {
        this.name = props.name
        this.data = {
            name: 'Human'
        }
    }
    sayHi() {
        console.log(`hi, ${this.name}`)
    }

    initData() {
        return {
            name: 'Human'
        }
    }
}

class Teacher extends Human {
    constructor(props) {
        super(props)
    }
    teach() {
        console.log(`Teacher has skill is teaching`)
    }
}
const h = new Human({name: 'Human'})
const t = new Teacher({name: 'wang'})
// console.log(a.constructor, 'a')
// console.log(d.constructor, 'd')
// console.log(h, 'h')
// console.log(t, 't')
// t.teach()
// t.sayHi() // Teacher 实例属性 _proto_ 上并不会有 sayHi ，但是他会通过 _proto_ 向上一层一层去找

// 以下  vue中为什么组件内data必须为函数 答案
function getData(param) {
    let data = typeof param === 'function' ? param() : param
    return data
}

let obj = {
    a: 1
}
function initData() {
    return {
        a: 1
    }
}
// console.log(getData(obj) === getData(obj), 'getData')
// console.log(getData(initData) === getData(initData), 'getData fn')
