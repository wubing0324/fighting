var setZeroes = function (matrix) {
  let rows = matrix.length
  let cols = matrix[0].length

  let queue = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == 0) {
        queue.push([i, j])
      }
    }
  }
  while (queue.length > 0) {
    let [x, y] = queue.pop()
    matrix[x].fill(0)
    for (let i = 0; i < rows; i++) {
      matrix[i][y] = 0
    }
  }
  console.log(matrix)
};
matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
setZeroes(matrix)