const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") filePath = "./index.html";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
    } else {
      const ext = path.extname(filePath);
      const type = ext === ".js" ? "application/javascript" : "text/html";
      res.writeHead(200, { "Content-Type": type });
      res.end(content);
    }
  });
});

const wss = new WebSocket.Server({ server });

function broadcast(msg) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
}

// 监听文件变化（hello.js）
fs.watchFile("./hello.js", () => {
  console.log("[HMR] Detected change in hello.js");
  broadcast({ type: "update", path: "/hello.js" });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
