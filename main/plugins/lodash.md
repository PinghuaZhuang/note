# LODASH



## debounce

1. `func` *(Function)*: The function to debounce.
2. `[wait=0]` *(number)*: The number of milliseconds to delay.
3. `[options={}]` *(Object)*: The options object.
4. `[options.leading=false]` *(boolean)*: 超时后是否执行.
5. `[options.maxWait]` *(number)*: 设置超时时间. 默认无限
6. `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge of the timeout.

```js
// 源码调用条件, 所有在快速频繁的调用下, 必须设定 maxWidth
// 频繁调用会导致 timeSinceLastCall < wait 一直成立, 每次都会等待.
(lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
```

