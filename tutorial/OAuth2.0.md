# 第三方登录



## GitHub

基本是后台重定向, 原理: OAuth2.0 协议

### 开发平台

[QQ开发平台][5]

[微信开发平台][6]

[微博开发平台][7]

[github开发平台文档-Creating an OAuth Apps][8]

[github开发平台文档-Authorizing OAuth Apps][9]

> 各个平台第三方接入流程都是差不多的



- GitHub

  其实文档里面已经清晰的说明了授权登录的主要3个步骤： 

  1. 转跳到 GitHub 用户授权页面， client_id 必须传 其他参数如果有需要就传，例如我这里需要获取用户的邮箱信息，就加了一个 scope=user:email 最终拼成的URL如下:https://github.com/login/oauth/authorize?client_id=myclient_id&scope=user:email

     ```js
     // 前端重点是地址的填写
     window.location.href = 'https://github.com/login/oauth/authorize?client_id=75d6ff0d7a95f88acae6&redirect_uri=https://manage.hgdqdev.cn/#/login'
     ```

  2. 当用户同意授权后，链接地址就会转跳到 我们配置页面内的 Authorization callback URL 所填写的URL地址，并且会带上一个 code参数，这个参数在后面获取用户token是必须的一个参数。 获取到这个code参数后，我会将这个code传到服务器的后台，然后后台调用 https://github.com/login/oauth/access_token 这个api，传入 client_id, client_secret, code 这三个参数，可以获取到一个 access_token。

     ```js
     https://hodorshy.github.io/login/index.html?code=7bf948bec7fa076ca8fa
     ```

  3. 获取到 access_token 后， 再调用 https://api.github.com/user?access_token=access_token这个API，就可以获取到基本的用户信息了。 用户的基本信息内容如下所示， 根据第一步传入的不同的 scope，获取到的用户信息也是不同的。本博客后台使用 ID 字段作为用户的唯一标示，因为login（实则为用户名）有可能会更改。

![](C:/Users/ZNV/Documents/GitHub/note/images/github_01.png)

![](C:/Users/ZNV/Documents/GitHub/note/images/github_02.png)

---



## QQ

### 获取用户信息

[API列表][qq_info]

## 开发指导

[在线博客文档][1]

## OAuth2.0 接口

+ 获取 code

```js
'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101549566&redirect_uri=https://hodorshy.github.io/login/qq.html&state=test'
```

+ 获取 token

```js
'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=101549566&client_secret=55b016a40c83fba8efebfe7fb89899d5&code=E37253F0A3A0BB37BCB4956F37F13C50&redirect_uri=https://hodorshy.github.io/login/qq.html'
```

+ 获取用户基本信息

```js
https://graph.qq.com/user/get_user_info?access_token=4353B301DDE151F222AECFCDEC31C9FC&oauth_consumer_key=101549566&openid=F7AC13FB348EE0A6B032861FFC47043B&format=json
```





---

[qq_info]: http://wiki.open.qq.com/wiki/website/API%E5%88%97%E8%A1%A8	"qq_info"
[1]: https://www.cnblogs.com/nuanxin/p/6249492.html	"qq登录开发博客文档"

