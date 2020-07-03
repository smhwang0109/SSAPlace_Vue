<template>
  <div class="container mt-3">
    <div class="header row mb-3">
      <div class="col-4">
        <img class="profile-image" src="../../assets/img_avatar2.png">
      </div>
      <div class="col-8 mt-5 pl-5">
        <div class="d-flex justify-content-between">
          <h3 class="">{{ myaccount.username }}</h3>
          <!-- 프로필 수정 버튼 -->
          <router-link :to="{ name: 'ProfileEdit', params: {user_id: myaccount.id} }" class="btn btn-secondary">프로필 수정</router-link>
          <div>
            <!-- github 주소 -->
            <a :href="myaccount.github" target="_blank"><i v-if="myaccount.github" class="fab fa-github mr-3 sites"></i> </a>
            <!-- 포트폴리오/기술블로그 주소 -->
            <a :href="myaccount.homepage" target="_blank"><i v-if="myaccount.homepage" class="fas fa-link mr-3 sites"></i> </a>
            <!-- 링크드인 주소 -->
            <a :href="myaccount.linkedin" target="_blank"><i v-if="myaccount.linkedin" class="fab fa-linkedin mr-3 sites"></i> </a>
            <!-- 페이스북 주소 -->
            <a :href="myaccount.facebook" target="_blank"><i v-if="myaccount.facebook" class="fab fa-facebook mr-3 sites"></i> </a>
            <!-- 인스타그램 주소 -->
            <a :href="myaccount.instagram" target="_blank"><i v-if="myaccount.instagram" class="fab fa-instagram mr-3 sites"></i> </a>
            <!-- 이메일 -->
           <a :href="`mailto:` + myaccount.email" target="_blank"> <i v-if="myaccount.email" class="far fa-envelope sites"></i></a>
          </div>
        </div>
        <!-- 소개 및 거주지역 -->
        <div class="mb-3">
          <small v-if="myaccount.location"><i class="fas fa-map-marker-alt mb-3"></i> {{ myaccount.location}}</small>
          <small v-else><i class="fas fa-map-marker-alt mb-3"></i> 지역을 기입하지 않았습니다.</small>
          <p v-if="myaccount.self_introduction" class="mb-0">
            {{ myaccount.self_introduction}}
          </p>
          <p v-else>
            안녕하세요. 저는 {{ myaccount.username }} 입니다.<br>
          </p>
        </div>
        <!-- 관심사/스킬 -->
        <div>
          "내 관심사": {{ myaccount.interest_set }}
          <h6>Core Skills</h6>
          <span class="badge badge-pill badge-info mr-2">Python</span> 
          <span class="badge badge-pill badge-info mr-2">Django</span>
          <span class="badge badge-pill badge-info mr-2">JavaScript</span>
          <span class="badge badge-pill badge-info">Vue.js</span>
        </div>
      </div>
    </div>
    <hr>
    <div class="content">
      <!-- 본인이 소속된 팀 -->
      <h5>팀</h5>
      <router-link :to="{ name: 'CreateTeam' }" class="btn btn-secondary">팀 생성</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapState(['myaccount'])
  },
  methods: {
    ...mapActions(['getMyAccount'])
  },
  created() {
    this.getMyAccount()
  }
}
</script>

<style scoped>
.container {
  text-align: left;
}

.profile-image {
  border-radius: 50%;
  max-width: 100%;
}

.sites:hover {
  cursor: pointer;
}

</style>