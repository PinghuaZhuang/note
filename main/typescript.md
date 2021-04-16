# TypeScript

[在线文档](https://ts.xcatliu.com/basics/declaration-files.html#declare-module)



## 全局申明文件

#### 三斜线指令

1. 当我们在**书写**一个全局变量的声明文件时
2. 当我们需要**依赖**一个全局变量的声明文件时

types 申明依赖

```ts
// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
```

### 自动生成声明文件[§](https://ts.xcatliu.com/basics/declaration-files.html#自动生成声明文件)

如果库的源码本身就是由 ts 写的，那么在使用 `tsc` 脚本将 ts 编译为 js 的时候，添加 `declaration` 选项，就可以同时也生成 `.d.ts` 声明文件了。

我们可以在命令行中添加 `--declaration`（简写 `-d`），或者在 `tsconfig.json` 中添加 `declaration` 选项。这里以 `tsconfig.json` 为例：

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```

## 越界的元素[§](https://ts.xcatliu.com/advanced/tuple.html#越界的元素)

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```ts
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

## 常数枚举[§](https://ts.xcatliu.com/advanced/enum.html#常数枚举)

常数枚举是使用 `const enum` 定义的枚举类型：

```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。



## declare

之前提到过，`declare` 定义的类型只会用于编译时的检查，编译结果中会被删除。

上例的编译结果是：



## 类

一个类可以实现多个接口：

## 接口继承类[§](https://ts.xcatliu.com/advanced/class-and-interfaces.html#接口继承类)

常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：

```ts
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型约束[§](https://ts.xcatliu.com/advanced/generics.html#泛型约束)

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```



## 接口定义函数

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```



```ts
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}
```

## 泛型参数的默认类型[§](https://ts.xcatliu.com/advanced/generics.html#泛型参数的默认类型)

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```