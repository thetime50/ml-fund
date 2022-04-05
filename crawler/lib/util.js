export function randomStr (length,decimal=16) {
    let arr = Array.from({length: length}, () => {return parseInt( Math.random()*decimal ).toString(decimal)})
    return arr.join('')
}

export function jqResParse(str,type = 'json'){
    let res = str.replace(/^jQuery\w*\(/,'')
    res = res.slice(0,-1)
    if(type == 'json'){
        res = JSON.parse(res)
    }
    return res
}

const declaresList = ['var','let','const','function', 'class'];
export function jsFileParse(file,export_ = false){
    const resObj = '__ex_res__'
    let decList = declaresList
    if(export_){
        const exDeclaresRe = new RegExp(`\\bexport\\s+(\\b(${decList.join('|')})\\s+\\w+)`,'g')
        file = file.replace(exDeclaresRe,`$1`)
        console.log('file', file)
    }
    let declaresRe = new RegExp(`\\b(${decList.join('|')})\\s+\\w+`,'g')
    let match = (file.match(declaresRe)||[]).map(item => item.replace(/\s(\w)$/,'$1'))
    // console.log('match', match)
    let exFields = match.map(item => {
        let field = item.slice(item.lastIndexOf(' ')+1)
        return `var ${field};${resObj}.${field} = ${field};`
    })
    // file = file.replace(/\bfunction\s+(\w+)/g,'__res__[$1] = function ')
    let fun = new Function(`${file}; let  ${resObj}= {}; ${exFields.join('')} return ${resObj};`)
    return {declares:match, fun}
}

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
