<template>
  <div>
    <h3>함께할 프로젝트 팀을 찾아볼까요?</h3>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-6 h-30 p-2" v-for="collectTeam in collectTeams" :key="`collectTeam-${collectTeam.id}`">
          <router-link :to="{ name: 'CollectTeamDetail', params: { collectTeamId: collectTeam.id } }" class="card h-100" >
          <img src="https://picsum.photos/seed/picsum/400/120" class="card-img-top" alt="image" >
          <div class="card-body d-flex flex-column">
            <div class="header d-flex flex-column">
              <h5 class="card-title">{{ collectTeam.title }}</h5>
              <span class="mt-auto">by {{ collectTeam.team.name }}</span>
            </div>
            
            <hr class="my-2">
            <div class="description">
              <p class="card-subtitle" v-for="interest_id in collectTeam.team.interests" :key="`interest-${interest_id}`"> {{ interests[interest_id-1]["interest"] }} </p>
            </div>
            
            <hr class="my-2">
            <p class="card-text">
              <span>{{ collectTeam.collect_count }}명 모집 중</span> <br>
              <span v-for="collect_member in changeStringToObject(collectTeam.collect_members)" :key="`collectMember-${collect_member.pk}`"> {{ collect_member.fields.role }}({{ collect_member.fields.major }})</span><br>
              <!-- <span v-for="language_id in collectTeam.collect_members" :key="language_id"> {{ languages[language_id-1]["language"] }} /</span>
              <span v-for="language_id in team.back_language" :key="language_id"> {{ languages[language_id-1]["language"] }} /</span> -->
            </p>
            <p class="mt-auto info mb-0">
              현재 팀원 {{ collectTeam.team.current_members }}명 / {{ collectTeam.team.residence }}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">{{ collectTeam.created_at }}</small>
            <i class="far fa-bookmark"></i>
          </div>
        </router-link>
        </div>
         
      </div>
       
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CollectTeamList',
  computed: {
    ...mapState(['collectTeams', 'interests', 'languages'])
  },
  methods: {
    ...mapActions(['fetchCollectTeams']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
  },
  created() {
    this.fetchCollectTeams()
  }
}
</script>

<style scoped>
.header {
  height: 34%;
}


.card {
  text-decoration: none;
  color: black;
  height: 380px;
  /* border-style:none; */
}

.card:hover{
  text-decoration: none;
  cursor: pointer;

}

.card-title, .card-subtitle, .info {
  word-break: keep-all;
}

</style>