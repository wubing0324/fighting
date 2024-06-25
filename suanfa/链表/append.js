function Node(next, value) {
  this.next = next
  this.value = value
}

var head = new Node(null, 'head')
var node1 = new Node(head, 1)
var node2 = new Node(node1, 2)
console.log(node2)

