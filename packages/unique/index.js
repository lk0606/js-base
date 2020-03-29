


function unique1(arr) {
    let obj = {}
    arr.forEach(item=> {
        obj[item] = item
    })
    return Object.values(obj)
}

function unique2(arr) {
    let uniqueArr = []
    arr.forEach(item=> {
        if(!uniqueArr.includes(item)) {
            uniqueArr.push(item)
        }
    })
    return uniqueArr
}

function unique3() {

}

let arr = [1,1,2,3,4,5,4,5,4,6]

console.log(unique2(arr), 'unique')
