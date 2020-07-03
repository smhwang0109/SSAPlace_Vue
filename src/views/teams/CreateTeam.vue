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
              <h3 class="headline text-light">팀 만들기!</h3>
              <span class="grey--text text--lighten-1">멋진 팀을 소개해주세요!</span>
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
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="teamData.name"
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="팀명"
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
              md="6"
            >
              <v-text-field
                v-if="leader"
                v-model="leader.username"
                disabled
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="팀장"
              ></v-text-field>
              <v-text-field
                v-else
                v-model="leader"
                disabled
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="팀장"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="teamData.oneline_description"
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="한 줄 설명"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="teamData.description"
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="팀 설명"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="teamData.members"
                :items="users"
                chips
                hide-selected
                dense
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="팀원 (팀장 포함)"
                item-text="username"
                item-value="id"
                multiple
                :search-input.sync="searchMember"
                @change="isMemberNull()"
                @keypress.enter="isMemberNull()"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(teamData.members, data.item)"
                  >
                    <!-- <v-avatar left>
                      <v-img :src="data.item.avatar"></v-img>
                    </v-avatar> -->
                    {{ data.item.username }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <!-- <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar> -->
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.username"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <!-- interests -->
            <v-col cols="12">
              <v-autocomplete
                v-model="teamData.interests"
                v-if="interests"
                :items="interests"
                chips
                hide-selected
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="관심 분야 (정해진 분야가 없으면 '미정'을 입력해주세요!)"
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
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="teamData.residence"
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="주 모임지역"
              ></v-text-field>
            </v-col>
            <!-- front-languages -->
            <v-col cols="12">
              <v-autocomplete
                v-model="teamData.front_language"
                v-if="languages"
                :items="languages"
                chips
                hide-selected
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="Front-end 사용 언어"
                item-text="language"
                item-value="id"
                multiple
                :search-input.sync="searchFront"
                @change="isFrontNull()"
                @keypress.enter="isFrontNull()"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(teamData.front_language, data.item)"
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
            <!-- back language -->
            <v-col cols="12">
              <v-autocomplete
                v-model="teamData.back_language"
                v-if="languages"
                :items="languages"
                chips
                hide-selected                
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="Back-end 사용 언어"
                item-text="language"
                item-value="id"
                multiple
                :search-input.sync="searchBack"
                @change="isBackNull()"
                @keypress.enter="isBackNull()"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(teamData.back_language, data.item)"
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
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            class="text-light"
            color="blue-grey darken-3"
            @click="createTeam"
          >
            팀 생성
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
  name: 'CreateTeam',
  data () {
    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    }

    return {
      teamData: {
        name: null,
        oneline_description: null,
        description: null,
        members: [],
        interests: null,
        currentMembers: null,
        residence: null,
        front_language: null,
        back_language: null
      },
      leader: null,
      valid: true,
      lazy: false,
      searchMember: null,
      searchInterest: null,
      searchFront: null,
      searchBack: null,
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
      ],
    }
  },
  computed: {
    ...mapState(['myaccount', 'users', 'interests', 'languages']),
    ...mapGetters(['config'])
  },

  methods: {
    ...mapActions(['fetchUsers', 'fetchInterests', 'fetchLanguages']),
    remove (data, item) {
      const index = data.indexOf(item.id)
      if (index >= 0) data.splice(index, 1)
    },
    isMemberNull() {
      this.$nextTick(() => {
        this.searchMember = null
      })
    },
    isInterestNull() {
      this.$nextTick(() => {
        this.searchInterest = null
      })
    },
    isFrontNull() {
      this.$nextTick(() => {
        this.searchFront = null
      })
    },
    isBackNull() {
      this.$nextTick(() => {
        this.searchBack = null
      })
    },
    createTeam() {
      this.teamData.currentMembers = this.teamData.members.length
      axios.post(SERVER.URL + SERVER.ROUTES.teamList, this.teamData, this.config)
        .then(() => {
          router.push({ name: 'Home'})
        })
        .catch(err => console.log(err.response.data))
    },
    validate() {
      this.$refs.form.validate()
    },
  },

  created() {
    if (!this.users) {
      this.fetchUsers()
    }
    if (!this.interests) {
      this.fetchInterests()
    }
    if (!this.languages) {
      this.fetchLanguages()
    }
    if (this.myaccount) {
      this.$nextTick(() => {
        this.leader = this.myaccount
      })
    }
  },
  updated() {
    if (this.myaccount) {
      if (!this.leader) {
        this.leader = this.myaccount
      }
      if (!this.teamData.members.length) {
        this.teamData.members.push(this.myaccount.id)
      }
    }
  }
}
</script>
<style scoped>
/* .v-label {
  left: -10px;
} */
</style>