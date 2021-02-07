# Html window

记录跟 html 有关的知识.



## Script 标签在线引用文件

```html
<script type="module">
  import { h, Component, render } from 'https://unpkg.com/preact?module';

  // Create your app
  const app = h('h1', null, 'Hello World!');

  render(app, document.body);
</script>
```



## blob 转 Windw.URL 

file-saver: 插件.

```js
window.URL.createObjectURL(blob)
```



## Buffer 转 base64

```js
/**
 * Buffer 转 base64
 * @param { Buffer } buffer
 */
export function transformArrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
```



## base64 转 blob

```js
/**
 * base64 编码转成 Blob
 * @param { Base64 } dataURI
 * @return { Blob }
 */
export function dataURIToBlob(dataURI) {
  let binStr = atob(dataURI.split(',')[1])
  let len = binStr.length
  let arr = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr])
}
```



## Buffer 转 blob

```js
const blob = new Blob([new Buffer(response.data.data)], { type: 'application/vnd.ms-excel' })
```



## MIME API

```js
data:,文本数据

data:text/plain,文本数据

data:text/html,HTML代码

data:text/html;base64,base64编码的HTML代码

data:text/css,CSS代码

data:text/css;base64,base64编码的CSS代码

data:text/javascript,Javascript代码

data:text/javascript;base64,base64编码的Javascript代码

data:image/gif;base64,base64编码的gif图片数据

data:image/png;base64,base64编码的png图片数据

data:image/jpeg;base64,base64编码的jpeg图片数据

data:image/x-icon;base64,base64编码的icon图片数据

data:application/vnd.ms-excel;base64 xlsxs格式数据

1.txt       data:text/plain;base64,

2.doc     data:application/msword;base64,

3.docx   data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,

4.xls      data:application/vnd.ms-excel;base64,

5.xlsx    data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,

6.pdf     data:application/pdf;base64,

7.pptx   data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,

8.ppt     data:application/vnd.ms-powerpoint;base64,

 

 

图片

1.png      data:image/png;base64,

2.jpg       data:image/jpeg;base64,

3.gif        data:image/gif;base64,

4.svg      data:image/svg+xml;base64,

5.ico       data:image/x-icon;base64,

6.bmp     data:image/bmp;base64, 
```



## 获取字符串长度

```js
function(str) {
  return str.replace(/[\u0391-\uFFE5]/g,"aa").length;  //先把中文替换成两个字节的英文，在计算长度
}
```



## 判断文本是否溢出

判断文本是否溢出, 显示三个省略号.

```js
let cHeight = noWrapDiv.clientHeight;
let sHeight = noWrapDiv.scrollHeight;
if ( sHeight > cHeight ) {
    console.log( "已经溢出显示省略号" );
} else {
    console.log( “没有溢出” );
}
```



## input

```
检查控件值的正则表达式.。pattern必须匹配整个值，而不仅仅是某些子集.。使用title属性来描述帮助用户的模式.。当类型属性的值为text, search, tel, url 或 email时，此属性适用，否则将被忽略。译者注:ie10+
```



## 下载图片

在使用 a 标签的时候, 如果跨域会以新的标签页打开的方式打开图片.

可以利用 canvas 和 img 标签转成 base64 的文件下载.



## domian 跨域

开发网站后台的时候有时候会用到iframe,子页面调用父页面中的js方法,就会设计到跨域问题.JS设置document.domain实现跨域.

*前提条件*：这两个域名必须属于同一个基础域名!而且所用的协议，端口都要一致，否则无法利用document.domain进行跨域

在 2 个跨域的页面写上.

```js
document.domain = 'xxx.com'
```



## 视频截图

```js
ar video, output;
var scale = 0.8;
var init = function() {
    imgbox = document.getElementById("imgbox");
    video = document.getElementById("video");
    video.addEventListener('loadeddata',captureImage);
};

var captureImage = function() {
    var canvas = document.createElement("canvas");//创建一个canvas
    canvas.width = video.videoWidth * scale;//设置canvas的宽度为视频的宽度
    canvas.height = video.videoHeight * scale;//设置canvas的高度为视频的高度
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//绘制图像

    var img = document.createElement("img");//创建img
    img.src = canvas.toDataURL("image/png");//将绘制的图像用img显示出来
    imgbox.appendChild(img);//将img添加到imgbox里
};

init();
```





