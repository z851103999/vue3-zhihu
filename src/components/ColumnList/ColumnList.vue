<template>
  <div class="row">
    <div v-for="column of columns" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.url"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <div style="height: 50px"></div>
          <router-link
            :to="`/column/detail/${column._id}`"
            class="card-btn btn btn-outline-primary"
          >
            进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { IColumnProps } from '@/interface/column'

export default defineComponent({
  name: 'ColumnList',
  props: {
    columnList: {
      type: Array as PropType<IColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.columnList.map(column => {
        if (!column.avatar) {
          column.avatar = {
            url: require('@/assets/images/avatar.jpg')
          }
        }
        return column
      })
    })

    return {
      columns: columnList
    }
  }
})
</script>
<!--<style lang="scss" scoped>-->
<!--.card-body {-->
<!--  position: relative;-->
<!--  .card-btn {-->
<!--    position: absolute;-->
<!--    bottom: 20px;-->
<!--    left: 50%;-->
<!--    transform: translateX(-50%);-->
<!--  }-->
<!--}-->
<!--</style>-->
