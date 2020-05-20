<template>
  <section id="form">
    <div class="content-center">

      <div class="add-bun">

        <transition 
          name="fade"
          mode="out-in">

          <div
            v-if="!clickToShowContent"
            key="addBuns"
            class="form-bun">
            <h1 class="section-header">Nam-Nam Add a bun</h1>
            <div
              class="btn-round"
              @click="showFormContent($event)">
              +
            </div>
          </div>

          <div 
            v-else
            key="showBuns"
            class="container">

            <h1 class="section-header">Nam-Nam Add a bun</h1>
            <div
              class="upload-area card"
              @click="addFiles()">
              <div class="upload-text">Add a photo</div>
              <div class="btn-round">+</div>
            </div>

            <div>
              <input
                id="files"
                ref="fileInput"
                type="file"
                accept=".jpg, jpeg"
                name="files"
                @change="handleFilesUpload()"/>
            </div>

            <transition
              name="fade">

              <div
                v-if="files"
                class="file-listing">

                <span
                  class="file-name">
                  {{ files.name }}
                </span>

                <span
                  class="remove-file" 
                  @click="removeFile()">
                  Remove
                </span>

              </div>
            </transition>

            <autocomplete
              id="shop.name"
              v-model="shop.name"
              :suggestions="shopNames"
              :required="true"
              type="text"
              label="Shop Name"/>

            <autocomplete
              id="address"
              v-model="shop.address"
              :suggestions="shopAddresses"
              :required="true"
              type="text"
              label="Address"/>

            <autocomplete
              id="product.name"
              v-model="product.name"
              :suggestions="productNames"
              :required="true"
              type="text"
              label="Product Name"/>

            <textInput
              id="price"
              v-model="product.price"
              :required="true"
              type="number"
              step="0.01"
              label="Price"/>

            <rangeSLider
              id="looks"
              v-model="feedback.looks"
              :required="true"
              label="Looks"/>

            <rangeSLider
              id="taste"
              v-model="feedback.taste"
              :required="true"
              label="Taste"/>

            <textArea
              id="comment"
              v-model="feedback.comment"
              label="Comment"/>

            <div class="btn-container">
              <button
                class="btn-form btn-primary" 
                @click="submitFiles()">
                Submit
              </button>
            </div>

            <div class="btn-container">
              <button
                class="btn-form btn-transparent"
                @click="cancelForm($event)">
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
import textArea from './TextareaComponent.vue'
import textInput from './textInputComponent.vue'
import rangeSLider from './RangeSliderComponent.vue'
import autocomplete from './AutocompleteComponent.vue'

export default {
  name: 'FileUploadComponent',
  components: {
    autocomplete: autocomplete,
    textArea: textArea,
    rangeSLider: rangeSLider,
    textInput: textInput
  },

  data () {
    return {
      files: '',
      imageFile: '',
      shop: {
        name: '',
        address: ''
      },
      product: {
        category: '',
        name: '',
        price: ''
      },
      feedback: {
        looks: 0,
        taste: 0,
        comment: ''
      },
      clickToShowContent: false,
      formData: '',
      value: '',
      error: ''
    }
  },

  computed: {
    ...mapGetters(['shopNames', 'shopAddresses', 'productNames'])
  },

  mounted () {},
  created () {},

  methods: {
    addFiles () {
      this.$refs.fileInput.click()
    },

    removeFiles () {
      if (document.querySelector('.remove-file')) {
        document.querySelector('.remove-file').click()
      } else {

      }
    },

    resetFormData () {
      this.removeFiles()
      this.shop.name = ''
      this.shop.address = ''
      this.product.category = ''
      this.product.name = ''
      this.product.price = ''
      this.feedback.imageFile = ''
      this.feedback.looks = 0
      this.feedback.taste = 0
      this.feedback.comment = ''
    },

    async submitFiles () {
      let uploadedFile = this.files
      
      const shop = new FormData()
      shop.append('name', this.shop.name)
      shop.append('address', this.shop.address)
      
      const product = new FormData()
      product.append('category', this.product.category)
      product.append('name', this.product.name)
      product.append('price', Number(this.product.price))
      
      const feedback = new FormData()
      feedback.append('files[0]', uploadedFile)
      feedback.append('looks', Number(this.feedback.looks))
      feedback.append('taste', Number(this.feedback.taste))
      feedback.append('comment', this.feedback.comment)

      await this.$store.dispatch('addShop', shop)
      await this.$store.dispatch('addProduct', product)
      await this.$store.dispatch('addFeedback', feedback)

      this.resetFormData()
      this.scrollToLastCake()
      this.toggleShowContent()
    },

    scrollToLastCake () {
      setTimeout(() => {
        this.scrollToPosition('lastCake')
      }, 600)
    },

    cancelForm (e) {
      this.resetFormData()
      this.hideFormContent(e)
    },

    handleFilesUpload () {
      let uploadedFiles = this.$refs.fileInput.files
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files = uploadedFiles[i]
      }
      
      // scrolling hack for ios devices
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        window.scrollBy({
          behavior: 'smooth',
          top: 150
        })
      } else {
        this.focusInput()
      }
    },

    removeFile () {
      this.files = ''
    },

    removeLastCakeStyle () {
      setTimeout(() => {
        document.querySelector('.lastCake').classList.remove('lastCake')
      }, 3000)
    },

    scrollToPosition (selector) {
      document.querySelector(`.${selector}`).scrollIntoView({
        behavior: 'smooth'
      })
    },

    showFormContent (e) {
      this.toggleShowContent()
      let position = e.target.parentNode.parentNode.className
      this.scrollToPosition(position)
    },

    hideFormContent (e) {
      this.toggleShowContent()
      let position = e.target.parentNode.parentNode.parentNode.className

      // scrolling hack for ios devices
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(() => {
          this.scrollToPosition(position)
        }, 500)
      } else {
        this.scrollToPosition(position)
      }
    },

    toggleShowContent () {
      this.clickToShowContent = !this.clickToShowContent
    }
  }
}
</script>

<style scoped>
.content-center {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.add-bun {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.form-bun {
  margin: 25vh auto;
  width: 355px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 14vh 0;
  max-width: 700px;
  min-width: 335px;
}
.btn-container {
  margin: 10px 0 10px 0;
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
input[type="file"] {
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
.file-name {
  margin: 6px;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #191970;
}
.remove-file {
  padding: 6px 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  cursor: pointer;
  float: right;
}
.upload-area {
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.upload-text {
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  color: midnightblue;
}
</style>
