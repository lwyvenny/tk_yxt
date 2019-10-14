import Vue from 'vue'
import Vuex from 'vuex'

import CinemasModule from './modules/cinemas'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cinema: CinemasModule
  }
})
export default store
