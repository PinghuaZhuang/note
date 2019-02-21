# Layout

布局的注意点



## 自适应布局

### 两栏布局

### 剩余扩充

#### 已知一个元素的高度, 父元素变化, 剩余空间自适应扩充

1. 同时设定定位中的 top 和 bottom 或者 left 和 right.
2. 使用 fixed, 设定 top 值, 固定位置.
3. 使用 border-box, 另外一个元素固定位置
4. 使用 flex 布局

#### 父元素高度知道, 2个元素高度都不确定

1. 使用 flex 布局

```css
.wrap, .top, .bottom {
    width: 100%;
}
.wrap {
    background-color: black;
    height: 500px;
    /* 两个要同时设定 */
    display: flex;
    flex-direction: column;
}
.top {
    background-color: yellow;
    height: 100px;
}
.bottom {
    background-color: blue;
    /* width: 100px; */
    flex: 1;
}
```

### 网格布局

### Flex布局

### 媒体查询

### H5新单位



## 设定常用的常量

+ 主题色

+ z-index: 设定常用的等级. 比如标题 1000 悬浮提示 10000. 



## Footer

## Main

## Header

