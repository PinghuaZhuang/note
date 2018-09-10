# Jest 断言测试 单元测试

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

[1]: https://segmentfault.com/a/1190000008628067