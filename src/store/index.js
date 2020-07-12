import Vue from 'vue'
import Vuex from 'vuex'

import cookies from 'vue-cookies'
import axios from 'axios'

import router from '@/router'
import SERVER from '@/api/drf'

import Swal from 'sweetalert2'

Vue.use(Vuex)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
 })

//  const swal = Swal.mixin({
//   position: 'center',
//   showConfirmButton: true,
//   // title: this.errorMessages,
// })

export default new Vuex.Store({
  state: {
    // rest-auth
    authToken: cookies.get('auth-token'),

    // accounts
    myaccount: null,
    users: null,
    profile: null,
    errorMessages:null,
    messageGroups: null,
    messages: null,
    toUserId: null,


    // teams
    teams: null,
    team: null,
    collectTeams: null,
    collectThreeTeams: null,
    collectTeam: null,
    interests: null,
    languages: null,

    // boards
    articles: null,
    ssafyArticles: null,
    freeArticles: null,
    selectedArticle: null,
    comments: null,
    tags: null,
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}}),
    
    // boards
    articleData: state => state.selectedArticle.articleData,
    isArticleLike: state => state.selectedArticle.like_users.includes(state.myaccount.id),

    
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
    SET_MESSAGE_GROUPS(state, messageGroups) {
      state.messageGroups = messageGroups
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages
    },
    SET_TO_USER_ID(state, userId) {
      state.toUserId = userId
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
      state.collectThreeTeams = teams.slice(0, 3)
    },
    SET_COLLECT_TEAM(state, team) {
      state.collectTeam = team
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
      state.ssafyArticles = articles.slice(0,5)
    },
    SET_FREE_ARTICLES(state, articles) {
      state.freeArticles = articles.slice(0,5)
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
    // 회원가입
    postAuthData1({ commit, dispatch }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          dispatch('getMyAccount')
          router.push({path:'/'})
          
           Toast.fire({
            icon: 'success',
            title: "회원가입에 성공하였습니다."
          })
        })
        .catch(err => {
          if (Object.keys(err.response.data)[0] === 'username') {
            if ( err.response.data.username[0] === '해당 사용자 이름은 이미 존재합니다.') {
              this.errorMessages = "해당 사용자 이름은 이미 존재합니다."
            }
          } else {
            if (info.data.password1.length < 8 || info.data.password2.length < 8) {
              this.errorMessages = '비밀번호는 8자 이상이어야 합니다.'
            } else if (info.data.password1 !== info.data.password2) {
              this.errorMessages = "비밀번호가 일치하지 않습니다."
            } else if (err.response.data.non_field_errors[0] === "제공된 인증데이터(credentials)로는 로그인할 수 없습니다.") {
              this.errorMessages = "아이디 혹은 비밀번호가 맞지 않습니다."
            } 
          }
          Toast.fire({
            icon: 'error',
            title: this.errorMessages
          })
          
        })
    },
    // login
    postAuthData2({ commit, dispatch }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          dispatch('getMyAccount')
          router.push({path:'/'})
          Toast.fire({
            icon: 'success',
            title: "로그인에 성공하였습니다."
          })
        })
        .catch(err => {
          if (info.data.password.length < 8 ) {
          // if (info.data.password1.length < 8 || info.data.password2.length < 8) {
            this.errorMessages = '비밀번호는 8자 이상이어야 합니다.'
          } else if (err.response.data.non_field_errors[0] === "제공된 인증데이터(credentials)로는 로그인할 수 없습니다.") {
            this.errorMessages = "아이디 혹은 비밀번호를 확인해주세요."
          }
          Toast.fire({
            icon: 'error',
            title: this.errorMessages
          })
        })
    },
    signup({ dispatch }, signupData) {
      const info = {
        data: signupData,
        location: SERVER.ROUTES.signup,
        to: '/'
      }
      dispatch('postAuthData1', info)
    },
    login({ dispatch }, loginData) {
      const info = {
        data: loginData,
        location: SERVER.ROUTES.login,
        to: '/'
      }
      dispatch('postAuthData2', info)
    },
    logout({ getters, commit }) {
      axios.post(SERVER.URL + SERVER.ROUTES.logout, null, getters.config)
        .then(() => {
          commit('SET_TOKEN', null)
          cookies.remove('auth-token')
          commit('SET_INIT')
          Toast.fire({
            icon: 'success',
            title: "로그아웃 되었습니다."
          })
          router.push({ name: 'Login'})
        })
        .catch(err => console.log(err.response.data))
    },

    // accounts
    getMyAccount({ getters, commit }) {
      axios.post(SERVER.URL + SERVER.ROUTES.myaccount, null, getters.config)
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
          commit('SET_PROFILE', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    fetchMessageGroups({ getters, commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.userList + 'message-group/', getters.config)
        .then(res => {
          commit('SET_MESSAGE_GROUPS', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    createMessageGroup({ getters }, messageGroupData) {
      axios.post(SERVER.URL + SERVER.ROUTES.userList + 'message-group/', messageGroupData, getters.config)
      .then(() => {
      })
      .catch(err => console.log(err.response.data))
    },
    fetchMessages({ getters, commit }, toUserId) {
      axios.get(SERVER.URL + SERVER.ROUTES.userList + 'message/' + toUserId + '/', getters.config)
        .then(res => {
          commit('SET_MESSAGES', res.data)
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
    getCollectTeam({ commit }, teamId) {
      axios.get(SERVER.URL + SERVER.ROUTES.collectTeamList + teamId + '/')
        .then (res => {
          commit('SET_COLLECT_TEAM', res.data)
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
          else if (boardName === 'free') {
            commit('SET_FREE_ARTICLES', res.data)
          }
          else {
            return false
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
          if (Object.keys(err.response.data)[0] === 'title'){
            Toast.fire({
              icon: 'error',
              title: "제목을 입력해야 합니다.",
            })
          } else {
            if (err.response.data.content[0] === '이 필드는 blank일 수 없습니다.' || err.response.data.content[0] === "이 필드는 null일 수 없습니다.") {
              // swal.fire({
              //   icon: 'error',
              //   title: "내용을 입력해야 합니다. ",
              //   confirmButtonText: '확인'
              // })
              Toast.fire({
                icon: 'error',
                title: "내용을 입력해야 합니다.",
              })
            }
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
        if (Object.keys(err.response.data)[0] === 'title'){
          Toast.fire({
            icon: 'error',
            title: "제목을 입력해야 합니다.",
          })
        } else {
          if (err.response.data.content[0] === '이 필드는 blank일 수 없습니다.' || err.response.data.content[0] === "이 필드는 null일 수 없습니다.") {
            // swal.fire({
            //   icon: 'error',
            //   title: "내용을 입력해야 합니다. ",
            //   confirmButtonText: '확인'
            // })
            Toast.fire({
              icon: 'error',
              title: "내용을 입력해야 합니다.",
            })
          }
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
          console.log(err.response.data)
          if (err.response.data.content[0] === '이 필드는 blank일 수 없습니다.' || err.response.data.content[0] === "이 필드는 null일 수 없습니다.") {
            // swal.fire({
            //   icon: 'error',
            //   title: "내용을 입력해야 합니다. ",
            //   confirmButtonText: '확인'
            // })
            Toast.fire({
              icon: 'error',
              title: "내용을 입력해야 합니다.",
            })
          }
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
    },
    likeArticle({ state, getters }) {
      axios.post(SERVER.URL + SERVER.ROUTES.boards + getters.articleData.boardName + '/' + getters.articleData.articleId + '/like/', null, getters.config)
        .then(() => {
          if (getters.isArticleLike) {
            const idx = state.selectedArticle.like_users.indexOf(state.myaccount.id)
            state.selectedArticle.like_users.splice(idx, 1)
          } else {
            state.selectedArticle.like_users.push(state.myaccount.id)
          }
        })
        .catch(err => console.log(err.repsonse.data))
    },
    searchArticle({ commit, dispatch }, searchData) {
      if (searchData.keyword) {
        axios.get(SERVER.URL + SERVER.ROUTES.boards + searchData.boardName + '/search/' + searchData.keyword + '/')
          .then(res => {
            console.log(res.data)
            commit('SET_ARTICLES', res.data)
          })
          .catch(err => console.log(err.repsonse.data))
      } else {
        dispatch('fetchArticles', searchData.boardName)
      }
    }
  },
  modules: {
  }
})
