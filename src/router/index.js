import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
import store from '../store'
const Home = () => import('@/views/login/Index') // 登录页
const Login = () => import('@/views/login/Index') // 登录页

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '手绘区域查询',
      isAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '用户登录',
      isAuth: false,
    },
  },
]

// 防止跳转同一路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  scrollBehavior: () => ({
    y: 0,
  }),
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = Cookie.get('web_farm_credit_chain_token')

  if (to.meta.title) {
    document.title = '农证链-' + to.meta.title
  }

  const validatorRouter = async () => {
    let data = null
    if (store.state.user.account) {
      data = store.state.user
    } else {
      const that = Vue.prototype
      data = await that.$request.get('/personal/userDetail')
      store.commit('UPDATE_USER_MESSAGE', data)
    }
    return next()
  }

  if (to.path !== '/login') {
    if (!token) return next('login')
    return await validatorRouter()
  }

  if (to.path === '/login') {
    if (!token) return next()
    return await validatorRouter()
  }
})

export default router
