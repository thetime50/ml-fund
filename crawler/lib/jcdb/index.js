import path from 'path'
import csvdb from "csv-database"
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

export class CjdbClass {
    constructor(dbpath,cols){
        this.dbpath = dbpath
        this.cols = cols
    }
    async init(){
        await checkPath(path.dirname( this.dbpath ),true)
        await sleep(10)
        this.db = await csvdb(this.dbpath, this.cols);
    }
    async get(query){
        return await this.db.get(query)
    }
    async add(data){
        return await this.db.add(data)
    }
    async batchAdd(list){
        for(let index in list){
            await this.db.add(list[index])
        }
    }
}

