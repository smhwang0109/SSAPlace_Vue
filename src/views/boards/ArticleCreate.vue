<template>
  <div class="container my-3">
    <v-app>
    <div class="dropdown d-flex">
      <h5 v-if="selectedBoard" class="mx-2">{{ selectedBoard }}</h5>
      <button class="btn btn-secondary dropdown-toggle mx-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        게시판
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="selectBoard('ssafy')">싸피 게시판</a>
        <a class="dropdown-item" @click="selectBoard('free')">자유 게시판</a>
      </div>
    </div>
      
    <v-container id="dropdown-example">
      <v-row>
        <v-col cols="12" sm="3">
          <v-overflow-btn
            class="my-2"
            :items="dropdownBoard"
            label="게시판을 선택해주세요."
            target="#dropdown-example"
            v-model="currentBoard"
          ></v-overflow-btn>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-container>
      <v-col class="d-flex" cols="1" sm="3">
        <v-select
          :items="dropdownBoard"
          label="Standard"
        ></v-select>
      </v-col>
    </v-container>
       -->

    <div class="title">
      <input v-model="articleCreateData.body.title" id="title" class="w-100" type="text" placeholder="제목을 입력해주세요 :)">
    </div>
    <div class="editor-page my-3">
      <div id="summernote"></div>
    </div>
    <button type="button" class="btn btn-primary" @click="articleCreateSave">작성하기</button>
  </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ArticleCreate',
  data() {
    return {
      dropdownBoard: ['싸피게시판', '자유게시판'],
      // currentBoard: null,
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

<style scoped>
.btn {
  color: black;
  background-color: lightpink;
}
</style>