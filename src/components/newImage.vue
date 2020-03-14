<template>
  <div class='img-preview'>
    <input type='file' @change='onFileChange' />
    <div id='preview'>
      <img v-if='url' :src='url' />
    </div>
  </div>
</template>

<script>
export default {
  name: 'newImage',
  data () {
    return {
      url: null
    }
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
    }
  }
}
</script>

<style scoped>
body {
  background-color: #e2e2e2;
}

#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
