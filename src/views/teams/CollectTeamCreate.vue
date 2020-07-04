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
              <h3 class="headline text-light">모집 공고 만들기!</h3>
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
                v-model="collectTeamData.title"
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="제목"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="collectTeamData.oneline_description"
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="간단 소개"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="collectTeamData.description"
                color="blue-grey lighten-2"
                :rules="[v => !!v || '필수항목입니다.']"
                label="모집 내용"
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="collectTeamData.contact"
                color="blue-grey lighten-2"
                type="number"
                counter="11"
                :rules="[
                  v => !!v || '필수항목입니다.',
                  v => !!v && v.length > 10 || '너무 짧습니다.',
                  v => !!v && v.length <= 11 || '잘못된 입력입니다.']"
                label="연락처 ('-'을 빼고 입력해주세요.)"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="collectTeamData.collect_count"
                color="blue-grey lighten-2"
                type="number"
                :rules="[
                  v => !!v || '필수항목입니다.',
                  v => !!v && v > 0 && v < 6 || '1 이상 6이하로 입력해주세요!']"
                label="모집 인원"
              ></v-text-field>
            </v-col>
          </v-row>
          <div
            v-for="collect_member in collectMemberList.slice(0, Number(collectTeamData.collect_count))"
            :key="collect_member.id"
          >
            <v-divider></v-divider>
            <v-row>
              <!-- role -->
              <v-col cols="12">
                <v-autocomplete
                  v-model="collectTeamData.back_language"
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
                      @click:close="remove(collectTeamData.back_language, data.item)"
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
              <!-- use_language -->
              <v-col cols="12">
                <v-autocomplete
                  v-model="collect_member.use_language"
                  v-if="languages"
                  :items="languages"
                  chips
                  hide-selected                
                  color="blue-grey lighten-2"
                  :rules="[v => !!v || '필수항목입니다.']"
                  label="사용 언어"
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
                      @click:close="remove(collectMemberData.use_language, data.item)"
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
              <v-col
                cols="12"
                md="12"
                class="d-flex justify-content-around"
              >
                <div>
                  <input v-model="collect_member.major" type="radio" id="전공자" name="major" value="전공자" class="mr-2">
                  <label for="전공자">전공자</label>
                </div>
                <div>
                  <input v-model="collect_member.major" type="radio" id="비전공자" name="major" value="비전공자" class="mr-2">
                  <label for="비전공자">비전공자</label>
                </div>
                <div>
                  <input v-model="collect_member.major" type="radio" id="무관" name="major" value="무관" class="mr-2" checked>
                  <label for="무관">무관</label>
                </div>
              </v-col>
            </v-row>
          </div>
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
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'
import router from '@/router'
import SERVER from '@/api/drf'

export default {
  name: 'CollectTeamCreate',
  data () {
    return {
      collectTeamData: {
        title: null,
        oneline_description: null,
        description: null,
        contact: null,
        open: true,
        collect_count: null,
      },
      collectMemberData0: {
        id: 0,
        role: null,
        use_language: null,
        major: null,
        preferential: null,
      },
       collectMemberData1: {
        id: 1,
        role: null,
        use_language: null,
        major: null,
        preferential: null,
      },
       collectMemberData2: {
        id: 2,
        role: null,
        use_language: null,
        major: null,
        preferential: null,
      },
       collectMemberData3: {
        id: 3,
        role: null,
        use_language: null,
        major: null,
        preferential: null,
      },
       collectMemberData4: {
        id: 4,
        role: null,
        use_language: null,
        major: null,
        preferential: null,
      },
      leader: null,
      valid: true,
      lazy: false,
      searchBack: null,
    }
  },
  computed: {
    ...mapState(['myaccount', 'team', 'languages']),
    ...mapGetters(['config']),
    collectMemberList() {
      return [this.collectMemberData0, this.collectMemberData1, this.collectMemberData2, this.collectMemberData3, this.collectMemberData4]
    },
  },

  methods: {
    remove (data, item) {
      const index = data.indexOf(item.id)
      if (index >= 0) data.splice(index, 1)
    },
    isBackNull() {
      this.$nextTick(() => {
        this.searchBack = null
      })
    },
    createTeam() {
      this.collectTeamData.current_members = this.collectTeamData.members.length
      axios.post(SERVER.URL + SERVER.ROUTES.teamList, this.collectTeamData, this.config)
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
  },
  updated() {
  }
}
</script>
<style scoped>
/* .v-label {
  left: -10px;
} */
</style>