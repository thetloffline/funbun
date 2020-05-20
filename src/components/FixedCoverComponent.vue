<template>
  <div>
    <div class="sticky sticky-cover"/>
    <div class="sticky overlay">
      <div class="flex">
        <div class="sticky-slogan">
          <h1>{{ msg }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedCoverComponent',
  data () {
    return {
      msg: 'All work and no fun makes Jack want to have some bun!'
    }
  }
}
</script>

<style scoped>
@media only screen and (min-width: 860px) {
  .flex {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .sticky {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 60vw;
    height: 100vh;
  }
  .overlay {
    background-color: rgba(170, 66, 167, 0.85);
    z-index: 10;
  }
  .sticky-cover {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
    -webkit-filter: brightness(120%); /* Safari 6.0 - 9.0 */
    filter: brightness(120%);
    -webkit-filter: saturate(0%); /* Safari 6.0 - 9.0 */
    filter: saturate(0%);
    background: url(./../assets/tuuletasku.jpg) no-repeat center center;
    background-size: cover;
  }
  .sticky-slogan {
    display: flex !important;
  }
  .sticky-slogan > h1 {
    font-size: 5rem;
    line-height: 4.6rem;
    margin: auto 5vw;
  }
}

/* END MEDIA QUERY */
.sticky-slogan {
  display: none;
}
</style>
