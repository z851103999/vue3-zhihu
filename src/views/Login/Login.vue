<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到知乎</h5>
    <v-form @form-submit="formSubmit">
      <form-item label="邮箱地址">
        <validate-input
          v-model="form.email"
          placeholder="请输入邮箱地址"
          :rules="form.emailRules"
        />
      </form-item>
      <form-item label="密码">
        <validate-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          :rules="form.passwordRules"
        />
        <div class="form-text">
          <router-link to="/register">还没有账户？去注册一个新的吧！</router-link>
        </div>
      </form-item>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { IStoreProps } from '@/store'
import VForm from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import ValidateInput from '@/components/ValidateInput/ValidateInput.vue'
import $message from '@/components/Message/createMessage'
import { IFormProps } from '@/interface'

export default defineComponent({
  name: 'Login',
  components: {
    VForm,
    FormItem,
    ValidateInput
  },
  setup () {
    const store = useStore<IStoreProps>()
    const router = useRouter()

    const form = reactive<IFormProps>({
      email: '',
      password: '',
      emailRules: [
        { type: 'required', message: '电子邮箱地址不能为空' },
        { type: 'email', message: '请输入正确的电子邮箱格式' }
      ],
      passwordRules: [{ type: 'required', message: '密码不能为空' }]
    })

    const formSubmit = async (result: boolean) => {
      if (result) {
        await store.dispatch('userLogin', {
          email: form.email,
          password: form.password
        })
        $message('登陆成功')
        router.push('/')
      }
    }

    return {
      form,
      formSubmit
    }
  }
})
</script>

<style scoped></style>
