# Vue-cli-3.0

配置文件 `vue.config.js`, 关于 vue 的配置, 例如打包路径, 项目根目录等配置, 参考 [官方文档][1].

```js
module.exports = {
    /* 所有的配置都会在这里 */
}
```



## 引入修饰器

```js
// babel.config.js
module.exports = {
  presets: [
    '@vue/app',
  ],
  "plugins": [
    // legacy: true 需要打开
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```

```js
// .eslintrc.js
module.exports = {
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        "ecmaFeatures": {
          "legacyDecorators": true
        }
    },
}
```





## webpack 的配置

```js
module.exports = {
    /*
        原有的必须在原有的上面修改
        不能使用浅拷贝
    */
    configureWebpack: config => {
        // 修改默认配置
        config.resolve.alias[ '@types' ] = '@/types'
        
        // 这种方式不行, 不能使用浅拷贝
        // Object.assign( config, {
        //     resolve: {
        //         alias: {
        //             '@types': '@/types'
        //         }
        //     }
        // } );
    }
}
```



## 根据环境变量打包

```bash
vue-cli-service build --mode test
```





---

[1]: https://cli.vuejs.org/zh/config/#vue-config-js	"vue3 官方文档"

