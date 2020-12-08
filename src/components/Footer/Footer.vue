<template>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/">知乎专栏</router-link>
        </li>
        <li class="list-inline-item">
          <a href="#" target="_blank">GitHub</a>
        </li>
        <li class="list-inline-item">
          <a href="#" target="_blank">Gitee</a>
        </li>
      </ul>
    </small>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer'
})
</script>
