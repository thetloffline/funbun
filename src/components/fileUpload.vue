<template>
  <section class="full-page-container">
    <div class="content-center">
      <div class="add-bun">
      
      <transition name="fade" mode="out-in">
        <div v-if="!clickToShowContent" 
          class="form-bun" 
          key="addBuns">
            <h1 class="section-header">Nam-Nam Add a bun</h1>
            <div class="btn-round "
              v-on:click="showFormContent($event)">+
            </div>
        </div>

        <div v-else class="container" key="showBuns">
          <h1 class="section-header">Nam-Nam Add a bun</h1>
          <div class="upload-area card"
            v-on:click='addFiles()'>
            <div class="upload-text">Add a photo</div>
            <div class="btn-round">+</div>
          </div>

          <div>
            <input
              type='file'
              id='files'
              ref='fileInput'
              accept='.jpg, jpeg'
              v-on:change='handleFilesUpload()'
              name='files'/>
          </div>

          <transition name="fade">
            <div  class="file-listing" v-if="files">
              <span class="file-name">
                {{ files.name }}
              </span>
              <span class='remove-file'
                v-on:click='removeFile()'>
                Remove
              </span>
            </div>
          </transition>

          <autocomplete 
            :suggestions="getCafeNames" 
            v-model="cafeName"
            label="Name of the shop"
            :required="true"
            id="cafeName"
          />

          <autocomplete
            :suggestions="getCafeLocations" 
            v-model="location"
            label="Address of the shop"
            :required="true"
            id="location"
          />

          <autocomplete
            :suggestions="getCakeprices" 
            v-model="price"
            label="Price"
            :required="true"
            id="price"
          />

          <rangeSLider
            v-model="looks"
            label='The looks'
            :required='true'
            id='looks'/>
          
          <rangeSLider
            v-model="taste"
            label='The taste'
            :required='true'
            id='taste'/>
          
          <rangeSLider
            v-model="bun"
            label='The bun'
            :required='true'
            id='bun'/>

            <textArea
            v-model="comment"
            label='Comment'
            id='comment'
            />

          <div class="btn-container">
            <button class='btn-form btn-primary'
              v-on:click='submitFiles()'>
              Submit
            </button>
          </div>
          <div class="btn-container">
            <button class='btn-form btn-transparent'
              v-on:click='cancelForm($event)'>
              Cancel
            </button>
          </div>
        </div> 
      </transition>
        
      </div>
    </div>
  </section>
 
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'
import textAreaInputComponent from './textAreaInputComponent.vue'
import RangeSLiderComponent from './RangeSLiderComponent.vue'
import AutocompleteComponent from './AutocompleteComponent.vue'

export default {
  
  name: 'fileUpload',
  data () {
    return {
      files: '',
      imageFile: '',
      cafeName:  '',
      location: '',
      price: '',
      comment: '',
      looks: 50,
      taste: 50,
      bun: 50,
      clickToShowContent: false,
      formData: '',
      value: '',
      error: ''
    }
  },
  components: {
    'autocomplete': AutocompleteComponent,
    'textArea': textAreaInputComponent,
    'rangeSLider' : RangeSLiderComponent
  },

  mounted () {},
  created () {},

  computed: {
    ...mapGetters([
      'getCafeNames',
      'getCafeLocations',
      'getCakeprices'
    ]),
  },

  methods: {

    addFiles () {
      this.$refs.fileInput.click()
    },

    removeFiles () {
      if (document.querySelector('.remove-file')) {
        document.querySelector('.remove-file').click()
        } else {return}
    },

    resetFormData () {
      this.removeFiles()
      this.cafeName = ''
      this.location = ''
      this.price = ''
      this.imageFile = ''
      this.looks = 50
      this.taste = 50
      this.bun = 50
    },

    async submitFiles () {
      const formData = new FormData()
      let uploadedFile = this.files
      formData.append('files[0]', uploadedFile)
      formData.append('cafeName', this.cafeName)
      formData.append('location', this.location)
      formData.append('price', this.price)
      formData.append('comment', this.comment)
      formData.append('looks', this.looks)
      formData.append('taste', this.taste)
      formData.append('bun', this.bun)
      await this.$store.dispatch("addNewCake", formData)
      this.resetFormData()
      this.scrollingFuncion()
      this.toggleShowContent()
    },

    scrollingFuncion () {
      setTimeout(() => {
        this.scrollToPosition('lastCake')
      }, 600);
    },

    async cancelForm (e) {
      await this.resetFormData()
      await this.hideFormContent(e)
    },

    handleFilesUpload () {
      let uploadedFiles = this.$refs.fileInput.files
        for (var i = 0; i < uploadedFiles.length; i++) {
          this.files = uploadedFiles[i]
        }
    },

    removeFile () {
      this.files = ''
    },

    removeLastCakeStyle () {
      setTimeout(() => {
        document.querySelector('.lastCake').classList.remove('lastCake')
      }, 3000);
    },

    scrollToPosition (selector) {
      document.querySelector(`.${selector}`).scrollIntoView({
        behavior: 'smooth'
      })
    },

    async showFormContent(e) {
      this.toggleShowContent()
      let position = e.target.parentNode.parentNode.className
       this.scrollToPosition(position)
    },
    async hideFormContent(e) {
      let position = e.target.parentNode.parentNode.parentNode.className
      this.toggleShowContent()
      this.scrollToPosition(position)
    },
    toggleShowContent () {
      this.clickToShowContent = !this.clickToShowContent
    }
/* 
    async showFormContent (e) {
      this.toggleShowContent()
      const position = e.target.parentNode.parentNode.className
      console.log('position', position)
      await this.scrollToPosition(position)
    } */
  }
}
</script>

