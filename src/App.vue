<template>
  <div class="container">
    <Header :user="userInfo" v-if="userInfo" />
    <Loading v-if="isLoading" />
    <router-view/>
    <Footer />
  </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import Loading from '@/components/Loading/Loading.vue'
import { IStoreProps } from '@/store'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    Loading,
    Header,
    Footer
  },
  setup () {
    const store = useStore<IStoreProps>()
    const userInfo = computed(() => store.state.userInfo)
    const isLoading = computed(() => store.state.isLoading)

    return {
      isLoading,
      userInfo
    }
  }
})

</script>

<style>

</style>
