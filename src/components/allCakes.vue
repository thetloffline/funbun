<template>
  <section class="cakes-section-wrapper">
    <div class='cakes-container'>
        <h1>Bun stats</h1>
      <section class="sort-controls">
        <h3>Sort the cakes by</h3>
        <ul>
          <li class="checked-sort" @click="setSortParam('taste')">The Taste</li>
          <li class="checked-sort" @click="setSortParam('looks')">The Looks</li>
          <li class="checked-sort" @click="setSortParam('bun')">The Bun</li>
          <li class="checked-sort" @click="setSortParam('price')">€</li>
        </ul>  
      </section>

      <transition-group name='fade'>
        <div class='cake card'
          v-for='(cake, index) in sortedCakes'
          v-bind:class='{lastCake : cake.isLast === true}'
          v-bind:id='index'
          v-bind:item='cake'
          v-bind:index='index'
          v-bind:key='cake._id'
          v-bind:ref="cake._id">

          <div class="cake-photo" :style="{ backgroundImage: `url('${getImagePath(cake.imageFile)}')` }"></div>
          
          <button class='btn btn-card btn-card-delete' v-on:click='deleteCake(cake._id)'>Delete</button>
          
          <ul class="cake-stats">
            <li>
              TASTE
              <p class=''>{{cake.taste}}</p>
            </li>
            <li>
              BUN
              <p class=''>{{cake.bun}}</p>
            </li>
            <li>
              LOOKS
              <p class=''>{{cake.looks}}</p>
            </li>

            <!-- <p class='date' v-if='cake.modified'>{{cake.modified}}</p>
            <p class='date' v-else-if='cake.createdAt'>{{cake.createdAt}}</p> -->
          </ul>
          
          <div class="container-rating-btns">
            <div class="btn-container">
              <button class='btn btn-card btn-dislike' v-on:click.once='rateCake(cake, -5)'>Buns down!</button>
            </div>
            <div class='btn-container'>
              <button class='btn btn-card btn-like' v-on:click.once='rateCake(cake, 5)'>Buns up!</button>
            </div>
          </div>

          <div class="cake-description-container">
            <div class="cake-description">
            <div v-if="cake.price" class="cake-price">
              {{cake.price}} €
            </div>
              <div class='cake-cafe-name'>{{cake.cafeName}}</div>
              <div v-if="cake.comment" 
              v-on:click.prevent="toggleSelectedId(index)"
              class="cake-comment-icon">
              </div>
            </div>
            <div class="cake-location"> 
              <div class='cake-location-icon'></div>
              <div class='cake-location-address'>{{cake.location}}</div>
            </div>
          
          </div>
          <div v-if="selectedIndex ===index && showComment"
            class="comment-container" 
            >
            <div class="cake-comment">
              <p>{{cake.createdAt}}</p>
              <p>
                {{cake.comment}}
              </p>
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
import FileUploadService from '../FileUploadService.js'

export default {
  store,
  name: 'allCakes',
  props: {},
  data () {
    return {
      selectedIndex: '',
      showComment: '',
      sortParam: 'taste',
      compareSort: 0,
      isLast: {
        type: Boolean,
        value: false
      }
    }
  },

  mounted () {},
  created () {},

  methods: {
    async deleteCake (id) {
       await this.$store.dispatch("deleteOne", id)
    },

    getImagePath (path) {
      try {
        return require('./../assets/' + path)
      } catch (error) {
        console.log('image replaced with placeholder. ', error.message)
        return require('./../assets/tuuletasku.jpg')
      }
    },

    setSortParam (sortParam, item) {
      this.sortParam = sortParam
      this.compareSort ++
    },

    toggleSelectedId (id) {
      const selector = document.querySelector("#" + CSS.escape(id) )//.childNodes[12].childNodes[0].childNodes[2]
      if (this.selectedIndex === id) {
        this.selectedIndex = ''
        this.showComment = false
      } 
      else {
        this.showComment = true
        this.selectedIndex = id
        this.scrollToComment(selector)
      }
    },

    scrollToComment(selector) {
      setTimeout(() => {  
        selector.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })
      }, 90)
    },

     rateCake (cake, val) {
      cake.taste = Number.parseInt(cake.taste) + Number.parseInt(val)
      const formData = new FormData()
      formData.append('taste', cake.taste)
      formData.append('id', cake._id)
      this.$store.dispatch('rateCake', formData)
    }
  /*   selected (item) {
      const liItems = document.querySelectorAll('.checked-sort')
      //this.clear()
      item.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
    }, */
    
    /* ,
    clear() {
      liItems.forEach(element => { 
        element.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
      });
    } */
    
  },
    computed: {
    ...mapState([
      'cakes'
    ]),

  /*   stats: function () {
      const cakesArr = this.cakes
      const taste = cakesArr.reduce((sum, cake) => {return sum + Number(cake.taste)}, 0)
      return taste
    }, */

    sortedCakes: function () {
      if (this.cakes.length !== 0) {
        const sortedCakes = this.cakes
        sortedCakes[sortedCakes.length-1].isLast = true
        
        sortedCakes.sort( (a,b) => {
          if (this.compareSort % 2 ) {
            if (parseInt(a[this.sortParam]) < parseInt(b[this.sortParam])) { return -1 }
            if (parseInt(a[this.sortParam]) > parseInt(b[this.sortParam])) { return 1 }
            else { return 0 }
          }
          else {
            if (parseInt(a[this.sortParam]) < parseInt(b[this.sortParam])) { return 1 }
            if (parseInt(a[this.sortParam]) > parseInt(b[this.sortParam])) { return -1 }
            else { return 0 }
          }
        })
        console.log('sortedCakes',this.sortParam)
        console.log('compareSort',this.compareSort)
        return sortedCakes
      }
    }
  }
}
</script>

