# Jenkins 自动化部署

## 后续发现jenkins worker一直pending不工作，就做如下配置

> pending--Waiting for next available executor

系统管理 -> 节点管理 -> 配置master -> number of executors设置成大于0的数 -> 保存

## Error 403 No valid crumb was included in the request

利用请求进行部署.

1. Dashboard > 全局安全配置 > 跨站请求伪造保护.
2. 请求携带crumb来实现(还要携带上`cookies`).
3. 如果上面的方法不行, 则关闭掉跨站请求伪造保护.

## No such plugin: cloudbees-folder

https://blog.csdn.net/Lemonhlj/article/details/112140367



---

参考文档:

[curmb][https://blog.csdn.net/qq_33285694/article/details/119886289]

[curmb携带cookies][https://segmentfault.com/a/1190000040706914]

[关闭跨站请求伪造保护][https://www.jianshu.com/p/00fcfa4a53b5]



---

[1]: https://www.cnblogs.com/wfd360/p/11314697.html
[https://blog.csdn.net/qq_33285694/article/details/119886289]: 
