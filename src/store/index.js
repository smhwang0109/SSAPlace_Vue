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
    users: null,
    profile: null,

    // teams
    teams: null,
    team: null,
    collectTeams: null,
    interests: null,
    languages: null,

    // boards
    articles: null,
    ssafyArticles: null,
    freeArticles: null,
    selectedArticle: null,
    comments: null,
    tags: null
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}}),
    
    // boards
    articleData: state => state.selectedArticle.articleData
  },
  mutations: {
    SET_INIT(state) {
      state.authToken = null
      state.myaccount = null
    },

    // rest-auth
    SET_TOKEN(state, token) {
      state.authToken = token
      cookies.set('auth-token', token)
    },

    // accounts
    SET_MY_ACCOUNT(state, user) {
      state.myaccount = user
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_PROFILE(state, profile) {
      state.profile = profile
    },

    // teams
    SET_TEAMS(state, teams) {
      state.teams = teams
    },
    SET_TEAM(state, team) {
      state.team = team
    },
    SET_COLLECT_TEAMS(state, teams) {
      state.collectTeams = teams
    },
    SET_INTERESTS(state, interests) {
      state.interests = interests
    },
    SET_LANGUAGES(state, languages) {
      state.languages = languages
    },

    // boards
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_SSAFY_ARTICLES(state, articles) {
      state.ssafyArticles = articles.slice(0,4)
    },
    SET_FREE_ARTICLES(state, articles) {
      state.freeArticles = articles.slice(0,4)
    },
    SET_SELECTED_ARTICLE(state, article) {
      state.selectedArticle = article
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_TAGS(state, tags) {
      state.tags = tags
    }
  },
  actions: {
    // rest-auth
    postAuthData({ commit, dispatch }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          dispatch('getMyAccount')
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
          commit('SET_INIT')
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
    fetchUsers({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.userList)
        .then(res => {
          commit('SET_USERS', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    getProfile({ commit }, userId) {
      axios.get(SERVER.URL + SERVER.ROUTES.userList + userId + '/')
        .then(res => {
          commit('SET_USER', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    // teams
    fetchTeams({ getters, commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.teamList, getters.config)
        .then(res => {
          commit('SET_TEAMS', res.data)
        })
        .catch(err => console.log(err))
    },
    getTeam({ commit }, teamId) {
      axios.get(SERVER.URL + SERVER.ROUTES.teamList + teamId + '/')
        .then(res => {
          commit('SET_TEAM', res.data)
        })
        .catch(err => console.log(err))
    },

    fetchCollectTeams({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.collectTeamList)
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
    fetchLanguages({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.languageList)
        .then(res => {
          commit('SET_LANGUAGES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    
    // boards
    fetchArticles({ commit }, boardName) {
      axios.get(SERVER.URL + SERVER.ROUTES.boards + boardName + '/')
        .then(res => {
          commit('SET_ARTICLES', res.data)
          if (boardName === 'ssafy') {
            commit('SET_SSAFY_ARTICLES', res.data)
          }
          else {
            commit('SET_FREE_ARTICLES', res.data)
          }
        })
        .catch(err => console.log(err.response.data))
    },
    selectArticle({ commit }, articleData) {
      axios.get(SERVER.URL + SERVER.ROUTES.boards + articleData.boardName + '/' + articleData.articleId + '/')
        .then(res => {
          res.data.articleData = articleData
          commit('SET_SELECTED_ARTICLE', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    createArticle({ getters }, articleCreateData) {
      axios.post(SERVER.URL + SERVER.ROUTES.boards + articleCreateData.boardName + '/', articleCreateData, getters.config)
        .then(res => {
          router.push({ name: 'ArticleDetail', params: { board_name: articleCreateData.boardName, article_id: res.data.id }})
        })
        .catch(err => {
          console.log(err)
          if (articleCreateData.boardName === null){
            console.log("null null")
          }
        })
    },
    updateArticle({ getters }, articleUpdateData) {
      axios.put(SERVER.URL + SERVER.ROUTES.boards + getters.articleData.boardName + '/' + getters.articleData.articleId + '/', articleUpdateData, getters.config)
      .then(res => {
        router.push({ name: 'ArticleDetail', params: { board_name: getters.articleData.boardName, article_id: res.data.id }})
      })
      .catch(err => {
        console.log(err)
        if (getters.articleData.boardName === null){
          console.log("null null")
        }
      })
    },
    deleteArticle({ getters }) {
      axios.delete(SERVER.URL + SERVER.ROUTES.boards + getters.articleData.boardName + '/' + getters.articleData.articleId + '/', null, getters.config)
      .then(() => {
        router.push({ name: 'Boards', params: { board_name: getters.articleData.boardName }})
      })
      .catch(err => {
        console.log(err)
      })
    },
    fetchComments({ commit }, articleData) {
      axios.get(SERVER.URL + SERVER.ROUTES.boards + articleData.boardName + '/' + articleData.articleId + '/' + 'comments/')
        .then(res => {
          commit('SET_COMMENTS', res.data)
        })
        .catch(err => console.log(err.repsonse.data))
    },
    createComment({ getters, dispatch }, commentCreateData) {
      axios.post(SERVER.URL + SERVER.ROUTES.boards + getters.articleData.boardName + '/' + getters.articleData.articleId + '/' + 'comments/', commentCreateData, getters.config)
        .then(() => {
          dispatch('fetchComments', getters.articleData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateComment({ getters, dispatch }, commentUpdateData) {
      axios.put(SERVER.URL + SERVER.ROUTES.boards + getters.articleData.boardName + '/' + getters.articleData.articleId + '/' + 'comments/' + commentUpdateData.commentId + '/', commentUpdateData.body, getters.config)
        .then(() => {
          dispatch('fetchComments', getters.articleData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment({ getters, dispatch }, commentId) {
      axios.delete(SERVER.URL + SERVER.ROUTES.boards + getters.articleData.boardName + '/' + getters.articleData.articleId + '/' + 'comments/' + commentId + '/', null, getters.config)
        .then(() => {
          dispatch('fetchComments', getters.articleData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTags({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.boards + 'tags/')
        .then(res => {
          commit('SET_TAGS', res.data)
        })
        .catch(err => console.log(err.repsonse.data))
    }
  },
  modules: {
  }
})
