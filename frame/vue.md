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

+ include
+ 

### FIXED

```js
// router.js
meta: {
    
    // true: 缓存
    keep-alive: true
}
```

---

