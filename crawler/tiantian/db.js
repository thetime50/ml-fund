import path from 'path'
import {jcdb} from '../lib/jcdb/index.js'

const cols = ['_jcdbindex_', '_jcdbjson_','x','y','equityReturn','unitMoney','_dateStr']
export async function getDbInstace(fid){
    const ttdb = await jcdb(path.join(process.cwd(), '/data/tt',`${fid}.csv`), cols)
    return ttdb
}
