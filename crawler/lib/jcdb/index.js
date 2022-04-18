import path from 'path'
import csvdb from "csv-database" // 这个库不会很好，写失败都没有返回回来
import {
    sleep,
    checkPath,
} from "../util.js"

// 索引分为两类
// 数据索引 index 
// 行索引 row 
// 一般使用数据索引

const DEFAULT_DELIM = ",";

export async function jcdb(dbpath,cols){
    
        await checkPath(path.dirname( dbpath ),true)
        await sleep(10)
        let db = await csvdb(dbpath, cols, DEFAULT_DELIM);
        db.jc_dbpath = dbpath
        db.jc_cols = cols
        return db
}

