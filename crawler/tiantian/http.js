import axios from 'axios'
const baseURL = 'http://fundsuggest.eastmoney.com'
const baseSiteURL = 'http://fund.eastmoney.com'

var http = axios.create({
    baseURL: baseURL, // todo 后面肯传相对路径
    timeout: 5000, //请求超过5秒即超时返回错误
    // headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    // headers: { 'Content-Type': 'application/json, text/plain, */*' },
});
// http.interceptors.request.use(
//     config => {
//         //判断是否存在token，如果存在的话，则每个http header都加上token                    //     'Cookie': userCookie,
//         config.headers['Cookie'] = userCookie
//         return config;
//     }
// );

var siteHttp = axios.create({
    baseURL: baseSiteURL, // todo 后面肯传相对路径
    timeout: 5000, //请求超过5秒即超时返回错误
});

export {
    http,
    siteHttp
}