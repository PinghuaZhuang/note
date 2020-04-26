# verdaccio

发布私有NPM产库

[官网][https://www.verdaccio.org/] [github][https://github.com/verdaccio/verdaccio]



## 安装

```bash
npm install --global verdaccio
```

安装需要事先安装 `Visual Studio`, 安装的时候需要勾选 PC端开发 c++.



## 配置

一般配置文件的路径在`C:\Users\Administrator\AppData\Roaming\verdaccio\config.yaml`

### 一些重要的配置

+ storage： 仓库保存的地址，publish时仓库保存的地址。

+ auth：
  +  htpasswd file：账号密码的文件地址，初始化时不存在，可指定需要手工创建。
  + max_users：默认1000，为允许用户注册的数量。

+ uplinks: 配置上游的npm服务器，主要用于请求的仓库不存在时到上游服务器去拉取
+ **listen**: 0.0.0.0:4873  重点. 配置端口. 开启后, 外网可以访问. 不配做, 内网也访问不了.  前面是4个0.



## 进程管理

使用 pm2 进程管理 verdaccio 项目. 

```bash
npm i pm2 -g
pm2 start which verdaccio
pm2 start ./verdaccio
pm2 stop all 
```

