/* eslint-disable space-before-function-paren */
export default {
  namespaced: true,
  state() {
    return {
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      state.userInfo = obj
    }
  },
  actions: {},
  getter: {}

}
