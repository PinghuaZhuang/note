# React

[中午文档][1]

[路由器属性][3]



## 全家桶

+ react
+ redux
+ react-router



## API

componentWillReceiveProps => watch

componentDidMount => mouted

componentWillUnmount => beforeMounted

shouldComponentUpdate  => 是否更新组件

componentWillUpdate => beforeUpdate

componentDidUpdate => updated

<React.Fragment>  </React.Fragment> 空标签


## React Component

+ static getDerivedStateFromProps()



## 路由 react-router 

[文档][2]

React Router被拆分成三个包：`react-router`,`react-router-dom`和`react-router-native`。`react-router`提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。

进行网站（将会运行在浏览器环境中）构建，我们应当安装`react-router-dom`。`react-router-dom`暴露出`react-router`中暴露的对象与方法，因此你只需要安装并引用`react-router-dom`即可。

```bash
npm install --save react-router-dom
```



### BrowserRouter  与 HashRouter

BrowserRouter 是动态路由, 最为常用. `<HashRouter>` 使用 URL 的 `hash` 部分（即 `window.location.hash`）来保持 UI 和 URL 的同步.

|             属性              |                                                              |
| :---------------------------: | :----------------------------------------------------------: |
|       basename<String>        |                            根路径                            |
|     forceRefresh<Boolean>     | 如果为 `true` ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。 |
| getUserConfirmation<Function> | 用于确认导航的函数，默认使用 [window.confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)。例如，当从 `/a` 导航至 `/b` 时，会使用默认的 `confirm` 函数弹出一个提示，用户点击确定后才进行导航，否则不做任何处理。译注：需要配合 `<Prompt>` 一起使用。 |
|       keyLength<Number>       |             `location.key` 的长度，默认为 `6`。              |
|        children<Node>         | 要呈现的[单个子元素（组件）](https://reactjs.org/docs/react-api.html#react.children.only)。 |

### 使用

在使用路由之前必须先加载路由器才可以使用, 类似于 VUE 中的 `< router-view / >`, 然后再内部注册路由.

### 注册路由

```jsx
<Route path="/" component={ Home }></Route>
```

### 路由重定向  Redirect



### Switch  的使用

使用 `<Switch>` 只会匹配一条路由. 

### 标签属性

|   属性    |                          |
| :-------: | :----------------------: |
|   path    |       要匹配的路由       |
| component | 当匹配到的时候渲染的页面 |
|   exact   |       是否精确匹配       |

### withRouter

withRouter 是一个[高阶组件](https://link.juejin.im/?target=https%3A%2F%2Freactjs.org%2Fdocs%2Fhigher-order-components.html)，把 match，location，history 三个对象注入到组件的 props 中。这是一个非常实用的函数.

在前面我们说过 Route 是组件，路由表是不断变化的。在项目中使用了 redux 来管理数据，当数据没有变化时，组件也就不会重新渲染。假设在组件中某个 Route 组件并未被渲染，数据也未发生变化，即便当前页面的链接发生了变化，也不会有任何的路由匹配该链接。因为这时候 Route 组件还是未被渲染！如何知道链接变化了呢？这时候就需要 withRouter 了。

```jsx
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
```

### Link

为你的应用提供声明式的、可访问的导航链接。

```jsx
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
<Link to={{
  pathname: '/courses', // 要链接到的路径
  search: '?sort=name', // 查询参数
  hash: '#the-hash', // URL 中的 hash，例如 #the-hash
  state: {
    fromDashboard: true // 存储到 location 中的额外状态数据
  }
}} />

// 传递其他参数
<Link to="/" className="nav" title="a title">About</Link>
```

|        属性        |                                                              |
| :----------------: | :----------------------------------------------------------: |
| to<Object\|String> |                           目标链接                           |
|  replace<Boolean>  | 当设置为 `true` 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。默认为 `false`。 |
| innerRef<Function> |                   允许访问组件的底层引用。                   |
|       others       | 你还可以传递一些其它属性，例如 `title`、`id` 或 `className` 等。 |





## 状态管理 redux 





---

[1]: https://react.css88.com/docs/getting-started.html
[2]: https://segmentfault.com/a/1190000010174260
[3]: https://www.jianshu.com/p/b117b437dc5a