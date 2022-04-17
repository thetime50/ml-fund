import {http} from './http.js';
import qs from 'qs'
import {userCookieObj} from './cfj.js';

// 个人信息
export const apiAccount = () => http.get(`/djapi/account` )

// 搜索
export const apiSearch = (key) => http.get(`/djapi/v2/search?` + qs.stringify({
    key:key,
    source:'index',
    xq_access_token:userCookieObj.xq_a_token
}) )

// 净增长值
export const apiFundNavGrowth = (id,day)=> http.get(`/djapi/fund/nav-growth/${id}?day=${day}`)

// 净值估算
export const apiFundEstimateNav = (id)=> http.get(`/djapi/fund/estimate-nav/${id}`)

// 排行榜
// items: [{
//   fd_code: '000991',
//   fd_name: '工银战略转型股票',
//   yield: '212.9513',
//   sf_type: '1',
//   unit_nav: '3.9870',
//   f_type: 'fund'
// }]
// https://danjuanfunds.com/djapi/v3/filter/fund?type=${TYPE}&order_by=${order_by}&size=${SIZE}&page=${page}
export const apiFundRank = (type, order_by, size, page) => http.get(`/djapi/v3/filter/fund?type=${type}&order_by=${order_by}&size=${size}&page=${page}`)

// 基金详情
// https://danjuanfunds.com/djapi/fund/${id}
export const apiFundDetail = (id) => http.get(`/djapi/fund/${id}`)

// 基金经理
// const url = `https://danjuanfunds.com/djapi/fund/detail/${id}`
export const apiFundManager = (id) => http.get(`/djapi/fund/detail/${id}`)
