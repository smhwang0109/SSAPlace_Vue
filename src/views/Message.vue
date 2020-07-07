<template>
  <div class="container">
    <div class="row">
      <div class="col-4 mr-3 border rounded" style="height: 100vh">
        <h3>쪽지함</h3>
        <!-- Button trigger modal -->
        <button class="btn btn-primary" data-toggle="modal" data-target="#searchUserModal">
          쪽지 보내기
        </button>

        <!-- Modal -->
        <div class="modal fade" id="searchUserModal" tabindex="-1" role="dialog" aria-labelledby="searchUserModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="searchUserModalLabel">user 검색</h5>
                <button class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <v-app style="height: 50px">
                  <v-autocomplete
                    style="height: 50px"
                    v-model="messageGroupData.to_user"
                    :items="users"
                    dense
                    color="blue-grey lighten-2"
                    item-text="username"
                    item-value="id"
                    :search-input.sync="searchUser"
                    @change="isUserNull()"
                    @keypress.enter="isUserNull()"
                  >
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                      </template>
                      <template v-else>
                        <v-list-item-content>
                          <v-list-item-title v-html="data.item.username"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-app>
                <div v-for="user in users" :key="`user-${user.id}`" class="select-user" @click="selectUser(user)">
                  {{ user.username }}
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal">확인</button>
              </div>
            </div>
          </div>
        </div>
        <hr>
        {{ messageGroup }}
        <button @click="createMessageGroup(messageGroupData)" class="btn btn-primary">생성</button>
      </div>
      <div class="col-7 border rounded" style="height: 100vh">
        <h3>쪽지 내용</h3>
        <hr>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Message',
  data() {
    return {
      messageGroupData: {
        to_user : null,
      },
      searchUser: null,
    }
  },
  computed: {
    ...mapState(['messageGroup', 'users']),
  },
  methods: {
    ...mapActions(['fetchMessageGroup', 'createMessageGroup']),
    isUserNull() {
      this.$nextTick(() => {
        this.searchUser = null
      })
    },
    selectUser(user) {
      this.messageGroupData.to_user = user
    }
  },
  created() {
    this.fetchMessageGroup()
  }
  

}
</script>

<style scoped>
.select-user:hover {
  cursor: pointer;
}
</style>