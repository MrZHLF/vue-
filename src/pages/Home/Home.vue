<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
			class="flex"
      >
    </ly-tab>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'chat',
  data () {
    return {
      selectedId:0, //选择的id
      items:[
        {label:"热门"},
        {label:"服饰"},
        {label:"鞋包"},
        {label:"母婴"},
        {label:"百货"},
        {label:"食品"},
        {label:"内衣"},
        {label:"男装"},
        {label:"电器"}
      ],
      options:{
        activeColor: '#e9232c'  //选中颜色
      },
      //二级路由路径
      subRouteUrl:[
				'/home/hot', '/home/dress', '/home/box', '/home/mbaby', '/home/general', '/home/food', '/home/shirt', '/home/man', '/home/ele'
      ]
    }
  },
  methods:{
    handleChange(item,index){
      this.$router.replace(this.subRouteUrl[index])   //路由切换
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.home
  width 100%
  height 100%
	.flex
		position fixed
		left 0
		top 0
		z-index 998
</style>
