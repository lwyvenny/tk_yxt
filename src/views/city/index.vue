<template>
  <div class="page-city">
    <!-- 一级路由页面 -->
      <div class="header">
        <p><i class="iconfont icon-dayu" @click="goBack"></i>选择城市</p>
      </div>
      <div class="hot_city" style="">
        <table>
          <tbody>
            <tr>
              <td colspan="4">热门城市</td>
            </tr>
            <tr>
              <td>三亚</td>
              <td>重庆</td>
              <td>北京</td>
              <td>上海</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'City',

  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixin.scss';
.page-city{
  width: 100%;
  height: 100%;
  background: #ececec;
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
        width: 345px;
        height: 156px;
        background: #FFF;
        margin:auto;
        margin-top: 20px;
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        td{
          line-height: 50px;
          border: 1px solid #d8d8d8;
          width: 25%;
          text-align: center;
        }
      }
}

</style>
