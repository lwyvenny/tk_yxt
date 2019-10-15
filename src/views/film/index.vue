<template>
  <div class="page-film">
    <header id="header">
      <span class="back" @click="handleback"></span>
      <div class="movie">{{detail.name}}</div>
    </header>
    <div class="film-info">
      <div class="film-box">
        <div class="item-img">
          <img
            :src="detail.poster"
          />
        </div>
        <div class="item-info">
          <ul class="item-list">
            <li>类型：{{detail.category}}</li>
            <li>演员：{{ detail.actors ? getFilmActors(detail.actors) : '' }}</li>
            <li>语言：{{ detail.language ? detail.language : '汉语普通话'}}</li>
            <li>片场：{{detail.runtime}}</li>
            <li>上映：2019-09-30</li>
            <li>影片类型：{{getType(detail.filmType)}} </li>
          </ul>
        </div>
        <div class="score">7.0</div>
      </div>
      <div class="buyP">立即购票</div>
    </div>
    <div class="juqing">
      <p class="ju">剧情</p>
      <p class="juqing-info synopsis" :style="{ height : isOK ? '60px' : '' }">
        <span>{{detail.synopsis ? detail.synopsis : '暂无'}}</span>
      </p>
      <i @click="down" class="film-synopsis" v-if="isOK"></i>
      <i @click="up" class="film-synopsishid" v-else></i>
    </div>
    <div class="juzhao juqing">
      <p class="ju">片花 剧照</p>
      <p class="juqing-info">暂无剧照</p>
    </div>
    <div class="juqing juzhao">
      <p class="ju">综合评论</p>
      <p class="juqing-info">
        <span>暂无评论</span>
      </p>
    </div>
    <div class="juqing juzhao">
      <p class="ju">用户点评</p>
      <p class="juqing-info">暂无评论</p>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/styles/mixin.scss";
.page-film {
  background: #f2f2f2;
  #header {
    height: 50px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    line-height: 50px;
    background: linear-gradient(to right, #84159f, #5a119e);
    color: #fff;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    .back {
      @include back;
      position: relative;
      left: -45%;
      top: 11px;
    }
  }
  .film-info {
    color: #fff;
    margin-top: 50px;
    height: 218px;
    padding: 10px;
    line-height: 1;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    background: #798082;
    .film-box {
      position: relative;
      display: flex;
      .item-img {
        img {
          display: block;
          width: 102px;
          height: 156px;
        }
      }
      .item-info {
        position: relative;
        padding: 0px 70px 0px 15px;
        width: 218px;
        .item-list {
          padding-top: 12px;
          overflow: hidden;
          width: 113px;
          li {
            font-size: 12px;
            height: 15px;
            padding-bottom: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .score {
        color: #df7300;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 26px;
      }
    }
    .buyP {
      height: 32px;
      box-shadow: 0px 3px 2px #501b5f;
      background-color: #84159f;
      color: #fff;
      text-align: center;
      line-height: 32px;
      font-size: 14px;
      border-radius: 3px;
      margin-top: 10px;
    }
  }
  .juqing {
    .synopsis{
      overflow: hidden;
    }
    background: #fff;
    .ju {
      height: 18px;
      padding-left: 13px;
      line-height: 18px;
      font-size: 16px;
      font-weight: bold;
    }
    padding: 16px 10px 12px;
    .juqing-info {
      margin-bottom: 24px;
      padding: 10px 10px 0 15px;
      line-height: 20px;
      position: relative;
      font-size: 14px;
      color: #000;
      span {
        padding-bottom: 24px;
      }
    }
    .juqing-hidinfo {
      margin-bottom: 24px;
      padding: 10px 10px 0 15px;
      line-height: 20px;
      position: relative;
      font-size: 14px;
      color: #000;
    }
    .film-synopsis {
      display: block;
      width: 10px;
      height: 10px;
      border-right: 2px solid #592a7d;
      border-bottom: 2px solid #592a7d;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      margin: 0 auto;
      right: 49%;

    }
    .film-synopsishid {
        display: block;
        width: 10px;
        height: 10px;
        border-right: 2px solid #592a7d;
        border-bottom: 2px solid #592a7d;
        -webkit-transform: rotate(45deg);
        transform: rotate(225deg);
        margin: 0 auto;
        position: relative;
        top: 5px;
      }
  }
  .juzhao {
    margin-top: 10px;
  }
}
</style>

<script>
import axios from 'axios'
export default {
  name: 'Film',
  computed: {},
  data () {
    return {
      isOK: true,
      filmInfo: [],
      filmInfo2: [],
      detail: {}
    }
  },
  watch: {
    filmInfo2 (val) {
      val.map(item => {
        if (this.$route.params.id == item.filmId) {
          this.detail = item
        }
      })
    },
    filmInfo (val) {
      val.map(item => {
        if (this.$route.params.id == item.filmId) {
          this.detail = item
        }
      })
    }
  },
  methods: {
    down () {
      this.isOK = false
    },
    up () {
      this.isOK = true
    },
    getType (type) {
      for (var key in type) {
        return type[key]
      }
    },
    getFilmActors (actors) {
      let tmp = actors.map(item => {
        return item.name
      })
      return tmp.join('.')
    },
    handleback () {
      this.$router.go(-1)
    }
  },
  created () {
    axios.get('https://m.maizuo.com/gateway', {
      params: {
        cityId: 440300, // 城市ID
        pageNum: 1, // 页码
        pageSize: 29, // 每页显示条数
        type: 1, // 影片类型，正在热映1，即将上映2
        k: 9818915
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157079477920169166422068"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(response => {
      let result = response.data
      if (result.status === 0) {
        this.filmInfo = result.data.films
      }
    })
    axios.get('https://m.maizuo.com/gateway', {
      params: {
        cityId: 440300, // 城市ID
        pageNum: 1, // 页码
        pageSize: 24, // 每页显示条数
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
        this.filmInfo2 = result.data.films
      }
    })
  }
}
</script>
