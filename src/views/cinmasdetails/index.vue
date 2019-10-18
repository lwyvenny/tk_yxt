<template>
  <div class="page-cinmeasdetails">
    <p class="null">
      <van-icon size="25px" name="arrow-left" @click="rollback" />
    </p>
    <div class="cinemas-name">
      <h3>{{cinemaDetails.name}}</h3>
    </div>
    <div class="cinemas-wrap">
      <div class="y">
        <div class="cinemas-info">
          <div class="tags">
            <div>儿童票</div>
            <div>停车票</div>
            <div>3D眼镜</div>
            <div>
              <van-icon color="#ffb232" size="12px" name="arrow" />
            </div>
          </div>
          <div class="cinemas-site">
            <i class="iconfont icon-dizhi"></i>
            <div class="site">{{cinemaDetails.address}}</div>
            <i class="iconfont icon-dianhua3 phone"></i>
          </div>

          <div class="bim">
            <div class="swiper-bg box" :style="`background:url(${filmintro.poster})`"></div>

            <div class="swiper-container box">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(gather,index) in filmgather" :key="index">
                  <img :src="`${gather.poster}`" alt />
                </div>
              </div>
            </div>
          </div>
          <div class="film-title-box">
            <div class="film-title">
              <div class="title">
                <h4>{{filmintro.name}}</h4>
                <div class="grade">{{filmintro.grade}}</div>
                <span>分</span>
              </div>
            </div>
            <div class="intro-box">
              <div
                class="intro"
              >{{filmintro.category}}|{{filmintro.runtime}}分钟|{{filmintro.director}}</div>
            </div>
          </div>
          <div class="partition"></div>
          <div class="time-box">
            <div
              v-for="(time,index) in showDate"
              :key="index"
              @click="fn3(index,showDate[index])"
              :class="cur == index ? 'active' : ''"
            >{{fn1(time)}}:{{fn2(time)}}</div>
          </div>
          <div
            class="rail"
            :style="{'left' : cur === 0? '0' : cur === 1 ? '31%' : cur === 2 ? '63%' : '0'}"
          >
            <span></span>
          </div>
        </div>
        <div>
          <ul>
            <li class="schedule-item" v-for="film in cinemaFilm" :key="film.scheduleId">
              <div class="start">
                {{fn4(film.showAt)}}
                <p>{{fn5(film.endAt)}}</p>
              </div>
              <div class="language">
                <div>{{film.filmLanguage}}</div>
                <p>{{film.hallName}}</p>
              </div>
              <div class="price">
                <span>￥</span>
                {{film.salePrice/100}}
              </div>
              <div class="buy">购买</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import moment from 'moment'
