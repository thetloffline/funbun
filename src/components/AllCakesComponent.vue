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
            class="filter"
          />
          <label for="filter">Filter products</label>
        </div>

        <ul class="sort-btns-container">
          <li class="btn-container">
            <sortButton key="taste" id="avgTaste" label="Taste"> </sortButton>
          </li>
          <li class="btn-container">
            <sortButton key="looks" id="avgLooks" label="Looks"> </sortButton>
          </li>
          <li class="btn-container">
            <sortButton key="price" id="price" label="Price"> </sortButton>
          </li>
        </ul>
      </section>

      <div
        v-if="filteredProducts.length === 0"
        key="no-products"
        class="no-products-found"
      >
        <h3>No products found</h3>
      </div>

      <div v-else>
        <productCard
          v-for="(product, index) in filteredProducts"
          :product="product"
          :index="index"
          :key="product.productId"
        />
      </div>
    </div>
  </section>
</template>

<script>
import store from '../store/store'
/* import { mapState } from 'vuex' */
import { mapGetters } from 'vuex'
import RangeSLider from './RangeSliderComponent.vue'
import TextArea from './TextareaComponent.vue'
import Autocomplete from './AutocompleteComponent.vue'
import ProductCard from './ProductCardComponent.vue'
import SortButton from './SortButtonComponent.vue'

export default {
  store,
  name: 'AllCakesComponent',
  components: {
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
      'sortDirection',
      'selectedSortButton'
    ]),

    filterString: {
      get () {
        return this.filterValue
      },

      set (filterValue) {
        this.filterValue = filterValue.trim()
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
  align-items: center;
  margin: 25vh auto;
}
.products-container {
  display: flex;
  flex-direction: column;
  min-width: 350px;
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

/* FILTER */
.filter-container > label {
  margin: 0 0 0 4%;
}
.filter-container {
  flex-direction: column-reverse;
  margin: 0 0 6px;
}
.filter {
  border: none;
  border-radius: 26px;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.02);
}
.filter:focus {
  background-color: midnightblue;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
.no-products-found {
  display: flex;
  justify-content: center;
  margin: 42px;
}
</style>
