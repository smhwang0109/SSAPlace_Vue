<template>
  <div class="container">
    <h3>게시판</h3>
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
      </div>
      <div class="col-6">
        <div class="d-flex justify-content-between headers">
          <h4>자유게시판</h4>
          <h4>+</h4>
        </div>
        <!-- v-for 사용해 게시판 최신글 (4~5개) 노출시키기 -->
        <div class="d-flex justify-content-between">
          <p>얼른 취업하고 싶습니다 ㅜㅜ</p>
          <p>username2</p>
        </div>
      </div>
      <div class="col-6"> 
        <div class="d-flex justify-content-between headers">
          <h4>취업/진로게시판</h4>
          <h4>+</h4>
        </div>
        <!-- v-for 사용해 게시판 최신글 (4~5개) 노출시키기 -->
        <div class="d-flex justify-content-between">
          <p>프론트엔드가 맞을까요?!</p>
          <p>username3</p>
        </div>
      </div>
      <div class="col-6"> 
        <div class="d-flex justify-content-between headers">
          <h4>구인/구직게시판</h4>
          <h4>+</h4>
        </div>
        <!-- v-for 사용해 게시판 최신글 (4~5개) 노출시키기 -->
        <div class="d-flex justify-content-between">
          <p>OO기업에서 백엔드 개발자 구해요.</p>
          <p>username4</p>
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
    }
  }
}
</script>

<style scoped>
* {
  text-align: left;
}
.headers {
  border-bottom: 1px solid black;
  padding: 5px;
}
</style>