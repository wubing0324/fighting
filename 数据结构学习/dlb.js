function getElm(){
  let length = 0
  let head = null
  let Node = function(val){
    this.val = val
    this.next = null
  }
  
  this.append = function(val) {
    let node = new Node(val)
    let current
    if (head === null){
      head = node
    } else {
      current = head
      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    length++
  }

  this.insert = function(position, val){
    if (position >= 0 && position <= length) {
      let node = new Node(val)
      let index = 0
      let current = head
      let previous
      if (position === 0) {
        node.next = current
        head = node
      } else {
        while(index < position) {
          index++
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      this.head = head
      return true
    } else {
      return false
    }
  }

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head
      let privious
      let index= 0
      while(index++ < position) {
        privious = current
        current = current.next
      }
      privious.next = current.next
      length++
      return current
    } else {
      return null
    }
  }

  this.remove = function (val) {
    let index = this.indexOf(val)
    return this.removeAt(index)
  }

  this.indexof = function(val) {
    let index
    let current = head
    for (let i = 0;i < length; i++) {
      if (current.val === val) {
        index = i
        break
      }
      current = current.next
    }
    return index ? index : '不存在'
  }
  
  this.isEmpty = function () {
    return length === 0
  }

  this.size = function () {
      return length
  }

  this.getHead = function () {
      return head
  }
}
let list = new getElm()
list.insert(0, '第一个')
list.insert(1, '第二个')
list.append('最后一个')
console.log(list.head)
console.log(list.indexof('第二个'))
console.log(list.indexof('第o个'))
console.log(list.removeAt(1))
console.log(list.head)
