import axios from 'axios'

export default {
  namespaced: true,

  state: {
    cinemaList: []
  },
  getters: {

  },
  mutations: {
    setCinemaList (state, payload) {
      state.cinemaList = payload
    }
  },
  actions: {
    getCinemaLis ({ commit, state }, payload) {
      axios.get('http://m.maizuo.com/gateway', {
        params: {
          cityId: 440300,
          ticketFlag: 1,
          pageSize: 5,
          k: 9508163
        },
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"156976276517673790424440"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      })
        .then(response => {
          let result = response.data
          if(result.status === 0) {
            console.log(result.data.cinemas)
             commit('setCinemaList',result.data.cinemas)
          }
        })
    }
  }
}
