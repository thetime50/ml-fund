export function randomStr (length,decimal=16) {
    let arr = Array.from({length: length}, () => {return parseInt( Math.random()*decimal ).toString(decimal)})
    return arr.join('')
}