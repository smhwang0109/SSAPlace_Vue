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
            <!-- <label for="searchbar"><h4 class="mb-0"><i class="fas fa-search mb-0"></i></h4></label> -->
            <div class="dropdown">
              <button class="btn dropdown-toggle mx-0 px-1" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span v-if="selectedFilter">{{ selectedFilter }}</span>
                <span v-else>검색</span>
              </button>
              <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item px-3" @click="selectFilter('제목')">제목</a>
                <a class="dropdown-item px-3" @click="selectFilter('내용')">내용</a>
                <a class="dropdown-item px-3" @click="selectFilter('태그')">태그</a>
              </div>
            </div>
            <input @keyup.enter="searchArticle(searchData)" v-model="searchData.keyword" type="text" class="form-control ml-2 rounded border w-100" id="searchbar" placeholder="검색어를 입력하고 Enter를 누르세요 :)">
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
            class="row px-1 mx-0 border-bottom"
            @click="selectArticle(article.id)"
          >
            <div class="col-lg-6 col-sm-12 d-flex flex-column justify-content-center align-items-start custom-height">
              <h5 class="my-1 article-title">{{ article.title }}</h5>
              <div v-if="article.tags" class="d-flex justify-content-start align-items-end">
                <small v-for="tag in article.tags" :key="`tag_${tag.id}`" class="mr-2 hashtag mb-0">#{{ tag.name }}</small>
              </div>
            </div>
            <!-- <div class="col-lg-6 col-sm-12 d-flex justify-content-end align-items-center">
              <small class="mb-0 mr-4 font-weight-bold">{{ article.author.username }}</small>
              <small class="mb-0 mr-4">{{ article.created_at }}</small>
              <div class="hit-btn d-flex flex-row align-items-center mr-3">
                <i class="far fa-eye mb-0"></i>
                <small class="text-center custom-width">{{ article.hit }}</small>
              </div>
              <div class="like-btn d-flex flex-row align-items-center">
                <i class="fas fa-heart mb-0"></i>
                <small class="text-center custom-width">{{ article.like_users.length }}</small>
              </div> -->
            <div class="col-lg-6 col-sm-12 d-flex flex-column justify-content-center align-items-end">
              <div>
                <div class="d-flex justify-content-end align-items-center mr-1 mb-1">
                  <small class="mb-0 mr-4 font-weight-bold">{{ article.author.username }}</small>
                  <small class="mb-0">{{ article.created_at }}</small>
                </div>
                <div class="d-flex justify-content-end align-items-center">
                  <div class="hit-btn d-flex flex-row align-items-center ml-1 mr-3">
                    <i class="far fa-eye mb-0"></i>
                    <small class="text-center custom-width">{{ article.hit }}</small>
                  </div>
                  <div class="like-btn d-flex flex-row align-items-center">
                    <i class="fas fa-heart mb-0"></i>
                    <small class="text-center custom-width">{{ article.like_users.length }}</small>
                  </div>
                </div>
              </div>

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
        filterName: null,
        keyword: null
      },
      selectedFilter: null
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
    selectFilter(filterName) {
      this.searchData.filterName = filterName
      this.selectedFilter = filterName
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
      } else if (this.boardName === 'code') {
        return {
          title: '코드 게시판',
          description: '작성한 코드를 공유하고 이야기를 나눠 보세요 :)'
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
    this.selectFilter('제목')
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchArticles(to.params.board_name)
    this.boardName = to.params.board_name
    this.searchData.boardName = to.params.board_name
    this.selectFilter('제목')
    this.searchData.keyword = null
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
  color:#4aa5ff;
  /* color: white; */
}

.like-btn {
  color:#ff5252;
  /* color: white; */
}

.article-title {
  overflow: hidden;
  white-space: normal;
  word-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
  text-align: start;
}

.custom-width {
  min-width: 2rem;
}

.custom-height {
  min-height: 75.2px;
}

</style>