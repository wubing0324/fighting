/*
 * @Author: wubing32696 wubing32696@hundsun.com
 * @Date: 2022-10-19 10:24:52
 * @LastEditors: wubing32696 wubing32696@hundsun.com
 * @LastEditTime: 2022-10-19 10:58:29
 * @FilePath: \动态规划\tu\tu.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  for (var i = 0; i < this.vertices; ++i) {
     this.adj[i] = [];
     this.adj[i].push("");
  }
  this.addEdge = addEdge;
  this.showGraph = showGraph;

  // 深度优先搜索是遍历再递归
  this.dfs = dfs;

  // 广度优先搜索是通过栈和遍历节点来实现的
  this.bfs = bfs;

  this.marked = [];
  for (var i = 0; i < this.vertices; ++i) {
      this.marked[i] = false;
  }
}

function addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
}

function showGraph() {
  for (var i = 0; i < this.vertices; ++i) {
     document.write(i + "->");
     for (var j = 0; j < this.vertices; ++j) {
         if (this.adj[i][j] != undefined) {
             document.write(this.adj[i][j] + ' ');
         }
     }
  }
}

function dfs(v) {
  this.marked[v] = true;
  document.write("Visited vertex:  " + v);
  for (var w in this.adj[v]) {
     if (!this.marked[w]) {
        this.dfs(w);
     } 
  }
}

function bfs(s) {
  var queue = []; 
  this.marked[s] = true; 
  queue.push(s); //添加到队尾
  while (queue.length > 0) {
  var v = queue.shift(); //从队首移除 
   if (v == undefined) {
            document.write("Visisted vertex:  " + v);
         }
         for (var w in this.adj[v]) {
            if (!this.marked[w]) {
               this.edgeTo[w] = v;
               this.marked[w] = true;
               queue.push(w);
      } 
   }
  } 
}

g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();

g.dfs(1)
