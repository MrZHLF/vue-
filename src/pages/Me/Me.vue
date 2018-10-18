<template>
  <div class="me">
    <div v-if="userInfo.id">
      <MeTop></MeTop>
    </div>
    <SelectLogin v-else/>
    <!-- <SelectLogin v-if="!userInfo.id"/>
    <div v-else>
      <MeTop></MeTop>
    </div> -->
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  import SelectLogin from './../Login/SelectLogin'
	import MeTop from './MeTop'
  export default {
    name: "Me",
    computed:{
      ...mapState(['userInfo'])
    },
    components: {
      SelectLogin,
			MeTop
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .me
    background #f5f5f5
    width 100%
    height 100%
    overflow hidden
</style>
