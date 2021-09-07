# Canvas

## 获取指定区域的颜色

```js
var c = ctx.getImageData(mouseX, mouseY, 1, 1).data;
var red = c[0];
var green = c[1];
var blue = c[2];
```



## 移动端 canvas 变模糊

Device pixel ratio



## 性能优化



## 点击事件

判断 `canvas` 点击了哪个图形, 可以使用 `ctx.isPointInPath` 方法判断, 但是当 `canvas` 画布有多个图形的化, 只能判断事件对象的位置是否在最后一个绘制的图形上.

[博客][1]

### 解决思路

没次点击的时候重绘图纸, 在每一个玻璃纸上进行判断.

```js
cvs.addEventListener('click', function(e){
	p = getEventPosition(e);
	draw(p);
}, false);

//图形绘制
function draw(p){
	var who = [];//保存点击事件包含图形的index值
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	arr.forEach(function(v, i){
		ctx.beginPath();
			ctx.rect(v.x, v.y, v.width, v.height);
            ctx.stroke();
            if(p && ctx.isPointInPath(p.x, p.y)){
				//如果传入了事件坐标，就用isPointInPath判断一下
				//如果当前环境覆盖了该坐标，就将图形的index放到数组里
				who.push(i);
			}
	});
	//根据数组中的index值，可以到arr数组中找到相应的元素。
	return who;
}
```



---

[1]: https://blog.csdn.net/MooreLxr/article/details/81394122

