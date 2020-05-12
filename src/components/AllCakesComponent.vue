<template>
  <section class="products-section-wrapper">
    <div class="products-container">
      <h1 class="section-header">Bun stats</h1>

      <div class="mobile-sort">
        <div class="btn-round"></div>
      </div>

      <section class="sort-controls">
        <ul class="sort-btns">
          <li class="btn-container">
            <button
              class="btn-card btn-transparent btn-sort btn-selected"
              id="data-sort-taste"
              @click="setSortParam('taste', $event), setActiveClass($event.target)"
            >Taste</button>
          </li>
          <li class="btn-container">
            <button
              class="btn-card btn-transparent btn-sort"
              id="data-sort-looks"
              @click="setSortParam('looks', $event), setActiveClass($event.target)"
            >Looks</button>
          </li>
          <li class="btn-container">
            <button
              class="btn-card btn-transparent btn-sort"
              id="data-sort-bun"
              @click="setSortParam('bun', $event), setActiveClass($event.target)"
            >Bun</button>
          </li>
          <li class="btn-container">
            <button
              class="btn-card btn-transparent btn-sort"
              id="data-sort-price"
              @click="setSortParam('price', $event), setActiveClass($event.target)"
            >€</button>
          </li>
        </ul>
      </section>

      <transition-group name="fade">
        <div
          class="product card"
          v-for="(product, index) in sortedProducts"
          v-bind:class="{lastCake : product.isLast === true}"
          v-bind:id="index"
          v-bind:item="product"
          v-bind:index="index"
          v-bind:key="product._id"
          v-bind:ref="product._id"
        >
          <div
            class="product-photo"
            :style="{ backgroundImage: `url('${getImagePath(product.imageFile)}')` }"
          ></div>

          <button class="btn-card btn-card-delete" v-on:click="deleteCake(product._id)">Delete</button>

          <ul class="product-stats">
            <li>
              <h5>TASTE</h5>
              <p class>{{product.taste}}</p>
            </li>
            <li>
              <h5>BUN</h5>
              <p class>{{product.bun}}</p>
            </li>
            <li>
              <h5>LOOKS</h5>
              <p class>{{product.looks}}</p>
            </li>

            <!-- <p class='date' v-if='product.modified'>{{product.modified}}</p>
            <p class='date' v-else-if='product.createdAt'>{{product.createdAt}}</p>-->
          </ul>

          <div class="container-rating-btns">
            <div class="btn-container">
              <button class="btn-card btn-dislike" v-on:click.once="rateCake(product, -1)">Buns down!</button>
            </div>
            <div class="btn-container">
              <button class="btn-card btn-like" v-on:click.once="rateCake(product, 1)">Buns up!</button>
            </div>
          </div>

          <div class="product-description-container">
            <div class="product-description">
              <div v-if="product.price" class="product-price">{{product.price}} €</div>
              <h3 v-if="searchCafe(shop.shop_id)">{{shop.name | capitalize}}</h3>
              <!-- <h3 v-if="product.shop_id === searchCafe[0]._id">{{searchCafe[0].name}}</h3> -->
              <div
                v-if="product.comment"
                v-on:click.prevent="toggleSelectedCommentId(index)"
                class="product-comment-icon"
              ></div>
            </div>
            <div class="product-location">
              <!-- <a
                :href="'https://www.google.com/maps/place/'
                + searchCafe(product.shop_id).address | address"
                target="_blank"
              >
                <div class="product-location-icon"></div>
                <div class="product-location-address">{{product.location | capitalize}}</div>
              </a> -->
            </div>
          </div>
          <div v-if="selectedCommentIndex ===index && showComment" class="comment-container">
            <div class="product-comment">
              <p>{{product.created_at}}</p>
              <p class="comment">{{product.comment}}</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/store'

