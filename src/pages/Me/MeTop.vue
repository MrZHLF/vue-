<template>
  <div class="me">
    <div class="info">
			<div class="img-wrapper">
				<img src="./images/me_top.png" alt="">
			</div>
			<router-link tag="div" class="nickname-wrapper" to="/userdetail">
				<p class="phone">{{userInfo.user_phone | phoneFormat}}</p>
				<i class="zhlf-19 icon"></i>
			</router-link>
		</div>
		<div class="order-menu">
			<div class="order-title">
				<div class="my-orders">我的订单</div>
				<div class="others">
					查看全部
					<i class="zhlf-17"></i>	
				</div>
			</div>
		</div>
		<div class="top-menu">
			<div class="top-menu-item">
				<i class="zhlf-15 gray"></i>	
				<span class="title">待付款</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-4 gray"></i>	
				<span class="title">待分享</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-21 gray"></i>	
				<span class="title">待发货</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-2 gray"></i>	
				<span class="title">待收货</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-uniE902 gray"></i>	
				<span class="title">待评价</span>
			</div>
		</div>
		<div class="middle-menu top-menu">
			<div class="top-menu-item">
				<i class="zhlf-16 red"></i>	
				<span class="title">优惠券</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-20 red"></i>	
				<span class="title">商品收藏</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-3 red"></i>	
				<span class="title">店铺收藏</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-7 red"></i>	
				<span class="title">历史浏览</span>
			</div>
			<div class="top-menu-item">
				<i class="zhlf-14 red"></i>	
				<span class="title">退款售后</span>
			</div>
		</div>
		<div class="bottom-menu">
			<div class="bottom-menu-item">
				<i class="zhlf-6 yellow"></i>
				<span>新人红包</span>
			</div>
			<div class="bottom-menu-item">
				<i class="zhlf-13 yellow"></i>
				<span>多多果园</span>
			</div>
			<div class="bottom-menu-item">
				<i class="zhlf-7 yellow"></i>
				<span>砍价免费拿</span>
			</div>
			<div class="bottom-menu-item">
				<i class="zhlf-18 yellow"></i>
				<span>边逛边赚</span>
			</div>
			<div class="bottom-menu-item">
				<i class="zhlf-6 yellow"></i>
				<span>天天领现金</span>
			</div>
			<div class="bottom-menu-item">
				<i class="zhlf-1 yellow"></i>
				<span>收货地址</span>
			</div>
			<div class="bottom-menu-item">
				<i class="zhlf-13 yellow"></i>
				<span>我的评价</span>
			</div>
			<div class="bottom-menu-item">
				<i class="zhlf-20 yellow"></i>
				<span>官方客服</span>
			</div>
			<router-link to="/setting" tag="div" class="bottom-menu-item">
				<i class="zhlf-12 yellow"></i>
				<span>设置</span>
			</router-link>
		</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
		name: "MeTop",
		computed:{
			...mapState(['userInfo'])
		},
		filters:{
			phoneFormat(phone){
				//过滤手机号码
				let phoneArray = [...phone]; //字符串转化成数组
				let str = ''
				phoneArray.forEach((item,index)=> {
					if(index === 3 || index === 4 || index === 5 || index === 6) {
							str += '*'
					}else {
						str += item
					}
				})
				return str
			}
		}
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
	.info
		width 100%
		display flex
		flex-direction row
		align-items center
		padding 20px
		.img-wrapper
			width 80px
			height 80px
			margin-right 10px
			overflow hidden
			background-color #fafafa
			background-size contain	
			img
				display block
				width 80px
				height 80px
				border-radius 50%
		.nickname-wrapper
			display flex
			flex-direction row
			align-items center
			.phone
				font-size 20px
				color #151516
			.icon
				padding-left 10px
				font-size 30px
				color #12b7f6
	.order-menu
		background white
		padding 10px 20px
		.order-title
			display flex
			flex-direction row
			justify-content space-between
			.my-orders
				font-size 17px
				color #151516
			.others
				font-size 13px
				color #999
	.top-menu
		display flex
		flex-direction row
		justify-content space-between
		padding 10px 20px
		background white
		margin-bottom 10px
		.top-menu-item
			display flex
			flex-direction column
			align-items center
			.gray
				margin-bottom 5px
				font-size 24px
				color #9c9c9c
				font-weight 400
			.red
				font-size 24px
				color #e02e24
			.title
				font-size 13px
				padding-top 5px
				color #58595b
	.bottom-menu
		display flex
		flex-direction row
		justify-content space-between
		flex-wrap wrap
		padding-top 20px
		background white
		.bottom-menu-item
			width 25%
			display flex
			flex-direction column
			align-items center
			padding-bottom 20px
			.yellow
				color orange
				font-size 24px
				padding-bottom 5px
			span
				font-weight normal
				font-size 13px
				color #58595b
</style>
