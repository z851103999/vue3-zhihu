<template>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">{{ label }}</label>
    <slot/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
})
</script>
