const treeData = {
  name: 1,
  children: [
    {
      name: 2,
      children: [
        {
          name: 4,
          children: [{
            name: 7,
            children: []
          }],
        }, {
          name: 5,
          children: [],
        },
      ]
    },
    {
      name: 3,
      children: [
        {
          name: 6,
          children: [],
        },
      ],
    },
  ],
}

function toArray(root, parent) {
  if (!root) return
  let arr = []
  const fla = (root, parent) => {
    let tmp = {}
    tmp.parent = parent
    Object.keys(root).forEach(key => {
      if (key !== 'children') {
        tmp[key] = root[key]
      }
    })
    arr.push(tmp)
    if (!root.children || root.children.length == 0) {
      return
    }
    root.children.forEach((child) => {
      fla(child, root.name)
    })
  }
  fla(root, parent)
  return arr
}

let a = toArray(treeData, null)

console.log(a)