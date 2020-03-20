import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
          path: '/commodity/change/:id',
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
          path: '/category/:id',
          name: 'subcategory',
          component: () => import('../components/category/Subcategory.vue'),
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
        },
        {
          path: '/international',
          name: 'international',
          component: () => import('../page/International.vue'),
        },
        {
          path: '/map',
          name: 'map',
          component: () => import('../page/Map.vue'),

        },
        {
          path: '/echarts',
          name: 'echarts',
          component: () => import('../page/Echarts.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../page/Login.vue'),
    },

  ],
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  let flag = window.localStorage.getItem('user')
  if (!flag && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {  // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    flag === 'admin' ? next() : next('/403');
  } else {
    if (navigator.userAgent.indexOf("MSIE") > -1 && to.path === '/edit') {
      alert('当前组件不兼容IE10以下浏览器')
    } else {
      next()
    } //判断是否IE浏览器
  }
})

export default router
