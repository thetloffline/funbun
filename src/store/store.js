import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const url = 'http://localhost:3000/api'
export default new Vuex.Store({
  state: {
    products: [],
    shops: []
  },

  mutations: {
    SET_PRODUCTS (state, productData) {
      state.products = productData
      console.log(productData)
    },

    SET_SHOPS (state, shopData) {
      state.shops = shopData
      console.log(shopData)
    }
  },

  actions: {
    async loadProducts ({ commit }) {
      try {
        const response = await axios.get(url + '/products')
        const productData = response.data
        commit('SET_PRODUCTS', productData)
      } catch (err) {
        console.log(err)
      }
    },

    async loadShops ({ commit }) {
      try {
        const response = await axios.get(url + '/shops')
        const shopData = response.data
        commit('SET_SHOPS', shopData)
      } catch (err) {
        console.log(err)
      }
    },

    async addProduct ({ commit }, payload) {
      for (var pair of payload.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      try {
        const response = await axios.post(url + '/products', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.dispatch('loadProducts')
        console.log(response.data)
      } catch (error) {
        console.log('addProduct error', error)
      }
    },

    async deleteOne ({ commit }, id) {
      try {
        const response = await axios.delete(url + id)
        this.dispatch('loadProducts')
        // console.log(response)
      } catch (err) {
        console.log('deleteOne error', err)
      }
    },

    async rateCake ({ commit }, payload) {
      try {
        const urlId = url + payload.get('id')
        const config = {
          headers: {
            'Content-Type': `text/plain; boundary=${payload._boundary}`
          }
        }
        const response = await axios.put(urlId, payload, config)
        this.dispatch('loadProducts')
        // console.log(response)
      } catch (err) {
        console.log('rateCake', err)
      }
    }
  },

  getters: {
    getCafeNames (state) {
      return [...new Set(state.products.map(cake => cake.cafeName))]
    },

    getCafeLocations (state) {
      return [...new Set(state.products.map(cake => cake.location))]
    },

    getCakeprices (state) {
      return [...new Set(state.products.map(cake => cake.price))]
    }
  }
})
