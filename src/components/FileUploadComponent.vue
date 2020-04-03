<template>
  <section id="form">
    <div class="content-center">
      <div class="add-bun">
        <transition name="fade" mode="out-in">
          <div v-if="!clickToShowContent" class="form-bun" key="addBuns">
            <h1 class="section-header">Nam-Nam Add a bun</h1>
            <div class="btn-round" v-on:click="showFormContent($event)">+</div>
          </div>

          <div v-else class="container" key="showBuns">
            <h1 class="section-header">Nam-Nam Add a bun</h1>
            <div class="upload-area card" v-on:click="addFiles()">
              <div class="upload-text">Add a photo</div>
              <div class="btn-round">+</div>
            </div>

            <div>
              <input
                type="file"
                id="files"
                ref="fileInput"
                accept=".jpg, jpeg"
                v-on:change="handleFilesUpload()"
                name="files"
              />
            </div>

            <transition name="fade">
              <div class="file-listing" v-if="files">
                <span class="file-name">{{ files.name }}</span>
                <span class="remove-file" v-on:click="removeFile()">Remove</span>
              </div>
            </transition>

            <autocomplete
              type="text"
              :suggestions="getCafeNames"
              v-model="cafeName"
              label="Name"
              :required="true"
              id="cafeName"
            />

            <autocomplete
              type="text"
              :suggestions="getCafeLocations"
              v-model="location"
              label="Address"
              :required="true"
              id="location"
            />

            <autocomplete
              type="number"
              step="0.01"
              :suggestions="getCakeprices"
              v-model="price"
              label="Price"
              :required="true"
              id="price"
            />

            <rangeSLider v-model="looks" label="Looks" :required="true" id="looks" />

            <rangeSLider v-model="taste" label="Taste" :required="true" id="taste" />

            <rangeSLider v-model="bun" label="Bun" :required="true" id="bun" />

            <textArea v-model="comment" label="Comment" id="comment" />

            <div class="btn-container">
              <button class="btn-form btn-primary" v-on:click="submitFiles()">Submit</button>
            </div>
            <div class="btn-container">
              <button class="btn-form btn-transparent" v-on:click="cancelForm($event)">Cancel</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store/store";
import textArea from "./TextareaComponent.vue";
import rangeSLider from "./RangeSLiderComponent.vue";
import autocomplete from "./AutocompleteComponent.vue";

export default {
  name: "fileUploadComponent",
  data() {
    return {
      files: "",
      imageFile: "",
      cafeName: "",
      location: "",
      price: "",
      comment: "",
      looks: 0,
      taste: 0,
      bun: 0,
      clickToShowContent: false,
      formData: "",
      value: "",
      error: ""
    };
  },
  components: {
    autocomplete: autocomplete,
    textArea: textArea,
    rangeSLider: rangeSLider
  },

  mounted() {},
  created() {},

  computed: {
    ...mapGetters(["getCafeNames", "getCafeLocations", "getCakeprices"])
  },

  methods: {
    addFiles() {
      this.$refs.fileInput.click();
    },

    removeFiles() {
      if (document.querySelector(".remove-file")) {
        document.querySelector(".remove-file").click();
      } else {
        return;
      }
    },

    resetFormData() {
      this.removeFiles();
      this.cafeName = "";
      this.location = "";
      this.price = "";
      this.imageFile = "";
      this.comment = "";
      this.looks = 0;
      this.taste = 0;
      this.bun = 0;
    },

    submitFiles() {
      const formData = new FormData();
      let uploadedFile = this.files;
      formData.append("files[0]", uploadedFile);
      formData.append("cafeName", this.cafeName);
      formData.append("location", this.location);
      formData.append("price", Number(this.price));
      formData.append("comment", this.comment);
      formData.append("looks", Number(this.looks));
      formData.append("taste", Number(this.taste));
      formData.append("bun", Number(this.bun));
      this.$store.dispatch("addNewCake", formData);
      this.resetFormData();
      this.scrollToLastCake();
      this.toggleShowContent();
    },

    scrollToLastCake() {
      setTimeout(() => {
        this.scrollToPosition("lastCake");
      }, 600);
    },

    cancelForm(e) {
      this.resetFormData();
      this.hideFormContent(e);
    },

    handleFilesUpload() {
      let uploadedFiles = this.$refs.fileInput.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files = uploadedFiles[i];
      }
      // hack for ios devices
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        window.scrollBy({
          behavior: 'smooth', 
          top: 150
        })
      } else {
        this.focusInput()
      }
    },

    removeFile() {
      this.files = "";
    },

    removeLastCakeStyle() {
      setTimeout(() => {
        document.querySelector(".lastCake").classList.remove("lastCake");
      }, 3000);
    },

    scrollToPosition(selector) {
      document.querySelector(`.${selector}`).scrollIntoView({
        behavior: "smooth"
      });
    },

    showFormContent(e) {
      this.toggleShowContent();
      let position = e.target.parentNode.parentNode.className;
      this.scrollToPosition(position);
    },

    hideFormContent(e) {
      this.toggleShowContent();
      let position = e.target.parentNode.parentNode.parentNode.className;
      this.scrollToPosition(position);
    },

    toggleShowContent() {
      this.clickToShowContent = !this.clickToShowContent;
    }
  }
};
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
.fade-enter-active {
  transition: opacity 1.5s;
  /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
}
.fade-leave-active {
  transition: opacity 0.5s;
  /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
