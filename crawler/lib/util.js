export function randomStr (length,decimal=16) {
    let arr = Array.from({length: length}, () => {return parseInt( Math.random()*decimal ).toString(decimal)})
    return arr.join('')
}

// jq 请求的数据解析 去除 jQuery18309227070828646549_1649154465185(json) 结构
export function jqResParse(str,type = 'json'){
    let res = str.replace(/^jQuery\w*\(/,'')
    res = res.slice(0,-1)
    if(type == 'json'){
        res = JSON.parse(res)
    }
    return res
}

const declaresList = ['var','let','const','function', 'class'];
// 解析js文件里所有字段
export function jsFileParse(file,export_ = false){
    const resObj = '__ex_res__'
    let decList = declaresList
    if(export_){
        const exDeclaresRe = new RegExp(`\\bexport\\s+(\\b(${decList.join('|')})\\s+\\w+)`,'g')
        file = file.replace(exDeclaresRe,`$1`)
        // console.log('file', file)
    }
    let declaresRe = new RegExp(`\\b(${decList.join('|')})\\s+\\w+`,'g')
    let match = (file.match(declaresRe)||[]).map(item => item.slice(item.lastIndexOf(' ')+1))
    // console.log('match', match)
    let exFields = match.map(item => {
        let field = item
        return `var ${field};${resObj}.${field} = ${field};`
    })
    // file = file.replace(/\bfunction\s+(\w+)/g,'__res__[$1] = function ')
    let fun = new Function(`${file}; let  ${resObj}= {}; ${exFields.join('')} return ${resObj};`)
    return {fields:match, fun}
}

// 获取js文件里所有字段列表
export function jsFileFields(file,export_ = false){
    const resObj = '__ex_res__'
    let decList = declaresList
    if(export_){
        const exDeclaresRe = new RegExp(`\\bexport\\s+(\\b(${decList.join('|')})\\s+\\w+)`,'g')
        file = file.replace(exDeclaresRe,`$1`)
        // console.log('file', file)
    }
    let declaresRe = new RegExp(`\\b(${decList.join('|')})\\s+\\w+`,'g')
    let match = (file.match(declaresRe)||[]).map(item => item.slice(item.lastIndexOf(' ')+1))
    return match
}

// 解析js文件里某个字段
export function jsFileField(field,file/* ,export_ = false */){
    let obj = undefined
    let decList = declaresList
    let fieldRe = new RegExp(`\\b(${decList.join('|')})\\s+${field}\\b`)
    // let declaresRe = new RegExp(`\\b(${decList.join('|')})\\s+\\w+`)
    // if(export_){
    let declaresRe = new RegExp(`(\\bexport\\s+)?\\b(${decList.join('|')})\\s+\\w+`)
    // }
    let start = file.search(fieldRe)
    if(start == -1){
        return obj
    }
    file = file.slice(start)

    let secondDec = null
    if(declaresRe.test(file) && (secondDec = declaresRe.test(file))){
        file = file.slice(0,secondDec.index)
    }
    obj = new Function(`${file}; return ${field};`)()
    return obj
}


import pfs from 'fs/promises'
import path from 'path'
import rm from 'rimraf'

/**
* 异步延迟
* @param {number} time 延迟的时间,单位毫秒
*/
export function sleep(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
};

// 移除文件夹
export const prm = (path) => {
    return new Promise((resolve,reject)=>{
        rm(path,err => {
            if(err){
                reject(err)
                return
            }
            resolve()
        })
    })
}

// 检查并创建文件夹
export async function checkPath (dpath,generate = false) {
    try {
        let stat = await pfs.stat(dpath)
    } catch (error) {
        if(generate){
            await checkPath(path.dirname(dpath))
            try {
                await pfs.mkdir(dpath) //重复创建路径会报错
            } catch (error) {
                // throw error
            }
        }else{
            return false
        }
    }
    return true 
}

export const saveFile = async (fpath, data) => {
    try {
        fpath = path.normalize(fpath)
        await checkPath(path.dirname(fpath),true)
        await sleep(10)
        await pfs.writeFile(fpath, data)
    } catch (error) {
        throw error
    }
}

// saveFile('d:\\Work\\Mlf\\edu_ex_web_api\\docs\\3.机构管理', '123')
