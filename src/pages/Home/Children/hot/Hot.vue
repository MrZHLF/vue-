<template>
  <div class="main">
    <div class="swiper-container">
      <div class="swiper-wrapper" v-if="homecasual.length > 0">
        <div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index">
					<img :src="casual.imgurl" alt="" width="100%">
				</div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- 图标 -->
    <HotNav></HotNav>
    <!-- 商品列表 -->
    <HotShopList></HotShopList>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HotNav from './HotNav'
import HotShopList from './HotShopList'
import api from 'api/ajax'
import {mapState} from 'vuex'
export default {
  name: 'hot',
	computed: {
    ...mapState(['homecasual'])
  },
  mounted() {
		
		//请求轮播图数据
		this.$store.dispatch('reqHomeCasual');
		//请求首页导航数据
		this.$store.dispatch('reqHomeNav');
		
		//请求首页商品列表
		this.$store.dispatch('reqHomeShopList')
  },
	watch:{
		homecasual(){   //监听
			this.$nextTick(() => {
				//创建swiper
				new Swiper ('.swiper-container', {
					loop: true,
					autoplay:true,
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
					}
				})
			})
		}
	},
  components: {
    HotNav,
    HotShopList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .main
    width 100%
    height 100%
    padding-top 35px
    background-color #f5f5f5
</style>
