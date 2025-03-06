import Vue from 'vue'
import VueRouter from 'vue-router'
import Pay from '@/views/pay'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import Myorder from '@/views/myorder'
import store from '@/store'
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/search', component: Search },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }

      ]
    },
    { path: '/searchlist', component: SearchList },
    { path: '/prodetail/:id', component: ProDetail }, // 动态路由,传递参数
    { path: '/pay', component: Pay },
    { path: '/myorder', component: Myorder }

  ]
})
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
