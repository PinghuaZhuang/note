# webGL Quick Start

[在线文档1][2]

[在线文档2][3]

> webGL 快速启动, 官网实例 [下载][1]
>
> 启动的使用, 请使用服务器启动.

其实就是发送 get 请求返回图片, 利用 webGL( canvas ) 画出来

```js
var ctx = canvas.getContext( 'webgl' );
```

```html
Get: http://www.supermapol.com/realspace/services/3D-dxyx_ios2/rest/realspace/datas/MosaicResult_2@IMAGE_1/data/index/168/805.jpg_png?level=9
```

---



## 文件对应内容

+ config: 请求路径, 根据坐标获取对应图片

---

[1]: http://www.supermap.com.cn:8090/iserver/iClient/for3D/webgl/zh/download.html
[2]: http://support.supermap.com.cn:8090/iserver/iClient/for3D/webgl/zh/Build/Documentation/

[3]: https://cesiumjs.org/Cesium/Build/Documentation/ScreenSpaceEventHandler.html?classFilter=ScreenSpaceEventHandler