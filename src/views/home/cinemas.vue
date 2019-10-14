<template>
  <div class="page-cinemas">
    <!-- 二级路由页面 -->
    <div class="cinema-list">
      <van-search
        class="box"
        v-model="searchVal"
        show-action
        @focus="cancelText = '取消'"
        placeholder="请输入搜索内容"
        @input="cancelText='确认'"
      >
        <template v-slot:action>
          <span>{{cancelText}}</span>
        </template>
      </van-search>
      <div class="select">全城
      </div>
      <div class="search-box">
        <div>
          <div v-for="cinemas in cinemaList" :key="cinemas.cinemaId" class="cinemas-cont">
            <router-link class="a" tag="div" to="/particulars/dawd">
              <div class="cinemas-name">
                <div>{{cinemas.name}}</div>
                <div class="cinemas-money">
                  <span>￥</span>
                  {{cinemas.lowPrice/100}}
                  <span>元起</span>
                </div>
              </div>
              <p class="cinemas-site">{{cinemas.address}}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import { mapState, mapActions } from "vuex";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      searchVal: "", // 输入框的valu值
      cancelText: "" // 控制取消按钮是否存在
    };
  },
  computed: {
    ...mapState("cinema", ["cinemaList"])
  },
  methods: {
    ...mapActions("cinema", ["setCinemaLis"]),
    ...mapActions("cinema", ["getCinemaLis"])
  },
  mounted() {
    this.getCinemaLis();
    let bs = new BScroll(".search-box", {
      probeType: 3
    });
  }
};
</script>
<style lang="scss">
@import "../../components/common/mixins.scss";
.page-cinemas {
  display: flex;
  flex-direction: column;
  height: 100%;
  .cinema-list {
    .search-box {
      height: 500px;
      width: 95%;
      margin: 0 15px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .cinemas-name {
        font-size: 14px;
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cinemas-cont {
        @include border-bottom;
        padding: 12px 0 8px 0;
        font-size: 14px;

        .cinemas-money {
          margin-right: 20px;
          margin-left: 10px;
          color: #ff5f16;

          span {
            font-size: 10px;
          }
        }
        .a {
          overflow: hidden;

          .cinemas-site {
            margin: 15px 0 5px 0;
            color: #797d82;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .box {
      background: #fff;

      .van-search__content {
        border: 1px solid #83149f;
        border-radius: 6px;
        height: 30px;
        z-index: 999;
        background: #fff;
      }
    }

    .select {
      margin: 5px 40%;
        position: relative;
      ::after {
        position: absolute;
        content: "";
        top: 22px;
        right: 18px;
        border-top: 8px solid #fff;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
      }
    }
  }
}
</style>