export default {
  store,
  name: 'allCakesComponent',
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
      selectedBtn: null,
      sortParam: 'taste',
      isLast: {
        type: Boolean,
        value: false
      }
    }
  },

  mounted () {},
  created () {
    const sortButtons = document.querySelectorAll('.btn-sort')
  },

  methods: {
    async deleteCake (id) {
      await this.$store.dispatch('deleteOne', id)
    },

    getImagePath (path) {
      try {
        return require('./../assets/' + path)
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
      const selector = document.querySelector('#' + CSS.escape(id))
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
    },

    rateCake (product, val) {
      product.taste = Number(product.taste) + Number(val)
      const formData = new FormData()
      formData.append('taste', product.taste)
      formData.append('id', product._id)
      this.$store.dispatch('rateCake', formData)
    },

    searchCafe: function (shop_id) {
      //console.log('shop_id', shop_id )
      const allShops = this.shops.data
      console.log(allShops)
      // return allShops
      for (let i = 0; i < allShops.length; i++) {
        const foundShop = allShops[i];
        if (foundShop._id === shop_id) {
          console.log(foundShop.name)
          return foundShop.name
          // this.cafeName = foundShop.name
        }
      }
      // const cafeMatch =  allShops.filter(cafe => cafe._id === shop_id)
      // const cafeName = cafeMatch[0].name
      // console.log('cafeName', cafeName)
      // this.foundShop = cafeName
      //console.log('cafeMatch', cafeMatch)
      // return cafeMatch
    }
  },
  computed: {
    ...mapState(['products', 'shops']),

    sortedProducts: function () {
      if (this.products.length !== 0) {
        const sortedProducts = this.products.data
        // console.log('sortedProducts', sortedProducts)
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
  border-radius: 20px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: 0.5s all;
}
.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* CAKE */
.products-container {
  display: flex;
  flex-direction: column;
  min-width: 350px;
}
.product-photo {
  background-size: cover;
  height: 50vh;
  border-radius: 20px 20px 0 0;
}
.product-stats {
  margin: 12px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-grow: 1;
}
.product-stats > li > p {
  margin: 0 auto 5px;
  font-weight: 500;
  font-size: 1.4rem;
}
.product-description-container {
  display: flex;
  flex-direction: column;
  margin: 24px;
}
.product-price {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 1.4rem;
}
.product-description {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 0 8px;
}
.product-cafe-name {
  display: flex;
}
.product-location {
  display: flex;
  justify-content: flex-end;
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
  background: url(./../assets/location.svg) no-repeat center;
  width: 18px;
  background-size: 18px;
}
.date {
  font-size: 1em;
}
.comment-container {
  display: flex;
  margin: 0 24px;
}
.product-comment {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 300px;
}
.product-comment-icon {
  background: url(./../assets/comment.svg) no-repeat center;
  margin-left: 12px;
  width: 24px;
  background-size: 24px;
  cursor: pointer;
}

/* SORT */
.mobile-sort {
  display: none;
}
.sort-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  justify-content: space-around;
  margin: auto;
}

/* CONTAINER */
.container-rating-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

/* BUTTON */

.btn-card {
  padding: 12px 18px;
  color: midnightblue;
  font-size: 1rem;
  transition: 0.2s all;
}
.btn-selected {
  background-color: white;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.075);
}
.btn-selected:active {
  box-shadow: -3px 4px 0 #6c6ca4;
}
.btn-card-delete {
  position: absolute;
  margin: 12px;
  color: #00000099;
  background-color: rgba(255, 255, 255, 0.7);
}
.btn-like {
  color: white;
  background-color: midnightblue;
}
.btn-like:active {
  background-color: #6c6ca4;
}
.btn-dislike {
  color: white;
  background-image: linear-gradient(to right, #9fa7af, #b9b9c6);
  /* background-color: darkgrey; */
}
.btn-sort {
  flex-grow: 1;
  justify-content: center;
  margin: 0;
  font-size: 1.1rem !important;
  color: midnightblue;
  transition: 0.2s all;
  outline: 0;
}

/* FADE TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
