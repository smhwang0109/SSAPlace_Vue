<template>
  <div class="my-3">
    <div class="d-flex justify-content-start">
      <router-link :to="{ name: 'Boards', params: { board_name: selectedArticle.articleData.boardName }}"><p class="boardname link-hover">{{ revisedBoardName }}</p></router-link>
    </div>
    <v-app>
    <div class="title">
      <input v-model="articleUpdateData.body.title" id="title" class="w-100 inputs" type="text" placeholder="제목을 입력해주세요 :)">
    </div>
    <div class="editor-page my-3">
      <div id="summernote"></div>
    </div>
    <div class="d-flex justify-content-between">
      <small class="goBack" @click="clickBack">뒤로가기</small>
      <button type="button" class="btn btn-primary" @click="articleUpdateSave">수정하기</button>
    </div>
  </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ArticleUpdate',
  data() {
    return {
      articleUpdateData: {
        articleData: null,
        body: {
          title: null,
          content: null
        }
      }
    }
  },
  computed: {
    ...mapState(['selectedArticle']),
    revisedBoardName() {
      if (this.selectedArticle.articleData.boardName === 'ssafy') {
        return '싸피 게시판'
      } else if (this.selectedArticle.articleData.boardName === 'free') {
        return '자유 게시판'
      } else {
        return 'Undefined'
      }
    }
  },
  methods: {
    ...mapActions(['selectArticle', 'updateArticle']),
    articleUpdateSave() {
      this.articleUpdateData.body.content = window.$('#summernote').summernote('code')
      this.updateArticle(this.articleUpdateData)
    },
    clickBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    window.$('#summernote').summernote({
      placeholder: '내용을 작성해주세요 :)',
      height: 300,
    });
    window.$('#summernote').summernote('code', this.selectedArticle.content);
    this.articleUpdateData.articleData = this.selectedArticle.articleData
    this.articleUpdateData.body.title = this.selectedArticle.title
  },
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

.boardname {
  text-decoration: underline;
  color: rgba(0,0,0,.35);
}

.link-hover:hover{
  cursor: pointer;
}

</style>