import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)
const url = 'http://arvuti.local:3000/api'
export default new Vuex.Store({
  state: {
    shops: [],
    products: [],
    feedback: [],
    productId: '',
    shopId: '',
    productName: '',
    inlineFormId: '',
    selectedButton: 'avgTaste',
    sortDirection: 1
  },

  mutations: {
    SET_PRODUCTS (state, productData) {
      state.products = productData
    },

    SET_PRODUCT_NAME (state, name) {
      state.productName = name
    },

    SET_SHOPS (state, shopData) {
      state.shops = shopData
    },

    SET_FEEDBACK (state, feedbackData) {
      state.feedback = feedbackData
    },

    SET_INLINEFORM_ID (state, formClicked) {
      state.inlineFormId = formClicked
    },

    SET_SORT_DIRECTION (state, sortDirectionUpdated) {
      state.sortDirection = sortDirectionUpdated
    },

    SET_SORT_BUTTON (state, selectedButton) {
      state.selectedButton = selectedButton
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
        } catch (error) {
          console.log('addProduct error', error)
        }
      } else {
        this.productId = foundProduct._id
      }
    },

    async setProductName ({ commit }, payload) {
      commit('SET_PRODUCT_NAME', payload)
    },

    async addFeedback ({ commit }, payload) {
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

    async updateProductPrice ({ commit }, payload) {
      try {
        const urlId = url + '/product/' + payload.id
        const response = await axios.put(urlId, { price: payload.price })

        const foundProduct = await this.state.products.findIndex(product => (product._id === response.data.data._id))

        const updatedProducts = this.state.products.slice()
        updatedProducts[foundProduct] = response.data.data
        commit('SET_PRODUCTS', updatedProducts)

        /* this.state.feedback.push(response.data.data) */
      } catch (err) {
        console.log('updateProductPrice', err)
      }
    },

    async toggleInlineForm ({ commit }, payload) {
      commit('SET_INLINEFORM_ID', payload)
    },

    async setSelectedButton ({ commit }, payload) {
      commit('SET_SORT_BUTTON', payload)
    },

    async setSortDirection ({ commit }, payload) {
      commit('SET_SORT_DIRECTION', payload)
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

    productName (state) {
      return state.productName
    },

    isFormOpen (state) {
      return state.inlineFormId
    },

    aggregatedFeedback (state) {
      const arr = []
      for (let i = 0; i < state.products.length; i++) {
        const aggregate = {}
        const product = state.products[i]
        aggregate.isLast = false
        aggregate.product = product
        aggregate.productId = product._id

        const foundShop = state.shops.find(shop => (shop._id === product.shopId))
        aggregate.shop = foundShop

        const foundFeedback = state.feedback.filter(f => f.productId === product._id)
        aggregate.feedback = foundFeedback

        const calcTasteAvg = foundFeedback.filter(f => f.taste !== 0).map(f => f.taste).reduce((acc, current) => acc + Number(current), 0) / foundFeedback.length
        aggregate.avgTaste = Math.round(calcTasteAvg * 1) / 10

        const calcLooksAvg = foundFeedback.filter(f => f.looks !== 0).map(f => f.looks).reduce((acc, current) => acc + Number(current), 0) / foundFeedback.length
        aggregate.avgLooks = Math.round(calcLooksAvg * 1) / 10

        aggregate.price = product.price[product.price.length - 1]

        arr.push(aggregate)
      }
      return arr
    },

    sortDirection (state) {
      return state.sortDirection
    },

    selectedSortButton (state) {
      return state.selectedButton
    }
  }
})
