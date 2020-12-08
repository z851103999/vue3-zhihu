import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Login/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/Article/index.vue'),
    children: [
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('@/views/Article/create.vue'),
        meta: {
          title: '创建文章',
          auth: true
        }
      },
      {
        path: 'detail/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/Article/detail.vue'),
        meta: {
          title: '文章详情'
        }
      }
    ]
  },
  {
    path: '/column',
    name: 'Column',
    component: () => import('@/views/Column/index.vue'),
    children: [
      {
        path: 'detail/:id',
        name: 'ColumnDetail',
        component: () => import('@/views/Column/detail.vue'),
        meta: {
          title: '专栏详情'
        }
      }
    ],
    meta: {
      title: '专栏列表'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
