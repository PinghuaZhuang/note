# Stamp

利用开闭原则做标记.

example:

```js
if ( window.status === 'ready' ) {
	// do something...
}
```



```js
// 添加描述, detail
var status = new Stamp( 'window status' );

// 第一次订阅 ready, 直接触发
// 不是第一次, 当且仅当状态变化触发
status( 'ready' ); 
status.add( 'ready', fn );
...
```

