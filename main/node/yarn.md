# 二. 使用方法

## 2.1 修改 package.json

```
 "scripts": {
   "postinstall": "patch-package"
 }
```

## 2.2 安装 patch-package

安装要求：npm(>=5) or yarn

可以使用下面两种方法安装，个人推荐 yarn

> - npm i patch-package
> - yarn add patch-package postinstall-postinstall 【个人推荐】

## 2.3 修改 node_modules 中的依赖

就像我在使用场景中提到的，安装完所需依赖后，我们开始对 依赖源码 进行修改

## 2.4 生成 .patch 文件 记录差异

完成 node_modules 的修改后，执行以下命令：

> - yarn patch-package package-name 【个人推荐】
> - npx patch-package package-name 【npm > 5.2】

其中 package-name 与更改的包的名称匹配，以 使用场景 为例：

> - yarn patch-package cordova-plugin-file-opener2
> - npx patch-package cordova-plugin-file-opener2

项目第一次使用 patch-package 时，会在根目录中创建一个名为 **patch** 的文件夹

里面有一个名为 package-name+0.44.0.patch 的文件或其他文件，用于记录修改差异

![img](https://img-blog.csdnimg.cn/0a53688ccdf844d6bbb398fb8c375cca.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBATHlyZWxpb24=,size_20,color_FFFFFF,t_70,g_se,x_16)

## 2.5 提交 patch 文件夹，实现团队共享