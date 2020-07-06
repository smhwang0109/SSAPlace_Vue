<template>
  <v-app v-if="selectedArticle">
    <v-card>
        <v-form
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="articleUpdateData.body.title"
                  color="blue-grey lighten-2"
                  :rules="[v => !!v || '필수항목입니다.']"
                  label="제목을 입력하세요 :)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <div class="editor-page my-3">
                  <div id="summernote"></div>
                </div>
              </v-col>

              <v-col cols="12">
                <v-combobox
                  v-model="articleUpdateData.tags"
                  prepend=""
                  :items="tags"
                  :search-input.sync="search"
                  hide-selected
                  hint="최대 5개"
                  label="태그를 추가하세요 :)"
                  multiple
                  persistent-hint
                  small-chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols=12>
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
      articleData: {
        boardName: this.$route.params.board_name,
        articleId: this.$route.params.article_id,
      },
      articleUpdateData: {
        body: {
          title: null,
          content: null
        },
        tags: []
      }
    }
  },
  computed: {
    ...mapState(['selectedArticle', 'tags']),
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
    ...mapActions(['selectArticle', 'updateArticle', 'fetchTags']),
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
    this.articleUpdateData.body.title = this.selectedArticle.title;
    this.selectedArticle.tags.forEach(tag => {
      this.articleUpdateData.tags.push(tag.name)
    });
  },
  created() {
    this.selectArticle(this.articleData)
    this.fetchTags()
  }
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