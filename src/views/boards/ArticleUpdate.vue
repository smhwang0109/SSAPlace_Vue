<template>
  <v-app>
    <v-card>
        <v-form
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="articleUpdateData.title"
                  color="blue-grey lighten-2"
                  :rules="[v => !!v || '필수항목입니다.']"
                  label="제목을 입력하세요 :)"
                ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0">
                <div class="editor-page my-3">
                  <div id="summernote"></div>
                </div>
                <div class="d-flex justify-content-between">
                  <small class="goBack" @click="clickBack">뒤로가기</small>
                  <button type="button" class="btn btn-primary" @click="articleUpdateSave">수정하기</button>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ArticleUpdate',
  data() {
    return {
      articleUpdateData: {
        title: null,
        content: null
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
      this.articleUpdateData.content = window.$('#summernote').summernote('code')
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
    this.articleUpdateData.title = this.selectedArticle.title
  },
}
</script>

<style scoped>

.btn {
  color: white;
  background-color: #3596F4;
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