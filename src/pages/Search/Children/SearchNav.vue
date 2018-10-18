<template>
  <div class="search-nav">
      <a href="" class="search-nav-icon" @click.prevent="searchPanelShow(true)">
        <img src="../images/search.png" width="20" height="20">
        <span>搜索界面</span>
      </a>
  </div>
</template>

<script>
export default {
  name: 'SearchNav',
  data () {
    return {
      
    }
  },
  props:{
    searchPanelShow:Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .search-nav
    width 100%
    height 60px
    background #ffffff
    border-bottom-1px (#cccccc)
    position fixed
    top 0
    left 0
    z-index 998
    display flex
    align-items center
    justify-content center
    .search-nav-icon
      width 90%
      height 70%
      background-color #e8e8e8
      border-radius 10px
      display flex
      justify-content center
      align-items center
      align-content center
      span
        color #9c9c9c
        margin-left 6px
        font-size 16px
        line-height 40px
</style> 
