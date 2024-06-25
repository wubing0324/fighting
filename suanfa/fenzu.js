// 商品数
const N = 5

// 背包容量
const W = 20

// 动态规划结果
var n=1;
var arr = []
for(var i = 0;i < 6; i++){
 arr[i] = []; //每行有10列
 for(var j = 0;j < 22; j++){
  arr[i][j] = 0;
  n++;
 }
}

// 重量
var w = [0, 2, 3, 4, 5, 9]
// 价值
var v = [0, 3, 4, 5, 8, 10]
function getResult() {
    var k, c
    for (k = 1; k <= N; k++) {
        for (c = 1; c <= W; c++) {
            if (w[k] > c) {
                arr[k][c] = arr[k - 1][c]
            } else {
                var value1 = arr[k - 1][c]
                var value2 = arr[k - 1][c - w[k]] + v[k]
                arr[k][c]=Math.max(value1, value2)
            }
        }
    }
    return arr
}
arr[1][21] = 'w = 2, v = 3'
arr[2][21] = 'w = 3, v = 4'
arr[3][21] = 'w = 4, v = 5'
arr[4][21] = 'w = 5, v = 8'
arr[5][21] = 'w = 9, v = 10'
console.table(getResult())