# Plugins

> 使用插件过程中的细节

[如何写一个JavaScript库][5]

## art-template

引用 `lib/template-web.js` 文件, web 使用. 具体请看 [github][1]

[中文文档][2]

[简书例子][4]

在浏览器中预编译: [art-template][3]

### Start

1. 第一种方法: script 标签 + template

```html
<script id="tpl-user" type="text/html">
	<ul>
		{{each list item}}
		<li>{{ item }}</li>
		{{/each}}
    </ul>
</script>
```

```js
/* global template */
var list = [ '摄影', '电影', '民谣', '旅行', '吉他' ];

// 这里变量必须跟上面对应
var html = template( 'tpl-user', {
    list: list
} );

document.getElementById( 'content' ).innerHTML = html;
```

2. 第二中方法: compile => render

```js
//第二种方法，先编译模版，再向模板添加数据，生成html
//API:template.compile(source, options);  编译模板并返回一个渲染函数。
//注意:可以引用外部的文件作为模板。例如用ajax.get来获取模板
//2.1 把字符串编译成模板
var templateStr = '<p>{{data}}</p>';
var render = template.compile(templateStr);
//2.2 向模板添加数据，组装模板
var html = render({
    data: '这是传过去的数据'
});
//2、3 将编译好的html放到目标位置
document.getElementById('container2').innerHTML = html;
```

3. 第三种方法:  引入外部模板文件渲染

```js
//动态引入外部css
function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
};

//引入外部模板和css
function useTemplate(htmlUrl, cssUrl = '') {
    if(htmlUrl == '') return;
    if(cssUrl) {
        loadCss(cssUrl);
    }
    $.get(htmlUrl, function(data) {
        console.log(data);
        var render = template.compile(data);
        var html = render({content:'这是传过去的提示内容'});
        console.log(html);
        document.getElementById('container3').innerHTML = html;
    });
}

useTemplate('alert_template.html', 'alert_template.css');

setTimeout(function() {
    $('.please-login-mask').css('display', 'block');
}, 1000);
```



---



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

---



## Eruda

[GitHub][6]

移动端模拟控制台打印的调试插件.

![](../images/Eruda.jpg)

---

[1]: https://github.com/aui/art-template
[2]: https://aui.github.io/art-template/zh-cn/docs/
[3]: http://aui.github.io/art-template/zh-cn/webpack/
[4]: https://www.jianshu.com/p/183eca899ad7
[5]: https://mp.weixin.qq.com/s/Kx335LCx3VN9AZRjizBu-A
[6]: https://github.com/liriliri/eruda

