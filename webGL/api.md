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
Cesium.ScreenSpaceEventType;

// 注销事件
handler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_CLICK );
// 最好通过多创建 handler, 来区分要注销的事件
```



+ setInputAction: 注册事件
+ removeInputAction: 注销事件



------



## 相机

### 相机旋转

- 选点( 地图出现一个白点 )

```js
// 注册事件
var handlerPoint = new Cesium.DrawHandler( viewer, Cesium.DrawMode.Point );
handlerPoint.drawEvt.addEventListener(transformDarm);
// 注册事件后开启
handlerPoint.activate();
```

- 开始旋转

```js
function callback ( ret ) {
    center = ret.object.position;
	scene.camera.flyCircle(center, 5000);
}
```

- 控制选择停止继续旋转: ` scene.camera._isFlyCircle = false;

```js
// 镜头追踪
viewer.trackedEntity = entity;
// 镜头移动到 entity 上
viewer.zoomTo( entity );
```

```js
var scene = view.scene;
// 设置相机位置
scene.camera.setView( {
    destination: new Cesium.Cartesian3(),
    orientation: {
        heading: _heading,
        pitch: _pitch,
        roll: _roll
    }
} );

// 获取相机位置
```



### 滑行​

```js
// 动态设置经纬度
viewer.camera.flyTo( {
    destination: Cesium.Cartesian3.fromDegrees( longitude, latitude, 1299.022495696321 ),
    orientation: {
        heading: 0.06061424437391327,
        pitch: -0.6109960275561157,
        roll: 33.6143213755224224e-8
    }
} );
```



---



## entities

### 创建

可以自定义属性 `name`, 在实例上可以通过 `_name` 来访问.

```js
var point = viewer.entities.add( option );

// option 可以是一个对象也可以是一个 Entiy 实例
var point = viewer.entities.add( new Cesium.Entity() );
```



### 获取点实例 Entiy

```js
// 所有的在地图上没有删除的 Entiy 点集合, { Array }
var points = viewer.entities._entities._array;
```





### 跳转到 entities 点上

```js
// 跳转到该位置上
viewer.zoomTo( point );
//离地高度
wyoming.polygon.height = 300000;
//两个高度差组成了它的体积
wyoming.polygon.extrudedHeight : 250000;
```



### 形状

+ 盒 entity.box
+ 圈和椭圆 entity.ellipse
+ 走廊 entity.corridor
+ 气缸和锥体 entity.cylinder
+ 多边形 entity.polygon
+ 折线 entity.polyline
+ 折线卷 entity.polylineVolume
+ 矩形 entity.rectangle
+ 球体和椭球体 entity.ellipsoid
+ 墙壁 entity.wall



### 添加 3D 模型

```js
var viewer = new Cesium.Viewer('cesiumContainer');
var entity = viewer.entities.add({
    position : Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    model : {
        uri : '../Apps/SampleData/models/CesiumGround/Cesium_Ground.gltf'
    }
});
//这个是镜头追踪，将镜头固定在小车上
viewer.trackedEntity = entity;

// 删除单个点
viewer.entities.remove( entity );
// 删除所有的点
viewer.entities.removeAll();
```



### 参数


+ height { Number }: 离地高度

+ material: 材质（相当于填充色，但是可以填充的可不止颜色，可以看到这里是红色半透明）.

  @ep: Cesium.Color.RED.withAlpha(0.5)

```js
// 填充图片
point.material = '//cesiumjs.org/images/2015/02-02/cats.jpg'
// 条纹材质
material : new Cesium.StripeMaterialProperty({
    evenColor : Cesium.Color.WHITE,
    oddColor : Cesium.Color.BLACK,
    repeat : 16
})
// 一掉蓝色白光
material : new Cesium.PolylineGlowMaterialProperty({
    glowPower : 0.3,
    color : Cesium.Color.BLUE
})
```

+ label: 标签

```js
label : {
    text : '玄武湖',
	font : '14pt monospace',
	style: Cesium.LabelStyle.FILL_AND_OUTLINE,
	outlineWidth : 2,
	//垂直位置
	verticalOrigin : Cesium.VerticalOrigin.BUTTON,
	//中心位置
	pixelOffset : new Cesium.Cartesian2(0, 20)
}
```

