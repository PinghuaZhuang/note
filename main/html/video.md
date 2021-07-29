# H5 video 标签

设置 crossOrigin: 'anonymous' 可能会导致部分浏览器打不开. 



## 事件

[1]HTML5:onplay
[2]HTML5:onwaiting
[3]HTML5:ondurationchange
[4]HTML5:onloadedmetadata
[5]HTML5:onloadeddata
[6]HTML5:oncanplay
[7]HTML5:onplaying
[8]HTML5:oncanplaythrough
[9]HTML5:onended



## 开启画中画

```js
video.requestPictureInPicture()
    .catch((error: any) => {
    console.log('开启画中画失败.', error)
})
```

