# vue-dmn：使用webpack的externals优化@kie-tools/kie-editors-standalone/dist/dmn体积太大导致的编译问题

使用webpack配置externals优化@kie-tools/kie-editors-standalone/dist/dmn编译之后包太大的问题

修改配置vue.config.js，使用externals，见项目文件vue.config.js

@kie-tools/kie-editors-standalone/dist/dmn的cdn链接：https://sandbox.kie.org/standalone/0.32.0/dmn/index.js，也可以上传到自己公司的cdn中

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint

```
### 启动服务端
```
node server.js 
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 项目结构：
- dist // 编译之后的文件夹
- node_modules // 依赖包
- public  // index.html所在的公共资源文件夹
- src // 源码文件
- server.js  // 启动服务器的文件，用来验证生产环境编译之后的文件能否正常访问
