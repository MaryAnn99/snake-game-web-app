import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

export const eventBus = new Vue({
  methods: {
    changeScore(score) {
      this.$emit('scoreWasUpdated', score);
    },
    updateRecordsTable(username) {
      this.$emit('recordsTableWasUpdated', username);
    }
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')