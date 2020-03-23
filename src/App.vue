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
button {
  border-style: none;
  border-radius: 3rem;
  padding: 15px;
  color: white;
  font-size: 21px;
  font-weight: 500;
  transition: .1s all;
  cursor: pointer;
  outline: none;
}
.btn-container {
  display: flex;
  margin: 10px 0px 10px 0px;
}
.btn-form {
  width: 100%;
}
.btn-primary {
  background-image: linear-gradient(to right, #39dc7a , #20dc87);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
.btn-primary:hover {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.btn-primary:active {
  background-image: linear-gradient(to right, #42dd80 , #24e68f);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
}
.btn-transparent {
  background-color: rgba(0, 0, 0, 0);
  color: midnightblue;
}
.btn-transparent:active {
outline: none;
}
.btn-transparent:hover {
  background-color: rgba(0, 0, 0, .01);
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
