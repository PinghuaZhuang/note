# npm

记录一些不常用的方法

`npm` 支持 `FTP` 协议和 `file` 协议



## Clone

```bash
git clone http://用户名@地址
```



## npm 全局安装的包

+ webpack
+ eslint
+ @vue-cli
+ http-server



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









