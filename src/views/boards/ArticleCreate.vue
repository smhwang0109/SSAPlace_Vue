<template>
  <v-app v-if="articleCreateData">
    <v-card>
        <v-form
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-container>
            <v-row class="row">
              <v-col cols=12 class="col-md-10">
                <v-text-field
                  v-model="articleCreateData.body.title"
                  color="blue-grey lighten-2"
                  :rules="[v => !!v || '필수항목입니다.']"
                  label="제목을 입력하세요 :)"
                ></v-text-field>
              </v-col>
              <v-col cols=12 class="col-md-2 d-flex justify-content-end align-items-center py-0">
                <div class="dropdown">
                  <button class="btn dropdown-toggle mx-2" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span v-if="selectedBoard">{{ selectedBoard }}</span>
                    <span v-else>게시판</span>
                  </button>
                  <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item px-3" @click="selectBoard('ssafy')">싸피 게시판</a>
                    <a class="dropdown-item px-3" @click="selectBoard('free')">자유 게시판</a>
                    <a class="dropdown-item px-3" @click="selectBoard('code')">코드 게시판</a>
                  </div>
                </div>
              </v-col>

              <v-col cols="12 mb-5">
                <div class="quill-editor">
                  <quill-editor
                    class="editor"
                    ref="myTextEditor"
                    v-model="articleCreateData.body.content"
                    :options="editorOption"
                  />
                </div>
              </v-col>

              <v-col v-if="tags" cols="12">
                <v-combobox
                  v-model="articleCreateData.tags"
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
import { mapState, mapActions } from 'vuex'

import hljs from 'highlight.js'
import { quillEditor } from 'vue-quill-editor'
// highlight.js style
import 'highlight.js/styles/tomorrow.css'
// import theme style
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  name: 'ArticleCreate',
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: '글을 작성하세요 :)',
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
      selectedBoard: null,
      articleCreateData: {
        boardName: null,
        body: {
          title: null,
          content: null,
        },
        tags: [],
      },
    }
  },
  computed: {
    ...mapState(['tags']),
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  methods: {
    ...mapActions(['createArticle', 'fetchTags']),
    selectBoard(boardName) {
      this.articleCreateData.boardName = boardName
      if (boardName === 'ssafy') {
        this.selectedBoard = '싸피 게시판'
      } else if (boardName === 'free') {
        this.selectedBoard = '자유 게시판'
      } else if (boardName === 'code') {
        this.selectedBoard = '코드 게시판'
      }
    },
    articleCreateSave() {
      this.createArticle(this.articleCreateData)
    },
    clickBack() {
      this.$router.go(-1)
    },
  },
  created() {
    this.selectBoard(this.$route.params.board_name)
    this.fetchTags()
    if (this.$route.params.board_name === 'code') {
      this.articleCreateData.body.content = '<pre class="ql-syntax" spellcheck="false">write your code here\n</pre>'
    }
  },
}
</script>

<style lang="scss" scoped>
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
  min-width: 7.25rem;
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

.goBack {
  text-decoration: underline;
}
.goBack:hover {
  cursor:pointer;
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