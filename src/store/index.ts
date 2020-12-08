import { createLogger, createStore } from 'vuex'
import Action from './actionTypes'

import { IColumnDetailProps, IColumnProps } from '@/interface/column'
import { IUserProps } from '@/interface/user'
// import { IPageProps } from '@/interface'

import { checkLogin, userLogin } from '@/api/user'
import { getColumnDetail, getColumnList } from '@/api/column'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IStoreProps {
  isLoading: boolean;
  columnList: IColumnProps[];
  columnDetail: IColumnDetailProps[];
  userInfo: IUserProps | null;
  userToken: string;
}

export default createStore<IStoreProps>({
  state: {
    // 登录状态
    isLoading: false,
    // 专栏数据
    columnDetail: [],
    // 专栏分类
    columnList: [],
    // 登录信息
    userInfo: null,
    userToken: ''
  },
  mutations: {
    [Action.SET_USER_INFO] (state, userInfo: IUserProps) {
      state.userInfo = userInfo
    },
    [Action.SET_COLUMN_LIST] (state, columnList: IColumnProps[]) {
      state.columnList = columnList
    },
    [Action.SET_COLUMN_DETAIL] (state, columnDetail: IColumnDetailProps[]) {
      state.columnDetail = columnDetail
    },
    [Action.SET_IS_LOADING] (state, isLoading: boolean) {
      state.isLoading = isLoading
    },
    [Action.USER_LOGOUT] (state) {
      state.userInfo = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    // 用户登录
    async userLogin ({ commit }, user: { email: string;password: string }) {
      const { token } = await userLogin(user)
      localStorage.setItem('token', token)
      commit(Action.SET_USER_TOKEN, token)
    },
    // 检查登录状态
    async checkLogin ({ commit }) {
      try {
        const result = await checkLogin()
        console.log(result)
        commit(Action.SET_USER_INFO, {
          isLogin: true,
          name: result.nickName,
          _id: result._id,
          column: result.column
        })
      } catch (e) {
        localStorage.removeItem('token')
        commit(Action.SET_USER_INFO, {
          isLogin: false
        })
      }
    },
    // 获取专栏的一些信息
    async getColumnList ({ commit, state }, { currentPage = 1, pageSize = 10 }) {
      const result = await getColumnList(currentPage, pageSize)
      commit(Action.SET_COLUMN_LIST, state.columnList.concat(result.list))
      return Promise.resolve(result)
    },

    async getColumnDetail ({ commit }, { id, currentPage = 1, pageSize = 10 }) {
      const result = await getColumnDetail(id as string, currentPage, pageSize)
      commit(Action.SET_COLUMN_DETAIL, result.list)
    }
  },
  plugins: [createLogger()]
})
