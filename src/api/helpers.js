import axios from 'axios'
const urlMap = {
  development: 'http://test.51flowerin.com/',
  production: 'http://ustbhuangyi.com/sell/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
// const ERR_OK = 0

export function get(url) {
  return function(params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      if (res.data.code === 1) {
        return res.data
      }
      // const {errno, data} = res.data
      // if (errno === ERR_OK) {
      //   return data
      // }
    }).catch((e) => {
    })
  }
}
