<template>

  <section class="products-section-wrapper">
    <div class="products-container">
      <!-- <h1 class="section-header">Products</h1> -->
      <section class="sort-controls">
         <div class="filter-container field">
          <input 
            v-model="filterString"
            type="text"
            name="filter"
            placeholder="Filter products"
            id=""
            class="filter"/>
            <label for="filter">Filter products</label>
        </div>
        <ul class="sort-btns-container">
          <li class="btn-container">
            <button
              id="data-sort-taste"
              class="btn-card btn-sort btn-selected"
              @click="setSortParam('avgTaste', $event), setActiveClass($event.target)"
            >Taste</button>
          </li>

          <li class="btn-container">
            <button
              id="data-sort-looks"
              class="btn-card btn-sort"
              @click="setSortParam('avgLooks', $event), setActiveClass($event.target)"
            >Looks</button>
          </li>

          <li class="btn-container">
            <button
              id="data-sort-price"
              class="btn-card btn-sort"
              @click="setSortParam('price', $event), setActiveClass($event.target)"
            >€</button>
          </li>
        </ul>
       
      </section>

      <transition-group
        id="product-cards"
        name="fade">
        
        <div
          v-if="filteredProducts.length === 0"
          key="no-products"
          class="no-products-found">
            <h3>No products found</h3>        
          </div>
        <div v-else
          v-for="(product, index) in filteredProducts"
          :class="{lastCake : product.isLast === true}"
          :id="index"
          :item="product"
          :index="index"
          :key="product.productId"
          :ref="product.productId"
          class="product card round-corners">
         
          <div
            v-if="product.feedback.length !== 0"
            :style="{ backgroundImage: `url('${getImagePath(product.feedback[product.feedback.length-1].productImage)}')` }"
            class="product-photo"/>

          <div class="icon-btns-container">
            <!--  <button class="btn-card btn-card-delete" 
              @click="deleteCake(product.productId)">
              Delete
            </button> -->

            <div
              v-if="product.price"
              class="product-price">
              {{ product.price }} €
            </div>
          </div>

          <div class="product-info">

            <div class="product-description-container">
              <div class="shop-name">
                <h3> {{ product.shop.name | capitalize }} </h3>
              </div>

              <div
                v-if="product.shop.address !== ''"
                class="product-location">
                <a
                  :href="'https://www.google.com/maps/place/'
                  + product.shop.address | address"
                  target="_blank">
                  <div class="product-location-icon"/>
                  <!-- <div class="product-location-address">{{product.shop.address | capitalize}}</div> -->
                </a>
              </div>

            </div>


            <div id="product-name">
              <h2 class="product-name">
                {{ product.product.name | capitalize }}
              </h2>
            </div>

            <transition name="fade">

              <ul class="product-stats">
                <li>
                  <h5>TASTE</h5>
                  <p>{{ product.avgTaste }}</p>
                </li>

                <li>
                  <h5>LOOKS</h5>
                  <p>{{ product.avgLooks }}</p>
                </li>

                <li>
                  <div
                    v-if="product.feedback.length !== 0"
                    class="product-comment-icon"
                    @click.prevent="toggleSelectedCommentId(index)"/>
                </li>
              </ul>
            </transition>

              <inlineForm
                :product="product.feedback"
                :index="index"
                />

            <div
              v-if="selectedCommentIndex === index && showComment"
              class="comment-container">
              <div
                v-for="(element) in product.feedback"
                :key="element._id">
                <div 
                  v-if="element.comment"
                  class="product-comment">
                  <p class="date"> {{ element.created_at | formatDate }} </p>
                  <p class="comment"> {{ element.comment }} </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import store from '../store/store'
/* import { mapState } from 'vuex' */
import { mapGetters } from 'vuex'
import rangeSLider from './RangeSliderComponent.vue'
import textArea from './TextareaComponent.vue'
import autocomplete from './AutocompleteComponent.vue'
import ProductFormInlineComponent from './ProductFormInlineComponent.vue'

