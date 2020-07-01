<template>
  <v-app>
    <v-card
      :loading="isUpdating"
    >
      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="name"
                :disabled="isUpdating"
                color="blue-grey lighten-2"
                label="팀명"
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
              md="6"
            >
              <v-text-field
                v-model="name"
                :disabled="isUpdating"
                color="blue-grey lighten-2"
                label="팀장"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="title"
                :disabled="isUpdating"
                color="blue-grey lighten-2"
                label="팀 한 줄 설명"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                :disabled="isUpdating"
                color="blue-grey lighten-2"
                label="팀 설명"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
                chips
                color="blue-grey lighten-2"
                label="팀원"
                item-text="name"
                item-value="name"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.avatar"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <!-- interests -->
            <v-col cols="12">
              <v-autocomplete
                v-model="interest"
                :disabled="isUpdating"
                :items="interests"
                chips
                color="blue-grey lighten-2"
                label="관심 분야"
                item-text="interest"
                item-value="interest"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="removeInterest(data.item)"
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
            <!-- front-languages -->
            <!-- <v-col cols="12">
              <v-autocomplete
                v-model="interest"
                :disabled="isUpdating"
                :items="interests"
                chips
                color="blue-grey lighten-2"
                label="관심 분야"
                item-text="interest"
                item-value="interest"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="removeInterest(data.item)"
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
                      <v-list-item-title v-html="data.item.interest"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col> -->
            <!-- back language -->
          </v-row>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-switch
          v-model="autoUpdate"
          :disabled="isUpdating"
          class="mt-0"
          color="green lighten-2"
          hide-details
          label="Auto Update"
        ></v-switch>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="autoUpdate"
          :loading="isUpdating"
          color="blue-grey darken-3"
          depressed
          @click="isUpdating = true"
        >
          <v-icon left>mdi-update</v-icon>
          Update Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'test',
  data () {
    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    }

    return {
      interest: [],
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'Midnight Crew',
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
      title: 'The summer breeze',
    }
  },
  computed: {
    ...mapState(['interests'])
  },

  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
  },

  methods: {
    ...mapActions(['fetchInterests']),
    remove (item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },
    removeInterest (item) {
      const index = this.interest.indexOf(item.interest)
      if (index >= 0) this.interest.splice(index, 1)
    },
  },

  created() {
    this.fetchInterests()
    console.log(this.interests)
  }
}
</script>
<style scoped>
/* .v-label {
  left: -10px;
} */
</style>