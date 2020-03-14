import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import fileUpload from '@/components/fileUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/tere',
      name: 'fileUpload',
      component: fileUpload
    }
  ]
})
