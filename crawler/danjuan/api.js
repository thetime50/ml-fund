import {http} from './http.js';
import qs from 'qs'
import {userCookieObj} from './cfj.js';

// 个人信息
export const apiAccount = (key) => http.get(`/djapi/account` )

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
