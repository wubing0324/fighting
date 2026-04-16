// 题目描述
// 某个打印机根据打印队列执行打印任务。打印任务分为九个优先级，分别用数字1-9表示，数字越大优先级越高。打印机每次从队列头部取出第一个任务A，

// 然后检查队列余下任务中有没有比A优先级更高的任务，如果有比A优先级高的任务，则将任务A放到队列尾部，否则就执行任务A的打印。

// 请编写一个程序，根据输入的打印队列，输出实际的打印顺序。

// 输入描述
// 输入一行，为每个任务的优先级，优先级之间用逗号隔开，优先级取值范围是1~9。

// 输出描述
// 输出一行，为每个任务的打印顺序，打印顺序从0开始，用逗号隔开

// 示例1
// 输入

// 9,3,5
// 1
// 输出

// 0,2,1
// 1
// 说明

// 队列头部任务的优先级为9，最先打印，故序号为0；
// 接着队列头部任务优先级为3，队列中还有优先级为5的任务，优先级3任务被移到队列尾部；
// 接着打印优先级为5的任务，故其序号为1；
// 最后优先级为3的任务的序号为2。

// var proty = [9,3,5]
var proty = [1,2,2]

function getRes(priorities) {
    let proty = priorities
    let queue = proty.map((_, index) => [_, index])
    let s = proty.sort((a, b) => b - a)
    let cur = 0
    console.log(s)
    let result = []
    while(queue.length > 0) {
        let head = queue.shift()
        if (head[0] == s[cur]) {
            result[head[1]] = cur
            cur++
        } else {
            queue.push(head)
        }
    }
    console.log(result)

    // const queue = priorities.map((priority, index) => [priority, index]);
 
  // 记录结果, results[i] 表示初始排队顺序索引 i 的任务, 实际打印顺序索引为 results[i]
  // [任务优先级, 初始排队的索引位置]
//   const queue = priorities.map((priority, index) => [priority, index]);
//   const results = new Array(priorities.length);
 
//   // priorities降序
//   priorities.sort((a, b) => b - a);
//   // printIndex 既是 priorities中最高优先级的索引位置, 也是实际打印顺序的序号
//   let printIndex = 0;
 
//   while (queue.length > 0) {
//     // 队头任务的 [任务优先级, 初始排队的索引位置]
//     const [priority, index] = queue.shift();
 
//     if (priority == priorities[printIndex]) {
//       // 如果队头任务的优先级 是 最高优先级
//       // 初始排队序号task.index的任务, 实际打印序号为 printIndex
//       results[index] = printIndex++;
//     } else {
//       // 如果队头任务优先级 不是 最高优先级, 则插入队尾
//       queue.push([priority, index]);
//     }
//   }
//   console.log(results)
}

getRes(proty)


