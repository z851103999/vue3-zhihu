<template>
  <form class="validate-form-container">
<!--    form-item-->
    <slot />
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()
type validateFunc = () => boolean

export default defineComponent({
  name: 'Form',
  emits: ['form-submit'],
  setup (props, context) {
    const funcList: validateFunc[] = []

    const submitForm = () => {
      const result = funcList.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const formValidate = (func?: validateFunc) => {
      funcList.push(func as validateFunc)
    }
    const formClear = () => {
      emitter.emit('form-clear')
    }
    emitter.on('form-validate', formValidate)
    onUnmounted(() => {
      emitter.off('form=validate', formValidate)
    })
    return {
      submitForm,
      formClear
    }
  }
})

</script>
