<template>
  <div class="select-login">
    <div class="bottom">
      <img src="./images/lk_logo_sm.png" alt="" width="200">
    </div>
    <h4>选择登录方式</h4>
    <router-link tag='button' to="/login">手机登录</router-link>
  </div>
</template>
<script>
    export default {
        name:"SelectLogin",
        data () {
            return {
                
            }
        }
    }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  .select-login
    width 100%
    height 100%
    background-color #f5f5f5
    position fixed
    left 0
    top 0
    z-index 1000
    display flex
    flex-direction column
    justify-content center
    align-items  center
    .bottom
      position fixed
      top 130px
      left 50%
      margin-left -100px
    button
      width 80%
      height 38px
      background-color purple
      border none 
      border-radius 5px
      font-size 20px
      color #fff
      margin-top 30px
</style>
