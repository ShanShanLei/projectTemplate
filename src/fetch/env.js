// 开发服
// let baseUrl = 'http://192.168.1.16:9092'
// let geoUrl = 'http://192.168.1.16:8080'
// 正式服
// let baseUrl = 'https://api.leadinsight.cn'
// let geoUrl = 'https://gis.leadinsight.cn'

let baseUrl = process.env.envConfig.API_URL
let geoUrl = process.env.envConfig.GEO_URL
export { baseUrl, geoUrl }
