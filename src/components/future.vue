<template>
  <div class="future-list">
    <p class="film-title">即将上映</p>
    <ul>
      <router-link tag="li" :to="`/film/${film.filmId}?img=${film.poster}`" v-for="film in filmListT" :key="film.filmId">
        <div class="left">
          <img :src="film.poster">
        </div>
        <div class="fcenter">
          <div class="name">{{film.name}}</div>
          <div class="actors">{{ film.actors ? getActors(film.actors) : '' }}</div>
          <div class="emp"></div>
          <div class="time">上映日期：{{getTime(film.premiereAt)}}</div>
        </div>
      </router-link>
    </ul>
    <div class="more" ref="more">
      <span @click="handleMoreT">查看更多影片</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions,mapMutations } from 'vuex'
export default {
  name: 'Future',
  computed: {
    ...mapState(['filmListT', 'filmTotal','cityId'])

  },
  data () {
    return {
      curPageNumT: 1
    }
  },
  methods: {
    ...mapMutations(['setFilmListEm']),
    ...mapActions(['getFilmListT']),
    getActors (actors) {
      let tmp = actors.map(item => {
        return item.name
      })
      return tmp.join('.')
    },
    getTime (premiereAt) {
      let time = new Date(1970, 0, 1)
      time.setTime(time.getTime() + premiereAt * 1000)
      return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
    },
    handleMoreT () {
      let totalPage = Math.ceil(this.filmTotal / 5)
      if (this.curPageNumT >= totalPage) {
        this.$refs.more.style.display = 'none'
      }
      this.curPageNumT++
      this.getFilmListT({
        pageNum: this.curPageNumT,
        pageSize: 3,
        cityId:this.cityId
      })
    }
  },
  created () {
    if (this.filmListT.length <= 0) {
      this.getFilmListT({
        pageNum: this.curPageNumT,
        pageSize: 3,
        cityId:this.cityId
      })
    } else {
      this.curPageNumT = this.filmListT.length / 3
    }
    if(this.filmListT.length > 0 && this.$route.query.cityId){
      this.$store.commit('setFilmListEm')
      console.log(this.filmList)
      this.getFilmList({
        pageNum: this.curPageNumT,
        type: this.type,
        cityId:this.$route.query.cityId || 440300
      })
    }
  }

}
</script>

<style lang="scss">
@import '../assets/styles/mixin.scss';
.future-list{
  .film-title{
    background: #faf7fe;
    line-height: 40px;
    font-size: 14px;
    padding: 0 15px;
    font-weight: 600;
    color: #7d1796;
  }
  ul{
    padding: 15px 10px;
    li{
      @include border-bottom;
      display: flex;
      height: 96px;
      padding: 15px 0;
      .left{
        img{
          width: 72px;
          height: 96px;
          display: block;
        }
      }
      .fcenter{
        flex: 1;
        overflow: hidden;
        padding-left: 15px;
        .name{
          font-size: 14px;
          color: #000000;
          font-weight: 600;
        }
        .emp{
          height: 20px;
        }
        > div{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 12px;
          line-height: 20px;
          color: #777;
        }
      }
      .right{
        .grade{
          font-size: 26px;
          font-weight: bold;
          padding-left: 18px;
          color: #830fa6;
          line-height: 35px;
          height: 35px;
        }
        .buy{
          width: 50px;
          line-height: 24px;
          font-weight: bold;
          font-size: 14px;
          border: 1px solid #830fa6;
          color: #830fa6;
          background: #fff;
          border-radius: 5px;
          margin-top: 10px;
        }
      }
      &:last-child::after {
        display: none;
      }
    }
  }
  .more{
    span{
      display: block;
      @include more;
      width: 45%;
      height: 26px;
      margin: 5px auto;
      text-align: center;
      background: #faf7fe;
      color: #744ca6;
      font-size: 12px;
      line-height: 26px;
    }
  }
}
</style>
