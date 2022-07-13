# wx-api

[在线文档][1]



## 调出微信QQ

```js
weixin://
mqq://
```

## imagePreview

调用微信预览图片. 不介入sdk的方法.

```jsx
useEffect(() => {
    const imgEl = document.querySelector(`.${styles.posterImg}`);
    const onImagePreview = (e) => {
      if (WeixinJSBridge == null) {
        return;
      }
      WeixinJSBridge.invoke(
        'imagePreview',
        {
          urls: [base64],
          current: base64,
        },
        function (error) {
          console.error('<<< 调用 imagePreview 失败.', error);
        },
      );
    };
    imgEl.addEventListener('click', onImagePreview);
    return () => {
      imgEl.removeEventListener('click', onImagePreview);
    };
  }, [base64]);
```





---

[1]: https://developers.weixin.qq.com/miniprogram/dev/api/

