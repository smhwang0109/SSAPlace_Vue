<template>
  <div v-if="selectedArticle" class="card">
    <div class="card-header">        
      <router-link :to="{ name: 'Boards', params: { board_name: articleData.boardName }}"><p class="boardname link-hover">{{ revisedBoardName }}</p></router-link>
      <div class="row">
        <h4 class="mb-0 col-md-6 col-xs-12">{{ selectedArticle.title }}</h4>        
        <div class="mb-1 col-md-6 col-xs-12 d-flex justify-content-end align-items-center">
          <!-- <button type="button" class="btn hit-btn text-white p-1 pr-2 mr-2">
            <i class="far fa-eye mx-2 mb-0"></i>
            <span class="badge">{{ selectedArticle.hit }}</span>
          </button> -->
          <!-- <button type="button" class="btn like-btn text-white p-1 pr-2" @click="likeArticle">
            <i v-if="isArticleLike" class="far fa-heart mx-2 mb-0"></i>
            <i v-else class="fas fa-heart mx-2 mb-0"></i>
            <span class="badge">{{ selectedArticle.like_users.length }}</span>
          </button> -->
          <div class="hit-btn d-flex flex-row align-items-center mr-3">
            <i class="far fa-eye mx-2 mb-0"></i>
            <small class="text-center custom-width">{{ selectedArticle.hit }}</small>
          </div>
          <div class="like-btn d-flex flex-row align-items-center" @click="likeArticle">
            <i v-if="isArticleLike" class="fas fa-heart mx-2 mb-0"></i>
            <i v-else class="far fa-heart mx-2 mb-0"></i>
            <small class="text-center">{{ selectedArticle.like_users.length }}</small>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center pb-0 review-info">
        <small class="line-height">posted by <span class="link-hover" ><router-link :to="{ name: 'Profile', params: {userId: selectedArticle.author.id} }">{{ selectedArticle.author.username }}</router-link></span> on {{selectedArticle.created_at}} & <span style="font-weight:700">edited at</span> {{selectedArticle.updated_at}}</small>
        <div v-if="selectedArticle.author.id === myaccount.id" class="btn-group dropleft">
          <button type="button" class="btn btn-sm custom-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          <div class="dropdown-menu">
            <router-link class="escape-router-link" :to="{ name: 'ArticleUpdate', params: { board_name: articleData.boardName, article_id: articleData.articleId }}"><p class="review-option give-highlight text-center border-bottom">수정</p></router-link>
            <p @click="confirmDeleteArticle" class="review-option give-highlight text-center">삭제</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body py-1">
      <hr class="my-1">
      <div class="quill-editor">
        <div class="output ql-snow">
          <div class="ql-editor px-0 article-content" v-html="selectedArticle.content"></div>
        </div>
      </div>
      <hr class="my-1">
      <div class="my-2 d-flex justify-content-end">
        <span v-for="tag in selectedArticle.tags" :key="`tag_${tag.id}`" class="hashtag mr-2">#{{ tag.name }}</span>
      </div>
    </div>

    <div class="card-footer text-muted">
      <!-- 댓글 목록 --> 
      <p>Comments</p>
      <hr>
      <div v-if="comments!=='[]'">
        <div v-for="comment in comments" :key="comment.id">
          <div class="comments d-flex justify-content-between my-1">
            <!-- 댓글 작성자 -->
            <router-link :to="{ name: 'Profile', params: {userId: comment.author.id} }">{{ comment.author.username }}</router-link>
            
            
            <!-- 댓글 수정/삭제 드롭다운 -->
            <div v-if="comment.author.id === myaccount.id" class="btn-group dropleft comment-padding pr-0">
              <button type="button" class="btn btn-sm custom-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="dropdown-menu">
                <p class="give-highlight text-center border-bottom" @click="initUpdateComment(comment)">수정</p>
                <p class="give-highlight text-center" @click="confirmDeleteComment(comment.id)">삭제</p>
              </div>
            </div>
          </div>

          <!-- 댓글 수정란 -->
          <div v-if="comment.id === commentUpdateData.commentId" class="mx-2 d-flex justify-content-center">
            <div class="input-group row">
              <div v-if="articleData.boardName == 'code'" class="quill-editor col-md-11 py-0 px-0">
                <quill-editor
                  class="editor"
                  ref="myTextEditor"
                  v-model="commentUpdateData.body.content"
                  :options="editorOption"
                />
              </div>
              <textarea v-else @keyup.enter="saveUpdateComment" v-model="commentUpdateData.body.content" type="content" class="col-xs-8 col-md-11" rows="2"></textarea>
              <button @click="saveUpdateComment" class="input-group-append btn custom-btn justify-content-center align-items-center col-xs-4 col-md-1 text-center">수정</button>
            </div>
          </div>
          <!-- 댓글 내용 -->
          <div v-if="comment.id != commentUpdateData.commentId">
            <!-- <p class="mb-2" v-html="comment.content"></p> -->
            <div class="quill-editor mb-3">
              <div class="output ql-snow">
                <div class="ql-editor p-0 m-0" v-html="comment.content"></div>
              </div>
            </div>
          </div>
          <small class="comment-info">created {{ comment.created_at }} & updated {{ comment.updated_at }}</small>
          <hr>
        </div>
      </div>
      <!-- 댓글 생성 -->
      <div class="mx-1 d-flex justify-content-center">
        <div class="input-group row">
          <div v-if="articleData.boardName == 'code'" class="quill-editor col-md-11 py-0 px-0">
            <quill-editor
              class="editor"
              ref="myTextEditor"
              v-model="commentCreateData.content"
              :options="editorOption"
            >
              <div id="toolbar" slot="toolbar">
                <button class="ql-code-block w-100"></button>
              </div>
            </quill-editor>
          </div>
          <textarea v-else @keyup.enter="saveCreateComment" v-model="commentCreateData.content" class="col-md-11" type="content" placeholder="댓글을 작성하세요 :)" rows="2" ></textarea>
          <button class="input-group-append btn custom-btn justify-content-center align-items-center col-md-1 text-center" @click="saveCreateComment">작성</button>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import hljs from 'highlight.js'
