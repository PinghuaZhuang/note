# Bower 浏览器相关



## 记住密码

前端使用 `cookies` 保存密码, `md5.js` 加密. 提交 md5 密码跟后台验证.



---



## 移动端改变 chrome 标题栏的颜色

> 只有安卓系统才支持
>
> 要求系统版本好像要到4.2以上，Chrome版本39以上。

原文链接: [developers.google.com][1]

[online-demo][1]

在自己网页的<head></head>标签中加入：

```html
<!-- 16进制颜色值 -->
<meta name="theme-color" content="<!--颜色的HEX代码-->">
```



---



## UID 浏览器唯一标识符

+ 通过 `IE`

  `js` 想获取设备 `MAC`, `ip` 等信息, 只能通过 IE 浏览器下通过 `ActiveX` 取得, 这是由于 `js` 的安全机制导致

+ 创建一个 `UID`, 类似于 `cookies`

  ```js
  // 这个函数可以生成一个随机guid，碰撞几率可以忽略不计，可以认为是唯一的。
  function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
  };
  ```

---



## 浏览器通知 Notification

[MDN][3]

**Notifications API** 允许网页或应用程序在系统级别发送在页面外部显示的通知;这样即使应用程序空闲或在后台，Web应用程序也会向用户发送信息。

> 注意: chrome 下 file 协议打开无效

### 查看权限

**Notification.permission**

`default`

	用户还未被询问是否授权，所以通知不会被显示。
	
	参看 [Getting permission][4] 以了解如何请求显示通知的权限。

`granted`

	表示之前已经询问过用户，并且用户已经授予了显示通知的权限。

`denied`

	用户已经明确的拒绝了显示通知的权限。

### 请求权限

如果权限尚未被授予，那么应用不得不通过 `Notification.requestPermission()` 方法让用户进行选择。这个方法接受一个回调函数，一旦用户回应了显示通知的请求，将会调用这个函数。

```js
window.addEventListener( 'load', function () {
  Notification.requestPermission( function ( status ) {
    // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
    if ( Notification.permission !== status ) {
      Notification.permission = status;
    }
  } );
} );
```

---



## 连接移动端调试技巧

### 利用 chrome 链接手机调试

效果图

![](../images/brower_01.png)

1. `PC` 和 手机安卓同一个版本号 `chrome` 浏览器( `IOS` 可能版本对不上 )
2. 使用 USB 连接电脑( 安卓打开`USB`调试 )
3. 打开电脑的chrome 在地址栏输入 `chrome://inspect`  选中 `Discover USB devices` 可以检测到你的设备 



---



## 设置 title 文本信息

```js
document.title = 'hahaha';
```

---



## 第三方登录

基本是后台重定向, 原理: OAuth2.0 协议


### 开发平台

[QQ开发平台][5]

[微信开发平台][6]

[微博开发平台][7]

[github开发平台文档-Creating an OAuth Apps][8]

[github开发平台文档-Authorizing OAuth Apps][9]

> 各个平台第三方接入流程都是差不多的



+ GitHub

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

![](../images/github_01.png)

![](../images/github_02.png)



---



## Service Workers

[在线文档][10]



---

[1]: https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android?hl=en
[2]: https://hodorshy.github.io/example/chrome-title-color.html
[3]: https://developer.mozilla.org/zh-CN/docs/Web/API/notification/Using_Web_Notifications
[4]: https://developer.mozilla.org/zh-CN/docs/Web/API/notification/Using_Web_Notifications#Getting_permission
[5]: https://connect.qq.com/
[6]: https://open.weixin.qq.com/
[7]: https://open.weixin.qq.com/
[8]: https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/
[9]: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
[10]: https://www.w3ctech.com/topic/866