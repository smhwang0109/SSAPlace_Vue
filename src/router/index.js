import Vue from 'vue'
import VueRouter from 'vue-router'

// Home (main page)
import Home from '@/views/Home.vue'

// rest-auth
import SignupView from '@/views/accounts/SignupView'
import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'

// Boards
import SSAFYBoardView from '@/views/boards/SSAFYBoardView'
import CareerBoardView from '@/views/boards/CareerBoardView'
import DiscussionsBoardView from '@/views/boards/DiscussionsBoardView'
import RecruitmentBoardView from '@/views/boards/RecruitmentBoardView'
import CodeReviewBoardView from '@/views/boards/CodeReviewBoardView'

// Teams
import CreateTeam from '@/views/teams/CreateTeam'
import FindMemberView from '@/views/teams/FindMember'
import FindTeamView from '@/views/teams/FindTeam'

// Article
import ArticleForm from '@/views/ArticleForm'

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
    path: '/boards/SSAFY',
    name: 'SSAFYBoard',
    component: SSAFYBoardView
  },
  {
    path: '/boards/career',
    name: 'CareerBoard',
    component: CareerBoardView
  },
  {
    path: '/boards/discussion',
    name: 'DiscussionsBoard',
    component: DiscussionsBoardView
  },
  {
    path: 'boards/recruitment',
    name: 'RecruitmentBoard',
    component: RecruitmentBoardView
  },
  {
    path: 'boards/codeReview',
    name: 'CodeReviewBoard',
    component: CodeReviewBoardView
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
  // Article
  {
    path: '/articleform',
    name: 'ArticleForm',
    component: ArticleForm
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
