<template>
  <div class="card mb-3">
    <div class="card-header">        
      <!-- <p class="link-hover" @click="goToBoard">{{ this.$route.params.board_name }}</p> -->
      <router-link :to="{ name: 'Boards', params: { board_name: articleData.boardName }}"><p class="boardname link-hover">{{ revisedBoardName }}</p></router-link>
      <h4 class="mb-0">{{ selectedArticle.title }}</h4>        
        <div class="d-flex justify-content-between pb-0 review-info">
          <small class="line-height">posted by <span class="link-hover" ><strong>{{ selectedArticle.author.username }}</strong></span> on {{selectedArticle.created_at}} & <span style="font-weight:700">edited at</span> {{selectedArticle.updated_at}}</small>
          <div  class="btn-group dropleft">
            <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <div class="dropdown-menu">
              <router-link :to="{ name: 'ArticleUpdate', params: { board_name: articleData.boardName, article_id: articleData.articleId }}"><p class="review-option give-highlight text-center border-bottom">수정</p></router-link>
              <p @click="confirmDelete" class="review-option give-highlight text-center">삭제</p>
            </div>
          </div>
        </div>
      </div>
    <div class="card-body">
      <p v-html="selectedArticle.content" class="card-text"></p>
    </div>
    <div class="card-footer text-muted">
        <!-- 댓글 목록 --> 
        <p>Comments</p>
        <hr>
        <div v-if="selectedArticle.ssafy_comments!=='[]'">
          <div v-for="comment in selectedArticle.ssafy_comments" :key="comment.id">
              <div class="comments d-flex justify-content-between">
                <!-- 댓글 작성자 -->
                <strong>{{ comment.author.username }}</strong>
                
                <!-- 댓글 수정/삭제 드롭다운 -->
                <div class="btn-group dropleft comment-padding">
                  <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                  <div class="dropdown-menu">
                    <p class="give-highlight text-center border-bottom " >수정</p>
                    <p class="give-highlight text-center" @click="deleteComment(comment.id)" >삭제</p>
                  </div>
                </div>
              </div>

              <!-- 댓글 수정란 -->
              <!-- <div v-show="comment.id == currentComment.select" class="input-group mx-1 row">
                <textarea @keyup.enter="updateComment(comment.id, comment.content)" v-model="currentComment.content" type="content" class="col-xs-8 col-md-11" rows="5"></textarea>
                <button @click="updateComment(comment.id,comment.content)" class="input-group-append btn justify-content-center align-items-center col-xs-4 col-md-1 text-center">제출</button>
              </div> -->
               <!-- 댓글 내용 -->
              <p>{{ comment.content }}</p>
              <small class="comment-info">created {{ comment.created_at }} & updated {{ comment.updated_at }}</small>
              <!-- <p class="comment-content" v-show="comment.id != currentComment.select">{{ comment.content }}</p>
              <small class="comment-info">created {{ comment.created_at }} & updated {{ comment.updated_at }}</small>  -->
              <hr>
            </div>
          </div>
        <!-- 댓글 생성 --> 
        <div class="input-group mx-1 row">
          <textarea @keyup.enter="createComment" v-model="commentCreateData.content" class="col-xs-8 col-md-11" type="content" placeholder="댓글을 작성해주세요." rows="5" ></textarea>
          <button class="input-group-append btn justify-content-center align-items-center col-xs-4 col-md-1 text-center" @click="createComment">작성</button>
        </div>
        </div>
        
  </div>
</template>

<script>
import axios from 'axios'
import SERVER from '@/api/drf.js'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      articleData: {
        boardName: this.$route.params.board_name,
        articleId: this.$route.params.article_id,
      },
      commentCreateData: {
        // boardName: this.$route.params.board_name,
        content: null,
      },
      commentData: {
        content: null
      }
    }
  },
  computed: {
    ...mapState(['selectedArticle']),
    ...mapGetters(['config']),
    revisedBoardName() {
      if (this.articleData.boardName === 'ssafy') {
        return '싸피 게시판'
      } else if (this.articleData.boardName === 'free') {
        return '자유 게시판'
      } else {
        return 'Undefined'
      }
    },
  },
  methods: {
    ...mapActions(['selectArticle','createComment', 'selectArticle', 'deleteArticle']),
    goToBoard(){
      this.$router.push({ name: 'Boards', params: {board_name: this.$route.params.board_name}})
    },
    // changeStringToObject(S) {
    //   const O = JSON.parse(S);
    //   return O
    // },
    createComment() {
      axios.post(SERVER.URL + SERVER.ROUTES.boards + this.$route.params.board_name  + '/' + this.$route.params.article_id + "/comments/",this.commentCreateData, this.config)
        .then( () => {
          this.selectArticle(this.articleData)
          this.commentCreateData.content = null
        })
        .catch( (err) => {
          console.log(err)
        })
    },
    deleteComment(comment_id) {
      axios.delete(SERVER.URL + SERVER.ROUTES.boards + this.$route.params.board_name + '/' + this.$route.params.article_id + "/comments/" + comment_id)
        .then(() => {
            this.selectArticle(this.articleData)
          })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    
    confirmDelete() {
      if (confirm('게시물을 삭제하시겠습니까?') === true) {
        this.deleteArticle(this.articleData)
      } else {
        return false
      }
    }
  },
  created() {
    this.selectArticle(this.articleData)
    // this.getComment()
  },
  beforeRouteUpdate (to, from, next) {
    this.boardName = to.params.board_name
    next();
  },
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

.boardname {
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

textarea {
  background-color: white;
  border: 1px solid black;
}
</style>