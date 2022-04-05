// export dataPath = './data/';
import  path from 'path'
const projectPath = process.cwd()

export const dataPath = path.join(projectPath, 'data/dj')
export const userCookie = 'device_id=web_B1xXtEKfq; gr_user_id=be4d5ba9-c307-4dbf-8335-a00f598b4d2d; u=802888302; uid=802888302; accesstoken=240010000175fb45a722155db7156ff301bbf142c6d28f355; refreshtoken=2400100000c84e6ca2793b76563a27d5141f7d1d3d428d10c; channel=; xq_a_token=1a689518b1d635a6b7d0b305d73548a29e3a5695; Hm_lvt_b53ede02df3afea0608038748f4c9f36=1648081177,1648148707,1648375163; acw_tc=2760820916483777426313124e080f4969010689b7ff9473d87b363a955167; timestamp=1648377742646; Hm_lpvt_b53ede02df3afea0608038748f4c9f36=1648377743'.split('; ')

export const userCookieObj = userCookie.reduce((t,item) => {
    let [key, value] = item.split('=')
    t[key] = value
    return t
},{})
