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

## 判断是否为图片

### 通过文件头标识判断图片格式

https://segmentfault.com/a/1190000020074437

>1.JPEG/JPG - 文件头标识 (2 bytes): ff, d8 文件结束标识 (2 bytes): ff, d9
>2.TGA - 未压缩的前 5 字节 00 00 02 00 00 - RLE 压缩的前 5 字节 00 00 10 00 00
>3.PNG - 文件头标识 (8 bytes) 89 50 4E 47 0D 0A 1A 0A
>4.GIF - 文件头标识 (6 bytes) 47 49 46 38 39(37) 61
>5.BMP - 文件头标识 (2 bytes) 42 4D B M
>6.PCX - 文件头标识 (1 bytes) 0A
>7.TIFF - 文件头标识 (2 bytes) 4D 4D 或 49 49
>8.ICO - 文件头标识 (8 bytes) 00 00 01 00 01 00 20 20
>9.CUR - 文件头标识 (8 bytes) 00 00 02 00 01 00 20 20
>10.IFF - 文件头标识 (4 bytes) 46 4F 52 4D
>11.ANI - 文件头标识 (4 bytes) 52 49 46 46

```js
function getImageSuffix(fileBuffer) {
  // 将上文提到的 文件标识头 按 字节 整理到数组中
  const imageBufferHeaders = [
    { bufBegin: [0xff, 0xd8], bufEnd: [0xff, 0xd9], suffix: '.jpg' },
    { bufBegin: [0x00, 0x00, 0x02, 0x00, 0x00], suffix: '.tga' },
    { bufBegin: [0x00, 0x00, 0x10, 0x00, 0x00], suffix: '.rle' },
    {
      bufBegin: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
      suffix: '.png'
    },
    { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], suffix: '.gif' },
    { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], suffix: '.gif' },
    { bufBegin: [0x42, 0x4d], suffix: '.bmp' },
    { bufBegin: [0x0a], suffix: '.pcx' },
    { bufBegin: [0x49, 0x49], suffix: '.tif' },
    { bufBegin: [0x4d, 0x4d], suffix: '.tif' },
    {
      bufBegin: [0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x20, 0x20],
      suffix: '.ico'
    },
    {
      bufBegin: [0x00, 0x00, 0x02, 0x00, 0x01, 0x00, 0x20, 0x20],
      suffix: '.cur'
    },
    { bufBegin: [0x46, 0x4f, 0x52, 0x4d], suffix: '.iff' },
    { bufBegin: [0x52, 0x49, 0x46, 0x46], suffix: '.ani' }
  ]
  for (const imageBufferHeader of imageBufferHeaders) {
    let isEqual
    // 判断标识头前缀
    if (imageBufferHeader.bufBegin) {
      const buf = Buffer.from(imageBufferHeader.bufBegin)
      isEqual = buf.equals(
        //使用 buffer.slice 方法 对 buffer 以字节为单位切割
        fileBuffer.slice(0, imageBufferHeader.bufBegin.length)
      )
    }
    // 判断标识头后缀
    if (isEqual && imageBufferHeader.bufEnd) {
      const buf = Buffer.from(imageBufferHeader.bufEnd)
      isEqual = buf.equals(fileBuffer.slice(-imageBufferHeader.bufEnd.length))
    }
    if (isEqual) {
      return imageBufferHeader.suffix
    }
  }
  // 未能识别到该文件类型
  return ''
}
```

