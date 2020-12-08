<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a href="#" class="navbar-brand">知乎专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/register" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <v-menu :title="`您好，${user.name}`">
          <menu-item>
            <router-link to="/article/create" class="dropdown-item">新建文章</router-link>
          </menu-item>
          <menu-item>
            <router-link :to="`/column/detail/${user.column}`" class="dropdown-item">
              我的专栏
            </router-link>
          </menu-item>
          <menu-item>
            <a href="#" class="dropdown-item">编辑资料</a>
          </menu-item>
          <menu-item>
            <a href="#" class="dropdown-item" @click="logout">退出登录</a>
          </menu-item>
        </v-menu>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { defineComponent, PropType } from 'vue'
import { IUserProps } from '@/interface/user'
import VMenu from '../Menu/Menu.vue'
import MenuItem from '../Menu/MenuItem.vue'
import $message from '@/components/Message/createMessage'

export default defineComponent({
  name: 'Header',
  components: {
    VMenu,
    MenuItem
  },
  props: {
    user: {
      type: Object as PropType<IUserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const logout = () => {
      store.commit('userLogout')
      $message('退出登录成功， 2秒后跳转到首页', 'success', 2000)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }

    return {
      logout
    }
  }
})
</script>
