/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
// export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
export const reqFoodCategorys = () => ajax('/test/Goods/gettype')
// 3、根据经纬度获取商铺列表
// export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})/test/Goods/list
export const reqShops = (longitude, latitude) => ajax('/test/Goods/list', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
// export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
export const reqSearchShop = (obj) => ajax('/test/Goods/list', obj)
// 6、用户名密码登陆
// export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
export const reqPwdLogin = (obj) => ajax('/test/Signup/login', {...obj}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
export const loadUserInfoAPI = (params) => ajax("/test/Signup/userinfo",params,'POST');
// 10、用户登出
// export const reqLogout = () => ajax(BASE_URL+'/logout')
 export const reqLogout = (data) => ajax('/test/Signup/logout',data,'POST')
//  11 提交订单
export const addOrdersAPI = (params) => ajax("/test/Order/add",params, 'POST');

// 获取订单列表
export const orderListAPI = (params) => ajax("/test/Order/list",params, 'POST')
// 订单详情
export const orderInfoAPI = (params) => ajax("/test/Order/orderinfo",params, 'POST')
// 支付
export const payforAPI = (params) => ajax("/test/Order/pay",params, 'POST')
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')