<style scoped>

.content-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.form-bun {
  width: 355px;
  height: 35vh;
  margin-top: 33.3vh;
  margin-bottom: 33.3vh;
}
.btn-round {
  display:flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin: auto;
  width: 56px;
  height: 56px;
  border-radius: 30px;
  background-color: #F9C62D;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 3rem;
  font-weight: 400;
}

.btn-round:active {
  background-color: #F2C94C;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin: 14vh 0;
  max-width: 700px;
  min-width: 335px;
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  min-width: 90%;
}
.cover-img {
  height: 67vh;
  background: url(./../assets/tuuletasku.jpg) no-repeat center center ;
  background-size: cover;
}
.btn-container {
  margin: 10px 0px 10px 0px;
}
.section-header {
  width: 260px;
  margin: auto;
  padding: 0 0 30px 0;
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
.card {
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  /* border-radius: 1rem;*/
  background-color: white;
  transition: 0.5s all;
}
.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
.area {
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
  transition: 0.2s all;
}
.sort-controls>ul, .sort-controls>ul>li  {
  display: flex;
  flex-direction: row;
}
.sort-controls>ul {
  justify-content: space-evenly;
  margin-top: 5vh;
}
.sort-controls>ul>li {
  flex-grow: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  transition: 0.2s all;
  margin: 0;
}
.sort-controls>ul>li:hover {
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.sort-controls>ul>li:active {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.5);
}
label {
  display: flex;
}
input[type='text']{
  width: 100%;
  margin-bottom: 10px;
  margin-top: 4px;
  padding: 4px;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  height: 40px;
  outline: none;
  font-size: 18px;
}
input:focus, .btn:focus {
   outline: none;
}
.area:active {
  background-color: white
}
.cakes-container {
  padding: 20px 10px;
  margin-top: 20vh;
}
.date {
  font-size: 1em;
}
input[type='file'] {
  position: absolute;
  top: -500px;
}
.file-listing {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 30px;
  font-size: 1rem;
  font-weight: 600;
}
.file-listing > * {
  justify-content: space-between;
  padding: 6px;
}
.file-name {
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #191970;
}
.remove-file {
  padding: 6px 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, .6);
  color: white;
  cursor: pointer;
  float: right;
}
.upload-area {
  padding: 40px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
}
.upload-area > * {
  cursor: pointer;
}
.ulpoad-icon {
  display:flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 40px;
  height: 40px;
  border-radius: 3rem;
  border-style: solid ;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.26);
  color: rgba(0, 0, 0, 0.26);
}
.upload-text {
  padding-bottom: 5px;
  display:flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  color: midnightblue;
}
.ulpoad-icon:active {
  border-color: rgba(0, 0, 0, 0.6);
  color: midnightblue;
}
.fade-enter-active {
  transition: opacity 1.5s;
   /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
}
.fade-leave-active {
  transition: opacity .5s;
   /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* RANGE SLIDER */

</style>
