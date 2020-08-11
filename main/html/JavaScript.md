# JavaScript

记录一些JavaScript中的知识点.



## ~~

等价于Math.floor



## 宏任务与微任务

promise是微任务. setTimeout 是宏任务. 

宏任务执行先后按照回调时机. 当宏任务下的微任务执行完才执行其他宏任务. 

同一次事件循环中  微任务永远在宏任务之前执行.

evenloop概念.

```js
 setTimeout(function(){
     console.log('定时器开始啦')
 });
 
 new Promise(function(resolve){
     console.log('马上执行for循环啦');
     for(var i = 0; i < 10000; i++){
         i == 99 && resolve();
     }
 }).then(function(){
     console.log('执行then函数啦')
 });
 
 console.log('代码执行结束');
```



## Promise.resolve 

会对参数禁止展平. 放回最终的promise或者thenable对象. 



## 在严格模式下, window 环境下的 this 指向的都是 undefined



## 设置 crossorigin

```html
<script src="https://example.com/example-framework.js" crossorigin="use-credentials"></script>
```



## DataTransfer

[Document][1]



---

[1]: https://www.zhangxinxu.com/wordpress/2018/09/drag-drop-datatransfer-js/	"DataTransfer"

