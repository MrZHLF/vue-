import ajax from "./ajax";

//数据路径
const BASE_URL = "/api";

//请求方法

export const getHomeCasual = () => ajax(BASE_URL + "/api/homecasual"); //首页轮播图

export const getHomeNav = () => ajax(BASE_URL + "/api/homenav"); // 请求首页的导航

export const getHomeShopList = () => ajax(BASE_URL + "/api/homeshoplist"); // 请求首页的商品列表

export const getRecommendShopList = params =>
  ajax(BASE_URL + "/api/recommendshoplist", params); //获取推荐商品列表

export const getSearchGoods = () => ajax(BASE_URL + "/api/searchgoods"); //获取搜索分类列表数据

export const getSendCode = phone => ajax(BASE_URL + "/api/send_code", { phone }); //获取短信验证码

export const PhoneCodeLogin = (phone, code) => ajax(BASE_URL + "/api/login_code", { phone, code }, "POST"); //手机验证码登录

export const pwdLogin = (name, pwd, captcha) => ajax(BASE_URL + "/api/login_pwt", { name, pwd, captcha }, "POST"); //用户名和密码登录

export const getUserInFo = () => ajax(BASE_URL + "/api/user_info"); //获取登录用户信息存储

export const Logout = () => ajax(BASE_URL + "/api/logout"); //退出登录

export const UserUpdate = (
    user_id,
    user_name,
    user_sex,
    user_address,
    user_birthday,
    user_sign
) =>
  ajax(BASE_URL + "/api/user_update", {
    user_id,
    user_name,
    user_sex,
    user_address,
    user_birthday,
    user_sign
}, "POST"); //修改用户信息

export const addCoodsCart = (user_id, goods_id, goods_name, thumb_url, price) =>
  ajax(BASE_URL + "/api/add_shop_cart", {
    user_id,
    goods_id,
    goods_name,
    thumb_url,
    price
  }, "POST"); //加入购物车


export const getCartShoping = () => ajax(BASE_URL + "/api/cart_goods"); // 请求购物车  