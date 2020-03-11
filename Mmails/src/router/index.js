import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      component: () => import('../page/Home.vue'),
      children: [
        {
          path: '/',
          name: 'page',
          component: () => import('../page/HomePage.vue'),
        },
        {
          path: '/commodity',
          name: 'commodity',
          component: () => import('../page/Commodity.vue'),
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('../page/Category.vue'),
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../page/Order.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../page/User.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../page/Login.vue'),
    },
  ],
  mode: 'history'
})
