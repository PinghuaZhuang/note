# .Babelrc

[官网主页][1]

```b
npm install babel-plugin-transform-vue-jsx
```



## 编译 2019

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": "3.23",
        "targets": {
          "chrome": 49
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": false,
        "regenerator": false
      }
    ]
  ]
}

```

## transform-vue-jsx

使用 `jsx` 模板

## transform-decorators-legacy

使用修饰器

## [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/)

类字段提议, 属性初始化语法

可以在类中定义静态属性( TS 中不需要, 本身就可以 )

可以在 `react` 中可以默认绑定 `this`

## transform-imports

可以使用 `import().then` 语法糖



------

[1]: https://www.babeljs.cn/docs/usage/babelrc/	"主页"
[2]:
