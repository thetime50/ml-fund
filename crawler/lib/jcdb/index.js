import csvdb from "csv-database"

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