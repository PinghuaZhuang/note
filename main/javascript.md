## 解决四：惰性函数

不错，惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。

```
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
};
```

关于 never 有如下特性：

- 在一个函数中调用了返回 never 的函数后，之后的代码都会变成`deadcode`

```
function test() {
  foo();    // 这里的foo指上面返回never的函数
  console.log(111);  // Error: 编译器报错，此行代码永远不会执行到
}
```

- 无法把其他类型赋给 never。

```
let n: never;
let o: any = {};
n = o;  // Error: 不能把一个非never类型赋值给never类型，包括any
```

关于 never 的这个特性有一些很 hack 的用法和讨论，比如这个知乎下的尤雨溪的回答：https://www.zhihu.com/question/354601204/answer/888551021。



## 	Unicode 转 中文

```js
unescape
```

