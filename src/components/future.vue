<template>
  <div class="now-list">
    <p class="film-title">即将上映</p>
    <ul>
      <li v-for="film in filmListT" :key="film.filmId">
        <div class="left">
          <img :src="film.poster">
        </div>
        <div class="fcenter">
          <div class="name">{{film.name}}</div>
          <div class="actors">{{ film.actors ? getActors(film.actors) : '' }}</div>
          <div class="emp"></div>
          <div class="time">上映日期：{{getTime(film.premiereAt)}}</div>
        </div>
      </li>
    </ul>
    <div class="more" ref="more">
      <span @click="handleMoreT">查看更多影片</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Future',
  computed: {
    ...mapState(['filmListT', 'filmTotal'])

  },
  data () {
    return {
      curPageNumT: 1
    }
  },
  methods: {
    ...mapActions(['getFilmListT']),
    getActors (actors) {
      let tmp = actors.map(item => {
        return item.name
      })
      return tmp.join('.')
    },
    getTime (premiereAt) {
      let time = new Date(2019, 9, 31)
      time.setTime(time.getTime() + premiereAt)
      return time.getFullYear() + '年' + time.getMonth() + '月' + time.getDate() + '日'
    },
    handleMoreT () {
      let totalPage = Math.ceil(this.filmTotal / 5)
      if (this.curPageNumT >= totalPage) {
        this.$refs.more.style.display = 'none'
      }
      this.curPageNumT++
      this.getFilmListT({
        pageNum: this.curPageNumT
      })
    }
  },
  created () {
    if (this.filmListT.length <= 0) {
      this.getFilmListT({
        pageNum: this.curPageNumT
      })
    }
  }

}
</script>

<style lang="scss">
@import '../assets/styles/mixin.scss';
.now-list{
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
