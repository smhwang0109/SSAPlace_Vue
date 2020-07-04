<template>
  <div>
    <h3>함께할 프로젝트 팀을 찾아볼까요?</h3>
    <div class="card-deck">
      <div class="card" v-for="team in collecteams" :key="team.id">
        <img src="https://picsum.photos/seed/picsum/400/120" class="card-img-top" alt="image" >
        <div class="card-body">
          <h5 class="card-title">금융 핀테크 웹사이트 개발</h5>
          <span>by 올핀</span>
          <p></p>
          <h5 class="card-subtitle">프론트엔드 개발</h5>
          <p class="card-text">모바일 플랫폼/초기 개발 단계/ 현재 구성원 2명/ 서울특별시 전체/ ~2020.08.20</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <small class="text-muted">2시간 전</small>
          <i class="far fa-bookmark"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FindTeam',
  computed: {
    ...mapState(['collectTeams'])
  },
  methods: {
    ...mapActions(['fetchCollectTeams'])
  }
}
</script>

<style>

</style>