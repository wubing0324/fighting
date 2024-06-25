var obj = {
  id: 0,
  name: "部门a",
  parentId: -1,
  children: [
    {
      id: 1,
      name: "部门a",
      parentId: 0,
      children: [
        {
          id: 3,
          name: "部门c",
          parentId: 1,
          children: []
        },
        {
          id: 4,
          name: "部门d",
          parentId: 1,
          children: [
            {
              id: 5,
              name: "部门e",
              parentId: 4,
              children: []
            }
          ]
        },
      ]
    },
    {
      id: 2,
      name: "部门b",
      parentId: 0,
      children: []
    }
  ]
}

var map2 = {}
function flats(obj) {
  var len = obj.children.length
  if(len > 0) {
    for (var i = 0; i < len; i++) {
      flats(obj.children[i])
    }
  }
  map2[obj.id] = obj
  return map2
}
var map = flats(obj)

function search(id) {
  var arr = []
  while(map[id] && map[id].parentId > -1) {
    id = map[id].parentId
    arr.push(id)
  }
  return arr
}
console.log(search(5))