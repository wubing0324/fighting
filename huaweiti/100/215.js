class Heap {
  constructor() {
    this.data = []
  }
  left(index) {
    return 2 * index + 1
  }
  right(index) {
    return 2 * index + 2
  }
  parent(index) {
    return (index - 1) >> 1
  }
  size() {
    return this.data.length
  }
  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]]
  }
  heapify(index) {
    while (index > 0) {
      let parent = this.parent(index)
      if (this.data[parent] > this.data[index]) {
        this.swap(index, parent)
        index = parent
      } else {
        break
      }
    }
  }
  heapifyDwon(index) {
    let lastIndex = this.size() - 1
    while (true) {
      let left = this.left(index)
      let right = this.right(index)
      let ma = index
      if (left <= lastIndex && this.data[ma] > this.data[left]) {
        ma = left
      }
      if (right <= lastIndex && this.data[ma] > this.data[right]) {
        ma = right
      }
      if (ma == index) break
      this.swap(index, ma)
      index = ma
    }
  }
  poll() {
    let size = this.size()
    if (size === 0) return null
    let last = this.data.pop()
    let top = this.data[0]
    if (this.size() > 0) { // 判断非空才设置新堆顶
      this.data[0] = last
      this.bubleDown(0)
    }
    return top
  }

  offer(val) {
    this.data.push(val)
    let index = this.size() - 1
    this.bubleUp(index)
  }
}