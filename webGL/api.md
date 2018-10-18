# API

http://support.supermap.com.cn:8090/iserver/iClient/for3D/webgl/zh/Build/Documentation/index.html



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



## 相机位置

`pitch ` `roll`  `heading`  `position` 