import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const url = 'http://arvuti.local:3000/api/files/'
export default new Vuex.Store({
  state: {
    cakes: []
  },

  mutations: {
    SET_CAKES (state, cakesData) {
      state.cakes = cakesData
    }
  },

  actions: {
    async loadCakes ({ commit }) {
      try {
        const response = await axios.get(url)
        const cakesData = response.data
        commit('SET_CAKES', cakesData)
      } catch (err) {
        console.log(err)
      }
    },

    async addNewCake ({ commit }, payload) {
      try {
        const response = await axios.post(url, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.dispatch('loadCakes')
        console.log(response.data)
      } catch (error) {
        console.log('addNewCake error', error)
      }
    },

    async deleteOne ({ commit }, id) {
      try {
        const response = await axios.delete(url + id)
        this.dispatch('loadCakes')
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
        this.dispatch('loadCakes')
        // console.log(response)
      } catch (err) {
        console.log('rateCake', err)
      }
    }
  },

  getters: {
    getCafeNames (state) {
      return [...new Set(state.cakes.map(cake => cake.cafeName))]
    },

    getCafeLocations (state) {
      return [...new Set(state.cakes.map(cake => cake.location))]
    },

    getCakeprices (state) {
      return [...new Set(state.cakes.map(cake => cake.price))]
    }
  }
})
