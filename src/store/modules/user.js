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
    logout(context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})

      // 购物车信息要重置 (跨模块调用 mutation)  cart/setCartList
      context.commit('cart/setCartList', [], { root: true })
    }
  },

  getter: {}

}
