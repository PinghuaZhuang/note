# Git 扩展



## git 代理

```bash
git config --global --unset http.proxy
git config --global --unset http.https://github.com.proxy

git config --global http.proxy http://127.0.0.1:1234
git config --global https.proxy http://127.0.0.1:1234
```



token 地址提交代码

https://<token>@github.com/user/repo.git


## 线上代码回滚操作

### reset

在本地 reset --hard 到指定提交, 在利用git push -f 提交到仓库. 高风险.  而且无法指定中间错开的提交. 

### revert + rebase

[参考地址](jianshu.com/p/6add7a1090ac)

revert 所有提交. 然后利用 rebase 合并 revert的提交.  最后git push 到仓库即可. 开发人员 pick 改提交然后 revert revert 后. 修改再合并.

revert f范围内多个提交 revert old^..new



## commitlint

要在 git init 后按照依赖否则不生效. 

https://segmentfault.com/a/1190000017281595?utm_source=tag-newest


## 私有仓库地址.

registry=http://39.101.209.235:4873/



# git 合并不同仓库代码

1. 先拉取不同的项目代码到本地. 
2. 创建本地分支. 合并本地2个分支. 

```bash
git merge feature_framework --allow-unrelated-histories
```



## 根据 tag 创建分支

当线上版本出现问题需要换到某个版本时, 可以通过 git reset 还原后创建分支后再回退到最新版本, 在分支中修改后和合并到分支.

但是 reset --hard 有风险, 并且 tag 标签本身就是一个 commit 记录, 可以通过分支命令带参数一步实现.

```bash
git checkout -b <branchName> <tagName>
```



# reset 后查看丢失的提交记录

```bash
git reflog show --all
```



## 修改提交信息

### 修改最近一次记录

```bash
git commit --amend
```

### 修改历史记录

1. 列出记录, 修改 `pick` 为 `edit`

```bash
git rebase -i HEAD~3 // 最近三条
git rebase -i 2adffsf // 根据 SHA 查询
```

2. 使用 `vim` 修改标记的提交信息

```bash
git commit --amend
```

3. 确定

```bash
git rebase --continue
```

4. 提交到远程仓库, 慎用!!!

```bash
git push -f
```

