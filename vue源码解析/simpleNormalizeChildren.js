function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    console.log(children.length)
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

var arr = [1,2,[3],[4,[5,[6]]]]

console.log(simpleNormalizeChildren(arr))