var spiralOrder = function (matrix) {
  let rows = matrix.length
  let cols = matrix[0].length
  let total = rows * cols
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]
  let directionIndex = 0
  let row = 0, col = 0
  let visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false))
  let arr = new Array(total).fill(0)

  for (let i = 0; i < total; i++) {
    arr[i] = matrix[row][col]
    let [offsetx, offsety] = directions[directionIndex]
    let rownext = offsetx + row
    let colnext = offsety + col
    visited[row][col] = true
    if (rownext < 0 || rownext >= rows || colnext < 0 || colnext >= cols || visited[rownext][colnext]) {
      directionIndex = (directionIndex + 1) % 4
    }
    let [offsetx1, offsety1] = directions[directionIndex]
    row = row + offsetx1
    col = col + offsety1
  }
  return arr
};
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
spiralOrder(matrix)