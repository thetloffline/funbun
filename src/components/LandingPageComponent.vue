<template>
  <section>
    <fixedCover />
    <div class="content-center">
      <div class="sm-content">
        <div class="slogan">
          <h1>{{msg}}</h1>
        </div>
      </div>
      <fileUpload />
      <allCakes />
    </div>
  </section>
</template>

<script>
import allCakes from './AllCakesComponent.vue'
import fileUpload from './FileUploadComponent.vue'
import fixedCover from './FixedCoverComponent.vue'

export default {
  name: 'LandingPageComponent',
  data () {
    return {
      msg: 'All work and no fun makes Jack want to have some bun!'
    }
  },
  components: {
    fixedCover: fixedCover,
    allCakes: allCakes,
    fileUpload: fileUpload
  }
}
</script>

<style scoped>
@media only screen and (min-width: 860px) {
  .content-center {
    margin-left: 60vw;
  }
  .sm-content {
    display: none !important;
  }
}
/* END MEDIA QUERY */

.sm-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
}
.slogan {
  width: 250px;
}
</style>
