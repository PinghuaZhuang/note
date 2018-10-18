# DATA

window._Data = Data;



## 使用数据解除还是发布订阅?

### 发布订阅

```js
// 基于 $.Callback 使用( 抽离 )
// Callback 返回一个对象的方法 sub
var data = new Data();

// option{ String | Object }: 设定, fns { Array }: 回调
// option: type detail [ debounce defer ] onlyChange
data.register( 'name' [, option, fns] );

// 保存注册的数据
data._data = { };

// 根据参数个数返回对应值设置值
// 参数最多一个
data[ name ] => function; 

// 拥有某些方法
// 浅拷贝
data[ name ].__proto__ === $.Callback();
data[ name ].remove();
data[ name ].empty();
data[ name ].add();
data[ name ].has();
// data[ name ].fire();		// set 的时候默认调用. data[ name ]( 1 );
// 指定上下文, 默认 data[ name ], data[ name ].call( context )
// data[ name ].fireWith();	

// 要添加的方法
data[ name ].sub();
data[ name ].destory();
data[ name ].pre();
// data[ name ].debounce( 1000 );

```





### 数据劫持

Data._data = { };