<template>
  <div class="setting">
      <div class="setting-top">
        <MeCommonCell leftIcon="zhlf-6" leftTitle="微信免密支付" :clickCell="handleBtnclick" />
        <MeCommonCell leftIcon="zhlf-20" leftTitle="免拼卡设置"  :clickCell="handleBtnclick"/>
        <MeCommonCell leftIcon="zhlf-19" leftTitle="消息接收设置" :clickCell="handleBtnclick" />
    </div>
    <div class="setting-top">
        <MeCommonCell leftIcon="zhlf-8" leftTitle="常见问题" :clickCell="handleBtnclick" />
        <MeCommonCell leftIcon="zhlf-7" leftTitle="意见反馈" :clickCell="handleBtnclick" />
    </div>
    <div class="setting-top">
        <MeCommonCell leftIcon="zhlf-10" leftTitle="商家免费入住" :clickCell="handleBtnclick" />
    </div>
    <div class="logout" @click="delLoginOut">退出登录</div>
  </div>
</template>

<script>
import MeCommonCell from './MeCommonCell'
import { Toast,MessageBox } from 'mint-ui'
import {mapActions} from 'vuex'
export default {
  name: 'MeSetting',
  data () {
    return {
      
    }
  },
  methods:{
    ...mapActions(["Logout"]),
    handleBtnclick(props){
        Toast('你点击了'+props)
    },
    delLoginOut() {
        MessageBox.confirm('确定要退出登录吗').then(action => {
            // console.log(action);
            if("confirm" === action) {
                this.Logout({});  //请求接口
                //返回主界面
                this.$router.push('/home') 
            }
        })
    }
  },
  components:{
    MeCommonCell
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
    .setting
        width 100%
        height 100%
        .setting-top
            margin-bottom 10px
        .logout
            height 40px
            line-height 40px
            width 100%
            background-color #fff
            text-align center
            margin-top 20px
</style>
