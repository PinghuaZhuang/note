## 获取指定文件

```js
const viewsModule = require.context('../views', true, /\.store\.js*$*/)

viewsModule.keys().forEach(fileName => {

 const splitDirs = fileName.split('/')

 const fileNamePath = splitDirs[splitDirs.length - 1]

 const [name] = fileNamePath.split('.')

 modules[name] = {

  namespaced: true,

  ...viewsModule(fileName).default

 }

})
```

