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
            :src="`${this.$route.query.img}`"
          />
        </div>
        <div class="item-info">
          <ul class="item-list">
            <li>类型：{{detail.category}}</li>
            <li>演员：{{ detail.actors ? getFilmActors(detail.actors) : '' }}</li>
            <li>语言：{{ detail.language ? detail.language : '汉语普通话'}}</li>
            <li>片长：{{detail.runtime}}分钟</li>
            <li>上映：{{getTime(detail.premiereAt)}}</li>
            <li>影片类型：{{getType(detail.filmType)}} </li>
          </ul>
        </div>
        <div class="score">{{getScore(detail.grade)}}</div>
      </div>
      <!-- <div class="buyP">立即购票</div> -->
      <router-link to='/cinemas' tag="div" class="buyP">立即购票</router-link>
    </div>
    <div class="juqing">
      <p class="ju">剧情</p>
      <p class="juqing-info synopsis" :style="{ height : isOK ? '60px' : '' }"> <!-- 控制剧情内容 -->
        <span>{{detail.synopsis ? detail.synopsis : '暂无'}}</span>
      </p>
      <i @click="down" class="film-synopsis" v-if="isOK"></i>
      <i @click="up" class="film-synopsishid" v-else></i>
    </div>
    <div class="juzhao juqing">
      <p class="ju">片花 剧照</p>
      <p class="juqing-info img-list">
        <img v-for="item in detail.photos" :key="item" :src="`${item}`" >
      </p>
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
    .img-list{
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;
      img{
        width: 150px;
        height: 100px;
        margin-right: 10px;
        flex-shrink: 0
      }
    }
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
      detail: {}
    }
  },
  methods: {
    down () {
      this.isOK = false
    },
    up () {
      this.isOK = true
    },
    getType (type) { // 获取影片类型  2D/3D
      for (var key in type) {
        return type[key]
      }
    },
    getFilmActors (actors) { // 获取演员列表
      let tmp = actors.map(item => {
        return item.name
      })
      return tmp.join('.')
    },
    handleback () {
      this.$router.go(-1)
    },
    getTime (premiereAt) { // 获取上映时间
      let time = new Date(1970, 0, 1)
      time.setTime(time.getTime() + premiereAt * 1000)
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
    },
    getScore (score) { // 评分
      if (score) {
        score = Number(score)
        return score.toFixed(1)
      }
    }
  },
  created () {
    axios.get('https://m.maizuo.com/gateway', {
      params: {
        filmId: this.$route.params.id,
        k: 1700185
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157101801120925080666158"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(response => {
      let result = response.data
      if (result.status === 0) {
        this.detail = result.data.film
      }
    })
  }
}
</script>
