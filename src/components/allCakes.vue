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
        </ul>  
      </section>

      <transition-group name='fade'>
        <div class='cake card'
          v-for='(cake, index) in sortedCakes'
          v-bind:class='{lastCake : cake.isLast === true}'
          v-bind:item='cake'
          v-bind:index='index'
          v-bind:key='cake._id'>

          
          <div class="cake-photo" :style="{ backgroundImage: `url('${getImagePath(cake.imageFile)}')` }"></div>
          
          <button class='btn btn-small secondary-btn' v-on:click='deleteCake(cake._id)'>Delete</button>
          
          <div class="cake-stats">
            <div>
              TASTE
              <p class=''>{{cake.taste}}</p>
            </div>
            <div>
              BUN
              <p class=''>{{cake.bun}}</p>
            </div>
            <div>
              LOOKS
              <p class=''>{{cake.looks}}</p>
            </div>

            <!-- <p class='date' v-if='cake.modified'>{{cake.modified}}</p>
            <p class='date' v-else-if='cake.createdAt'>{{cake.createdAt}}</p> -->
          </div>
          <div class="cake-description">
            <div class='cake-cafe-name'>{{cake.cafeName}}</div>
            <div class='cake-location'>{{cake.location}}</div>
          </div>
        </div>
      </transition-group>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import FileUploadService from '../FileUploadService.js'

export default {
  store,
  name: 'allCakes',
  props: {},
  data () {
    return {
      /* cakes: [], */
      sortParam: 'taste',
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
      await FileUploadService.deleteEntry(id)
       //this.removeClassLastCake()
       this.$store.dispatch('loadCakes')
    },

    /* removeClassLastCake () {
      const lastCakes = document.querySelectorAll('.cake')
      lastCakes.forEach(element => {
        console.log(element)
        element.classList.remove('lastCake')
      });
    }, */

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
      //this.selected(item)
    },

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
          if (parseInt(a[this.sortParam]) < parseInt(b[this.sortParam])) { return 1 }
          if (parseInt(a[this.sortParam]) > parseInt(b[this.sortParam])) { return -1 }
          else { return 0 }
        })
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
.add-icon-round {
  display:flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin: auto;
  width: 56px;
  height: 56px;
  background-color: #F2C94C;
  border-radius: 30px;
  color: white;
  font-size: 3rem;
  font-weight: 400;
}
.add-icon-round:active {
  background-color: #F9C62D;
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
  height: 65vh;
  border-radius: 20px 20px 0 0;
}
.cake-stats {
  height: 60px;
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-grow: 1;
}
.cake-stats>div {
  padding: 0 30px
}
.cake-stats>div>p {
  padding: 5px;
}
.cake-description {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 10px 16px;
}
.cake-cafe-name {
  display: flex;
  font-size: 2em;
}
.cake-location {
  display: flex;
  font-size: 1.4em;
}
.date {
  font-size: 1em;
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
/* BUTTON */
.btn-container {
  display: flex;
  margin: 10px 0px 10px 0px;
}
.btn {
  /* margin: 0 10px; */
  padding: 15px;
  font-size: 21px;
  color: white;
  font-weight: 500;
  border-radius: 3rem;
  border-style: none;
  transition: .1s all;
}
.primary-btn {
  background-image: linear-gradient(to right, #39dc7a , #20dc87);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
.primary-btn:hover {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.primary-btn:active {
  background-image: linear-gradient(to right, #42dd80 , #24e68f);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
}
.btn-small {
  position: absolute;
  margin: 10px;
  padding: 15px;
  color:rgba(0, 0, 0, 0.6);
  font-size: 14px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
