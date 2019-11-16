# TypeScript

[GitBook][1]



## !:

告诉浏览器这个参数必须有值



## 类型谓词 str is String

```js
function isString ( str: any ): str is string {
    return typeof str === 'string';
}

let stra: any;

if ( isString( stra ) ) {
    // 类型谓词: 当 isString 为 true 会将 stra 类型缩小到 string
    console.log( stra.length );
    // error, 下面代码会报错, string 中不存在 xxxxx 属性
    // console.log( stra.xxxxx );
} else {
    // 这个时候为 false 支线, stra 为 any 类型, 可以调用任何属性
    console.log( stra.xxxxx );
}

```





## private

TypeScript 编译之后的代码中，并没有限制 `private` 属性在外部的可访问性



## 基本数据类型

多出一个类型 `void`



### void: 空值

空值. undefined === void(0)

例: 没有任何返回值的函数

```js
function alertName(): void {
    alert('My name is Tom');
}
```



### any: 任意值





---

[1]: https://ts.xcatliu.com/basics/primitive-data-types.html
