# rollup

[官方文档][1]

[在线文档1][2]

[在线文档2][3]



## watch

https://rollupjs.org/guide/en/#watchinclude

将文件监视限制为某些文件。请注意，这仅过滤模块图，但不允许添加额外的监视文件.

添加额外的监视文件. 

https://stackoverflow.com/questions/63373804/rollup-watch-include-directory

```js
plugins: [
    {
        name: 'watch-external',
        buildStart(){
            this.addWatchFile(path.resolve(__dirname, 'foo.js'))
        }
    }
]
```

将它与一些 globbing 实用程序结合起来，例如`fast-glob`调用`this.addWatchFile`您要复制的每个文件：

```js
import fg from 'fast-glob';

export default {
    // ...
    plugins: [
       {
           name: 'watch-external',
           async buildStart(){
               const files = await fg('src/**/*');
               for(let file of files){
                   this.addWatchFile(file);
               }
           }
       } 
    ]
}
```



## rollup 与 webpack 区别

简单说就是 纯 `js` 使用 `rollup`, 其他混合使用 `webpack`.

`rollup` 比起 `webpack` 打包 `js` 文件更轻量化



## 常用配置参数

+ input: 入口文件
+ sourcemap
  + true
  + inline: 添加在 min.js 最后一行
+ output { Object }: 输出参数
  - file: 输出文件名
  - format: 输出格式
  - name: 设定导出的变量名
+ plugins { Aarry }: 插件集
+ external: 外链, 详情看 webpack 的使用
+ globals: 全局模块, 可以配合 external 使用, 详情看 webpack 的使用
+ targets: 打包多个文件

```js
export default {
  entry: 'index.js',
  targets: [{
      dest: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/bundle.umd.js',
      moduleName: 'res',
      format: 'umd'
    },
    {
      dest: 'dist/bundle.es.js',
      format: 'es'
    },
  ]
}
```



## plugins

+ rollup-plugin-babel

  es6 转 es5

+ rollup-plugin-commonjs

  引用 cjs 使用( npm 第三方包大多是 cjs )

+ rollup-plugin-json

  import 引用 json 文件

+ rollup-plugin-node-resolve

  它会允许加载在 `node_modules` 中的第三方模块

+ rollup-plugin-replace

  全局变量替换

  ***必须使用  `JSON.stringify()` 来转码***

+ rollup-plugin-uglify-es

  压缩代码

```js
plugins: [
        nodeResolve({
            main: true,
            jsnext: true,
            module: true
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        }),
        replace({
            // include: 'src/index.js', // 指定可以使用变量的文件路径
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            VERSION: JSON.stringify( pkg.version )
        }),
    	uglify()
    ]
```



---

[1]: https://www.rollupjs.com/guide/zh#-using-config-files-
[2]: https://juejin.im/entry/57edcefda22b9d005bb0d62c
[3]: https://segmentfault.com/a/1190000010628352