<template>
  <div class="home">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-log-6 col-md-8 mx-auto">
          <img src="../../assets/images/callout.svg" class="w-50"/>
          <h2 class="text-center">随心协作，自由表达</h2>
          <p>
            <router-link to="/article/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="text-center">发现精彩</h4>
      <column-list :column-list="columnList" />
    <button
      v-if="!isLastPage"
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
      @click="loadMorePage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from 'vue'
import ColumnList from '@/components/ColumnList/ColumnList.vue'
import { useStore } from 'vuex'
import { IStoreProps } from '@/store'
import useLoadMore from '@/hooks/useLoadMore'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<IStoreProps>()
    const columnList = computed(() => store.state.columnList)
    const count = ref(0)

    const { loadMorePage, currentPage } = useLoadMore('getColumnList')
    const isLastPage = computed(() => {
      return Math.ceil(count.value / 5) < currentPage.value
    })
    onMounted(async () => {
      const result = await store.dispatch('getColumnList', {
        currentPage: 1,
        pageSize: 5
      })
      count.value = result.count
    })
    return {
      columnList,
      isLastPage,
      loadMorePage
    }
  }
})
</script>
