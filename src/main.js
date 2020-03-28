// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import landingPage from './components/LandingPage.vue'
import fileUpload from './components/fileUpload.vue'
import allCakes from './components/allCakes.vue'
Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App,
    landingPage,
    fileUpload,
    allCakes 
  },
  template: '<App/>',

  created () {
    this.$store.dispatch('loadCakes')
  } 
})
