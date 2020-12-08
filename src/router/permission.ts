import router from './index'
import store from '@/store/index'

router.beforeEach(async (to, form, next) => {
  // title
  document.title = (to.meta && to.meta.title) || '知乎专栏'
  // token 判断token是否过期 否则为未登录
  const token = localStorage.getItem('token')
  if (token) {
    await store.dispatch('checkLogin')
  } else {
    store.commit('setUserInfo', { isLogin: false })
  }

  if (to.meta.auth && !store.state.userInfo?.isLogin) {
    next('/login')
  } else if (to.path === 'login' && store.state.userInfo?.isLogin) {
    next('/')
  }
  next()
})
