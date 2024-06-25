var orangesRotting = function(grid) {
  //         (x-1,y)
  // (x,y-1) (x,  y) (x,y+1)
  //         (x+1,y)
          let row = grid.length
          let col = grid[0].length
          if (row == 0 || col == 0) return 0
          let cnt = 0
          let stack = []
          for (let i = 0; i < row; i++) {
              for (let j = 0; j < col; j++) {
                  if(grid[i][j] == 2) {
                      stack.push([i,j])
                  } else if (grid[i][j] == 1){
                      cnt++
                  }
              }
          }
          if (cnt == 0) return 0
          let res = []
          debugger
          while(stack.length > 0) {
              let currntSize = stack.length
              res.push([])
              for(let j = 0; j < currntSize; j++) {
                  let [x,y] = stack.shift()
                  if (grid[x][y] == 2) {
                      if(x-1 >= 0 && grid[x-1][y] == 1) {
                          grid[x-1][y] = 2
                          stack.push([x-1,y])
                          res[res.length - 1].push([x-1,y])
                          if (x ==2 && y ==1) {
                            console.log('1')
                          }
                          cnt--
                      }
                      if (y-1 >= 0 && grid[x][y-1] == 1) {
                          grid[x][y-1] = 2
                          stack.push([x,y-1])
                          res[res.length - 1].push([x,y-1])
                          if (x ==2 && y ==2) {
                            console.log('2')
                          }
                          cnt--
                      }
                      if (y+1 < col && grid[x][y+1] == 1) {
                          grid[x][y+1] = 2
                          stack.push([x,y+1])
                          res[res.length - 1].push([x,y+1])
                          if (x ==2 && y ==0) {
                            console.log('3')
                          }
                          cnt--
                      }
                      if (x+1 < row && grid[x+1][y] == 1) {
                          grid[x+1][y] = 2
                          stack.push([x+1,y])
                          res[res.length - 1].push([x+1,y])
                          if (x ==1 && y ==1) {
                            console.log('4')
                          }
                          cnt--
                      }
                  }
              }
          }
          console.log(res)
          return cnt > 0 ? -1 : res.length
  
  };

  var grid =
  [[2,1,1],[1,1,0],[0,1,1]]
  orangesRotting(grid)
