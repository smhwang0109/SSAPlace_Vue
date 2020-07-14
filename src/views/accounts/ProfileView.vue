<template>
  <div v-if="profile" class="container mt-3">
    <div class="header row mb-3">
      <div class="col-4 col-lg-3 d-flex flex-column align-items-center profile-image-box">
        <img class="profile-image" src="../../assets/img_avatar2.png">
      </div>
      <div class="col-8 col-lg-9 pl-5 mt-0 ">
        <div class="d-flex justify-content-between">
          <h3 v-if="profile">{{ profile.user.username }}<router-link v-if="profile.user.username === myaccount.username" :to="{ name: 'ProfileEdit', params: {user_id: profile.user.id} }" class="btn btn-sm update ml-3">프로필 수정</router-link></h3>
          <div>
            <!-- github 주소 -->
            <a v-if="profile.github" :href="profile.github" target="_blank"><i class="fab fa-github mr-3 sites fa-2x"></i> </a>
            <!-- 포트폴리오/기술블로그 주소 -->
            <a v-if="profile.homepage" :href="profile.homepage" target="_blank"><i class="fas fa-link mr-3 sites fa-2x"></i> </a>
            <!-- 링크드인 주소 -->
            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i class="fab fa-linkedin mr-3 sites fa-2x"></i> </a>
            <!-- 페이스북 주소 -->
            <a v-if="profile.facebook" :href="profile.facebook" target="_blank"><i class="fab fa-facebook mr-3 sites fa-2x"></i> </a>
            <!-- 인스타그램 주소 -->
            <a v-if="profile.instagram" :href="profile.instagram" target="_blank"><i class="fab fa-instagram mr-3 sites fa-2x"></i> </a>
            <!-- 이메일 -->
           <a v-if="profile.email" :href="`mailto:` + profile.email" target="_blank"> <i class="far fa-envelope sites fa-2x"></i></a>
          </div>
        </div>
        <!-- 소개 및 거주지역 -->
        <div class="mb-3">
          <small v-if="profile.location"><i class="fas fa-map-marker-alt mb-3"></i> {{ profile.location}}</small>
          <small v-else><i class="fas fa-map-marker-alt mb-3"></i> 지역을 기입하지 않았습니다.</small>
          <p v-if="profile.self_introduction" class="mb-0 self-introduction">{{ profile.self_introduction}}</p>
          <p v-else>
            안녕하세요. 저는 {{ profile.user.username }} 입니다.<br>
          </p>
        </div>
        <!-- 관심사/스킬 -->
        <div class="mb-3" v-if="profile.interests.length">
          <h6><strong>관심사</strong></h6>
          <span class="badge badge-pill mr-2 interests" v-for="interest_id in profile.interests" :key="`profile-interest-${interest_id}`">{{ interests[interest_id-1]["interest"] }}</span>
        </div>
        <div v-if="profile.languages.length">
          <h6><strong>Core Skills</strong></h6>
          <span class="badge badge-pill mr-2 languages" v-for="language_id in profile.languages" :key="`profile-language-${language_id}`">{{ languages[language_id-1]["language"] }}</span>
        </div>
      </div>
      
    </div>
    <hr>
    <div class="content">
      <!-- 본인이 소속된 팀 -->
      <div class="d-flex justify-content-between">
        <h5 class="d-inline">우리 팀</h5>
        <router-link v-if="profile.user.username === myaccount.username" :to="{ name: 'TeamCreate' }" class="btn">팀 생성</router-link>
      </div>

      <div class="container-fluid mt-4" v-if="teams.length">
        <div class="row">
            <div class="col-4 h-30 p-2" v-for="team in teams" :key="`team-${team.id}`">
              <router-link :to="{ name: 'TeamDetail', params: { teamId: team.id } }" class="card h-100" >
              <!-- <img src="../../assets/image2.jpg" class="card-img-top" alt="image" > -->
              <!-- <img :src="'../../assets/card-image/image'+randomNum(this.images) + '.jpg'" class="card-img-top" alt="image" width="400" height="120">  -->
              <img :src="randomImage(images)" class="card-img-top" alt="image" width="400" height="120"> 

              <!-- <img :src="this.images[1]" height="120"> -->
              <div class="card-body d-flex flex-column">
                <div class="team-header d-flex flex-column">
                  <div class="team-title">
                    <h5 class="card-title mb-0"><strong>{{ team.name }}</strong></h5>
                  </div>
                  <div class="mt-auto team-interests">
                    <span class="badge badge-pill mr-2" v-for="interest_id in team.interests" :key="`team-interest-${interest_id}`"> {{ interests[interest_id-1]["interest"] }} </span>
                  </div>
                </div>
                <hr class="m-2">
                <div class="team-description">
                  <p class="card-subtitle mt-0 description" style="color:#979797">{{ team.oneline_description }}</p>
                </div>
                <hr class="m-2">
                <div class="card-text languages">
                  <span class="m-0 font-weight-bold">사용 언어</span><br>
                  <div class="language-list">
                    <span class="badge badge-pill mr-2" v-for="language_id in team.front_language" :key="`team-front-language-${language_id}`"> {{ languages[language_id-1]["language"] }} </span>
                    <span class="badge badge-pill mr-2" v-for="language_id in team.back_language" :key="`team-back-language-${language_id}`"> {{ languages[language_id-1]["language"] }} </span>
                  </div>
                  <!-- <br> 현재 구성원 {{ team.current_members }}명 / {{ team.residence }} / ~{{ team.created_at.slice(0,10) }} -->
                </div>
                <hr class="m-2">
                <p class="mt-auto mb-0">
                  팀원 {{ team.current_members }}명 / {{ team.residence }}
                  <!-- 팀원 {{ team.current_members }}명 / {{ team.residence }} / ~{{ team.created_at.slice(0,10) }} -->
                </p>
              </div>
              <div class="card-footer">
                <div class="d-flex justify-content-between">
                  <small class="text-muted">팀장 {{ team.leader.username }}</small>
                  <!-- <small class="text-muted">{{ team.created_at }}</small> -->
                  <i class="far fa-bookmark"></i>
                </div>
                
              </div>
            </router-link>
            </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center mt-3">
        <h4>아직 소속된 팀이 없습니다. 팀을 생성해주세요.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      userId: this.$route.params['userId'],
      images: [
        // programming, coding
        'https://user-images.githubusercontent.com/25967949/86784922-0a188900-c09d-11ea-8716-3438dec14f7b.jpg',
        'https://user-images.githubusercontent.com/25967949/86785046-2ae0de80-c09d-11ea-8ccb-2b0d13fd02ba.jpg',
        'https://user-images.githubusercontent.com/25967949/86785050-2b797500-c09d-11ea-9660-2c9a36cb8a1c.jpg',
        'https://user-images.githubusercontent.com/25967949/86785053-2d433880-c09d-11ea-861c-ac4808a1dff1.jpg',
        'https://user-images.githubusercontent.com/25967949/86785025-261c2a80-c09d-11ea-9e9d-79886a905a80.jpg',
        'https://user-images.githubusercontent.com/25967949/86785077-32a08300-c09d-11ea-82e7-0ee19fac5bdf.jpg',
        'https://user-images.githubusercontent.com/25967949/86785759-0df8db00-c09e-11ea-9e41-1ec8467457fa.png',
        'https://user-images.githubusercontent.com/25967949/86785987-5ca67500-c09e-11ea-84d4-b39c521b1a67.png',
        'https://user-images.githubusercontent.com/25967949/86789874-c6c11900-c0a2-11ea-95a4-5278d09c5c27.png',
        'https://user-images.githubusercontent.com/25967949/86789911-d0e31780-c0a2-11ea-9a90-1c24ce05192c.png',
        'https://user-images.githubusercontent.com/25967949/86789952-d8a2bc00-c0a2-11ea-9a6d-961913576b4f.png',
        'https://user-images.githubusercontent.com/25967949/86789992-e0626080-c0a2-11ea-8414-40f74270a024.png',
        'https://user-images.githubusercontent.com/25967949/86790042-eeb07c80-c0a2-11ea-8b43-de0adde019cf.png',


        // // team images
        // 'https://user-images.githubusercontent.com/25967949/86788558-43eb8e80-c0a1-11ea-8019-057acf6bf27b.png',
        // 'https://user-images.githubusercontent.com/25967949/86788572-4948d900-c0a1-11ea-83a5-688e0dc9fdd5.png',
        // 'https://user-images.githubusercontent.com/25967949/86788631-58c82200-c0a1-11ea-9e73-4f3465855fc4.png',
        // 'https://user-images.githubusercontent.com/25967949/86788831-8dd47480-c0a1-11ea-8510-fcbfd03e0c64.png',
        // // 'https://user-images.githubusercontent.com/25967949/86788946-b52b4180-c0a1-11ea-99b1-40d3b8f2e61b.png',
        // 'https://user-images.githubusercontent.com/25967949/86789020-cc6a2f00-c0a1-11ea-92ab-f34793e0333f.png',
        // 'https://user-images.githubusercontent.com/25967949/86789132-eefc4800-c0a1-11ea-8864-a5445b3bb87e.png',
      ],
      selectedImage: null,
     
    }
  },
  computed: {
    ...mapState(['myaccount', 'teams', 'profile', 'users', 'interests', 'languages']),
  },
  methods: {
    ...mapActions(['getProfile', 'fetchTeams']),
    randomImage(items) {
      return items[Math.floor(Math.random()*items.length)];
    },
  },
  created() {
    this.getProfile(this.userId)
    this.fetchTeams(this.userId)
  },
  beforeRouteUpdate (to, from, next) {
    this.getProfile(to.params.userId)
    this.fetchTeams(this.userId)
    next();
  },
}
</script>

<style scoped>
.container {
  text-align: left;
}
.profile-image-box {
  margin-top: auto;
  margin-bottom: auto;
}
.profile-image {
  border-radius: 50%;
  max-width: 100%;
}
.sites, .sites:link {
  color: black;
}
.sites:hover {
  cursor: pointer;
  color: #3596F4;
}
/* .card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: .5rem;
} */
.card {
  text-decoration: none;
  color: black;
  height: 420px;
  text-align: center;
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

.badge {
  border: 1px solid #3596F4;
}

.team-header {
  height: 40%;
}

.team-title {
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

.team-description {
  height: 20%;
}
.description {
  overflow: hidden;
  white-space: normal;
  line-height: 1.0;
  /* height: 20%; */
  word-wrap: break-word;
  margin: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
}

.language-list {
  overflow: hidden;
  white-space: normal;
  height: 1.1 em;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
}

.interests {
  background-color: #3596F4;
  color: white;
}
.team-interests {
  overflow: hidden;
  white-space: normal;
  height: 1.1 em;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
}
</style>