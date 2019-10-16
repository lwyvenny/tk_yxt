<template>
  <div class="page-cinmeasdetails">
    <p class="null">
      <van-icon size="25px" name="arrow-left" />
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
            <div>3D眼睛</div>
            <div>
              <van-icon color="#ffb232" size="12px" name="arrow" />
            </div>
          </div>
          <div class="cinemas-site">
            <i class="iconfont icon-dizhi"></i>
            <div class="site">{{cinemaDetails.address}}</div>
            <i class="iconfont icon-dianhua3 phone"></i>
          </div>
          <div class="swiper-container box">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img
                  src="https://pic.maizuo.com/usr/movie/5ba8d5bad40b57054a2d5a365c8501ac.jpg"
                  alt
                />
              </div>
              <div class="swiper-slide">
                <img
                  src="https://pic.maizuo.com/usr/movie/5ba8d5bad40b57054a2d5a365c8501ac.jpg"
                  alt
                />
              </div>
              <div class="swiper-slide">
                <img
                  src="https://pic.maizuo.com/usr/movie/5ba8d5bad40b57054a2d5a365c8501ac.jpg"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'CinemaInfo',
  data () {
    return {
      siteId: '' // 影院Id
    }
  },
  computed: {
    ...mapState(['cinemaDetails'])
  },
  methods: {
    ...mapActions(['getcinemaDetails'])
  },
  created () {
    this.siteId = this.$route.params.id
    this.getcinemaDetails(this.siteId)
  },
  mounted () {
    new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      slideToClickedSlide: true,
      centeredSlides: true
    })
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/reset.scss";
.page-cinmeasdetails {
  height: 100%;
  width: 100%;
  .box {
    width: 100%;
    height: 120px;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
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

    .cinemas-info {
      display: flex;
      flex-direction: column;
      overflow-y: auto;

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
        .site {
          flex: 1;
          font-size: 14px;
          padding: 0 12px;
        }

        .phone {
          width: 67px;
          height: 18px;
        }
      }
    }
  }
}
</style>
