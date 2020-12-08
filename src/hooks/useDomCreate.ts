import { onUnmounted } from 'vue'

export default function useDomCreate (nodeId: string) {
  // console.log(nodeId)
  const div = document.createElement('div')
  div.id = nodeId
  document.body.appendChild(div)

  onUnmounted(() => {
    document.body.removeChild(div)
  })
}
