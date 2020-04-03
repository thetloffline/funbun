// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import fixedCover from './components/FixedCoverComponent.vue'
import landingPage from './components/LandingPageComponent.vue'
import fileUpload from './components/FileUploadComponent.vue'
import allCakes from './components/AllCakesComponent.vue'

Vue.config.productionTip = false
Vue.mixin({
  methods: {
    focusInput () {
      const inputs = document.querySelectorAll('.input')
      setTimeout(() => {
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].value.length === 0) {
            inputs[i].focus()
            this.startedSelecting = false
            return
          }
        }
      }, 100)
    }
  }
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('address', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.replace(' ', '+')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    fixedCover,
    landingPage,
    fileUpload,
    allCakes
  },
  template: '<App/>',

  created () {
    this.$store.dispatch('loadCakes')
  }
})
