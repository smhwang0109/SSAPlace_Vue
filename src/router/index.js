import Vue from 'vue'
import VueRouter from 'vue-router'
import vueMoment from 'vue-moment'

// Home (main page)
import Home from '@/views/Home.vue'
import Message from '@/views/Message.vue'

// rest-auth
import SignupView from '@/views/accounts/SignupView'
import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'

// Boards
import ArticleList from '@/views/boards/ArticleList'
import ArticleDetail from '@/views/boards/ArticleDetail'
import ArticleCreate from '@/views/boards/ArticleCreate'
import ArticleUpdate from '@/views/boards/ArticleUpdate'
// import CareerBoard from '@/views/boards/CareerBoard'
// import FreeBoard from '@/views/boards/FreeBoard'
// import RecruitmentBoard from '@/views/boards/RecruitmentBoard'
// import CodeReviewBoard from '@/views/boards/CodeReviewBoard'


// Teams
import TeamCreate from '@/views/teams/TeamCreate'
import TeamDetail from '@/views/teams/TeamDetail'
import TeamUpdate from '@/views/teams/TeamUpdate'
import CollectTeamCreate from '@/views/teams/CollectTeamCreate'
import FindMember from '@/views/teams/FindMember'
import CollectTeamList from '@/views/teams/CollectTeamList'

// Profile
import ProfileView from '@/views/accounts/ProfileView'
import ProfileEditView from '@/views/accounts/ProfileEditView'



Vue.use(VueRouter)
Vue.use(vueMoment)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  // rest-auth
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  },

  // Accounts
  {
    path: '/accounts/:userId',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/accounts/:userId/edit',
    name: 'ProfileEdit',
    component: ProfileEditView
  },

  // Boards
  {
    path: '/boards/:board_name',
    name: 'Boards',
    component: ArticleList
  },
  {
    path: '/boards/:board_name/create',
    name: 'ArticleCreate',
    component: ArticleCreate
  },
  {
    path: '/boards/:board_name/:article_id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/boards/:board_name/:article_id/update',
    name: 'ArticleUpdate',
    component: ArticleUpdate
  },

  // Teams
  {
    path: '/teams/create',
    name: 'TeamCreate',
    component: TeamCreate
  },
  {
    path: '/teams/:teamId/update',
    name: 'TeamUpdate',
    component: TeamUpdate
  },
  {
    path: '/teams/collect',
    name: 'CollectTeamList',
    component: CollectTeamList
  },
  {
    path: '/teams/:teamId',
    name: 'TeamDetail',
    component: TeamDetail
  },
  {
    path: '/teams/:teamId/collect/create',
    name: 'CollectTeamCreate',
    component: CollectTeamCreate
  },
  {
    path: '/teams/findMember',
    name: 'FindMember',
    component: FindMember
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const pubicPages = ['Login', 'Signup'] // Login 안해도 됨
  const authPages = ['Login', 'Signup'] // Login 되어있으면 안됨
  const authRequired = !pubicPages.includes(to.name) // 로그인 해야하는 페이지면 true 반환
  const unauthRequired = authPages.includes(to.name)
  const isLoggedIn = Vue.$cookies.isKey('auth-token')

  if (unauthRequired && isLoggedIn){
    next('/')
  }
  
  if (authRequired && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
