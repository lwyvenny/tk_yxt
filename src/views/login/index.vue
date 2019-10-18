<template>
  <div class="page-login">
    <header id="header">
      <span @click="back"></span>
    </header>
    <ul>
      <li>
        <span>用户名:</span><input type="text" placeholder="请输入用户名..." v-model="userName">
      </li>
      <li>
        <span>密码:</span><input type="password" placeholder="请输入密码...">
      </li>
    </ul>
    <div class="confirm">
      <div>点击-验证登录，就表示您同意<a href="#">《院线通会员章程》</a></div>
      <button class="login" @click="handleLogin">验证</button>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../assets/styles/mixin.scss';
.page-login{
  #header{
    height: 50px;
    background: linear-gradient(to right, #84159f , #5a119e);
    span{
      @include back;
      position: relative;
      left: 15px;
      top: 11px;
    }
  }
  ul{
    li{
      height: 40px;
      margin: 15px;
      span{
        display: inline-block;
        width: 60px;
        text-align: center;
      }
      input{
        padding-left: 10px;
        margin-left: 10px;
      }
    }
  }
  .confirm{
    padding: 0 15px;
    div{
      line-height: 20px;
      font-size: 10px;
      color: #565656;
      a{
        text-decoration: underline;
      }
    }
    .login{
      width: 100%;
      border: none;
      margin-top: 5px;
      text-align: center;
      height: 36px;
      box-shadow: 0px 3px 2px #531c60;
      background-color: #84159f;
      color: #FFF;
      line-height: 36px;
      font-size: 16px;
      border-radius: 3px;
    }
  }
}
</style>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    handleLogin () {
      let redirect = this.$route.query.redirect || '/films'
      window.localStorage.setItem('userinfo', JSON.stringify({ name: this.userName }))
      this.$router.replace(redirect)
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
