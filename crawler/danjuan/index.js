import {dataPath,userCookie} from './cfj.js';
import https from 'https';
import request from 'request';
// http
// request/request-promise
// axios
// json5



let obj = {a:1,b:2,c:{d:3,e:4}};

obj.p1 = obj
obj.p2 = obj.c
obj.c.p3 = obj
obj.c.p4 = obj.c

console.dir(obj)

// 登录测试


// console.log('https', https)
let url = "https://danjuanapp.com/djapi/fund/nav-growth/002213?day=360"
// let url = "https://danjuanapp.com"

async function main() {
    // let data = ''
    // /* let res  */= https.get(url,{headers:{
    //     'Cookie': userCookie,
    //     'Content-Type': 'application/json',
    // }}, (res) => {
    //     console.log('res', res)
    //     res.on('data', function(chunk){
    //         console.log('- data', chunk.length)
    //         data += chunk;
    //     });
    //     res.on('end', function(){
    //         console.log(data);
    //     });
    // })

    // request
    request(
        {
            url: url,
            method: "GET",
            json: true,
            headers: {
                    //     'Cookie': userCookie,
                "content-type": "application/json",
            },
        },
                
        function (err, res, body) {
            console.log(body);
        }
    );
}
main()
