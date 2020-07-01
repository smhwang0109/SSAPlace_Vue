<template>
  <div class="container my-3">
    <h1>새 글 작성 Test</h1>
    <hr>
    <div class="dropdown d-flex justify-content-center">
      <button class="btn btn-secondary dropdown-toggle mx-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        게시판
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="selectBoard('ssafy')">싸피 게시판</a>
        <a class="dropdown-item" @click="selectBoard('free')">자유 게시판</a>
      </div>
      <h5 class="mx-2">{{ selectedBoard }}</h5>
    </div>
    <div class="title">
      <input v-model="articleCreateData.body.title" id="title" class="w-100" type="text" placeholder="제목을 입력해주세요 :)">
    </div>
    <div class="editor-page my-3">
      <div id="summernote"></div>
    </div>
    <button type="button" class="btn btn-primary" @click="articleCreateSave">Save</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ArticleCreate',
  data() {
    return {
      selectedBoard: null,
      articleCreateData: {
        boardName: null,
        body: {
          title: null,
          content: null
        }
      }
    }
  },
  methods: {
    ...mapActions(['createArticle']),
    selectBoard(boardName) {
      this.articleCreateData.boardName = boardName
      if (boardName === 'ssafy') {
        this.selectedBoard = '싸피 게시판'
      } else if (boardName === 'free') {
        this.selectedBoard = '자유 게시판'
      }
    },
    articleCreateSave() {
      this.articleCreateData.body.content = window.$('#summernote').summernote('code')
      this.createArticle(this.articleCreateData)
    }
  },
  mounted() {
    window.$('#summernote').summernote({
      placeholder: '내용을 작성해주세요 :)',
      height: 300,
    });
  }
}
</script>

<style>
</style>