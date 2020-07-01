<template>
  <div class="container my-3">
    <h1>새 글 작성 Test</h1>
    <hr>
    <div class="title">
      <input v-model="article.title" id="title" class="w-100" type="text" placeholder="제목을 입력해주세요 :)">
    </div>
    <div class="editor-page my-3">
      <div id="summernote"></div>
    </div>
    <button type="button" class="btn btn-primary" @click="save">Save</button>
    <hr>

    <h5 class="text-center">저장된 게시물은 detail 페이지에서 아래와 같이 보여질 겁니당</h5>
    <hr>
    <div class="border rounded p-3">
      <h1 class="text-center my-2">{{ article.title }}</h1>
      <hr>
      <div class="px-5" v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCreate',
  data() {
    return {
      article: {
        title: null,
        content: null
      }
    }
  },
  methods: {
    save() {
      // 실제로는 데이터를 저장하는 로직으로 연결됨
      this.article.content = window.$('#summernote').summernote('code')
    }
  },
  mounted() {
    window.$('#summernote').summernote({
      placeholder: '내용을 작성해주세요 :)',
      height: 300,
    });
  }
}
</script>

<style>
</style>