<template>
  <div class="container">
    <h3>{{ team.name }} </h3>
    <p>현재 팀원 {{ team.current_members }}명 / {{ team.residence }} / Since {{ team.created_at.slice(0,10) }}</p>
    {{ team }}
    <router-link :to="{ name: 'CollectTeamCreate', params: {teamId: team.id} }" class="btn btn-secondary">모집 공고 만들기</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TeamDetail',
  computed: {
    ...mapState(['team'])
  },
  methods: {
    ...mapActions(['getTeam'])
  },
  created() {
    this.getTeam(this.$route.params['teamId'])
  }
}
</script>

<style>

</style>