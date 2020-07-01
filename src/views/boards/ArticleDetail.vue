<template>
  <div class="card mb-3">
    <div class="card-header">        
      <p class="moviename link-hover">{{ this.$route.params.board_name }}</p>
      <h4 class="mb-0">{{ selectedArticle.title }}</h4>        
        <div class="d-flex justify-content-between pb-0 review-info">
          <small class="line-height">posted by <span class="link-hover" ><strong>{{ selectedArticle.author.username }}</strong></span> on {{selectedArticle.created_at}} & <span style="font-weight:700">edited at</span> {{selectedArticle.updated_at}}</small>
          <div  class="btn-group dropleft">
            <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <div class="dropdown-menu">
              <p class="review-option give-highlight text-center border-bottom" @click="updateReview" >수정</p>
              <p class="review-option give-highlight text-center" @click="deleteReview" >삭제</p>
            </div>
          </div>
        </div>
      </div>
    <div class="card-body">
      <p class="card-text">{{ selectedArticle.content}}</p>
    </div>
    <div class="card-footer text-muted">
        <!-- 댓글 목록 --> 
        <p>Comments</p>
          <hr>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      articleData: {
        boardName: this.$route.params.board_name,
        articleId: this.$route.params.article_id,
      }
    }
  },
  computed: {
    ...mapState(['selectedArticle'])
  },
  methods: {
    ...mapActions(['selectArticle'])
  },
  created() {
    this.selectArticle(this.articleData)
  }
}
</script>

<style scoped>
.btn {
  background-color:#6f8dbf;
  outline: transparent;
  color: white;
  border: transparent;
}

.btn:hover{
  background-color: #345389;
  color: white;
}

.btn-xs{
  padding: 5px 10px; 
  font-size: 12px;
  border-radius: 5px;
}

.card {
  border: none;
  text-align: left;
}
.card-header {
  border: none;
  padding-bottom: 0px;
  background-color: white;
}


.card-text{
  white-space: pre-wrap;
  color: #1f3459;
  font-family: 'Noto Sans KR';
}

/* .card-text::first-letter{
  color: #903;
  float: left;
  font-family: Georgia;
  font-size: 40px;
  line-height: 30px;
  padding-top: 4px;
  padding-right: 8px;
  padding-left: 3px;
} */

.comment-padding {
  padding-right: 12px;
}



.give-highlight:hover {
  background-color: #a0bef0;
}

.line-height{
  line-height: 28px;
}

.link-hover:hover{
  cursor: pointer;
}

.moviename {
  text-decoration: underline;
  color: rgba(0,0,0,.35);
}

.rating{
  /* background-color: #345389; */
  border-radius: 10px;
}

.show p{
  padding: 5px;
  margin-bottom: 0;
}

.txtbox{
  width: 100%;
}

.update{
  display: none;
}


::-webkit-resizer {
  display: none;
}

.review-info{
  font-family: Noto Sans KR;
}

.comment-info {
  font-family: Noto Sans KR;
}

.comment-content {
  font-family: 'Do Hyeon';
}

.review-option {
  font-family: 'jua';
}
</style>