# React

[中午文档][1]

[路由器属性][3]

这些use其实都一样样.

## useReducer

## useState

useState 会返回一对值：当前状态和一个让你更新它的函数

```js
import React, { useState } from 'react'
```



## useCallback | useMemo

`useCallback(fn, inputs)` === `useMemo(() => fn, inputs)`)

useCallback 的真正目的还是在于缓存了每次渲染时 inline callback 的实例

React.memo 



## useRef | createRef

useRef 并不再单单是为了 DOM 的 ref 准备的，同时也会用来存放组件实例的属性.

useRef : 返回固定的地址值. 每次都会返回一个新的地址.



## useEffect | useLayoutEffect

<p>如果希望 <code>effect</code> 较少运行，可以提供第二个参数 - 值数组。 将它们视为该<code>effect</code>的依赖关系。 如果其中一个依赖项自上次更改后，<code>effect</code>将再次运行。</p>

<p>使用<code>useEffect</code>，可以直接在函数组件内处理生命周期事件。 如果你熟悉 React class 的生命周期函数，你可以把 <code>useEffect</code> Hook 看做 <code>componentDidMount</code>，<code>componentDidUpdate</code> 和 <code>componentWillUnmount</code> 这三个函数的组合。来看看例子：</p>

<p>如果想执行只运行一次的 <code>effect</code>（仅在组件挂载和卸载时执行），可以传递一个空数组（<code>[]</code>）作为第二个参数。这就告诉 React 你的 <code>effect</code> 不依赖于 <code>props</code> 或 <code>state</code> 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。</p>

useLayoutEffect: 在render后立马执行. useEffect 在队列中执行. 



## 插槽-children

默认的插槽

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

类似于插槽

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

## 全家桶

+ react

+ redux

  reducer 其实是在下次 render 时才执行的，所以在 reducer 里，访问到的永远是新的 props 和 state

+ react-router



# React Component

+ static getDerivedStateFromProps()



## hooks

componentWillReceiveProps => watch

componentDidMount => mouted

componentWillUnmount => beforeMounted

shouldComponentUpdate  => 是否更新组件

componentWillUpdate => beforeUpdate

componentDidUpdate => updated

<React.Fragment>  </React.Fragment> 空标签



## 错误边界

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
    
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
	
  // 改捕获到异常
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```



## Context provider

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```





# React-router 

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



# React-redux 





# React.lazy

1. 引入组件.

   ```jsx
   const OtherComponent = React.lazy(() => import('./OtherComponent'));
   ```

2. jsx中使用组件, 然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等).
   fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。

   ```jsx
   import React, { Suspense } from 'react';
   
   const OtherComponent = React.lazy(() => import('./OtherComponent'));
   
   function MyComponent() {
     return (
       <div>
         <Suspense fallback={<div>Loading...</div>}>
           <OtherComponent />
         </Suspense>
       </div>
     );
   }
   ```



---

[1]: https://react.css88.com/docs/getting-started.html
[2]: https://segmentfault.com/a/1190000010174260
[3]: https://www.jianshu.com/p/b117b437dc5a