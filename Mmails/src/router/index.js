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
          path: '/commodity/add',
          name: 'commodity_add',
          component: () => import('../components/commodity/AddCommodity.vue'),
        },
        {
          path: '/commodity/change',
          name: 'commodity_change',
          component: () => import('../components/commodity/ChangeCommodity.vue'),
        },
        {
          path: '/commodity/details/:id',
          name: 'commodity_details',
          component: () => import('../components/commodity/CommodityDetails.vue'),
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('../page/Category.vue'),
        },
        {
          path: '/category/add',
          name: 'category_add',
          component: () => import('../components/category/AddCategory.vue'),
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../page/Order.vue'),
        },
        {
          path: '/order/details/:id',
          name: 'order_details',
          component: () => import('../components/details/OrderDetails.vue'),
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
