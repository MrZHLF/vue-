<template>
  <div class="shop-container">
    <ul class="shop-list" v-if="homeshoplist.length > 0">
        <li class="shop-list-item" v-for="(shop,index) in homeshoplist" :key="index">
            <img v-lazy="shop.image_url" width="100%">
            <h4 class="list-item-title">{{shop.goods_name}}</h4>
            <div class="list-item-bottom">
                <span class="item-price">￥{{shop.normal_price / 100 }}</span>
                <span class="item-counter">{{shop.sales_tip}}</span>
                <div class="item-user">
                    <img :src="user.avatar" alt="" v-for="(user,index1) in shop.bubble" :key="index1">
                </div>
                <div class="item-buy">
                    <button>去拼单 > </button>
                </div>
            </div>
        </li> 
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Ele',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
	computed: {
    ...mapState(['homeshoplist'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .shop-container
        margin-bottom 50px
        background-color #f5f5f5
        .shop-list
            .shop-list-item
                margin-bottom 10px
                background-color #ffffff
                display flex
                flex-direction column
                .list-item-title
                    line-height 22px
                    width 94%
                    margin-left 3%
                    height 44px
                    color #151516
                    font-size 16px
                    word-break: break-all
                    word-wrap: break-word
                    white-space: normal
                    text-overflow: clip
                    overflow hidden
                .list-item-bottom
                    margin 10px 0
                    display flex
                    flex-direction row
                    justify-content space-around
                    align-items center
                    .item-price
                        font-size 18px
                        font-weight bold
                        text-align center
                        color #e02e24
                        flex 1
                    .item-counter
                        flex 2
                        font-size 12px
                        color #cccccc
                    .item-user
                        display flex
                        justify-content center
                        align-content center
                        flex 1
                        img 
                            width 30px
                            height 30px
                            border-radius 50%
                        img:nth-child(2)
                            margin-left -8px
                    .item-buy
                        flex 2
                        button 
                            width 80%
                            height 34px
                            color #ffffff
                            display flex
                            justify-content center
                            align-items center
                            border none
                            font-size 14px
                            background-color #e02e24
                            margin-left 10px
                            border-radius 10px
</style>
