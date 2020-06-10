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
import ProductCard from './components/ProductCardComponent.vue'
import SortButton from './components/SortButtonComponent.vue'
import ProductFormInline from './components/ProductFormInlineComponent.vue'

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

Vue.filter('formatDate', function (isoDate) {
  const date = new Date(isoDate)
  return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
})

Vue.filter('sortArray', function (array, sortParam, sortAsc) {
  const newArr = array.slice()
  if (newArr.length > 0) {
    const ascDesc = sortAsc.value ? -1 : 1
    const sortedArray = newArr.sort(
      (a, b) =>
        ascDesc *
        (Number(a[sortParam]) > Number(b[sortParam]) ? 1 : -1)
    )
    return sortedArray
  } else {
    return []
  }
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
    allCakes,
    ProductCard,
    SortButton,
    ProductFormInline
  },
  created () {
    this.$store.dispatch('loadShops')
    this.$store.dispatch('loadProducts')
    this.$store.dispatch('loadFeedback')
  },
  template: '<App/>'
})
