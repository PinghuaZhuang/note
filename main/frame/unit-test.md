# Jest 

[Jest](http://facebook.github.io/jest/)是Facebook开发的一个对javascript进行单元测试的工具，之前仅在其内部使用，后开源，并且是在**Jasmine**测试框架上演变开发而来，使用了我们熟知的**expect(value).toBe(other)**这种断言格式。

[Link][1]



## Quick Start

```bash
npm i jest -S-dev
```

---



## jest.conf.js

### testEnvironment

运行环境

+ jsdom: 模拟浏览器
+ node

### package.json

```json
{
    "jest": "^22.4.3",
    "jest-serializer-vue": "^1.0.0",
    "vue-jest": "^2.5.0"
}
```



---



## Bugs

+ SecurityError: localStorage is not available for opaque origins

  将运行环境改为 node, 默认为 jsdom, 或者修改 testUrl

  ```json
  {
      "testEnvironment": "node",
      
      // 如果需要在 jsdom 环境下运行报这个错
      "verbose": true,
      "testURL": "http://localhost/"
  }
  ```

---



# mocha + expect.js

[文档-阮一峰][2] [github][3]

## mocha.opts

配置文件



## ES6 测试





---

[1]: https://segmentfault.com/a/1190000008628067
[2]: http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
[3]: https://github.com/ruanyf/mocha-demos