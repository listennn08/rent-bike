/**
 * count distance
 *
 * @param {number} lat1 start lat
 * @param {number} lon1 start lon
 * @param {number} lat2 end lat
 * @param {number} lon2 end lon
 * @param {string} unit unit
 * @returns {number} distance
 */
export const distance: TDistance = (lat1, lon1, lat2, lon2, unit = "K") => {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === "K") dist = dist * 1.609344;
  if (unit === "N") dist = dist * 0.8684;

  return dist;
};

/**
 * get current position
 *
 * @param successCallback - success called function
 * @param errCallback  - error called function
 */
export const getCurrentPosition = (
  successCallback: PositionCallback,
  errCallback?: PositionErrorCallback,
) => {
  navigator.geolocation.watchPosition(successCallback, errCallback);
};
