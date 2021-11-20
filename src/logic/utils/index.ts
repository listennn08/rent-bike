/**
 * 計算距離
 *
 * @param {number} lat1 開始緯度
 * @param {number} lon1 開始經度
 * @param {number} lat2 結束緯度
 * @param {number} lon2 開始經度
 * @param {string} unit 單位
 * @returns {number} 距離
 */
export const distance: TDistance = (lat1, lon1, lat2, lon2, unit = "K") => {
  if ((lat1 === lat2) && (lon1 === lon2)) return 0

  const radlat1 = Math.PI * lat1 / 180
  const radlat2 = Math.PI * lat2 / 180
  const theta = lon1 - lon2
  const radtheta = Math.PI * theta / 180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) dist = 1

  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit === "K") dist = dist * 1.609344
  if (unit === "N") dist = dist * 0.8684

  return dist
}

export const getCurrentPosition = (successCallback: PositionCallback, errCallback?: PositionErrorCallback) => {
  // getCurrentPosition
  navigator.geolocation.watchPosition(successCallback, errCallback)
}

export function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}