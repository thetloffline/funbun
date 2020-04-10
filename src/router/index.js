import Vue from 'vue'
import Router from 'vue-router'
import landingPage from '@/components/LandingPageComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: landingPage
    }
  ]
})
