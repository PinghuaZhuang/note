# Vue



## 数组相关

#### 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

2. 当你修改数组的长度这个属性时，例如：`vm.items.length = newLength`



#### Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`



---



## Render

`Vue` 中, 使用 `render` 函数渲染是非常快的, 例如修改 `li` 标签顺序的时候. 就可以动态生成标签字符串去修改

---



# keep-alive

页面缓存

### keys

+ include: 不包含

### FIXED

当不需要的时候缓存设置为 `false`

```js
// router.js
meta: {
    
    // true: 缓存
    keep-alive: false
}
```

---



## 在子组件中 data 为什么必须是函数

在某些情况下, 不同的组件 `data` 使用的数据来源可能是同一个对象, 这个时候就有一个问题, 修改这个共同的数据源, 就会同时影响到两个组件. 所有为了作用域的独立, 在注册组件的时候 `data` 采用了函数的形式. 注册之后会返回一个构造函数, 此时就产生了一个闭包, 保证了组件作用域的独立性.

```js
let obj = {
    name: 'color'
};
```

```js
// 第一个组件
export default {
    data: () => {
        person: obj
    }
};
```

```js
// 第二个组件
export default {
    data: () => {
        friends: [ obj ]
    }
};
```

---



## 虚拟 DOM



---



## VUEX



---

