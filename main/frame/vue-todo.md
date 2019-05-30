# VUE-TODO



## renderError 

全局混入, 来方便捕获编译错误的组件.



## performance

vue 调试工具打开性能/时间线的调试.



## directive

1. 可以写动画.
2. 可以用来绑定样式, 例如 v-width v-bgc 等等. 



## functional

组件无状态, 只接受 props 不会响应数据.



## $scopedSlots

访问插槽作用域. 

```js
{ [name: string]: props => Array<VNode> | undefined }
```



## $attrs

在父组件没有声明 props 的时候, 可以通过 `v-bind="$attrs"` 传入内部组件



## v-slot

缩写: # 2.6

只能在调用的组件上面使用. 



## is

```html
<table>
  <tr is="my-row"></tr>
</table>
```

