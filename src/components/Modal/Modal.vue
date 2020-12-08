<template>
  <teleport to="#modal">
    <div v-if="visible" class="modal d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="confirm">确定</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useDomCreate from '@/hooks/useDomCreate'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'confirm'],
  setup (props, context) {
    useDomCreate('modal')

    const confirm = () => {
      context.emit('confirm')
    }
    const close = () => {
      context.emit('close')
    }

    return {
      confirm,
      close
    }
  }
})
</script>
