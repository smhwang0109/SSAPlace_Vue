<template>
  <div v-if="selectedArticle" class="card">
    <div class="card-header">        
      <router-link :to="{ name: 'Boards', params: { board_name: articleData.boardName }}"><p class="boardname link-hover">{{ revisedBoardName }}</p></router-link>
      <div class="row">
        <h4 class="mb-0 col-md-6 col-xs-12">{{ selectedArticle.title }}</h4>        
        <div class="mb-1 col-md-6 col-xs-12 d-flex justify-content-end align-items-center">
          <button type="button" class="btn hit-btn text-white p-1 pr-2 mr-2">
            <i class="far fa-eye mx-2 mb-0"></i>
            <span class="badge">{{ selectedArticle.hit }}</span>
          </button>
          <button type="button" class="btn like-btn text-white p-1 pr-2" @click="likeArticle">
            <i v-if="isArticleLike" class="far fa-heart mx-2 mb-0"></i>
            <i v-else class="fas fa-heart mx-2 mb-0"></i>
            <span class="badge">{{ selectedArticle.like_users.length }}</span>
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center pb-0 review-info">
        <small class="line-height">posted by <span class="link-hover" ><strong>{{ selectedArticle.author.username }}</strong></span> on {{selectedArticle.created_at}} & <span style="font-weight:700">edited at</span> {{selectedArticle.updated_at}}</small>
        <div v-if="selectedArticle.author.id === myaccount.id" class="btn-group dropleft">
          <button type="button" class="btn btn-sm custom-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          <div class="dropdown-menu">
            <router-link class="escape-router-link" :to="{ name: 'ArticleUpdate', params: { board_name: articleData.boardName, article_id: articleData.articleId }}"><p class="review-option give-highlight text-center border-bottom">수정</p></router-link>
            <p @click="confirmDeleteArticle" class="review-option give-highlight text-center">삭제</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <p v-html="selectedArticle.content" class="card-text"></p>
      <div>
        <small v-for="tag in selectedArticle.tags" :key="`tag_${tag.id}`" class="hashtag mr-2">#{{ tag.name }}</small>
      </div>
    </div>

    <div class="card-footer text-muted">
      <!-- 댓글 목록 --> 
      <p>Comments</p>
      <hr>
      <div v-if="comments!=='[]'">
        <div v-for="comment in comments" :key="comment.id">
          <div class="comments d-flex justify-content-between">
            <!-- 댓글 작성자 -->
            <strong>{{ comment.author.username }}</strong>
            
            <!-- 댓글 수정/삭제 드롭다운 -->
            <div v-if="comment.author.id === myaccount.id" class="btn-group dropleft comment-padding">
              <button type="button" class="btn btn-sm custom-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="dropdown-menu">
                <p class="give-highlight text-center border-bottom" @click="initUpdateComment(comment)">수정</p>
                <p class="give-highlight text-center" @click="confirmDeleteComment(comment.id)">삭제</p>
              </div>
            </div>
          </div>

          <!-- 댓글 수정란 -->
          <div class="mx-1 my-1 d-flex justify-content-center">
            <div v-show="comment.id === commentUpdateData.commentId" class="input-group row">
              <textarea @keyup.enter="saveUpdateComment" v-model="commentUpdateData.body.content" type="content" class="col-xs-8 col-md-11" rows="2"></textarea>
              <button @click="saveUpdateComment" class="input-group-append btn custom-btn justify-content-center align-items-center col-xs-4 col-md-1 text-center">수정</button>
            </div>
          </div>
          <!-- 댓글 내용 -->
          <div v-show="comment.id != commentUpdateData.commentId">
            <p class="mb-2">{{ comment.content }}</p>
            <small class="comment-info">created {{ comment.created_at }} & updated {{ comment.updated_at }}</small>
            <hr>
          </div>
        </div>
      </div>
      <!-- 댓글 생성 -->
      <div class="mx-1 d-flex justify-content-center">
        <div class="input-group row">
          <textarea @keyup.enter="saveCreateComment" v-model="commentCreateData.content" class="col-xs-8 col-md-11" type="content" placeholder="댓글을 작성해주세요." rows="2" ></textarea>
          <button class="input-group-append btn custom-btn justify-content-center align-items-center col-xs-4 col-md-1 text-center" @click="saveCreateComment">작성</button>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      articleData: {
        boardName: this.$route.params.board_name,
        articleId: this.$route.params.article_id,
      },
      commentCreateData: {
        content: null,
      },
      commentUpdateData: {
        commentId: null,
        body: {
          content: null
        }
      }
    }
  },
  computed: {
    ...mapState(['selectedArticle', 'comments', 'myaccount']),
    ...mapGetters(['isArticleLike']),
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
    ...mapActions(['selectArticle', 'selectArticle', 'deleteArticle', 'fetchComments', 'createComment', 'updateComment', 'deleteComment', 'likeArticle']),
    confirmDeleteArticle() {
      if (confirm('게시물을 삭제하시겠습니까?') === true) {
        this.deleteArticle()
      } else {
        return false
      }
    },
    saveCreateComment() {
      this.createComment(this.commentCreateData)
        .then(() => {
          this.commentCreateData.content = null
        })
    },
    initUpdateComment(comment) {
      this.commentUpdateData.commentId = comment.id
      this.commentUpdateData.body.content = comment.content
    },
    saveUpdateComment() {
      this.updateComment(this.commentUpdateData)
        .then(() => {
          this.commentUpdateData.commentId = null
          this.commentUpdateData.body.content = null
        })
    },
    confirmDeleteComment(commentId) {
      if (confirm('댓글을 삭제하시겠습니까?') === true) {
        this.deleteComment(commentId)
      } else {
        return false
      }
    }
  },
  created() {
    this.selectArticle(this.articleData)
    this.fetchComments(this.articleData)
  },
  beforeRouteUpdate (to, from, next) {
    this.boardName = to.params.board_name
    next();
  },
}
</script>

<style scoped>
.custom-btn {
  background-color:#3596F4;
  outline: transparent;
  color: white;
  border: transparent;
}

.custom-btn:hover{
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

.escape-router-link {
  color: #212529;
  text-decoration: none;
}

textarea {
  background-color: white;
  border: 1px solid black;
}

.hashtag {
  color: #3596F4;
  font-weight: bold;
}

.hit-btn {
  background-color:#4aa5ff;
  color: white;
}

.hit-btn:hover {
  cursor: default;
}

.like-btn {
  background-color:#ff5252;
  color: white;
  transition: color 0.2;
}

.like-btn:hover {
  background-color:#e00000;
}

</style>