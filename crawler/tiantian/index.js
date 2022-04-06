import dayjs from 'dayjs'
import {
    apiFundSearch,
    apiPingzhongdata,
} from "./api.js"

import {
    jsFileParse,
    jsFileFields,
    jsFileField,
} from "../lib/util.js"
import { getDbInstace } from "./db.js"

// let fundSearch = await apiFundSearch("中海顺")
// console.log('fundSearch', fundSearch.data)


async function crawlerDaysWorth(fid){
    let pingzhongdata = await apiPingzhongdata(fid)
    // console.log('pingzhongdata', jsFileParse(pingzhongdata.data).fun())
    // console.log('jsFileFields', jsFileFields(pingzhongdata.data))
    let Data_netWorthTrend = jsFileField('Data_netWorthTrend', pingzhongdata.data)
    console.log('Data_netWorthTrend', Data_netWorthTrend)

    Data_netWorthTrend.forEach(item => {
        item._dateStr = dayjs(item.x).format('YYYYMMDD')
        item._cjdbindex_ = ''
        item._cjdbjson_ = ''
    })

    let db = getDbInstace(fid)
    await db.init()
    db.batchAdd(Data_netWorthTrend)
}

crawlerDaysWorth("002213")