export default {
  store,
  name: 'AllCakesComponent',
  components: {
    rangeSLider: rangeSLider,
    textArea: textArea,
    autocomplete: autocomplete,
    inlineForm: ProductFormInlineComponent
  },
  props: {},
  data () {
    return {
      shop: {
        name: ''
      },
      selectedCommentIndex: '',
      showComment: '',
      sortAsc: {
        type: Boolean,
        value: true
      },
      sortParam: 'taste',
      filterValue: '',
      selectedBtn: null,
      isLast: {
        type: Boolean,
        value: false
      }
    }
  },

  computed: {
    // ...mapState(['products', 'shops', 'feedback']),
    ...mapGetters(['aggregatedFeedback', 'productNames']),
    
    filterString: {
      get () {
        return this.filterValue
      },

      set (filterValue) {
        this.filterValue = filterValue.trim()
      }
    },

    filteredProducts () {
      if (this.aggregatedFeedback.length !== 0) {

        return this.aggregatedFeedback.filter(product => {     
          const productName = product.product.name.trim()
          return productName.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0
          })
      } else {
        return []
      }
      
    },

    sortedProducts () {
      console.log(this.filteredProducts)
      if (this.aggregatedFeedback.length !== 0) {
        const sortedProducts = this.aggregatedFeedback

        sortedProducts[sortedProducts.length - 1].isLast = true

        // toggle sort DESC ASC
        let ascDesc = this.sortAsc.value ? -1 : 1
        return sortedProducts.sort(
          (a, b) =>
            ascDesc *
            (Number(a[this.sortParam]) > Number(b[this.sortParam]) ? 1 : -1)
        )
      }
    }
  },

  mounted () {},
  created () {},

  methods: {
   
 /*    async deleteCake (id) {
      await this.$store.dispatch('deleteOne', id)
    }, */

    getImagePath (path) {
      try {
        return 'http://localhost:3000/static/images' + '/' + path
      } catch (error) {
        console.log('image replaced with placeholder. ', error.message)
        return require('./../assets/tuuletasku.jpg')
      }
    },

    setActiveClass (e) {
      const activeBtns = document.querySelectorAll('.btn-selected')
      activeBtns[0].className = activeBtns[0].className.replace(
        'btn-selected',
        ''
      )
      e.classList.add('btn-selected')
    },

    setSortParam (sortParam, e) {
      this.sortParam = sortParam

      // check if the same sort button is pressed
      if (this.selectedBtn === e.target.id) {
        this.sortAsc.value = !this.sortAsc.value
      }

      this.selectedBtn = e.target.id
    },

    toggleSelectedCommentId (id) {
      // const selector = document.querySelector('#' + CSS.escape(id))

      if (this.selectedCommentIndex === id) {
        this.selectedCommentIndex = ''
        this.showComment = false
      } else {
        this.showComment = true
        this.selectedCommentIndex = id
        // this.scrollToComment(selector); does not work on Safari
        // this.SmoothVerticalScrolling(selector, 275, "center")
      }
    },

    scrollToComment (selector) {
      setTimeout(() => {
        selector.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })
      }, 90)
    }/* ,

    rateProduct (product, val) {
      if (product.feedback[0] !== undefined) {
        try {
          product.feedback[0].taste = Number(product.avgTaste) + Number(val)

          if (product.feedback[0].taste >= 100) {
            product.feedback[0].taste = 100
          }
          const formData = new FormData()
          formData.append('taste', product.feedback[0].taste)
          formData.append('id', product.feedback[0]._id)
          this.$store.dispatch('rateProduct', formData)
        } catch (error) {
          console.log(error)
        }
      }
    } */
  }
}
</script>

<style scoped>
 

.products-section-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25vh auto;
}

/* REFAKTOREERIDA */

.card {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: 0.5s all;
}
.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
.round-corners {
  border-radius: 20px;
}

/* CAKE */
.products-container {
  display: flex;
  flex-direction: column;
  min-width: 350px;
}
.product-photo {
  background-size: cover;
  height: 45vh;
  border-radius: 20px 20px 0 0;
}
.icon-btns-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: absolute;
  margin: 12px 0 0 278px;
}
.product-name {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 22px 12px;
}
.product-stats {
  margin: 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.product-stats > li > p {
  margin: 0 auto 5px;
  font-weight: 500;
  font-size: 1.4rem;
}
.product-description-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 18px;
}
.product-price {
  padding: .8rem;
  font-size: 1rem;
  font-weight: 600;
  color: midnightblue;
  background-color: white;
  border-radius: 2em;
  box-shadow: 0px 0px 6px rgba(5,5,5, .25);
}
.shop-name {
  display: flex;
  margin: 0 12px;
}
.product-location {
  display: flex;
  justify-content: flex-end;
  margin: 0 12px;
}
.product-location > a {
  display: flex;
  color: midnightblue;
  text-decoration: none;
}
.product-location-address {
  display: flex;
  flex-direction: row;
  margin-left: 12px;
  font-size: 1.1rem;
}
.product-location-icon {
  margin: auto;
  background: url(./../assets/location.svg) no-repeat center;
  width: 16px;
  height: 22px;
  background-size: 16px;
}
.comment-container {
  display: flex;
  flex-direction: column;
  margin: 24px;
}
.product-comment {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 300px;
  margin: 8px 0;
}
.date {
  margin: 0;
  font-size: .8em;
  color: #b2b2cc;
}
.comment {
  margin: 2px 0;
}
.product-comment-icon {
  background: url(./../assets/comment.svg) no-repeat center;
  width: 32px;
  height: 32px;
  background-size: cover;
  cursor: pointer;
}

/* SORT */
.sort-controls {
  margin: 42px 0 0;
}
.sort-btns-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: auto;
}

/* BUTTON */


.btn-selected {
  color: white !important;
  background-color: midnightblue;
}

.btn-card-delete {
  position: absolute;
  margin: 12px;
  color: #00000099;
  background-color: rgba(255, 255, 255, 0.7);
}
.btn-dislike {
  color: white;
  background-image: linear-gradient(to right, #9fa7af, #b9b9c6);
  /* background-color: darkgrey; */
}
.btn-sort {
  flex-grow: 1;
  justify-content: center;
  margin: 0 0 0 18px;
  border: none;
  transition: 0.2s all;
  outline: 0;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.02);
}
.btn-sort:hover {
  background-color: midnightblue;
  color: white !important;

}

/* FILTER */
.filter-container>label {
  margin: 0 0 0 4%;
}
.filter-container {
  flex-direction: column-reverse;
  margin: 0;
}
.filter {
    /* border: solid 1px midnightblue ; */
    border: none;
    border-radius: 26px;
    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.02);
}
.filter:focus {
  background-color: midnightblue;
  color: white;
}
.no-products-found {
  display: flex;
  justify-content: center;
  margin: 42px;
}
</style>
