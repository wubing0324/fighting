```javascript
# 缓存 /static/ 目录下的文件
location /static/ {
    # 设置缓存时间
    expires 30d;  # 缓存时间为30天
    add_header Cache-Control "public, max-age=2592000";  # 与 expires 30d 对应

    # 处理 gzip 压缩
    gzip on;
    gzip_types text/plain application/javascript text/css application/xml text/javascript application/json image/svg+xml;
    gzip_proxied any;
    gzip_vary on;
}
```