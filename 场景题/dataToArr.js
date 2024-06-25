/*
 * Author       : OBKoro1
 * Date         : 2021-10-27 22:20:12
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-04 16:08:23
 * FilePath     : /js-base/src/scene/dataToTree.js
 * description  : 数组转tree结构的数据
 * 这道题数据类型有很多变种 各个公司都喜欢出
 * koroFileheader VSCode插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
 */

// 源数据
const list = [
    {
      id: 19,
      parentId: 0,
    },
    {
      id: 18,
      parentId: 16,
    },
    {
      id: 17,
      parentId: 16,
    },
    {
      id: 16,
      parentId: 0,
    },
    {
        id: 20,
        parentId: -1
    }
]
  
// 转换后的数据结构

const tree = {
    id: 0,
    children: [
      {
        id: 19,
        parentId: 0,
      },
      {
        id: 16,
        parentId: 0,
        children: [
  
          {
            id: 18,
            parentId: 16,
          },
          {
            id: 17,
            parentId: 16,
          },
        ],
      },
    ],
}

const dataToTree = (source) => {
    let src = {}
    let tree = {}
    for (let i = 0; i < source.length; i++) {
        let id = source[i].id
        src[id] = source[i]
    }

    console.log(tree)
    Object.keys(src).forEach(id => {
        let parentId = src[id].parentId
        if (src[parentId]) {
            src[parentId].children ? src[parentId].children.push(src[id]) : src[parentId].children = [src[id]]
        } else {
            if (tree[parentId]) {
                tree[parentId].children.push(src[id])
            } else {
                tree[parentId] = {
                    id: parentId,
                    children: [src[id]],
                    parent: null
                }
            }
        }
    })
    console.log(JSON.stringify(tree, null, 4))
    
}
dataToTree(list)