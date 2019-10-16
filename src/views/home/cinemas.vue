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
          <span @click="searchCancel">{{cancelText}}</span>
        </template>
      </van-search>
      <div class="select" v-show="listShow" @click="isShow = !isShow">{{crea === '' ? '全城' : crea}}</div>
      <transition name="select">
        <div class="city-box" v-show="isShow" @click="isShow = !isShow">
          <div class="city-select">
            <div
              @click="highlight(creaDefault,creaDefault)"
              :class="highlightarea == creaDefault ? 'city-color' : ''"
            >全城</div>
            <div
              v-for="(crea,index) in areaList"
              :key="index"
              @click="highlight(index,crea)"
              :class=" highlightarea == index ? 'city-color' : '' "
            >{{crea}}</div>
          </div>
        </div>
      </transition>
      <div class="search-box" v-if="listShow">
        <div>
          <div v-for="cinemas in cinemaList" :key="cinemas.cinemaId" class="cinemas-cont">
            <router-link class="a"  :to="`/cinemas/${cinemas.cinemaId}`">
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
      <!-- 搜索展示版 -->
      <div v-else>
        <ul class="seek-hide">
          <li class="seek-boox" v-for="item in showList" :key="item">
            <span class="seek-name">{{item.name}}</span>
            <span class="seek-money">￥{{item.lowPrice/100}}元起</span>
            <div class="seek-site">{{item.address}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { Toast } from "vant";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      searchVal: "", // 输入框的valu值
      cancelText: "", // 控制取消按钮是否存在
      isShow: false, // 控制地区选择
      highlightarea: "全城", // 地区高亮
      crea: "", // 点击的某个地区
      creaList: [], // 保存地区的影院数据
      creaDefault: "全城", // 地区选择默认值
      listShow: true, // 判断是否显示展示板
      showList: [] //搜索结果
    };
  },
  computed: {
    ...mapState(["cinemaList"]),
    ...mapState(["copycinemaList"]),
    // 地区集合
    areaList() {
      //console.log(this.copycinemaList)
      let tmp = this.copycinemaList.map(tiem => {
        // console.log(tiem.districtName)
        return tiem.districtName;
      });
      return Array.from(new Set(tmp));
    }

  },
  methods: {
    ...mapActions(["getCinemaLis"]),

    // 存储地区
    highlight(index, crea) {
      this.highlightarea = index;
      this.crea = crea;
    },

    // 根据地区拿到电影院数据
    selectArea() {
      if (this.crea == "全城") {
        this.$store.commit("setCinemaList", this.copycinemaList);
        return;
      }
      for (var i = 0; i < this.copycinemaList.length; i++) {
        if (this.crea == this.copycinemaList[i].districtName) {
          this.creaList.push(this.copycinemaList[i]);
        }
      }

    },
    // 点击搜索或取消按钮
    searchCancel() {
      this.showList = [];
      this.cancelText = "";
      if (this.cancelText == "取消") {
        this.listShow = true;
      } else {
        this.listShow = false;
        let tmp = this.cinemaList.filter(area => {
          return area.name.indexOf(this.searchVal) > -1;
        });
        this.showList.push(...tmp);
      }
    }
    // inputArea() {

    // }
  },
  watch: {
    crea() {
      this.creaList = [];
      this.selectArea();
    },
    creaList(newVal) {
      if (this.crea != "全城") {
        this.$store.commit("setCinemaList", newVal);
      }
    },
    searchVal() {
      if (this.searchVal == "") {
        this.cancelText = "取消";
        this.listShow = true;
      }
    }
  },
  mounted() {
    this.getCinemaLis();
    let bs = new BScroll(".search-box", {
      probeType: 3,
      click : true
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
        position: relative;
        .cinemas-money {
          margin-right: 20px;
          margin-left: 10px;
          color: #ff5f16;

          span {
            font-size: 10px;
          }
        }
        .a {
          display: block;
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
      @include triangle;
      margin: 5px 42%;
      position: relative;
    }
    //地区选择动画

    .city-box {
      position: absolute;
      top: 128px;
      background: red;
      width: 100%;
      height: 400px;
      z-index: 9999;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.7);

      .city-select {
        z-index: 99999;
        width: 100%;
        height: 200px;
        background: #fff;
        opacity: 1;

        > div {
          margin: 10px 10px;
          @include border2;
          width: 25%;
          float: left;
          color: #797d82;
          height: 30px;
          line-height: 27px;
          text-align: center;
          font-size: 12px;
        }

        .city-color {
          color: #ff5f16;
          @include border3;
        }
      }
    }
    .select-enter,
    .select-leave-to {
      height: 0px;
    }
    .select-enter-active,
    .select-leave-active {
      transition: height 0.3s;
    }
    .seek-hide {
      display: flex;
      flex-direction: column;
      .seek-boox {
        padding: 15px 0 5px 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .seek-name {
          font-size: 14px;
          padding: 3px 0;
        }

        .seek-money {
          color: #ff5f16;
          margin-left: 15px;
        }

        .seek-site {
          margin-top: 8px;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

