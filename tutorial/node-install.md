# node 安装




## 包管理器 nvm

+ [nvm-window][1] 下载
+ [教程][2]

### 手动下载 node 包

可以自行在 [node 官网][3] 下载, 解压放在安装过程中设置的路径.

![](../images/nvm-node.png)

### 修改镜像源

nvm 默认是从 `http://nodejs.org/dist/` 下载的, 国外服务器, 必然很慢

可以修改环境变量来改变镜像源:

```cli
$ NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node nvm install 4
```

### 常用命令

1. 安装删除 node

   ```cli
   nvm install v8.3.0	// v 可以不加
   nvm uninstall v8.3.0
   nvm install release // 安装最新版本
   ```

2. 查看所有版本

   ```cli
   npm ls
   ```

3. 更改版本

   ```cli
   npm use v8.3.0
   ```

---



## nrm 镜像源管理

### 安装 nrm

```cli
npm install -g nrm
```

### 常用命令

1. 查看列表

   ```cli
   nrm ls
   ```

2. 测试镜像源速度

   ```cli
   nrm test
   ```

3. 切换镜像源

   ```cli
   nrm use taobao
   ```

4. 添加删除镜像源

   ```cli
   nrm add  <registry> <url> [home]
   nrm del <registry>
   ```

---



## npm

[一些不常用的方法][4]



---

[1]: https://github.com/coreybutler/nvm-windows/releases
[2]: https://blog.csdn.net/suwu150/article/details/79881503
[3]: https://nodejs.org/zh-cn/
[4]: ./npm.md

