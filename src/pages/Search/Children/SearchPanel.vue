<template>
  <div class="search-panel">
    <div class="search-nav">
        <div class="search-input">
            <img src="../images/search.png" width="20" height="20">
            <input ref="mySearch" type="search" placeholder="输入商品名称">
        </div>
        <button class="btn" @click.prevent="searchPanelShow(false)">取消</button>
    </div>
    <div class="search-content">
        <div class="title">
          <img src="../images/hot.png" alt="" width="25">
          <span>热门搜索</span>
        </div>
      <ul class="search-list">
        <li>抽纸批发</li>
        <li>浴巾可穿</li>
        <li>石榴水果</li>
        <li>富豪卷纸</li>
        <li>冰箱收纳盒</li>
        <li>毛巾衣服</li>
        <li>小白鞋增高透气</li>
        <li>连衣裙夏</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPanel',
  data () {
    return {
      
    }
  },
  mounted() {
    this.$refs.mySearch.focus();
  },
  props:{
    searchPanelShow:Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../../common/stylus/mixins.styl"
    .search-panel
        width 100%
        height 100%
        background-color #ffff
        position fixed
        z-index 10000
        .search-nav
            width 100%
            height 60px
            border-bottom-1px (#ddd)
            padding 0 20px
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            .search-input
                display flex
                flex-direction row
                align-items center
                background-color #ededed
                width 85%
                height 38px 
                border-radius 10px
                padding  0 10px
                input
                    width 90%
                    height 100%
                    color #151516
                    font-size 15px
                    padding-left 10px
                    outline none
                    background-color #ededed
            .btn
                width 47px
                height 36px
                line-height 36px
                font-size 18px
                color #9c9c9c
                background none
        .search-content
            padding 30px 15px
            .title
                display flex
                flex-direction row
                align-items center
                color #9c9c9c
                margin-bottom 15px
                span
                    font-size 15px
            .search-list
                display flex
                flex-direction row
                flex-wrap wrap
                li
                    background #f9f9f9
                    color #58595b
                    height 32px
                    line-height 32px
                    font-size 14px
                    padding 5px
                    margin 5px 10px
                    border-radius 16px
</style>
