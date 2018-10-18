import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchGoods,
  getUserInFo,
  Logout,
  getCartShoping,
	getDelShoping
} from "../api";


import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  SEARCH_GOODS,
  USER_INFO,
  REAST_USER_INFO,
  CART_GOODS_LIST,
  ADD_GOODS_COUNT,
  REDUCE_GOODS_COUNT,
	SELECTED_ALL_GOODS,
	SELECTED_SINGLE_GOODS,
	DEL_GOODS_SINGLE
} from "./mutation-types";

// async   异步执行
// await  等待

export default {
  //1.获取首页轮播图
  async reqHomeCasual({ commit }) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, { homecasual: result.message });
  },

  // 获取首页的导航
  async reqHomeNav({ commit }) {
    const result = await getHomeNav();
    commit(HOME_NAV, { homenav: result.message.data });
  },

  // 请求首页的商品列表
  async reqHomeShopList({ commit }) {
    const result = await getHomeShopList();
    commit(HOME_SHOP_LIST, { homeshoplist: result.message.goods_list });
  },

  // 获取推荐商品列表
  async reqRecommendShopList({ commit }, params) {
    const result = await getRecommendShopList(params);
    commit(RECOMMEND_SHOP_LIST, { recommendshoplist: result.message });
    params.callback && params.callback();
  },

  //获取搜索分类列表数据
  async reqSearchGoods({ commit }) {
    const result = await getSearchGoods(); //接口
    commit(SEARCH_GOODS, { searchgoods: result.message.data });
  },

  //同步用户信息
  asyncPhoneCode({ commit }, userInfo) {
    commit(USER_INFO, { userInfo });
  },

  //异步获取用户信息
  async getUserInFo({ commit }) {
    const result = await getUserInFo(); //接口
    if (result.success_code === 200) {
      commit(USER_INFO, { userInfo: result.message });
    }
  },

  //退出登录
  async Logout({ commit }) {
    const result = await Logout(); //接口
    console.log(result);
    if (result.success_code === 200) {
      commit(REAST_USER_INFO);
    }
  },

  //请求购物车数据
  async reqCartShoping({ commit }) {
    const result = await getCartShoping();
    if (result.success_code === 200) {
      commit(CART_GOODS_LIST, { cartgoods: result.message });
    }
  },

  // 购物车商品
  updateGoodsCount({ commit }, { goods, isAdd}) {
    if(isAdd){  //增加
      commit(ADD_GOODS_COUNT, { goods});
    } else{ //减少
      commit(REDUCE_GOODS_COUNT, { goods });
    }
  },
	//商品列表是否全部选中
	selectedAllGoods({ commit }, {flag}) {
		commit(SELECTED_ALL_GOODS,{flag})
	},
	//单个商品是否选中状态
	selectedSingle({commit},{goods}) {
		commit(SELECTED_SINGLE_GOODS,{goods})
	},
	
	//单个商品删除
	delGoodsSingle({commit},{goods}) {
		commit(DEL_GOODS_SINGLE,{goods})
	}
};