<template>
  <div id="app">
    <div class="navbar2 container">
      <router-link class="logo" to="/"><img class="img-fluid" src="@/assets/logo.png" alt="SSAPlace 로고"></router-link>
      <div class="dropdown2 megamenu">
        <button class="dropbtn col-6">게시판</button>
        <button class="dropbtn col-6">프로젝트 멤버 모집</button>
        <div class="dropdown-content">
          <div class="row">
            <div class="column">
              <router-link :to="{ name: 'Boards', params: {board_name: 'ssafy'} }">싸피게시판</router-link>
              <router-link :to="{ name: 'Boards', params: {board_name: 'free'} }">자유게시판</router-link>
            </div>
            <div class="column">
              <router-link :to="{ name: 'FindMember' }">PJT 멤버 찾아요</router-link>
              <router-link :to="{ name: 'FindTeam' }">PJT 팀 찾아요</router-link>
            </div>
          </div>
        </div>
      </div>
      <router-link class="two message" to="/"><i class="far fa-envelope"></i></router-link>
      <div v-if="isLoggedIn" class="dropdown2 two">
        <button class="dropbtn">{{ myaccount.username }} </button>
        <div class="dropdown-content2">
          <div class="row">
            <div class="column2">
              <div class="d-flex justify-content-between">
                <i class="far fa-user my-auto ml-3"></i> 
                <router-link class="profile-menu mr-3" :to="{ name: 'Profile' }">회원정보</router-link>
              </div>
              <div class="d-flex justify-content-between">
                <i class="fas fa-power-off my-auto ml-3"></i>
                <router-link class="profile-menu mr-3" :to="{ name: 'Logout' }"> 로그아웃</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </div>

    </div>
  <router-view class="container router-view"/>

  <div class="footer mt-5">
    <p class="footer-p">© 2020 Copyright: <i class="fab fa-github"></i> <a href="https://github.com/scl2589" target="_blank">chaelinshin96</a> 
    | <i class="fab fa-github"></i><a href="https://github.com/smhwang0109" target="_blank"> smhwang0109</a>
    | <i class="fab fa-github"></i><a href="https://github.com/SunHwan-Park" target="_blank"> SunHwan-Park</a>
    </p>
    <router-link class="separate-menu" to="/">Contact Us</router-link>
  </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['myaccount']),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['getMyAccount'])
  },
  created() {
    if (this.isLoggedIn) {
      this.getMyAccount()
    }
  }
}
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  padding: 0;
  width: 60% !important;
}

/* navbar 비율별로 나누기 */
.logo {
  width: 16.66%;
}

.megamenu {
  width: 49.98%
}

.two {
  width: 16.66%
}

/* Navbar container */
.navbar2 {
  overflow: hidden;
  background-color: white;
  font-family: Arial;
}

/* Links inside the navbar */
.navbar2 a {
  float: left;
  font-size: 16px;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}



/* 두 dropdown이 공통으로 가지는 요소들 */
/* The dropdown container */
.dropdown2 {
  float: left;
  overflow: hidden;
}

/* Dropdown button */
.dropdown2 .dropbtn{
  font-size: 16px;
  border: none;
  outline: none;
  color: black;
  padding: 14px 16px;
  background-color: inherit;
  font: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
  /* width: 50%; */
}

.dropbtn:hover {
  color: cornflowerblue;
}

.dropdown2:hover .dropdown-content, .dropdown2:hover .dropdown-content2 {
  display: block;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.column a, .column2 a {
  float: none;
  color: black;
  /* padding: 16px; */
  text-decoration: none;
  display: block;
  text-align: center;
}

/* Add a background color on hover */
.column a:hover, .column2 a:hover {
  background-color: cornflowerblue;
  color: white;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}


/* 아래는 Dropdown for 게시판 & 프로젝트 멤버 모집 */

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  width: 28%;
  left: 31%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.column {
  float: left;
  width: 50%;
  /* padding: 10px; */
  /* background-color: #ccc; */
  background-color: white;
  height: 10%;
}




/* Dropdown for 프로필 */
/* Dropdown content (hidden by default) */
.dropdown-content2 {
  display: none;
  position: absolute;
  background-color: white;
  width: 8%;
  right: 21%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.column2 {
  float: left;
  width: 100%;
  background-color: white;
  height: 10%;
}

.column2 div:hover {
  background-color: cornflowerblue;
  color: white;
}


.separate-menu:hover {
  color: cornflowerblue;
}

.profile-menu {
  color: black;
}

.message:hover {
  color: cornflowerblue;
}

.btn {
  background-color: white;
  color: black;
}

.footer {
  background-color: black;
  color: white;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.footer-p a {
  color: white;
}

.router-view {
  margin-bottom: 150px
}

</style>
