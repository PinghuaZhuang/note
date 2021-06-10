# 取消请求

AbortController 用于手动终止一个或多个DOM请求，通过该对象的AbortSignal注入的Fetch的请求中。所以需要完美实现timeout功能加上这个就对了

```js
let controller = new AbortController(); 
let signal = controller.signal; 
let timeoutPromise = (timeout) => {    
  return new Promise((resolve, reject) => {        
    setTimeout(() => {            
      resolve(new Response("timeout", { status: 504, statusText: "timeout " }));            
      controller.abort();        
    }, timeout);    
  }); 
} 
let requestPromise = (url) => {    
  return fetch(url, {        
    signal: signal    
  }); 
}; 

Promise
  .race([timeoutPromise(1000), requestPromise("https://www.baidu.com")])    
  .then(resp => {        
    console.log(resp);    
  })    
  .catch(error => {        
    console.log(error);    
  });
```

