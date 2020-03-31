import Vue from 'vue'
import Router from 'vue-router'
import landingPage from '@/components/LandingPageComponent'
import fileUpload from '@/components/FileUploadComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: landingPage
    },
    {
      path: '/tere',
      name: 'fileUpload',
      component: fileUpload
    }
  ]
})
