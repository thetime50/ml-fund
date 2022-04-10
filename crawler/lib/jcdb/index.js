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

let DBPATH = 'users.csv'

export function csvdbInit(dbpath,){
    DBPATH = dbpath
}
export async function csvdbTest() {
    const db = await csvdb(DBPATH, ["id", "name", "mail"]);
    let res = await db.get({
        mail: "johndoe@github.com"
    });
    console.log('get({ mail: "johndoe@github.com" }', res)
    res = await db.get({
        mail: "jobs@github.com"
    });
    console.log('get({ mail: "jobs@github.com" })', res)
    if(!res.length){
        let data = {id: 2, name: "stevejobs", mail: "jobs@github.com"}
        console.log('db.add', data)
        await db.add(data);
    }
}

export async function jcdb(dbpath,cols){
    
        await checkPath(path.dirname( dbpath ),true)
        await sleep(10)
        let db = await csvdb(dbpath, cols);
        db.jc_dbpath = dbpath
        db.jc_cols = cols
        return db
}

