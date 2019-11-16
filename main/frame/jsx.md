# JSX 语法

`jsx` 语法是 `react` 引入的一种语法扩展. 方便的来描述 UI



## props

## children

## refs



## 语法

1. 最外层必须有一个包裹层. 

```jsx
render () {
    return <div class="wrap">
        <span>必须有包裹层</sapn>
    </div>
}
```

2. `{}` 执行 `js` 代码

> 注意: 跟 vue 模板语法是 {{}}, 这里是 {}. 规则与模板语法是一样的, 不能使用 if else 但是可以使用 三元运算符.等操作

```jsx
render () {
	return <div class="wrap">
        <span>{ color === 'green' ? 'green' : 'blue' }</sapn>
        { 
        	/* 推荐使用的注释 */
        }
    </div>
}
```

3. 循环创建标签

```jsx
render () {
    
    var lis: Array<JSX.Element> = [], i = 0;
    for ( ; i < 10; i++ ) {
        lis.push( <li>{ i }</li> )
    }

	return <div class="wrap">
        <span>{ color === 'green' ? 'green' : 'blue' }</sapn>
        { 
        	/* 推荐使用的注释 */
            
            lis
        }
    </div>
}
```

