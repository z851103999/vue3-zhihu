<template>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IColumnDetailProps } from '@/interface/column'

export default defineComponent({
  name: 'ColumnDetailList',
  props: {
    detailList: {
      type: Array as PropType<IColumnDetailProps[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.post-list {
  h4 {
    a {
      text-decoration: none;
      color: #1a1a1a;
      &:hover {

      }
    }
  }
}
</style>
