安装
```
sudo yum install epel-release
sudo yum update
sudo yum -y install redis
sudo systemctl start redis
```
配置
```
vi /etc/redis.conf

bind 0.0.0.0
requirepass 密码
daemonize yes
protected-mode no
```

```
redis-cli -h 127.0.0.1 -p 6379 -a myPassword
systemctl start redis.service #启动redis服务器

systemctl stop redis.service #停止redis服务器

systemctl restart redis.service #重新启动redis服务器

systemctl status redis.service #获取redis服务器的运行状态

systemctl enable redis.service #开机启动redis服务器

systemctl disable redis.service #开机禁用redis服务器
```
