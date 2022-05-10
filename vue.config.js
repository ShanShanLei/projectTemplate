const path = require('path')
const chalk = require('chalk')
const currentEnv = require('./utils/getEnv')()

// 仅支持输入 dev/prod 环境参数，否则终止运行
if (currentEnv && ['dev', 'prod'].indexOf(currentEnv) < 0) {
  console.log('\n')
  console.log(`🦄 ${chalk.yellow.bold('仅支持以下环境: dev/prod')}`)
  if (process.env.NODE_ENV === 'development') {
    console.log(`🦄 ${chalk.yellow.bold('本地开发运行示例👉: npm run dev:dev OR npm run dev --env=dev')}`)
  } else {
    console.log(`🦄 ${chalk.yellow.bold('打包构建运行示例👉: npm run build:prod OR npm run build --env=prod')}`)
  }
  console.log('\n')
  throw 'error'
}

// 获取后端远程联调环境(dev/prod)接口地址
function getApi() {
  const configInfo = require(`./config/${currentEnv}.env`)
  return configInfo.API_URL
}

console.log('\n')
console.log(`🦄 ${chalk.yellow.bold('the NODE_ENV is: ' + `${process.env.NODE_ENV}`)}`)
console.log(`🦄 ${chalk.yellow.bold('the env is: ' + `${currentEnv}`)}`)
console.log(`🦄 ${chalk.yellow.bold('the request api is: ' + `${getApi()}`)}`)
console.log('\n')

module.exports = {
  lintOnSave: false,
  publicPath: '/webFarmCreditChain', // process.env.BASE_URL拿到的值
  devServer: {
    open: true,
  },
  // vue-echarts 配置
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  // css 相关 loader 配置
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/common";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
  // 自定义 webpack 配置
  chainWebpack: (config) => {
    // 关闭prefetch功能
    config.plugins.delete('prefetch')
    // 添加全局title
    config.plugin('html').tap((definitions) => {
      definitions[0].title = '农证链'
      return definitions
    })
    // 注入全局变量
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0]['process.env'], {
        npm_config_env: JSON.stringify(currentEnv),
      })
      // 注入全局环境配置
      Object.assign(definitions[0]['process.env'], {
        envConfig: JSON.stringify(require(`./config/${currentEnv}.env`)),
      })
      return definitions
    })

    // 处理 work 脚本
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .options({
        inline: 'fallback',
      })
    config.module.rule('js').exclude.add(/\.worker\.js$/)
  },
}
