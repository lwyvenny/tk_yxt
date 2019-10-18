<template>
  <div class="page-center">
    <!-- 个人中心 二级路由页面 -->
    <div class="person-top">
      <div class="person-pic">
        <img src="http://m.189mv.cn/touch/images/user.png">
      </div>
      <div class="person-con">
        <router-link to="/login" class="person-con-a">欢迎您，{{userName.name}}</router-link>
      </div>
    </div>
    <div class="person-list">
      <ul style="border-bottom:1px solid #cbcbcb; background:#ffffff">
        <router-link to="/" tag="li">
          <img src="http://m.189mv.cn/xtouch/images/icon9.png" width="25">我的订单
        </router-link>
      </ul>
      <ul style="margin-top: 10px;border-bottom:1px solid #cbcbcb; background:#ffffff">
        <router-link to="/" tag="li">
          <img src="http://m.189mv.cn/xtouch/images/icon10.png" width="25">兑换券
        </router-link>
        <router-link to="/" tag="li">
          <img src="http://m.189mv.cn/xtouch/images/icon8.png" width="25">抵用券
        </router-link>
        <router-link to="/" tag="li">
          <img src="http://m.189mv.cn/xtouch/images/icon7.png" width="25">商企券
        </router-link>
        <router-link to="/" tag="li">
          <img src="http://m.189mv.cn/xtouch/images/icon11.png" width="25">影币
        </router-link>
      </ul>
      <ul style="margin-top: 10px;border-bottom:1px solid #cbcbcb; background:#ffffff">
        <router-link to="/" tag="li">
          <img src="http://m.189mv.cn/xtouch/images/points.png" width="25">电信积分换购
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .page-center{
    background: #eeeeee;
    .person-top{
      background-image: url('http://m.189mv.cn/xtouch/images/bg1.png');
      background-size: cover;
      padding-top: 5px;
      padding-bottom: 16px;
      text-align: center;
      .person-pic{
        width: 60px;
        height: 60px;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        border-radius: 30px;
        background-color: #FFF;
        img{
          width: 60px;
          height: 60px;
        }
      }
      .person-con{
        padding-top: 21px;
        padding-bottom: 11px;
        .person-con-a{
          color: #FFF;
          text-decoration:none;
        }
      }
    }
  .person-list ul li {
    border-top: 1px solid #cbcbcb;
    height: 50px;
    padding: 0px 10px;
    line-height: 50px;
    position: relative;
    img {
      margin-right: 10px;
      vertical-align:middle;
    }
  }
}
</style>

<script>
export default {
  name: 'Center',
  data () {
    return {
      userName: JSON.parse(window.localStorage.getItem('userinfo'))
    }
  }
}
</script>
