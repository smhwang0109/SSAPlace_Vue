<template>
  <div class="container mt-3">
    <h3 class="mb-3">로그인</h3>
    <!-- username -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
      </div>
      <input v-model="loginData.username" type="text" class="inputs form-control" id="username"  placeholder="Username" aria-describedby="basic-addon1">
    </div>
    <!-- password -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
      </div>
      <input @keyup.enter="login(loginData)" v-model="loginData.password" type="password" id="password" class="inputs form-control" placeholder="Password">
    </div>
    <!-- 로그인 버튼 -->
    <div class="d-flex justify-content-end">
      <button @click="login(loginData)" class="btn">로그인</button>
    </div>
    <small class="text-left">아직 계정이 없으신가요? <span class="signup-btn" @click="toSignup">가입하기</span></small>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    toSignup() {
      this.$router.push('signup')
    }
  }
}
</script>

<style scoped>
.container {
  width: 60%
}

.input-group-text {
  background-color: white;
  border-style: none;
}

.inputs {
  border-style: none;
  border-bottom: 1px solid #757575;
  border-radius: 0;
}

#password, #username {
  font-family: Avenir;
}

.btn {
  background-color: #3596F4;
  outline: transparent;
  color: white;
  border: transparent;
}

.btn:hover{
  background-color: #3596F4;
  color: white;
}

.signup-btn {
  color: black;
  font-weight: 700;
}

.signup-btn:hover {
  cursor: pointer;
}
</style>