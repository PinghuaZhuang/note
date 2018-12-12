# datatables

[官方文档][1]

记录常用的一些方法



## 依赖

+ jQuery



## QuickStart

```js
$table.DataTable( {
    data: data, // 数据, 二元数据
    scrollX: false, // 控制水平方向是否滚动
    searching: false, // 是否开启搜索栏
    paging: false, // 是否开始分页
    ordering: false, // 是否默认排序
    info: false, // 是否显示信息
    autoWidth: false, // 列宽度是否自适应宽度
    stateSave: true, // 是否保存表格的状态, 页码
    columns: [ // 列配置
        { "width": "40%" }, // 自定义宽度
        { "width": "20%" },
        { "width": "20%" },
        { "width": "20%" }
    ]
});
```



## Method

+ destory: 删除 datatable 实例, 格式化表格还需要删除 html 代码.
+ draw: 当您执行添加或删除行，更改表的排序，过滤或分页这些操作时，你将希望DataTables更新显示以反映这些更改，这个方法提供此功能。
+ data: 获取表格所有数据. 伪数组
+ cells: 选中单元格
+ columns: 选中列
+ rows: 选中行



## 去除弹窗警告

```js
$.fn.dataTable.ext.errMode = 'none';
```





---

[1]: http://www.datatables.club/reference/	"官方文档"