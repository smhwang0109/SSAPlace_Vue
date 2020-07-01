import Vue from 'vue'
import VueRouter from 'vue-router'

// Home (main page)
import Home from '@/views/Home.vue'

// rest-auth
import SignupView from '@/views/accounts/SignupView'
import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'

// Boards
import ArticleList from '@/views/boards/ArticleList'
import ArticleDetail from '@/views/boards/ArticleDetail'
import ArticleCreate from '@/views/boards/ArticleCreate'
// import CareerBoard from '@/views/boards/CareerBoard'
// import FreeBoard from '@/views/boards/FreeBoard'
// import RecruitmentBoard from '@/views/boards/RecruitmentBoard'
// import CodeReviewBoard from '@/views/boards/CodeReviewBoard'


// Teams
import CreateTeam from '@/views/teams/CreateTeam'
import FindMemberView from '@/views/teams/FindMember'
import FindTeamView from '@/views/teams/FindTeam'

// Profile
import ProfileView from '@/views/accounts/ProfileView'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  // Profile - will change to userId after the design is done
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },

  // Boards
  {
    path: '/boards/:board_name',
    name: 'Boards',
    component: ArticleList
  },
  {
    path: '/boards/:board_name/:article_id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/boards/create',
    name: 'ArticleCreate',
    component: ArticleCreate
  },

  // Teams
  {
    path: '/teams/create',
    name: 'CreateTeam',
    component: CreateTeam
  },
  {
    path: '/teams/findMember',
    name: 'FindMember',
    component: FindMemberView
  },
  {
    path: '/teams/findTeam',
    name: 'FindTeam',
    component: FindTeamView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const pubicPages = ['Signup'] // Login 안해도 됨
//   const authPages = ['Signup'] // Login 되어있으면 안됨
//   const authRequired = !pubicPages.includes(to.name) // 로그인 해야하는 페이지면 true 반환
//   const unauthRequired = authPages.includes(to.name)
//   const isLoggedIn = Vue.$cookies.isKey('auth-token')

//   if (unauthRequired && isLoggedIn){
//     next('/')
//   }
  
//   if (authRequired && !isLoggedIn) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }

// })

export default router
