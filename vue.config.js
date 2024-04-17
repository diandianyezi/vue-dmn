const { defineConfig } = require('@vue/cli-service');
const isProd = process.env.NODE_ENV === 'production';

const cdn = {
  js: [
    'https://sandbox.kie.org/standalone/0.32.0/dmn/index.js'
  ]
}

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    console.info('isProd', isProd)
    if(isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args;
      })
      // config.externals({
      //   // 'DmnEditor': 'https://sandbox.kie.org/standalone/0.32.0/dmn/index.js'
      //   '@kie-tools/kie-editors-standalone/dist/dmn': {
      //     subtract: ['dmn', 'Editor']
      //   }
      // })
      config.externals = (context, request, callback) => {
        if (/^@kie-tools\/kie-editors-standalone\/dist\/dmn\//.test(request)) { 
          // 假设这些模块在全局作用域下可用，使用模块名作为全局变量  
          return callback(null, `${'@kie-tools/kie-editors-standalone/dist/dmn'}`); 
        }
        
      }
    }
  }
})
