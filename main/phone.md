# 移动端遇到的问题



## 点击穿透的问题



## 输入键盘与输入框位置自适应



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