<style scoped>

.content-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.cakes-section-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.poster {
  width: 260px;
  margin-top: 11.5vh;
  margin-bottom: 10.5vh;
  text-align: left;
}
.arrow {
  background: url(./../assets/arrow.svg) no-repeat center center ;
  background-size: 30px;
  height: 60px;
}

/* REFAKTOREERIDA */

.content-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.content {
  display: flex;
  justify-content: center;
  width: 355px;
  height: 33.3vh;
  margin-top: 33.3vh;
  margin-bottom: 33.3vh;
}
.cover-img {
  height: 67vh;
  background: url(./../assets/tuuletasku.jpg) no-repeat center center ;
  background-size: cover;
}
.section-header {
  width: 260px;
  margin: auto;
  padding: 0 0 30px 0;
}
.card {
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  /* border-radius: 1rem;*/
  background-color: white;
  transition: 0.5s all;
}
.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
.area {
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
  transition: 0.2s all;
}
/* CAKE */
.cakes-container {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  margin-top: 20vh;
}
.cake {
  padding: 0 0 12px; 
}
.cake-photo {
  background-size: cover;
  height: 50vh;
  border-radius: 20px 20px 0 0;
}
.cake-stats {
  margin: 12px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-grow: 1;
}
.cake-stats>div {
  padding: 0 30px
}
.cake-stats>li>p {
  padding: 0px 0px 5px 0px;
  margin: auto;
  font-weight: 700;
}
.cake-description-container {
  display: flex;
  flex-direction: column;
  margin: 18px;
}
.cake-price {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 1.4rem;
}
.cake-description {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.cake-cafe-name {
  display: flex;
  font-size: 1.5em;
  font-weight: 700;
}
.cake-location {
  display: flex;
  justify-content: flex-end;
}
.cake-location-address {
  display: flex;
  flex-direction: row;
  margin-left: 12px;
  font-size: 1.1rem;
}
.cake-location-icon {
  background: url(./../assets/location.svg) no-repeat center;
  width: 16px;
  background-size: 16px;
}
.date {
  font-size: 1em;
}
.cake-comment {
  max-width: fit-content;
  padding: 0 18px;
  text-align: left;
}
.cake-comment-icon {
  background: url(./../assets/comment.svg) no-repeat center;
  margin-left: 12px;
  width: 18px;
  background-size: 18px;
  cursor: pointer;
}
/* SORT */
.sort-controls>ul, .sort-controls>ul>li  {
  display: flex;
  flex-direction: row;
}
.sort-controls>ul {
  justify-content: space-evenly;
  margin-top: 5vh;
}
.sort-controls>ul>li {
  flex-grow: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  transition: 0.2s all;
  margin: 0;
}
.sort-controls>ul>li:hover {
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.sort-controls>ul>li:active {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.5);
}

/* CONTAINER */
.container-rating-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

/* BUTTON */
.btn-card {
  padding: 12px 15px;
  color:rgba(0, 0, 0, 0.6);
  /* margin: 12px; */
  font-size: 1rem;
  /* box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.21); */
  transition: 0.2s all;
}
.btn-card-delete {
  position: absolute;
  margin: 12px;
}
.btn-like {
  color: white;
  background-image: linear-gradient(to right, #39dc7a , #12d67e);
}
.btn-like:active {
  background-image: linear-gradient(to right, #36e97e , #12d67e);
}
.btn-dislike {
  color: white;
  background-image: linear-gradient(to right, #9fa7af, #b9b9c6);
  /* background-color: darkgrey; */
}

/* FADE TRANSITION */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
