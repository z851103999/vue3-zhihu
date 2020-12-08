<template>
  <teleport to="#message">
    <div
      v-if="visible"
      class="fixed-top w-50 mx-auto my-3 alert alert-dismissible fade show"
      :class="classType"
      role="alert"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="close btn "
        data-dismiss="alert"
        aria-label="Close"
        @click.prevent="close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'

type MessageType = 'success' | 'danger' | 'warning' | 'info'

export default defineComponent({
  name: 'Message',
  props: {
    message: {
      type: String,
      default: '请求错误'
    },
    type: {
      type: String as PropType<MessageType>,
      default: 'success'
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    useDomCreate('message')

    const visible = ref(true)
    const classType = computed(() => {
      return `alert-${props.type}`
    })
    // 关闭窗口
    const close = () => {
      visible.value = false
      context.emit('close-message', true)
    }

    return {
      visible,
      close,
      classType
    }
  }
})
</script>
