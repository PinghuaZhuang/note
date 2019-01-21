# 路由相关

## 原理

通过监听 `window.onhashchange` 事件来触发对应事件. 

通过 `window.location.hash` 值来触发. 在前头会一个 `#` 的符号;



## 注意点

在页面前进后退的时候, 页面是会缓存的. 使用 vue 调试的时候, 还是要刷新下的. 



## 权限管理

在用户管理中, 用户登录是有权限区别的. 这时候就需要权限管理. 权限管理的方法, 一般有 2 种方式.

### cookies 

在跳转页面之前, 查询用户权限. 当用户权限不满足要求时, 页面跳转( 到登录页面或者 404 ).

有一个用户权限验证的接口

发送请求携带 `cookies` 

### 动态添加路由

+ vue: 让后台返回路由列表, `router.addRouter` 方法添加.

### 路由拦截

根据后台返回的权限信息, 在路由拦截的时候判断. 

```js
beforeRouteEnter( to, from, next ) {
  next( vm => {
    // 通过 `vm` 访问组件实例
  } )
}
```



## 嵌套路由





## 路由配置

### params

```js
var routers = [ {
    name: '/test/:id?' // :id? 这个参数可有可无
} ];

// 获取
this.$router.params.id
```

### query

```js
var routers = [ {
    name: '/test?id=1234' 
} ];

// 获取
this.$route.query.id
```



## replace 与 push 的区别

replace 是替换掉 history 中当前的地址, 不会添加新记录, push 会添加新记录.

this.$route.go(-1) 就是调用浏览器 history 的前进后退方法, 相当于点击浏览器的前进后退.