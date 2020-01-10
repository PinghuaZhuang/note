# 经验

1. 添加一个 settings 的文件. 便于修改. 例如是否自适应. 是否 mock. 多利用环境变量.
2. 总体原型过一遍. 理解并且划分功能. (虽然麻烦, 但还是要做的.) 有空的化还是要做单元测试.



# Element-UI

使用 element-ui 中遇到的问题.



## loading 的使用

使用mixins或者修饰器. 监听等于 true 的时候, 设置超时时间. 

lib=>decorator



## popover

修复定位偏差的问题

```js
/**
 * @file 用于修复问题
 */

/**
 * 用于修复popover弹窗在小窗口中的样式问题
 * @description
 *  @show="beforeShowTreeL4Popover"
 *  @after-enter="showTreeL4Popover"
 */
export const popoverFix = {
  methods: {
    /**
     * el-popover 显示之前
     * 解决定位偏差为题
     */
    beforeShowTreeL4Popover() {
      document.querySelectorAll(`body > .el-popover`).forEach(ele => {
        ele.style.opacity = '0'
      })
    },
    /**
     * el-popover 显示之后
     * 解决定位偏差为题
     */
    showTreeL4Popover() {
      window.dispatchEvent(new Event('resize'))
      window.setTimeout(_ => {
        let ids = document.querySelectorAll(`.el-table__fixed-body-wrapper .el-popover__reference`)
        if (ids == null) {
          return console.error(`popover error.`)
        }
        ids = Array.from(ids)
        ids = ids.map(el => el.getAttribute(`aria-describedby`))
        document.querySelectorAll(`body > .el-popover`).forEach(ele => {
          if (!ids.includes(ele.id)) {
            ele.style.opacity = '1'
          } else {
            ele.style.display = 'none'
          }
        })

        this.loading = false
      }, 10)
    },
  }
}
```







## el-form

校验的时候, 必须 `prop` 跟字段名以及 `rules` 相同.


![](../images/element-ui-01.png)



## el-select

在使用多选框时候. 选中的时候弹出弹窗, 这个时候回到导致 select 一直处于 focus 状态.

解决办法: 可以在 change 事件中使 `el-select` 元素失焦. 

```js
// el-select 提供的失焦事件.
this.$refs.select.blur()
```



# Vue



## errorHandler
 使用 `vue.config.errorHandler` 来做错误处理

案例:

	1. 路由加载不出来, 清楚本地缓存以及登录信息完成后条状首页.( 待测试 )



## key

 在使用 `router-view` 的使用可以`router.path`来设置 `key` 值