## Video 标签铺满

```css
video {
    object-fill: fill;
}
```





## HTML 页面加载顺序

[原文链接][6]

1. 解析HTML结构
2. 加载外部脚本和样式表文件
3. 解析并执行脚本代码
4. DOM树构建完成. // `DOMContentLoaded`
5. 加载图片等外部文件
6. 页面加载完毕. // `load`

其实，这里还有一个 `readystatechange` 事件。
 当 `document.readyState` 为 `interactive`  的时候，同时会触发 `DOMContentLoaded`。
 当 `document.readyState ` 为 ` complete` 的时候，同时会触发 `load`。

以后如需判断当前文档是否加载完成，只需要获取 `document.readyState` 的值即可。



---



## iframe

### iframe 下获取 window 对象

[文章][7]

```html
<iframe id="ct" class="ct-class" name="ctName"></iframe>
```



1. 来获取 iframe 元素
   a. 通过 id 获取

   ```js
   var iframe = window.ct;
   ```

   b. 通过 name 徐行获取

   ```js
   var iframe = window.frames[ "ctName" ];
   ```

   c. 普通的获取

2. contentWindow 属性: 获取 iframe 下面的 window 对象

3. ownerDocument 属性: 获取 iframe 下面的 document 对象

---



## A 标签下载

[原文链接][7]

利用 a 标签的 `download` 属性来下载.

### Blob 对象简单介绍

```js
var blob = new Blob( array, options );
```

+ array 是一个由ArrayBuffer（二进制数据缓冲区）、ArrayBufferView（二进制数据缓冲区的array-like视图）、Blob、DOMString等对象构成的Array，或者其他类似对象的混合体，它将会被放进Blob。DOMStrings会被编码为UTF-8。
+ options 是可选的，它可能会指定如下两个属性：
  - type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型。
  - endings，默认值为"transparent"，用于指定包含行结束符n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变。

```js
var data = 'ttttttssssssss';
var blob = new Blob( [ data ], {
    type: 'text/plain'
} );
```

> 关于 type 的类型可以对照 [MIME 参考手册][9] 设置type

### URL 对象

通过 URL 对象创建下载链接

```js
var urlObj = window.URL.createObjectURL( blob );
```

### window.URL.revokeObjectURL()

在每次调用createObjectURL()方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL()方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

### 利用 A 标签下载

```js
var a = document.querySelector( '#a' );

    console.log( { a } );

    function download ( data ) {

        var blob = new window.Blob( [ data ], {
            type: 'text/plain'
        } );

        var urlObj = window.URL.createObjectURL( blob );

        a.href = urlObj;
        a.download = 'xxxx.txt';
    }

    download( 'salkfja;lkfja;lkjsdflkajsdflkajsfdlkajsfdlaksf' );
```

---



## 新单位 vw vh vmin vmax

[原文链接][10]

+ 含义

  `vw`, `vh`, `vmin`, `vmax` 是一种相对于视窗( viewport )的单位, 类似于百分比 , 视窗是指浏览器时机显示内容区域的大小, 不包括工具栏等.

  `vw`: 视窗宽度的百分比

  `vh`: 视窗高度的百分比

  `vmin`: 视窗高度和视窗宽度的较小值

  `vmax`: 视窗高度和视窗宽度的较大值

+ 与百分比单位的区别

  1. % 是相对于父元素的大小设定的比率, `vw`, `vh` 是由视窗决定的.
  2. `vw`, `vh` 是可以直接获取高度的, 但是 % 在没有设置 `body` 高度的情况下, 获取不到.

+ `vmin`, `vmax` 的用处

  在做移动端的横竖屏切换的时候, 可以使得文字大小在横竖屏下表现一致.

