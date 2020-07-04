<template>
  <div>
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