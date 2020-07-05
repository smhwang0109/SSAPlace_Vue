export default {
    URL: 'http://localhost:8000',
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