import { format } from 'path'
export default {
  name: 'CinemaInfo',
  data () {
    return {
      siteId: '', // 影院Id
      filmintro: '', // 保存影片简介
      showDate: '', // 保存时间日期
      cur: '0', //
      date: 1571328000 // 用于保存传入的时间戳，用于下次请求的参数
    }
  },
  computed: {
    ...mapState(['cinemaDetails']),
    ...mapState(['filmgather']),
    ...mapState(['cinemaFilm'])
  },
  methods: {
    ...mapActions(['getcinemaDetails']),
    ...mapActions(['getfilmgather']),
    ...mapActions(['getcinemaFilm']),
    fn1 (date) {
      let dataNum = date * 1000
      let a = dataNum - new Date()
      moment.locale('zh-cn')
      return moment(a).calendar('', {
        // 调用moment插件事件格式化时间
        sameDay: '[今天]',
        nextDay: '[明天]',
        nextWeek: 'ddd',
        lastWeek: 'ddd',
        sameElse: 'ddd'
      })
    },
    fn2 (date) {
      let dataNum = date * 1000
      return moment(dataNum).format('MMMDo')
    },
    fn3 (index, date) {
      this.date = date
      this.cur = index
      this.getcinemaFilm({
        filmid: this.filmintro.filmId,
        date: this.date,
        cinemaId: this.siteId
      })
    },
    fn4 (date) {
      let dataNum = date * 1000
      return moment(dataNum).format('h:mm')
    },
    fn5 (date) {
      let dataNum = date * 1000
      return moment(dataNum).format('h:mm')
    },
    rollback () {
      this.$router.back()
    }
  },
  created () {
    let _this = this

    this.siteId = this.$route.params.id

    this.getcinemaDetails(this.siteId)
    this.getfilmgather({
      callback: () => {
        this.$nextTick(() => {
          this.filmintro = this.filmgather[0] // 初始化影片详情
          this.showDate = this.filmgather[0].showDate // 初始化时间
          this.getcinemaFilm({
            filmid: this.filmintro.filmId,
            cinemaId : this.siteId,
            date: this.date
          })

          new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            slideToClickedSlide: true,
            centeredSlides: true,
            on: {
              slideChangeTransitionEnd: function () {
                _this.filmintro = _this.filmgather[this.activeIndex]
                _this.showDate = _this.filmintro.showDate
                _this.getcinemaFilm({
                  filmid: _this.filmintro.filmId,
                  date: _this.date
                })
              }
            }
          })
        })
      },
      areaId: this.siteId
    })
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/reset.scss";
@import "../../assets/styles/mixin.scss";
// .y{
//   overflow-y: auto;
// }
.page-cinmeasdetails {
  height: 100%;
  width: 100%;
  // overflow: hidden;
  .swiper-bg {
    filter: blur(15px);
  }
  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      margin-top: 10px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.8);
      img {
        width: 100%;
      }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
  }
  .null {
    margin: 25px 0 0 15px;
  }

  .cinemas-name {
    display: flex;
    justify-content: space-around;
    h3 {
      height: 50px;
      line-height: 50px;
    }
  }

  .cinemas-wrap {
    width: 100%;
    position: relative;
    .cinemas-info {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      position: relative;
      .tags {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: #ffb232;
        overflow: hidden;
        position: relative;
        padding: 5px 0 15px;
        > div {
          border: 1px solid #ccc;
          position: relative;
          padding: 2px 6px;
          margin: 0 2.5px;
          font-size: 10px;
        }
        :last-child {
          border: none;
        }
      }

      .cinemas-site {
        display: flex;
        margin-left: 15px;
        margin-top: 30px;
        height: 40px;
        width: 300px;
        .site {
          flex: 1;
          font-size: 14px;
          padding: 0 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .phone {
          width: 67px;
          height: 18px;
        }
      }

      .bim {
        position: relative;
        height: 130px;
        overflow: hidden;
      }

      .film-title-box {
        display: flex;
        flex-direction: column;

        .film-title {
          display: flex;
          justify-content: space-around;
          // margin-top: 20px;
          padding: 15px 0;
          .title {
            display: flex;
            h4 {
              font-size: 15px;
              color: #191a1b;
            }
            .grade {
              margin-left: 10px;
              font-size: 16px;
              font-style: italic;
              color: #ffb232;
            }

            span {
              margin-left: 5px;
              font-size: 10px;
              color: #ffb232;
            }
          }
        }

        .intro-box {
          display: flex;
          justify-content: space-around;

          .intro {
            color: #797d82;
            font-size: 13px;
            padding: 0 12%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .partition {
        margin: 20px 0;
        @include border-bottom;
      }

      .time-box {
        display: flex;
        height: 40px;
        align-items: center;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;

        .active {
          color: #ff5f16;
        }

        > div {
          height: 40px;
          margin-left: 10px;
        }
      }

      .rail {
        height: 2px;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100px;
        transition: left 0.3s;
        span {
          display: block;
          width: 90%;
          height: 2px;
          background: #ff5f16;
          margin-left: 10px;
        }
      }
    }

    .schedule-item {
      display: flex;
      justify-content: space-around;
      padding-top: 20px;
      position: relative;
      .start {
        p {
          margin-top: 10px;
          color: #797d82;
        }
      }

      .language {
        width: 50px;

        p {
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          margin-top: 10px;
          color: #797d82;
        }
      }

      .price {
        color: #ff5f16;
        span {
          font-size: 12px;
        }
      }

      .buy {
        @include border;
        font-size: 12px;
        color: #ff5f16;
        text-align: center;
        line-height: 20px;
        width: 40px;
      }
    }
  }
}
</style>
