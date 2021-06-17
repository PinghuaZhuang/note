# npm

记录一些不常用的方法

`npm` 支持 `FTP` 协议和 `file` 协议



## workspace 

https://docs.npmjs.com/cli/v7/using-npm/workspaces



## npm run build 添加参数

```js
const argv = process.argv
const lastArg = argv[argv.length - 1]
const env_config = /:/.test(lastArg) ? process.env.env_config : lastArg
```



## 修改配置

```bash
npm config edit
```



## .npmrc

项目地下添加 .npmrc 文件可以修改npm配置.



## Clone

```bash
git clone http://用户名@地址
```



## npm 全局安装的包

+ webpack

+ eslinteslint-plugin-vue, elsint-plugin-html, elsint-plugin-jquery

+ @vue-cli

+ @vue/cli-init:  Vue CLI 2 (vue-cli)  搭建vue旧项目

+ http-serve || http-server

+ [Verdaccio][https://verdaccio.org]: 搭建私有npm库.

+ lerna: npm publish 的使用版本号的变化.

+ @js-lib/cli: 创建一个 jslib 的脚手架.

+ pm2: node 进程管理.

+ vuepress: npm install -g vuepress

+ npm i -g @js-lib/cli

+ npm install -g @vue/cli-service-global    对单个vue文件开发

+ ```bash
  npm install -g browser-sync # 热更新
  ```
  
+ flyover: 代理工具. 替换线上文件. 实现在线调试.



## npm link

在本地开发 `npm` 模块的时候，我们可以使用 `npm link` 命令，将 `npm` 模块 **链接** 到对应的运行项目中去，方便地对模块进行调试和测试. 可以实现动态的调试 `npm` 项目.

> 实际上就是在 `node_modules` 下创建了快捷方式, 文件会被监听( 热更新 )
>
> 解除绑定就是删除该快捷方式. 需要重新编译项目才可以
>
> 注意:
>
> 	这里不能连接指定的包. 不能使用 '@'

### example

```cli
npm link C:\Users\Administrator.DESKTOP-ON5VPQH\Documents\GitHub\demos\nm
```

---



## npm 发布

```flow
op1=>operation: npm login
op2=>operation: npm publish

op1->op2
```





---









