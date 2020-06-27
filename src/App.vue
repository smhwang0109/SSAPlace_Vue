<template>
  <div id="app">
    <div class="navbar2">
      <router-link to="/">SSAPlace</router-link>
      <div class="dropdown2 menu">
        <div>
          <button class="dropbtn">게시판
          </button>
          <button class="dropbtn">프로젝트 멤버 모집
          </button>
          <button class="dropbtn">쪽지
          </button>
          <button class="dropbtn">Contact Us
          </button>
        </div>
        <div class="dropdown-content">
          <div class="row">
            <div class="column">
              <router-link to="/">싸피게시판</router-link>
              <router-link to="/">자유게시판</router-link>
              <router-link to="/">취업/진로게시판</router-link>
              <router-link to="/">구인/구직게시판</router-link>
              <router-link to="/">코드리뷰게시판</router-link>
            </div>
            <div class="column">
              <router-link to="/">PJT 멤버 구해요</router-link>
              <router-link to="/">PJT 멤버 찾아요</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <router-link to="/">로그아웃</router-link>
      </div>

    </div>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Navbar container */
.navbar2 {
  overflow: hidden;
  background-color: #333;
  font-family: Arial;
}

/* Links inside the navbar */
.navbar2 a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: left;
  padding: 14px 16px;
  text-decoration: none;
}

/* The dropdown container */
.dropdown2 {
  float: left;
  overflow: hidden;
}

/* Dropdown button */
.dropdown2 .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
  width: 25%;
}

.dropbtn:hover {
  color: cornflowerblue;
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  width: 23%;
  left:117px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Show the dropdown menu on hover */
.dropdown2:hover .dropdown-content {
  display: block;
}

/* Create three equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  /* padding: 10px; */
  /* background-color: #ccc; */
  background-color: white;
  height: 280px;
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

.menu {
  width: 50%;
}

</style>
