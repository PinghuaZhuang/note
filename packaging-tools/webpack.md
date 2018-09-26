# webpack 的配置信息

[非官方文档][1]

[W3C前端社区][2]

使用 `node` 运行配置文件

+ webpack.base.conf.js

  基本配置

+ webpack.dev.conf.js

  开发过程中的配置

+ webpack.prod.conf.js

  创建生产版本的配置

## context

项目根目录

## entry

项目入口文件配置

## output

输入文件配置

`path`

​	输出文件根目录

`filename`

​	输出文件的文件名

`publicPath`

​	输出文件目录

## resolve

解析相关

`extensions`

​	默认解析文件的扩展名, 优先级按顺序

`alias`

​	解析路径的时候, 以字符串的形式替换, 允许使用正则表达式

`modules`

​	默认包的路径

```js
modules: [
      "node_modules",
      path.resolve(__dirname, "../../../node_modules"),
      path.resolve(__dirname, "../../../public_modules"),
      path.resolve(__dirname, "../../../public")
]
```

## module

模块

`rules` 

​	配置 `loader`

## devServer

调试过程开启的服务器配置

`port` 

​	端口号

`hot`

​	是否开启热更新

## plugins

插件配置

|        plugin name         |                         description                          |
| :------------------------: | :----------------------------------------------------------: |
|     HtmlWebpackPlugin      |                      html 模板文件配置                       |
| HotModuleReplacementPlugin |                            热更新                            |
|        DefinePlugin        |     定义全局变量, 在webpack打包的时候会对这些变量做替换      |
|     NamedModulesPlugin     |         在热加载时直接返回更新文件名，而不是文件的id         |
|    NoEmitOnErrorsPlugin    | 在编译出现错误时，使用 `NoEmitOnErrorsPlugin` 来跳过输出阶段。这样可以确保输出资源不会包含错误。 |
|       UglifyJsPlugin       |                           压缩代码                           |
|     ExtractTextPlugin      |                  将js中引入的css分离的插件                   |
|     OptimizeCSSPlugin      |  压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题  |
|     CommonsChunkPlugin     | 通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用 |
|     CopyWebpackPlugin      |                         复制静态文件                         |
|     CleanWebpackPlugin     |                  每次 build 后删除指定文件                   |
|  CompressionWebpackPlugin  |          提供带 Content-Encoding 编码的压缩版的资源          |
|   HashedModuleIdsPlugin    |                            哈希值                            |
| ModuleConcatenationPlugin  |                  预编译所有模块到一个闭包中                  |



---



## 配置开启的服务器

开发过程中可以使用 `node` 写一些后台业务, 可以使用这个模拟数据传递.

```js
module.exports = new Promise( ( resolve, reject ) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort( ( err, port ) => {
        if ( err ) {
            reject( err );
        } else {

            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;

            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push( new FriendlyErrorsPlugin( {
                compilationSuccessInfo: {
                    messages: [ `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}` ]
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() :
                    undefined
            } ) );

            // 在这里插入
            Object.assign( devWebpackConfig.devServer, api );

            resolve( devWebpackConfig );
        }
    } );
} );
```



```js
// api.js
const bodyParser = require( 'body-parser' );
const session = require( 'express-session' );
const registerClick = require( './get/register-click' );
const validateClick = require( './post/validate-click' );

module.exports = {
    before: function ( app ) {
        app.use( bodyParser.json() );
        app.use( bodyParser.urlencoded( { extended: true } ) );
        app.use( session( {
            secret: 'my-secret',
            resave: false,
            saveUninitialized: true
        } ) );

        app.get( '/gt/register-click', registerClick );
        app.post( '/gt/validate-click', validateClick );
    }
};
```





---



[1]: http://www.css88.com/doc/webpack2/guides/installation/
[2]: https://webpack.w3cvip.org/Plugins/CompressionWebpackPlugin.html