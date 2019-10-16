<template>
  <div class="page-city" ref="scroll">
    <!-- 一级路由页面 -->
      <div>
        <div class="header">
          <p><i class="iconfont icon-dayu" @click="goBack"></i>选择城市</p>
        </div>
        <div class="hot_city">
          <table>
            <tbody>
              <p>热门城市</p>
              <div v-for="item in cityList" :key="item.list">
                <div v-for="city in item.list" :key="city.cityId">
                  <div class="tr">
                    <div class="td" v-if="city.isHot">
                      {{ city.name }}
                    </div>
                  </div>
                </div>
              </div>
            </tbody>
          </table>
        </div>
        <div class="cur-word">
          <p>按字母</p>
          <ul>
            <li v-for="item in cityList" :key="item.py" @click="fn1(item)">{{ item.py }}</li>
          </ul>
        </div>

        <div  ref="box" class="box">
          <table class="showCity" v-for="item in cityList" :key="item.py" :id="`city-${item.py}`">

            <p style=" color: #83139B;font-size:16px;font-weight:600;">{{ item.py }}</p>
            <ul>
              <li v-for="city in item.list" :key="city.cityId">{{ city.name }}</li>
            </ul>

        </table>
        </div>
      </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Bscroll from 'better-scroll'

export default {
  name: 'City',

  computed: {
    ...mapGetters(['cityList'])
  },
  methods: {
    ...mapActions(['getCities']),
    goBack () {
      this.$router.back()
    },
    fn1 (item) {
      let dom = document.getElementById(`city-${item.py}`)
      let top = dom.offsetTop
      this.$refs.box.scrollTop = top - 20
      console.log(this.$refs.box.scrollTop)
    }

  },
  mounted () {
    let bs = new Bscroll(this.$refs.scroll, {
      probeType: 2
    })
    bs.on('scroll', () => {
      console.log(123)
    })
  },
  created () {
    this.getCities()
  }

}
</script>

<style lang="scss">
@import '../../assets/styles/mixin.scss';
.page-city{
  width: 100%;
  background: #ececec;
  position: relative;
  padding-bottom: 20px;
  .header{
      background: #84159f;
      height: 50px;
      i{
        color: #FFF;
        font-size: 22px;
        float: left;
        padding-left: 10px;
      }
      p{
        text-align: center;
        line-height: 50px;
        color: #FFF;
        margin-right: 22px;
        font-size: 16px;
      }
  }
    .hot_city{
      width: 100%;
      background: #FFF;
      margin:auto;
      margin-top: 20px;
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
      }
      .tr{
        width: 100%;
        .td{
        float: left;
        line-height: 50px;
        border: 1px solid #d8d8d8;
        box-sizing: border-box;
        width: 25%;
        text-align: center;
      }
      }
      p{
        float: left;
        font-size: 20px;
        line-height: 50px;
        width: 100%;
        padding-left: 15px;
      }
    }
    .cur-word{
      width: 100%;
      background: #FFF;
      margin:auto;
      margin-top: 20px;

      p{
        font-size: 20px;
        height: 50px;
        box-sizing: border-box;
        line-height: 50px;
        width: 100%;
        padding-left: 15px;
      }
      ul{
        border: 1px solid #d8d8d8;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        li{
          width: 25%;
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          color: #83139B;
          font-weight: 600;
        }
      }
    }
    .box{
      width: 100%;
      position: absolute;
      top: 544px;
      background: #ececec;
      overflow-x: scroll
    }
    .showCity{
      width: 343px;
      background: #FFF;
      margin:auto;
      margin-top: 20px;
      text-align: center;
      // display: none
      p{
        width: 25%;
        line-height: 100px;
        float: left;
      }
      ul{
        li{
          width: 25%;
          height: 50px;
          line-height: 50px;
          float: left;
          font-size: 12px;
          box-sizing: border-box;
          overflow: hidden;
        }
      }
    }
}

</style>
