import Vue from 'vue'
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


export default {
  [HOME_CASUAL](state, { homecasual }) {
    state.homecasual = homecasual; //数据存放state
  },

  [HOME_NAV](state, { homenav }) {
    state.homenav = homenav; //数据存放state
  },

  [HOME_SHOP_LIST](state, { homeshoplist }) {
    state.homeshoplist = homeshoplist; //数据存放state
  },

  [RECOMMEND_SHOP_LIST](state, { recommendshoplist }) {
    state.recommendshoplist = state.recommendshoplist.concat(recommendshoplist); //推荐数据存放state
  },

  [SEARCH_GOODS](state, { searchgoods }) {
    state.searchgoods = searchgoods; //数据存放state
  },

  [USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo; //数据存放state
  },

  [REAST_USER_INFO](state) {
    state.userInfo = {}; //退出登录
  },

  [CART_GOODS_LIST](state, { cartgoods }) {
    state.cartgoods = cartgoods; //数据存放state
  },

  [ADD_GOODS_COUNT](state, { goods }) {
     //单个购物车增加
    goods.buy_count++
  },

  [REDUCE_GOODS_COUNT](state, { goods }) {
 //单个购物车减少
    if(goods.buy_count) {
      goods.buy_count--;
      if(goods.buy_count === 0) {
        const index = state.cartgoods.indexOf(goods);
        state.cartgoods.splice(index,1)
      }
    }
  },
	
	[SELECTED_ALL_GOODS](state,{flag}) {
		// 商品列表是否全部选中
		state.cartgoods.forEach((goods,index) => {
			if(goods.checked) {  //选中状态
				goods.checked = !flag;
			} else { //未选中状态
				Vue.set(goods,'checked',!flag);
			}
		})
	},
	
	[SELECTED_SINGLE_GOODS](state,{goods}) {
		// 单个商品是否选中状态
		if(goods.checked) {
			goods.checked = !goods.checked
		} else {
			Vue.set(goods,'checked',true)
		}
	},
	
	[DEL_GOODS_SINGLE](state,{goods}) {
		// 单个商品删除
		const index = state.cartgoods.indexOf(goods);
		state.cartgoods.splice(index,1)
	}
};