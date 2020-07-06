<template>
  <div>
    <h3>함께할 프로젝트 팀을 찾아볼까요?</h3>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-4 h-30 p-2" v-for="collectTeam in collectTeams" :key="`collectTeam-${collectTeam.id}`">
          <router-link :to="{ name: 'CollectTeamDetail', params: { collectTeamId: collectTeam.id } }" class="card h-100" >
          <!-- <img src="https://picsum.photos/400/120" class="card-img-top" alt="image" > -->
          <div class="card-body d-flex flex-column">
            <div class="description" v-if="collectTeam.team.interests.length">
              <span class="card-subtitle badge badge-pill mr-2" v-for="interest_id in collectTeam.team.interests" :key="`interest-${interest_id}`"> {{ interests[interest_id-1]["interest"] }} </span>
            </div>
            <div v-else>
              <br>
            </div>
            <div class="header d-flex flex-column">
              <h5 class="card-title">{{ collectTeam.title }}</h5>
              <span class="mt-auto">by {{ collectTeam.team.name }}</span>
            </div>

            
            <hr class="my-2">
            <p class="card-text m-0">
              <span><strong>{{ collectTeam.collect_count }}명 모집 중</strong></span> <br>
              <span class="members" v-for="collect_member in changeStringToObject(collectTeam.collect_members).slice(0, changeStringToObject(collectTeam.collect_members).length-1)" :key="`collectMember-${collect_member.pk}`"> {{ collect_member.fields.role }}({{ collect_member.fields.major }})∙</span>
              <span class="members" v-for="collect_member in changeStringToObject(collectTeam.collect_members).slice(changeStringToObject(collectTeam.collect_members).length-1,)" :key="`collectMember-${collect_member.pk}`"> {{ collect_member.fields.role }}({{ collect_member.fields.major }})</span>
          
              <!-- <span v-for="language_id in collectTeam.collect_members" :key="language_id"> {{ languages[language_id-1]["language"] }} /</span>
              <span v-for="language_id in team.back_language" :key="language_id"> {{ languages[language_id-1]["language"] }} /</span> -->
            </p>
            
            <div class="mt-auto info mb-0">
              <hr class="my-2">
              현재 팀원 {{ collectTeam.team.current_members }}명 ∙ {{ collectTeam.team.residence }}
            </div>
            
            
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
  height: 33%;
}

.card-title{
  overflow: hidden;
  white-space: normal;
  line-height: 1.1;
  height: 3.3em;
  word-wrap: break-word;
  margin: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
}

.description {
  overflow: hidden;
  white-space: normal;
  height: 1.1 em;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
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

.card-title, .card-subtitle, .info, .members {
  word-break: keep-all;
}

.badge {
  border: 1px solid #3596F4;
  margin-bottom: 5px;
}

</style>