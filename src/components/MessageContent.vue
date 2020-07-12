<template>
  <div>
    나온다.
    {{messages}}
    <hr>
    <input v-model="message" class="border" type="text"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MessageContent',
  props: {
    toUserId: Number,
  },
  data() {
    return {
      message: null,
    }
  },
  computed: {
    ...mapState(['myaccount', 'messages']),
  },
  methods: {
    ...mapActions(['fetchMessages']),
    sendMessage() {
      this.$socket.emit('chat', {
        message: this.message
      });

      this.message = null
    }
  },
  
  created() {
    this.fetchMessages(this.toUserId)
  }
  

}
</script>

<style>

</style>