# Plugins

> 使用插件过程中的细节



## requireJS

### 避免网页失去响应

```html
<script src="js/require.js" defer async="true" data-main="./main.js" ></script>
```

async: IE 浏览器不支持, 使用 defer. 

### 属性

+ waitSeconds: 延迟

+ baseUrl

+ paths

+ shim: 设置不支持 AMD 的第三方插件

  ```js
  // example: 
  shim: {
  	bootstrap: {
  		exports: 'bootstrap'
  	}
  }
  ```



## Eruda

[GitHub][https://github.com/liriliri/eruda]

移动端模拟控制台打印的调试插件.