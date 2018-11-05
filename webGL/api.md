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

[获取相机位置][1]



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

- 控制选择停止继续旋转

```js
scene.camera._isFlyCircle = false;
```

+ 其他

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
    destination: new Cesium.Cartesian3(),	// 笛卡尔坐标
    orientation: {
        heading: _heading,
        pitch: _pitch,
        roll: _roll
    }
} );
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

### 选中

```js
// 选中 entities 点的信息
viewer.selectedEntity;
// id
viewer.selectedEntity._id;
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

### 世界坐标转|经纬度转换成屏幕坐标

```js
var Cartesian3 = new Cesium.Cartesian3( x, y, z );
Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, Cartesian3);
```

### 屏幕坐标转世界坐标

```js
var pick1= new Cesium.Cartesian2(0,0);
var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick1),viewer.scene);
```

### 火星坐标，84坐标，百度地图坐标相互转换

```js
//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
function bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02tobd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat]
    }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02towgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        mglat = lat + dlat;
        mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}
```



---



## 模型

### 添加

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



## 图层

### 添加/删除

```js
var imageryLayers = viewer.imageryLayers;
// 注册阴影服务
var provider_cad = new Cesium.SuperMapImageryProvider( {
    url: config.ip_2 + config.provider_dt
} );
// 添加图层
var imagery_cad = imageryLayers.addImageryProvider( provider_cad );
```

```js
var baseLayer = imageryLayers.get( 1 );
//移除之前的图层
imageryLayers.remove( baseLayer );
```

### 查找获取图层

```js
// 所有图层都在这里
imageryLayers._layers
// 查找建筑图层
var scene = view.scene;
var build = scene.layers.find("build");
```

### 选中/被选中

```js
// 所有图层
var layers = scene.layers;

// 单个图层
var layer = layers.findByIndex( i );
// layer._name == 'build'

// 获取选中的图层 id
var id = layer.getSelection();

// 设置对应的图层被选中
var selectedFeatures = queryEventArgs.originResult.features;
var IDs=[];
for(var i = 0;i < selectedFeatures.length;i++ ){
    var value = selectedFeatures[i].fieldValues["0"];
    IDs.push(parseInt(value)+11);
}

layer.setSelection( IDS );
```

### 图层属性

+ show { Boolean }: 控制显示隐藏
+ findByIndex: 根据下标获取 entities 点

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



## 开关

```js
// 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D
scene.screenSpaceCameraController.enableRotate = false;
// 如果为真，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。
// 此标志仅适用于2D和Columbus视图模式
scene.screenSpaceCameraController.enableTranslate = false;
// 如果为真，则允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离。
scene.screenSpaceCameraController.enableZoom = false;
// 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
scene.screenSpaceCameraController.enableTilt = false;
// 如果为真，则允许用户使用免费外观。如果为假，摄像机视图方向只能通过转换或旋转进行更改。
// 此标志仅适用于3D和哥伦布视图模式。
scene.screenSpaceCameraController.enableLook = false;
```

### 禁止用户右键缩放

```js
scene.screenSpaceCameraController.zoomEventTypes = Cesium.CameraEventType.WHEEL;
```



---



## 申请 KEY

```js
//请开发者自行到supermap online官网（http://www.supermapol.com/）申请key
viewer.geocoder.viewModel.geoKey = '79F9yph6kv8c8I9aARQUxtvn';
```





---



# example

## 选取附近点

```js
var enUrl = 'http://120.78.73.154:8090/iserver/services/map-JianZhuTouYing/rest/maps/FZ000TY@JZTY';

var hdl = new Cesium.ScreenSpaceEventHandler( scene.canvas );

hdl.setInputAction( function (e) {
    // 传入经度纬度
	var centerPoint = new SuperMap.Geometry.Point( layer.lon, layer.lat );
	queryByDistance( centerPoint, 5 );
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
window.queryByDistance = function queryByDistance(centerPoint,queryDis) {
    var queryByDistanceParams = new SuperMap.REST.QueryByDistanceParameters({
        queryParams: new Array( new SuperMap.REST.FilterParameter({name: "FZ000TY@JZTY"}) ),
        returnContent: true,	
        distance: queryDis,		// 距离
        geometry: centerPoint,	// 查询中心点
        isNearest: true,	    // 是否最近
        // expectCount: 1	    // 返回个数
    });
    var queryByDistanceService = new SuperMap.REST.QueryByDistanceService( enUrl );
    queryByDistanceService.events.on({
        "processCompleted": processCompleted,
        "processFailed": processFailed
    });
    queryByDistanceService.processAsync(queryByDistanceParams);
}

function processCompleted(queryEventArgs) {
    console.log( 'queryEventArgs:', queryEventArgs );
    var i, j, result = queryEventArgs.result, min = +Infinity, SmID;
    for(i = 0;i < result.recordsets.length; i++) {
        for(j = 0; j < result.recordsets[i].features.length; j++) {
            var point = result.recordsets[i].features[j];
            SmID = result.recordsets[i].features[j].data.SmID;
            build.setSelection( SmID );
        }
    }
    build.setSelection( SmID );
}

function processFailed(e){
    alert(e.error.errorMsg);
}
```



## 去除左击 Entity 出现绿色的框框

把viewer对象的selectionIndicator属性设置为false

或者再创建viewer对象时,设置selectionIndicator属性为false

```js
viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: urlTERRAIN.gaTerrain,
        requestWaterMask: true,
        requestVertexNormals: true,
        isSct: true

    }),
    selectionIndicator: false//设置绿色框框不可见
});
```



----



# Other

## insar 点显示，隐藏函数 OK

setObjsVisible(ids, isVisible)

{smID: "6599", pcode: "RCL0001Iq", vel: "-0.400", level: 5}

使用 insar 图层

http://support.supermap.com.cn:8090/webgl/Build/Documentation/S3MTilesLayer.html

- ids { Array }: smID 的集合
- isVisible { Boolean }: 是否显示

> setObjsVisible([], true), 不要使用空数组, 会出 bug



## 坐标位置拾取

http://support.supermap.com.cn:8090/webgl/Build/Documentation/Scene.html

pickPosition(windowPosition, result)



## 获取地球球体对象

```js
 var ellipsoid = viewer.scene.globe.ellipsoid;  //获取地球球体对象
```



---

[1]: ##坐标

