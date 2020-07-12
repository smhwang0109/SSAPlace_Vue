<template>
  <div>
    <!-- 배너 위치시키기 -->
    <div class="banner d-flex justify-content-center align-items-center">
      <h4 class="offset-1 col-5">싸피인을 위한,<br>재학생 및 졸업생들의 소통 공간</h4>
      <p class="col-5 offset-1">SSAPlace는 싸피인을 이어주는 플랫폼입니다.<br>특별한 인연을 찾고 있다면,<br>SSAPlace에 글을 남겨보세요.</p>
    </div>

     <!-- 게시판 미리 보기 -->
    <div class="row">
      <!-- 싸피게시판 -->
      <div class="col-lg-6 col-xs-12">
        <!-- v-for 사용해 게시판 최신글 (4~5개) 노출시키기 -->
        <v-card
          class="mx-auto w-100"
          tile
          v-if="ssafyArticles"
        >
          <div class="d-flex justify-content-between headers p-3">
            <h4 class="mb-0 font-weight-bold">싸피 게시판</h4>
            <h4 class="mb-0 showMore font-weight-bold" @click="clickSSAFYBoard">+</h4>
          </div >
          <v-list
            class="py-0"
          >
            <v-list-item-group color="primary">
              <v-list-item
                v-for="article in ssafyArticles"
                :key="`article_${article.id}`"
                class="border-bottom"
                @click="selectSSAFYArticle(article.id)"
              >
                <div class="w-100 row">
                  <div class="col-6 d-flex align-items-center">
                    <h6 class="mb-0 font-weight-bold article-title">{{ article.title }}</h6>
                  </div>
                  <div class="d-flex justify-content-end align-items-center col-6">
                    <p class="mb-0">{{ article.author.username }}</p>
                    <div class="ml-2 ssafy-color d-flex flex-row align-items-center">
                      <i class="far fa-eye ml-1 mb-0"></i>
                      <small class="text-center custom-width">{{ article.hit }}</small>
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
      <!-- 자유게시판 -->
      <div class="col-lg-6 col-xs-12">
        <!-- v-for 사용해 게시판 최신글 (4~5개) 노출시키기 -->
        <v-card
          class="mx-auto w-100"
          tile
          v-if="freeArticles"
        >
          <div class="d-flex justify-content-between headers p-3">
            <h4 class="mb-0 font-weight-bold">자유 게시판</h4>
            <h4 class="mb-0 showMore font-weight-bold" @click="clickFreeBoard">+</h4>
          </div >
          <v-list
            class="py-0"
          >
            <v-list-item-group color="primary">
              <v-list-item
                v-for="article in freeArticles"
                :key="`article_${article.id}`"
                class="border-bottom"
                @click="selectFreeArticle(article.id)"
              >
                <div class="w-100 row">
                  <div class="col-6 d-flex align-items-center">
                    <h6 class="mb-0 font-weight-bold article-title">{{ article.title }}</h6>
                  </div>
                  <div class="d-flex justify-content-end align-items-center col-6">
                    <p class="mb-0">{{ article.author.username }}</p>
                    <div class="ml-2 ssafy-color d-flex flex-row align-items-center">
                      <i class="far fa-eye ml-1 mb-0"></i>
                      <small class="text-center custom-width">{{ article.hit }}</small>
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </div>
    
    <!-- 프로젝트 팀 구해요 -->
    <div class="d-flex justify-content-between mt-3">
      <h4 class="my-3">기대되는 새로운 팀</h4>
      <i @click="clickFindTeam" class="fas fa-chevron-right fa-2x arrow"></i>
    </div>
    <div class="container-fluid team-card" v-if="collectThreeTeams">
      <div class="row">
        <div class="col-4 h-30 p-2" v-for="collectTeam in collectThreeTeams" :key="`collectTeam-${collectTeam.id}`">
          <router-link :to="{ name: 'TeamDetail', params: {teamId: collectTeam.id} }" class="card h-100">
            <img :src="randomImage(images)" class="card-img-top" alt="image" height="120">
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
            <div class="card-footer team-footer" >
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
    
    <!-- 프로젝트 멤버 구해요 -->
    <!-- <div class="d-flex justify-content-between mt-5">
      <h4 class="my-4">이번주 멤버 추천</h4>
       <i @click="clickFindMember" class="fas fa-chevron-right fa-2x arrow"></i>
    </div>
    <div>
      <div class="card-deck">
        <div class="card">
          <div class="card-header">
            <div class="member-name d-flex justify-content-between">
              <p class="col-3 p-0">신채린</p>
              <p class="position col-9 p-0 text-right">Front End Developer</p>
            </div>
            <small>
              <i class="fas fa-map-marker-alt"></i>
            서울특별시 강남구/3기
            </small>
          </div>
          <div class="card-body">
            <h5 class="card-title position-title">프론트엔드 개발자, 웹 개발자</h5>
            <p class="card-text">1학기 프로젝트 우수상, 기획 경험, 디자인, 포토샵, Django, Vue 모두 가능 </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">2시간 전</small>
            <i class="far fa-bookmark"></i>
          </div>
        </div>
      </div>
    </div> -->

   
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
export default {
  name: 'Home',
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
  methods: {
    clickSSAFYBoard() {
      router.push({ name: 'Boards', params: { board_name: "ssafy"} })
    },
    clickFreeBoard() {
      router.push({ name: 'Boards', params: { board_name: "free"} })
    },
    selectSSAFYArticle(articleId) {
      router.push({ name: 'ArticleDetail', params: { board_name: 'ssafy', article_id: articleId }})
    },
    selectFreeArticle(articleId) {
      router.push({ name: 'ArticleDetail', params: { board_name: 'free', article_id: articleId }})
    },
    clickFindMember() {
      this.$router.push({name: 'FindMember'})
    },
    clickFindTeam() {
      router.push({ name: 'CollectTeamList'})
    },
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
    randomImage(items) {
      return items[Math.floor(Math.random()*items.length)];
    },
    ...mapActions(['fetchArticles','fetchCollectTeams']),
  },
  computed: {
    ...mapState(['ssafyArticles', 'freeArticles', 'collectThreeTeams', 'interests', 'languages']),
  },
  created() {
    this.fetchArticles('ssafy')
    this.fetchArticles('free')
    this.fetchCollectTeams()
  }
}
</script>

