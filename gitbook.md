# gitbook 常用操作

## gitbook 常见 bug 

problem: 

```cli
Error: ENOENT: no such file or directory, stat 'C:\Users\Administrator.DESKTOP-ON5VPQH\Documents\Gitbook\note_book\gitbook\gitbook-plugin-fontsettings\fontsettings.js'
```

Fix:

```bash
cd ~/.gitbook/versions/版本/lib/output/website/
```

vim copyPluginAssets.js

删除112行

原因：[https://github.com/GitbookIO/...](https://github.com/GitbookIO/gitbook/issues/1309#issuecomment-273584516)



# gitbook 常用的命令

> 注意: 需要 publish 才可以在线观看

这里主要介绍一下 GitBook 的命令行工具 `gitbook-cli` 的一些命令, 首先说明两点:

- `gitbook-cli` 和 `gitbook` 是两个软件
- `gitbook-cli` 会将下载的 gitbook 的不同版本放到 `~/.gitbook`中, 可以通过设置`GITBOOK_DIR`环境变量来指定另外的文件夹

[gitbook使用教程](http://www.chengweiyang.cn/gitbook/basic-usage/README.html)

**安装**

```cli
npm install gitbook -g
```

**初始化**

```clike
gitbook init
```

**编译**

```cli
gitbook build
```

**编译和预览**

```cli
gitbook serve
```

**列出本地所有的gitbook版本**

```cli
gitbook ls
```

**列出远程可用的gitbook版本**

```cli
gitbok ls-remote
```

**安装对应的gitbook版本**

```bash
gitbook fetch 标签/版本号
```

**更新到gitbook的最新版本**

```bash
gitbook update
```

**卸载对应的gitbook版本**

```bash
gitbook uninstall 2.0.1
```

**指定log的级别**

```bash
gitbook build --log=debug
```

**输出错误信息**

```bash
gitbook builid --debug
```

