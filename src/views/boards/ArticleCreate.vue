<template>
  <div class="container my-3">
    <v-app>
    <div class="dropdown d-flex">
      <button class="btn btn-secondary dropdown-toggle mx-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span v-if="selectedBoard">{{ selectedBoard }}</span>
        <span v-else>게시판</span>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="selectBoard('ssafy')">싸피 게시판</a>
        <a class="dropdown-item" @click="selectBoard('free')">자유 게시판</a>
      </div>
    </div>

    <div class="title">
      <input v-model="articleCreateData.body.title" id="title" class="w-100 inputs" type="text" placeholder="제목을 입력해주세요 :)">
    </div>
    <div class="editor-page my-3">
      <div id="summernote"></div>
    </div>
    <div class="d-flex justify-content-between">
      <small class="goBack" @click="clickBack">뒤로가기</small>
      <button type="button" class="btn btn-primary" @click="articleCreateSave">작성하기</button>
    </div>
  </v-app>
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
        },
      },
      
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
    },
    clickBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.selectBoard(this.$route.params.board_name)
  },
  mounted() {
    window.$('#summernote').summernote({
      placeholder: '내용을 작성해주세요 :)',
      height: 300,
    });
    window.$('#summernote').summernote('justifyLeft');
  }
}
</script>

<style scoped>

.btn {
  color: black;
  background-color: skyblue;
  border-style: none;
}

#dropdownMenuButton {
  margin: 0 !important;
}

.inputs {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #757575;
  width: 70%;
  padding: 0.5rem;

}
.inputs:focus {
  outline: none;
}

textarea {
  text-align: left;
}

::-webkit-resizer {
  display: none;
}

.summernote .note-editable {
  text-align: left;
}

.goBack {
  text-decoration: underline;
}
.goBack:hover {
  cursor:pointer;
}
</style>