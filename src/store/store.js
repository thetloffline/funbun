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
      try {
        return new Promise( async (resolve, reject) => {
          const res = await axios.get(url)
          let cakesData = res.data
          resolve(
            commit('SET_CAKES', cakesData)
            )
          })
        } catch (err) {
          console.log(err)
        }
      },
      
      async addNewCake ({ commit }, payload) {
        return new Promise( async (resolve, reject) => {
          try {
            const response = await axios.post(url, payload,{ headers: {
              'Content-Type': 'multipart/form-data'
            }})
              resolve(
              this.dispatch('loadCakes')
              )
              console.log(response.data)
            } catch (error) {
              reject(
                'addNewCake error', error
                )
              }
            })
          },
          
          async deleteOne ({ commit }, id) {
            return new Promise(async (resolve, reject) => { 
              try {
                await axios.delete(url+id)
                resolve(
                this.dispatch('loadCakes')
                )
                console.log(response)
              } catch (error) {
                reject(
                  'deleteOne error', error
                  )
              }
            })
          },

          async rateCake ({ commit }, payload) {
            return new Promise( async (resolve, reject) => {
              try {
                const url_id = url + payload.get('id')
                const config = {
                  headers: {
                      'Content-Type': `text/plain; boundary=${payload._boundary}`
                  }}
                const response = await axios.put(url_id, payload, config)
                resolve(
                  this.dispatch('loadCakes')
                )
              } catch (error) {
                reject('rateCake', error)
              }
            })
          },

           rateCake2 ({ commit }, payload) {
            const url_id = url + payload.get('id')
            const config = { 
              headers: {
                  'Content-Type': `text/plain; boundary=${payload._boundary}`
              }
            }
            const response = axios.put(url_id, payload, config)
              .then(data => {
                console.log('data', data)
              })
              .then(() => this.dispatch('loadCakes'))
              .catch(error => {
                console.log(error)
              }) 
            }
          
        },

        getters: {
          getCafeNames ( state) { 
            return state.cakes.map(cake => cake.cafeName)
          },

          getCafeLocations ( state) { 
            return state.cakes.map(cake => cake.location)
          } 
        }
      })