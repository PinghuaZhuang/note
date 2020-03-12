# element

使用 elment-ui 的过程中遇到的一些问题. 



## el-popover 

### 位置偏移的问题

```vue
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





## el-table

###  懒加载的模式下, 不能快速点击未加载的数据

bug原因: 由于treeData的更新是队列方式, 异步更新. 造成loadData的时候获取到对象非响应对象. (oldTreeData), 此时修改treeData状态是不响应的.(修改的不是同一个对象, 是computed计算出来的,)

解决办法:

```js
export default {
    methods: {
        load(tree, treeNode, resolve) {
            setTimeout(() => {

                resolve([
                        {
                            id: this.count++,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: this.count++,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }
                    ])

                // 修复懒加载不能快速点击的问题
                this.$nextTick(_ => {
                    const states = this.$refs.table.store.states
                    const treeData = states.treeData
                    const row = treeData[tree.id]
                    row.loaded = true
                    row.expanded = true
                    row.loading = false
                })

            }, 2000)
        }
    }
}
```



## el-input 

### 限制了双向绑定为 input 了

使用修饰符 .lazy 无效. 还是 input 触发方式.

:value @change 是不行的 :value @input @change 是可行的. 



### 限制只输入数字

```vue
<lk-input
	v-model="value"
	@change="handleChange"
	oninput="value = value.replace(/[^\d]/g, '')"
	:placeholder="iPlaceholder"
/>
```

