# TEEN.js

配合缓动函数使用. 可以做到很多动画效果. 

https://easings.net/

## example

```js
/* eslint-disable */
var box = document.createElement( 'div' );
box.style.setProperty( 'background-color', '#008800' );
box.style.setProperty( 'width', '100px' );
box.style.setProperty( 'height', '100px' );
document.body.appendChild( box );

// Setup the animation loop.
// 必须是对象引用
var coords = { x: 0, y: 0 }; // Start at (0, 0)
var rotation = { rotation: 0 };
function animate ( ) {
    requestAnimationFrame( animate );
    TWEEN.update( );
}
// requestAnimationFrame( animate );

var tween = new TWEEN.Tween( rotation ) // Create a new tween that modifies 'coords'.
    // .to( { x: 300, y: 200 }, 1000 ) // Move to (300, 200) in 1 second.
    .to( { rotation: 360 } )
    .easing( TWEEN.Easing.Quadratic.Out ) // Use an easing function to make the animation smooth.
    .onUpdate( function ( cur ) { // Called after tween.js updates 'coords'.
        // Move 'box' to the position described by 'coords' with a CSS translation.
        // box.style.setProperty( 'transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)' );
        box.style.setProperty( 'transform', `rotate(${Math.round( cur.rotation )}deg)` );
	})
	// .start() // Start the tween immediately.
    .repeat( Infinity ) // 循环动画
    .onStop( function () {
        console.log( rotation.rotation  );
    } )
    .onComplete( function () {
        console.log( 'xxxxxx:', rotation.rotation );
    } )

animate();			
tween.start();		
```