import { quillEditor } from 'vue-quill-editor'
// highlight.js style
import 'highlight.js/styles/tomorrow.css'
// import theme style
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import Quill from 'quill'

let icons = Quill.import('ui/icons');
icons['code-block'] = '<span aria-hidden="true">코드 추가</span>';

export default {
  name: 'ArticleDetail',
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: '댓글을 작성하세요 :)',
        modules: {
          toolbar: '#toolbar',
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      // editorOption: {
      //   placeholder: '댓글을 작성하세요 :)',
      //   modules: {
      //     toolbar: [
      //       ['code-block'],
      //     ],
      //     syntax: {
      //       highlight: text => hljs.highlightAuto(text).value
      //     }
      //   }
      // },
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
      } else if (this.articleData.boardName === 'code') {
        return '코드 게시판'
      } else {
        return false
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
    },
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
  /* background-color:#4aa5ff; */
  color: #4aa5ff;
}

.hit-btn:hover {
  /* cursor: default; */
}

.like-btn {
  /* background-color:#ff5252; */
  color:#ff5252;
  transition: color 0.2;
}

.like-btn:hover {
  /* background-color:#e00000; */
  cursor: pointer;
}

.quill-editor {
  display: flex;
  flex-direction: column;
  /* 왜 안먹지..? */
  .editor { 
    overflow: default;
    background-color: white;
  }
  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;
    &.code {
      padding: 1rem;
      height: 16rem;
    }
    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}

.editor {
  overflow: default;
  background-color: white;
}

.article-content {
  min-height: 15rem;
}

.ql-code-block {
  text-align: start;
  margin-bottom: 5px;
  color: #3596F4;
}

</style>