# 移动端遇到的问题



## 唤起地图app的方法

```html
<a href="baidumap://map/marker?location=29.539792,106.519852&title=重庆xxxxx科技有限公司&content=重庆xxxx科技有限公司&output=html">百度地图</a>

<a href="http://api.map.baidu.com/marker?location=29.539792,106.519852&title=重庆xxxxx科技有限公司&content=重庆xxxx科技有限公司&output=html">百度地图</a>
```

百度地图和高德地图的经纬度是相反的.



## 点击穿透的问题



## 输入键盘与输入框位置自适应

### 底部固定定位的输入框

在 `ios` 上, 弹出键盘时固定定位会失效. `ios` 对 `fixed` 定位支持不好.

TODO:

还有一个折中的方案是 给input外面的box设置个padding-bottom 触发键盘的时候就不会遮住.

### 中间的输入框



## 横竖屏切换

+ 浏览器自带事件 `orientationchange` 

```js
var updateOrientation = function() {
    var orientation = window.orientation;

    switch(orientation) {
      case 90: case -90:
        orientation = 'landscape';
      break;
      default:
        orientation = 'portrait';
    }

    // set the class on the HTML element (i.e. )
    document.body.parentNode.setAttribute('class', orientation);
  };

  // event triggered every 90 degrees of rotation
  window.addEventListener('orientationchange', updateOrientation, false);
```

+ CSS样式的

```css
@media all and (orientation: portrait) {
  body div { width: 10%; }
}
@media all and (orientation: landscape) {
  body div { width: 15%; }
}
```

+ 定时器判断页面宽高( 不推荐 )

### 注意点:

1. 如果横竖屏切换只是替换样式， 请用第4种.
2. 使用resize会存在一个问题， 在移动端弹出输入法输入框之后，会触发resize ，底部有解决方案