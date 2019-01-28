# Vue

- 都有支持native的方案,React的React native,Vue的weex



## 路由相关

+ $router: 路由器
+ $route: 路由

### 判断动态添加路由是否成功

```js
// 判断长度是否大于 0 
let hasInstantiated = this.$router.resolve( { name: 'demo' } ).route.matched.length
```

### 配置基本路由

禁止用户用户访问非法路由, 可以配置基本路由跳转到 404

```js
let routers = {
    path: '*',
    name: '404',
    path: '404.vue'
}
```

### 页面刷新丢失路由的问题

在用户刷新一个有权限限制的页面的时候, 会重新实例化 vue, 所以 路由配置会丢失. 

解决办法:

+ 在本地保存路由配置. ( 不安全 )
+ 再次请求获取路由配置, 添加路由.

---



## 强制更新

在使用 v-for 渲染的时候, 修改 item 值后, v-if 作用的内容不会发生变异

原因: 层级太深

解决方法: 强制重新渲染组件

```js
// 强制渲染
this.$forceUpdate();  
```

### meta 路由元信息

在路由配置中可以配置 meta 字段, 来传递数据

例如, keep-alive 页面是否要缓存, 需要一个关键字来判断, 在路由跳转的时候可以藉由这个关键字来判断.

---



##  修改 UI 框架的样式

+ `/deep/`: 注意：使用 sass 和 less 只能使用 /deep/ 这个方法

```vue
<style scoped>
  /*
  修改样式
  通过使用 box-out 的 class 类，找到下面组件内的 class 类，中间必须得使用 /deep/ 才能找到下面的class类。
  */
  .box-out /deep/ .xxxxx组件样式类 {
    color: red;
  }
</style>
```



+ `>>>`: 

```vue
<style scoped>
  /*
  修改样式
  通过使用 box-out 的class类，找到下面组件内的class类，中间必须得使用 >>> 才能找到下面的class类。
  */
  .box-out >>> .xxxxx组件样式类 {
    color: red;
  }
</style>
```

---



## 使用 jsx 语法

`transform-vue-jsx`

---



## Provide/Inject

```js
export const MyComponent = Vue.extend({
	// 子组件从 provide 中获取( 嵌套在深都可以 )
    inject: {	
        foo: 'foo',
        bar: 'bar',
        'optional': { from: 'optional', default: 'default' },
        [symbol]: symbol
    },
    data () {
        return {
            foo: 'foo',
            baz: 'bar'
        }
    },
    // 父组件注入
    provide () {
        return {
            foo: this.foo,
            bar: this.baz
        }
    }
})
```

---



## immediate

`watch` 中, 是否使用当前值立即执行 `handler`

---



## Vue + Ts

```b
vue init SimonZhangITer/vue-typescript-template 项目名称
```

---



## 数组相关

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

2. 当你修改数组的长度这个属性时，例如：`vm.items.length = newLength`



Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

---



## Render

`Vue` 中, 使用 `render` 函数渲染是非常快的, 例如修改 `li` 标签顺序的时候. 就可以动态生成标签字符串去修改

---



## keep-alive

只能用来包裹动态组件.

### 属性

- `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。

- `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。

  使用 name 匹配的时候, 必须与  组件的那么值一致.

  优先匹配 组件 name 值, 其次是组件的局部注册名, 匿名组件不能被匹配.

- `max` - 数字。最多可以缓存多少组件实例。

### FIXED

当不需要的时候缓存设置为 `false`

```js
// router.js 利用 路由元信息来设定是否缓存
meta: {
    keep-alive: false
}
// 然后再路由跳转的时候, 根据这个设定来修改
```

---



## 子组件中 data 为什么必须是函数

在某些情况下, 不同的组件 `data` 使用的数据来源可能是同一个对象, 这个时候就有一个问题, 修改这个共同的数据源, 就会同时影响到两个组件. 所有为了作用域的独立, 在注册组件的时候 `data` 采用了函数的形式. 注册之后会返回一个构造函数, 此时就产生了一个闭包, 保证了组件作用域的独立性.

```js
let obj = {
    name: 'color'
};
```

```js
// 第一个组件
export default {
    data: () => {
        person: obj
    }
};
```

```js
// 第二个组件
export default {
    data: () => {
        friends: [ obj ]
    }
};
```

---



## 虚拟 DOM

[在线文档-简书][1]

[在线文档-cdsn][2]

在已有的标签上利用虚拟 DOM 的原理实现快速更新 html

---



## Nuxt.js

`ssr` 服务的渲染

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 **UI渲染**。

我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。

Nuxt.js 预设了利用Vue.js开发**服务端渲染**的应用所需要的各种配置。

除此之外，我们还提供了一种命令叫：*nuxt generate*，为基于 Vue.js 的应用提供生成对应的静态站点的功能。

我们相信这个命令所提供的功能，是向开发集成各种微服务（microservices）的 Web 应用迈开的新一步。

作为框架，Nuxt.js 为 `客户端/服务端` 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。



---

[1]: https://www.jianshu.com/p/616999666920

[2]: https://blog.csdn.net/qq_27626333/article/details/76082755