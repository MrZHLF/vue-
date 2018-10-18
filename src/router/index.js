import Vue from 'vue'
import Router from 'vue-router'


/* import Home from '@/pages/Home/Home'
import Recommend from '@/pages/Recommend/Recommend'
import Search from '@/pages/Search/Search'
import Chat from '@/pages/Chat/Chat'
import Me from '@/pages/Me/Me'
import Login from "@/pages/Login/Login";
 */

const Home = () => import ('@/pages/Home/Home')
const Recommend = () => import ('@/pages/Recommend/Recommend')
const Search = () => import ('@/pages/Search/Search')
const Chat = () => import ('@/pages/Chat/Chat')
const Me = () => import ('@/pages/Me/Me')
const Login = () => import ('@/pages/Login/Login')


// 二级路由
import Hot from '@/pages/Home/Children/hot/Hot'
import Box from "@/pages/Home/Children/Box"
import Dress from "@/pages/Home/Children/Dress"
import Ele from "@/pages/Home/Children/Ele"
import Food from "@/pages/Home/Children/Food"
import General from "@/pages/Home/Children/General"
import Man from "@/pages/Home/Children/Man"
import Mbaby from "@/pages/Home/Children/Mbaby"
import Shirt from "@/pages/Home/Children/Shirt"

import Mesetting from "@/pages/Me/MeSetting";
import Userdetail from "@/pages/Me/UserDetail";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/Home",
      component: Home,
      meta: {
        title: "首页"
      },
      children: [
        // 热门版块
        { path: "hot", component: Hot, meta: { ButtonRouterLink: true } },
        // 服饰版块
        { path: "dress", component: Dress, meta: { ButtonRouterLink: true } },
        // 鞋包版块
        { path: "box", component: Box, meta: { ButtonRouterLink: true } },
        // 母婴版块
        { path: "mbaby", component: Mbaby, meta: { ButtonRouterLink: true } },
        // 百货版块
        {
          path: "general",
          component: General,
          meta: { ButtonRouterLink: true }
        },
        // 食品版块
        { path: "food", component: Food, meta: { ButtonRouterLink: true } },
        // 内衣版块
        { path: "shirt", component: Shirt, meta: { ButtonRouterLink: true } },
        // 男装版块
        { path: "man", component: Man, meta: { ButtonRouterLink: true } },
        // 电器版块
        { path: "ele", component: Ele, meta: { ButtonRouterLink: true } },
        { path: "/home", redirect: "/home/hot" }
      ]
    },
    {
      path: "/recommend",
      component: Recommend,
      meta: { ButtonRouterLink: true }
    },
    {
      path: "/search",
      component: Search,
      meta: { ButtonRouterLink: true }
    },
    {
      path: "/chat",
      component: Chat,
      meta: { ButtonRouterLink: true }
    },
    {
      path: "/me",
      component: Me,
      meta: { ButtonRouterLink: true }
    },
    {
      path: "/login",
      component: Login
    },
    ,
    {
      path: "/setting",
      component: Mesetting
    },
    {
      path: "/userdetail",
      component: Userdetail
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
});
