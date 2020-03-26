

export function getDataType(data) {
    const typeStr = Object.prototype.toString.call(data)
    const start = typeStr.indexOf(' ')
    const end = typeStr.indexOf(']')
    if(start!==-1 && end!==-1) {
        return typeStr.slice(start, end).toLowerCase()
    }
}



// 测试用例
const test = ()=> ({})
class Dog {
    constructor() {

    }
    static bark() {
        return '汪汪汪'
    }
}
console.log(getDataType(test), 'getDataType') // function
console.log(getDataType(Dog), 'getDataType') // function
console.log(getDataType(new Map()), 'getDataType') // map
console.log(getDataType(new Set()), 'getDataType') // map
