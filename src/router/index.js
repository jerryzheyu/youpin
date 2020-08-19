import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
// 一级路由
import home from '../views/home';
import cart from '../views/cart';
import kinds from '../views/kinds';
import user from '../views/user';
import layout from '../components/layout.vue';


//二级路由

const login = () => import('../components/login.vue')
const orderlist = () => import('../views/user/child/orderlist.vue')
const assets = () => import('../views/user/child/assets.vue')
const adress = () => import('../views/user/child/adress.vue')
const userinfo = () => import('../views/user/child/userinfo.vue')
const details = () => import('../views/details')
const kinds_list = () => import('../views/kinds/kinds_list.vue')
const adress_edit = () => import('../views/user/child/adress_edit.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      showTab: true
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart,
    meta: {

      showTab: true
    },
  },
  {
    path: '/kinds',
    name: 'kinds',
    component: kinds,
    meta: {
      showTab: true
    },
  },

  {
    path: '/user',
    name: 'user',
    component: user,
    meta: {
      showTab: true
    },
    children: [
      {
        path: 'userinfo',
        name: 'userinfo',
        component: userinfo,
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'orderlist',
        name: 'orderlist',
        component: orderlist,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'assets',
        name: 'assets',
        component: assets,
        meta: {
          requireAuth: true
        },
      },
      {
        path: 'adress',
        name: 'adress',
        component: adress,
        meta: {
          requireAuth: true
        },
        children: [{

          path: 'adress_edit',
          name: 'adress_edit',
          component: adress_edit,

        }]
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/details/:id',
    name: 'details',
    component: details
  },
  {
    path: '/kinds_list/:id',
    name: 'kinds_list',
    component: kinds_list,

  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,

  },


]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  store.dispatch('UserInfo')
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {

      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
