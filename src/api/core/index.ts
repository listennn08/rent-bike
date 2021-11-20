import axios, { AxiosPromise, AxiosRequestHeaders, Method } from 'axios'
import jsSHA from 'jssha'

const getAuth = () => {
  const appID = <string>import.meta.env.VITE_API_KEY
  const appKey = <string>import.meta.env.VITE_API_SECRET

  const UTCString = new Date().toUTCString()
  const sha = new jsSHA('SHA-1', 'TEXT')
  sha.setHMACKey(appKey, 'TEXT')
  sha.update(`x-date: ${UTCString}`)

  const HMAC = sha.getHMAC('B64')
  const Authorization =
    `hmac username="${appID}", algorithm=\"hmac-sha1\", headers=\"x-date\", signature="${HMAC}"`

  return {
    Authorization,
    'X-Date': UTCString
  }
}

axios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getAuth(),
  }

  return config
})

axios.interceptors.response.use((resp) => {
  return resp
})

function request(
  url: string,
  data: any  = {},
  headers: AxiosRequestHeaders = {}, 
  method: Method
): AxiosPromise<any> {
  return new Promise((resovle, reject) => {
    axios({ url, data, headers, method })
      .then(resovle)
      .catch(reject)
  })
}

export const cityCore = axios.create({
  baseURL: <string>import.meta.env.VITE_CITY_API_PATH
})

axios.defaults.baseURL = <string>import.meta.env.VITE_API_PATH

export const GET = (url: string, headers: AxiosRequestHeaders = {}) => request(url, {}, headers, 'get')
export const POST = (url: string, data: any = {}, headers: AxiosRequestHeaders = {}) => request(url, data, headers, 'post')
export const PUT = (url: string, data: any = {}, headers: AxiosRequestHeaders = {}) => request(url, data, headers, 'put')
export const PATCH = (url: string, data: any = {}, headers: AxiosRequestHeaders = {}) => request(url, data, headers, 'patch')
export const DELETE = (url: string, headers: AxiosRequestHeaders = {}) => request(url, {}, headers, 'delete')