<template>
  <section class="products-section-wrapper">
    <div class="products-container">

      <section class="sort-controls">
          <span v-if="filterValue"
              @click="clearFilter()"
              class="filter-clear">
            </span>
        <div class="filter-container field">
          <transition name="fade">
            <div
              v-if="filterValue"
              id="filter-tooltip">
            </div>
          </transition>
          
          <transition name="slide">
            <span 
              v-if="filterValue"
              id="found-products">
              Found {{ filteredProducts.length }} products
            </span>
          </transition>
          
          <autocomplete
            id="filterShop"
            v-model="filterString"
            :suggestions="productNames"
            :inputValidation="false"
            type="text"
            label="Find Products"/>
        </div>
        <transition-group 
          name="slide"
          mode="out-in">
          <div
            v-if="filteredProducts.length === 0"
            key="no-products"
            class="form-filter content-center"
          >
            <!-- <h3>No products found</h3> -->
            <fileUpload />
          </div>

          <div 
            key="sortBtns"
            class="container-sort-btns-outer">
            <ul class="container-sort-btns-inner">
              <li class="btn-container">
                <sortButton key="taste" id="avgTaste" label="Taste"> </sortButton>
              </li>
              <li class="btn-container">
                <sortButton key="looks" id="avgLooks" label="Looks"> </sortButton>
              </li>
              <li class="btn-container">
                <sortButton key="price" id="price" label="Price"> </sortButton>
              </li>
              <li class="btn-container">
                <sortButton key="name" id="name" label="Name"> </sortButton>
              </li>
            </ul>
          </div>
        </transition-group>
      
      </section>

     
      <transition
        name="fade"
        mode="out-in">
        <section 
          v-if="filteredProducts.length > 0">
          <productCard
            v-for="(product, index) in filteredProducts"
            :product="product"
            :index="index"
            :key="product.productId"
          />
          <div id="feedback">
          <h1>
            Didn't find the best for You?
          </h1>
          <fileUpload
            class="form-footer"/>
          </div>
        </section>
      </transition>

    </div>
  </section>
</template>

<script>
import store from '../store/store'
/* import { mapState } from 'vuex' */
import { mapGetters } from 'vuex'
import fileUpload from './FileUploadComponent.vue'
import RangeSLider from './RangeSliderComponent.vue'
import TextArea from './TextareaComponent.vue'
import Autocomplete from './AutocompleteComponent.vue'
import ProductCard from './ProductCardComponent.vue'
import SortButton from './SortButtonComponent.vue'

export default {
  store,
  name: 'AllCakesComponent',
  components: {
    fileUpload: fileUpload,
    rangeSLider: RangeSLider,
    textArea: TextArea,
    autocomplete: Autocomplete,
    productCard: ProductCard,
    SortButton: SortButton
  },
  props: {},
  data () {
    return {
      filterValue: '',
      isLast: {
        type: Boolean,
        value: false
      }
    }
  },

  computed: {

    ...mapGetters([
      'aggregatedFeedback',
      'productNames',
      'shopNames',
      'sortDirection',
      'selectedSortButton'
    ]),

    filterString: {
      get () {
        return this.filterValue
      },

      set (filterValue) {
        this.filterValue = filterValue.trim()
        this.$store.dispatch('setProductName', this.filterValue)
      }
    },

    filteredProducts () {
      return this.sortedProducts.filter(feedback => {
        const productName = feedback.product.name.trim()

        return (
          productName.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0
        )
      })
    },

    sortedProducts () {
      if (this.aggregatedFeedback.length !== 0) {
        
        const sortedProducts = this.aggregatedFeedback.slice()
        
        sortedProducts[sortedProducts.length - 1].isLast = true

        let ascDesc = this.sortDirection ? 1 : -1

        return sortedProducts.sort(
          (a, b) =>
            ascDesc *
            (Number(a[this.selectedSortButton]) <
            Number(b[this.selectedSortButton])
              ? 1
              : -1)
        )
      } else {
        return []
      }
    }
  },

  mounted () {},
  created () {},

  methods: {

    clearFilter() {
      this.filterValue = ''
    },

    scrollToComment (selector) {
      setTimeout(() => {
        selector.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })
      }, 90)
    } 
  }
}
</script>

<style scoped>
.products-section-wrapper {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin: auto;
}
.products-container {
  display: flex;
  flex-direction: column;
  min-width: 20rem;
}
.form-filter {
  flex-direction: column;
  background-color: white;
  display: flex;
  justify-content: center;  
  padding: 3px 12px;
  margin: 0px 1rem 3rem;
  border-radius: 3rem;
  box-shadow: 3px 12px 24px rgba(0, 0, 0, .15);
  }

/* SORT */
.sort-controls {
  margin: 0 -8px 2rem;
  padding: 1rem 0;
  background-image: linear-gradient(to right, #f6f9fc , #f6f3fc);
}
.container-sort-btns-outer {
  overflow: scroll;
  margin: 0 0 -3rem;
}
.container-sort-btns-inner {
  display: flex;
  flex-direction: row;
  margin: auto 1.2rem 2.4rem;
}

/* FILTER */
.filter-container {
  flex-direction: column-reverse;
  margin: 1.2rem;
}
.filter {
  border: none;
  border-radius: 2rem;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, .02);
}
.filter:focus, .filter:active {
  /* background-color: midnightblue; */
  color: white;
}
input:not(:placeholder-shown) + label,
input:focus + label {
  font-size: 14px !important;
  cursor: pointer;
}
#filter-tooltip {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 0;
}
#found-products {
  font-weight: 700;
}
.filter-clear {
  padding: 1rem 1.2rem;
  position: relative;
  background: url(./../assets/close-x.svg) no-repeat center;
  background-size: 1rem;
  height: 1rem;
  width: 1rem;
  right: -8.5rem;
  top: 5rem;
  z-index: 1;
}
/* FOOTER */
#feedback {
  background-image: linear-gradient(#fe515c, deeppink);
  /* background-image: linear-gradient(#2828B8, #3E3EAD); */
  margin: 6rem -8px -8px;
  padding: 6rem 0 2rem;
}
section>#feedback>h1 {
  margin: 0rem 4rem;
  color: white !important;
  
}
.form-footer {
  margin: 8rem 1.6rem;
  padding: 3px 12px;
  background: white;
  border-radius: 3rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, .15);
}
</style>
