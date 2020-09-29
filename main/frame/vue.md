# Vue

- 都有支持native的方案,React的React native,Vue的weex
- 在使用 js 来传递图片路径的时候, 要添加上全局的根路径, 否则部署的时候会出现问题.
  
  - 在使用 v-bind:src 的时候可以使用 require 来获取图片. transformAssetUrls可以配置. 
  



## VueCli-3.0 配置代理

设置代理的时候不能使用 before 钩子.

```js
export.module = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://dev.npush-php.uheixia.com',
        changeOrigin: true,
        secure: false,
        // pathRewrite: {},
      },
    },
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js')
  },
}
```



## v-bind

作为根标签使用

```vue
<!-- border 外部不能修改 -->
<el-table 
	boder
	v-bind="$attrs"
/>

<!-- border 可以修改 -->
<el-table 
	
	v-bind="{
		boder: true,
		...$attrs,
	}"
/>
```



## $slots 与 $scopedSlots 区别

+ $slots 访问作用于分发的内容
+ $scopedSlots 访问作用域插槽

修改 $slots  在实例渲染后更改后, 是没有效果的. 如果要修改, 有2种方式. 

1. 在render函数中修改. 
2. 在函数式编程下, 手动挂载之前修改. 

```jsx
vm.$slots.default = (<div>aaa</div>)
vm.$mounted()
document.appendChild(vm.$el)
```





## TransformAssetUrls

在模板编译过程中，编译器可以将某些特性转换为 `require` 调用，例如 `src` 中的 URL。

```js
// 默认值
{
  video: ['src', 'poster'],
  source: 'src',
  img: 'src',
  image: ['xlink:href', 'href'],
  use: ['xlink:href', 'href']
}
```



## CSS module

[官方文档][https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95]

首先，CSS Modules 必须通过向 css-loader 传入 modules: true 来开启：

```js
// webpack.config.js
{
  module: {
    rules: [
      // ... 其它规则省略
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              modules: true,
              // 自定义生成的类名
              localIdentName: '[local]_[hash:base64:8]'
            }
          }
        ]
      }
    ]
  }
}
```
然后在你的 <style> 上添加 module 特性：

```vue
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```

使用

```vue
<script>
export default {
  created () {
    console.log(this.$style.red)
    // -> "red_1VyoJ-uZ"
    // 一个基于文件名和类名生成的标识符
  }
}
</script>
```



## $refs 获取为空

由于子组件是异步加载. 会导致父组件在mouted里面$refs获取不到子组件实例. 原因是由于子组件异步加载里面执行了一次宏任务. 

```js
// 父组件
export default {
    mounted() {
        window.setTimeout(_ => {
            console.log(this.$refs.child)
        }, 0)
    }
}
```



## Vue-Styleguidist 编写组件文档

[介绍][3] [github][4] [官方文档][5]



## 内联模板 inline-template

当 `inline-template` 这个特殊的 attribute 出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活。

当然也可以使用 x-template.

```vue
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```



## 监听生命周期

```vue
mounted: function () {
  this.attachDatepicker('startDateInput')
  this.attachDatepicker('endDateInput')
},
methods: {
  attachDatepicker: function (refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  }
}
```



## Vue 项目模板

+ vue-element-admin
+ renren-fast-vue



## Computed

### 缓存

```js
computed: {
    // 通过这个方式去获取子组件或者dom元素
    wrapRef: {
      cache: false,
      get() {
        return this.$refs.wrap || {}
      },
    },
},
```





## 动态加载文件

```js
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
```



## 在路由中, 也可以使用 get, set

```js
{
    path: '/taskDetail',
    name: 'taskDetail',
	component: () => import('@/views/task/taskDetail.vue'),
	meta: {
		get title() { return $t("routesMeta.taskDetail") }
	},
},
```





## 添加全局 less 文件

```bash
npm install sass-resources-loader --save-dev
```

./build/utils.js

```js
function lessResourceLoader() {
    var loaders = [
      cssLoader,
      'less-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/style/common.less'),
          ]
        }
      }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
}

// ...

return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: lessResourceLoader('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
}
```

vue cli 3.0

```js
// 全局使用 less 变量的方法
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/less/params'),
            ],
        })
}

chainWebpack: config => {
    // 全局映入 less 文件
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
}
```





## 禁用继承

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
		// 手动绑定
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```





## v-for

在使用 v-for 渲染的时候, 数据源发生改变, 是有可能不会触发页面刷新的. 需要手动刷新. `this.$forceUpdate()`

---



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

+ 在本地保存路由配置.
+ 再次请求获取路由配置, 添加路由.

### meta 路由元信息

在路由配置中可以配置 meta 字段, 来传递数据

例如, keep-alive 页面是否要缓存, 需要一个关键字来判断, 在路由跳转的时候可以藉由这个关键字来判断.

---



## 强制更新

在使用 v-for 渲染的时候, 修改 item 值后, v-if 作用的内容不会发生变异

原因: 层级太深

解决方法: 强制重新渲染组件

```js
// 强制渲染
this.$forceUpdate();  
```

---



##  修改 UI 框架的样式

+ `/deep/`: 注意：使用 sass 和 less 只能使用 /deep/ 这个方法
+ ::v-deep. 新的表示. vue3.0 不识别 /deep/

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

[所有相关插件][6]

`transform-vue-jsx`

安装一下插件:

"babel-plugin-syntax-jsx": "^6.18.0",

"babel-plugin-transform-vue-jsx": "^3.5.0", render函数使用jsx语法

```bash
babel-plugin-vue-jsx-sync # sync 语法糖
babel-plugin-jsx-vue-functional # 函数语法糖
babel-plugin-jsx-v-model # v-model语法糖
```

"babel-helper-vue-jsx-merge-props": "^2.0.3",

"babel-plugin-jsx-event-modifiers": 修饰符

jsx 中也可以使用空模板 template

// vue-cli 3.0 使用jsx

cnpm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-es2015 --save-dev

```powershell
npm i @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props --save
```

### jsx 中使用v-model

"babel-plugin-jsx-v-model", "jsx-v-model"

```json

{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx","transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"], // 重点是这行
      "plugins": ["istanbul"]
    }
  }

```



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



## vuex实现数据持久化

安装插件vuex-persistedstate.



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

***只能用来包裹动态组件***

**在使用 `router-view` 的使用可以`router.path`来设置`key`值.**

### 属性

- `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。

- `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。

  使用 name 匹配的时候, 必须与  组件的那么值一致.

  优先匹配 组件 name 值, 其次是组件的局部注册名, 匿名组件不能被匹配.

- `max` - 数字。最多可以缓存多少组件实例。

### FIXED

当不需要的时候缓存设置为 `false`

当一个标签页打开 b 路由, 退回到 a 路由, 在新标签打开 b 路由, 显示的内容是缓存的. 可以利用 vuex 来保存转态来判断是否缓存.

include 和 exclude 匹配的是组建名

```js
// router.js 利用 路由元信息来设定是否缓存
meta: {
    keepAlive: false
}
// 然后再路由跳转的时候, 根据这个设定来修改
```

```vue
<keep-alive :include="this.$route.mate.keepAlive ? 'cus' : '' ">
    <router-view />
</keep-alive>
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
[3]: https://www.jianshu.com/p/e6745ed87563
[4]: https://github.com/vue-styleguidist/vue-styleguidist
[5]: https://vue-styleguidist.github.io/docs/GettingStarted.html
[6]: https://ssr.mmxiaowu.com/article/5a4c9579c1cae068a4cf61f9
[https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95]: 