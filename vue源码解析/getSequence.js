/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2023-02-22 11:05:30
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2023-02-23 09:28:19
 * @FilePath: \vue源码解析\getSequence.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 5. unknown sequence
// [i ... e1 + 1]: a b [c d e] f g
// [i ... e2 + 1]: a b [e d c h] f g
// i = 2, e1 = 4, e2 = 5
let i = 0
const l2 = c2.length
let e1 = c1.length - 1 // prev ending index
let e2 = l2 - 1 // next ending index

const s1 = i // prev starting index
const s2 = i // next starting index

// 5.1 build key:index map for newChildren
const keyToNewIndexMap = new Map()
for (i = s2; i <= e2; i++) {
  const nextChild = c2[i]
  if (nextChild.key != null) {
    if (keyToNewIndexMap.has(nextChild.key)) {
      warn(
        `Duplicate keys found during update:`,
        JSON.stringify(nextChild.key),
        `Make sure keys are unique.`
      )
    }
    keyToNewIndexMap.set(nextChild.key, i)
  }
}
let j
let patched = 0
// [e d c h] f g的长度
const toBePatched = e2 - s2 + 1
let moved = false
// used to track whether any node has moved
let maxNewIndexSoFar = 0
// works as Map<newIndex, oldIndex>
// Note that oldIndex is offset by +1
// and oldIndex = 0 is a special value indicating the new node has
// no corresponding old node.
// used for determining longest stable subsequence
const newIndexToOldIndexMap = new Array(toBePatched)
for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

for (i = s1; i <= e1; i++) {
  const prevChild = c1[i]
  if (patched >= toBePatched) {
    // all new children have been patched so this can only be a removal
    console.log('卸载')
    continue
  }
  let newIndex
  if (prevChild.key != null) {
    newIndex = keyToNewIndexMap.get(prevChild.key)
  } else {
    // key-less node, try to locate a key-less node of the same type
    for (j = s2; j <= e2; j++) {
      if (
        newIndexToOldIndexMap[j - s2] === 0 &&
        isSameVNodeType(prevChild, c2[j])
      ) {
        newIndex = j
        break
      }
    }
  }
  if (newIndex === undefined) {
    console.log('newIndex =',newIndex)
  } else {
    newIndexToOldIndexMap[newIndex - s2] = i + 1
    if (newIndex >= maxNewIndexSoFar) {
      maxNewIndexSoFar = newIndex
    } else {
      moved = true
    }
    patched++
  }
}
const increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : []
  

function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}