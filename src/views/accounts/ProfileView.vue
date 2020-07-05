<template>
  <div class="container mt-3">
    <div class="header row mb-3">
      <div class="col-4">
        <img class="profile-image" src="../../assets/img_avatar2.png">
      </div>
      {{profile}}
      
    </div>
    <hr>
    <div class="content">
      <!-- 본인이 소속된 팀 -->
      <div class="d-flex justify-content-between">
        <h5 class="d-inline">우리 팀</h5>
        <router-link :to="{ name: 'TeamCreate' }" class="btn">팀 생성</router-link>
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
    ...mapState(['myaccount', 'teams', 'profile', 'users', 'interests', 'languages'])
  },
  methods: {
    ...mapActions(['getProfile', 'fetchTeams'])
  },
  created() {
    this.getProfile(this.$route.params['userId'])
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

/* .card:hover {
  color:  #3596F4;
} */

.self-introduction {
  white-space: pre-wrap;
}

.btn {
  background-color: #3596F4;
  color: white;
}
</style>