+ 浏览器兼容

  华为的一些手机自带的浏览器不支持 vw wh

  1. PC端

     Chrome：自 26 版起就完美支持（2013年2月）
     Firefox：自 19 版起就完美支持（2013年1月）
     Safari：自 6.1 版起就完美支持（2013年10月）
     Opera：自 15 版起就完美支持（2013年7月）
     IE：自 IE10 起（包括 Edge）到现在还只是部分支持（不支持 vmax，同时 vm 代替 vmin）

  2. 移动端

     Android：自 4.4 版起就完美支持（2013年12月）
     iOS：自 iOS8 版起就完美支持（2014年9月）

---



## 修改 video 标签控制器的样式

### chrome

打开控制台 `setting`, 勾选 `Show user agent shadow DOM`.

![](../images/html_01.png)



---



## 隐藏域

隐藏域是用保存用户提交的表单却不需要用户修改查看. 作用类似于 `cookies`, 简单实用.

```html
<input type="hidden" name="id" value="111"></input>
```



## picture 响应式加载图片的标签

[CSDN][11]

+ `<picture>` 是HTML5的一个新元素；

+ 如果 `<picture>` 元素与当前的 `<audio>`, `<video>` 元素协同合作将增强响应式图像工作的进程，它允许在其内部设置多个 `<source>` 标签，以指定不同的图像文件名，根据不同的条件进行加载；

+ `<picture>` 可以根据不同的条件加载不同的图像，这些条件可以是视窗当前的高度（viewport），宽度（width），方向（orientation），像素密度（dpr）等；

### example

1. 如下栗子中针对不同屏幕宽度加载不同的图片；当页面宽度 在320px到640px之间时加载minpic.png；当页面宽度大于640px时加载middle.png

```html
<picture>
    <source media="(min-width: 320px) and (max-width: 640px)" srcset="img/minpic.png">
    <source media="(min-width: 640px)" srcset="img/middle.png">
    <img src="img/picture.png" alt="this is a picture">
</picture>
```

2. 如下栗子中添加了屏幕的方向作为条件；当屏幕方向为横屏方向时加载_landscape.png结尾的图片；当屏幕方向为竖屏方向时加载 _portrait.png结尾的图片；

```html
<picture>
    <source media="(min-width: 320px) and (max-width: 640px) and (orientation: landscape)" srcset="img/minpic_landscape.png">
    <source media="(min-width: 320px) and (max-width: 640px) and (orientation: portrait)" srcset="img/minpic_portrait.png">
    <source media="(min-width: 640px) and (orientation: landscape)" srcset="img/middlepic_landscape.png">
    <source media="(min-width: 640px) and (orientation: portrait)" srcset="img/middlepic_portrait.png">
    <img src="img/picture.png" alt="this is a picture">
</picture>
```

3. 如下栗子中添加了屏幕像素密度作为条件；当像素密度为2x时加载_retina.png 2x 的图片，当像素密度为1x时加载无retina后缀的图片；

```html
<picture>
    <source media="(min-width: 320px) and (max-width: 640px)" srcset="img/minpic.png,img/minpic_retina.png 2x">
    <source media="(min-width: 640px)" srcset="img/middle.png,img/middle_retina.png 2x">
    <img src="img/picture.png,img/picture_retina.png 2x" alt="this is a picture">
</picture>
```

4. 如下栗子中添加图片文件格式作为条件,当支持webp格式图片时加载webp格式图片，当不支持时加载png格式图片；

```html
<picture>
    <source type="image/webp" srcset="img/picture.webp">
    <img src="img/picture.png" alt="this is a picture">
</picture>
```

5. 如下例子中添加宽度描述；页面会根据当前尺寸选择加载不大于当前宽度的最大的图片；

```html
<img src="picture-160.png" alt="this is a picture"
     sizes="90vw" 
     srcset="picture-160.png 160w,
             picture-320.png 320w,
             picture-640.png 640w,
             picture-1280.png 1280w">
```

6. 如下例子中添加sizes属性；当窗口宽度大于等于800px时加载对应版本的图片；

```html
<source media="(min-width: 800px)"
        sizes="90vw" 
        srcset="picture-landscape-640.png 640w,
                picture-landscape-1280.png 1280w,
                picture-landscape-2560.png 2560w">
<img src="picture-160.png" alt="this is a picture"
     sizes="90vw" 
     srcset="picture-160.png 160w,
             picture-320.png 320w,
             picture-640.png 640w,
             picture-1280.png 1280w">
```

