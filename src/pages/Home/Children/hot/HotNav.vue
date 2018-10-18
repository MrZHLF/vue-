<template>
  <div>
      <div class="hot-nav">
        <div class="hot-nav-content">
            <div class="nav-content-inner" v-if="homenav.length > 0">
                <a class="inner-item" v-for="(nav,index) in homenav" :key="index">
                    <img :src="nav.iconurl" alt="">
                    <span>{{nav.icontitle}}</span>
                </a>
            </div>
        </div>
        <!-- 进度条 -->
        <div class="hot-nav-bottom">
            <div class="hot-nav-bottom-inner" :style="innerWidthStyle"></div>
        </div>
    </div>
    <!-- 广告位 -->
        <div class="hot-ad">
            <img src="../../imgs/hot_ad/home_ad.gif" alt="">
        </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Box',
  data () {
    return {
      //获取屏幕的宽度
      scrollW: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
     //滚动内容的宽度
     scrollContentW: 720,
     //滚动条背景长度
     bgBarW: 100,
     //滚动条长度
     barXWidth:0,
     //起点
     startX:0,
     //结束点
     endFlag: 0,
     //移动距离
     barMoveWidth:0
    }
  },
  computed:{
		...mapState(['homenav']),
    innerWidthStyle(){
        return {
            width:`${this.barXWidth}px`,
            left:`${this.barMoveWidth}px`
        }
    }
  },
  methods:{
    getBarBottomWidth() {
        this.barXWidth = this.bgBarW * (this.scrollW / this.scrollContentW);
      },
      //移动端事件监听
    bindEvent() {
        this.$el.addEventListener("touchstart",this.handleTouchStart,false);
        this.$el.addEventListener("touchmove",this.handleTouchMove,false);
        this.$el.addEventListener("touchend",this.handleTouchEnd,false)
    },

    //开始触摸
    handleTouchStart(event){
        //获取第一触点
        let touch = event.touches[0];
        //求出开始点
        this.startX = Number(touch.pageX);
    },
    //开始移动
    handleTouchMove(){
        //获取第一触点
        let touch = event.touches[0];
        //求出移动的距离
        let moveWidth = Number(touch.pageX) - this.startX;
        //求出滚动条的位置
        this.barMoveWidth = -((this.bgBarW / this.scrollContentW) * moveWidth - this.endFlag);

        //边界值处理
        if(this.barMoveWidth <= 0) {
            this.barMoveWidth = 0  //处理左边
        } else if (this.barMoveWidth >= this.bgBarW - this.barXWidth){  //处理右边
            this.barMoveWidth = this.bgBarW - this.barXWidth
        }
    },
    //结束触摸
    handleTouchEnd() {
        this.endFlag = this.barMoveWidth
    }
  },
  mounted() {
      this.getBarBottomWidth();
      this.bindEvent();
			
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .hot-nav
        width 100%
        height 180px
        position relative
        background-color #fff
        padding-bottom 10px
        .hot-nav-content
            width 100%
            overflow-x scroll
            .nav-content-inner
                width 720px
                height 180px
                display flex
                flex-wrap wrap 
                .inner-item
                    width 90px
                    height 90px
                    display flex 
                    flex-direction column
                    justify-content center
                    align-items center
                    font-size 14px
                    color #666
                    img 
                      width 40%
                      margin-bottom 5px
        .hot-nav-content::-webkit-scrollbar
            display none
        .hot-nav-bottom
            width 100px
            height 2px
            background-color #ccc
            position absolute 
            left 50%
            margin-left -50px
            bottom 8px
            .hot-nav-bottom-inner
                position absolute
                left 0
                height 100%
                background-color red
                width 0
    .hot-ad
        background-color #fff
        margin 8px 0
        img 
            width 100%
                
</style>
