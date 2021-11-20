import { from, mergeMap, map, concatMap, filter } from 'rxjs'
import { LatLngTuple } from 'leaflet'

import { city } from '@/logic/city'
import { GET } from './core'

interface APIParam {
  [key: string]: string | number | undefined
  city?: string
  top?: number
  filter?: string
  page?: number
  skip?: number
  select?: string
}

const defaultSelector = 'ID,Name,Picture,MapUrl,Description,OpenTime,Phone,Address,Position'
const defaultFilter = 'Picture/PictureUrl1 ne null and Name ne null and Address ne null and MapUrl ne null and Phone ne null'
  + ' and OpenTime ne null and Description ne null'

function formatRequestUrl(url: string, param: APIParam = {}, type = 'other') {
  const { ...keys } = param
    if (url.match(/tourism/i)) {
      keys.select = defaultSelector
      if (keys.filter) {
        keys.filter += ` and ${defaultFilter}`
      } else {
        keys.filter = defaultFilter
      }
    }

  return url + '?$format=JSON' + Object.keys(keys)
    .reduce((resp, key) => `${resp}&$${key}=${keys[key]}`, '')
}

export const getNearStation = (params: APIParam) => GET(formatRequestUrl('/Bike/Station/NearBy', params))
export const getNearStationAvailability = (params: APIParam) => GET(formatRequestUrl('/Bike/Availability/NearBy', params))

function generateGeoStringToLatLngArray(data: CustomBikeShape[]) {
  return data?.map((el) => {
    const geometry = el.Geometry?.match(/(\d+.\d+) (\d+.\d+)/g)
    if (geometry) {
      el.geo = geometry.map((g) => g.split(' ').map((d) => parseFloat(d)).reverse() as LatLngTuple)
    }
    return el
  })
}

/**
 * 取得所有城市腳踏車路線
 *
 * @returns {Observable} 可被訂閱的物件
 */
export const getAllBikeRoute = async () => {
  return from(city).pipe(
    filter(x => x.CityID !== 'O'),
    map((x) => x.City),
    mergeMap(getBikeRoute),
    map(generateGeoStringToLatLngArray),
    concatMap((x) => x)
  )
}

export const getBikeRoute = async (city: string) => {
  try {
    const resp = (await GET(formatRequestUrl(`/Cycling/Shape/${city}`))).data
    return resp
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getResturant = async (params: APIParam)  => GET(formatRequestUrl('/Tourism/Restaurant', params))
export const getScenicSpot = async (params: APIParam)  => GET(formatRequestUrl('/Tourism/ScenicSpot', params))