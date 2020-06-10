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
        <div v-if="product.price" 
          class="product-price">
            {{ product.price }} €
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
              <div class="shop-name">
                <h3>{{ product.shop.name | capitalize }}</h3>
              </div>
            </a>
          </div>
        </div>

        <div id="product-name">
          <h2 class="product-name">{{ product.product.name | capitalize }}</h2>
        </div>

        <div>
          <ul class="product-stats">
            <li>
              <h5>TASTE</h5>
              <p>{{ product.avgTaste }}</p>
            </li>

            <li>
              <h5>LOOKS</h5>
              <p>{{ product.avgLooks }}</p>
            </li>

            <li v-if="product.feedback.length !== 0">
              <div class="product-comment-icon" @click.prevent="toggleSelectedCommentId(index)" />
            </li>
          </ul>
        </div>

        <inlineForm :product="product.feedback" :index="index" :productId="product.productId" />

        <div v-if="selectedCommentIndex === index && showComment" class="comment-container">
          <div v-for="element in product.feedback" :key="element._id">
            <div v-if="element.comment" class="product-comment">
              <p class="date">{{ element.created_at | formatDate }}</p>
              <p class="comment">{{ element.comment }}</p>
            </div>
          </div>
        </div>
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

  computed: {},

  mounted() {},
  created() {},

  methods: {
    getImagePath(path) {
      try {
        return "http://localhost:3000/static/images" + "/" + path;
      } catch (error) {
        console.log("image replaced with placeholder. ", error.message);
        return require("./../assets/tuuletasku.jpg");
      }
    },

    toggleSelectedCommentId(id) {
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
  margin: 36px 0;
  /* box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1); 
  background-color: white; */
  background-image: linear-gradient(45deg, white, #f6f9fc);
  transition: 0.5s all;
}
.product-card:hover {
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.2);
}
.round-corners {
  border-radius: 60px;
}
.product-photo {
  background-size: cover;
  height: 45vh;
  border-radius: 60px;
  box-shadow: 3px 3px 20px rgba(0,0,0, .2);
}
.icon-btns-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: absolute;
  /* margin: 12px 0 0 278px; */
  bottom: 18.5rem;
  right: 2rem;
}
.product-name {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 6px 12px 22px;
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
  margin: 18px 12px 6px;
}
.product-price {
  padding: .4rem 0.6rem;
  font-size: 1rem;
  font-weight: 900;
  color: midnightblue;
  background-color: #fcfdfe;
  border-radius: 2em;
  box-shadow: 3px 3px 12px rgba(5, 5, 5, 0.15);
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
  font-size: 0.8em;
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
</style>
