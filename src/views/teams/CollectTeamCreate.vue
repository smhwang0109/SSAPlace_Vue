<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
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
                @input="checkCollectCount"
                :rules="[
                  v => !!v || '필수항목입니다.',
                  v => !!v && v > 0 && v < 6 || '1 이상 5이하로 입력해주세요!']"
                label="모집 인원"
              ></v-text-field>
            </v-col>
          </v-row>
          <div
            v-for="collect_member in collectMemberList.slice(0, Number(collectTeamData.collect_count))"
            :key="collect_member.identy"
          >
            <v-divider></v-divider>
            <v-row>
              <v-col
                cols="12"
                md="12"
                class="d-flex justify-content-start"
              >
              <h5 class="font-weight-bold">
                팀원 {{ collect_member.identy + 1 }}
              </h5>
              </v-col>
              <!-- role -->
              <v-col
                cols="12"
                md="12"
                class="v-label theme--light d-flex justify-content-start"
              >
              역할
              </v-col>
              <v-col
                cols="12"
                md="12"
                class="d-flex justify-content-around"
                :rules="[v => !!v || '필수항목입니다.']"
              >
                <div>
                  <input v-model="collect_member.role" type="radio" :id="`role-${collect_member.identy}-Front-end`" :name="`role-${collect_member.identy}`" value="Front-end" class="mr-2">
                  <label :for="`role-${collect_member.identy}-Front-end`">Front-end</label>
                </div>
                <div>
                  <input v-model="collect_member.role" type="radio" :id="`role-${collect_member.identy}-Back-end`" :name="`role-${collect_member.identy}`" value="Back-end" class="mr-2">
                  <label :for="`role-${collect_member.identy}-Back-end`">Back-end</label>
                </div>
                <div>
                  <input v-model="collect_member.role" type="radio" :id="`role-${collect_member.identy}-Full-stack`" :name="`role-${collect_member.identy}`" value="Full-stack" class="mr-2">
                  <label :for="`role-${collect_member.identy}-Full-stack`">Full-stack</label>
                </div>
                <div>
                  <input v-model="collect_member.role" type="radio" :id="`role-${collect_member.identy}-Full-stack`" :name="`role-${collect_member.identy}`" value="무관" class="mr-2" checked>
                  <label :for="`role-${collect_member.identy}-Full-stack`">무관</label>
                </div>
              </v-col>
              <!-- major -->
              <v-col
                cols="12"
                md="12"
                class="v-label theme--light d-flex justify-content-start"
              >
              전공 여부
              </v-col>
              <v-col
                cols="12"
                md="12"
                class="d-flex justify-content-around"
              >
                <div>
                  <input v-model="collect_member.major" type="radio" :id="`major-${collect_member.identy}-전공자`" :name="`major-${collect_member.identy}`" value="전공자" class="mr-2">
                  <label :for="`major-${collect_member.identy}-전공자`">전공자</label>
                </div>
                <div>
                  <input v-model="collect_member.major" type="radio" :id="`major-${collect_member.identy}-비전공자`" :name="`major-${collect_member.identy}`" value="비전공자" class="mr-2">
                  <label :for="`major-${collect_member.identy}-비전공자`">비전공자</label>
                </div>
                <div>
                  <input v-model="collect_member.major" type="radio" :id="`major-${collect_member.identy}-무관`" :name="`major-${collect_member.identy}`" value="무관" class="mr-2" checked>
                  <label :for="`major-${collect_member.identy}-무관`">무관</label>
                </div>
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
                      @click:close="remove(collect_member.use_language, data.item)"
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
              >
                <v-textarea
                  v-model="collect_member.preferential"
                  color="blue-grey lighten-2"
                  label="우대 사항"
                  placeholder="우대 사항이 없으시면 공란으로 두셔도 됩니다."
                ></v-textarea>
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
            @click="createCollectTeam"
          >
            모집 생성
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
        identy: 0,
        role: "무관",
        use_language: null,
        major: "무관",
        preferential: null,
      },
      collectMemberData1: {
        identy: 1,
        role: "무관",
        use_language: null,
        major: "무관",
        preferential: null,
      },
      collectMemberData2: {
        identy: 2,
        role: "무관",
        use_language: null,
        major: "무관",
        preferential: null,
      },
      collectMemberData3: {
        identy: 3,
        role: "무관",
        use_language: null,
        major: "무관",
        preferential: null,
      },
      collectMemberData4: {
        identy: 4,
        role: "무관",
        use_language: null,
        major: "무관",
        preferential: null,
      },
      leader: null,
      valid: true,
      lazy: false,
      searchLanguage: null,
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
    isLanguageNull() {
      this.$nextTick(() => {
        this.searchLanguage = null
      })
    },
    checkCollectCount() {
      if (Number(this.collectTeamData.collect_count) > 5) {
        this.collectTeamData.collect_count = 5
      }
      else if (Number(this.collectTeamData.collect_count) < 1) {
        this.collectTeamData.collect_count = 0
      }
    },
    createCollectTeam() {
      let collectTeamList = []
      collectTeamList.push(this.collectTeamData)
      collectTeamList = collectTeamList.concat(this.collectMemberList.slice(0, Number(this.collectTeamData.collect_count)))
      axios.post(SERVER.URL + `/teams/${this.$route.params['teamId']}/collect/`, collectTeamList, this.config)
        .then(() => {
          router.push({ name: 'TeamDetail'})
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