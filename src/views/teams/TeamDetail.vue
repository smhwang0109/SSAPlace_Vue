<template>
  <div class="container">
    <div class="main">
      <h3 class="mb-3">{{ team.name }} </h3>
      <p><strong>{{ team.oneline_description }}</strong></p>
      <p style="color:#3c3c3c">현재 팀원 {{ team.current_members }}명 / {{ team.residence }} / Since {{ team.created_at.slice(0,10) }}</p>
    </div>
    <div class="intro">
      <h6>팀 정보</h6>
      <hr class="mt-2">
      <p class="description">{{ team.description }}</p>
      <h6 class="mt-5">사용 언어 & <span style="color:#3596F4">관심 분야</span></h6>
      <span class="badge badge-pill language-badge mr-1" v-for="language_id in team.front_language" :key="language_id"> {{ languages[language_id-1]["language"] }} </span>
      <span class="badge badge-pill language-badge mr-1" v-for="language_id in team.back_language" :key="language_id"> {{ languages[language_id-1]["language"] }} </span>
      <span class="badge badge-pill interest-badge mr-1" v-for="interest_id in team.interests" :key="interest_id"> {{ interests[interest_id-1]["interest"] }} </span>
      
    </div>
    <div class="collect mt-5">
      <h6>이 팀의 모집 정보</h6>
      <hr class="mt-2">
    </div>
    
    
    {{ team }}
    <router-link :to="{ name: 'CollectTeamCreate', params: {teamId: team.id} }" class="btn btn-secondary">모집 공고 만들기</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TeamDetail',
  computed: {
    ...mapState(['team','interests', 'languages'])
  },
  methods: {
    ...mapActions(['getTeam'])
  },
  created() {
    this.getTeam(this.$route.params['teamId'])
  }
}
</script>

<style scoped>

.main {
  text-align: center;
}

.intro, .collect {
  text-align: left;
}

.badge {
  font-weight: 500;
}

.language-badge {
  background-color: white;
  border: 1px solid black;
  color: black;
}

.interest-badge {
  background-color: white;
  border: 1px solid #3596F4;
  color: #3596F4;
}

.description {
  white-space: pre-wrap;
  line-height: 2rem;
}



</style>