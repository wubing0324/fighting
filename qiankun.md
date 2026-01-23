在 Qiankun 微前端架构中，可以通过 Nginx 反向代理 将子应用的 entry 配置为相对路径（如 /micro-app/），然后由 Nginx 将其代理到真实的子应用部署地址。这样做的好处是：

避免跨域问题：主应用和子应用的所有请求都在同一个域名下，浏览器不会触发跨域限制。

隐藏真实部署地址：外部用户只能看到主应用的域名，无法直接访问子应用的服务器。

简化微应用配置：子应用只需关心相对路径，无需处理跨域或绝对 URL。
这样就不用通过设置自定义 fetch 来改变子应用入口 entry 跨域 cookie 问题了

```javascript
import { start } from "qiankun";

start({
  fetch(url, ...args) {
    // 给指定的微应用 entry 开启跨域请求
    if (url === "http://app.alipay.com/entry.html") {
      return window.fetch(url, {
        ...args,
        mode: "cors",
        credentials: "include",
      });
    }

    return window.fetch(url, ...args);
  },
});
```

具体实现步骤

1. 主应用配置子应用 entry 为相对路径
   在 Qiankun 主应用中，将子应用的 entry 改为相对路径（如 /micro-app/），而不是完整的 URL：

```javascript
// 主应用注册微应用
import { registerMicroApps } from "qiankun";

registerMicroApps([
  {
    name: "micro-app",
    entry: "/micro-app/", // 使用相对路径，而不是 https://micro-app-domain.com
    container: "#micro-app-container",
    activeRule: "/micro-app",
  },
]);
```

2. Nginx 配置反向代理
   在 Nginx 中，将 /micro-app/ 路径的请求代理到子应用的真实部署地址：

```javascript
server {
    listen 80;
    server_name main-app.com;  # 主应用域名

    # 主应用静态资源
    location / {
        root /usr/share/nginx/html/main-app;
        try_files $uri $uri/ /index.html;  # 支持前端路由
    }

    # 子应用代理（关键！）
    location /micro-app/ {
        proxy_pass https://real-micro-app-domain.com/;  # 子应用的真实地址
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cookie_domain real-micro-app-domain.com main-app.com;  # 修复 Cookie 域名
    }

    # 接口代理（可选，如果子应用有 API）
    location /api/ {
        proxy_pass https://real-api-server.com/;
        proxy_set_header Host $host;
    }
}
```

关键点：

proxy_pass：将 /micro-app/ 的请求转发到子应用的真实地址（如 https://real-micro-app-domain.com/）。

proxy_cookie_domain：确保子应用返回的 Cookie 域名正确（避免跨域 Cookie 问题）。

try_files $uri $uri/ /index.html：支持前端路由（如 Vue/React 的 history 模式）。
