<template>
  <div class="detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
        <div class="user-icon">
            <span>头像</span>
            <img src="./images/me_top.png" alt="">
        </div>
        <div class="user-item">
            <span>手机</span>
            <span>{{user_phone}}</span>
        </div>
        <div class="user-item">
            <span>昵称</span>
            <span><input type="text" v-model="user_name"></span>
        </div>
        <div class="user-item" @click="sheetVisible = true">
            <span>性别</span>
            <span>{{user_sex}}</span>
        </div>
        <div class="user-item">
            <span>常住地</span>
            <span><input type="text" v-model="user_address"></span>
        </div>
        <div class="user-item" @click="$refs.picker.open()">
            <span>生日</span>
            <span>{{user_birthday}}</span>
        </div>
        <div class="user-item">
            <span>个性签名</span>
            <span><input type="text" v-model="user_sign"></span>
        </div>
        <button @click="handleUserUpdate">修改</button>
    </div>
    <!-- 选择性别 -->
    <mt-actionsheet
    :actions="actions"
    v-model="sheetVisible">
    </mt-actionsheet>
    <!-- 选择出生年月 -->
    <mt-datetime-picker
    ref="picker"
    v-model="pickerVisible"
    type="date"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    :startDate=startDate
    @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import { UserUpdate } from "./../../api/index";
import {Toast} from 'mint-ui';
export default {
  name: "UserDetail",
  data() {
    return {
      user_phone: "",
      user_name: "",
      user_sex: "",
      user_address: "",
      user_birthday: "",
      user_sign: "",

      // 1.性别
      actions: [
        { name: "男", method: this.handleSexClick },
        { name: "女", method: this.handleSexClick }
      ],
      sheetVisible: false,
      // 2.出生年月
      pickerVisible: false,
      startDate: new Date("1970-01-01")
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.user_sign = this.userInfo.user_sign || "";
    this.user_address = this.userInfo.user_address || "未填写";
    this.user_name = this.userInfo.user_name || "";
    this.user_sex = this.userInfo.user_sex || "未知";
    this.user_phone = this.userInfo.user_phone || "";
    this.user_birthday = this.userInfo.user_birthday || "";
  },
  methods: {
    handleSexClick(props) {
      //选择性别
      // console.log(props)
      this.user_sex = props.name;
    },
    handleConfirm(data) {
      //选择出生年月
      // console.log(data);
      this.user_birthday = moment(data).format("YYYY年MM月DD日");
    },
    // 修改用户信息
    async handleUserUpdate() {
      let result = await UserUpdate(
        this.userInfo.id,
        this.user_name,
        this.user_sex,
        this.user_address,
        this.user_birthday,
        this.user_sign
      );
    //   console.log(result);
    // 提示用户
    Toast({
        message: result.message,
        position: 'bottom',
        duration: 2000
    });
    // 返回主界面
    if(result.success_code == 200){
        // 更新本地数据
        this.$store.dispatch('getUserInFo');
        //返回主界面
        setTimeout(() => {
            this.$router.replace('/me');
        }, 2000);
    }
    }
  }
};
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.detail {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .user-detail-top {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
        font-weight: bold;
    }

    .user-detail-group {
        overflow: hidden;

        .user-icon {
            height: 60px;
            padding: 0 10px;
            background-color: #fff;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 50px;
                border-radius: 50%;
            }
        }

        .user-item {
            height: 40px;
            padding: 0 10px;
            background-color: #fff;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            input {
                border: none;
                outline: none;
                text-align: right;
            }
        }

        button {
            width: 90%;
            height: 40px;
            line-height: 40px;
            background-color: #e9232c;
            text-align: center;
            margin: 20px 5%;
            border: none;
            font-size: 16px;
            color: #fff;
            border-radius: 10px;
        }
    }

    .right-title-color {
        color: #999;
        font-size: 14px;
    }
}
</style>
