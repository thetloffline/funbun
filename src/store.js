import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const url = 'http://localhost:3000/api/files/'
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
      const res = await axios.get(url)
      .then(res => {
        let cakesData = res.data
        console.log(cakesData)
        commit('SET_CAKES', cakesData)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getCakes ({ commit }) {
      this.getAllCakes()
    }
  },
  getters: {
    getAllCakes (state) { 
      console.log(state.cakes)
      return state.cakes
  }
  }
})