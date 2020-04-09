let arr =[
    {type: "msgpub失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "23"},
    {type: "dal平均耗时上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "42"},
    {type: "service平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "13"},
    {type: "service平均耗时上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "40"},
    {type: "service失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "24"},
    {type: "service平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "12"},
    {type: "service平均耗时上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "25"},
    {type: "service失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "25"},
    {type: "service失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "11"},
    {type: "msgpub失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "19"},
    {type: "msgpub平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "12"},
    {type: "msgpub平均耗时上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "22"},
    {type: "msgpub失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "28"},
    {type: "sal平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "50"},
    {type: "sal平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "29"},
    {type: "sal平均耗时上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "11"},
    {type: "dal平均耗时上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "47"},
    {type: "dal失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "30"},
    {type: "dal平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "66"},
    {type: "dal失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "11"},
    {type: "dal平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "19"},
    {type: "dal平均耗时上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "85"},
    {type: "cal平均耗时上涨", Quesminute: "分钟环比", Quesday: undefined, Quesvalue: "16"},
    {type: "cal失败量上涨", Quesminute: undefined, Quesday: "日同比", Quesvalue: "400"}
]

    // [{ type: 'xxxx', Quesminute: "分钟环比",Quesday: "日同比",Quesvalueminute: "13",Quesvalueday:'40'}]

function f(data) {
    console.log(data, 'origin')
    let result = []
    data.forEach(item=> {

        const Quesvalue = item.Quesvalue
        delete item.Quesvalue

        item.Quesvalueminute = null
        item.Quesvalueday = null

        if(item.Quesminute && !item.Quesday) {
            item.Quesvalueminute = Quesvalue
        } else if(!item.Quesminute && item.Quesday) {
            item.Quesvalueday = Quesvalue
        }

        if(result.length===0) {
            result.push(item)
        } else{
            const commonIndex = result.findIndex(resultItem=> resultItem.type===item.type)
            if(commonIndex!==-1) {
                if(item.Quesminute && !item.Quesday) {
                    result[commonIndex].Quesvalueminute = Quesvalue
                    result[commonIndex].Quesminute = item.Quesminute
                } else if(!item.Quesminute && item.Quesday) {
                    result[commonIndex].Quesvalueday = Quesvalue
                    result[commonIndex].Quesday = item.Quesday
                }
            } else {
                result.push(item)
            }
        }
    })
    return result
}
// console.log(f(arr))

// ## 第四题 js 递归
// 实现 walk 函数，将树结构的数据转化为列表数据
const input = [
    {
        id: 1,
        text: 'text1',
        children: [
            {
                id: 2,
                text: 'text2',
                parentId: 1,
                children: [
                    {
                        id: 4,
                        text: 'text4',
                        parentId: 2
                    }
                ]
            },
            {
                id: 3,
                text: 'text3',
                parentId: 1
            }
        ]
    }
]

const output = [
    {id: 4, text: 'text4', parentId: 2},
    {id: 2, text: 'text2', parentId: 1},
    {id: 3, text: 'text3', parentId: 1},
    {id: 1, text: 'text1'},
]
let result = []
function walk(list) {
    if(list && Array.isArray(list)) {
        for(let item of list) {
            if(item.children && Array.isArray(item.children)){

                walk(item.children)
                let itemResult = JSON.parse(JSON.stringify(item))
                delete itemResult.children
                result.push(itemResult)
            } else {
                result.push(item)
            }
        }
    }
    return result
}

// console.log(walk(input))

function customFlat(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.customFlat(val)) : acc.concat(val), [])
}
function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
}
const t = [1,2,[3,4]]
// console.log(t.flat())
