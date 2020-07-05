<template>
  <v-app>
    <!-- <div class="d-flex justify-content-between">
      <h3 class="mb-0">{{ revisedBoardName }}</h3>
      <div>
        <label for="searchbar"><h5 class="mb-0"><i class="fas fa-search"></i></h5></label>
        <input id="searchbar" class="border rounded ml-2 mr-3 h-100" type="text">
        <router-link :to="{ name: 'ArticleCreate', params: { board_name: boardName} }">
          <button type="button" class="btn btn-primary">새 글쓰기</button>
        </router-link>
      </div>
    </div> -->
    <!-- <hr> -->
    <!-- <v-row v-if="articles" align="center py-0"> -->
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
          <div class="col-6">
            <div class="d-flex justify-content-start align-items-center">
              <label for="searchbar"><h4 class="mb-0"><i class="fas fa-search mb-0"></i></h4></label>
              <input type="text" class="form-control ml-2 rounded border w-100" id="searchbar">
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex justify-content-end align-items-center">
              <router-link :to="{ name: 'ArticleCreate', params: { board_name: boardName} }">
                <button type="button" class="btn btn-primary">새 글쓰기</button>
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
              <div class="col-6 d-flex flex-column justify-content-center align-items-start">
                <h4>{{ article.title }}</h4>
                <div>
                  <span class="text-secondary mr-2">#tag1</span>
                  <span class="text-secondary mr-2">#tag2</span>
                  <span class="text-secondary mr-2">#tag3</span>
                  <span class="text-secondary mr-2">#tag4</span>
                  <span class="text-secondary mr-2">#tag5</span>
                </div>
              </div>
              <div class="offset-2 col-4 d-flex justify-content-around align-items-center">
                <h5 class="mb-0"><span class="badge badge-secondary mb-0">{{ article.author.username }}</span></h5>
                <h5 class="mb-0"><span class="badge badge-light mb-0">{{ article.created_at }}</span></h5>
                <h5 class="mb-0"><span class="badge badge-primary mb-0">{{ article.hit }}</span></h5>
              </div>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    <!-- </v-row> -->
    <div>
      <!-- <table class="table mb-5" v-if="articles">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Username</th>
            <th scope="col">Hit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in paginatedData" :key="`article_${article.id}`">
            <td data-label="Title"><router-link :to="{ name: 'ArticleDetail', params: { article_id: article.id, board_name: boardName }}">{{ article.title }}</router-link></td>
            <td data-label="Author">{{ article.author.username }}</td>
            <td data-label="Hit">{{ article.hit }}</td>
          </tr>
        </tbody>
      </table> -->
      <div class="btn-cover" v-if="paginatedData">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">이전</button>
        <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
        <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">다음</button>
      </div>
      <!-- <div v-else class="mt-5 text-center">
        <h3> 게시판에 글을 작성해주세요. </h3>
      </div> -->
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
    }
  },
  methods: {
    ...mapActions(['fetchArticles']),
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

button {
  background-color:#3596F4;
  outline: transparent;
  color: white;
  border: transparent;
  border-radius: 5px;
}

button:hover{
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

</style>