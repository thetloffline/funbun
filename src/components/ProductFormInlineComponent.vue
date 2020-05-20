<template>
  <div class="form-inline">
      <div class="">
        <transition name="slide">
          <div
            v-if="index === isFormOpen.id"
            :id="index"
            class="inline-form">

            <rangeSLider
              id="taste"
              v-model="feedback.taste"
              :required="true"
              label="Taste"
              class="inline-range-slider"/>

            <rangeSLider
              id="looks"
              v-model="feedback.looks"
              :required="true"
              label="Looks"
              class="inline-range-slider"/>

            <textArea
              id="comment"
              v-model="feedback.comment"
              label="Comment"
              class="inline-comment"/>

            <div 
              v-if="index === isFormOpen.id"
              class="container-card-btns">

              <div
                class="btn-container">
                <button
                  :id="index"
                  class="btn-card btn-transparent"
                  @click="discardInlineForm($event, product, index)">
                  Cancel
                </button>
              </div>

              <div
                class="btn-container">
                <button
                  :id="index"
                  class="btn-card"
                  @click="submitInlineForm($event, product, index)">
                  Submit Feedback
                </button>
              </div>

            </div>
          </div>

          <div
            v-if="formSubmitted === true"
            class="success">
            <h3>Great Success</h3>
          </div>
          
          <div
            v-if="formCancelled === true"
            class="cancelForm">
            <h3>Feedback Cancelled</h3>
          </div>

        </transition>
      </div>

      

    <transition name="fade">
      <div
        v-if="index !== isFormOpen.id && showButtons === true"
        class="container-card-btns">
        <div class="btn-container">
          <button
            :id="index"
            class="btn-card"
            @click="showInlineForm($event, product, index)">
            Give New Feedback
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import store from '../store/store'
import { mapGetters } from 'vuex'
import rangeSLider from './RangeSliderComponent.vue'
import textArea from './TextareaComponent.vue'
export default {
  name: 'ProductFormInlineComponent',
  components: {
    rangeSLider: rangeSLider,
    textArea: textArea
  },
  props: {
    product: '',
    index: 0
  },
  data () {
    return {
      feedback: {
        id: '',
        taste: 0,
        looks: 0,
        comment: ''
      },
      showButtons: true,
      formSubmitted: false,
      formCancelled: false
    }
  },
  mounted () {},
  created () {},
  methods: {
   
   async showInlineForm (e, product, index) {
     this.showButtons = false
        const clickedForm = {
          'id' : this.index
        }
        await this.$store.dispatch('toggleInlineForm', clickedForm)
      this.resetInlineForm()
    },

    async submitInlineForm (e, product, index) {
      const inlineForm = new FormData()
      inlineForm.append('productId', product[0].productId)
      inlineForm.append('comment', this.feedback.comment)
      inlineForm.append('looks', Number(this.feedback.looks))
      inlineForm.append('taste', Number(this.feedback.taste))
      inlineForm.append('productImage', product[0].productImage)

      await this.$store.dispatch('addFeedback', inlineForm)
      await this.$store.dispatch('toggleInlineForm', '')
      
      this.resetInlineForm()
      this.formSubmitted = true
      setTimeout(() => {
        this.formSubmitted = false
      }, 1500);
    },

    async discardInlineForm () {
      await this.$store.dispatch('toggleInlineForm', '')
      this.resetInlineForm()
      this.formCancelled = true
      this.showButtons = true
      setTimeout(() => {
        this.formCancelled = false
      }, 1500)
    },

    resetInlineForm () {
      this.feedback.looks = 0
      this.feedback.taste = 0
      this.feedback.comment = ''
    },

  },
  computed: {
      ...mapGetters(['aggregatedFeedback', 'isFormOpen'])
  }
}
</script>

<style scoped>

.inline-form {
  display: flex;
  flex-direction: column;
  margin: 18px 0 0;
}
.inline-comment {
    border-radius: 0px;
    margin: 10px 24px !important;
    box-shadow: none !important ;
}
.inline-range-slider {
  border-radius: 0px;
  margin: 10px 24px !important;
  box-shadow: none !important ;
}
.success, .cancelForm {
  display: flex;
  flex-direction: column ;
  justify-content: center;
  height: 313px;
  align-items: center;
}
.cancelForm>h3 {
  color: red;
}
.success>h3 {
  color: green ;
}

/* FADE HEIGHT */
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all .4s ease-out;
  max-height: 410px;
  opacity: 1;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  max-height: 0px;
}

/* SLIDE */
.slide-enter {
  opacity: 0;
  transform: scale3d(.8, 1, 1) translate3d(100px, 0, 0);
}

.slide-enter-to { transform: scale3d(1, 1, 1); }
.slide-enter-active,
.slide-leave-active { transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.slide-leave { transform: scale3d(1, 1, 1); }

.slide-leave-to {
  opacity: 0;
  transform: scale3d(1, 1, 1) translate3d(-180px, 0, 0);
}

</style>
