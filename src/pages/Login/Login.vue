<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png" alt="" width="250">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">短信登录</a>
          <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}" >
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button 
              v-if="!countDown" 
              class="get-verification" 
              :class="{phone_right:phoneRight}"
              @click.prevent="getPhone">
              获取验证码
            </button>
              <button v-else disabled="disabled" class="get-verification" >已发送({{countDown}}s)</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册评多多帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名/手机/邮箱" v-model="user_name">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="pwdMode" v-model="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch-show">
                    <img @click.prevent="dealpwdMode(false)"  :class="{on: pwdMode}" src="./images/hide_pwd.png" alt="" width="20">
                    <img @click.prevent="dealpwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt="" width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img 
                  ref="captcha"
                  class="get-verification" 
                  src="http://localhost:3000/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login()">登录</button>
        </form>
        <button class="login-back" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getSendCode, PhoneCodeLogin, pwdLogin } from "./../../api/index";
import { Toast } from "mint-ui";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loginMode: true, //登录选项卡    true代表手机验证码登录  false代表密码登录
      phone: "", //手机号码
      countDown: 0, //倒计时
      pwdMode: true, //密码验证显示和隐藏
      pwd: "", //密码
      code: "", //验证码
      userInfo: {}, //用户信息
      user_name: "", //用户名
      captcha: "" //图形验证码
    };
  },
  computed: {
    //手机号码验证
    phoneRight() {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone);
    }
  },
  methods: {
    ...mapActions(["asyncPhoneCode"]),
    dealLoginMode(flag) {
      //登录切换
      this.loginMode = flag;
    },
    async getPhone() {
      //验证码倒计时
      if (this.phoneRight) {
        this.countDown = 60;
        this.timer = setInterval(() => {
          this.countDown--;
          //判断
          if (this.countDown == 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      }
      //获取验证码
      let result = await getSendCode(this.phone);
      console.log(result);
      //判断验证码失败
      if (result.err_code == 0) {
        Toast({
          //弹出框
          message: result.message,
          position: "center",
          duration: 5000
        });
      }
    },
    dealpwdMode(flag) {
      //密码显示和隐藏
      this.pwdMode = flag;
    },
    //获取图形验证码
    getCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:3000/api/captcha?time=" + new Date();
    },
    //登录
    async login() {
      //登录模式
      if (this.loginMode) {
        //验证码登录

        if (!this.phone) {
          Toast({ message: "手机号码不能为空" });
          return;
        } else if (!this.phoneRight) {
          Toast({ message: "请输入正确的手机号" });
          return;
        } else if (!this.code) {
          Toast({ message: "验证码不能为空" });
          return;
        } else if (!/^\d{6}$/gi.test(this.code)) {
          Toast({ message: "请输入正确的验证码" });
          return;
        }
        // 登录请求
        const result = await PhoneCodeLogin(this.phone, this.code);
        //判断是否登录成功
        if (result.success_code === 200) {
          this.userInfo = result.message;
        } else {
          this.userInfo = {
            message: "登录失败,验证码或者手机号不对"
          };
        }
      } else {
        //账号密码登录
        // 前端校验
        if (!this.user_name) {
          Toast({ message: "用户名不能为空" });
          return;
        } else if (!this.pwd) {
          Toast({ message: "密码不能为空" });
          return;
        } else if (!this.captcha) {
          Toast({ message: "验证码不能为空" });
          return;
        }
        // 登录请求
        const result = await pwdLogin(this.user_name, this.pwd, this.captcha);
        console.log(result);
        /* if (result.success_code === 200) {
          this.userInfo = result.message;
        } else {
          this.userInfo = {
            message: "登录失败, 手机号或验证码不正确!"
          };
        } */
      }
      //最后登录处理
      if (!this.userInfo.id) {
        Toast(this.userInfo.message);
      } else {
        //同步数据
        this.asyncPhoneCode(this.userInfo);
        this.$router.back(); //返回我的页面
      }
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.login-container {
  width: 100%;
  height: 100%;
  background: #fff;

  .login-inner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login-header {
      .login-logo {
        font-size: 40px;
        font-weight: bold;
        color: mediumpurple;
        text-align: center;
      }

      .login-header-title {
        padding-top: 40px;
        padding-bottom: 10px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.current {
            color: mediumpurple;
            font-weight: 700;
            border-bottom: 2px solid mediumpurple;
          }
        }
      }
    }

    .login-content {
      >form {
        >div {
          display: none;

          &.current {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 8px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid mediumpurple;
            }
          }

          .login-message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get-verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.phone_right {
                color: purple;
              }
            }
          }

          .login-verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch-show {
              position: absolute;
              right: 10px;
              top: 12px;

              img {
                display: none;
              }

              img.on {
                display: block;
              }
            }
          }

          .login-hint {
            margin-top: 12px;
            color: #999;
            font-size: 12px;
            line-height: 20px;

            >a {
              color: mediumpurple;
            }
          }
        }

        .login-submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: mediumpurple;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .login-back {
        display: block;
        width: 100%;
        height: 42px;
        margin-top: 15px;
        border-radius: 4px;
        background: transparent;
        border: 1px solid mediumpurple;
        color: mediumpurple;
        text-align: center;
        font-size: 16px;
        line-height: 42px;
      }
    }
  }
}
</style>
