// 基金选择脚本
console.log('** 基金选择脚本 **')
import dayjs from 'dayjs'
import {
    apiFundRank,
    apiFundDetail,
    apiFundManager,
} from "./api.js"

import path from 'path'
import {jcdb} from '../lib/jcdb/index.js'

const YIELD_MIN = 80

async function saveCsv(list){
    const cols = Object.keys( list[0] )
    const db = await jcdb(path.join(process.cwd(), '/data/ttsel',`good-found-${dayjs().format('YYYY-MMDD-HHmmss')}_${YIELD_MIN}.csv`), cols)
    db.add(list)
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

async function main(){
    let rank = await apiFundRank(1,'3y',500 ,1)
    // console.log('rank.data', rank.data)
    // console.log('rank.data.data.items[0]', rank.data.data.items[0])
    let fundList = rank.data.data.items.filter((v)=> v.yield >= YIELD_MIN)

    let goodFundList = []
    // 循环请求接口获取基金详情并过滤
    for (let i = 0; i < fundList.length; i++) {
        try{
            const  id = fundList[i].fd_code
            const {data:{data:fundDetail}} = await apiFundDetail(id)
            const {data:{data:managerDetail}} = await apiFundManager(id)
            try{
                const managerList = managerDetail.manager_list.length && managerDetail.manager_list[0]
                // console.log('fundDetail, managerDetail', fundDetail, managerDetail)
                if(!managerList){ 
                    console.log('fd_code, fd_full_name', fundDetail.fd_code, fundDetail.fd_full_name)
                    continue;
                }
                // 基金经理管理时间
                const keepTime = managerList.achievement_list.filter((item) => {
                    return item.fund_code === id
                })[0]?.post_date
                
                const resDetail = {
                    found_date:fundDetail.found_date, // 开始时间
                    fd_code:fundDetail.fd_code, // 代码
                    manager_name:fundDetail.manager_name, // 基金经理
                    totshare:fundDetail.totshare, // 金钱规模
                    fd_full_name:fundDetail.fd_full_name, // 基金的名字
                    keeper_name:fundDetail.keeper_name, // 公司名字
                    // fund_derived:fundDetail.fund_derived, // 收益
                    unit_nav:fundDetail.fund_derived.unit_nav, // 历史累计收益
                    keep_time:keepTime, // 管理时间
                    work_year:managerList.work_year, // 基金经理年限
                }

                const total = resDetail.totshare.split('亿');
                // 成立超过7年的基金
                const fundTime = 1000 * 60 * 60 * 24 * 30 * 12 * 7
                // 基金经理在职时间
                const manegeTime = 1000 * 60 * 60 * 24 * 30 * 12 * 3
                const nowTime = new Date().getTime()
                const startTime = new Date(resDetail.found_date).getTime()
                const keepTimeStamp = new Date(keepTime).getTime()
                if (nowTime - startTime > fundTime && total[0] && total[0] > 10 && nowTime - keepTimeStamp > manegeTime) {
                    goodFundList.push(resDetail)
                }
                if(i%5 == 0){
                    console.log(`${i&&'\r'}i/total: ${i}/${fundList.length}`)
                    await delay(Math.random()*500)
                }
            }catch(e){
                console.log('fundDetail', fundDetail)
                console.log('managerDetail', managerDetail)
                throw e
            }
        }catch(e){
            console.error(e)
        }
    }

    await saveCsv(goodFundList)
}

// main()

async function getDbInstace(fname){
    const cols = [
        "found_date",
        "fd_code",
        "manager_name",
        "totshare",
        "fd_full_name",
        "keeper_name",
        "unit_nav",
        "keep_time",
        "work_year",
    ]
    const db = await jcdb(path.join(process.cwd(), '/data/ttsel',fname), cols)
    return db
}

async function addYeled(){
    let rank = await apiFundRank(1,'3y',500 ,1)
    const db = await getDbInstace('good-found-2022-0418-013047.csv')
    let list = await db.get()
    const frank = rank.data.data.items.filter((v)=> v.yield)
    const reslist = []
    for(let i of frank){
        let match = list.find((v)=> v.fd_code === i.fd_code)
        if(match){
            reslist.push({
                ...match,
                yield:i.yield,
            })
        }
    }
    await saveCsv(reslist)
}

addYeled()

