<template>
  <div class="container mt-3">
    <div class="header row mb-3">
      <div class="col-4">
        <img class="profile-image" src="../../assets/img_avatar2.png">
      </div>
      {{profile}}
      

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapState(['myaccount', 'teams', 'profile', 'users', 'interests', 'languages'])
  },
  methods: {
    ...mapActions(['getProfile', 'fetchTeams'])
  },
  created() {
    this.getProfile(this.$route.params['userId'])
    this.fetchTeams()
  }
}
</script>

<style scoped>
.container {
  text-align: left;
}

.profile-image {
  border-radius: 50%;
  max-width: 100%;
}

.sites:hover {
  cursor: pointer;
}

/* .card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: .5rem;
} */

.card {
  text-decoration: none;
  color: black;
  height: 380px;
  /* border-style:none; */
}

/* .card:hover {
  color:  #3596F4;
} */

.self-introduction {
  white-space: pre-wrap;
}

.btn {
  background-color: #3596F4;
  color: white;
}
</style>