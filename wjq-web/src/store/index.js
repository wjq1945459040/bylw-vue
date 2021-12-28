import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userinfo: JSON.parse(sessionStorage.getItem('userinfo'))
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', state.token)
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
      sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
    },
    REMOVE_INFO: state => {
      state.token = ''
      state.userinfo = {}
      localStorage.setItem('token', '')
      sessionStorage.setItem('userinfo', JSON.stringify(''))
    }

  },
  getters: {
    getUserInfo: state => {
      return state.userinfo
    },
  },
  actions: {
  },
  modules: {
  }
})
