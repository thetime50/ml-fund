import dayjs from 'dayjs'
import {
    // apiFundSearch,
    apiPingzhongdata,
} from "./api.js"

import {
    jsFileField,
    sleep,
} from "../lib/util.js"
import { getDbInstace,checkDbFile,getRankDbInstace } from "./db.js"

// let fundSearch = await apiFundSearch("中海顺")
// console.log('fundSearch', fundSearch.data)


async function crawlerDaysWorth(fid){
    if(await checkDbFile(fid)){
        console.log('重复的 fid', fid)
        return
    }

    let pingzhongdata = await apiPingzhongdata(fid)
    // console.log('pingzhongdata', jsFileParse(pingzhongdata.data).fun())
    // console.log('jsFileFields', jsFileFields(pingzhongdata.data))
    let Data_netWorthTrend = jsFileField('Data_netWorthTrend', pingzhongdata.data)
    // console.log('Data_netWorthTrend', Data_netWorthTrend)

    Data_netWorthTrend.forEach(item => {
        item._dateStr = dayjs(item.x).format('YYYYMMDD')
        item._jcdbindex_ = ''
        item._jcdbjson_ = ''
        item._isUnitMoney = Boolean( item.unitMoney)
        item._unitMoney =  item.unitMoney && item.unitMoney.replace(/[^\d\.]/g, '')
    })

    let db = await getDbInstace(fid)
    db.add(Data_netWorthTrend)
}

// crawlerDaysWorth("002213")

async function main(){
    const fundListFname = 'rank-fund-2022-0418-2308.csv'
    const rankdb = await getRankDbInstace(fundListFname)
    const fundList = await rankdb.get()
    // console.log('fundList', fundList)
    
    let err = 0
    for(let i=0; i < 1 /* fundList.length */; i++){
        let fund = fundList[i]
        try{

            await crawlerDaysWorth(fund.fd_code)
            if(i && i%5==0){
                let wait = (1000 + Math.random()*3000).toFixed(2)        
                console.log('i, wait, total', i,wait,fundList.length)
                await sleep(wait)
            }
            err = 0
        }catch (e){
            console.log('i,fund', i,fund)
            console.error(e)
            err+=1
            if(err>15){
                throw new error('网络错误 err > 15')
            }
        }
    }
}

main()

