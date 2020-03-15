import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

Vue.use(vuex, axios)

export default new vuex.Store({
    state: { 
        test: 'testing 123'
    }  
})