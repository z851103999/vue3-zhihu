import { onMounted, onUnmounted, ref, Ref } from 'vue'

export default function useClickOutSide (element: Ref<null | HTMLElement>) {
  // console.log(element)
  const isClickOutSide = ref(false)
  const handler = (event: MouseEvent) => {
    if (element.value && !element.value.contains(event.target as HTMLElement)) {
      isClickOutSide.value = true
    } else {
      isClickOutSide.value = false
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })
  return isClickOutSide
}
