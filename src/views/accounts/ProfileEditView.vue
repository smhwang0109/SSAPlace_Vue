<template>
  <v-app>
    <v-card>
      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        height="125"
        src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
      >
        <v-row>
          <v-row
            class="pa-4"
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <h3 class="headline text-light">프로필</h3>
              <span class="grey--text text--lighten-1">본인을 소개해주세요!</span>
            </v-col>
          </v-row>
        </v-row>
      </v-img>
       <v-form
        v-model="valid"
      >
      <v-container>
        <v-row>
          <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.name"
                color="blue-grey lighten-2"
                label="이름"
              ></v-text-field>
            </v-col>
          <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.residence"
                color="blue-grey lighten-2"
                label="거주지"
              ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="profileData.description"
                color="blue-grey lighten-2"
                label="자기소개"
              ></v-textarea>
          </v-col>
          <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.github"
                color="blue-grey lighten-2"
                label="Github 주소"
              ></v-text-field>
          </v-col>
          <v-col
            cols="6"
          >
            <v-text-field
              v-model="profileData.website"
              color="blue-grey lighten-2"
              label="Website 주소"
            ></v-text-field>
          </v-col>
           <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.instagram"
                color="blue-grey lighten-2"
                label="Instagram 주소"
              ></v-text-field>
          </v-col>
          <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.facebook"
                color="blue-grey lighten-2"
                label="Facebook 주소"
              ></v-text-field>
          </v-col>
           <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.linkedin"
                color="blue-grey lighten-2"
                label="Linkedin 주소"
              ></v-text-field>
          </v-col>
          <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.emaie"
                color="blue-grey lighten-2"
                label="이메일 주소"
              ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            class="text-light"
            color="blue-grey darken-3"
            @click="editProfile"
          >
            프로필 수정
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import router from '@/router'
import SERVER from '@/api/drf'
export default {
  name: 'ProfileEdit',
  data() {
    return {
      profileData: {
        name: null,
        residence: null,
        email: null,
        github: null,
        facebook: null,
        instagram: null,
        homepage: null,
        self_introduction: null,
        interests: null,
        front_language: null,
        back_language: null
        
      }
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  methods: {
    editProfile() {
      // this.teamData.currentMembers = this.teamData.members.length
      axios.put(SERVER.URL + SERVER.ROUTES.userList + this.$route.params.user_id+ '/edit/', this.profileData, this.config)
        .then(() => {
          router.push({ name: 'Profile', params: {user_id: this.$route.params.user_id}})
        })
        .catch(err => console.log(err.response.data))
    },
  }
}
</script>

<style>

</style>