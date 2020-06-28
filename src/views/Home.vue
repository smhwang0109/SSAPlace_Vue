<template>
  <div class="container">
    <!-- 배너 위치시키기 -->
    <div class="banner d-flex justify-content-center align-items-center">
      <h4 class="offset-1 col-5">싸피인을 위한,<br>재학생 및 졸업생들의 소통 공간</h4>
      <p class="col-5 offset-1">SSAPlace는 싸피인을 이어주는 플랫폼입니다.<br>특별한 인연을 찾고 있다면,<br>SSAPlace에 글을 남겨보세요.</p>
    </div>

     <!-- 게시판 미리 보기 -->
    <h4 class="mt-5 mb-4">게시판</h4>
    <div class="row">
      <div class="col-6">
        <div class="d-flex justify-content-between headers">
          <h4>싸피게시판</h4>
          <h4 @click="clickSSAFYBoard">+</h4>
        </div >
        <!-- v-for 사용해 게시판 최신글 (4~5개) 노출시키기 -->
        <div class="d-flex justify-content-between">
          <p>이번주 서울 급식이에요!</p>
          <p>username1</p>
        </div>
         <div class="d-flex justify-content-between">
          <p>이번주 서울 급식이에요!</p>
          <p>username1</p>
        </div>
         <div class="d-flex justify-content-between">
          <p>이번주 서울 급식이에요!</p>
          <p>username1</p>
        </div>
         <div class="d-flex justify-content-between">
          <p>이번주 서울 급식이에요!</p>
          <p>username1</p>
        </div>
      </div>
      <div class="col-6">
        <div class="d-flex justify-content-between headers">
          <h4>자유게시판</h4>
          <h4 @click="clickDiscussionsBoard">+</h4>
        </div>
        <!-- v-for 사용해 게시판 최신글 (4~5개) 노출시키기 -->
        <div class="d-flex justify-content-between">
          <p>얼른 취업하고 싶습니다 ㅜㅜ</p>
          <p>username2</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>얼른 취업하고 싶습니다 ㅜㅜ</p>
          <p>username2</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>얼른 취업하고 싶습니다 ㅜㅜ</p>
          <p>username2</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>얼른 취업하고 싶습니다 ㅜㅜ</p>
          <p>username2</p>
        </div>
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
              <p>신채린</p>
              <p class="position">Front End Developer</p>
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
              <p>신채린</p>
              <p class="position">Front End Developer</p>
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
        <!-- sample card 3 -->
        <div class="card">
          <div class="card-header">
            <div class="member-name d-flex justify-content-between">
              <p>신채린</p>
              <p class="position">Front End Developer</p>
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
    </div>

   
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    clickSSAFYBoard() {
      this.$router.push({name: 'SSAFYBoard'})
    },
    clickDiscussionsBoard() {
      this.$router.push({name: 'DiscussionsBoard'})
    },
    clickCareerBoard() {
      this.$router.push({name: 'CareerBoard'})
    },
    clickRecruitmentBoard() {
      this.$router.push({name: 'RecruitmentBoard'})
    },
    clickFindMember() {
      this.$router.push({name: 'FindMember'})
    },
    clickFindTeam() {
      this.$router.push({name: 'FindTeam'})
    }
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
  border-bottom: 1px solid black;
  padding: 5px;
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

.banner {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7) 150px, rgba(0, 0, 0, 0.7) 100%), url("../assets/ssafy-banner.jpg");
  /* background-image: url("../assets/ssafy-banner.jpg"); */
  height: 300px;
  background-repeat: no-repeat;
  background-position: center center;
  color: white;
  opacity: 0.7;
}
</style>