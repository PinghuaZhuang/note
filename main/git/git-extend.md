# Git 扩展

# git 合并不同仓库代码

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

