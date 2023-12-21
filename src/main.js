import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './assets/style/element-variables.scss'
// 全局注册element-plus/icons-vue
import * as ICONS from '@element-plus/icons-vue'
// 引入路由
import router from './router'
// 引入pinia
import pinia from './pinia'
// 权限控制
import './permission'
// 引入svg图标注册脚本
import 'virtual:svg-icons-register'
// 注册全局组件
import * as Components from './global-components'
// 错误日志
import useErrorHandler from './error-log'

const app = createApp(App)
Object.entries(ICONS).forEach(([key, component]) => {
  // app.component(key === 'PieChart' ? 'PieChartIcon' : key, component)
  app.component(key, component)
})

Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component)
})

useErrorHandler(app)

app.use(ElementPlus).use(pinia).use(router).mount('#app')
