import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import vuetify from './plugins/vuetify'
// import io from 'socket.io-client'
// import SERVER from '@/api/drf'

// const socket = io(SERVER.URL + '/chat/');

// Vue.prototype.$socket = socket;

// Vue.config.productionTip = false

Vue.use(VueCookies)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
