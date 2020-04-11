// 阿里云产品线十分丰富，拥有ECS、RDS等数百款产品，每个产品都具有一些通用属性，例如：ID（id），地域（region），名称（name），同时每个产品又包含自己特有的属性。 ECS拥有实例（instance）属性，可选值有ecs.t1.small、ecs.t3.small、ecs.t1.large RDS拥有数据库类型（dbType）属性，可选值有mysql、mssql、PPAS 请使用你的面向对象知识，基于ES6语法编写ECS、RDS两个类，并实现如下方法： 1. config() 返回一个字面量对象，可以拿到所有的成员变量。 2. buy() 返回一个URL，格式为 https://www.aliyun.com/buy?id=xxx&region=xxx&name=xxx&每个产品自己特有的成员变量


const props = {
    id: 1,
    region: 100000,
    name: 'tpl'
}

const url = 'https://www.aliyun.com/buy'

class Product {
    constructor() {
        const {id, region, name} = props
        this.id = id
        this.region = region
        this.name = name
    }
}

class ECS extends Product{
    constructor(props) {
        super(props)
        this.t1 = {
            small: true,
            large: true
        }
        this.t3 = {
            small: true
        }
    }
}
class RDS extends Product{
    constructor(props) {
        super(props)

        const dbEnum = ['mysql', 'mssql', 'PPAS']
        if(props.dbType && dbEnum.includes(props.dbType)) {
            this.dbType = props.dbType
        }
    }
}
// const ecs = new ECS()
// console.log(ecs, ecs.name, 'ecs')

function config(C, props) {
    return new C(props)
}

function buy(url, obj) {
    let str = ''
    Object.keys(obj).forEach(item=> {
        str+= `${item}=${obj[item]}&`
    })
    if(str) {
        if(url.indexOf('?')) {
            str = '&' + str
        } else {
            str = '?' + str
        }
    }
    return url + str
}

// 假设有一个接口，通过单个的用户id可以获取用户名，现在有10个用户id（请随机生成10个0 ~ 100之间的数据模拟用户id），请实现一个用来获取这10个用户id对应的用户名的方法。 补充：假设接口url是 “https://example.com/api/getNickname.json”，参数名是uid 要求：请求并发数不超过两个（请注意并发数！！）

const api = 'https://example.com/api/getNickname.json'

function http(url, uid) {
    url = `?uid=${uid}`
    return new Promise((resolve, reject)=> {
        fetch(url).then(res=> res.json()).then(res=> {
            resolve(res.data)
        }).catch(err=> {
            reject(err)
        })
    })
}

// function getId() {
//     let arr = []
//     for(let i = 0; i<10; i++) {
//         arr.push(Math.ceil(Math.random() * 100))
//     }
//     return arr
// }

let count = 0
async function getNickname() {
    if(count>4) {
        return
    }
    let arr = []
    for(let i = 0; i<2; i++) {
        const uid = Math.ceil(Math.random() * 100)
        arr.push(http(api, uid))
    }
    count++
    Promise.all(arr).then(async res=> {
        await getNickname()
    }).catch(async err=> {
        await getNickname()
    })
}
