import {http,siteHttp} from './http.js';
import qs from 'qs'
import {
    randomStr,
    jqResParse
} from "../lib/util.js"
import dayjs from 'dayjs'

const fundSearchCallback = `jQuery${randomStr(20,10)}_${randomStr(13,10)}`


// /FundSearch/api/FundSearchAPI.ashx?callback=jQuery18309227070828646549_1649154465185&m=1&key=%E4%B8%AD%E6%B5%B7&_=1649154524211
export const apiFundSearch = (key) => http.get(`/FundSearch/api/FundSearchAPI.ashx?` + qs.stringify({
    key:key,
    callback:fundSearchCallback, // jq回调
    m:1, // 应该表示请求的除法方式
    _:new Date().getTime() // 时间戳
})).then(res => {
    res.data = jqResParse(res.data)
    return res
})

// http://fund.eastmoney.com/pingzhongdata/002213.js?v=20220405232935
// Data_netWorthTrend
export const apiPingzhongdata = (id) => siteHttp.get(`/pingzhongdata/${id}.js?v=${dayjs().format('YYYYMMDDHHmmss')}`)

