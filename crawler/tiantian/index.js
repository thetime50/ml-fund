import {apiFundSearch} from "./api.js"

let fundSearch = await apiFundSearch("中海顺")
console.log('fundSearch', fundSearch.data)
