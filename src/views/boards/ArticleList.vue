<template>
  <v-app>
    <v-card
      class="mx-auto w-100"
      tile
      v-if="articles"
    >
      <v-img
        height="125"
        :src="require(`@/assets/${boardName}_board_banner.jpg`)"
      >
        <v-row>
          <v-row
            class="pa-4"
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <h3 class="headline text-light">{{ boardHeader.title }}</h3>
              <span class="grey--text text--lighten-1">{{ boardHeader.description }}</span>
            </v-col>
          </v-row>
        </v-row>
      </v-img>

      <div class="board-tools border-bottom row mx-0 px-1">
        <div class="col-md-6 col-sm-12">
          <div class="d-flex justify-content-start align-items-center">
            <label for="searchbar"><h4 class="mb-0"><i class="fas fa-search mb-0"></i></h4></label>
            <input @keyup.enter="searchArticle(searchData)" v-model="searchData.keyword" type="text" class="form-control ml-2 rounded border w-100" id="searchbar" placeholder="제목, 내용, 태그로 게시물을 검색해보세요 :)">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="d-flex justify-content-end align-items-center">
            <router-link :to="{ name: 'ArticleCreate', params: { board_name: boardName} }">
              <button type="button" class="btn btn-primary custom-btn">새 글쓰기</button>
            </router-link>
          </div>
        </div>
      </div>

      <v-list
        class="py-0"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="article in paginatedData"
            :key="`article_${article.id}`"
            class="row px-3 mx-0 border-bottom"
            @click="selectArticle(article.id)"
          >
            <div class="col-md-6 col-xs-12 d-flex flex-column justify-content-center align-items-start">
              <h4>{{ article.title }}</h4>
              <div>
                <small v-for="tag in article.tags" :key="`tag_${tag.id}`" class="mr-2 hashtag">#{{ tag.name }}</small>
              </div>
            </div>
            <div class="col-md-6 col-xs-12 d-flex justify-content-end align-items-center">
              <p class="mb-0 mr-4 font-weight-bold">{{ article.author.username }}</p>
              <p class="mb-0 mr-4 font-weight-bold">{{ article.created_at }}</p>
              <button type="button" class="btn hit-btn text-white p-1 pr-2 mr-3">
                <i class="far fa-eye mx-2 mb-0"></i>
                <span class="badge">{{ article.hit }}</span>
              </button>
              <button type="button" class="btn like-btn text-white p-1 pr-2">
                <i class="far fa-heart mx-2 mb-0"></i>
                <span class="badge">{{ article.like_users.length }}</span>
              </button>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <div>
      <div class="btn-cover" v-if="paginatedData">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn custom-btn">이전</button>
        <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
        <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn custom-btn">다음</button>
      </div>
    </div>
  </v-app>
</template>

<script>
import router from '@/router'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ArticleList',
  data() {
    return {
      boardName: this.$route.params.board_name,
      pageNum: 0,
      pageSize: 10,
      searchData: {
        boardName: this.$route.params.board_name,
        keyword: null
      }
    }
  },
  methods: {
    ...mapActions(['fetchArticles', 'searchArticle']),
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    selectArticle(articleId) {
      router.push({ name: 'ArticleDetail', params: { board_name: this.boardName, article_id: articleId }})
    },
  },
  computed: {
    ...mapState(['articles']),
    boardHeader() {
      if (this.boardName === 'ssafy') {
        return {
          title: '싸피 게시판',
          description: '싸피와 관련된 글을 작성해보세요 :)',
        }
      } else if (this.boardName === 'free') {
        return {
          title: '자유 게시판',
          description: '자유로운 주제로 글을 작성해보세요 :)',
        }
      } else {
        return false
      }
    },
    pageCount() {
      let listLeng = this.articles.length,
      listSize = this.pageSize,
      page = Math.floor(listLeng/listSize);

      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      if (this.articles.length >= 1){
        const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
        return this.articles.slice(start, end);
      } else {
        return 0
      }
    }
  },
  created() {
    this.fetchArticles(this.boardName)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchArticles(to.params.board_name)
    this.boardName = to.params.board_name
    this.searchData.boardName = to.params.board_name
    next();
  },
}
</script>

<style scoped>

table {
  /* border: 1px solid #ccc; */
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  background-color: #f8f8f8;
  /* border: 1px solid #ddd; */
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}

.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
  clear: both;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}

.page-btn:hover {
  background-color: #345389;
  cursor: pointer;
}

.custom-btn {
  background-color:#3596F4;
  outline: transparent;
  color: white;
  border: transparent;
  border-radius: 5px;
}

.custom-btn:hover{
  background-color: #345389;
}

th, td {
  font-family: 'Noto Sans KR';
  background-color: white;
}

table{
  border-style: none;
}

.table thead th {
  border-top-style: none;
  
}

.board-tools {
  background-color: rgb(240, 240, 240);
}

.hashtag {
  color: #3596F4;
  font-weight: bold;
}

.hit-btn {
  background-color:#4aa5ff;
  color: white;
}

.like-btn {
  background-color:#ff5252;
  color: white;
}

</style>