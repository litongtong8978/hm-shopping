/* eslint-disable space-before-function-paren */
import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state() {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {

  },
  getter: {}

}
