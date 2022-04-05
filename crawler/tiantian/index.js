import {
    apiFundSearch,
    apiPingzhongdata,
} from "./api.js"

import {
    jsFileParse,
    jsFileFields,
    jsFileField,
} from "../lib/util.js"

let fundSearch = await apiFundSearch("中海顺")
// console.log('fundSearch', fundSearch.data)

let pingzhongdata = await apiPingzhongdata("002213")
// console.log('pingzhongdata', jsFileParse(pingzhongdata.data).fun())
console.log('jsFileFields', jsFileFields(pingzhongdata.data))
// console.log('Data_netWorthTrend', jsFileField('Data_netWorthTrend', pingzhongdata.data))

