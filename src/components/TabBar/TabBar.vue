<template>
  <div class="bottom-tab">
    <div class="tab-item" @click="switchTo('/home')">
			<img :src="$route.path.includes('/home') ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="首页">
			<span :class="{on: $route.path.includes('/home')}">首页</span>
		</div>
    <div class="tab-item" @click="switchTo('/recommend')">
			<img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="推荐">
			<span :class="{on:$route.path.includes('/recommend')}">推荐</span>
		</div>
    <div class="tab-item" @click="switchTo('/search')">
			<img :src="$route.path.includes('/search') ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="搜索">
			<span :class="{on:$route.path.includes('/search')}">搜索</span>
		</div>
    <div class="tab-item" @click="switchTo('/chat')">
			<img :src="$route.path.includes('/chat') ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="聊天">
			<span :class="{on:$route.path.includes('/chat')}">购物车</span>
		</div>
    <div class="tab-item" @click="switchTo('/me')">
			<img :src="$route.path.includes('/me') ? tabBarImgArr[4].selected : tabBarImgArr[4].normal" alt="我的">
			<span :class="{on:$route.path.includes('/me')}">我的</span>
		</div>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  data () {
    return {
      tabBarImgArr:[   //图片切换
        {normal: require('./../../../static/img/icon_home.png'), selected: require('./../../../static/img/icon_home_selected.png')},
        {normal: require('./../../../static/img/icon_intro.png'), selected: require('./../../../static/img/icon_intro_selected.png')},
        {normal: require('./../../../static/img/icon_search.png'), selected: require('./../../../static/img/icon_search_selected.png')},
        {normal: require('./../../../static/img/icon_chat.png'), selected: require('./../../../static/img/icon_chat_selected.png')},
        {normal: require('./../../../static/img/icon_mine.png'), selected: require('./../../../static/img/icon_mine_selected.png')}
      ]
    }
  },
  methods:{
    switchTo(path){
      // console.log(this.$router)
      this.$router.replace(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bottom-tab
    width 100%
    height 50px
    background-color #fff
    position fixed
    left 0px
    bottom 0px
    display flex
    z-index 999
    .tab-item
      display flex
      flex 1
      flex-direction column
      align-items center
      justify-content center
      font-size 14px
      color #666
      img
         width 35%
         margin-bottom 2px
      .on
        color red
</style>
