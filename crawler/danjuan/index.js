import {dataPath,userCookie} from './cfj.js';
import path from 'path'
import {
    csvdbInit,
    csvdbTest,
} from "../lib/jcdb/index.js"
import {fundNavGrowth,fundEstimateNav} from "./api.js"

csvdbInit(path.join(dataPath, 'test.csv'))
await csvdbTest()

let navGrowth = await fundEstimateNav(502000,7)
console.log('navGrowth', navGrowth.data)

let estimateNav = await fundEstimateNav(502000)
console.log('estimateNav', estimateNav.data)
