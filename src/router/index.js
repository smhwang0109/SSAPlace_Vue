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
  // Boards
  {
    path: '/SSAFYBoard',
    name: 'SSAFYBoard',
    component: SSAFYBoardView
  },
  {
    path: '/CareerBoard',
    name: 'CareerBoard',
    component: CareerBoardView
  },
  {
    path: '/DiscussionsBoard',
    name: 'DiscussionsBoard',
    component: DiscussionsBoardView
  },
  {
    path: '/RecruitmentBoard',
    name: 'RecruitmentBoard',
    component: RecruitmentBoardView
  },
  {
    path: '/CodeReviewBoard',
    name: 'CodeReviewBoard',
    component: CodeReviewBoardView
  }
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
