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



## 配置全局样式 less sass

第一种: https://segmentfault.com/a/1190000019920162?sort=votes

```js
module.exports = {
  // sass-loader
  // vue-loader.vuejs.org/zh/guide/pre-processors.html#sass
  css: {
    loaderOptions: {
      sass: {
        // webpack.docschina.org/loaders/sass-loader/#options
        // webpack.docschina.org/loaders/sass-loader/#additionaldata
        // cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: '@import "~@/style/variables.scss";'
      },
      scss: {
        additionalData: (content, loaderContext) => {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);
          if (/styles\\variables.scss/.test(relativePath)) {
            return `@import "~@/styles/mixin.scss";` + content
          }

          return `@import "~@/styles/mixin.scss";
          @import "~@/styles/variables.scss";` + content
        }
      }
    }
  },
}
```

第二种:

```js
```





## hash、chunkhash、contenthash三者
+ hash（所有⽂件哈希值相同，只要改变内容跟之前的不⼀致，所有哈希值都改变，没有做到缓存意义）
+ chunkhash（同⼀个模块，就算将js和css分离，其哈希值也是相同的，修改⼀处，js和css哈希值都会变，同hash，没有做到缓存意义）
+ contenthash（只要⽂件内容一样, hash就不会变)

## CriticalDependency 警告

```js
// 在 chainWebpack 中设置
config.module.set('unknownContextCritical', false);
```

## 配置 pug-loader

```js
const autoprefixer = require('autoprefixer')
const pxToViewport = require('postcss-px-to-viewport')
const path = require('path')

const PUBLIC_PATH = process.env.PUBLIC_PATH
const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API

const resolve = (pathName) => path.resolve(__dirname, pathName)

function chunksMerge(...rest) {
  const chunks = ['runtime', 'vendors', 'polyfill']
  chunks.push(...rest)
  return chunks
}

module.exports = {
  outputDir: 'dist',
  publicPath: PUBLIC_PATH,
  pages: {
    index: {
      title: '看视频送金币',
      entry: 'src/main.js',
      chunks: ['runtime', 'vendors', 'polyfill', 'index']
    },
    download: {
      title: '邀请下载',
      entry: 'src/shared/download/main.js',
      chunks: ['runtime', 'polyfill', 'download'],
    },
    inviteCode: {
      title: '邀请好友',
      entry: 'src/views/invite-code/main.js',
      template: 'src/views/invite-code/app.pug',
      chunks: chunksMerge('inviteCode'),
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: VUE_APP_BASE_API,
        changeOrigin: true,
        secure: false, // https true
        pathRewrite: {
          // '^/api': '/'
        }
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxToViewport({
            viewportWidth: 375,
          }),
        ],
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('src/style/variable.less')],
    },
  },
  configureWebpack: {
    module: {
      // 使用 chainWebpack 有问题.
      rules: [
        { test: /\.pug$/, loader: ['pug-html-loader'] }
      ],
    },
    // 配置loader查找路径
    resolveLoader: {
      modules: ['./node_modules', './loader'] // 配置loader的查找目录
    },
  },
};

```

## 配置cssmodule

https://github.com/css-modules/css-modules

```js
{
    module: {
      rules: [
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }
      ],
      loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      ]
    },
}
```

## Webpack 之 treeShaking

[简书][https://www.jianshu.com/p/cf930283d404]

直接打包有用的代码.

webpack2.0 配置

```js
// .babelrc
{
    "presets": [
        ["es2015", {"modules": false}]
    ]
}
```





## import 不能使用变量的原因

[参考文档](<https://segmentfault.com/q/1010000011585257>)

### 原因

虽然import()方法在es规范中是支持动态引入的，但是webpack的实现是并不支持。

> 例如`import(foo)`，这样完全动态的加载方式将会失败，因为webpack需要一些文件位置信息。因为变量`foo`可能是系统或项目中任何文件的路径。`import()`必须至少包含关于模块所在位置的一些信息，因此让捆绑可以局限于特定的目录或文件夹。

### 解决方法

告诉webpack部分路径.

```js
export const zList = getFiles( files, ( item ) => {
    let name = item === 'index' ? 'z' : item
    return {
        path: name,
        name: name,
        component: () => import( `./${item}.vue` )
    }
} )
```

## context

项目根目录

## entry

项目入口文件配置

## output

输入文件配置

`path`

	输出文件根目录

`filename`

	输出文件的文件名

`publicPath`

	输出文件目录

`library`

	将会把 `bundle` 打包成 `lib. output.library` 的值就是文件名.

`libraryTarget`

	"var" - 通过设置一个变量导出: var Library = xxx (default)

	"this" - 通过设置 this的属性来导出: this["Library"] = xxx

	"commonjs" - 通过设置 exports的属性导出: exports["Library"] = xxx

	"commonjs2" - 通过设置 module.exports导出: module.exports = xxx

	"amd" - 导出为AMD (视情况可通过output.library来命名)

	"umd" - 导出为 AMD, CommonJS2 或者是顶级属性

## externals

```js
// 配置
externals: {
    aaa: 'jQuery'
}
```

```js
// 项目中引用
import xx from 'aaa';
```

## resolve

解析相关

`extensions`

	默认解析文件的扩展名, 优先级按顺序

`alias`

	解析路径的时候, 以字符串的形式替换, 允许使用正则表达式

`modules`

	默认包的路径

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

	配置 `loader`

## devServer

调试过程开启的服务器配置

`port`

	端口号

`hot`

	是否开启热更新

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

## 关于图片压缩成二进制问题

1. 在使用类名绑定背景图片， 在满足大小限制后是会被压缩的。
2. 在绑定 img 标签的 src 属性的时候， 是会被当成字符串的， 不会被压缩。 要使用 require 来引用。
3. 放在 src 下的图片才会被压缩成 二进制。static 下的图片是不会压缩的。



---



[1]: http://www.css88.com/doc/webpack2/guides/installation/
[2]: https://webpack.w3cvip.org/Plugins/CompressionWebpackPlugin.html
