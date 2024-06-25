var myRoutes = [
  {
    path: '/',
    name: 'parent0',
    component: {name: 'cpm0'},
    children: [
      {
        path: '0child1',
        name: '0-chiid-1',
        component: {name: '0cpm1'}
      },
      {
        path: '0child2',
        name: '0-chiid-2',
        component: {name: '0cpm2'},
        children: [
          {
            path: '0child2-1',
            name: '0-chiid2-1',
            component: {name: '0cpm2-1'}
          },
        ]
      },
    ]
  },
  {
    path: '/parent1',
    name: 'parent1',
    component: {name: 'cpm1'},
    children: [
      {
        path: '1child1',
        name: '1-chiid-1',
        component: {name: '1cpm1'}
      },
      {
        path: '1child2',
        name: '1-chiid-3',
        component: {name: '1cpm3'}
      },
    ]
  },
]

function match(routes) {
  let pathList = [];
  let pathMap = {}
  const addRecord = (route, parent) => {
    let path = parent ? `${parent.path}/${route.path}` : route.path
    let record = {
      path: path,
      name: route.name,
      parent: parent || null,
      component: route.component
    }
    if (!pathMap[path]) {
      pathList.push(path)
      pathMap[path] = record
    }
    if (route.children) {
      route.children.forEach(child => {
        addRecord(child, route)
      })
    }
  }
  routes.forEach(route => {
    addRecord(route)
  })

  return {pathList, pathMap}
}
console.log(match(myRoutes))
// function match(routes) {
//   let pathList = [];
//   let pathMap = {}
//   routes.forEach(route => {
//     addRecord(route, pathList, pathMap)
//   });
//   function addRecord(route, pathList, pathMap, parent) {
//     let path = parent ? `${parent.path}/${route.path}` : route.path
//     let record = {
//       path: path,
//       name: route.name,
//       component: route.component
//     }
//     if (!pathMap[path]) {
//       pathList.push(path)
//       pathMap[path] = record
//     }
//     if (route.children) {
//       route.children.forEach(child => {
//         addRecord(child, pathList, pathMap, route)
//       });
//     }
//   }
//   return {pathList, pathMap}
// }
// console.log(match(myRoutes))

监听url变化，触发组件的重新渲染，通过url获取到当前需要渲染哪些组件，通过dfs生成url和组件的对应关系，