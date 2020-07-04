<template>
  <div class="container mt-3">
    <div class="header row mb-3">
      <div class="col-4">
        <img class="profile-image" src="../../assets/img_avatar2.png">
      </div>
      <div class="col-8 mt-5 pl-5">
        <div class="d-flex justify-content-between">
          <!-- <h3 class="">{{ myaccount.username }}</h3> -->
          <!-- 프로필 수정 버튼 -->
          <!-- <router-link :to="{ name: 'ProfileEdit', params: {user_id: myaccount.id} }" class="btn btn-secondary">프로필 수정</router-link> -->
          <h3 v-if="myaccount">{{ myaccount.username }}</h3>

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
          내 관심사: {{ myaccount.interest_set }}
          <!-- <h6>Core Skills</h6>
          <span class="badge badge-pill badge-info mr-2">Python</span> 
          <span class="badge badge-pill badge-info mr-2">Django</span>
          <span class="badge badge-pill badge-info mr-2">JavaScript</span>
          <span class="badge badge-pill badge-info">Vue.js</span> -->
        </div>
      </div>
    </div>
    <hr>
    <div class="content">
      <!-- 본인이 소속된 팀 -->
      <div class="d-flex justify-content-between">
        <h5 class="d-inline">우리 팀</h5>
        <router-link :to="{ name: 'TeamCreate' }" class="btn btn-secondary">팀 생성</router-link>
      </div>

      <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-4 h-30 p-2" v-for="team in teams" :key="team.id">
              <router-link :to="{ name: 'TeamDetail', params: { teamId: team.id } }" class="card h-100" >
              <img src="https://picsum.photos/seed/picsum/400/120" class="card-img-top" alt="image" >
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ team.name }}</h5>
                <span>by {{ team.leader.username }}</span>
                <p></p>
                <h5 class="card-subtitle mb-3">{{ team.oneline_description }}</h5>
                <p class="card-text">
                  <span v-for="interest_id in team.interests" :key="interest_id"> {{ interests[interest_id-1]["interest"] }} /</span>
                  <span v-for="language_id in team.front_language" :key="language_id"> {{ languages[language_id-1]["language"] }} /</span>
                  <span v-for="language_id in team.back_language" :key="language_id"> {{ languages[language_id-1]["language"] }} /</span>
                  <!-- <br> 현재 구성원 {{ team.current_members }}명 / {{ team.residence }} / ~{{ team.created_at.slice(0,10) }} -->
                </p>
                <p class="mt-auto">
                  현재 팀원 {{ team.current_members }}명 / {{ team.residence }} / ~{{ team.created_at.slice(0,10) }}
                </p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <small class="text-muted">{{ team.created_at }}</small>
                <i class="far fa-bookmark"></i>
              </div>
            </router-link>
            </div>

        </div>
      </div>
        
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapState(['myaccount', 'teams', 'users', 'interests', 'languages'])
  },
  methods: {
    ...mapActions(['fetchTeams'])
  },
  created() {
    this.fetchTeams()
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

/* .card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: .5rem;
} */

.card {
  text-decoration: none;
  color: black;
  height: 380px;
  /* border-style:none; */
}

.card:hover {
  color:  #3596F4;
}
</style>