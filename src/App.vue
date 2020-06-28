<template>
  <div id="app">
    <div class="navbar2 container">
      <router-link class="logo" to="/">SSAPlace</router-link>
        <div class="dropdown2 megamenu">
          <button class="dropbtn col-6">게시판</button>
          <button class="dropbtn col-6">프로젝트 멤버 모집</button>
          <div class="dropdown-content">
            <div class="row">
              <div class="column">
                <router-link :to="{ name: 'SSAFYBoard' }">싸피게시판</router-link>
                <router-link :to="{ name: 'DiscussionsBoard' }">자유게시판</router-link>
                <!-- <router-link :to="{ name: 'CareerBoard' }">취업/진로게시판</router-link>
                <router-link :to="{ name: 'RecruitmentBoard' }">구인/구직게시판</router-link>
                <router-link :to="{ name: 'CodeReviewBoard' }">코드리뷰게시판</router-link>
                <router-link :to="{ name: 'ArticleForm' }">새 글 작성</router-link> -->
              </div>
              <div class="column">
                <router-link :to="{ name: 'FindMember' }">PJT 멤버 찾아요</router-link>
                <router-link :to="{ name: 'FindTeam' }">PJT 팀 찾아요</router-link>
              </div>
            </div>
          </div>
        </div>
      <router-link class="one" to="/"><i class="far fa-envelope"></i></router-link>
      <div class="dropdown2 two">
        <button class="dropbtn">신채린님</button>
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

    </div>
  <router-view/>

    <div class="footer">
      <router-link class="separate-menu" to="/">Contact Us</router-link>
    </div>

  </div>
</template>

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
}

.logo {
  width: 16.66%;
}

.megamenu {
  width: 49.98%
}

.one {
  width: 16.66%
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

/* Dropdown content (hidden by default) */
.dropdown-content2 {
  display: none;
  position: absolute;
  background-color: white;
  width: 8%;
  right: 22%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}


/* Show the dropdown menu on hover */
.dropdown2:hover .dropdown-content, .dropdown2:hover .dropdown-content2 {
  display: block;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

/* Create three equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  /* padding: 10px; */
  /* background-color: #ccc; */
  background-color: white;
  height: 110px;
}

/* Style links inside the columns */
.column a {
  float: none;
  color: black;
  /* padding: 16px; */
  text-decoration: none;
  display: block;
  text-align: center;
}

/* Add a background color on hover */
.column a:hover {
  background-color: white;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.column2 {
  float: left;
  width: 100%;
  /* padding: 10px; */
  /* background-color: #ccc; */
  background-color: white;
  height: 110px;
}
 
.column2 a {
  float: none;
  color: black;
  /* padding: 16px; */
  text-decoration: none;
  display: block;
  text-align: center;
}

.separate-menu:hover {
  color: cornflowerblue;
}

.profile-menu {
  color: black;
}

.btn {
  background-color: white;
  color: black;
}

</style>
