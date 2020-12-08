<template>
  <div class="create-post-page">
    <h4>{{ isEdit ? '编辑文章' : '新建文章' }}</h4>
    <upload class="upload d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
            :before-upload="uploadCheck">
      <h2>点击上传头像</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">上传中</span>
          </div>
        </div>
      </template>
      <template #uploaded="data">
        <img :src="data.uploadedData.url" :alt="data.uploadedData.filename" class="upload-img"/>
      </template>
    </upload>
    <v-form @form-submit="formSubmit">
      <form-item label="文章标题">
        <validate-input
          v-model="form.title"
          :rules="form.titleRules"
          placeholder="请输入文章标题"
        />
      </form-item>
      <form-item label="文章详情">
        <validate-input
          tag="textarea"
          rows="10"
          v-model="form.content"
          :rules="form.contentRules"
          placeholder="请输入文章详情"
        />
      </form-item>
      <template #submit>
        <button class="btn btn-primary btn-large">{{ isEdit ? '编辑文章' : '发表文章' }}</button>
      </template>
    </v-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IStoreProps } from '@/store'
import Upload from '@/components/Upload/Upload.vue'
import $message from '@/components/Message/createMessage'
import VForm from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import ValidateInput from '@/components/ValidateInput/ValidateInput.vue'
import { IRuleProps } from '@/interface'
import { IUploadProps } from '@/interface/article'
import { beforeUploadCheck } from '@/utils'
import { editArticle, getArticle } from '@/api/article'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ICreateProps {
  title: string;
  content: string;
  imageId: string;
  titleRules: IRuleProps[];
  contentRules: IRuleProps[];
}

export default defineComponent({
  name: 'create',
  components: {
    Upload,
    VForm,
    FormItem,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore<IStoreProps>()
    // 表单的值
    const form = reactive<ICreateProps>({
      title: '',
      content: '',
      imageId: '',
      titleRules: [{ type: 'required', message: '文章标题不能为空' }],
      contentRules: [{ type: 'required', message: '文章详情不能为空' }]
    })
    // 判断url是否有ID
    const isEdit = !!route.query.id
    const upload = ref<IUploadProps>()
    // 上传内容判断内容文件大小
    const uploadCheck = (file: File) => {
      // console.log(file)
      const result = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      // console.log(result)
      if (!result.isValid) {
        const msg = result.error === 'format' ? '只能上传JPG/PNG格式图片' : '只能上传1MB以内图片'
        $message(msg, 'danger')
      }
      return result.isValid
    }
    const handleUploadFile = (data: IUploadProps) => {
      if (data._id) {
        form.imageId = data._id
      }
    }
    const formSubmit = async (isValid: boolean) => {
      if (isValid && store.state.userInfo) {
        // 判断url是否有ID
        if (isEdit) {
          await editArticle(route.query.id as string, {
            title: form.title,
            content: form.content,
            image: form.imageId
          })
          $message('发表成功，2秒后跳转到文章', 'success', 2000)
          await router.push({
            path: `/column/detail/${store.state.userInfo.column}`
          })
        }
      }
    }
    onMounted(async () => {
      if (isEdit) {
        const { title, content, image } = await getArticle(route.query.id as string)
        form.title = title
        form.content = content
        upload.value = image
      }
    })

    return {
      form,
      upload,
      isEdit,
      uploadCheck,
      handleUploadFile,
      formSubmit
    }
  }

})
</script>

<style>
.create-post-page{
  margin: 20px 0;
}
.upload{
  height: 200px;
  cursor: pointer;
}
.upload-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