### 兼容性

目前只有Chrome ， Firefox ， Opera 对其兼容性较好，具体兼容性如图

![](../images/html_02.png)

### 重要参数

- srcset (必需)

- **添加最后的 `<img>` 元素**

  `<img>` 元素在 `<picture>` 内部用来当浏览器不支持时或者没有源标签匹配时的显示。在 `<picture>` 内使用 `<img>` 标签是必须得，如果你忘记了，将不会有图片显示出来。

  用 `<img>` 来声明默认的图片显示。将 `<img>` 标签放到 `<picture>` 内的最后，浏览器在找到 `<img>` 标签之前会忽略 `<source>` 的声明。这个图片标签也需要你写上它的 alt 属性。



---



## canvase getImageData() 跨域问题

[Document][12]

### HTML crossOrigin 属性解决资源跨域问题

`crossOrigin=anonymous`相对于告诉对方服务器，你不需要带任何非匿名信息过来。例如cookie，因此，当前浏览器肯定是安全的。

在HTML5中，有些元素提供了支持CORS(Cross-Origin Resource Sharing)（跨域资源共享）的属性，这些元素包括`<img>`，`<video>`，`<script>`等，而提供的属性名就是`crossOrigin`属性。

```js
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var img = new Image();
img.crossOrigin = '';
img.onload = function () {
    context.drawImage(this, 0, 0);
    context.getImageData(0, 0, this.width, this.height);
};
img.src = 'https://avatars3.githubusercontent.com/u/496048?s=120&v=4';';
```

`crossOrigin`可以有下面两个值：

| 关键字          | 释义                                                         |
| --------------- | ------------------------------------------------------------ |
| anonymous       | 元素的跨域资源请求不需要凭证标志设置。                       |
| use-credentials | 元素的跨域资源请求需要凭证标志设置，意味着该请求需要提供凭证。 |

### crossOrigin 兼容性

IE11+(IE Edge)，Safari，Chrome，Firefox浏览器均支持，IE9和IE10会报SecurityError安全错误

### IE10 浏览器不支持 crossOrigin

我们请求图片的时候，不是直接通过`new Image()`，而是借助ajax和`URL.createObjectURL()`方法曲线救国。

```js
var xhr = new XMLHttpRequest();
xhr.onload = function () {
    var url = URL.createObjectURL(this.response);
    var img = new Image();
    img.onload = function () {
        // 此时你就可以使用canvas对img为所欲为了
        // ... code ...
        // 图片用完后记得释放内存
        URL.revokeObjectURL(url);
    };
    img.src = url;
};
xhr.open('GET', url, true);
xhr.responseType = 'blob';
xhr.send();
```



## 上传组件

```js
let { action, data, file } = _http
let { name: filename } = file
let _data = new FormData()
_data.append( 'name', filename )
_data.append( 'file', file )
http.post( action, _data )
```



## 跨域请求

### 在子域名不同主域名相同的时候可以使用 document.domain 来解决

 对于主域相同跨子域的情况，可以通过设置 `document.domain` 来解决。具体做法是在 example.com/a.html 和 sub.example.com/b.html 两个文件分别加上 `document.domain = example.com`
然后通过a.html 文件创建一个iframe，去控制iframe的 window，从而进行交互



 

---

[1]: https://blog.csdn.net/ityang521/article/details/76076813
[2]: http://webkkl.com/dom-events/onpagehide.php
[3]: https://blog.csdn.net/yl02520/article/details/17174107
[4]: https://blog.csdn.net/littlebearGreat/article/details/79207215
[5]: https://hodorshy.github.io/example/%E9%A1%B5%E9%9D%A2%E5%88%87%E5%88%B0%E5%90%8E%E5%8F%B0%E6%A3%80%E6%B5%8B.html

[6]: https://www.jianshu.com/p/5c86c51a166e

[7]: https://www.cnblogs.com/TiestoRay/p/2660524.html
[8]: https://segmentfault.com/a/1190000015026760
[9]: http://www.w3school.com.cn/media/media_mimeref.asp
[10]: https://www.jb51.net/css/589835.html
[11]: https://blog.csdn.net/github_36534129/article/details/53537454
[12]: https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/