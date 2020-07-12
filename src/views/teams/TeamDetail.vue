<template>
  <div class="container">
    <div class="main">
      <h3 class="mb-3">{{ team.name }} </h3>
      <p><strong>{{ team.oneline_description }}</strong></p>
      <p style="color:#3c3c3c">팀원 {{ team.current_members }}명 / {{ team.residence }} / Since {{team.created_at | moment('YYYY-MM-DD')}}</p>
    </div>
    <div class="intro">
      <div class="d-flex justify-content-between">
        <h6 class="font-weight-bold">팀 정보</h6>
        <router-link :to="{ name: 'TeamUpdate', params: {teamId: team.id} }" class="btn btn-sm update">팀 수정</router-link>
      </div>
      <hr class="mt-2">
      <p class="description">{{ team.description }}</p>
      <div class="d-flex">
        <div class="col-6">
          <h6 class="font-weight-bold"><span style="color:#3596F4">관심 분야</span></h6>
          <span class="badge badge-pill interest-badge mr-1" v-for="interest_id in team.interests" :key="`interest_${interest_id}`"> {{ interests[interest_id-1]["interest"] }} </span>
          <h6 class="font-weight-bold mt-3">Front Language & Framework</h6>
          <span class="badge badge-pill language-badge mr-1" v-for="language_id in team.front_language" :key="`front_${language_id}`"> {{ languages[language_id-1]["language"] }} </span>
          <h6 class="font-weight-bold mt-3">Back Language & Framework</h6>
          <span class="badge badge-pill language-badge mr-1" v-for="language_id in team.back_language" :key="`back_${language_id}`"> {{ languages[language_id-1]["language"] }} </span>
        </div>
        <div class="col-6">
          <h6 class="font-weight-bold">팀장</h6>
          <router-link :to="{ name: 'Profile', params: {userId: team.leader.id} }" style="color:#3596F4">{{ team.leader.username }}</router-link>
        </div>
      </div>
    </div>
    <div class="collect mt-5" v-if="collectTeam">
      <div class ="collection-header d-flex justify-content-between">
        <h6 class="font-weight-bold">이 팀의 모집 정보</h6>
        <div>
          <!-- <span class="mr-2"><i class="fas fa-eye"></i> 조회 0</span> -->
          <span><i class="far fa-bookmark"></i> 관심 {{ collectTeam.like_users.length }} </span>
        </div>
      </div>
      <hr class="mt-2">
      <div class="collection-content">
        <div class="d-flex justify-content-between">
          <h6 class="font-weight-bold">{{ collectTeam.title }}</h6>
          <!-- <p style="color:#979797">{{ collectTeam.created_at | moment("from", "now")}} / 모집인원: {{ collectTeam.collect_members[0].length }}명/ ~모집시까지</p> -->
          <p style="color:#979797">{{ collectTeam.created_at | moment("from", "now")}} / 모집인원: {{ changeStringToObject(collectTeam.collect_members).length}}명</p>

        </div>
        <div>
          <p class="collection-info">{{ collectTeam.description }}</p>
        </div>
        <div>
          <h6 class="font-weight-bold mt-5 w-100">모집 정보</h6>
          <div class="list-group list-group-flush w-100">
            <div v-for="(member,index) in changeStringToObject(collectTeam.collect_members)" :key="member.pk" class="list-group-item">
              <div class="d-flex">
                <h5 class="font-weight-bold col-2">팀원 {{ index + 1 }}</h5>
                <h5 class="col-3 m-0">{{ member.fields.role }}</h5>
                <p class="col-2 m-0">{{member.fields.major}}</p>
                <div v-if="member.fields.preferential" class="col-5">
                  <!-- <strong>우대사항</strong> -->
                  <span class="preferential">{{ member.fields.preferential }}</span>
                </div>
              </div>
            </div>  
          </div>
          
          <!-- <div v-for="(member, index) in changeStringToObject(collectTeam.collect_members)" :key="member.pk">
            <span style="color:#3596F4">{{ index + 1 }}) </span>
            <span>{{ member.fields.role }} /</span>
            <span>{{ member.fields.major }}</span><br>
            <div v-if="member.fields.preferential" class="ml-3">
              <strong>우대사항</strong><br>
              <span class="preferential">{{ member.fields.preferential }}</span>
            </div>
          </div> -->
        </div>
        <div class="mt-4">
          <h6 class="font-weight-bold">연락처</h6>
          <span style="color:#3596F4">{{ phoneFormatter(collectTeam.contact) }}</span>
        </div>
      </div>
    </div>
    <!-- <router-link v-if="!collectTeam && team.leader.username === myaccount.username" :to="{ name: 'CollectTeamCreate', params: {teamId: team.id} }" class="btn">모집 공고 만들기</router-link> -->
    <router-link v-if="!collectTeam" :to="{ name: 'CollectTeamCreate', params: {teamId: team.id} }" class="btn mt-3">모집 공고 만들기</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TeamDetail',
  computed: {
    ...mapState(['team','interests', 'languages', 'collectTeam'])
  },
  methods: {
    ...mapActions(['getTeam', 'getCollectTeam']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
    phoneFormatter(num) {
      var formatNum = ""
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      return formatNum;
    }
  },
  created() {
    this.getTeam(this.$route.params['teamId'])
    this.getCollectTeam(this.$route.params['teamId'])
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

.preferential {
  white-space: pre-wrap;
}


</style>