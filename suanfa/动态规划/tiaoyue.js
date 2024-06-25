var uniquePathsWithObstacles = function(obstacleGrid) {
  let m = obstacleGrid[0].length
  let n = obstacleGrid.length
  let dp = Array.from(Array(n)).map(() => Array(m).fill(0))

  for (let j = 1; j < m;j++) {
    if (obstacleGrid[0][j] !== 1) {
      dp[0][j] = 1
    } else {
      break
    }
  }
  for (let i = 1; i < n;i++) {
    if (obstacleGrid[i][0] !== 1) {
      dp[i][0] = 1
    } else {
      break
    }
  }

  for (let i = 1; i < n; i++) {
      for (let j = 1; j < m;j++) {
          if (obstacleGrid[i - 1][j] == 1) {
              dp[i - 1][j] = 0
          }
          if (obstacleGrid[i][j-1] == 1) {
              dp[i][j-1] = 0
          }
          dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
  }
  console.log(dp)
  return dp[n-1][m-1]
};
uniquePathsWithObstacles([[0,0],[1,1],[0,0]])