import {http} from './http.js';
import qs from 'qs'

// 个人信息

// 搜索
export const search = (key) => http.get(`/djapi/v2/search?` + qs.stringify({key:key,source:'index'}) )

// 净增长值
export const fundNavGrowth = (id,day)=> http.get(`/djapi/fund/nav-growth/${id}?day=${day}`)

// 净值估算
export const fundEstimateNav = (id)=> http.get(`/djapi/fund/estimate-nav/${id}`)
