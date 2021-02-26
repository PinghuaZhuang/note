# Window 系统



## 获取目录树 TREE

```powershell
# 获取当前目录下的文件夹和文件 depth 表示层级
Get-ChildItem ./  -Depth 0
```





## 修改host

hosts文件位置：C:\windows\system32\drivers\etc

刷新方式：

ctrl+r，输入CMD，回车

在命令行执行:ipconfig /flushdns   #清除DNS缓存内容。
ps:ipconfig /displaydns  //显示DNS缓存内容



## v2rayN 安装

[document][1]

1. 下载v2ray core:   https://github.com/v2ray/v2ray-core/releases/latest](https://www.tok9.com/go/aHR0cHM6Ly9naXRodWIuY29tL3YycmF5L3YycmF5LWNvcmUvcmVsZWFzZXMvbGF0ZXN0)
2. 下载 v2RayN： [https://github.com/2dust/v2rayN/releases/latest](https://www.tok9.com/go/aHR0cHM6Ly9naXRodWIuY29tLzJkdXN0L3YycmF5Ti9yZWxlYXNlcy9sYXRlc3Q=)

3. 下载完成后v2ray core 放到 v2RayN 同级目录下.

### 局域网连接

设置代理 IP + 端口. http的端口好. 底部可以看到. 10809

---

[1]: https://www.tok9.com/archives/405/