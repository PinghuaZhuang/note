# event 事件相关



## 鼠标左键按住不放事件

`onmousedown`

​	通过 `event.button` 来判断

### 不同浏览器下的 event.button 值

+ IE下
  没有按键动作的时候 window.event.button = 0
  左键是 window.event.button = 1
  中键是 window.event.button = 4
  右键是 window.event.button = 2
+ Firefox下
  没有按键动作的时候 event.button = 0
  左键是 event.button = 0
  中键是 event.button = 1
  右键是 event.button = 2

---

