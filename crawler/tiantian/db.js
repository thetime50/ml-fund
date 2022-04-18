import path from 'path'
import {jcdb} from '../lib/jcdb/index.js'
import pfs from 'fs/promises'

const DB_PATH = path.join(process.cwd(), '/data/tt')

const cols = ['_jcdbindex_', '_jcdbjson_','x','y','equityReturn','unitMoney','_dateStr']
export async function getDbInstace(fid){
    const ttdb = await jcdb(path.join(DB_PATH,`${fid}.csv`), cols)
    return ttdb
}

export async function checkDbFile(fid){
    let fpath = path.join(DB_PATH,`${fid}.csv`)
    
    try {
        let stat = await pfs.stat(fpath)
    } catch (error) {
        return false
    }
    return true
}

export async function getRankDbInstace(fundListFname){
    const fundListFpath = path.join(process.cwd(), '/data/djsel',fundListFname)

    const cols = ['fd_code','fd_name','yield','sf_type','unit_nav','f_type']
    const rankdb = await jcdb(fundListFpath, cols)
    return rankdb
}
