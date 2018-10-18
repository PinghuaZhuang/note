# rollup

[官方文档][1]

[在线文档1][2]

[在线文档2][3]

## rollup 与 webpack 区别

简单说就是 纯 `js` 使用 `rollup`, 其他混合使用 `webpack`.

`rollup` 比起 `webpack` 打包 `js` 文件更轻量化



## 常用配置参数

+ input: 入口文件
+ output { Object }: 输出参数
  + file: 输出文件名
  + format: 输出格式
  + name: 设定导出的变量名
+ plugins { Aarry }: 插件集
+ external: 外链, 详情看 webpack 的使用
+ globals: 全局模块, 可以配合 external 使用, 详情看 webpack 的使用



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



---

[1]: https://www.rollupjs.com/guide/zh#-using-config-files-
[2]: https://juejin.im/entry/57edcefda22b9d005bb0d62c