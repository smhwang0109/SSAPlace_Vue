<template>
  <v-app>
    <v-card>
        <v-form
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="articleCreateData.body.title"
                  color="blue-grey lighten-2"
                  :rules="[v => !!v || '필수항목입니다.']"
                  label="제목을 입력하세요 :)"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <div class="dropdown d-flex">
                  <button class="btn dropdown-toggle mx-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span v-if="selectedBoard">{{ selectedBoard }}</span>
                    <span v-else>게시판</span>
                  </button>
                  <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item px-3" @click="selectBoard('ssafy')">싸피 게시판</a>
                    <a class="dropdown-item px-3" @click="selectBoard('free')">자유 게시판</a>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" class="pt-0">
                <div class="editor-page my-3">
                  <div id="summernote"></div>
                </div>
                <div class="d-flex justify-content-between">
                  <small class="goBack" @click="clickBack">뒤로가기</small>
                  <button type="button" class="btn btn-primary" @click="articleCreateSave">작성하기</button>
                </div>
              </v-col>
            </v-row>
          </v-container>          
        </v-form>
      </v-card>
    </v-app>
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
  color: white;
  background-color: #3596F4;
  border-style: none;
}

.btn:hover{
  background-color: #345389;
}

#dropdownMenuButton {
  margin: 0 !important;
}

#dropdownMenuButton:focus {
  background-color: #345389;
}

.dropdown-menu {
  min-width: 7.75rem;
}

.dropdown-menu a {
  color: black;
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