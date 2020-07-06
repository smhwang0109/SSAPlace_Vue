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
                <div class="d-flex justify-content-between align-items-center w-100">
                  <h6 class="mb-0 font-weight-bold">{{ article.title }}</h6>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-0">{{ article.author.username }}</p>
                    <div class="ml-2 ssafy-color">
                      <i class="far fa-eye mx-1 mb-0 ssafy-color"></i>
                      <span class="mb-0">{{ article.hit }}</span>
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
                class="border-bottom article-container"
                @click="selectFreeArticle(article.id)"
              >
                <div class="d-flex justify-content-between align-items-center w-100">
                  <h6 class="mb-0 font-weight-bold">{{ article.title }}</h6>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-0  font-weight-bold">{{ article.author.username }}</p>
                  </div>
                </div>
                <div class="overlay">
                  <div class="inner-content">
                    <button type="button" class="btn hit-btn text-white p-1 pr-2 mr-1">
                      <i class="far fa-eye mx-2 mb-0"></i>
                      <span class="badge">{{ article.hit }}</span>
                    </button>
                    <button type="button" class="btn like-btn text-white p-1 pr-2 mr-2">
                      <i class="far fa-heart mx-2 mb-0"></i>
                      <span class="badge">{{ article.like_users.length }}</span>
                    </button>
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
    <div>
      <div class="card-deck">
        <!-- Sample card 1 -->
        <div class="card">
          <img src="https://picsum.photos/seed/picsum/400/120" class="card-img-top" alt="image" >
          <div class="card-body">
            <h5 class="card-title">금융 핀테크 웹사이트 개발</h5>
            <span>by 올핀</span>
            <p></p>
            <h5 class="card-subtitle">프론트엔드 개발</h5>
            <p class="card-text">모바일 플랫폼/초기 개발 단계/ 현재 구성원 2명/ 서울특별시 전체/ ~2020.08.20</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">2시간 전</small>
            <i class="far fa-bookmark"></i>
          </div>
        </div>
        <!-- Sample card 2 -->
        <div class="card">
          <img src="https://picsum.photos/seed/picsum/400/120" class="card-img-top" alt="image" >
          <div class="card-body">
            <h5 class="card-title">금융 핀테크 웹사이트 개발</h5>
            <span>by 올핀</span>
            <p></p>
            <h5 class="card-title">프론트엔드 개발</h5>
            <p class="card-text">모바일 플랫폼/초기 개발 단계/ 현재 구성원 2명/ 서울특별시 전체/ ~2020.08.20</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">2시간 전</small>
            <i class="far fa-bookmark"></i>
          </div>
        </div>
        <!-- sample card3 -->
        <div class="card">
          <img src="https://picsum.photos/seed/picsum/400/120" class="card-img-top" alt="image" >
          <div class="card-body">
            <h5 class="card-title">금융 핀테크 웹사이트 개발</h5>
            <span>by 올핀</span>
            <p></p>
            <h5 class="card-title">프론트엔드 개발</h5>
            <p class="card-text">모바일 플랫폼/초기 개발 단계/ 현재 구성원 2명/ 서울특별시 전체/ ~2020.08.20</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">2시간 전</small>
            <i class="far fa-bookmark"></i>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 프로젝트 멤버 구해요 -->
    <div class="d-flex justify-content-between mt-5">
      <h4 class="my-4">이번주 멤버 추천</h4>
       <i @click="clickFindMember" class="fas fa-chevron-right fa-2x arrow"></i>
    </div>
    <div>
      <div class="card-deck">
        <!-- Sample card 1 -->
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
        <!-- Sample card 2 -->
        <div class="card">
          <div class="card-header">
            <div class="member-name d-flex justify-content-between">
              <p class="col-3 p-0">황수민</p>
              <p class="position col-9 p-0 text-right">Front End Developer</p>
            </div>
            <small>
              <i class="fas fa-map-marker-alt"></i>
              서울특별시 강남구/3기
            </small>
          </div>
          <div class="card-body">
            <h5 class="card-title position-title">프론트엔드 개발자, 웹 개발자</h5>
            <p class="card-text">1학기 프로젝트 최우수상, 기획 경험, 디자인, 포토샵, Django, Vue 모두 가능 </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">2시간 전</small>
            <i class="far fa-bookmark"></i>
          </div>
        </div>
        <!-- sample card 3 -->
        <div class="card">
          <div class="card-header">
            <div class="member-name d-flex justify-content-between">
              <p class="col-3 p-0">박선환</p>
              <p class="position col-9 p-0 text-right">Front End Developer</p>
            </div>
            <small>
              <i class="fas fa-map-marker-alt"></i>
              서울특별시 강남구/3기
            </small>
          </div>
          <div class="card-body">
            <h5 class="card-title position-title">프론트엔드 개발자, 웹 개발자</h5>
            <p class="card-text">1학기 프로젝트 최우수상, 기획 경험, 디자인, 포토샵, Django, Vue 모두 가능 </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">2시간 전</small>
            <i class="far fa-bookmark"></i>
          </div>
        </div>



      </div>
    </div>

   
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
export default {
  name: 'Home',
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
      this.$router.push({name: 'FindTeam'})
    },
    ...mapActions(['fetchArticles']),
  },
  computed: {
    ...mapState(['ssafyArticles', 'freeArticles']),
  },
  created() {
    this.fetchArticles('ssafy')
    this.fetchArticles('free')
  }
}
</script>

<style scoped>
* {
  text-align: left;
}

.member-name > p {
  margin: 0;
}
.headers {
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.06);
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
</style>