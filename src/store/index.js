import Vue from 'vue'
import Vuex from 'vuex'

import cookies from 'vue-cookies'
import axios from 'axios'

import router from '@/router'
import SERVER from '@/api/drf'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // rest-auth
    authToken: cookies.get('auth-token'),

    // accounts
    myaccount: null,

    // teams
    collecteams: null,
    interests: null,

    // boards
    articles: null,
    selectedArticle: null,
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}}),    
  },
  mutations: {
    // SET_INIT(state) {
    // },

    // rest-auth
    SET_TOKEN(state, token) {
      state.authToken = token
      cookies.set('auth-token', token)
    },

    // accounts
    SET_MY_ACCOUNT(state, user) {
      state.myaccount = user
    },

    // teams
    SET_COLLECT_TEAMS(state, teams) {
      state.collecteams = teams
    },
    SET_INTERESTS(state, interests) {
      state.interests = interests
    },

    // boards
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_SELECTED_ARTICLE(state, article) {
      state.selectedArticle = article
    }
  },
  actions: {
    // rest-auth
    postAuthData({ commit }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          router.push({path:'/'})
        })
        .catch(err => {
        console.log(err)
          if (Object.keys(err.response.data)[0] === 'password1') {
            alert(err.response.data.password1)
          } else if (Object.keys(err.response.data)[0] === 'non_field_errors') {
            if (err.response.data.non_field_errors[0] === "제공된 인증데이터(credentials)로는 로그인할 수 없습니다.") {
              alert('아이디 혹은 비밀번호가 맞지 않습니다.')
            } else {
              alert(err.response.data.non_field_errors)
            }
          }
        })
    },
    signup({ dispatch }, signupData) {
      const info = {
        data: signupData,
        location: SERVER.ROUTES.signup,
        to: '/'
      }
      dispatch('postAuthData', info)
    },
    login({ dispatch }, loginData) {
      const info = {
        data: loginData,
        location: SERVER.ROUTES.login,
        to: '/'
      }
      dispatch('postAuthData', info)
    },
    logout({ getters, commit }) {
      axios.post(SERVER.URL + SERVER.ROUTES.logout, null, getters.config)
        .then(() => {
          commit('SET_TOKEN', null)
          cookies.remove('auth-token')
          // commit('SET_INIT')
          router.push({ name: 'Login'})
        })
        .catch(err => console.log(err.response.data))
    },

    // accounts
    getMyAccount({ getters, commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.myaccount, getters.config)
        .then(res => {
          commit('SET_MY_ACCOUNT', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    // teams
    fetchCollectTeams({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.collecTeamList)
        .then(res => {
          commit('SET_COLLECT_TEAMS', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    fetchInterests({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.interestList)
        .then(res => {
          commit('SET_INTERESTS', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    
    // boards
    fetchArticles({ commit }, boardName) {
      axios.get(SERVER.URL + SERVER.ROUTES.boards + boardName + '/')
        .then(res => {
          commit('SET_ARTICLES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    selectArticle({ commit }, articleData) {
      axios.get(SERVER.URL + SERVER.ROUTES.boards + articleData.boardName + '/' + articleData.articleId + '/')
        .then(res => {
          commit('SET_SELECTED_ARTICLE', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    createArticle({ getters }, articleCreateData) {
      axios.post(SERVER.URL + SERVER.ROUTES.boards + articleCreateData.boardName + '/', articleCreateData.body, getters.config)
        .then(res => {
          router.push({ name: 'ArticleDetail', params: { board_name: articleCreateData.boardName, article_id: res.data.id }})
        })
        .catch(err => console.log(err.response.data))

    }
  },
  modules: {
  }
})
