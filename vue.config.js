const { defineConfig } = require('@vue/cli-service')
let path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          outputStyle: 'expanded'
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@', resolve('src'))
  },
  configureWebpack:{
    devServer: {
      // 解决页面弹出红色报错遮罩层
      client: {
        overlay: false,
      },
    },
  }


})
