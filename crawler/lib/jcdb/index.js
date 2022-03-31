import csvdb from "csv-database"

let DBPATH = 'users.csv'

export function csvdbInit(dbpath,){
    DBPATH = dbpath
}
export async function csvdbTest() {
    const db = await csvdb(DBPATH, ["id", "name", "mail"]);
    let res = await db.get({
        mail: "johndoe@github.com"
    });
    console.log('res', res)
    res = await db.get({
        mail: "jobs@github.com"
    });
    console.log('res', res)
    await db.add({id: 2, name: "stevejobs", mail: "jobs@github.com"});
}