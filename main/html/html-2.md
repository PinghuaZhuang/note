

## pushState replaceState

> `history.pushState()` 或 `history.replaceState()` 不会触发 `popstate` 事件

## document.body.scrolltop

页面设置了 DTD 的时候, `document.body.scrolltop` 获取不到数据. 应该使用 `document.documentElement.scrollTop`;

> 页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement
>
> 页面没有DTD，即没指定DOCTYPE时，使用document.body

## 表单元素 input 回车(enter)自动提交的触发

1. 只有一个 `input`, 并且 `type="text"`, 并且没有不合规范的参数(不要出现[object Oject]). 
2. 有 `type="submit"` 的按钮, 任意的 `input` 回车都可以触发. 

## load ready 事件

DOMContentLoaded



# 监听dom元素是否在viewport内

可视区域

https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver

```js
var intersectionObserver = new IntersectionObserver(function(entries) {
  // If intersectionRatio is 0, the target is out of view
  // and we do not need to do anything.
  if (entries[0].intersectionRatio <= 0) return;
}, {
    // 可见区域一半
    threshold: 0.5
});
// start observing
intersectionObserver.observe(document.querySelector('.scrollerFooter'));
```



# URL 拼接 path.join

```js
pathJoin(...rest) {
    const parths = rest.join('/')
    return parths
      // '//' '/./' => '/'
      .replace(/((?<!\:)\/(\/)+)|(\/+\.\/+)/g, '/')
      // '/*/../' => '/'
      .replace(/\/[^\/]*?\/\.\.\//g, '/')
  },
```



# 页面生命周期

https://developers.google.com/web/updates/2018/07/page-lifecycle-api#events

```js
const getState = () => {
  if (document.visibilityState === 'hidden') {
    return 'hidden';
  }
  if (document.hasFocus()) {
    return 'active';
  }
  return 'passive';
};
```

```js
// Stores the initial state using the `getState()` function (defined above).
let state = getState();

// Accepts a next state and, if there's been a state change, logs the
// change to the console. It also updates the `state` value defined above.
const logStateChange = (nextState) => {
  const prevState = state;
  if (nextState !== prevState) {
    console.log(`State change: ${prevState} >>> ${nextState}`);
    state = nextState;
  }
};

// These lifecycle events can all use the same listener to observe state
// changes (they call the `getState()` function to determine the next state).
['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach((type) => {
  window.addEventListener(type, () => logStateChange(getState()), {capture: true});
});

// The next two listeners, on the other hand, can determine the next
// state from the event itself.
window.addEventListener('freeze', () => {
  // In the freeze event, the next state is always frozen.
  logStateChange('frozen');
}, {capture: true});

window.addEventListener('pagehide', (event) => {
  if (event.persisted) {
    // If the event's persisted property is `true` the page is about
    // to enter the Back-Forward Cache, which is also in the frozen state.
    logStateChange('frozen');
  } else {
    // If the event's persisted property is not `true` the page is
    // about to be unloaded.
    logStateChange('terminated');
  }
}, {capture: true});
```

