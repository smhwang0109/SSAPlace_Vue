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
        :lazy-validation="lazy"
      >
      <v-container>
        <v-row>
          <v-col class="text-right" cols="12">
            <small class="text-muted">*은 필수항목입니다.</small>
          </v-col>
          <v-col
              cols="6"
              :rules="[v => !!v || '필수항목입니다.']"
            >
              <v-text-field
                v-model="profileData.name"
                color="blue-grey lighten-2"
                label="이름 *"
              ></v-text-field>
            </v-col>
          <v-col
              cols="6"
            >
              <v-text-field
                v-model="profileData.location"
                color="blue-grey lighten-2"
                label="거주지"
              ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="profileData.self_introduction"
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
              v-model="profileData.homepage"
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
                v-model="profileData.email"
                color="blue-grey lighten-2"
                label="이메일 주소"
              ></v-text-field>
          </v-col>
          <!-- interests -->
          <v-col cols="12">
            <v-autocomplete
              v-model="profileData.interests"
              v-if="interests"
              :items="interests"
              chips
              hide-selected
              color="blue-grey lighten-2"
              :rules="[v => !!v || '필수항목입니다.']"
              label="관심 분야 (정해진 분야가 없으면 '미정'을 입력해주세요!) *"
              item-text="interest"
              item-value="id"
              multiple
              :search-input.sync="searchInterest"
              @change="isInterestNull()"
              @keypress.enter="isInterestNull()"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(teamData.interests, data.item)"
                >
                  {{ data.item.interest }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-text="data.item.interest"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <!-- languages -->
          <v-col cols="12">
            <v-autocomplete
              v-model="profileData.languages"
              v-if="languages"
              :items="languages"
              chips
              hide-selected
              color="blue-grey lighten-2"
              :rules="[v => !!v || '필수항목입니다.']"
              label="사용 언어 *"
              item-text="language"
              item-value="id"
              multiple
              :search-input.sync="searchLanguage"
              @change="isLanguageNull()"
              @keypress.enter="isLanguageNull()"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(teamData.language, data.item)"
                >
                  {{ data.item.language }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-text="data.item.language"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import router from '@/router'
import SERVER from '@/api/drf'

export default {
  name: 'ProfileEdit',
  data() {
    return {
      profileData: {
        name: null,
        location: null,
        homepage: null,
        linkedin: null,
        email: null,
        github: null,
        facebook: null,
        instagram: null,
        self_introduction: null,
        interests: null,
        languages: null,
      },
      searchInterest: null,
      searchLanguage: null,
      valid: true,
      lazy: false,
      userId : this.$route.params.userId
    }
  },
  computed: {
    ...mapState(['myaccount', 'profile', 'interests', 'languages']),
    ...mapGetters(['config'])
  },
  methods: {
    ...mapActions(['getProfile']),
    editProfile() {
      axios.put(SERVER.URL + SERVER.ROUTES.userList + this.userId + '/', this.profileData, this.config)
        .then(() => {
          router.push({ name: 'Profile', params: {userId: this.userId}})
        })
        .catch(err => console.log(err.response.data))
    },
    remove (data, item) {
      const index = data.indexOf(item.id)
      if (index >= 0) data.splice(index, 1)
    },
    isInterestNull() {
      this.$nextTick(() => {
        this.searchInterest = null
      })
    },
    isLanguageNull() {
      this.$nextTick(() => {
        this.searchLanguage = null
      })
    },
  },
  created() {
    this.getProfile(this.userId)
  },
  mounted() {
    if (this.profile) {
      this.profileData.name = this.profile.name
      this.profileData.location = this.profile.location
      this.profileData.email = this.profile.email
      this.profileData.github = this.profile.github
      this.profileData.facebook = this.profile.facebook
      this.profileData.instagram = this.profile.instagram
      this.profileData.homepage = this.profile.homepage
      this.profileData.linkedin = this.profile.linkedin
      this.profileData.self_introduction = this.profile.self_introduction
      if (this.profile.interests.length) {
        this.profileData.interests = this.profile.interests
      }
      if (this.profile.languages.length) {
        this.profileData.languages = this.profile.languages
      }
    }
  }
}
</script>

<style>

</style>