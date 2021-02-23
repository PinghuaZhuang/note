# LODASH



## propertyOf/property 路径<=>值

```js
var array = [0, 1, 2],
    object = { 'a': array, 'b': array, 'c': array };
 
_.map(['a[2]', 'c[0]'], _.propertyOf(object));
// => [2, 0]
 
_.map([['a', '2'], ['c', '0']], _.propertyOf(object));
// => [2, 0]
```

```js
var objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];
 
_.map(objects, _.property('a.b'));
// => [2, 1]
 
_.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
// => [1, 2]
```



## toPath 转化 value 为属性路径的数组

```js
_.toPath('a.b.c');
// => ['a', 'b', 'c']
 
_.toPath('a[0].b.c');
// => ['a', '0', 'b', 'c']
```



## sum/subtract/multiply/divide 加减乘除

不精确.



## cloneDeep/cloneDeepWith 深拷贝

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false

function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(true);
  }
}
 
var el = _.cloneDeepWith(document.body, customizer);
 
console.log(el === document.body);
// => false
console.log(el.nodeName);
// => 'BODY'
console.log(el.childNodes.length);
// => 20
```



## snakeCase 拼接字符

```js
_.snakeCase('Foo Bar');
// => 'foo_bar'
 
_.snakeCase('fooBar');
// => 'foo_bar'
 
_.snakeCase('--FOO-BAR--');
// => 'foo_bar'
```



## cameCase  驼峰命名

驼峰命名

```js
_.camelCase('Foo Bar');
// => 'fooBar'
 
_.camelCase('--foo-bar--');
// => 'fooBar'
 
_.camelCase('__FOO_BAR__');
// => 'fooBar'
```



## 防抖和节流的区别

节流是在函数执行后, 进过一定时间才能执行第二次. 

防抖是在一定时间内只能执行一次, 重复执行.  (在lodash中, 重复执行会一直延后. 需要设置 maxWait 值.)



## throttle 节流函数

```js
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 
// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
 
// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```



## debounce 防抖

1. `func` *(Function)*: The function to debounce.
2. `[wait=0]` *(number)*: The number of milliseconds to delay.
3. `[options={}]` *(Object)*: The options object.
4. `[options.leading=false]` *(boolean)*: 超时后是否执行.
5. `[options.maxWait]` *(number)*: 设置超时时间. 默认无限
6. `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge of the timeout.

```js
// 源码等待的条件, 所有在快速频繁的调用下, 必须设定 maxWait
// 频繁调用会导致 timeSinceLastCall < wait 一直成立, 每次都会等待.
// 成立一个就会等待, 不执行.

// 没有设置 maxWait 会在重复执行中, 一直触发延迟. 所有一直不会执行. 
(lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
```

```js
// 当 20ms 重复一次, 这个时候就要设定 maxWait
let fn1 = debounce( fn, 1000, { maxWait: 1000 } )
```

