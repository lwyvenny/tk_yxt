import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    filmList: [], // 影片列表
    filmTotal: 1,
    filmListT: [],
    cinemaList: []
  },
  mutations: {
    setFilmList (state, payload) {
      state.filmList = payload
    },
    setFilmTotal (state, payload) {
      state.filmTotal = payload
    },
    setFilmListT (state, payload) {
      state.filmListT = payload
    },
    setCinemaList (state, payload) {
      state.cinemaList = payload
    }
  },
  actions: {
    getFilmList ({ commit, state }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cityId: 440300, // 城市ID
          pageNum: payload.pageNum, // 页码
          pageSize: 5, // 每页显示条数
          type: payload.type, // 影片类型，正在热映1，即将上映2
          k: 9818915
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157079477920169166422068"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(response => {
        let result = response.data
        if (result.status === 0) {
          commit('setFilmList', state.filmList.concat(result.data.films))
          commit('setFilmTotal', result.data.total)
        }
      })
    },
    getFilmListT ({ commit, state }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cityId: 440300, // 城市ID
          pageNum: payload.pageNum, // 页码
          pageSize: 3, // 每页显示条数
          type: 2, // 影片类型，正在热映1，即将上映2
          k: 9818915
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157079477920169166422068"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(response => {
        let result = response.data
        if (result.status === 0) {
          commit('setFilmListT', state.filmListT.concat(result.data.films))
          commit('setFilmTotal', result.data.total)
        }
      })
    },
    getCinemaLis ({ commit, state }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
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
          if (result.status === 0) {
            commit('setCinemaList', result.data.cinemas)
          }
        })
    }
  }

})

export default store
