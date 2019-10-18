<template>
  <div class="now-list">
    <p class="film-title">正在热映</p>
    <ul>
      <router-link tag="li" :to="`/film/${film.filmId}?img=${film.poster}`" v-for="film in filmList" :key="film.filmId">
        <div class="left">
          <img :src="film.poster" />
        </div>
        <div class="center">
          <div class="name">{{film.name}}</div>
          <div class="actors">{{ film.actors ? getActors(film.actors) : '' }}</div>
        </div>
        <div class="right">
          <div
            class="grade"
            :style="{ visibility : film.grade ? 'initial' : 'hidden' }"
          >{{getScore(film.grade)}}</div>
          <button class="buy">购票</button>
        </div>
      </router-link>
    </ul>
    <div class="more" ref="more">
      <span @click="handleMore">查看更多影片</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Now',
  computed: {
    ...mapState(['filmList', 'filmTotal', 'cityId'])
  },
  data () {
    return {
      curPageNum: 1,
      type: 1
    }
  },
  methods: {
    ...mapMutations(['setFilmListEm']),
    ...mapActions(['getFilmList']),
    getActors (actors) {
      let tmp = actors.map(item => {
        return item.name
      })
      return tmp.join('.')
    },
    handleMore () {
      let totalPage = Math.ceil(this.filmTotal / 5)
      if (this.curPageNum >= totalPage) {
        this.$refs.more.style.display = 'none'
      }
      this.curPageNum++
      this.getFilmList({
        pageNum: this.curPageNum,
        type: this.type,
        cityId: this.cityId
      })
    },
    getScore (score) {
      if (score) {
        score = Number(score)
        return score.toFixed(1)
      }
    }
  },
  created () {
    if (this.filmList.length <= 0) {
      this.getFilmList({
        pageNum: this.curPageNum,
        type: this.type,
        cityId: this.cityId
      })
    } else {
      this.curPageNum = this.filmList.length / 5
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/mixin.scss";
.now-list {
  .film-title {
    background: #faf7fe;
    line-height: 40px;
    font-size: 14px;
    padding: 0 15px;
    font-weight: 600;
    color: #7d1796;
  }
  ul {
    padding: 15px 10px;
    li {
      @include border-bottom;
      display: flex;
      height: 96px;
      padding: 15px 0;
      .left {
        img {
          width: 72px;
          height: 96px;
          display: block;
        }
      }
      .center {
        flex: 1;
        overflow: hidden;
        padding-left: 15px;
        .name {
          font-size: 14px;
          color: #000000;
          font-weight: 600;
        }
        > div {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 130px;
          font-size: 12px;
          line-height: 20px;
          color: #777;
        }
      }
      .right {
        .grade {
          font-size: 26px;
          font-weight: bold;
          padding-left: 18px;
          color: #830fa6;
          line-height: 35px;
          height: 35px;
        }
        .buy {
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
  .more {
    span {
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
