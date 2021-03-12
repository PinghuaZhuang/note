# TypeScript

[GitBook][1]

[中午文档][https://typescript.bootcss.com/basic-types.html]



## tsconfig.json

引入typings

```json
"files": [
    "typings/index.d.ts"
  ],
```



## 泛型

```typescript
function test<T>(arg: T): T {
    return arg
}

test<string>('this is string') // 没有必要告诉编译器参数是string, 编译器会自动辨识
test('this is string')
```





## 类

### protected

与 `private` 类似. 但是 `protected` 在子类(派生类)中可以访问. 外部还是访问不到.



## Interface

### 可选属性

```typescript
interface Super {
    color?: String
}
```

### 只读属性

```typescript
interface Super {
    readonly x: number
}
```

### ReadonlyArray\<T\>

TypeScript具有`ReadonlyArray`类型，它与`Array`相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

### 函数类型

```typescript
interface Fn {
    (color: string, name: string): boolean
}

let myFn: Fn = function () {
    // 这里的返回值是 boolean, 函数内部的变量如果没有定义类型. 会根据结果来推测.
}
```

### 接口继承类

```typescript
class Super {}

interface Sub extends Super {}

class SubImp extends Super implements Sub {} 
// 这里的接口 Sub 只检测 SubImp 类.
```





## 类型

### never

`never`类型表示的是那些永不存在的值的类型。 例如，`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是`never`类型，当它们被永不为真的类型保护所约束时。

### 类型断言

```typescript
let someValue: any = 'string'
let strLength: Number = (<string>someValue).length
let strLength: Number = (someValue as string).length
```




## 其他

### !:

告诉浏览器这个参数必须有值



### 类型谓词 str is String

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
