# LESS



## alias

webapck 中的 alias 只作用在 js 中. 

想要在样式中使用, 需要例外配置.

```js
const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: options.sourceMap,
        alias:{
            '@less': path.resolve(__dirname, '../src/less')
        }
    }
}
```



## 自定义函数返回值

```less
.setBg ( @n ) {
    @result @n / 10 
}

.demo {
    .setBg( 11 )[ @result ];
}
```

