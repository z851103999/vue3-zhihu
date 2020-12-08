<template>
  <li class="['dropdown-menu',disabled ? 'is-disabled']">
    <slot/>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style>
.dropdown-menu.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}

</style>
