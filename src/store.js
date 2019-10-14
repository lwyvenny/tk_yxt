import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store =  new Vuex.Store({
  state: {
    filmList: [] // 影片列表
  },
  mutations: {
    setFilmList (state, payload) {
      state.filmList = payload
    }
  },
  actions: {
    getFilmList (context, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cityId: 440300, // 城市ID
          pageNum: 1, // 页码
          pageSize: 10, // 每页显示条数
          type: 1, // 影片类型，正在热映1，即将上映2
          k: 9818915
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157079477920169166422068"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(response => {
        let result = response.data
        console.log(result.data.films)
        if(result.status === 0 ){
          context.commit('setFilmList',result.data.films)
        }
      })
    }
  }

})

export default store
