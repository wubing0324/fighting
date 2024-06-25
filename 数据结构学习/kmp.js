function getPmt(str = '') {
  if (str.length === 0) return []
  let k = 2
  let end = str.length
  let pmt = [0]
  while(k <= end) {
    let prefixs = str.substring(0, k - 1).split('').map((item, index) => {
      return str.substring(0, index + 1)
    })
    let suffixs = str.substring(1, k).split('').map((item, index) => {
      return str.substring(index + 1, k)
    })
    suffixs = suffixs.length > 1 ? suffixs.reverse() : suffixs
    patch(prefixs, suffixs, pmt)
    k++
  }
  return pmt
}
function patch(prefixs, suffixs, pmt) {
  let i = 0
  let maxLen = 0
  while(i < suffixs.length) {
    if (suffixs[i] === prefixs[i]) {
      maxLen = suffixs[i].length > maxLen ? suffixs[i].length : maxLen
    }
    i++
  }
  pmt.push(maxLen)
}
function kmp(str, keyword) {
  let key = 0
  let index = 0
  let pmt = getPmt(keyword)
  console.log(pmt)
  while (key < keyword.length && index < str.length) {
    if (keyword[key] === str[index]) {
      key++
      index++
    } else if (key > 0) {
      index = index + (key - pmt[key - 1])
      key = 0
    } else {
      index++
    }
  }
  if (key === keyword.length) {
    console.log(`包含，索引位置为${index - keyword.length}至${index - 1}`);
  } else {
    console.log('不包含');
  }
}
let keyword = 'abcdabd'
let str = 'bbc abcdab abcdabcdabde'
kmp(str, keyword)
// ABABABABGFDGFD
// ABABABG
// A[0]
// AB-[A,B] 0
// ABA,[A,AB],[A,BA] 1
// ABAB,[A,AB,ABA],[B,AB,BAB] 2
// ABABA,[A,AB.ABA,ABAB],[A,BA,ABA,BABA]3
// ABABAB,[A,AB,ABA,ABAB,ABABA][B,AB,BAB,ABAB,BABAB]4
// ABABABG,[A,AB,ABA,ABAB,ABABA,ABABAB][G,BG,ABG,BABG,ABABG,BABABG]0

function getNext(next, s){
    let j = -1;
    next[0] = j;
    for(let i = 1; i < s.length; i++) { // 注意i从1开始
        while (j >= 0 && s[i] != s[j + 1]) { // 前后缀不相同了
            j = next[j]; // 向前回溯
        }
        if (s[i] == s[j + 1]) { // 找到相同的前后缀
            j++;
        }
        next[i] = j; // 将j（前缀的长度）赋给next[i]
    }
  return next
}
console.log(getNext([], 'ABABABG'))

在文本串txt里 找是否出现过模式串keywords
txt: 'ABABABABGFDGFD'
keywords: 'ABABABG'
1.用暴力算法怎么做
依次匹配
2.可利用的已知信息是什么
根据长度知道匹配成功的字符是哪些：
3.为什么要选后缀重复：如果是中间重复，则可能导致比较位置之前的字符串不一致,liru :ABA和BAA不一致，移动后需要保证比较指针前的字符串是相等的
ABBABBABAABA ABABAAA
      ABAABA BABAA
        ABAA BABABAA
4.为什么一定是最长重复的后缀  ABABABABGFDGFD
                            ABABABG
                                ABABABG
错过了真正的位置
1：A
2: AB
3: ABA
4: ABAB
5: ABABA
6: ABABAB
7: ABABABG
在已经匹配到的字符串中，找到与前缀重复的字符串，并跳跃到该位置。
什么是前缀？就是匹配到的字符串中，从第一个字符开始到地n个结束的一个字符串，在当前匹配到字符串中从非0开始有重复，例如
ABA中：A，A，ABAB中：AB，AB，ABABA中：A，A，ABA，ABA，ABABAB中：AB和ABAB
根据最大前缀的长度可得出移动的最小距离，例如匹配到ABABAB，其中有两个前缀，AB和ABAB，如果按照AB来移动，6 - 2 = 4，移动4位，就错过了真正匹配的位置。
匹配到的串长度为6，
当前txt为ABACDBABABGFDGFD，假设已经匹配到ABA，第四位不相等，[A, AB],[A,BA]，交集为A，那么匹配到的前缀为A，
在txt已经匹配到的字符串中，和keywords前缀相比，有两种情况，一种是和前缀相等，一种是和前缀不相等，我们要找到和前缀相等的值，然后将keywords移动过去。
ABAXXXXXXXXXX
ABABABG


ABABCD

A 0
AB 0
ABA [A,AB][A,BA] 1
ABAB [A,AB,ABA][B,AB,BAB] 2
ABABC [A,AB,ABA,ABAB][C,BC,ABC,BABC] 0
ABABCD [A,AB,ABA,ABAB,ABABC][D,CD,BCD,ABCD,BABCD] 0