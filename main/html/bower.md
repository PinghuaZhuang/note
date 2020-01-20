# Bower 浏览器相关

## Error 

+ TypeError: 类型错误.
+ ReferenceError: 引用错误.
+ DOMError: dom 相关错误.



## 登录

+ cookies

  浏览向后台请求数据( 登录 ), 后台创建 cookie 携带 sessionid. cookie 可以保存用户名.

  判断用户名是否登录: cookie 是否有用户名.



## 权限

登录成功后, 后台发送路由以及权限信息.

```js
// 1. 已经添加 or 全局路由, 直接访问
// 2. 获取菜单列表, 添加并保存本地存储
if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
} else {
    http({
        url: http.adornUrl('/sys/menu/nav'),
        method: 'get',
        params: http.adornParams()
    }).then(({ data }) => {
        if (data && data.code === 0) {
            fnAddDynamicMenuRoutes(data.menuList)
            router.options.isAddDynamicMenuRoutes = true
            sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
            sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
            next({ ...to, replace: true })
        } else {
            sessionStorage.setItem('menuList', '[]')
            sessionStorage.setItem('permissions', '[]')
            next()
        }
    }).catch((e) => {
        console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
        router.push({ name: 'login' })
    })
}
```



## 移动端浏览器的一些技能点

+ 通过设置css属性 -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
+ 取消掉手机端webkit浏览器 点击按钮或超链接之类的 默认灰色背景色 
  设置css属性 -webkit-user-select:none; 控制用户不可选择文字 
+ 区域性 overflow: scroll | auto 滚动时使用原生效果：-webkit-overflow-scrolling: touch （ios8+，Android4.0+）

---



## 监听页面所有请求

页面的所有 ajax 都是使用的 XMLHttpRequest 请求. 复写 open, send 等方法.

---



## 记住密码

前端使用 `cookies` 保存密码, `md5.js` 加密. 提交 md5 码跟后台验证.



---



## CSS

## calc 计算百分比与固定值的差

calc 兼容性不好, 最好使用 flex 布局.

```css
.demo {
    height: calc( 100% - 100px )
}
```



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



## Service Workers

[在线文档][10]



---



浏览器语音

```js
function speak () {
    let speech = new SpeechSynthesisUtterance( 'Hello~' )
    speechSynthesis.speak( speech )
}

// 不能触发
window.onload = speak

// 可以触发, 难听
document.querySelector( '#btn' ).onclick = speak
```





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