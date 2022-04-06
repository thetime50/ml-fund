import path from 'path'
import {CjdbClass} from '../lib/jcdb/index.js'

const cols = ['_cjdbindex_', '_cjdbjson_','x','y','equityReturn','unitMoney','_dateStr']
export function getDbInstace(fid){
    const ttdb = new CjdbClass(path.join(process.cwd(), '/data/tt',`${fid}.csv`), cols)
    return ttdb
}
