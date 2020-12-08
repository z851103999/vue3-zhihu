<template>
  <div class="validate-input-container pb-3">
    <!-- 使用attrs将传递给组件的键值对赋给input -->
    <template v-if="tag === 'input'">
      <input
        v-bind="$attrs"
        v-model="input.value"
        :class="['form-control', input.error ? 'is-invalid' : '']"
        @blur="validateInput"
      />
    </template>
    <template v-if="tag === 'textarea'">
      <textarea
        v-bind="$attrs"
        v-model="input.value"
        :class="['form-control', input.error ? 'is-invalid' : '']"
        @blur="validateInput"
      />
    </template>
    <div class="invalid-feedback">
      {{ input.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, PropType, reactive } from 'vue'
import { emitter } from '../Form/Form.vue'

const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IRuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type TagType = 'input' | 'textarea'

export default defineComponent({
  name: 'ValidateInput',
  // 当在组件上传递非props属性时，会自动挂载到根节点(class，style除外)，如果不想继承到根节点，需要显示配置该属性为false
  inheritAttrs: false,
  props: {
    rules: Array as PropType<IRuleProp[]>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup (props, context) {
    const input = reactive({
      // Vue2: 接收一个value属性，使用input的value属性，绑定input事件emit一个input事件并把value传递出去 如果是其他绑定的数值，需要model对象进行覆盖
      // Vue3: 接收一个modelValue属性，使用input的value属性，绑定input事件emit一个update:modelValue事件并把value传递出去
      value: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })

    const validateInput = () => {
      if (props.rules) {
        const isAccess = props.rules.every(rule => {
          let passed = true
          input.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = input.value.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(input.value)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        input.error = !isAccess
        return isAccess
      } else {
        return true
      }
    }

    const clearValue = () => {
      input.value = ''
    }

    // 通过监听validateInput事件 将是否通过的消息返回给调用页面
    emitter.on('form-clear', clearValue)

    onMounted(() => {
      emitter.emit('form-validate', validateInput)
    })
    onUnmounted(() => {
      emitter.off('form-clear', clearValue)
    })

    return {
      input,
      validateInput,
      clearValue
    }
  }
})
</script>
