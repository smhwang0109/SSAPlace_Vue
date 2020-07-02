<template>
  <div class="container mt-3">
    <div class="header row mb-3">
      <div class="col-4">
        <img class="profile-image" src="../../assets/img_avatar2.png">
      </div>
      <div class="col-8 mt-5 pl-5">
        <div class="d-flex justify-content-between">
          <h3 class="">{{ myaccount.username }}</h3>
          <div>
            <!-- github 주소 -->
            <i class="fab fa-github mr-3 sites"></i> 
            <!-- 포트폴리오/기술블로그 주소 -->
            <i class="fas fa-link mr-3 sites"></i> 
            <!-- 링크드인 주소 -->
            <i class="fab fa-linkedin mr-3 sites"></i> 
            <!-- 이메일 -->
            <i class="far fa-envelope sites"></i>
          </div>
        </div>
        <!-- 소개 및 거주지역 -->
        <div class="mb-3">
          <small><i class="fas fa-map-marker-alt mb-3"></i> 경기도 용인시 수지구</small>
          <p class="mb-0">
            안녕하세요. 저는 SSAFY 3기 서울 1반 신채린입니다.<br>
            현재 프로젝트 팀원을 구하고 있으니, 아래 팀 정보 확인해주시고 연락주세요!
          </p>
        </div>
        <!-- 관심사/스킬 -->
        <div>
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
      <!-- 본인이 했던 경험/프로젝트-->
      <h5>프로젝트</h5>
      <!-- 가치관 및 성격 유형 Q&A -->
      <h5>성격유형</h5>
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