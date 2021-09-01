# jQuery

 

### $.holdReady()

[菜鸟教程][1]	

窗口隐藏激活事件

窗口激活事件

+ $.holdReady( true ): 暂停
+ $.holdReady( false ): 继续

```js
document.addEventListener( 'visibilitychange', function () {
    if ( 'visible' === document.visibilityState ) {
        window.setTimeout( function () {
            $.holdReady( false );

            // $.holdReady( false );
        }, 1000 );
    } else {
        console.log( 'xxxxx' );
        $.holdReady( true );
    }
} );

$.holdReady( true );
$( document ).ready( function () {
    console.log( '文档加载完毕!!1' );
} );

window.setTimeout( function () {
    console.log( { $ }, document.visibilityState );
    $.holdReady( false );
}, 2000 );
```







---

[1]: https://yq.aliyun.com/articles/81647