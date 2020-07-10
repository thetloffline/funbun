<template>
  <section>
    <fixedCover />
    <div class="content-center">
      <div class="sm-content">
        <div class="slogan">
          <h1>{{ msg }}</h1>
        </div>
      </div>

      <allCakes />
      <!-- <footer-comp /> -->
    </div>
  </section>
</template>

<script>
import fixedCover from './FixedCoverComponent.vue'
import allCakes from './AllCakesComponent.vue'
import fileUpload from './FileUploadComponent.vue'
import footerComp from './footerComponent.vue'

export default {
  name: 'LandingPageComponent',
  components: {
    fixedCover: fixedCover,
    allCakes: allCakes,
    fileUpload: fileUpload,
    footerComp: footerComp
  },
  data () {
    return {
      msg: 'The best. For You. By You.'
    }
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
  background-image: linear-gradient(#fe515c, deeppink);
  /* background-image: linear-gradient(#2828B8, #3E3EAD); */
  margin: -12px -8px 12px -8px;
  padding: 2rem 0;
}
.slogan {
  width: 250px;
  color: white;
}
</style>
