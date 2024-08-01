
1. 使用 CSRF Token：

+ 在每个表单提交或每个请求中包含一个唯一的 CSRF token，服务器验证该 token 是否有效，从而防止未经授权的请求。

2. SameSite Cookie 属性：

+ 设置 cookie 的 SameSite 属性为 Strict 或 Lax，以限制 cookie 在跨站点请求中的发送。
http
```
Set-Cookie: sessionID=abc123; SameSite=Strict
```


3. Referer 和 Origin 头验证：

+ 验证请求头中的 Referer 和 Origin，确保请求是从可信任的源发出的。

4. 双重提交 Cookie：

+ 在 cookie 中存储一个 CSRF token，并在请求中（例如表单提交时）也包含这个 token。服务器端验证两个 token 是否匹配。
```
Set-Cookie: csrfToken=abc123; HttpOnly
```
然后在提交表单时包括这个 token：
html
```
<input type="hidden" name="csrfToken" value="abc123">
```
5. 验证用户身份：

+ 在关键操作前要求用户重新验证身份（例如输入密码）。

6. HTTP 请求方法的限制：

+ 对于重要操作，尽量使用 HTTP 的 POST、PUT、DELETE 方法而非 GET 方法，因为浏览器通常不会在跨站请求中发送这些方法。