
// 参考资料 https://juejin.im/post/5b6c4976f265da0f4f1669ac

function Stack() {
    this.space = []
}

Stack.prototype = {
    construct: Stack,
    // 入栈：后来居上
    push(val) {
        return this.space.push(val)
    },
    // 出栈：后进先出
    pop() {
        return this.space.pop()
    },
    // 清空栈
    clear() {
        this.space = []
    },
    // 栈顶
    readTop() {
        return this.space[this.space.length-1]
    },
    // 读取整栈
    read() {
        return this.space
    }
}


function reverse(arr) {
    const ArrayStack = new Stack()
    let len = arr.length-1
    while (len>=0) {
        ArrayStack.push(arr[len])
        len--
    }
    return ArrayStack.read()
}

// console.log(reverse([1,2,3]), 'reverse')
/**
 * @example 13 % 2 1011  再 reverse
 * @desc 十进制转换二进制
 * @param num
 */
function tenToTwo(num) {
    let temp = num
    if(num===0) {
        return num
    }
    const ArrayStack = new Stack()
    while (temp) {
        ArrayStack.push(temp%2)
        temp = parseInt(temp / 2, 10)
    }

    return reverse(ArrayStack.read()).join('')
}

console.log(tenToTwo(13), 'tenToTwo')
