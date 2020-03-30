<template>
  <section class='full-page-container'>
    <div class='content-center'>
      <div class='content'>
        <div class='poster'>
          <h1>{{msg}}</h1>
        </div>
      </div>
        <fileUpload/>
        <allCakes/>
    </div>
  </section>
</template>

<script>
import allCakes from './allCakes.vue'
import fileUpload from './fileUpload.vue'

export default {
  name: 'LandingPage',
  data () {
    return {
      msg: 'All work and no fun makes Jack want to have some bun!'
    }
  },
  components: {
    'allCakes': allCakes,
    'fileUpload': fileUpload
  }
}
</script>

<style scoped>

.content-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content {
  margin: 8.3vh auto 18.3vh;
}
.poster {
  width: 300px;
}
.arrow {
  background: url(./../assets/arrow.svg) no-repeat center center ;
  background-size: 30px;
  height: 60px;
}
</style>
