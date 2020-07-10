<template>
  <transition-group id="product-cards" name="fade">
    <div
      :key="product.productId"
      :class="{ lastCake: product.isLast === true }"
      class="product product-card round-corners"
    >
      <div
        v-if="product.feedback.length !== 0"
        :style="{
          backgroundImage: `url('${getImagePath(
            product.feedback[product.feedback.length - 1].productImage
          )}')`
        }"
        class="product-photo"
      />

      <div class="icon-btns-container">
      
          <div>
          <ul class="product-stats">
            <li>
              <h5>TASTE</h5>
              <p class="product-price">{{ product.avgTaste }}</p>
            </li>

            <li>
              <h5>LOOKS</h5>
              <p class="product-price">{{ product.avgLooks }}</p>
            </li>

            <li v-if="product.price" 
              >
              <h5>PRICE</h5>
              <p class="product-price">

              {{ product.price }} €
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="product-info">
        <div class="product-description-container">
          <div v-if="product.shop.address !== ''" class="product-location">
            <a
              :href="('https://www.google.com/maps/place/' + product.shop.address) | address"
              target="_blank"
            >
              <div class="product-location-icon" />
                <h5 class="shop-name">{{ product.shop.name | capitalize }}</h5>
                <h5 class="shop-name">{{ product.shop.address | capitalize }} </h5>
            </a>
          </div>
        </div>

        <div class="product-name">
          <h2 >{{ product.product.name | capitalize }}</h2>

          <div v-if="hasComment"
            @click.prevent="toggleSelectedCommentId(index, $event)"
            class="product-comment-icon"/>
        </div>

      
        
        <div
          v-if="selectedCommentIndex === index && showComment"
           @click.prevent="toggleSelectedCommentId(index)"
          class="comment-container">
          <div
            v-for="element in product.feedback"
            :key="element._id">
            <div v-if="element.comment"
              class="product-comment">
              <p class="date">{{ element.created_at | formatDate }}</p>
              <p class="comment">{{ element.comment }}</p>
            </div>
          </div>
        </div>

        <inlineForm
          :product="product.feedback"
          :index="index"
          :productId="product.productId"/>

      </div>
    </div>
  </transition-group>
</template>

<script>
import ProductFormInline from "./ProductFormInlineComponent.vue";
export default {
  name: "ProductCardComponent",
  components: {
    inlineForm: ProductFormInline
  },
  props: {
    product: {},
    index: ""
  },
  data() {
    return {
      selectedCommentIndex: "",
      showComment: ""
    };
  },

  computed: {
    hasComment() {
      return this.product.feedback.map(f => f.comment !== '').includes(true)
    }
  },

  mounted() {},
  created() {},

  methods: {
    getImagePath(path) {
      try {
        return "http://arvuti.local:3000/static/images" + "/" + path;
      } catch (error) {
        console.log("image replaced with placeholder. ", error.message);
        return require("./../assets/tuuletasku.jpg");
      }
    },

    toggleSelectedCommentId(id, e) {
      if (this.selectedCommentIndex === id) {
        this.selectedCommentIndex = "";
        this.showComment = false;
      } else {
        this.showComment = true;
        this.selectedCommentIndex = id;
        // this.scrollToComment(selector); does not work on Safari
        // this.SmoothVerticalScrolling(selector, 275, "center")
      }
    }
  }
};
</script>

<style scoped>
/* PRODUCT */
.product-card {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 2rem .4rem;
  box-shadow: 0 18px 24px rgba(0, 0, 0, 0.05); 
  /* background-image: linear-gradient(to right, #f6f9fc , #f6f3fc); */
  background-image: linear-gradient( rgba(255, 255, 255, 0), 10rem, rgba(255, 255, 255, 1));
  transition: 0.5s all;
}
.product-card:hover {
  box-shadow: 3px 42px 42px rgba(0, 0, 0, 0.15);
}
.round-corners {
  border-radius: 5rem;
}
.product-photo {
  background-size: cover;
  background-blend-mode: multiply;
  background-color: rgba(0, 0, 0, .25);
  height: 17.5rem;
  width: 100%;
  margin: 1.8rem auto 0;
  border-radius: 5rem 5rem 1.4rem 1.4rem;
}
.icon-btns-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: absolute;
  width: 100%;
  top: 15.4rem;
}
.product-name {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 6px 12px 2px;
}
.product-name>h2 {
  margin: .2rem .5rem .2rem 0;
}
.product-stats {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  margin: 0.3rem;
}
.product-stats > li > p {
  margin: .1rem auto;
  font-weight: 600;
  font-size: 1rem;
}
.product-description-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 18px 12px 6px;
}
.product-price {
  padding: .2rem 0.6rem;
  font-size: 1rem;
  font-weight: 900;
  color: darkslategray;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 2em;
  box-shadow: 3px 3px 12px rgba(5, 5, 5, 0.15);
}
.shop-name {
  display: flex;
  margin: 0 12px;
  font-size: .85rem;
}
.product-location {
  display: flex;
  justify-content: flex-end;
  margin: 0 12px;
}
.product-location > a {
  display: flex;
  align-items: center;
  color: darkslategray;
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
  margin: 24px 24px 30px;
}
.product-comment {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 8px 0;
}
.date {
  margin: 0;
  font-size: 0.8em;
  color: #b2b2cc;
}
.comment {
  margin: 2px 0;
}
.product-comment-icon {
  background: url(./../assets/comment.svg) no-repeat center;
  width: 22px;
  height: 22px;
  background-size: cover;
  cursor: pointer;
}
</style>
