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
                    v-model="messageGroupData.to_user_id"
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
              </div>
              <div class="modal-footer">
                <button @click="checkMessageGroup(messageGroupData)" class="btn btn-secondary" data-dismiss="modal">확인</button>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="d-flex flex-column justify-content-center align-items-center customcard" v-if="messageGroups">
          <div @click="selectUser(messageGroup.id)" class="user-profile border-bottom d-flex justify-content-center align-items-center col-12 py-3" v-for="messageGroup in messageGroups" :key="messageGroup.id">
            <!-- <img class="img-fluid rounded-circle mr-3 border user-image" src="@/assets/anonymoususer.png" :alt="`${messageGroup.username} profile`"> -->
            <h5 class="m-0">{{ messageGroup.username }}</h5>
          </div>
        </div>
        <button @click="checkMessageGroup(messageGroupData)" class="btn btn-primary">생성</button>
      </div>
      <div class="col-7 border rounded" style="height: 100vh">
        <h3>쪽지 내용</h3>
        <hr>
        <MessageContent :toUserId="messageGroupData.to_user_id"/>
      </div>
    </div>

  </div>
</template>

<script>
import MessageContent from '@/components/MessageContent'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Message',
  components: {
    MessageContent,
  },
  data() {
    return {
      messageGroupData: {
        to_user_id : null,
      },
      searchUser: null,
    }
  },
  computed: {
    ...mapState(['messageGroups', 'users', 'toUserId']),
  },
  methods: {
    ...mapActions(['fetchMessageGroups', 'createMessageGroup']),
    isUserNull() {
      this.$nextTick(() => {
        this.searchUser = null
      })
    },
    selectUser(userId) {
      this.messageGroupData.to_user_id = userId
      this.$store.commit('SET_TO_USER_ID', userId)
    },
    checkMessageGroup(messageGroupData) {
      for (const key in this.messageGroup){
        if (messageGroupData.to_user_id === this.messageGroup[key]['from_user']['id'] || messageGroupData.to_user_id === this.messageGroup[key]['to_user']['id']) {
          console.log('같다')
        }
      }

    }
  },
  created() {
    this.fetchMessageGroups()
  }
  

}
</script>

<style>
.v-application--wrap {
  flex: 1 1 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0 !important; 
  max-width: 100%;
  position: relative;
}
</style>

<style scoped>
.user-profile:hover {
  cursor: pointer;
}

.customcard {
  position: relative;
  display: flex;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  padding: 0.5rem;
}

</style>