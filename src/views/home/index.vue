<template>
<!-- 一级路由页面 首页 -->
  <div class="page-home">
    <div class="header">
      <img src="http://m.189mv.cn/xtouch/images/newlogo.png">

      <span @click="handle">{{cityName}}</span>
    </div>
    <router-view></router-view>
    <ul class="nav">
      <router-link tag="li" to="/films">
        影片
      </router-link>
      <router-link tag="li" :to="`/cinemas`">
        影院
      </router-link>
      <router-link tag="li" to="/center">
        个人中心
      </router-link>
    </ul>
  </div>
</template>

<style lang="scss">
@import '../../assets/styles/mixin.scss';
.page-home{
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header{
    background: #84159f;
    height: 50px;
    img{
      height: 18px;
      top: 15px;
      left: 10px;
      width: 71px;
      position: absolute;
    }
    span{
      @include tri;
      float: right;
      padding-right: 35px;
      font-size: 14px;
      line-height: 50px;
      color: #fff;
      text-decoration: none;
    }
  }
  > div:nth-child(2){
    flex: 1;
    overflow-y: auto;
  }
  .nav{
    height: 48px;
    display: flex;
    li{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: 16px;
      color: #838383;
      &.router-link-active{
        color: #8a16ad;
        @include border-top;
      }
    }
  }
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState(['cityId', 'cityName'])
  },
  methods: {
    handle () {
      let path = this.$route.fullPath
      this.$router.push(`/city?path=${path}`)
    }
  }
}
</script>
