import {dataPath,userCookie} from './cfj.js';
import path from 'path'
import {
    apiAccount,
    apiSearch,
    apiFundNavGrowth,
    apiFundEstimateNav
} from "./api.js"

// 中海顺鑫混合 002213

// let navGrowth = await apiFundNavGrowth('002213',7)
// console.log('navGrowth', navGrowth.data)

// let estimateNav = await apiFundEstimateNav('002213')
// console.log('estimateNav', estimateNav.data)

// let account = await apiAccount()
// console.log('account', account.data)

let search = await apiSearch('中海顺')
console.log('search', search.data)