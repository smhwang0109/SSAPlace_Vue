<template>
  <div class="container mt-3">
    <h3 class="mb-3">회원가입</h3>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
        </div>
        <input v-model="signupData.username" type="text" class="inputs form-control" id="username"  placeholder="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
        </div>
        <input v-model="signupData.password1" type="password" id="password1" class="inputs form-control" placeholder="Password">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
        </div>
        <input @keypress.enter="signup(signupData)" v-model="signupData.password2" type="password" id="password2" class="inputs form-control" placeholder="Password Confirmation">
      </div>
      <div class="row mr-1 justify-content-end">
        <button class="btn" @click="signup(signupData)">회원가입</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Signup',
  data() {
    return {
      signupData: {
        username: null,
        password1: null,
        password2: null,
      }
    }
  },
  methods: {
    ...mapActions(['signup'])
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

.btn {
  background-color:#3596F4;
  outline: transparent;
  color: white;
  border: transparent;
}
.btn:hover{
  background-color: #3596F4;
}

#password1, #password2 {
  font-family: Avenir;
}
</style>