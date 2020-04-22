# 高级语法

## 对象设置set, get

```js
var a = {
    get name() {},
    set name() {},
}
```



## 函数

```js
function fn(...rest) {
    console.log(...rest)
}
fn`abc${11}b ${22}`
// => ['abc', 'b ', raw<array>], 11, 22
```



## 字符

### 填充

字符串填充`padStart()`和`padEnd()`

```js
String.padStart(targetLength, padding)

'Vue'.padStart(10)           //'       Vue'
'React'.padStart(10)         //'     React'
'JavaScript'.padStart(10)    //'JavaScript'
```

## for of 遍历器

上面代码中，字符串`text`只有一个字符，但是`for`循环会认为它包含两个字符（都不可打印），而`for...of`循环会正确识别出这一个字符。

```js
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

