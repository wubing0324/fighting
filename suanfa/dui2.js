let len

// 整体思路：根据大顶堆的特性，根节点是最大的，所以每次找到最大的然后排除他（len--），继续找最大的
function getHeap(arr) {
    len = arr.length
    for (var i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i)
    }
}

function heapify(arr, i) {
    var left = 2 * i + 1
    var right = 2 * i + 2
    var largest = i
    if (left < len && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest != i) {
        swap(arr, largest, i)
        heapify(arr, largest)
    }
}
function swap(arr, largest, i) {
    let temp = arr[largest]
    arr[largest] = arr[i]
    arr[i] = temp
}

function heapSort(arr) {
    getHeap(arr)
    for (var i = len - 1; i > 0; i--) {
        len--
        swap(arr, 0, i)
        heapify(arr, 0)
    }
}
var arr = [0,2,1,3,5,4]
heapSort(arr)
console.log(arr)
