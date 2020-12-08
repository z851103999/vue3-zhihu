<template>
  <article v-if="detail" class="w-75 mx-auto mb-5 pb-3">
    <img v-if="image" :src="image" alt="">
    <h2 class="mb-4">{{ detail.title }}</h2>
    <div class="border-top border-bottom py-3 mb-5 align-items-center row g-0">
      <div class="col">
        <div class="d-flex align-items-center">
          <img
            :src="avatar"
            :alt="detail.author.nickName"
            class="rounded-circle img-thumbnail"
            height="50"
            width="50"
          />
          <div class="ml-2">
            <h6 class="d-block mb-0">{{ detail.author.nickName }}</h6>
            <span class="text-truncate text-muted d-block">{{ detail.author.description }}</span>
          </div>
        </div>
      </div>
      <span class="text-muted col text-right font-italic">发表于：{{ detail.createdAt }}</span>
    </div>
    <div v-html="content"></div>
    <div v-if="isShowEdit" class="btn-group mt-5">
      <router-link
        :to="{
          path: '/article/create',
          query: {
            id: detail._id
          }
        }"
        type="button"
        class="btn btn-success"
      >
        编辑
      </router-link>
      <button type="button" class="btn btn-danger mx-3" @click="modalVisible = true">删除</button>
    </div>
  </article>
  <modal  title="删除文章"
          :visible="modalVisible"
          @close="modalVisible = false"
          @confirm="delArticle"> <p>确定要删除这篇文章？</p></modal>

</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { IArticleProps } from '@/interface/article'
import { getArticle, deleteArticle } from '@/api/article'
import Modal from '@/components/Modal/Modal.vue'
import MarkdownIt from 'markdown-it'
import $message from '@/components/Message/createMessage'

export default defineComponent({
  name: 'ArticleDetail',
  components: {
    Modal
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const detail = ref<IArticleProps>()

    const image = computed(() => {
      if (detail.value && detail.value.image) {
        return detail.value.image.url + '?x-oss-process=image/resize,w_850'
      }
      return null
    })

    const avatar = computed(() => {
      return (
        (detail.value && detail.value.author.avatar && detail.value.author.avatar.url) ||
        require('@/assets/images/avatar.jpg')
      )
    })

    const content = computed(() => {
      if (detail.value && detail.value.content) {
        const { isHTML, content } = detail.value
        console.log(detail.value)
        if (!isHTML) {
          const markdown = new MarkdownIt()
          return markdown.render(content)
        } else {
          return content
        }
      }
    })

    const isShowEdit = computed(() => {
      if (store.state.userInfo) {
        const { isLogin, _id } = store.state.userInfo
        if (detail.value && detail.value.author && isLogin) {
          const articleAuthor = detail.value.author
          return articleAuthor._id === _id
        }
      }
      return false
    })
    const delArticle = async () => {
      await deleteArticle(route.params.id as string)
      $message('删除成功', 'success', 2000)
      router.back()
    }
    onMounted(async () => {
      detail.value = await getArticle(route.params.id as string)
    })
    return {
      detail,
      image,
      content,
      avatar,
      isShowEdit,
      delArticle

    }
  }

})

</script>
