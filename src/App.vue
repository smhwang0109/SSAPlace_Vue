<template>
  <div id="app">
    <div class="navbar2">
      <a href="#home">SSAPlace</a>
      <div class="dropdown2 menu">
        <div class="d-flex justify-content-between">
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
              <a href="#">싸피게시판</a>
              <a href="#">자유게시판</a>
              <a href="#">취업/진로게시판</a>
              <a href="#">구인/구직게시판</a>
              <a href="#">코드리뷰게시판</a>
            </div>
            <div class="column">
              <a href="#">PJT 멤버 구해요</a>
              <a href="#">PJT 멤버 찾아요</a>
              <!-- <a href="#">Link 3</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
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

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

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
.dropdown2 .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
}

.dropbtn:hover {
  color: cornflowerblue;
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  width: 40%;
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
  width: 25%;
  /* padding: 10px; */
  /* background-color: #ccc; */
  background-color: white;
  height: 330px;
}

/* Style links inside the columns */
.column a {
  float: none;
  color: black;
  padding: 16px;
  text-decoration: none;
  display: block;
  text-align: left;
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
  width: 40%;
}

</style>
