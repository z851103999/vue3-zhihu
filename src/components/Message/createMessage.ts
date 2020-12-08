import { createApp } from 'vue'
import Message from './index.vue'

type MessageType = 'success' | 'danger' | 'warning' | 'info'

const createMessage = (message: string, type: MessageType = 'success', timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const div = document.createElement('div')
  document.body.appendChild(div)
  messageInstance.mount(div)
  setTimeout(() => {
    messageInstance.unmount(div)
    document.body.removeChild(div)
  }, timeout)
}

export default createMessage
