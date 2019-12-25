import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Comment from '../views/comment'
// 默认背景
import homehome from '../views/home/home'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
    // 地址啥也不写，显示默认
    path: '',
    component: homehome
  }, {
    path: 'comment',
    component: Comment
  }, {
    path: 'material', // 素材列表
    component: () => import('../views/material')
  }, {
    path: 'articles',
    component: () => import('../views/articles')
  }, {
    path: 'publish',
    component: () => import('../views/publish')
  }]
}, {
  path: '/login',
  component: Login
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
