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
    <div class="collect mt-5 ">
      <div class ="collection-header d-flex justify-content-between">
        <h6>이 팀의 모집 정보</h6>
        <div>
          <span class="mr-2"><i class="fas fa-eye"></i> 조회 0</span>
          <span><i class="far fa-bookmark"></i> 관심 0</span>
        </div>
      </div>
      <hr class="mt-2">
      <div class="collection-content">
        <h5>
          서비스 운영자, 마케터
          <small class="ml-3" style="color:#979797">9시간 전 / 비전공자 / ~모집시까지</small>
        </h5>
        <div>
          <p class="collection-info">
            플렛폼 비즈니스에 기반을 두고 성장하려는 팀으로써 함께 나아가실 분들을 찾습니다.
            사이트(toccar.com) 한번 둘러보시구 어떤 포지션이든 ' 같이 하면 즐겁게 일을 할 수 있겠다. '라는 생각이 드시는 분은꼭 연락 주시기를 바라겠습니다.
            참고로 저는 기획 마케터로 일을 하여왔고 최근에는 개발을 공부하여 이 서비스를 만들게 되었습니다. 
            린하게 시작하여 지속적으로 확장시킬 플랫폼이므로 많은 참여 부탁드립니다.
            감사합니다.
          </p>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'CollectTeamCreate', params: {teamId: team.id} }" class="btn">모집 공고 만들기</router-link>
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
  color: black;
}

.description, .collection-info {
  white-space: pre-wrap;
  line-height: 2rem;
}

.btn {
  background-color: #3596F4;
  color: white;
}


</style>