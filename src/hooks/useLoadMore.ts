import { ref } from 'vue'
import { IPageProps } from '@/interface'
import { useStore } from 'vuex'

/**
 * 加载更多
 * @param action
 * @param params
 */
export default function useLoadMore (action: string, params: IPageProps = { currentPage: 2, pageSize: 5 }) {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const loadMorePage = async () => {
    await store.dispatch(action, {
      currentPage: currentPage.value,
      pageSize: params.pageSize
    })
    currentPage.value++
  }
  return {
    loadMorePage,
    currentPage
  }
}
