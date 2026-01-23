let currentModule;

const socket = new WebSocket(`ws://${location.host}`);

socket.addEventListener("message", async ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.type === "update") {
    console.log("[HMR] Update received, reloading module...");
    await reloadModule();
  }
});

async function reloadModule() {
  // 动态导入新模块
  const newModule = await import(`/hello.js?t=${Date.now()}`);
  if (newModule && typeof newModule.render === "function") {
    newModule.render(document.getElementById("app"));
    currentModule = newModule;
  }
}

// 初始加载
reloadModule();
