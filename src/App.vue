<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>
import store from './store'

import landingPage from './components/LandingPage.vue'
import fileUpload from './components/fileUpload.vue'
import allCakes from './components/allCakes.vue'

export default {
  name: 'App',
  components: {
    store,
    landingPage,
    fileUpload,
    allCakes
  },
  created () {
    this.$store.dispatch('loadCakes')
  } 
}
</script>

<style>
html {
  background-color: rgba(0, 0, 0, 0.02);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1,h2 {
  font-weight: 900;
  font-style: italic;
  font-size: 2.6rem;
  letter-spacing: -2;
  line-height: 3rem;
  color: midnightblue;
}
h2 {
  font-size: 2.4rem;
}
h3 {
  margin: 20px 0 0;
  color: rgba(0, 0, 0, 0.6)
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.error {
  color: red;
}
.full-page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 100vh; */
  /* background-color: rgba(0, 0, 0, 0.15) */
}
</style>
