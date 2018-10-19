# webGL - API

http://support.supermap.com.cn:8090/iserver/iClient/for3D/webgl/zh/Build/Documentation/index.html



## 鼠标事件

```js
var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    imageryProvider: new Cesium.TiandituImageryProvider({
        credit: new Cesium.Credit('天地图全球影像服务 数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局'),
    })
});

var scene = viewer.scene;

var handler = new Cesium.ScreenSpaceEventHandler( scene.canvas );

// mousedown 左键点击
handler.setInputAction( function (e) {
    
}, Cesium.ScreenSpaceEventType.LEFT_DOWN );

// 事件类型
// Cesium.ScreenSpaceEventType;
```



------



## 相机

### 相机旋转

- 选点( 地图出现一个白点 ): `handlerPoint.activate()`
- 开始旋转

```js
function callback ( ret ) {
    center = ret.object.position;
	scene.camera.flyCircle(center, 5000);
}
```

- 控制选择停止继续旋转: ` scene.camera._isFlyCircle = false;


---



## insar 点显示，隐藏函数 OK

setObjsVisible(ids, isVisible)

{smID: "6599", pcode: "RCL0001Iq", vel: "-0.400", level: 5}

使用 insar 图层

http://support.supermap.com.cn:8090/webgl/Build/Documentation/S3MTilesLayer.html

- ids { Array }: smID 的集合
- isVisible { Boolean }: 是否显示

> setObjsVisible([], true), 不要使用空数组, 会出 bug



---



## 坐标位置拾取

http://support.supermap.com.cn:8090/webgl/Build/Documentation/Scene.html

pickPosition(windowPosition, result)



---



## 相机位置

`pitch ` `roll`  `heading`  `position` 