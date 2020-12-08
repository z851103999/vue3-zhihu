<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传</button>
      </slot>
      <slot v-if="fileStatus ==='success'" name="uploaded" :uploadedData="uploadedData" >
        <button class="btn btn-primary">上传失败</button>
      </slot>
      <slot v-if="fileStatus === 'ready'" name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input ref="fileInput" type="file" name="file" class="file-input d-none" @change="handleFileChange" />
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, Ref } from 'vue'
import { upload } from '@/api/article'
import { IUploadProps } from '@/interface/article'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean

export default defineComponent({
  name: 'Upload',
  inheritAttrs: false,
  props: {
    // 可以再上传时进行一些检查操作
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    upload: {
      type: Object as PropType<IUploadProps>
    }
  },
  emits: ['file-uploaded', 'file-upload-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>(props.upload ? 'success' : 'ready')
    // 传递给插槽作用域的值
    const uploadedData: any = ref<IUploadProps | undefined>(props.upload)
    // 点击按钮转接到file上传dom
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = async (event: Event) => {
      const currentTarget = event.target as HTMLInputElement
      if (currentTarget.files) {
        // 浅拷贝变成一个数组
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) return
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        try {
          fileStatus.value = 'success'
          const result = await upload(formData)
          uploadedData.value = result
          context.emit('file-uploaded', result)
        } catch (e) {
          fileStatus.value = 'error'
          context.emit('file-upload-error', { e })
        } finally {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        }
      }
    }

    watch(
      () => props.upload,
      newVal => {
        if (newVal) {
          fileStatus.value = 'success'
          uploadedData.value = newVal
        }
      }
    )

    return {
      fileInput,
      fileStatus,
      uploadedData,
      triggerUpload,
      handleFileChange
    }
  }
})

</script>
