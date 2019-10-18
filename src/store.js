import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import {
  Toast
} from 'vant'

Vue.use(Vuex)

let store = new Vuex.Store({
  namespaced: true,
  state: {
    filmList: [], // 影片列表
    filmTotal: 1,
    filmListT: [],
    cinemaList: [], // 影院列表
    copycinemaList: [], // copy影院列表
    cinemaDetails: [], // 影院详情
    playDetails: [], // 获取影院的播放详情
    cities: [],
    cityId: 440300,
    cityName: '深圳',
    filmgather: [], // 影院电影列表
    cinemaFilm: [] // 影院电影详情
  },
  getters: {
    cityList (state) {
      let res = []
      state.cities.forEach(city => {
        let py = city.pinyin.charAt(0).toUpperCase()
        let index = res.findIndex(item => item.py === py)
        if (index > -1) {
          res[index].list.push(city)
        } else {
          let obj = {
            py: py,
            list: [city]
          }
          res.push(obj)
        }
      })
      return res.sort((a, b) => {
        return a.py.charCodeAt() - b.py.charCodeAt()
      })
    }
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
    },
    copycinemaList (state, payload) {
      state.copycinemaList = payload
    },
    setcinemaDetails (state, payload) {
      state.cinemaDetails = payload
    },
    setCities (state, payload) {
      state.cities = payload
    },
    setFilmListEm (state) {
      state.filmList = []
      state.filmListT = []
    },
    setCityId (state, payload) {
      state.cityId = payload
    },
    setCityName (state, payload) {
      state.cityName = payload
    },
    setfilmgather (state, payload) {
      state.filmgather = payload
    },
    setcinemaFilm (state, payload) {
      state.cinemaFilm = payload
    }
  },

  actions: {
    getCities ({
      commit,
      state
    }, payload) {
      Axios.get('https://m.maizuo.com/gateway?k=6826501', {
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"156975031917686675327153"}',
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then(response => {
        let result = response.data
        if (result.status === 0) {
          commit('setCities', result.data.cities)
        }
      })
    },
    getFilmList ({
      commit,
      state
    }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cityId: payload.cityId, // 城市ID
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
    getFilmListT ({
      commit,
      state
    }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cityId: 440300, // 城市ID
          pageNum: payload.pageNum, // 页码
          pageSize: payload.pageSize, // 每页显示条数
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
    getCinemaLis ({
      commit,
      state
    }, payload) {
      Toast.loading({
        mask: true,
        duration: 0, // 不让他自动消失
        message: '加载中...'
      })
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cityId: payload,
          ticketFlag: 1,
          pageSize: 5,
          k: 9508163
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"156976276517673790424440"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      })
        .then(response => {
          let result = response.data
          if (result.status === 0) {
            commit('setCinemaList', result.data.cinemas)
            commit('copycinemaList', result.data.cinemas)
            // 控制 Toast 消失
            Toast.clear()
          }
        })
    },
    // 这里请求影院数据详情
    getcinemaDetails ({
      commit,
      state
    }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cinemaId: payload, // 城市id
          k: 6351124 // 不知道
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"156976276517673790424440"}',
          'X-Host': 'mall.film-ticket.cinema.info'
        }
      })
        .then(response => {
          let result = response.data
          if (result.status === 0) {
            commit('setcinemaDetails', result.data.cinema)
          }
        })
    },
    // 影院 电影列表
    getfilmgather ({
      commit,
      state
    }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          cinemaId: payload.areaId,
          k: 3009503
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"156976276517673790424440"}',
          'X-Host': 'mall.film-ticket.film.cinema-show-film'
        }
      })
        .then(response => {
          console.log()
          let result = response.data
          if (result.status === 0) {
            commit('setfilmgather', result.data.films)

            payload.callback()
          }
        })
    },

    // 获取影院电影列表详情
    getcinemaFilm ({
      commit,
      state
    }, payload) {
      Axios.get('https://m.maizuo.com/gateway', {
        params: {
          filmId: payload.filmid,
          cinemaId: payload.cinemaId,
          date: payload.date,
          k: 8213169
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"156976276517673790424440"}',
          'X-Host': 'mall.film-ticket.schedule.list'
        }
      })
        .then(response => {
          let result = response.data
          if (result.status === 0) {
            commit('setcinemaFilm', result.data.schedules)
          }
        })
    }
  }
})

export default store