+ billboard: 广告牌

```js
billboard : {
    image : 'http://imgsrc.baidu.com/baike/abpic/item/d35a10f45f26d158dcc4740e.jpg',
	width : 64,
	height : 64
}
```



---



## 坐标

### 世界坐标

```js
// 世界坐标( 经纬度 )
Cesium.Cartesian3.fromDegrees( longitude, latitude [, height ] ) ;
// 卡迪尔坐标
new Cesium.Cartesian3( x, y, z );

function ( e ) {
    //获取点击位置笛卡尔坐标
    var position = scene.pickPosition( e.position );

    //将笛卡尔坐标转化为经纬度坐标
    var mousePosition = scene.pickPosition( position );
    var cartographic = Cesium.Cartographic.fromCartesian( position );
    var longitude = Cesium.Math.toDegrees( cartographic.longitude );  // 经度
    var latitude = Cesium.Math.toDegrees( cartographic.latitude );    // 纬度
}
```

### 笛卡尔坐标转世界坐标

+ 第一种方法, 触发事件, 通过 `event` 对象获取笛卡尔坐标进行转换, 如上
+ 第二种方法, 通过 `scene.camera` 获取笛卡尔坐标进行转换

```js
var ellipsoid = viewer.scene.globe.ellipsoid;

// 装换为笛卡尔坐标实例
var cartesian3 = new Cesium.Cartesian3(
    scene.camera.position.x,
	scene.camera.position.y,
    scene.camera.position.z
);
// 转换
var cartographic = ellipsoid.cartesianToCartographic( cartesian3 );
var lat = Cesium.Math.toDegrees( cartographic.latitude );
var lng = Cesium.Math.toDegrees( cartographic.longitude );
var alt = cartographic.height;
```



---



## 加载模型

### 加载

```js
// @return promise 实例集合. 这相当于发送请求
// name: '/iserver/services/3D-JiKeng6QuBIM/rest/realspace/datas/常规模型' +
//            '_JK_DiLianQ_Z@jikeng_6qu/config'
var fns = layersNames.map( function ( name ) {
    return scene.addS3MTilesLayerByScp( config.ip_2 + config[ name + 'Promise' ], {
        name: name
    } );
});

// fns { Array }: 图层集合
Cesium.when.all( fns, _done, function ( e ) {
    if ( widget._showRenderLoopErrors ) {
        var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
        widget.showErrorPanel( title, undefined, e );
    }
} );

// 通过请求获取模型
//获取内部风险点
ZnvWeb.post( origin + "/site/PVIP/risklist/getCurrRiskResourceDataFor3d.ds",
	"", function ( errcode, data ) {
    // doSomething...
}, false );
```

### 查找获取模型

```js
var insar = scene.layers.find("insar");
```

### 模型属性

- _visible { Boolean }: 控制该图层显示隐藏

- brightness { Number }: 亮度
- contrast { Number }: 对比度
- saturation { Number }: 饱和度
- gamma { Number }; 透明度?
- selectEnabled { Boolean }: 是否被选中
- splitDirection
- splitPosition



---



## 加载图层

### 加载

```js
var imageryLayers = viewer.imageryLayers;
// 注册阴影服务
var provider_cad = new Cesium.SuperMapImageryProvider( {
    url: config.ip_2 + config.provider_dt
} );
// 工程图纸
var imagery_cad = imageryLayers.addImageryProvider( provider_cad );
```

### 查找获取图层

```js
// 所有图层都在这里
imageryLayers._layers
```

### 图层属性

+ show { Boolean }: 控制显示隐藏

### 图层函数

+ setObjsVisible( ids, isVisible )
  - ids { Array }: smID 的集合
  - isVisible { Boolean }: 是否显示

http://support.supermap.com.cn:8090/webgl/Build/Documentation/S3MTilesLayer.html

```js
// @example: {smID: "6599", pcode: "RCL0001Iq", vel: "-0.400", level: 5}
var line = view.scene.layers.find( 'line' );
// 控制该点显示
line.setObjsVisible( [ '6599' ], true );
```



---



# Other

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
