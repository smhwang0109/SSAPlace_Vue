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

              <v-col cols="12 mb-5">
                <div class="quill-editor">
                  <quill-editor
                    class="editor"
                    ref="myTextEditor"
                    v-model="articleUpdateData.body.content"
                    :options="editorOption"
                  />
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

import hljs from 'highlight.js'
import { quillEditor } from 'vue-quill-editor'
// highlight.js style
import 'highlight.js/styles/tomorrow.css'
// import theme style
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  name: 'ArticleUpdate',
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            // [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],
            // [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            // ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
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
    editor() {
      return this.$refs.myTextEditor.quill
    },
    revisedBoardName() {
      if (this.selectedArticle.articleData.boardName === 'ssafy') {
        return '싸피 게시판'
      } else if (this.selectedArticle.articleData.boardName === 'free') {
        return '자유 게시판'
      } else if (this.selectedArticle.articleData.boardName === 'code') {
        return '코드 게시판'
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions(['selectArticle', 'updateArticle', 'fetchTags']),
    articleUpdateSave() {
      this.updateArticle(this.articleUpdateData)
    },
    clickBack() {
      this.$router.go(-1)
    },
  },
  created() {
    this.selectArticle(this.articleData)
    this.fetchTags()
  },
  mounted() {
    this.articleUpdateData.body.title = this.selectedArticle.title;
    this.articleUpdateData.body.content = this.selectedArticle.content;
    this.selectedArticle.tags.forEach(tag => {
      this.articleUpdateData.tags.push(tag.name)
    });
  },
}
</script>

<style lang="scss" scoped>
p {
  text-align: left;
}

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

.quill-editor {
  display: flex;
  flex-direction: column;
  .editor {
    height: 40rem;
    overflow: default;
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

</style>