

// 8,9
function add(a, b) {
    a = a.toString()
    b = b.toString()

    let i = a.length - 1
    let j = b.length - 1

    let carry = 0 // 进位
    let result = '' // 结果

    while(i>=0 || j>=0) {
        let x = 0 // a对应数位值
        let y = 0
        let sum

        // 对应数位转num
        if(i>=0) {
            x = a[i] - 0
            i--
        }
        if(j>=0) {
            y = b[j] - 0
            j--
        }

        sum = x + y + carry
        if(sum >= 10) {
            carry = 1
            sum-=10
        } else {
            carry = 0
        }
        result = result + sum
    }

    if(carry) {
        result = carry + result
    }

    return result
}

console.log(add(9999,1), 'add')
