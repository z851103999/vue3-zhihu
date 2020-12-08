<!--下拉列表按钮-->
<template>
  <div ref="menuRef" class="dropdown">
    <a
      class="btn btn-outline-light my-2 dropdown-toggle"
      href="#"
      @click.prevent="exchangeToggleOpen"
    >
      {{ title }}
    </a>
<!--显示下拉菜单-->
    <ul v-show="visible" class="dropdown-menu" style="display: block">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import useClickOutSide from '@/hooks/useClickOutSide'

export default defineComponent({
  name: 'Menu',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    // 取反
    const visible = reactive({
      visible: false,
      exchangeToggleOpen: () => {
        visible.visible = !visible.visible
      }
    })
    // 响应式对象与ref绑定名称一致就可拿到dom节点
    const menuRef = ref<null | HTMLElement>(null)
    console.log(menuRef)
    // hooks
    const isClickOutSide = useClickOutSide(menuRef)
    // 监听
    watch(isClickOutSide, () => {
      if (isClickOutSide.value && visible.visible) {
        visible.exchangeToggleOpen()
      }
    })

    const visibleRef = toRefs(visible)

    return {
      ...visibleRef,
      menuRef
    }
  }
})
</script>
