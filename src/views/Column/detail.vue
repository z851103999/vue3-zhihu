<template>
<div class="column-detail-page w-75 mx-auto">
  <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
    <div class="col-3 text-center">
      <img
        :src="column.avatar && column.avatar.url"
        :alt="column.title"
        class="rounded-circle border w-50"
      />
    </div>
    <div class="col-9">
      <h4>{{column.title}}</h4>
      <p class="text-muted">{{column.description}}</p>
    </div>
  </div>
  <div class="post-list">
    <div v-for="item of columnDetail" :key="item._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/article/detail/${item._id}`">{{ item.title }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="item.image" class="col-4">
            <img :src="item.image.url" :alt="item.title" class="rounded-lg w-100" />
          </div>
          <p :class="['text-muted', item.image ? 'col-8' : '']">{{ item.excerpt }}</p>
        </div>
        <div class="text-muted">{{ item.createdAt }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { IStoreProps } from '@/store'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
  },
  setup () {
    const route = useRoute()
    const store = useStore<IStoreProps>()

    const id = route.params.id
    const column = computed(() => store.state.columnList.find(item => item._id === id))
    const columnDetail = computed(() => store.state.columnDetail)

    onMounted(async () => {
      await store.dispatch('getColumnList', {
        currentPage: 1,
        pageSize: 5
      })
      await store.dispatch('getColumnDetail', {
        id
      })
    })

    return {
      column,
      columnDetail
    }
  }
})

</script>

<style>
.post-list h4 a{
  text-decoration: none;
  color: #1a1a1a;
}

a:hover{
  color: #0d6efd;
}
</style>
