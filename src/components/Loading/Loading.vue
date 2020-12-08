<template>
  <teleport to="#background">
    <div class="loading-container d-flex justify-content-center align-items-center h-100">
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">{{ message }}</span>
      </div>
      <p class="my-3 text-secondary small">{{ message }}</p>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'

export default defineComponent({
  name: 'Loading',
  props: {
    message: {
      type: String,
      default: '加载中...'
    }
  },
  setup () {
    useDomCreate('background')
  }
})
</script>
<style  scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
}
</style>
