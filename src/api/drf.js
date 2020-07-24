export default {
    URL: 'http://localhost:8000',
    // URL: 'http://ec2-15-164-218-66.ap-northeast-2.compute.amazonaws.com',
    ROUTES: {
      // rest-auth
      signup: '/rest-auth/signup/',
      login: '/rest-auth/login/',
      logout: '/rest-auth/logout/',

      // accounts
      myaccount: '/accounts/myaccount/',
      userList: '/accounts/',

      // teams
      teamList: '/teams/',
      collectTeamList: '/teams/collect/',
      interestList: '/teams/interest/',
      majorList: '/teams/major/',
      roleList: '/teams/role/',
      languageList: '/teams/language/',

      // boards
      boards: '/boards/',
    }
  }