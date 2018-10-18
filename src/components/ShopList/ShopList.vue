<template>
    <a class="recommend-item">
        <img v-lazy="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">
        <h4 class="item-title">{{item.short_name}}</h4>
        <div class="item-bottom">
            <span class="item-price">￥{{item.price / 100}}</span>
            <span class="item-sales">{{item.sales_tip}}</span>
            <button class="item-btn" @click="ClickHandleBtn(item)">添加购物车</button>
        </div>
    </a>
</template>

<script>
export default {
  name: 'ShopList',
  props: {
    item:Object,
    ClickHandleBtn:{
        type:Function,
        default:()=>{}
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel="stylesheet/stylus">
    .recommend-item:nth-child(2n-1)
        margin-right 1%
    .recommend-item
        width 49.5%
        background #ffffff
        padding-bottom 15px
        margin-bottom 15px
    .item-title
        line-height 20px
        height 20px
        overflow hidden
        font-size 13px
        color #151516
        margin 5px 0
        padding 0 5px
    .item-bottom
        display flex 
        flex-direction row
        align-items center
        .item-price
            flex 2
            color #e02e24
            font-weight 700
            font-size 15px
            padding-left 10px
        .item-sales
            flex 3
            font-size 10px
            color #666
        .item-btn
            flex 3
            height 24px
            text-align center
            font-size 12px
            color #e02e24
            border 1px solid rgba(224,46,36,.2)
            border-radius 4px
            background none
            margin-right 8px
</style>
