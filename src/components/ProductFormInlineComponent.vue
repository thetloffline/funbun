<template>
<div>
<!-- <transition name="slide"> -->
    <transition-group
      name="fade"
      mode="out-in"
      >

      <div
        v-if="index === isFormOpen.id"
        :id="index"
        :key="productId">
        <div 
          v-if="showFormContent"
          key="inlineForm"
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
          
          
            <div 
              v-if="showPriceInput === false"
              @click="updatePriceInput()"
              class="update-price">
              Update price
            </div>

            <textInput
              v-else
              id="updatePriceInput"
              v-model="updatedPrice"
              :inputValidation="false"
              type="number"
              step="0.01"
              label="Update price"
              class="inline-range-slider"/>


          <textArea
            id="comment"
            v-model="feedback.comment"
            label="Comment (optional)"
            class="inline-comment"/>

        </div>
        
        <transition
          name="slide"
          mode="out-in">
          <div
            v-if="formSubmitted === true"
            class="success">
            <h3>Great Success</h3>
          </div>

          <div
            v-if="formCancelled === true"
            class="cancel-form">
            <h3>Feedback Cancelled</h3>
          </div>
        </transition>
      </div>
      

 <!--    <transition 
      name="fade"
      mode="out-in"> -->
    <!-- </transition> -->
  </transition-group>

    <transition 
      name="fade" 
      mode="out-in">
      
      <div
        v-if="index !== isFormOpen.id  && showButtons === true"
        class="container-card-btns">
        <div class="btn-container">
          <button
            :id="index"
            class="btn-card btn-transparent"
            @click="showInlineForm($event, product, index)">
            Give Feedback
          </button>
        </div>
      </div>
       
      <div 
        v-if="index === isFormOpen.id && showFormContent"
        :key="feedback.id"
        class="container-card-btns">

        <div class="btn-container">
          <button
            :id="index"
            class="btn-card btn-primary"
            @click="submitInlineForm($event, product, index)">
            Submit Feedback
          </button>
        </div>

        <div class="btn-container">
          <button
            :id="index"
            class="btn-card btn-transparent"
            @click="discardInlineForm($event, product, index)">
            Cancel
          </button>
        </div>
        
      </div>
    </transition>   
</div>
  <!-- </transition> -->
</template>

<script>
import store from '../store/store'
import { mapGetters } from 'vuex'
import rangeSLider from './RangeSliderComponent.vue'
import textInput from './textInputComponent.vue'
import textArea from './TextareaComponent.vue'
export default {
  name: 'ProductFormInlineComponent',
  components: {
    rangeSLider: rangeSLider,
    textInput: textInput,
    textArea: textArea
  },
  props: {
    product: {
      type: Array,
      value: ''
    },
    index: {
      type: Number,
      value: 0
    },
    productId: ''
  },
  data () {
    return {
      feedback: {
        id: '',
        taste: 0,
        looks: 0,
        comment: ''
      },
      updatedPrice: '',
      formSubmitted: false,
      formCancelled: false,
      showFormContent: false,
      showPriceInput: false
    }
  },
  mounted () {},
  created () {},
  computed: {

      ...mapGetters([
        'isFormOpen'
        ]),

      showButtons : {
        get () {
          return this.isFormOpen.id !== this.index
        },
        set (show) {
          return show
        } 
      }
  },

  methods: {
    
    getFormHeight(e) {
     this.formHeight = document.querySelector('.inline-form').clientHeight + 4 +'px'
   },

    async toggleInlineForm (id) {
      if (id) {
        await this.$store.dispatch('toggleInlineForm', {'id':this.index})
      } else {
        await this.$store.dispatch('toggleInlineForm', '')
      }
    },

    showInlineForm (e, product, index) {
      setTimeout(() => {
        this.showButtons = false
      }, 1500);
      
      this.toggleInlineForm({'id':this.index})
      this.showFormContent = true
      this.resetInlineForm()
    },
    
    async discardInlineForm () {
      setTimeout(() => {
        this.resetInlineForm()
        this.showFormContent = false
        this.formCancelled = true
      }, 100);
      
      setTimeout(() => {
        this.formCancelled = false
      }, 1600)
      
      setTimeout(() => {
        this.toggleInlineForm()
      }, 2100)
    },

    async submitInlineForm (e, product, index) {
      const inlineForm = new FormData()
      inlineForm.append('productId', product[0].productId)
      inlineForm.append('comment', this.feedback.comment)
      inlineForm.append('looks', Number(this.feedback.looks))
      inlineForm.append('taste', Number(this.feedback.taste))
      inlineForm.append('productImage', product[0].productImage)
      await this.$store.dispatch('addFeedback', inlineForm)

      if (this.updatedPrice !== null && this.updatedPrice !== '0') {
        await this.$store.dispatch('updateProductPrice', {
          'price': Number(this.updatedPrice),
          'id': product[0].productId
          })
      }
      
      setTimeout(() => {
        this.resetInlineForm()
        this.showFormContent = false
        this.formSubmitted = true
      }, 100);
      
      setTimeout(() => {
        this.formSubmitted = false
      }, 1600)

      setTimeout(() => {
        this.toggleInlineForm()
      }, 2100)
    },

    resetInlineForm () {
      this.feedback.looks = 0
      this.feedback.taste = 0
      this.feedback.comment = ''
      this.updatedPrice = null
      this.showPriceInput = false
    },

    updatePriceInput() {
      this.showPriceInput = true
      setTimeout(() => {      
        const price = document.querySelector('#updatePriceInput')
        price
        price.focus()
      }, 10)
    }
  }
}
</script>

<style scoped>

.inline-form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1.6rem;
  /* transition: all .5s; */
  transition: max-height 0.5s;
  min-height: 21rem;
  max-height: 26rem;
}
.update-price {
  text-decoration: underline;
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
.success, .cancel-form {
  display: flex;
  flex-direction: column ;
  justify-content: center;
  align-items: center;
}
.cancel-form>h3 {
  margin : 8rem 0;
  height: 12rem;
}
.success>h3 {
  margin : 8rem 0;
  height: 12rem;
}

/* FADE HEIGHT */
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all .4s ease-out;
  opacity: 1;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  max-height: 0px;
}

</style>
