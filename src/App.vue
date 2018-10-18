<template>
  <div id="app">
		<keep-alive>
			<router-view/>
		</keep-alive>
		<TabBar v-if="$route.meta.ButtonRouterLink"></TabBar>
  </div>
</template>

<script>
import TabBar from './components/TabBar/TabBar'
export default {
  name: 'App',
	components:{
      TabBar
  },
	mounted(){
		this.$store.dispatch('getUserInFo')
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	width: 100%;
	height: 100%;
	position: relative;
	background: #f5f5f5;
}
</style>