<style scoped>
/* * {
  text-align: left;
} */



.member-name > p {
  margin: 0;
}
.headers {
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.055);
}

.card-title {
  margin: 0;
}

.card-footer, .card-header{
  background-color: white;
  border-style: none;
}

.position {
  color: #979797;
}

.position-title {
  font-weight: 600;
}

/* 화살표 line-height */
.arrow {
  line-height: 60px;
}

.arrow:hover {
  color: #3596F4;
}

.banner {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7) 150px, rgba(0, 0, 0, 0.7) 100%), url("../assets/ssafy-banner.jpg");
  /* background-image: url("../assets/ssafy-banner.jpg"); */
  height: 300px;
  background-repeat: no-repeat;
  background-position: center center;
  color: white;
  opacity: 0.7;
  text-align: left;
  word-break: keep-all;
}

.card-deck {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: .5rem;
}

.showMore:hover {
  color: #3596F4;
  cursor: pointer;
}

.hit-btn {
  background-color:#4aa5ff;
  color: white;
}

.ssafy-color {
  color: #4aa5ff;
}


.article-container {
  position: relative;
}
.article-container:hover {
  cursor: pointer;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #00000077;
}
.article-container:hover .overlay {
  opacity: 1;
}
.inner-content {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: right;
  width: 100%;
  font-weight: bold;
}

.like-btn {
  background-color:#ff5252;
  color: white;
}

.article-title {
  overflow: hidden;
  white-space: normal;
  word-wrap: break-word;
  margin: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
  text-align: start;
}


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

.collect-member {
  overflow: hidden;
  white-space: normal;
  height: 1.1 em;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
}

.team-card {
  text-align: center;
}

.team-footer {
  background-color:rgba(0, 0, 0, 0.055);
}

.custom-width {
  min-width: 2rem;
}
</style>