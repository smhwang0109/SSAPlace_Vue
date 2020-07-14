<template>
  <div>
    <h3>함께할 프로젝트 팀을 찾아볼까요?</h3>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-4 h-30 p-2" v-for="collectTeam in collectTeams" :key="`collectTeam-${collectTeam.id}`">
          <router-link :to="{ name: 'TeamDetail', params: { teamId: collectTeam.team.id } }" class="card h-100" >
          <img :src="randomImage(images)" class="card-img-top" alt="image" width="400" height="120">
          <div class="card-body d-flex flex-column">
            <div class="header d-flex flex-column">
              <!-- 제목 -->
              <h5 class="card-title"><strong>{{ collectTeam.title }}</strong></h5>
              <!-- interests -->
              <div class="description" v-if="collectTeam.team.interests.length">
                <span class="card-subtitle badge badge-pill mr-2" v-for="interest_id in collectTeam.team.interests" :key="`interest-${interest_id}`"> {{ interests[interest_id-1]["interest"] }} </span>
              </div>
              <div v-else>
                <br>
              </div>
            </div>
            
            <hr class="my-2">

            <p class="card-text m-0">
              <span><strong>{{ changeStringToObject(collectTeam.collect_members).length }}명 모집 중</strong></span> <br>
              <span class="collect-member">
                <span class="members" v-for="collect_member in changeStringToObject(collectTeam.collect_members).slice(0, changeStringToObject(collectTeam.collect_members).length-1)" :key="`collectMember-${collect_member.pk}`"> {{ collect_member.fields.role }}({{ collect_member.fields.major }})∙</span>
              <span class="members" v-for="collect_member in changeStringToObject(collectTeam.collect_members).slice(changeStringToObject(collectTeam.collect_members).length-1,)" :key="`collectMember-${collect_member.pk}`"> {{ collect_member.fields.role }}({{ collect_member.fields.major }})</span>
              </span>
            </p>
            
            <div class="mt-auto info mb-0">
              <hr class="my-2">
              현재 팀원 {{ collectTeam.team.current_members }}명 ∙ {{ collectTeam.team.residence }}
            </div>
            
            
          </div>
          <div class="card-footer" >
            <div class = "d-flex justify-content-between">
              <small class="text-muted">{{ collectTeam.created_at }}</small>
              <i class="far fa-bookmark"></i>
            </div>
            <small class="text-muted text-left">by {{ collectTeam.team.name }}</small>
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
  data() {
    return {
      images: [
        // programming, coding
        // 'https://user-images.githubusercontent.com/25967949/86784922-0a188900-c09d-11ea-8716-3438dec14f7b.jpg',
        // 'https://user-images.githubusercontent.com/25967949/86785046-2ae0de80-c09d-11ea-8ccb-2b0d13fd02ba.jpg',
        // 'https://user-images.githubusercontent.com/25967949/86785050-2b797500-c09d-11ea-9660-2c9a36cb8a1c.jpg',
        // 'https://user-images.githubusercontent.com/25967949/86785053-2d433880-c09d-11ea-861c-ac4808a1dff1.jpg',
        // 'https://user-images.githubusercontent.com/25967949/86785025-261c2a80-c09d-11ea-9e9d-79886a905a80.jpg',
        // 'https://user-images.githubusercontent.com/25967949/86785077-32a08300-c09d-11ea-82e7-0ee19fac5bdf.jpg',
        // 'https://user-images.githubusercontent.com/25967949/86785759-0df8db00-c09e-11ea-9e41-1ec8467457fa.png',
        // 'https://user-images.githubusercontent.com/25967949/86785987-5ca67500-c09e-11ea-84d4-b39c521b1a67.png',
        // 'https://user-images.githubusercontent.com/25967949/86789874-c6c11900-c0a2-11ea-95a4-5278d09c5c27.png',
        // 'https://user-images.githubusercontent.com/25967949/86789911-d0e31780-c0a2-11ea-9a90-1c24ce05192c.png',
        // 'https://user-images.githubusercontent.com/25967949/86789952-d8a2bc00-c0a2-11ea-9a6d-961913576b4f.png',
        // 'https://user-images.githubusercontent.com/25967949/86789992-e0626080-c0a2-11ea-8414-40f74270a024.png',
        // 'https://user-images.githubusercontent.com/25967949/86790042-eeb07c80-c0a2-11ea-8b43-de0adde019cf.png',


        // team images
        'https://user-images.githubusercontent.com/25967949/86788558-43eb8e80-c0a1-11ea-8019-057acf6bf27b.png',
        'https://user-images.githubusercontent.com/25967949/86788572-4948d900-c0a1-11ea-83a5-688e0dc9fdd5.png',
        'https://user-images.githubusercontent.com/25967949/86788631-58c82200-c0a1-11ea-9e73-4f3465855fc4.png',
        'https://user-images.githubusercontent.com/25967949/86788831-8dd47480-c0a1-11ea-8510-fcbfd03e0c64.png',
        // 'https://user-images.githubusercontent.com/25967949/86788946-b52b4180-c0a1-11ea-99b1-40d3b8f2e61b.png',
        'https://user-images.githubusercontent.com/25967949/86789020-cc6a2f00-c0a1-11ea-92ab-f34793e0333f.png',
        'https://user-images.githubusercontent.com/25967949/86789132-eefc4800-c0a1-11ea-8864-a5445b3bb87e.png',
      ],
     
    }
  },
  computed: {
    ...mapState(['collectTeams', 'interests', 'languages']),
  },
  methods: {
    ...mapActions(['fetchCollectTeams']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
    randomImage(items) {
      return items[Math.floor(Math.random()*items.length)];
    },
  },
  created() {
    this.fetchCollectTeams()
  }
}
</script>

<style scoped>
.header {
  height: 40%;
}

.card-title{
  overflow: hidden;
  white-space: normal;
  line-height: 1.1;
  word-wrap: break-word;
  margin: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
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

.card-footer {
  text-align: left;
}

.collect-member{
  overflow: hidden;
  white-space: normal;
  height: 1.1 em;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
}

</style>