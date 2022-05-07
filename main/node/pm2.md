# PM2 

node 进程管理. 



## 常用命令

```bash
pm2 start app.js
pm2 start app.js --watch

pm2 list
pm2 ls
pm2 monit # 监听文件编号
pm2 show [app-name] # 显示应用信息
pm2 logs # 显示所有应用的日志
pm2 logs [app-name] # 显示指定应用的日志
pm2 stop 0 # 关闭指定进程
pm2 stop all # 关闭所有进程
```



## 配合 http-serve 使用

```bash
pm2 start ./http-serve --name my-server-name -- /c/Users/Administrator/Documents/GitHub/demos/phone -p 7291 -d false
```

historyApiFallback: true

http-serve ./ -f ./index.html

## 自动部署

在项目根目录下新建一个 deploy.yaml 文件

```yaml
# deploy.yaml
apps:
 - script: ./start.js    # 入口文件
  name: 'app'       # 程序名称
  env:           # 环境变量
   COMMON_VARIABLE: true
  env_production:
   NODE_ENV: production
 
deploy:           # 部署脚本
 production:        # 生产环境
  user: lentoo      # 服务器的用户名
  host: 192.168.2.166   # 服务器的ip地址
  port: 22        # ssh端口
  ref: origin/master   # 要拉取的git分支
  ssh_options: StrictHostKeyChecking=no # SSH 公钥检查
  repo: https://github.com/**.git # 远程仓库地址
  path: /home       # 拉取到服务器某个目录下
  pre-deploy: git fetch --all # 部署前执行
  post-deploy: npm install && pm2 reload deploy.yaml --env production # 部署后执行
  env:
   NODE_ENV: production
```



## 通过 processes.json 来启动

```json
{
 	"apps": [
         {
              "name": "mywork",
              "cwd": "/srv/node-app/current",
              "script": "bin/xxx",
              "log_date_format": "YYYY-MM-DD HH:mm:ss",
              "error_file": "/var/log/node-app/node-app.stderr.log",
              "out_file": "log/node-app.stdout.log",
              "pid_file": "pids/node-geo-api.pid",
              "instances": 6,
              "min_uptime": "200s",
              "max_restarts": 10,
              "max_memory_restart": "1M",
              "cron_restart": "1 0 * * *",
              "watch": false,
              "merge_logs": true,
              "exec_interpreter": "node",
              "exec_mode": "fork",
              "autorestart": false,
              "vizion": false
         }
 	]
}
```

