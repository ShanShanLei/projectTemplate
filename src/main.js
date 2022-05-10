import Vue from 'vue'
import * as filters from './filters'
// import Layout from '@/components/Layout.vue'
// import TopBar from '@/components/TopBar.vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入 echarts 图形库
// import 'echarts'
// 建议手动从 ECharts 引入单个图表和组件。请参考所有支持的渲染器/图表/组件: https://github.com/apache/echarts/blob/master/src/echarts.all.ts
// 注册全局 vue-echarts 组件
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
// 引入 element-ui 组件（按需引入: 需要的组件在文件element-ui.js中开启）
import './element-ui.js'

// 全局挂载Ajax请求方法
import request from './fetch/request'
// 引入vue-amap
import VueAMap from 'vue-amap'

use([SVGRenderer, PieChart, LineChart, TitleComponent, LegendComponent, TooltipComponent, GridComponent])
Vue.component('v-chart', ECharts)

Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: '7d5d07d8824d24bee96f50e6fea5e8e9', // 应用: 领见数字农业
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geocoder',
    'AMap.Geolocation',
    'AMap.RangingTool',
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.15',
})

// 页面布局及顶部导航栏组件
// Vue.component('Layout', Layout)
// Vue.component('TopBar', TopBar)

// 配置全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// 监听路由跳转失败的情况
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    window.location.reload()
  }
})
