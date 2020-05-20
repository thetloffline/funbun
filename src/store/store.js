import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)
const url = 'http://localhost:3000/api'
export default new Vuex.Store({
  state: {
    shops: [],
    products: [],
    feedback: [],
    productId: {
      type: String,
      value: false
    },
    shopId: {
      type: String,
      value: false
    },
    inlineFormId: ''
  },

  mutations: {
    SET_PRODUCTS (state, productData) {
      state.products = productData
    },

    SET_SHOPS (state, shopData) {
      state.shops = shopData
    },

    SET_FEEDBACK (state, feedbackData) {
      state.feedback = feedbackData
    },
    SET_INLINEFORM (state, formClicked) {
      state.inlineFormId = formClicked
    }
  },

  actions: {
    async loadProducts ({ commit }) {
      try {
        const response = await axios.get(url + '/products')
        const productData = response.data.data
        commit('SET_PRODUCTS', productData)
      } catch (err) {
        console.log(err)
      }
    },

    async loadShops ({ commit }) {
      try {
        const response = await axios.get(url + '/shops')
        const shopData = response.data.data
        commit('SET_SHOPS', shopData)
      } catch (err) {
        console.log(err)
      }
    },

    async loadFeedback ({ commit }) {
      try {
        const response = await axios.get(url + '/feedback')
        const feedbackData = response.data.data
        commit('SET_FEEDBACK', feedbackData)
      } catch (err) {
        console.log(err)
      }
    },

    async addShop ({ commit }, payload) {
      const foundShop = await this.state.shops.find(shop => (shop.name === payload.get('name') && shop.address === payload.get('address')))

      if (foundShop === undefined || foundShop === '') {
        try {
          const response = await axios.post(url + '/shops',
            payload, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
          this.shopId = response.data.data._id
          this.state.shops.push(response.data.data)
          // this.dispatch('loadShops')
        } catch (error) {
          console.log(error)
        }
      } else {
        this.shopId = foundShop._id
      }
    },

    async addProduct ({ commit }, payload) {
      const foundProduct = await this.state.products.find(product => (product.name === payload.get('name') && Number(product.price) === Number(payload.get('price')) && product.shopId === this.shopId))

      if (foundProduct === undefined || foundProduct === '') {
        try {
          payload.set('shopId', this.shopId)
          const response = await axios.post(url + '/products', payload, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.productId = response.data.data._id
          this.state.products.push(response.data.data)
          // this.dispatch('loadProducts')
        } catch (error) {
          console.log('addProduct error', error)
        }
      } else {
        this.productId = foundProduct._id
      }
    },

    async addFeedback ({ commit }, payload) {
      console.log(payload.get('productImage'))
      if (payload.get('productId') === '' || payload.get('productId') === null || payload.get('productId') === undefined) {
        payload.set('productId', this.productId)
      }

      try {
        const response = await axios.post(url + '/feedback', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.state.feedback.push(response.data.data)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteOne ({ commit }, id) {
      try {
        const response = await axios.delete(url + id)
        this.dispatch('loadProducts')
      } catch (err) {
        console.log('deleteOne error', err)
      }
    },

    async rateProduct ({ commit }, payload) {
      try {
        const urlId = url + '/feedback/' + payload.get('id')
        const config = {
          headers: {
            'Content-Type': `text/plain; boundary=${payload._boundary}`
          }
        }
        const response = await axios.put(urlId, payload, config)
        this.state.feedback.push(response.data.data)
      } catch (err) {
        console.log('rateProduct', err)
      }
    },

    async toggleInlineForm ({ commit }, payload) {
      commit('SET_INLINEFORM', payload)
    }
  },

  getters: {
    shopNames (state) {
      return [...new Set(state.shops.map(shop => shop.name))]
    },

    shopAddresses (state) {
      return [...new Set(state.shops.map(shop => shop.address))]
    },

    productNames (state) {
      return [...new Set(state.products.map(product => product.name))]
    },

    isFormOpen (state) {
      return state.inlineFormId
    },

    aggregatedFeedback (state) {
      const arr = []
      for (let i = 0; i < state.products.length; i++) {
        const cardData = {}
        const product = state.products[i]
        cardData.product = product
        cardData.productId = product._id

        const foundShop = state.shops.find(shop => (shop._id === product.shopId))
        cardData.shop = foundShop

        const foundFeedback = state.feedback.filter(f => f.productId === product._id)
        cardData.feedback = foundFeedback

        const calcTasteAvg = foundFeedback.map(f => f.taste).reduce((acc, current) => acc + Number(current), 0) / foundFeedback.length

        const calcLooksAvg = foundFeedback.map(f => f.looks).reduce((acc, current) => acc + Number(current), 0) / foundFeedback.length

        cardData.price = product.price
        cardData.avgTaste = Math.round(calcTasteAvg * 10) / 10
        cardData.avgLooks = Math.round(calcLooksAvg * 10) / 10

        arr.push(cardData)
      }
      return arr
    }
  }
})
