<template>
  <div class="search">
    <!-- 搜索导航 -->
    <SearchNav :searchPanelShow="searchPanelShow"></SearchNav>
    <!-- 联动内容 -->
    <div class="shop">
      <!-- 左边 -->
      <div class="menu-wrapper">
        <ul>
          <!-- current -->
          <li 
            class="menu-item"
            v-for="(goods,index) in searchgoods" 
            :key="index"
            :class="{current: index === currentIndex}"
            @click="clickLeft(index)"
            ref="menuList"
            >
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="shop-wrapper">
        <ul ref="allList">
          <li class="shops-li" v-for="(goods, index1) in searchgoods" :key="index1">
            <div class="shops-title">
              <h4>{{goods.name}}</h4>
              <a href="">查看更多 > </a>
            </div>
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone,index) in goods.category" :key="index">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
            <ul class="shops-items">
              <li v-for="(item, index2) in goods.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索 -->
    <SearchPanel v-if="isShow" :searchPanelShow="searchPanelShow"></SearchPanel>
  </div>
</template>

<script>
import SearchNav from './Children/SearchNav'
import SearchPanel from './Children/SearchPanel'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'chat',
  data () {
    return {
      scrollY: 0, //右侧列表滑动的y轴坐标
      rightLiTops:[], //所有分类头部位置
      isShow: false
    }
  },
  computed: {
    ...mapState(['searchgoods']),   //列表数据
    currentIndex(){
      //获取数据
      const {scrollY,rightLiTops} = this;
      //遍历
      return rightLiTops.findIndex((liTop,index) =>{
        this._LeftScroll(index);
        return scrollY >= liTop && scrollY < rightLiTops[index + 1];
      })
    }
  },
  mounted() {
    this.$store.dispatch('reqSearchGoods')
  },
  components: {
    SearchNav,
    SearchPanel
  },
  watch: {
    searchgoods(){
      this.$nextTick(() => {
        //实现滚动
        this._initBScroll()
        //求出右边板块的高度
        this._initRightLiTops()
      })
    }
  },
  methods:{ 
    _initBScroll(){
      //左边
      this.leftScoll = new BScroll('.menu-wrapper',{});
      //右边
      this.rightScoll = new BScroll('.shop-wrapper',{
        probeType: 3    //派发 scroll 事件
      });

      //监听右侧滑动事件
      this.rightScoll.on('scroll',(pos) => {
        //右侧滑动的距离
        this.scrollY = Math.abs(pos.y);
      })
    },
    //求出右边板块的高度
    _initRightLiTops(){
      //临时数组
      const tempArr =[];
      //定义变量记录的高度
      let top = 0;
      //获取多有的li标签
      tempArr.push(top)
      let allLis = this.$refs.allList.getElementsByClassName('shops-li');
      //伪数组转化为真数组
      Array.prototype.slice.call(allLis).forEach(li => {
        top += li.clientHeight;
        tempArr.push(top)
      })
      //更新数据
      this.rightLiTops = tempArr;
    },

    //左边点击效果
    clickLeft(index){
      this.scrollY = this.rightLiTops[index];
      this.rightScoll.scrollTo(0,-this.scrollY,200,)
    },
    //左右联动
    _LeftScroll(index){
      let menus = this.$refs.menuList;
      let el = menus[index];
      this.leftScoll.scrollToElement(el,300,0,-200)
    },
    // 点击显示搜索面板
    searchPanelShow(flag) {
      this.isShow = flag
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    background-color #f5f5f5
    overflow hidden
    .shop 
      display flex
      position absolute
      top 60px
      bottom 50px
      width 100%
      overflow hidden
      .menu-wrapper
        background-color #e0e0e0
        width 80px
        flex 0 0 80px
        .menu-item 
          width 100%
          height 60px
          background #fafafa
          display flex
          justify-content center
          align-items center
          font-family lighter
          color #666
          position relative
        .current
          color #e02e24
          background #ffffff
        .current::before 
          content ''
          background-color #e02e24
          width 4px
          height 30px
          position absolute
          left 0
      .shop-wrapper
        flex 1
        background #fff
        .shops-title
          display flex
          flex-direction row
          padding 0 10px
          height 40px
          align-items center
          justify-content space-between
          color #9999
        a
          text-decoration none
          color #9c9c9c
          font-size 14px
        .shops-items
          display flex 
          flex-wrap wrap
          li
            display flex
            flex-direction column
            width 33.3%
            height 90px
            justify-content center
            align-items center 
            img 
              width 60%
              height 60%
              margin-bottom 5px
            span
              color #151516
              font-size 13px
        .phone-type
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
          border-bottom-1px (#cccccc)
          li
            width 33.3%
            display flex 
            justify-content center
            align-items center 
            margin 5px 0
            img
              width 70%
</style>  
