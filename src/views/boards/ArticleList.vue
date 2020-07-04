<template>
  <div>
    <h1 v-if="boardName=='ssafy'">싸피 게시판</h1>
    <h1 v-else-if="boardName=='free'">자유 게시판</h1>
    <router-link :to="{ name: 'ArticleCreate', params: { board_name: boardName} }">
      <button type="button" class="btn btn-primary">새 글쓰기</button>
    </router-link>
    <div>
      <table class="table mb-5" v-if="articles">
        <thead>
          <tr>
            <!-- <th scope="col">#</th> -->
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
      </table>
      <div class="btn-cover" v-if="paginatedData">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">이전</button>
        <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
        <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">다음</button>
      </div>
      <div v-else class="mt-5 text-center">
        <h3> 게시판에 글을 작성해주세요. </h3>
      </div>
    </div>

  </div>
</template>

<script>
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
  },
  computed: {
    ...mapState(['articles']),
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

</style>