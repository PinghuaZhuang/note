# Git 扩展

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

