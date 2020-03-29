
// 算法参考 https://juejin.im/post/5d341a89f265da1bac405369

let runCount = 0
let allCount = 0

function quickSort(arr) {
    if(arr.length<=1) {
        return arr
    }
    const midIndex = Math.floor(arr.length / 2)
    const midVal = arr.splice(midIndex, 1)[0]

    let left = []
    let right = []

    arr.forEach(item=> {
        if(item<midVal) {
            left.push(item)
        } else {
            right.push(item)
        }
    })

    return quickSort(left).concat([midVal], quickSort(right))
}

function swap(arr, indexA, indexB) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]
}

function bubbleSort1(arr) {
    let hasChange
    for(let i=0; i<arr.length-1;i++) {
        hasChange = false
        allCount++
        for(let j=0; j<arr.length-1-i; j++) {
            if(arr[j]> arr[j+1]) {
                swap(arr, j, j+1)
                hasChange = true
                runCount++
            }
        }
        if(!hasChange) {
            break
        }
    }
    return arr
}


// test
const arr = [9, 3, 4, 7, 5, 6, 8, 2, 1, 0]
//
// console.time('快排')
// console.log(quickSort(arr), 'quickSort')
// console.timeEnd('快排')

// console.log(bubbleSort1(arr), 'bubbleSort')
// console.log(allCount, runCount, 'allCount, runCount')

// runCount 8 allCount 32
function quickSort2(arr, i=0, j=arr.length-1) {
    if(i < j) {
        let left = i;
        let right = j;
        let pivot = arr[left];
        while(i < j) {
            while(arr[j] >= pivot && i < j) {  // 从后往前找比基准小的数
                j--;
                // runCount++
            }
            if(i < j) {
                arr[i++] = arr[j];
                runCount++
            }
            while(arr[i] <= pivot && i < j) {  // 从前往后找比基准大的数
                i++;
                // runCount++
            }
            if(i < j) {
                arr[j--] = arr[i];
                runCount++
            }
        }
        arr[i] = pivot;
        quickSort2(arr, left, i-1);
        quickSort2(arr, i+1, right);
        return arr;
    }
}
// runCount 10 all? 25
function quickSort3(arr, i = 0, j = arr.length-1) {
    if(i < j) {
        let left = i;
        let right = j;
        let mid = Math.floor((left+right)/2);
        let temp = arr[left];
        arr[left] = arr[mid];
        arr[mid] = temp;
        let pivot = arr[left];
        while(i < j) {
            while(arr[j] >= pivot && i < j) {  // 从后往前找比基准小的数
                j--;
                // runCount++
            }
            if(i < j) {
                // console.log(i, j, arr, 'i, j arr ++1')
                arr[i++] = arr[j];
                // console.log(i, j, arr, 'i, j arr ++2')
                runCount++
            }
            while(arr[i] <= pivot && i < j) {  // 从前往后找比基准大的数
                i++;
                // runCount++
            }
            if(i < j) {
                // console.log(i, j, arr, 'i, j arr --1')
                arr[j--] = arr[i];
                // console.log(i, j, arr, 'i, j arr --1')
                runCount++
            }
        }
        arr[i] = pivot;
        quickSort3(arr, left, i-1);
        quickSort3(arr, i+1, right);
        return arr;
    }
}

// runCount 32 allCount 45
function bubbleSort2(arr) {
    let i = arr.length - 1;

    while (i > 0) {
        let pos = 0;

        for (let j = 0; j < i; j++) {
            allCount++
            if (arr[j] > arr[j + 1]) {
                pos = j;
                // console.log(pos, i, j, arr, 'pos, i, j, arr')
                swap(arr, j, j + 1);
                // console.log(pos, i, j, arr, 'pos, i, j, arr swap')
                runCount++
            }
        }
        i = pos;
    }

    return arr;
}
