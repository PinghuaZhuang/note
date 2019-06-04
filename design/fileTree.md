# 目录树

+ dist

+ doc

  + TODO.md
  + API.md

+ test

+ static

  + images
  + mork-data

+ src

  + less
    + mixins.less
    + base.less
    + index.less
    + var.less
    + element-ui
      + button
    + theme
  + model
    + class
      + abs
    + event
    + var
    + mork
  + control // 页面逻辑, 一帮写在 vue 文件上
    + var
  + var // 定义全局变量对象.
  + share // 工作组件
    + icons
    + dialog // 自定义弹窗, 要动画
    + baseUI
      + txt
      + icon-txt 
    + loading // 组件切换的时候显示, 加载慢
  + test
  + asset // 资源包
  + lib // 依赖包, 没有使用 npm 的依赖包
  + utils // 公用函数库

  - config
    - key-map
  - api
    - index.js
    - url.js



## utils

+ Storage
+ cookie
+ download
+ index // 全局方法, isAuth 等



## dialog

最外层要套一层.

+ alert
+ confirm
+ custom-dialog // 需要自适应



## 网页自适应方案

需求: 在大屏的时候要求使用百分比, 宽高自适应, 字体使用 vw, 其他看情况. 在小屏字体最小使用 14px.

1. 定义一个方法在使用到的时候全部使用该方法来设定尺寸.

```less
@media only screen and (max-width: 1366px) {
    @value:if((@px<=32), @min*1px, .px2vw(@px)[@result]);
    min-height: @value;
}
@media (min-width: 1367px) and (max-width: 1600px) {
    @value: .px2vw(@px)[@result];
    min-height: @value;
}
@media (min-width: 1601px) and (max-width: 1920px) {
    @value: .px2vw(@px)[@result];
    min-height: @value;
}
```

2. 媒体查询 + rem.